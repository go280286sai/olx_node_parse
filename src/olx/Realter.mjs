import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

class Realter {
    constructor() {
        this.baseUrl = 'https://www.olx.ua';
        this.entries = [];
        this.urls = [];
    }

    async fetchHTML(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return response.text();
    }

    async getUrls(url) {
        const html = await this.fetchHTML(url);
        const $ = cheerio.load(html);
        $('.css-qfzx1y').each((_, element) => {
            let $element = $(element);
            let url = this.baseUrl + $element.find('a.css-z3gu2d').attr('href');
            // let area = $element.find('.css-643j0o').text();
            // let price = $element.find('p[class="css-tyui9s er34gjf0"]').text();
            let location_time =  $element.find('p[class="css-1a4brun er34gjf0"]').text().split('-');
            let location = location_time[0].trim();
            // let time_ = location_time[1];
            this.urls.push({ "url": url, "location":location });
        });
    }
    async getUrl(){
        let data = this.urls;
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            await this.getData(obj.url, obj.location);
        }
    }
    async getData(url, location) {
        const html = await this.fetchHTML(url);
        const $ = cheerio.load(html);
        let title = $('.css-1dp6pbg').find('h4.css-1juynto').text();
        let time_ = $('.css-1dp6pbg').find('span.css-19yf5ek').text();
        let price = $('.css-1dp6pbg').find('h3.css-12vqlj3').text();
        let description = $('.css-1wws9er').find('.css-1t507yq').text();
        let text = $('.css-sfcl1s').find('p.css-b5m1rv').text();
        let floor = text.match(/Поверх: (\d+)/g)[0].split(': ')[1];
        let room = text.match(/Кількість кімнат: (\d+)/g)[0].split(': ')[1];
        let area = text.match(/Загальна площа: (\d+)/g)[0].split(': ')[1];
        let type = text.includes("Бізнес") ? "Бізнес" : "Приватна";
        let etajnost = text.match(/Поверховість: (\d+)/g)[0].split(': ')[1];
        this.entries.push({ title, room, floor, etajnost, area, price, type, description, time_, location });
    }

    async saveData(i) {
        const filePath = path.join('files', 'realter', `${i}_olx_realtor.json`);
        fs.writeFileSync(filePath, JSON.stringify(this.entries, null, 2), 'utf8');
    }

}

export { Realter };


