const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: take', () => {
    let _ = new MyLodash();

    let testArray;
    beforeEach(() => {
        testArray = [0, 1, 2, 3, 4, 5, 6];
    });

    test('function must be defined', () => {
        expect(_.take).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.take(testArray)).toBeInstanceOf(Array);
    });

    test('should not modify \'array\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.take(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should work with new Array', () => {
        expect(_.take(new Array(3), 2)).toEqual(OrigLodash.take(new Array(3), 2));
    });

    test('should return a slice of array excluding n first items', () => {
        expect(_.take(testArray, 3)).toEqual(OrigLodash.take(testArray, 3));
    });

    test('should convert \'n\' to number', () => {
        expect(_.take(testArray, '3')).toEqual(OrigLodash.take(testArray, '3'));
    });

    test('should process arrays with data of various types', () => {
        testArray = [0, 1, 2, 'test', null, true, { 0: 1 }];
        expect(_.take(testArray, 5)).toEqual(OrigLodash.take(testArray, 5));
    });

    test('should return an empty array if \'array\' argument is an empty array', () => {
        expect(_.take([], 1)).toEqual(OrigLodash.take([], 1));
    });

    test('should return an array equal to original one if \'n\' is bigger than array length', () => {
        expect(_.take(testArray, Infinity)).toEqual(OrigLodash.take(testArray, Infinity));
        expect(_.take(testArray, 8)).toEqual(OrigLodash.take(testArray, 8));
    });

    test('should return an empty array if \'n\' is less or equals zero', () => {
        expect(_.take(testArray, -Infinity)).toEqual(OrigLodash.take(testArray, -Infinity));
        expect(_.take(testArray, 0)).toEqual(OrigLodash.take(testArray, 0));
        expect(_.take(testArray, -8)).toEqual(OrigLodash.take(testArray, -8));
    });

    test('should return an array sliced with n = 1 if \'n\' is omitted', () => {
        expect(_.take(testArray)).toEqual(OrigLodash.take(testArray));
    });

    test('should split a string', () => {
        expect(_.take('123abc', 3)).toEqual(OrigLodash.take('123abc', 3));
    });

    test('should work with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 3
        }
        expect(_.take(testArrayLike, 2)).toEqual(OrigLodash.take(testArrayLike, 2));
        testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 4
        }
        expect(_.take(testArrayLike, 2)).toEqual(OrigLodash.take(testArrayLike, 2));
    });

    test('should return an empty array if \'array\' has invalid type', () => {
        expect(_.take({ 0 : 3 }, 3)).toEqual(OrigLodash.take({ 0 : 3 }, 3));
        expect(_.take(null, 3)).toEqual(OrigLodash.take(null, 3));
        expect(_.take(undefined, 3)).toEqual(OrigLodash.take(undefined, 3));
        expect(_.take(Infinity, 3)).toEqual(OrigLodash.take(Infinity, 3));
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.take(testArrayLike)).toEqual([]);
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.take(testArrayLike)).toEqual([]);
    });

    test('should return an empty array if \'n\' is an invalid type', () => {
        expect(_.take(testArray, 'a')).toEqual(OrigLodash.take(testArray, 'a'));
    });
});
