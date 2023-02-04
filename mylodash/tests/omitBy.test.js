const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: omitBy', () => {
    let _ = new MyLodash();

    let object1, object2;
    let array, string;
    let testFunction, testFunction2;
    beforeEach(() => {
        object1 = { 'a': 1, 'b': 'd', 'c': 3 };
        object2 = { 'a': 1, 'b': {'a': 1, 'c': 5}, '1': 3 };
        array = [0, '1', 'a', true, null];
        string = 'test';

        testFunction = (value, key) => {
            return isNaN(value);
        }

        testFunction2 = (value, key) => {
            return isNaN(key);
        }
    });

    test('function must be defined', () => {
        expect(_.omitBy).toBeDefined();
    });

    test('should not modify function arguments', () => {
        const objectCopy1 = Object.assign({}, object1);
        let result = _.omitBy(object1, testFunction);
        expect(object1).toEqual(objectCopy1);
    });

    test('should apply a user function to omit by value', () => {
        expect(_.omitBy(object1, testFunction)).toEqual(OrigLodash.omitBy(object1, testFunction));
    });

    test('should apply a user function to omit by key', () => {
        expect(_.omitBy(object2, testFunction2)).toEqual(OrigLodash.omitBy(object2, testFunction2));
    });

    test('should make an object from a string', () => {
        testFunction = (value, key) => key === '0';
        expect(_.omitBy(string, testFunction)).toEqual(OrigLodash.omitBy(string, testFunction));
    });

    test('should make an object from an array', () => {
        expect(_.omitBy(array, testFunction)).toEqual(OrigLodash.omitBy(array, testFunction));
    });

    test('should skip nested object\'s properties', () => {
        testFunction = (value, key) => key === 'a';
        expect(_.omitBy(object2, testFunction)).toEqual(OrigLodash.omitBy(object2, testFunction));
    });

    test('should apply identity function is \'predicate\' argument is ommited', () => {
        expect(_.omitBy(array)).toEqual(OrigLodash.omitBy(array));
    });

    test('should handle invalid or empty \'paths\'', () => {
        expect(_.omitBy(object1, undefined)).toEqual(OrigLodash.omitBy(object1, undefined));
        expect(_.omitBy(object1, 12)).toEqual(OrigLodash.omitBy(object1, 12));
        expect(_.omitBy(object1, [12])).toEqual(OrigLodash.omitBy(object1, [12]));
        expect(_.omitBy(object1, '1')).toEqual(OrigLodash.omitBy(object1, '1'));
    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.omitBy(12, 0)).toEqual(OrigLodash.omitBy(12, 0));
        expect(_.omitBy(undefined, 0)).toEqual(OrigLodash.omitBy(undefined, 0));
        expect(_.omitBy(null, 0)).toEqual(OrigLodash.omitBy(null, 0));
    });
});
