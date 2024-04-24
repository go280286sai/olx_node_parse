import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import { start } from './src/app_routes.mjs';
import { getFileRead } from './functions/getFileRead.mjs';
import { graphql, buildSchema } from "graphql";
import { log } from 'console';
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.post('/', jsonParser, function async(req, res) {
    let target = req.body.target;
    let url = req.body.url;
    res.send(JSON.stringify({
        'result': target,
        "url":url
    }))
    // try {
    //     start("realter", "https://www.olx.ua/uk/nedvizhimost/kvartiry/kharkov/?currency=UAH").then(response => {
    //         console.log(response);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    //     res.send(JSON.stringify({
    //         'status': 200
    //     }))
    // } 
    // catch (err) {
    //     res.send(JSON.stringify({
    //         'error': err
    //     }))
    // }; 
});
app.post("/api/target", async function (req, res) {
    const { target, url } = req.body;

    var schema = buildSchema(`
  type Query {
    start: String,
    url: String,
    target: String
  }
`)
 
var rootValue = { start: await start(target, url)}
 
var source = "{ start }"
 
graphql({ schema, source, rootValue }).then(response => {
  console.log(response)
})
res.send("OK")
})
app.get("/api/realter/:id", async function (req, res) {
    let id = req.params.id;
    let path_file = path.join("files/","realter");
    let response = await getFileRead(path_file, id);
    res.send(response);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});