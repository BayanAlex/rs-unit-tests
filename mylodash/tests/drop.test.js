const MyLodash = require('../mylodash');

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
        expect(_.drop(new Array(3), 2)).toEqual([undefined]);
    });

    test('should return a slice of array excluding n first items', () => {
        const result = [3, 4, 5, 6];
        expect(_.drop(testArray, 3)).toEqual(result);
    });

    test('should convert \'n\' to number', () => {
        const result = [3, 4, 5, 6];
        expect(_.drop(testArray, '3')).toEqual(result);
    });

    test('should process arrays with data of various types', () => {
        testArray = [0, 1, 2, 'test', null, true, { 0: 1 }];
        const result = ['test', null, true, { 0: 1 }];
        expect(_.drop(testArray, 3)).toEqual(result);
    });

    test('should return an empty array if \'array\' argument is an empty array', () => {
        expect(_.drop([], 1)).toEqual([]);
    });

    test('should return an empty array if \'n\' is bigger than array length', () => {
        expect(_.drop(testArray, Infinity)).toEqual([]);
        expect(_.drop(testArray, 8)).toEqual([]);
    });

    test('should return an array equal to original one if \'n\' is less or equals zero', () => {
        expect(_.drop(testArray, -Infinity)).toEqual(testArray);
        expect(_.drop(testArray, 0)).toEqual(testArray);
        expect(_.drop(testArray, -8)).toEqual(testArray);
    });

    test('should return an array sliced with n = 1 if \'n\' is omitted', () => {
        const result = [1, 2, 3, 4, 5, 6];
        expect(_.drop(testArray)).toEqual(result);
    });

    test('should split a string', () => {
        const result = ['a', 'b', 'c'];
        expect(_.drop('123abc', 3)).toEqual(result);
    });

    test('should work with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 3
        }
        let result = [3];

        expect(_.drop(testArrayLike, 2)).toEqual(result);
        testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 4
        }
        result = [2, 3, undefined];
        expect(_.drop(testArrayLike, 1)).toEqual(result);
    });

    test('should return an empty array if \'array\' has invalid type', () => {
        expect(_.drop({ 0 : 3 }, 3)).toEqual([]);
        expect(_.drop(null, 3)).toEqual([]);
        expect(_.drop(undefined, 3)).toEqual([]);
        expect(_.drop(Infinity, 3)).toEqual([]);
    });

    test('should return an array equal to original one if \'n\' is an invalid type', () => {
        expect(_.drop(testArray, 'a')).toEqual(testArray);
    });
});
