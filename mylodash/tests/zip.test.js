const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

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

    test('should work with arrays', () => {
        expect(_.zip(testArray, testArray2)).toEqual(OrigLodash.zip(testArray, testArray2));
        expect(_.zip(testArray, testArray2, testArray3)).toEqual(OrigLodash.zip(testArray, testArray2, testArray3));
    });

    test('should work with array-like objects', () => {
        expect(_.zip(testArray, testArrayObject)).toEqual(OrigLodash.zip(testArray, testArrayObject));
    });

    test('should ignore \'arrays\' items of non-array types', () => {
        expect(_.zip(testArray, '123')).toEqual(OrigLodash.zip(testArray, '123'));
        expect(_.zip(null, testArray)).toEqual(OrigLodash.zip(null, testArray));
        delete testArrayObject.length;
        expect(_.zip(testArray, testArrayObject)).toEqual(OrigLodash.zip(testArray, testArrayObject));
    });

    test('should return an empty array if \'arrays\' is an invalid type or empty', () => {
        expect(_.zip()).toEqual(OrigLodash.zip());
        expect(_.zip([])).toEqual(OrigLodash.zip([]));
        expect(_.zip(null)).toEqual(OrigLodash.zip(null));
        expect(_.zip(undefined)).toEqual(OrigLodash.zip(undefined));
        expect(_.zip(Infinity)).toEqual(OrigLodash.zip(Infinity));
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.zip(testArrayLike)).toEqual(OrigLodash.zip(testArrayLike));
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.zip(testArrayLike)).toEqual(OrigLodash.zip(testArrayLike));
    });
});
