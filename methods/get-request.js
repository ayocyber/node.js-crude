module.exports = (req, res)=>{
    let baseurl = req.url.substring(0 , req.url.lastIndexOf("/") +1)
    let id = req.url.split("/")[3]
    let regexv4 = new RegExp(
         /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    if(req.url === "/api/movies"){
        res.statuscode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(req.movies))
        res.end()
    }else if(!regexv4.test(id)){
        res.statuscode = 400
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify({title : "Validation Failed" , message : "UUid not found"}))
        res.end()

    }else if(baseurl === "/api/movies/" && regexv4.test(id)){
        res.setHeader("Content-Type", "application/json")
        let filtermovie = req.movies.filter((movie)=>{
            return movie.id === id
        })
        if(filtermovie.length > 0){
            res.statuscode = 200
            res.write(JSON.stringify(filtermovie))
            res.end()
        }else{
            res.statuscode = 400
            res.write(JSON.stringify({title : "Not Found " , message : "Movie not found"}))
            res.end()
        }
    }
    else{
        res.writeHead(404,{ "Content-Type" : "application/json"})
        res.end(JSON.stringify({title : "Not Found" , message : "Routess Not Found"}))
    }
}