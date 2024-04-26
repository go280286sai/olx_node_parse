import {assert} from 'chai';
import { Realter } from '../src/olx/Realter.mjs'
const url = "https://www.olx.ua/uk/nedvizhimost/kvartiry/kharkov/?currency=UAH";
describe('Testing realtor', function () {
    describe('#indexOf()', function () {
        it('Get urls', function (done) {
            let obj = new Realter();
            obj.getUrls(url).then(() => {
                done();
                assert.isTrue(obj.urls.length > 0);
            });
        });
    });

});