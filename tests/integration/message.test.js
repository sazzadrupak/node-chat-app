const {generateMessage, generateLocationMessage} = require('../../utils/message');
const expect = require('expect');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should return valid location object', () => {
        let from = 'Jen';
        let latitude = 15;
        let longtitude = 20;
        let url = 'https://www.google.com/maps?q=15,20';
        let message = generateLocationMessage(from, latitude, longtitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});