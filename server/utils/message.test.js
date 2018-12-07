const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should return an object with a from, text and createdAt property', ()=>{
        const message = generateMessage('Mark', 'Test message')
            expect(message.from).toBe('Mark')
            expect(message.text).toBe('Test message')
            expect(typeof message.createdAt).toBe('number')
    })
})