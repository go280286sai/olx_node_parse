import path from 'path';
import fs from 'fs';

async function getFileRead(url, id) {
    let files = await fs.promises.readdir(url, 'utf8');
    if (files.length - 1 < id) return "Not found";
    let file = await fs.promises.readFile(path.join(url, "/", files[id]), 'utf8');

    return file;

}

export {getFileRead}