const { prop, forEach } = require('ramda');
const PouchDB = require('pouchdb-http');
const db = new PouchDB("http://127.0.0.1:5984/relief-tracker")


module.exports = function(data, cb) {
    var hasKeys = true
    var status = ''
    const keys = ['firstName', 'lastName', 'email']

    function missingKey(item) {
        if (prop(item)(data) === undefined) {
            hasKeys = false
            status = item
        }
    }

    forEach(missingKey, keys)

    if (!hasKeys) {
        return cb(new Error(`400Missing ${status} property within data`))
    }

    if (prop('_rev')(data)) {
        return cb(new Error('400 _rev not allowed'))
    }

    if (prop('_id')(data)) {
        return cb(new Error('400 _id not allowed'))
    }

    data._id = `person_${data.email}`
    data.type = 'person'
    data.active = true

    db.put(data, function(err, resp) {
        if (err) {
            console.log("err", err)
            return cb(err)
        }
        console.log("success", resp)
        return cb(null, resp)
    })
}
