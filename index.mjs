import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import { start } from './src/app_routes.mjs';
import { getFileRead } from './functions/getFileRead.mjs';
import { graphql, buildSchema } from "graphql";
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.get('/', function (req, res) {
    res.send("hello")
});
app.post("/api/target", async function (req, res) {
    const { target, url } = req.body;

    const schema = buildSchema(`
  type Query {
    start: String,
    url: String,
    target: String
  }
`)
 console.log(target, url);
const rootValue = { start: await start(target, url)}
 
const source = "{ start }"
 
await graphql({ schema, source, rootValue });
res.send("OK")
})
app.get("/api/realter/:id", async function (req, res) {
    let id = req.params.id;
    let path_file = path.join("files/","realter");
    let file = await getFileRead(path_file, id);
    res.send(file);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});