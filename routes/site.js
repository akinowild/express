
const { json } = require('express');
var querystring = require('querystring')
var express = require('express');
var util = require('util')

const MysqlPool = require('../mysql/index');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();


// const mysql = require('mysql')

var router = express.Router();
// var objCon =  require("../mysql/index")

/* GET users listing. */
router.get('/', function(req, res, next) { 
  pool.query('SELECT * FROM user',(err,result)=>{
    if(err){
      console.log(err.message);
      return;
    }
    res.send(result);
  });
});

router.get('/create',express.json(), function(req, res, next) { 
  const url = req.url
  req.query = querystring.parse(url.split('?')[1]) 
  const insertSql = 'insert into user(id, openId, name) values(?, ?, ?)'
  pool.query(insertSql,[req.query.id,req.query.openId,req.query.name],(err,result)=>{
    if(err){
      console.log(err.message);
      return;
    }
    res.send(result);
  });
});


// const insertSql = 'insert into students(id, openId, name) values(10, 1000, "老张")'


module.exports = router;


