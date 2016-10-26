
var dalNoSQL = require('./DAL/no-sql.js');

var person ={
  "_id": "person_stevean@duke.edu",
  "_rev": "3-b0d986f7996b16d339e3a96a9486da01",
  "type": "person",
  "firstName": "Steve",
  "lastName": "Ananias",
  "phone": "843 555-1515",
  "email": "stevean@duke.edu",
  "active": true
}

var effort ={
  "_id": "relief_St_Phillips_Haiti_2015",
  "_rev": "3-561e3c74a1e001d1986ac162a18c5bda",
  "type": "relief",
  "phase": "completed",
  "name": "Haiti 2015",
  "organizationID": "St. Phillips",
  "desc": "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
  "start": "2015-09-25",
  "end": "2015-10-01",
  "team": [
    {
      "name": "Steve Ananias",
      "role": "Team Leader",
      "personID": "person_stevean@duke.edu"
    },
    {
      "name": "Libby Satterfield",
      "role": "Team member",
      "personID": "person_lsat1972@gmail.com"
    },
    {
      "name": "Judy Jones",
      "role": "Team member",
      "personID": "person_judy5555@aol.com"
    }
  ],
  "active": true
}


var ringMyPhone = function(err,res){
  if(err) console.log(err.message)
  if(res) console.log(res)
}

// dalNoSQL.createPerson(person,ringMyPhone)
// dalNoSQL.createReliefEffort(effort,ringMyPhone)
dalNoSQL.deletePerson("person_stevean@duke.edu",ringMyPhone)
// dalNoSQL.getReliefEffort("relief_St_Phillips_Haiti_2015",ringMyPhone)
