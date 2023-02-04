const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: dropWhile', () => {
    let _ = new MyLodash();

    let testArray;
    beforeEach(() => {
        testArray = [
            { 'user': 'barney',  'active': false },
            { 'user': 'fred',    'active': false },
            { 'user': 'pebbles', 'active': true }
          ];
    });

    test('function must be defined', () => {
        expect(_.dropWhile).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.dropWhile(testArray)).toBeInstanceOf(Array);
    });

    test('should not modify \'array\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.dropWhile(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should apply a user function', () => {
        let testFunction = (obj) => !obj.active;
        expect(_.dropWhile(testArray, testFunction)).toEqual(OrigLodash.dropWhile(testArray, testFunction));

        testFunction = (obj) => obj.active;
        expect(_.dropWhile(testArray, testFunction)).toEqual(OrigLodash.dropWhile(testArray, testFunction));

        testFunction = (value) => value < 3;
        expect(_.dropWhile([0, 1, 2, 3, 4, 5], testFunction)).toEqual(OrigLodash.dropWhile([0, 1, 2, 3, 4, 5], testFunction));
    });

    test('should apply _.matches shorthand', () => {
        expect(_.dropWhile(testArray, { 'user': 'barney', 'active': false })).toEqual(OrigLodash.dropWhile(testArray, { 'user': 'barney', 'active': false }));
    });

    test('should apply _.matchesProperty shorthand', () => {
        expect(_.dropWhile(testArray, ['active', false])).toEqual(OrigLodash.dropWhile(testArray, ['active', false]));
    });

    test('should apply _.property shorthand', () => {
        expect(_.dropWhile(testArray, 'active')).toEqual(OrigLodash.dropWhile(testArray, 'active'));
        testArray[0].active = true;
        expect(OrigLodash.dropWhile(testArray, 'active')).toEqual(OrigLodash.dropWhile(testArray, 'active'));

        testArray = [
            { 'a': { 'b': 2 } },
            { 'a': { 'b': 1 } },
            { 'a': { 'b': false } },
        ];
        expect(_.dropWhile(testArray, 'a.b')).toEqual(OrigLodash.dropWhile(testArray, 'a.b'));
    });

    test('should return an empty array without a predicate', () => {
        expect(_.dropWhile(testArray)).toEqual(OrigLodash.dropWhile(testArray));
    });

    test('should split a string', () => {
        const testFunction = (value) => value === '1';
        expect(_.dropWhile('11234', testFunction)).toEqual(OrigLodash.dropWhile('11234', testFunction));
    });

    test('should work with array-like objects', () => {
        const testArrayLike = {
            0: 1,
            1: 1,
            2: 2,
            3: 3,
            length: 4
        }
        const testFunction = (value) => value === 1;
        expect(_.dropWhile(testArrayLike, testFunction)).toEqual(OrigLodash.dropWhile(testArrayLike, testFunction));
    });

    test('should return an empty array if \'array\' is an invalid type', () => {
        expect(_.dropWhile({ 0 : 3 })).toEqual(OrigLodash.dropWhile({ 0 : 3 }));
        expect(_.dropWhile(null)).toEqual(OrigLodash.dropWhile(null));
        expect(_.dropWhile(undefined)).toEqual(OrigLodash.dropWhile(undefined));
        expect(_.dropWhile(Infinity)).toEqual(OrigLodash.dropWhile(Infinity));
        const testFunction = (value) => value === 1;
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.dropWhile(testArrayLike, testFunction)).toEqual(OrigLodash.dropWhile(testArrayLike, testFunction));
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.dropWhile(testArrayLike, testFunction)).toEqual(OrigLodash.dropWhile(testArrayLike, testFunction));
    });
});
