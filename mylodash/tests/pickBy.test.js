const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: pickBy', () => {
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
        expect(_.pickBy).toBeDefined();
    });

    test('should not modify function arguments', () => {
        const objectCopy1 = Object.assign({}, object1);
        let result = _.pickBy(object1, testFunction);
        expect(object1).toEqual(objectCopy1);
    });

    test('should apply a user function to omit by value', () => {
        expect(_.pickBy(object1, testFunction)).toEqual(OrigLodash.pickBy(object1, testFunction));
    });

    test('should apply a user function to omit by key', () => {
        expect(_.pickBy(object2, testFunction2)).toEqual(OrigLodash.pickBy(object2, testFunction2));
    });

    test('should make an object from a string', () => {
        testFunction = (value, key) => key === '0';
        expect(_.pickBy(string, testFunction)).toEqual(OrigLodash.pickBy(string, testFunction));
    });

    test('should make an object from an array', () => {
        expect(_.pickBy(array, testFunction)).toEqual(OrigLodash.pickBy(array, testFunction));
    });

    test('should skip nested object\'s properties', () => {
        testFunction = (value, key) => key === 'a';
        expect(_.pickBy(object2, testFunction)).toEqual(OrigLodash.pickBy(object2, testFunction));
    });

    test('should apply identity function is \'predicate\' argument is ommited', () => {
        expect(_.pickBy(array)).toEqual(OrigLodash.pickBy(array));
    });

    test('should handle invalid or empty \'paths\'', () => {
        expect(_.pickBy(object1, undefined)).toEqual(OrigLodash.pickBy(object1, undefined));
        expect(_.pickBy(object1, 12)).toEqual(OrigLodash.pickBy(object1, 12));
        expect(_.pickBy(object1, [12])).toEqual(OrigLodash.pickBy(object1, [12]));
        expect(_.pickBy(object1, '1')).toEqual(OrigLodash.pickBy(object1, '1'));
    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.pickBy(12, 0)).toEqual(OrigLodash.pickBy(12, 0));
        expect(_.pickBy(undefined, 0)).toEqual(OrigLodash.pickBy(undefined, 0));
        expect(_.pickBy(null, 0)).toEqual(OrigLodash.pickBy(null, 0));
    });
});
