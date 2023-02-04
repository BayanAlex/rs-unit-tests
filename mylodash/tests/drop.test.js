const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: drop', () => {
    let _ = new MyLodash();

    let testArray;
    beforeEach(() => {
        testArray = [0, 1, 2, 3, 4, 5, 6];
    });

    test('function must be defined', () => {
        expect(_.drop).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.drop(testArray)).toBeInstanceOf(Array);
    });

    test('should not modify \'array\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.drop(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should work with new Array', () => {
        expect(_.drop(new Array(3), 2)).toEqual(OrigLodash.drop(new Array(3), 2));
    });

    test('should return a slice of array excluding n first items', () => {
        expect(_.drop(testArray, 3)).toEqual(OrigLodash.drop(testArray, 3));
    });

    test('should convert \'n\' to number', () => {
        expect(_.drop(testArray, '3')).toEqual(OrigLodash.drop(testArray, '3'));
    });

    test('should process arrays with data of various types', () => {
        testArray = [0, 1, 2, 'test', null, true, { 0: 1 }];
        expect(_.drop(testArray, 3)).toEqual(OrigLodash.drop(testArray, 3));
    });

    test('should return an empty array if \'array\' argument is an empty array', () => {
        expect(_.drop([], 1)).toEqual(OrigLodash.drop([], 1));
    });

    test('should return an empty array if \'n\' is bigger than array length', () => {
        expect(_.drop(testArray, Infinity)).toEqual(OrigLodash.drop(testArray, Infinity));
        expect(_.drop(testArray, 8)).toEqual(OrigLodash.drop(testArray, 8));
    });

    test('should return an array equal to original one if \'n\' is less or equals zero', () => {
        expect(_.drop(testArray, -Infinity)).toEqual(OrigLodash.drop(testArray, -Infinity));
        expect(_.drop(testArray, 0)).toEqual(OrigLodash.drop(testArray, 0));
        expect(_.drop(testArray, -8)).toEqual(OrigLodash.drop(testArray, -8));
    });

    test('should return an array sliced with n = 1 if \'n\' is omitted', () => {
        expect(_.drop(testArray)).toEqual(OrigLodash.drop(testArray));
    });

    test('should split a string', () => {
        expect(_.drop('123abc', 3)).toEqual(OrigLodash.drop('123abc', 3));
    });

    test('should work with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 3
        }
        expect(_.drop(testArrayLike, 2)).toEqual(OrigLodash.drop(testArrayLike, 2));
        testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 4
        }
        expect(_.drop(testArrayLike, 1)).toEqual(OrigLodash.drop(testArrayLike, 1));
    });

    test('should return an empty array if \'array\' has invalid type', () => {
        expect(_.drop({ 0 : 3 }, 3)).toEqual(OrigLodash.drop({ 0 : 3 }, 3));
        expect(_.drop(null, 3)).toEqual(OrigLodash.drop(null, 3));
        expect(_.drop(undefined, 3)).toEqual(OrigLodash.drop(undefined, 3));
        expect(_.drop(Infinity, 3)).toEqual(OrigLodash.drop(Infinity, 3));
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.drop(testArrayLike)).toEqual([]);
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.drop(testArrayLike)).toEqual([]);
    });

    test('should return an array equal to original one if \'n\' is an invalid type', () => {
        expect(_.drop(testArray, 'a')).toEqual(OrigLodash.drop(testArray, 'a'));
    });
});
