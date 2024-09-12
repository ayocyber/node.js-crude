const http = require("http")
const getreq = require("./methods/get-request")
const putreq = require("./methods/put-request")
const postreq = require("./methods/post-request")
const deletereq = require("./methods/delete-request")
const movies = require("./data/movies.json")

const PORT = process.env.PORT || 5001

const server = http.createServer((req, res)=>{
    req.movies = movies
    switch(req.method){
        case "GET":
            getreq(req, res)
            break
        case "PUT":
            putreq(req, res)
            break
        case "POST":
            postreq(req, res)
            break
        case "DELETE":
            deletereq(req, res)
            break
        default:
            res.statusCode = 404
            res.setHeader("Content-type", "application/json")
            res.write(JSON.stringify({title : "Not Found" , message : "Route Not Found"}))
            res.end()
    }
})

server.listen(PORT , ()=>{
    console.log(`Serveris started on port : ${PORT}`)
})