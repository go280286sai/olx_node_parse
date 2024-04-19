import express from 'express';
const app = express();
import { start } from './src/app_routes.mjs';
// import {create_json} from "./src/create_json.mjs";
app.get('/', function (req, res) {
    start("realter", "https://www.olx.ua/uk/nedvizhimost/kvartiry/kharkov/?currency=UAH").then(response => {
        res.send(response);
    }).catch(() => {
        res.send(JSON.stringify({
            'status': 500
        }));
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});