const express = require('express')
const app = express()
const port = process.env.PORT || 3031
const HTTPerror = require('node-http-error')
const dal = require('../DAL/no-sql.js')
const bodyParser = require('body-parser')

function BuildResponseError(err) {
    // no sql error message example
    //     { id: 'person_jackiekennedyo1922@gmail.org',
    // error: 'conflict',
    // reason: 'Document update conflict.',
    // name: 'conflict',
    // status: 409,
    // message: 'Document update conflict.',
    // ok: true }
    //
    // // custom DAL validation message example
    //
    // {
    // error: 'Bad Request',
    // reason: 'Unnecessary _id property within data.'
    // name: 'Bad Request',
    // status: 400,
    // message: 'Unnecessary _id property within data.',
    // ok: true }

    // if the first three characters are a number then return the error code otherwise
    //  default to 400 (bad request)
    const statuscheck = isNaN(err.message.substring(0, 3)) === true ? "400" : err.message.substring(0, 3)
    const status = err.status ? Number(err.status) : Number(statuscheck)
    const message = err.status ? err.message : err.message.substring(3)
    const reason = message
    const error = status === 400 ? "Bad Request" : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message


    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(err,res){
  res.send('hello world!')
})

app.get('/bad',function(req,res,next){
  var badErr = new HTTPerror(500,'bad req',{the: 'request is bad'})
  next(badErr)
})

app.get('/reliefefforts/:effortID',function(req,res,next){
  dal.getReliefEffort(req.params.effortID,function(err,body){
    if(err){
        var reliefErr = BuildResponseError(err)
        next(reliefErr)
      }
    if(body){
      res.send(body)
    }
  })
})

app.get('/person/:personId',function(req,res,next){
  dal.getPerson(req.params.personId,function(err,body){
    if(err){
        var personErr = BuildResponseError(err)
        next(personErr)
    }
    if(res){
      res.send(body)
    }
  })
})


app.post('/person',function(req,res,next){
  dal.createPerson(req.body,function(err,body){
    if(err){
      var personErr = BuildResponseError(err)
      next(personErr)
    }else {
      res.send(body)
    }
  })
})

app.post('/reliefefforts',function(req,res,next){
  dal.createReliefEffort(req.body,function(err,body){
    if(err){
      var personErr = BuildResponseError(err)
      next(personErr)
    }else {
      res.send(body)
    }
  })
})

app.listen(port,function(err,res){
  if(!err){
    console.log(`app listening on port ${port}`)
  }
})

app.use(function(err,req,res,next){
  res.send(err)
})
