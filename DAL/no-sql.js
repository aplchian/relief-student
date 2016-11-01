/*jshint esversion: 6 */
const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');
const { prop, forEach } = require('ramda');
var config = fetchConfig(path.join(__dirname, '..'), {
    dcValue: 'test'
});
const urlFormat = require('url').format;
const db = new PouchDB(urlFormat(config.get("couch")));
const rm = require('./helpers/delete.js')
const createPerson = require('./helpers/createPerson.js')
const createReliefEffort = require('./helpers/createReliefEffort.js')
const get = require('./helpers/get.js')
const update = require('./helpers/update.js')

function listPersons(by){
  var options = {limit : 5};


  db.query('email',{
    limit: 5
  },function(err,res){
    if(err) console.log(err.message)
    if(res){
      console.log(res)
      var options = {limit : 5};
      // (function fetchNextPage(){
      //   db.allDocs(options,function(err,res){
      //     console.log(res)
      //     if(res && res.rows.length > 0){
      //       options.startkey = res.rows[res.rows.length - 1]
      //       options.skip = 1
      //     }
      //   })
      // })()
    }
  })

}



var dal = {
    createPerson: createPerson,
    createReliefEffort: createReliefEffort,
    deletePerson: rm.person,
    deleteReliefEffort: rm.reliefEffort,
    getPerson: get.person,
    getReliefEffort: get.reliefEffort,
    updatePerson: update.person,
    updateReliefEffort: update.reliefEffort,
    listPersonsBy: listPersons
}

module.exports = dal
