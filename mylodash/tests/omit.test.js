const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

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
        expect(_.omit(object2, 'b.a')).toEqual(OrigLodash.omit(object2, 'b.a'));
    });

    test('should omit properties from a given array of paths', () => {
        expect(_.omit(object2, ['a', 'b.a'])).toEqual(OrigLodash.omit(object2, ['a', 'b.a']));
        expect(_.omit(object2, 'b', 'a')).toEqual(OrigLodash.omit(object2, 'b', 'a'));
        expect(_.omit(object2, ['b', 'a'])).toEqual(OrigLodash.omit(object2, ['b', 'a']));
        expect(_.omit(object2, [['b', 'a']])).toEqual(OrigLodash.omit(object2, [['b', 'a']]));
    });

    test('should omit properties from multiple paths arguments', () => {
        expect(_.omit(object2, 'a', 'b.a', ['c'])).toEqual(OrigLodash.omit(object2, 'a', 'b.a', ['c']));
    });

    test('should work with path arguments of different types', () => {
        object1 = { undefined: 1, null: '2', NaN: 3, 'c': 4 };
        expect(_.omit(object1, undefined, NaN)).toEqual(OrigLodash.omit(object1, undefined, NaN));
        expect(_.omit(object1, null)).toEqual(OrigLodash.omit(object1, null));
    });

    test('should make an object from string', () => {
        expect(_.omit(string, 0)).toEqual(OrigLodash.omit(string, 0));
    });

    test('should make an object from array', () => {
        expect(_.omit(array, 0)).toEqual(OrigLodash.omit(array, 0));
    });

    test('should skip nested object\'s properties', () => {
        expect(_.omit(object2, [0, 'c'])).toEqual(OrigLodash.omit(object2, [0, 'c']));
    });

    test('should skip invalid or empty \'paths\'', () => {
        expect(_.omit(object1)).toEqual(OrigLodash.omit(object1));
        expect(_.omit(object1, {})).toEqual(OrigLodash.omit(object1));
        expect(_.omit(object1, 'f.b')).toEqual(OrigLodash.omit(object1));
    });

    test('should return an empty object if \'object\' is invalid', () => {
        expect(_.omit(12, 0)).toEqual(OrigLodash.omit(12, 0));
        expect(_.omit(undefined, 0)).toEqual(OrigLodash.omit(12, 0));
        expect(_.omit(null, 0)).toEqual(OrigLodash.omit(12, 0));
    });
});
