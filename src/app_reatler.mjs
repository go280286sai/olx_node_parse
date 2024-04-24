import { Realter } from "./olx/Realter.mjs";
const run = async (url) => {
   const prefix = "&page="; 
    try{
console.time('timer');
let obj = new Realter();
await obj.getText(url);
for(let i=2; i<=20; i++){
    setTimeout(()=>{}, 5000);
    console.log(i);
    await obj.getText(url+prefix+i);
    if(i%5==0){
        obj.getObject();
        obj.getSave(i);
        obj = new Realter();
    }
}
console.timeEnd('timer')

    } catch{
        console.log('error')
    }
}
export {run};