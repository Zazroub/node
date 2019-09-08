const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');


const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/contact',function(req,res){
   res.render('contact',{q:req.query});
});

app.post('/contact',urlencodedParser, function(req,res){
   const item={
      name : req.body.name,
      email: req.body.email,
      massage : req.body.massage,
   };
   
   db.adNeuDocumentToCollection(item,'massages');
   res.render('contactReply',{data:req.body});
   
});

app.get('/',function(req,res){
   res.render('ej');
});


app.listen(2000);