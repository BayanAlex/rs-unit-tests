const MyLodash = require('../mylodash');

describe('MyLodash: zip', () => {
    let _ = new MyLodash();

    let testArray, testArray2, testArray3;
    let testArrayObject;
    beforeEach(() => {
        testArray = [0, 1, 2, 3, 5, 6, 9];
        testArray2 = [2, 3, 4, 5, 6, 7];
        testArray3 = [1, '3', false, null, undefined, {a: 3}];
        testArrayObject = {0: 1, 1: 2, 2: 3, length: 3};
    });

    test('function must be defined', () => {
        expect(_.zip).toBeDefined();
    });

    test('should not modify \'arrays\'', () => {
        const testArrayCopy = testArray.slice();
        const testArrayCopy2 = testArray2.slice();
        const result = _.zip([testArray, testArray2]);
        expect(testArray).toEqual(testArrayCopy);
        expect(testArray2).toEqual(testArrayCopy2);
    });

    test('should operate with arrays', () => {
        let result = [[0, 2], [1, 3], [2, 4], [3, 5], [5, 6], [6, 7], [9, undefined]];
        expect(_.zip(testArray, testArray2)).toEqual(result);
        result = [[0, 2, 1], [1, 3, '3'], [2, 4, false], [3, 5, null], [5, 6, undefined], [6, 7, {a: 3}], [9, undefined, undefined]];
        expect(_.zip(testArray, testArray2, testArray3)).toEqual(result);
    });

    test('should operate with array-like objects', () => {
        let result = [[0, 1], [1, 2], [2, 3], [3, undefined], [5, undefined], [6, undefined], [9, undefined]];
        expect(_.zip(testArray, testArrayObject)).toEqual(result);
    });

    test('should ignore \'arrays\' items of non-array types', () => {
        const result = [[0], [1], [2], [3], [5], [6], [9]];
        expect(_.zip(testArray, '123')).toEqual(result);
        expect(_.zip(null, testArray)).toEqual(result);
        delete testArrayObject.length;
        expect(_.zip(testArray, testArrayObject)).toEqual(result);
    });

    test('should return an empty array if \'arrays\' is an invalid type or empty', () => {
        expect(_.zip()).toEqual([]);
        expect(_.zip([])).toEqual([]);
        expect(_.zip(null)).toEqual([]);
        expect(_.zip(undefined)).toEqual([]);
        expect(_.zip(Infinity)).toEqual([]);
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.zip(testArrayLike)).toEqual([]);
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.zip(testArrayLike)).toEqual([]);
    });
});
