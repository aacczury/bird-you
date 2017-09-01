let assert = require('chai').assert;
let https = require('https');
let messageParser = require('../messageParser.js');

describe('cmd', () => {
    describe("#Roll", () => {
        let err, replyMessage;
        let a = 0, b = 100;
        before(() => {
            ({err, replyMessage} = messageParser.parse(`/roll ${a} ${b}`));
        });
        it('roll message type should be text', () => {
            assert.equal(replyMessage.type, 'text', 'roll type is not text');
        })
        it(`roll result should be in a:${a} and b:${b} interval`, () => {
            assert.typeOf(replyMessage.text, 'string', 'roll result is not string');
            assert.isNotNaN(Number(replyMessage.text), 'roll result turn to number is NaN');
            assert(Number(replyMessage.text) >= 0, `roll result not >= a:${a}`);
            assert(Number(replyMessage.text) < 100, `roll result not < b:${b}`);
        });
    });

    describe("#NeEnergy", () => {
        let err, replyMessage;
        before(() => {
            ({err, replyMessage} = messageParser.parse("/負能量"));
        });
        it('neEnergy message type should be image', () => {
            assert.equal(replyMessage.type, 'image', 'neEnergy type is not image');
        })
        it('neEnergy originalContentUrl should be a web addr and content should be image', (done) => {
            assert.typeOf(replyMessage.originalContentUrl, 'string', 'neEnergy originalContentUrl is not string');
            assert.match(replyMessage.originalContentUrl, new RegExp("^https://.+"), 'neEnergy originalContentUrl is not https URL');
            https.get(replyMessage.originalContentUrl, (res) => {
                assert.equal(200, res.statusCode, "neEnergy originalContentUrl res status code is not 200");
                assert.match(res.headers['content-type'], /image/, "neEnergy originalContentUrl content type is not image");
                done();
            }).on('error', (e) => {
                assert.fail(e);
                done();
            });
        });
        it('neEnergy previewImageUrl should be a web addr and content should be image', (done) => {
            assert.typeOf(replyMessage.previewImageUrl, 'string', 'neEnergy previewImageUrl is not string');
            assert.match(replyMessage.previewImageUrl, new RegExp("^https://.+"), 'neEnergy previewImageUrl is not https URL');
            https.get(replyMessage.previewImageUrl, (res) => {
                assert.equal(200, res.statusCode, "neEnergy previewImageUrl res status code is not 200");
                assert.match(res.headers['content-type'], /image/, "neEnergy previewImageUrl content type is not image");
                done();
            }).on('error', (e) => {
                assert.fail(e);
                done();
            });
        });
    });
});