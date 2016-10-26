/*jshint esversion: 6 */
const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');
const {
    prop,
    forEach
} = require('ramda');
var config = fetchConfig(path.join(__dirname, '..'), {
    dcValue: 'test'
});
const urlFormat = require('url').format;
const db = new PouchDB(urlFormat(config.get("couch")));
const rm = require('./helpers/delete.js')
// const createReliefEffort = require('./helpers/createReliefEffort.js')


function getDocById(id,cb){
  console.log(id)
  db.get(id).then(function(res){
    return cb(null, res)
  }).catch(function(err){
    return cb(err)
  })
}


function getPerson(id,cb){
  getDocById(id,cb)
}

function getReliefEffort(id,cb){
  getDocById(id,cb)
}

function createPerson(data, cb) {
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
    console.log(data)

    db.put(data, function(err, resp) {
        if (err) {
            console.log("err", err)
            return cb(err)
        }
        console.log("success", resp)
        return cb(null, resp)
    })
}

function createReliefEffort(data, cb) {
    var hasKeys = true
    var status = ''
    const keys = ['phase', 'name', 'organizationID']


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

    data._id = data._id = 'relief_' + data.organizationID.replace(/ /g, "_").replace(/\./g, "") + '_' + data.name.replace(/ /g, "_");
    data.active = true
    data.type = 'relief'

    db.put(data, function(err, resp) {
        if (err) {
            console.log("err", err)
            return cb(err)
        }
        console.log("success", resp)
        return cb(null, resp)
    })
}


var dal = {
    createPerson: createPerson,
    createReliefEffort: createReliefEffort,
    deletePerson: rm.person,
    deleteReliefEffort: rm.reliefEffort,
    getPerson: getPerson,
    getReliefEffort: getReliefEffort
}

module.exports = dal
