const MyLodash = require('../mylodash');

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

    test('should be able to accept \'array\' created with \'new Array()\'', () => {
        expect(_.take(new Array(3), 2)).toEqual([undefined, undefined]);
    });

    test('should return a slice of array excluding n first items', () => {
        const result = [0, 1, 2];
        expect(_.take(testArray, 3)).toEqual(result);
    });

    test('should convert \'n\' to number', () => {
        const result = [0, 1, 2];
        expect(_.take(testArray, '3')).toEqual(result);
    });

    test('should process arrays with data of various types', () => {
        testArray = [0, 1, 2, 'test', null, true, { 0: 1 }];
        const result = [0, 1, 2, 'test', null];
        expect(_.take(testArray, 5)).toEqual(result);
    });

    test('should return an empty array if \'array\' argument is an empty array', () => {
        expect(_.take([], 1)).toEqual([]);
    });

    test('should return an array equal to original one if \'n\' is bigger than array length', () => {
        expect(_.take(testArray, Infinity)).toEqual(testArray);
        expect(_.take(testArray, 8)).toEqual(testArray);
    });

    test('should return an empty array if \'n\' is less or equals zero', () => {
        expect(_.take(testArray, -Infinity)).toEqual([]);
        expect(_.take(testArray, 0)).toEqual([]);
        expect(_.take(testArray, -8)).toEqual([]);
    });

    test('should return an array sliced with n = 1 if \'n\' is omitted', () => {
        const result = [0];
        expect(_.take(testArray)).toEqual(result);
    });

    test('should split a string', () => {
        const result = ['1', '2', '3'];
        expect(_.take('123abc', 3)).toEqual(result);
    });

    test('should operate with array-like objects', () => {
        let testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 3
        }
        let result = [1, 2];

        expect(_.take(testArrayLike, 2)).toEqual(result);
        testArrayLike = {
            0: 1,
            1: 2,
            2: 3,
            length: 4
        }
        result = [1, 2];
        expect(_.take(testArrayLike, 2)).toEqual(result);
    });

    test('should return an empty array if \'array\' has invalid type', () => {
        expect(_.take({ 0 : 3 }, 3)).toEqual([]);
        expect(_.take(null, 3)).toEqual([]);
        expect(_.take(undefined, 3)).toEqual([]);
        expect(_.take(Infinity, 3)).toEqual([]);
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
        expect(_.take(testArray, 'a')).toEqual([]);
    });
});
