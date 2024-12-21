// //Creating HTTP server

// import http from "http";
// import fs from "fs";
// import url from "url";

// const myServer = http.createServer((req, res) => {
//     if(req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.url} New Req received`;

//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);

//     fs.appendFile("log.txt", log, (err, data) => {
//         switch(myUrl.pathname) {
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi, ${username}`);
//                 break;
//             case "/contact":
//                 res.end("+918348943809")    
//                 break;
//             default:
//                 res.end("Not FOUND")        
//         }
//     })
// });

// myServer.listen(8000, console.log("Server Started"));

import express from "express";

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello from Homepage");
})

app.listen(8000, () => console.log("Server Started"));