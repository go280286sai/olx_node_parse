import { Realter } from "./olx/Realter.mjs";
const run = async (url) => {
   const prefix = "&page="; 
    try{
console.time('timer');
let obj = new Realter();
await obj.getText(url);
for(let i=2; i<=15; i++){
    await obj.getText(url+prefix+i);
    if(i%5==0){
        obj.getObject();
        obj.getSave(i);
        obj = new Realter();
    }
}
console.timeEnd('timer')
let response = {
    'status': 200
};
    } catch{
        console.log('error')
    }

// const url = "https://www.olx.ua/uk/nedvizhimost/kvartiry/kharkov/?currency=UAH";

}
export {run};