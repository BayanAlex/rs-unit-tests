const MyLodash = require('../mylodash');

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

    test('should operate with an array collection', () => {
        const testFunction = (value) => value < 3;
        expect(_.filter([0, 1, 2, 3, 4, 5], testFunction)).toEqual([0, 1, 2]);
    });

    test('should operate with an object collection', () => {
        const testFunction = (value) => value > 1;
        expect(_.filter({a: 1, b: 2, c: 3}, testFunction)).toEqual([2, 3]);
    });

    test('should apply a user function', () => {
        let testFunction = (obj) => !obj.active;
        let result = [
            { 'user': 'barney',  'active': false },
            { 'user': 'fred',    'active': false },
        ];
        expect(_.filter(testArray, testFunction)).toEqual(result);

        testFunction = (obj) => obj.active;
        result = [{ 'user': 'pebbles', 'active': true }];
        expect(_.filter(testArray, testFunction)).toEqual(result);

        testFunction = (value) => value < 3;
        expect(_.filter([0, 1, 2, 3, 4, 5], testFunction)).toEqual([0, 1, 2]);
    });

    test('should apply _.matches shorthand', () => {
        const testValue = { 'user': 'barney',  'active': false };
        expect(_.filter(testArray, testValue)).toEqual([testValue]);
    });

    test('should apply _.matchesProperty shorthand', () => {
        const result =  [{ 'user': 'pebbles', 'active': true }];
        expect(_.filter(testArray, ['active', true])).toEqual(result);
    });

    test('should apply _.property shorthand', () => {
        expect(_.filter(testArray, 'active')).toEqual([testArray[2]]);
        testArray = [
            { 'a': { 'b': 2 } },
            { 'a': { 'b': 1 } },
            { 'a': { 'b': false } },
        ];
        expect(_.filter(testArray, 'a.b')).toEqual(testArray.slice(0, 2));
    });

    test('should return an array from the collection if predicate is omitted', () => {
        expect(_.filter(testArray)).toEqual(testArray);
    });

    test('should split a string', () => {
        let testFunction = (value) => value === '1';
        expect(_.filter('11234', testFunction)).toEqual(['1', '1']);
        testFunction = (value, index) => index > 2;
        expect(_.filter('11234', testFunction)).toEqual(['3', '4']);
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.filter(null)).toEqual([]);
        expect(_.filter(undefined)).toEqual([]);
        expect(_.filter(Infinity)).toEqual([]);
    });
});
