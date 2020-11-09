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

EDIT: I might start actually working on implementing a forum system using this
*/
console.log("Due to a bug you might see the \"JSBoard has initalized\" multiple times, this will not affect JSBoard and is likely just a bug inside of replit (where im coding this) and you might not see this")
initServer()
{
  
  // this keeps it online
  app.get("/*", (req, res) => { // no touchie
   var test = req.path.split("/")
    res.set('Content-Type', 'text/html');
    var html = getPage(test[1], test[2], req.path)
    res.send(html);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://JSBoard.blocksnmore.repl.co`);
  }, 280000);
}

function getPage(dir, page, fullthing){
switch(dir.toLowerCase()){
/*Home*/case "":case "home":return utls.htmlp(utls.getFile("./templates/home.html"));break;
/*Forums*/case "forums": /*No post */if(!page) return forums.mainForumsPage(); 
return forums.pageOptions(page, fullthing); break; //Move to function for all this

/*Contact*/case "contact": return utls.htmlp(utls.getFile("./templates/contact.html")); 
break;

/*404*/default:return utls.htmlp(utls.getFile("./templates/404.html"))
}}
function initServer(){
  console.log("Starting server and initalizing files");
  if(isNaN(users.get("posts.count"))){
    console.log("Unable to find amount of posts created, resetting. This might mean that you have not used the /update path")
    users.set("posts.count", 0)
  }
  console.log("JSBoard has initalized all files.")
}

