const MyLodash = require('../mylodash');

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
        const result = { a: 1, c: 3 };
        expect(_.omitBy(object1, testFunction)).toEqual(result);
    });

    test('should apply a user function to omit by key', () => {
        const result = { '1': 3 };
        expect(_.omitBy(object2, testFunction2)).toEqual(result);
    });

    test('should make an object from a string', () => {
        const result = { 1: 'e', 2: 's', 3: 't' };
        testFunction = (value, key) => key === '0';
        expect(_.omitBy(string, testFunction)).toEqual(result);
    });

    test('should make an object from an array', () => {
        const result =  { 0: 0, 1: '1', 3: true, 4: null };
        expect(_.omitBy(array, testFunction)).toEqual(result);
    });

    test('should skip nested object\'s properties', () => {
        let result = { 'b': {'a': 1, 'c': 5}, '1': 3 };
        testFunction = (value, key) => key === 'a';
        expect(_.omitBy(object2, testFunction)).toEqual(result);
    });

    test('should apply identity function is \'predicate\' argument is ommited', () => {
        expect(_.omitBy(array)).toEqual({0: 0, 4: null});
    });

    test('should handle invalid or empty \'paths\'', () => {
        expect(_.omitBy(object1, undefined)).toEqual({});
        expect(_.omitBy(object1, 12)).toEqual(object1);
        expect(_.omitBy(object1, [12])).toEqual(object1);
        expect(_.omitBy(object1, '1')).toEqual(object1);
    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.omitBy(12, 0)).toEqual({});
        expect(_.omitBy(undefined, 0)).toEqual({});
        expect(_.omitBy(null, 0)).toEqual({});
    });
});
