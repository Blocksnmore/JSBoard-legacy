/*
* JSBoard Forum Software
* Written using NodeJS/NPM and Express
* Developed by Blocks_n_more
* All rights to JSBoard Forum Software belong to Blocks_n_more
*/

/*
> *Potential future features*
> Accounts
> Forum sections
> Feel free to dm me on discord Blocks_n_more#5526 features you would like to see added
*/
const express = require("express");
const app = express();
const fs = require("file-system");
const utls = require("./utls.js");
const forums = require("./forums.js");
const user = require("./users.js")
const http = require("http");
// User Database
const users = user.users
/*
* Why not use databases for posts too?
* The main reason i dont want to is because posts don't have to be secretive and also the forums framework is already pretty much done using txt databases. if i were to have used functions to get files etc it might have been easier to do and i might have done it
*/


app.get('/*', function (req, res) {
  var test = req.path.split("/")
  res.set('Content-Type', 'text/html');
  var html = getPage(test[1], test[2], req.path)

res.send(html);
})
http.get(`http://JSBoard.blocksnmore.repl.co`);
setInterval(() => { // Code because this is replit
    http.get(`http://JSBoard.blocksnmore.repl.co`);
  }, 280000);



function getPage(dir, page, fullthing){
switch(dir.toLowerCase()){
/*Home*/case "":case "home":return utls.htmlp(utls.getFile("./templates/home.html"));break;
/*Forums*/case "forums": /*No post */if(!page) return forums.mainForumsPage(); 
return forums.pageOptions(page, fullthing); break; //Move to function for all this

/*Contact*/case "contact": return utls.htmlp(utls.getFile("./templates/contact.html")); 
break;

/*404*/default:return utls.htmlp(utls.getFile("./templates/404.html"))
}}



// Host website
app.listen(process.env.PORT);