import fs from 'fs';
import path from 'path';
const create_json = (text) => {
    const currentDate = new Date();
    const currentFile = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}.json`;
    const to_path = path.join("src",'/files/',currentFile);
    console.log(path);
    if (text == "[" || text == "]") {
        fs.writeFileSync(to_path, text, {flag: 'a+'}, 'utf8', err=>{
            if(err) throw err
        });
    } else {
         const jsonData = {
        text: text
    };
    fs.writeFileSync(to_path, JSON.stringify(jsonData)+",", {flag: 'a+'}, 'utf8', err=>{
        if(err) throw err
    });
    }
};

export { create_json };
