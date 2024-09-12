const requestBodyparser = require("../util/body-parser")
const writeFileSync = require("../util/write-to-file")
module.exports = async(req, res)=>{
    let baseurl = req.url.substring(0 , req.url.lastIndexOf("/") +1)
    let id = req.url.split("/")[3]
    let regexv4 = new RegExp(
         /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    if(!regexv4.test(id)){
        res.writeHead(400, {"Content-Type": "application/json"})
        res.end(JSON.stringify({title : "Validation Failed" , message : "UUid not found"}))
    }else if(baseurl === "/api/movies/" && regexv4.test(id)){
        try {
            let body = await requestBodyparser(req)
            const index = req.movies.findIndex((movie)=>{
                return movie.id === id
            })
            if(index === -1){
                res.writeHead(404, {"Content-Type": "application/json"})
                res.end(JSON.stringify({
                    title : "Not Found",
                    message: "movie not found"
                }))
            }else{
               req.movies[index] = {id, ...body}
               writeFileSync(req.movies)
               res.writeHead(200, {"Content-Type"  : "application/json"})
               res.end(JSON.stringify(req.movies[index]))
            }
        } catch (error) {
            console.log(error)
            res.writeHead(400, {"Content-Type" : "application/json"})
            res.end(JSON.stringify({title : "Validation Failed", message : "Request body not valid"}))
        }
    }   else{
        res.writeHead(404,{ "Content-Type" : "application/json"})
        res.end(JSON.stringify({title : "Not Found" , message : "Routes Not Found"}))
    }
}




















