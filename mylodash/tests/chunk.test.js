const MyLodash = require('../mylodash');

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
        const result1 = [[1, 2, 3], [ 4, 5, 6]];
        const result2 = [[1, 2], [3, 4], [5, 6]];
        expect(_.chunk(testArray, 3)).toEqual(result1);
        expect(_.chunk(testArray, 2)).toEqual(result2);
    });


    test('should return array chunked with size = 1 if \'size\' is omitted', () => {
        const result = [[1], [2], [3], [4], [5], [6]];
        expect(_.chunk(testArray)).toEqual(result);
    });

    test('should return an array of arrays of given size and array of remaining items', () => {
        const result = [[1, 2, 3, 4], [5, 6]];
        expect(_.chunk(testArray, 4)).toEqual(result);
    });

    test('should convert \'size\' to number', () => {
        const result = [[1, 2, 3, 4], [5, 6]];
        expect(_.chunk(testArray, '4')).toEqual(result);
    });

    test('should process arrays with data of various types', () => {
        testArray = [1, '3', false, null, undefined, {a: 3}]
        const result = [[1, '3', false], [null, undefined, {a: 3}]];
        expect(_.chunk(testArray, 3)).toEqual(result);
    });

    test('should return an empty array if \'array\' argument is an empty array', () => {
        expect(_.chunk([], 1)).toEqual([]);
    });

    test('should return an array consisting of 1 array item if \'size\' is bigger than array length', () => {
        expect(_.chunk(testArray, Infinity)).toEqual([testArray]);
        expect(_.chunk(testArray, 8)).toEqual([testArray]);
    });

    test('should return an empty array if \'size\' is less or equals zero', () => {
        expect(_.chunk(testArray, -Infinity)).toEqual([]);
        expect(_.chunk(testArray, 0)).toEqual([]);
        expect(_.chunk(testArray, -8)).toEqual([]);
    });

    test('should work with new Array', () => {
        const result = [[undefined, undefined], [undefined]];
        expect(_.chunk(new Array(3), 2)).toEqual(result);
    });

    test('should split a string', () => {
        const result = [['1', '2'], ['3', '4']];
        expect(_.chunk('1234', 2)).toEqual(result);
    });

    test('should work with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 3
        }
        let result = [[1, 2], [3]];

        expect(_.chunk(testArrayLike, 2)).toEqual(result);
        testArrayLike = {
            0: 1,
            1: 2,
            length: 3
        }
        result = [[1, 2], [undefined]];
        expect(_.chunk(testArrayLike, 2)).toEqual(result);
    });

    test('should return an empty array if \'array\' is an invalid type', () => {
        expect(_.chunk({ 0 : 3 }, 3)).toEqual([]);
        expect(_.chunk(null, 3)).toEqual([]);
        expect(_.chunk(undefined, 3)).toEqual([]);
        expect(_.chunk(Infinity, 3)).toEqual([]);
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
        expect(_.chunk(testArray, 'a')).toEqual([]);
    });
});
