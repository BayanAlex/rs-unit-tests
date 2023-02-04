const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: compact', () => {
    let _ = new MyLodash();

    let testArray;
    beforeEach(() => {
        testArray = [0, 1, 2, undefined, null, false, true, '', 'test', {}, { a: 3 }, [4], Infinity];
    });

    test('function must be defined', () => {
        expect(_.compact).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.compact(testArray)).toBeInstanceOf(Array);
    });

    test('should not modify \'array\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.compact(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should remove falsey values', () => {
        expect(_.compact(testArray)).toEqual(OrigLodash.compact(testArray));
    });

    test('should work with new Array', () => {
        expect(_.compact(new Array(3))).toEqual(OrigLodash.compact(new Array(3)));
    });

    test('should split a string', () => {
        expect(_.compact('123abc')).toEqual(OrigLodash.compact('123abc'));
    });

    test('should work with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: false,
            3: true,
            4: null,
            length: 5
        }
        expect(_.compact(testArrayLike)).toEqual(OrigLodash.compact(testArrayLike));
        testArrayLike = {
            0: 1,
            1: 2,
            2: null,
            length: 4
        }
        result = [1, 2];
        expect(_.compact(testArrayLike)).toEqual(OrigLodash.compact(testArrayLike));
    });

    test('should return an empty array if \'array\' has invalid type', () => {
        expect(_.compact({ 0: 3 })).toEqual(OrigLodash.compact({ 0: 3 }));
        expect(_.compact(null)).toEqual(OrigLodash.compact(null));
        expect(_.compact(undefined)).toEqual(OrigLodash.compact(undefined));
        expect(_.compact(Infinity)).toEqual(OrigLodash.compact(Infinity));
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.compact(testArrayLike)).toEqual([]);
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.compact(testArrayLike)).toEqual([]);
    });
});
