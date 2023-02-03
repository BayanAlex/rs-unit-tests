const MyLodash = require('../mylodash');

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
        expect(_.map(testArray2, testFunction)).toEqual([0, 2, 4, 6, 10, 12, 18]);
    });

    test('should work with an object collection', () => {
        let testFunction = (value) => value * 2;
        expect(_.map(testObject3, testFunction)).toEqual([2, 4, 6]);
        testFunction = (value, key) => `${key}_${value}`;
        expect(_.map(testObject, testFunction)).toEqual(['user_barney',  'age_35', 'active_false']);
    });

    test('should apply a user iteratee function', () => {
        let testFunction = (obj) => obj.user;
        let result = ['barney',  'fred', 'pebbles'];
        expect(_.map(testArray, testFunction)).toEqual(result);

        testFunction = (value, index) => `${index}: ${!!value}`;
        result = ['a: false', 'b: false', 'null: false', 'c: true'];
        expect(_.map(testObject2, testFunction)).toEqual(result);
    });

    test('should apply _.matches shorthand', () => {
        expect(_.map(testArray, testArray[0])).toEqual([true, false, false]);
    });

    test('should apply _.matchesProperty shorthand', () => {
        expect(_.map(testArray, ['active', false])).toEqual([true, true, false]);
    });

    test('should apply _.property shorthand', () => {
        const result = ['barney',  'fred', 'pebbles'];
        expect(_.map(testArray, 'user')).toEqual(result);
        expect(_.map(testArray, null)).toEqual(testArray);
        expect(_.map(testArray, undefined)).toEqual(testArray);
        expect(_.map(testArray, NaN)).toEqual([undefined, undefined, undefined]);
        expect(_.map(testArray, '')).toEqual([undefined, undefined, undefined]);
    });

    test('should return an original collection if iteratee is omitted', () => {
        expect(_.map(testArray)).toEqual(testArray);
    });

    test('should split a string', () => {
        let testFunction = (value) => value * 2;
        const result = [2, 4, 6, 10, 14];
        expect(_.map(testString, testFunction)).toEqual(result);
    });

    test('should return an empty array if \'collection\' is an invalid type', () => {
        expect(_.map(null)).toEqual([]);
        expect(_.map(undefined)).toEqual([]);
        expect(_.map(Infinity)).toEqual([]);
    });
});
