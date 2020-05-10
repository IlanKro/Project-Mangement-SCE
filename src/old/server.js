const http= require("http")
const fs = require("fs")
const express  = require("express")
const app_port = process.env.PORT || 3000
const app = express()

app.listen(app_port)
/*
let htmls= ""
fs.readdirSync("./html").forEach(file => {
    htmls+="/" + file.toString()+ " "
})

const server= http.createServer(function(req,res) {
    res.writeHead(200,{"Content-Type" : "text/html"})
    console.log(req.url)
    if (htmls.includes(req.url) && req.url.includes(".html"))
        fs.createReadStream("./html"+ req.url, "utf8").pipe(res)
    else if (req.url.includes("css") || req.url.includes("js")) {
        console.log("opening " + req.url)
        fs.createReadStream("./" + req.url, "utf8").pipe(res)
    }
    else
        fs.createReadStream("./html/404.html", "utf8").pipe(res)



}).listen(3000,"127.0.0.1")

console.log("listening to port 3000")
*/