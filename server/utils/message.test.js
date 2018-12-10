const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should return an object with a from, text and createdAt property', ()=>{
        const message = generateMessage('Mark', 'Test message')
            expect(message.from).toBe('Mark')
            expect(message.text).toBe('Test message')
            expect(typeof message.createdAt).toBe('number')
    });
});

describe('generateLocationMessage', ()=>{
    it('should return an object with a from, url and createdAt property', ()=>{
        const message = generateLocationMessage('Mark','52.07','4.31');
        const url = 'https://www.google.nl/maps?q=52.07,4.31';

            expect(message.from).toBe('Mark')
            expect(message.url).toBe(url)
            expect(typeof message.createdAt).toBe('number')
    });
});