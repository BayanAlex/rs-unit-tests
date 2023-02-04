const MyLodash = require('../mylodash');

describe('MyLodash: pick', () => {
    let _ = new MyLodash();

    let object1, object2, object3;
    let array, string;
    beforeEach(() => {
        object1 = { 'a': 1, 'b': '2', 'c': 3 };
        object2 = { 'a': 1, 'b': {'a': 1, 'c': 5}, 'c': 3 };
        object3 = { 'a': 1, 'b': [{'a': 1, 'c': 5}] };
        array = [0, 1, 'a', true, null];
        string = 'test';
    });

    test('function must be defined', () => {
        expect(_.pick).toBeDefined();
    });

    test('should not modify function arguments', () => {
        const objectCopy1 = Object.assign({}, object1);
        let result = _.pick(object1, 'a');
        expect(object1).toEqual(objectCopy1);
    });

    test('should pick properties from a given string path', () => {
        const result = { 'b': {'a': 1} };
        expect(_.pick(object2, 'b.a')).toEqual(result);
    });

    test('should pick properties from a given array of paths', () => {
        let result = { 'a': 1, 'b': {'a': 1} };
        expect(_.pick(object2, ['a', 'b.a'])).toEqual(result);
        result = { 'b': [{'a': 1}] };
        expect(_.pick(object3, 'b[0]a')).toEqual(result);
    });

    test('should pick properties from multiple paths arguments', () => {
        const result = { 'a': 1, 'b': {'a': 1}, 'c': 3 }
        expect(_.pick(object2, 'a', 'b.a', ['c'])).toEqual(result);
    });

    test('should work with path arguments of different types', () => {
        object1 = { undefined: 1, null: '2', NaN: 3, 'c': 4 };
        let result = { undefined: 1, NaN: 3 };
        expect(_.pick(object1, undefined, NaN)).toEqual(result);
        result = { null: '2' };
        expect(_.pick(object1, null)).toEqual(result);
    });

    test('should make an object from string', () => {
        const result = { 0: 't' };
        expect(_.pick(string, 0)).toEqual(result);
    });

    test('should make an object from array', () => {
        const result =  { 0: 0 };
        expect(_.pick(array, 0)).toEqual(result);
    });

    test('should skip nested object\'s properties', () => {
        let result = { 'c': 3 };
        expect(_.pick(object2, [0, 'c'])).toEqual(result);
    });

    test('should skip invalid or empty \'paths\'', () => {
        expect(_.pick(object1)).toEqual({});
        expect(_.pick(object1, {})).toEqual({});
        expect(_.pick(object1, 'f.d')).toEqual({});

    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.pick(12, 0)).toEqual({});
        expect(_.pick(undefined, 0)).toEqual({});
        expect(_.pick(null, 0)).toEqual({});
    });
});
