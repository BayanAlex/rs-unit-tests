const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: map', () => {
    let _ = new MyLodash();

    let testArray, testArray2, testArray3;
    let testObject, testObject2, testObject3;
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
        testObject2 = { a: null,  b: undefined, null: false,  c: 'test' };
        testObject3 = {a: 1, b: 2, c: 3};
        testString = '12357';
    });

    test('function must be defined', () => {
        expect(_.map).toBeDefined();
    });

    test('should not modify \'collection\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.map(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should work with an array collection', () => {
        const testFunction = (value) => value * 2;
        expect(_.map(testArray2, testFunction)).toEqual(OrigLodash.map(testArray2, testFunction));
    });

    test('should work with an object collection', () => {
        let testFunction = (value) => value * 2;
        expect(_.map(testObject3, testFunction)).toEqual(OrigLodash.map(testObject3, testFunction));
        testFunction = (value, key) => `${key}_${value}`;
        expect(_.map(testObject, testFunction)).toEqual(OrigLodash.map(testObject, testFunction));
    });

    test('should apply a user iteratee function', () => {
        let testFunction = (obj) => obj.user;
        let result = ['barney',  'fred', 'pebbles'];
        expect(_.map(testArray, testFunction)).toEqual(OrigLodash.map(testArray, testFunction));

        testFunction = (value, index) => `${index}: ${!!value}`;
        result = ['a: false', 'b: false', 'null: false', 'c: true'];
        expect(_.map(testObject2, testFunction)).toEqual(OrigLodash.map(testObject2, testFunction));
    });

    test('should apply _.matches shorthand', () => {
        expect(_.map(testArray, testArray[0])).toEqual(OrigLodash.map(testArray, testArray[0]));
    });

    test('should apply _.matchesProperty shorthand', () => {
        expect(_.map(testArray, ['active', false])).toEqual(OrigLodash.map(testArray, ['active', false]));
    });

    test('should apply _.property shorthand', () => {
        expect(_.map(testArray, 'user')).toEqual(OrigLodash.map(testArray, 'user'));
        expect(_.map(testArray, null)).toEqual(OrigLodash.map(testArray, null));
        expect(_.map(testArray, undefined)).toEqual(OrigLodash.map(testArray, undefined));
        expect(_.map(testArray, NaN)).toEqual(OrigLodash.map(testArray, NaN));
        expect(_.map(testArray, '')).toEqual(OrigLodash.map(testArray, ''));
    });

    test('should return an original collection if iteratee is omitted', () => {
        expect(_.map(testArray)).toEqual(OrigLodash.map(testArray));
    });

    test('should split a string', () => {
        let testFunction = (value) => value * 2;
        const result = [2, 4, 6, 10, 14];
        expect(_.map(testString, testFunction)).toEqual(OrigLodash.map(testString, testFunction));
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.map(null)).toEqual(OrigLodash.map(null));
        expect(_.map(undefined)).toEqual(OrigLodash.map(undefined));
        expect(_.map(undefined)).toEqual(OrigLodash.map(undefined));
    });
});
