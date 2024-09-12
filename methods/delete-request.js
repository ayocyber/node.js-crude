const writeFileSync = require("../util/write-to-file")
module.exports = (req, res)=>{
    const baseurl = req.url.substring(0 , req.url.lastIndexOf("/")+ 1)
    const id = req.url.split("/")[3]
    let regexV4 = new RegExp(
           /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    if(!regexV4.test(id)){
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify({title : "Validation failed ", message : "UUID not fonud"}))
    }else if(baseurl === "/api/movies/" && regexV4.test(id)){
        res.setHeader("Content-Type", "application/json")
        let filtermovie = req.movies.filter((movie)=>{
            return movie.id !== id
        })
        res.statuscode = 200
        res.write(JSON.stringify(filtermovie))
        writeFileSync(filtermovie)
        res.end()
    }   else{
        res.writeHead(404,{ "Content-Type" : "application/json"})
        res.end(JSON.stringify({title : "Not Found" , message : "Route Not Foundsss"}))
    }
}