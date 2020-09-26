const fs = require("file-system")
const utls = require("./utls.js")
const main = require("./index.js")
const Database = main.Database
const users = main.users


/*
// Forum tools
*/
// Forums page stuff
function pageOptions(option, full){
  switch(option.toLowerCase()){
    case "create":
      var f = full.split("/forums/create/")
      var f = f[1].split("/"+f[0]+"/"+f[1]+"/").join("")
      var contentt = f.split("/")
      if(!contentt[0]) return utls.htmlp("<h2>You need to provide a title!</h2>");
      if(!contentt[1]) return utls.htmlp("<h2>You need to set a author name!</h2>");
      if(!contentt[2]) return utls.htmlp("<h2>You need to provide a message for the post!</h2>");
      var title = contentt[0].split("%20").join(" "); var author = contentt[1].split("%20").join(" "); var message = contentt[2].split("%20").join(" ");
      return createPost(title, author, message);
    break;

default:
  try{// Attempts to get post and returns 404 if not found
  var content = getPost(option).split("\n")
  var post = ""+utls.getFile("./templates/post.html")+""
  // Quick solution to the fact that .replace doesnt always work
  var post = post.split("{{{title}}}").join(content[0]); // Post title
  var post = post.split("{{{author}}}").join(content[1]); // Post author
  var post = post.split("{{{post}}}").join(content[2]); // Post message
  return utls.htmlp(post)
}catch(e){ return utls.htmlp(utls.getFile("./templates/404forums.html"))} break;
}} exports.pageOptions = pageOptions

// Get The main page for forums
function mainForumsPage(){ 
var posts = "";
  for(var i = fs.readFileSync("./forums/databases/posts.txt", "utf8"); i > 0; i--){
    var postformat = ""+fs.readFileSync("./templates/listformat.html", "utf8")+""
    var postformat = postformat.split("{{{link}}}").join("/forums/"+i+"/")
    var postformat = postformat.split("{{{id}}}").join(i)
    var posts = posts+postformat
  }
  return utls.htmlp(fs.readFileSync("./templates/forumslist.html", "utf8").split("{{{posts}}}").join(posts));
} exports.mainForumsPage = mainForumsPage

// Make forum post
function createPost(title, author, content){
  var f = fs.readFileSync("./forums/databases/posts.txt", "utf8")
  f++
  console.log("User `"+author+"` created a post titled `"+title+"` with content `"+content+"` Post Id: "+f)
  fs.writeFile('./forums/databases/posts.txt', f, function(err) {})
  fs.writeFile('./forums/posts/'+f+".txt", title+"\n"+author+"\n"+content, function(err) {})
  var created = utls.getFile("./templates/createdpost.html")
  var created = created.split("{{{link}}}").join("/forums/"+f+"/")
  var created = created.split("{{{id}}}").join(f)
  return utls.htmlp(created)
} exports.createPost = createPost

// Get forum post by post id
function getPost(id){ 
  return fs.readFileSync("./forums/posts/"+id+".txt", "utf8")
} exports.getPost = getPost


