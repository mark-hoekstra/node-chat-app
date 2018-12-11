const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
    it('should return true is type === string && trimed value > 0', ()=>{
            expect(isRealString('Mark  ')).toBe(true);
            expect(isRealString('  ')).toBe(false);
            expect(isRealString(4534534)).toBe(false);
    });
});