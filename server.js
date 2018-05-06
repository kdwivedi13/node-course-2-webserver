const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
//Middleware for the Logger
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if (err){
      console.log("error in appending in server log")
    }
  });
    next();
});

// Middleware for the
// app.use((req,res,next)=>{
//   res.render('maintanence.hbs');
// });

// static files
app.use(express.static(__dirname+ '/public'));
//Helper
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
//Helper
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'About Page',
    welcomeMessage:'welcome to home page'
});
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error:'unable to handle request update'
  });
});

app.listen(3000,()=>{
  console.log('server is up');
});
