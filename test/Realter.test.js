import assert from 'assert';
import { Realter } from '../src/olx/Realter.mjs'
import axios from 'axios';
const url = "https://www.olx.ua/uk/nedvizhimost/kvartiry/kharkov/?currency=UAH";

describe('Testing realtor', function () {
    describe('#indexOf()', function () {
        it('Get body_url', function (done) {
            const obj = new Realter();
            try {
                axios.get(url)
                    .then(body => {
                        obj.getTitle(body.data.match(obj.pattern_title))
                        obj.getReference(body.data.match(obj.pattern_reference))
                        obj.getPrice(body.data.match(obj.pattern_price))
                        obj.getTime_location(body.data.match(obj.pattern_time_location))
                        obj.getObject()
                    })
                    .then(() => {
                        assert.ok(obj.title.length > 0);
                        assert.ok(obj.url.length > 0);
                        assert.ok(obj.price.length > 0);
                        assert.ok(obj.time.length > 0);
                        assert.ok(obj.location.length > 0);
                        assert.ok(obj.main.length > 0);
                        assert.ok(obj.description.length > 0);
                        assert.ok(obj.area.length > 0);
                        assert.ok(obj.floor.length > 0);
                        assert.ok(obj.rooms.length > 0);
                        assert.ok(obj.type.length > 0);
                        assert.ok(obj.etajnost.length > 0);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            }
            catch (err) {
                console.log(err);
            }
        });
    });
});