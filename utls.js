const fs = require("file-system")
const forums = require("./forums.js")
const main = require("./index.js")
const Database = main.Database
const users = main.users
/*
// General tools
*/

function htmlp(htm){
  return new Buffer.from(htm);
} exports.htmlp = htmlp

function getFile(dir){
  return fs.readFileSync(dir, "utf8");
} exports.getFile = getFile