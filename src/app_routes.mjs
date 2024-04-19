import { run } from "./app_reatler.mjs";
const start = async(target, url=null, token=null) => {
    switch (target){
    case "realter":
        if (url == null){
            return JSON({"status": 400});
        }
         await run(url);
         return true
    default:
        console.log("not found");
}
}

export {start}