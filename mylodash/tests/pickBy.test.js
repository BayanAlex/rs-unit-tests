const MyLodash = require('../mylodash');

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
        const result = { 'b': 'd' };
        expect(_.pickBy(object1, testFunction)).toEqual(result);
    });

    test('should apply a user function to omit by key', () => {
        const result = { 'a': 1, 'b': {'a': 1, 'c': 5} };
        expect(_.pickBy(object2, testFunction2)).toEqual(result);
    });

    test('should make an object from a string', () => {
        const result = { 0: 't' };
        testFunction = (value, key) => key === '0';
        expect(_.pickBy(string, testFunction)).toEqual(result);
    });

    test('should make an object from an array', () => {
        const result =  { 2: 'a' };
        expect(_.pickBy(array, testFunction)).toEqual(result);
    });

    test('should skip nested object\'s properties', () => {
        let result = { 'a': 1 };
        testFunction = (value, key) => key === 'a';
        expect(_.pickBy(object2, testFunction)).toEqual(result);
    });

    test('should apply identity function is \'predicate\' argument is ommited', () => {
        expect(_.pickBy(array)).toEqual({ 1: '1', 2: 'a', 3: true });
    });

    test('should handle invalid or empty \'paths\'', () => {
        expect(_.pickBy(object1, undefined)).toEqual(object1);
        expect(_.pickBy(object1, 12)).toEqual({});
        expect(_.pickBy(object1, [12])).toEqual({});
        expect(_.pickBy(object1, '1')).toEqual({});
    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.pickBy(12, 0)).toEqual({});
        expect(_.pickBy(undefined, 0)).toEqual({});
        expect(_.pickBy(null, 0)).toEqual({});
    });
});
