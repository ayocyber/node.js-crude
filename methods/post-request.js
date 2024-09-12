const crypto = require("crypto")
const requestBodyparser = require("../util/body-parser")
const writeFileSync = require("../util/write-to-file")
module.exports = async(req, res)=>{
    if(req.url === "/api/movies"){
        try {
            let body = await requestBodyparser(req)
            body.id = crypto.randomUUID()
            req.movies.push(body)
            res.statuscode = 201
            writeFileSync(req.movies)
            res.write(JSON.stringify(req.movies))
            res.end()
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify({title: "not Found ", message : "Request Body not found"}))
        }
    }else{
        res.writeHead(404,{ "Content-Type" : "application/json"})
        res.end(JSON.stringify({title : "Not Found" , message : "Route Not Found"}))
    }
}