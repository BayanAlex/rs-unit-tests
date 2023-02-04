const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: filter', () => {
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
        expect(_.filter).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.filter(testArray)).toBeInstanceOf(Array);
    });

    test('should not modify \'collection\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.filter(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should work with an array collection', () => {
        const testFunction = (value) => value < 3;
        expect(_.filter([0, 1, 2, 3, 4, 5], testFunction)).toEqual(OrigLodash.filter([0, 1, 2, 3, 4, 5], testFunction));
    });

    test('should work with an object collection', () => {
        const testFunction = (value) => value > 1;
        expect(_.filter({a: 1, b: 2, c: 3}, testFunction)).toEqual(OrigLodash.filter({a: 1, b: 2, c: 3}, testFunction));
    });

    test('should apply a user function', () => {
        let testFunction = (obj) => !obj.active;
        expect(_.filter(testArray, testFunction)).toEqual(OrigLodash.filter(testArray, testFunction));

        testFunction = (obj) => obj.active;
        expect(_.filter(testArray, testFunction)).toEqual(OrigLodash.filter(testArray, testFunction));

        testFunction = (value) => value < 3;
        expect(_.filter([0, 1, 2, 3, 4, 5], testFunction)).toEqual(OrigLodash.filter([0, 1, 2, 3, 4, 5], testFunction));
    });

    test('should apply _.matches shorthand', () => {
        const testValue = { 'user': 'barney',  'active': false };
        expect(_.filter(testArray, testValue)).toEqual(OrigLodash.filter(testArray, testValue));
    });

    test('should apply _.matchesProperty shorthand', () => {
        expect(_.filter(testArray, ['active', true])).toEqual(OrigLodash.filter(testArray, ['active', true]));
    });

    test('should apply _.property shorthand', () => {
        expect(_.filter(testArray, 'active')).toEqual(OrigLodash.filter(testArray, 'active'));
        testArray = [
            { 'a': { 'b': 2 } },
            { 'a': { 'b': 1 } },
            { 'a': { 'b': false } },
        ];
        expect(_.filter(testArray, 'a.b')).toEqual(OrigLodash.filter(testArray, 'a.b'));
    });

    test('should return an array from the collection if predicate is omitted', () => {
        expect(_.filter(testArray)).toEqual(OrigLodash.filter(testArray));
    });

    test('should split a string', () => {
        let testFunction = (value) => value === '1';
        expect(_.filter('11234', testFunction)).toEqual(OrigLodash.filter('11234', testFunction));
        testFunction = (value, index) => index > 2;
        expect(_.filter('11234', testFunction)).toEqual(OrigLodash.filter('11234', testFunction));
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.filter(null)).toEqual(OrigLodash.filter(null));
        expect(_.filter(undefined)).toEqual(OrigLodash.filter(undefined));
        expect(_.filter(Infinity)).toEqual(OrigLodash.filter(Infinity));
    });
});
