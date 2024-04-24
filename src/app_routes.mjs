import { run } from "./app_reatler.mjs";
const start = async (target, url = null) => {
    switch (target) {
        case "realter":
            if (url == null) {
                return JSON.stringify({ "status": 400 });
            }
            await run(url);
            return true
        default:
            return JSON.stringify({ "status": 400 });
    }
}

export { start }