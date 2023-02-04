const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: chunk', () => {
    let _ = new MyLodash();

    let testArray;
    beforeEach(() => {
        testArray = [1, 2, 3, 4, 5, 6];
    });

    test('function must be defined', () => {
        expect(_.chunk).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.chunk(testArray, 2)).toBeInstanceOf(Array);
    });

    test('should not modify \'array\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.chunk(testArray, 3);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should return an array of arrays of given size', () => {
        expect(_.chunk(testArray, 3)).toEqual(OrigLodash.chunk(testArray, 3));
        expect(_.chunk(testArray, 2)).toEqual(OrigLodash.chunk(testArray, 2));
    });


    test('should return array chunked with size = 1 if \'size\' is omitted', () => {
        expect(_.chunk(testArray)).toEqual(OrigLodash.chunk(testArray));
    });

    test('should return an array of arrays of given size and array of remaining items', () => {
        expect(_.chunk(testArray, 4)).toEqual(OrigLodash.chunk(testArray, 4));
    });

    test('should convert \'size\' to number', () => {
        expect(_.chunk(testArray, '4')).toEqual(OrigLodash.chunk(testArray, '4'));
    });

    test('should process arrays with data of various types', () => {
        testArray = [1, '3', false, null, undefined, {a: 3}]
        expect(_.chunk(testArray, 3)).toEqual(OrigLodash.chunk(testArray, 3));
    });

    test('should return an empty array if \'array\' argument is an empty array', () => {
        expect(_.chunk([], 1)).toEqual(OrigLodash.chunk([], 1));
    });

    test('should return an array consisting of 1 array item if \'size\' is bigger than array length', () => {
        expect(_.chunk(testArray, Infinity)).toEqual(OrigLodash.chunk(testArray, Infinity));
        expect(_.chunk(testArray, 8)).toEqual(OrigLodash.chunk(testArray, 8));
    });

    test('should return an empty array if \'size\' is less or equals zero', () => {
        expect(_.chunk(testArray, -Infinity)).toEqual(OrigLodash.chunk(testArray, -Infinity));
        expect(_.chunk(testArray, 0)).toEqual(OrigLodash.chunk(testArray, 0));
        expect(_.chunk(testArray, -8)).toEqual(OrigLodash.chunk(testArray, -8));
    });

    test('should work with new Array', () => {
        expect(_.chunk(new Array(3), 2)).toEqual(OrigLodash.chunk(new Array(3), 2));
    });

    test('should split a string', () => {
        expect(_.chunk('1234', 2)).toEqual(OrigLodash.chunk('1234', 2));
    });

    test('should work with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 3
        }

        expect(_.chunk(testArrayLike, 2)).toEqual(OrigLodash.chunk(testArrayLike, 2));
        testArrayLike = {
            0: 1,
            1: 2,
            length: 3
        }
        expect(_.chunk(testArrayLike, 2)).toEqual(OrigLodash.chunk(testArrayLike, 2));
    });

    test('should return an empty array if \'array\' is an invalid type', () => {
        expect(_.chunk({ 0 : 3 }, 3)).toEqual(OrigLodash.chunk({ 0 : 3 }, 3));
        expect(_.chunk(null, 3)).toEqual(OrigLodash.chunk(null, 3));
        expect(_.chunk(undefined, 3)).toEqual(OrigLodash.chunk(undefined, 3));
        expect(_.chunk(Infinity, 3)).toEqual(OrigLodash.chunk(Infinity, 3));
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.chunk(testArrayLike)).toEqual([]);
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.chunk(testArrayLike)).toEqual([]);
    });

    test('should return an empty array if \'size\' is an invalid type', () => {
        expect(_.chunk(testArray, 'a')).toEqual(OrigLodash.chunk(testArray, 'a'));
    });
});
