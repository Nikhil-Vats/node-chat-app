const expect = require('expect');

var {isRealString} = require('./validators');

describe('isRealString', () => {
    it('should reject non-string values', () => {
       var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('should reject strings with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        var res = isRealString('  Nikhil  ');
        expect(res).toBe(true);
    });
});