const fs = require("file-system");
const utls = require("./utls.js");
const forums = require("./forums.js");
const main = require("./index.js")
const users = require('quick.db');
exports.users = users 

const createUser = async function(username, password){
  if(users.get('userLogin.'+username)) return;
  await users.set("userLogin."+username, password)
  console.log("User "+username+" has been created successfully!")
}; exports.createUser = createUser

const getUsers = async function(){
  let data = users.all()
 return data;
}; exports.getUsers = getUsers

const checkLogin = async function(username, password){
  if(!users.get('userLogin.'+username)) return false;
  if(!users.get('userLogin.'+username) === password) return false;
  return true;
}; exports.checkLogin = checkLogin
