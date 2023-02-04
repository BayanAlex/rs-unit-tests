const MyLodash = require('../mylodash');

describe('MyLodash: omit', () => {
    let _ = new MyLodash();

    let object1, object2;
    let array, string;
    beforeEach(() => {
        object1 = { 'a': 1, 'b': '2', 'c': 3 };
        object2 = { 'a': 1, 'b': {'a': 1, 'c': 5}, 'c': 3 };
        array = [0, 1, 'a', true, null];
        string = 'test';
    });

    test('function must be defined', () => {
        expect(_.omit).toBeDefined();
    });

    test('should not modify function arguments', () => {
        const objectCopy1 = Object.assign({}, object1);
        let result = _.omit(object1, 'a');
        expect(object1).toEqual(objectCopy1);
    });

    test('should omit properties from a given string path', () => {
        const result = { a: 1, b: {c: 5}, c: 3 };
        expect(_.omit(object2, 'b.a')).toEqual(result);
    });

    test('should omit properties from a given array of paths', () => {
        let result = { b: {c: 5}, c: 3 };
        expect(_.omit(object2, ['a', 'b.a'])).toEqual(result);
        result = { c: 3 };
        expect(_.omit(object2, 'b', 'a')).toEqual(result);
        expect(_.omit(object2, ['b', 'a'])).toEqual(result);
        result = { a: 1, b: {c: 5}, c: 3 };
        expect(_.omit(object2, [['b', 'a']])).toEqual(result);
    });

    test('should omit properties from multiple paths arguments', () => {
        const result = { b: {c: 5} };
        expect(_.omit(object2, 'a', 'b.a', ['c'])).toEqual(result);
    });

    test('should work with path arguments of different types', () => {
        object1 = { undefined: 1, null: '2', NaN: 3, 'c': 4 };
        let result = { null: '2', 'c': 4 };
        expect(_.omit(object1, undefined, NaN)).toEqual(result);
        result = { undefined: 1, NaN: 3, 'c': 4 };
        expect(_.omit(object1, null)).toEqual(result);
    });

    test('should make an object from string', () => {
        const result = { 1: 'e', 2: 's', 3: 't' };
        expect(_.omit(string, 0)).toEqual(result);
    });

    test('should make an object from array', () => {
        const result =  { 1: 1, 2: 'a', 3: true, 4: null };
        expect(_.omit(array, 0)).toEqual(result);
    });

    test('should skip nested object\'s properties', () => {
        let result = { 'a': 1, 'b': {'a': 1, 'c': 5} };
        expect(_.omit(object2, [0, 'c'])).toEqual(result);
    });

    test('should skip invalid or empty \'paths\'', () => {
        expect(_.omit(object1)).toEqual(object1);
        expect(_.omit(object1, {})).toEqual(object1);
        expect(_.omit(object1, 'f.b')).toEqual(object1);
    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.omit(12, 0)).toEqual({});
        expect(_.omit(undefined, 0)).toEqual({});
        expect(_.omit(null, 0)).toEqual({});
    });
});
