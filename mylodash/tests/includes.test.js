const MyLodash = require('../mylodash');

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

    test('should operate with an array', () => {
        expect(_.includes(testArray2, 3)).toBe(true);
        expect(_.includes(testArray2, 20)).toBe(false);
    });

    test('should operate with different types of array items', () => {
        expect(_.includes(testArray3, null)).toBe(true);
        expect(_.includes(testArray3, undefined)).toBe(true);
    });

    test('should operate with an object', () => {
        expect(_.includes(testObject, 'barney')).toBe(true);
        expect(_.includes(testObject, 35)).toBe(true);
        expect(_.includes(testObject, 15)).toBe(false);
    });

    test('should operate with different types of object properties', () => {
        expect(_.includes(testObject2, null)).toBe(true);
        expect(_.includes(testObject2, false)).toBe(true);
        expect(_.includes(testObject2, undefined)).toBe(true);
    });

    test('should operate with a string', () => {
        expect(_.includes(testString, 'to')).toBe(true);
        expect(_.includes(testString, '')).toBe(true);
        expect(_.includes(testString, 'TO')).toBe(false);
    });

    test('should convert \'value\' to a string', () => {
        expect(_.includes(testString, 12)).toBe(true);
        expect(_.includes(testString, null)).toBe(true);
    });

    test('should start a search from \'fromIndex\'', () => {
        expect(_.includes(testArray2, 1, 2)).toBe(false);
        expect(_.includes(testArray2, 1, -2)).toBe(false);
        expect(_.includes(testArray2, 1, 1)).toBe(true);
        expect(_.includes(testArray2, 1, 10)).toBe(false);
        expect(_.includes(testArray2, 1, Infinity)).toBeUndefined;
    });

    test('should convert \'fromIndex\' to a number', () => {
        expect(_.includes(testArray2, 1, '2')).toBe(false);
        expect(_.includes(testArray2, 1, '1')).toBe(true);
    });

    test('should start a search from the beginning of the collection if \'fromIndex\' is invalid', () => {
        expect(_.includes(testArray2, 1, NaN)).toBe(true);
        expect(_.includes(testArray2, 1, {})).toBe(true);
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.includes(null, 1)).toBe(false);
        expect(_.includes(undefined, 1)).toBe(false);
        expect(_.includes(Infinity, 1)).toBe(false);
    });
});
