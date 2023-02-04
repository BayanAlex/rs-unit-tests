const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: find', () => {
    let _ = new MyLodash();

    let testArray;
    beforeEach(() => {
        testArray = [
            { 'user': 'barney',  'active': false },
            { 'user': 'fred',    'active': false },
            { 'user': 'pebbles', 'active': true }
          ];
    });

    test('function must be defined', () => {
        expect(_.find).toBeDefined();
    });

    test('should not modify \'collection\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.find(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should work with an array collection', () => {
        const testFunction = (value) => value > 3;
        expect(_.find([0, 1, 2, 3, 4, 5], testFunction)).toEqual(OrigLodash.find([0, 1, 2, 3, 4, 5], testFunction));
    });

    test('should work with an object collection', () => {
        const testFunction = (value) => value > 2;
        expect(_.find({a: 1, b: 2, c: 3}, testFunction)).toEqual(OrigLodash.find({a: 1, b: 2, c: 3}, testFunction));
    });

    test('should apply a user function', () => {
        let testFunction = (obj) => !obj.active;
        expect(_.find(testArray, testFunction)).toEqual(OrigLodash.find(testArray, testFunction));

        testFunction = (obj) => obj.active;
        expect(_.find(testArray, testFunction)).toEqual(OrigLodash.find(testArray, testFunction));

        testFunction = (value) => value < 3;
        expect(_.find([0, 1, 2, 3, 4, 5], testFunction)).toEqual(OrigLodash.find([0, 1, 2, 3, 4, 5], testFunction));
    });

    test('should apply _.matches shorthand', () => {
        expect(_.find(testArray, testArray[0])).toEqual(OrigLodash.find(testArray, testArray[0]));
    });

    test('should apply _.matchesProperty shorthand', () => {
        expect(_.find(testArray, ['active', true])).toEqual(OrigLodash.find(testArray, ['active', true]));
    });

    test('should apply _.property shorthand', () => {
        expect(_.find(testArray, 'active')).toEqual(OrigLodash.find(testArray, 'active'));
        testArray = [
            { 'a': { 'b': 2 } },
            { 'a': { 'b': 1 } },
            { 'a': { 'b': false } },
        ];
        expect(_.find(testArray, 'a.b')).toEqual(OrigLodash.find(testArray, 'a.b'));
    });

    test('should return a first item from the collection if predicate is omitted', () => {
        expect(_.find(testArray)).toEqual(OrigLodash.find(testArray));
    });

    test('should split a string', () => {
        let testFunction = (value) => value === '2';
        expect(_.find('11234', testFunction)).toEqual(OrigLodash.find('11234', testFunction));
        testFunction = (value, index) => index > 2;
        expect(_.find('11234', testFunction)).toEqual(OrigLodash.find('11234', testFunction));
    });

    test('should start a search from \'fromIndex\'', () => {
        let testFunction = (value) => value > 1;
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, 2)).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, 2));
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, -2)).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, -2));
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, 10)).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, 10));
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, Infinity)).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, Infinity));
    });

    test('should convert \'fromIndex\' to a number', () => {
        let testFunction = (value) => value > 1;
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, '2')).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, '2'));
    });

    test('should start a search from the beginning of the collection if \'fromIndex\' is invalid', () => {
        let testFunction = (value) => value > 1;
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, NaN)).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, NaN));
        expect(_.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, {})).toEqual(OrigLodash.find([0, 2, 1, 0, 5, 3, 4, 4], testFunction, {}));
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.find(null)).toEqual(OrigLodash.find(null));
        expect(_.find(undefined)).toEqual(OrigLodash.find(undefined));
        expect(_.find(Infinity)).toEqual(OrigLodash.find(Infinity));
    });
});
