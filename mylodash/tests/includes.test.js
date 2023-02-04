const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: includes', () => {
    let _ = new MyLodash();

    let testArray, testArray2, testArray3;
    let testObject, testObject2;
    let testString;
    beforeEach(() => {
        testArray = [
            { 'user': 'barney',  'active': false },
            { 'user': 'fred',    'active': false },
            { 'user': 'pebbles', 'active': true }
        ];
        testArray2 = [0, 1, 2, 3, 5, 6, 9];
        testArray3 = [1, '3', false, null, undefined, {a: 3}];

        testObject = { 'user': 'barney',  'age': 35, 'active': false };
        testObject2 = { 'a': null,  'b': undefined, null: false };

        testString = 'To be or no to be. 123. null';
    });

    test('function must be defined', () => {
        expect(_.includes).toBeDefined();
    });

    test('should not modify \'collection\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.includes(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should work with an array', () => {
        expect(_.includes(testArray, { 'user': 'barney',  'active': false })).toBe(OrigLodash.includes(testArray, { 'user': 'barney',  'active': false }));
        expect(_.includes(testArray2, 3)).toBe(OrigLodash.includes(testArray2, 3));
        expect(_.includes(testArray2, 20)).toBe(OrigLodash.includes(testArray2, 20));
    });

    test('should work with different types of array items', () => {
        expect(_.includes(testArray3, null)).toBe(OrigLodash.includes(testArray3, null));
        expect(_.includes(testArray3, {a: 3})).toBe(OrigLodash.includes(testArray3, {a: 3}));
        expect(_.includes(testArray3, undefined)).toBe(OrigLodash.includes(testArray3, undefined));
    });

    test('should work with an object', () => {
        expect(_.includes(testObject, 'barney')).toBe(OrigLodash.includes(testObject, 'barney'));
        expect(_.includes(testObject, 35)).toBe(OrigLodash.includes(testObject, 35));
        expect(_.includes(testObject, 15)).toBe(OrigLodash.includes(testObject, 15));
    });

    test('should work with different types of object properties', () => {
        expect(_.includes(testObject2, null)).toBe(OrigLodash.includes(testObject2, null));
        expect(_.includes(testObject2, false)).toBe(OrigLodash.includes(testObject2, false));
        expect(_.includes(testObject2, undefined)).toBe(OrigLodash.includes(testObject2, undefined));
    });

    test('should work with a string', () => {
        expect(_.includes(testString, 'to')).toBe(OrigLodash.includes(testString, 'to'));
        expect(_.includes(testString, '')).toBe(OrigLodash.includes(testString, ''));
        expect(_.includes(testString, 'TO')).toBe(OrigLodash.includes(testString, 'TO'));
    });

    test('should convert \'value\' to a string', () => {
        expect(_.includes(testString, 12)).toBe(OrigLodash.includes(testString, 12));
        expect(_.includes(testString, null)).toBe(OrigLodash.includes(testString, null));
    });

    test('should start a search from \'fromIndex\'', () => {
        expect(_.includes(testArray2, 1, 2)).toBe(OrigLodash.includes(testArray2, 1, 2));
        expect(_.includes(testArray2, 1, -6)).toBe(OrigLodash.includes(testArray2, 1, -6));
        expect(_.includes(testArray2, 1, 1)).toBe(OrigLodash.includes(testArray2, 1, 1));
        expect(_.includes(testArray2, 1, 10)).toBe(OrigLodash.includes(testArray2, 1, 10));
        expect(_.includes(testArray2, 1, Infinity)).toBe(OrigLodash.includes(testArray2, 1, Infinity));
    });

    test('should convert \'fromIndex\' to a number', () => {
        expect(_.includes(testArray2, 1, '2')).toBe(OrigLodash.includes(testArray2, 1, '2'));
        expect(_.includes(testArray2, 1, '1')).toBe(OrigLodash.includes(testArray2, 1, '1'));
    });

    test('should start a search from the beginning of the collection if \'fromIndex\' is invalid', () => {
        expect(_.includes(testArray2, 1, NaN)).toBe(OrigLodash.includes(testArray2, 1, NaN));
        expect(_.includes(testArray2, 1, {})).toBe(OrigLodash.includes(testArray2, 1, {}));
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.includes(null, 1)).toBe(OrigLodash.includes(null, 1));
        expect(_.includes(undefined, 1)).toBe(OrigLodash.includes(undefined, 1));
        expect(_.includes(Infinity, 1)).toBe(OrigLodash.includes(Infinity, 1));
    });
});
