import axios from 'axios';
import fs from 'fs';
import path from 'path';

class Realter {

    pattern_title = /<h6 class=\"css-16v5mdi er34gjf0\">(.*?)<\/h6>/ig;
    pattern_title_item = /<h6 class=\"css-16v5mdi er34gjf0\">(.*?)<\/h6>/i;
    pattern_price = /<p data-testid=\"ad-price\" class=\"css-tyui9s er34gjf0\">(.*?)<\/p>/ig;
    pattern_price_item = /<p data-testid=\"ad-price\" class=\"css-tyui9s er34gjf0\">(.*?)<\/p>/i;
    pattern_reference = /\"css-z3gu2d\" href=\"(.*?)\"/ig
    pattern_reference_item = /\"css-z3gu2d\" href=\"(.*?)\"/i
    pattern_time_location = /\"css-1a4brun er34gjf0\">(.*?)<\/p>/ig
    pattern_time_location_item = /\"css-1a4brun er34gjf0\">(.*?)<\/p>/i
    pattern_floor = /\"css-b5m1rv er34gjf0\">Поверх:(.*?)<\/p>/ig
    pattern_floor_item = /\"css-b5m1rv er34gjf0\">Поверх:(.*?)<\/p>/i
    pattern_room = /\"css-b5m1rv er34gjf0\">Кількість кімнат:(.*?)<\/p>/ig
    pattern_room_item = /\"css-b5m1rv er34gjf0\">Кількість кімнат:(.*?)<\/p>/i
    pattern_area = /\"css-b5m1rv er34gjf0\">Загальна площа:(.*?)<\/p>/ig
    pattern_area_item = /\"css-b5m1rv er34gjf0\">Загальна площа:(.*?)<\/p>/i
    pattern_type = /\"css-b5m1rv er34gjf0\"><span>(.*?)<\/span><\/p>/ig
    pattern_type_item = /\"css-b5m1rv er34gjf0\"><span>(.*?)<\/span><\/p>/i
    pattern_etajnost = /\"css-b5m1rv er34gjf0\">Поверховість:(.*?)<\/p>/ig
    pattern_etajnost_item = /\"css-b5m1rv er34gjf0\">Поверховість:(.*?)<\/p>/i
    pattern_description = /<div\s+class="css-1t507yq er34gjf0">([\s\S]*?)<\/div>/i;
    pattern_description_item = /\"css-1t507yq er34gjf0\">(.*?)<\/div>/i
    title = [];
    price = [];
    url = []
    time = []
    location = []
    floor = []
    etajnost = []
    rooms = []
    type = []
    description = []
    main = []
    area = []

    /**
     * Retrieves the text from the given URL and extracts relevant information such as title, price, URL, time and location.
     *
     * @param {string} text - The URL from which to retrieve the text.
     * @return {Promise<void>} - A promise that resolves when the text is successfully retrieved and the relevant information is extracted.
     */
    async getText(text) {
        const body = await axios.get(text,
            { Headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' } });
        let title = body.data.match(this.pattern_title);
        this.getTitle(title)
        let price = body.data.match(this.pattern_price);
        this.getPrice(price)
        let url = body.data.match(this.pattern_reference);
        this.getReference(url)
        let time_location = body.data.match(this.pattern_time_location);
        this.getTime_location(time_location)
    }

    /**
     * Retrieves the title from the given text and adds it to the title array.
     *
     * @param {Array} text - The text to extract the title from.
     * @return {void} This function does not return a value.
     */
    getTitle(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_title_item)[1];
            this.title.push(obj);
        }
    }

    /**
     * Retrieves the price from the given text and adds it to the price array.
     *
     * @param {Array} text - The text to extract the price from.
     * @return {void} This function does not return a value.
     */
    getPrice(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_price_item)[1];
            let get_number = '';
            for (let i = 0; i < obj.length; i++) {
                if (obj[i] === '.') {
                    break;
                }
                if (isFinite(obj[i]) && obj[i] !== ' ') {
                    get_number += obj[i]
                }
            }
            if (get_number.length > 0) {
                this.price.push(get_number);
            }
        }
    }

    /**
     * Asynchronously retrieves the reference from the given text and adds it to the URL array.
     *
     * @param {Array} text - The text to extract the reference from.
     * @return {Promise<void>} A promise that resolves when the reference is retrieved and added to the URL array.
     */
    async getReference(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_reference_item)[1];
            let address = 'https://www.olx.ua' + obj;
            this.url.push(address);
            this.getFullText(address);
        }
    }

    /**
     * Asynchronously retrieves the time and location from the given text and adds them to the corresponding arrays.
     *
     * @param {Array} text - The text to extract the time and location from.
     * @return {void} This function does not return anything.
     */
    getTime_location(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_time_location_item)[1];
            obj = obj.split('<!-- --> - <!-- -->')
            this.location.push(obj[0]);
            this.time.push(obj[1]);

        }
    }

    /**
     * Generates a new object containing the values from the title, price, url, time, location, floor, etajnost, rooms, type, description, and area arrays.
     *
     * @return {Array} An array of objects containing the values from the title, price, url, time, location, floor, etajnost, rooms, type, description, and area arrays.
     */
    getObject() {
        const count = this.title.length
        for (let i = 0; i < count; i++) {
            this.main.push({
                title: this.title[i], price: this.price[i], url: this.url[i],
                time: this.time[i], location: this.location[i], floor: this.floor[i],
                etajnost: this.etajnost[i], rooms: this.rooms[i], type: this.type[i],
                description: this.description[i], area: this.area[i]
            });
        }
        return this.main
    }

    /**
     * Writes the object data to a JSON file based on the provided index.
     *
     * @param {number} i - The index used for generating the file name.
     */
    getSave(i) {
        const to_path = path.join("files/","realter/", `${i}_olx_realtor.json`);
        fs.writeFileSync(to_path, JSON.stringify(this.getObject()), { flag: 'w' }, 'utf8',
            err => {
                if (err) throw err
            });
    }
    /**
     * Retrieves the full text from the given URL and extracts relevant information such as floor, room, type, etajnost, area, and description.
     *
     * @param {string} text - The URL from which to retrieve the full text.
     * @return {Promise<void>} - A promise that resolves when the full text is successfully retrieved and the relevant information is extracted.
     */
    async getFullText(text) {
        let body = await axios.get(text,
            { Headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' } });
        const floor = body.data.match(this.pattern_floor);
        this.getFloor(floor)
        const room = body.data.match(this.pattern_room);
        this.getRoom(room)
        const type = body.data.match(this.pattern_type);
        this.getType(type)
        const etajnost = body.data.match(this.pattern_etajnost);
        this.getEtajnost(etajnost)
        const area = body.data.match(this.pattern_area);
        this.getArea(area)
        const description = body.data.match(this.pattern_description);
        this.description.push(description[1])
    }

    /**
     * Retrieves the title from the given text and adds it to the title array.
     *
     * @param {Array} text - The text to extract the title from.
     * @return {void} This function does not return a value.
     */
    getTitle(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_title_item)[1];
            this.title.push(obj);
        }
    }

    /**
     * Retrieves the floor from the given text and adds it to the floor array.
     *
     * @param {Array} text - The text to extract the floor from.
     * @return {void} This function does not return a value.
     */
    getFloor(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_floor_item)[1];
            this.floor.push(parseInt(obj));
        }
    }

    /**
     * Retrieves the room from the given text and adds it to the rooms array.
     *
     * @param {Array} text - The text to extract the room from.
     * @return {void} This function does not return a value.
     */
    getRoom(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_room_item)[1];
            this.rooms.push(parseInt(obj));
        }
    }

    /**
     * Retrieves the etajnost from the given text and adds it to the etajnost array.
     *
     * @param {Array} text - The text to extract the etajnost from.
     * @return {void} This function does not return a value.
     */
    getEtajnost(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_etajnost_item)[1];
            this.etajnost.push(parseInt(obj));
        }
    }
    /**
     * Retrieves the area from the given text and adds it to the area array.
     *
     * @param {Array} text - The text to extract the area from.
     * @return {void} This function does not return a value.
     */
    getArea(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_area_item)[1];
            this.area.push(parseInt(obj));
        }
    }
    /**
     * Retrieves the type from the given text and adds it to the type array.
     *
     * @param {Array} text - The text to extract the type from.
     * @return {void} This function does not return a value.
     */
    getType(text) {
        for (let item of text) {
            let obj = item.match(this.pattern_type_item)[1];
            this.type.push(obj);
        }
    }
}

export {Realter}

