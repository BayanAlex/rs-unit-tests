const MyLodash = require('../mylodash');

describe('MyLodash: dropWhile', () => {
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
        expect(_.dropWhile).toBeDefined();
    });

    test('should return an instance of Array', () => {
        expect(_.dropWhile(testArray)).toBeInstanceOf(Array);
    });

    test('should not modify \'array\'', () => {
        const testArrayCopy = testArray.slice();
        const result = _.dropWhile(testArray);
        expect(testArray).toEqual(testArrayCopy);
    });

    test('should apply a user function', () => {
        let testFunction = (obj) => !obj.active;
        const result = [{ 'user': 'pebbles', 'active': true }];
        expect(_.dropWhile(testArray, testFunction)).toEqual(result);

        testFunction = (obj) => obj.active;
        expect(_.dropWhile(testArray, testFunction)).toEqual(testArray);

        testFunction = (value) => value < 3;
        expect(_.dropWhile([0, 1, 2, 3, 4, 5], testFunction)).toEqual([3, 4, 5]);
    });

    test('should apply _.matches shorthand', () => {
        const result =  [
                            { 'user': 'fred',    'active': false },
                            { 'user': 'pebbles', 'active': true }
                        ];
        expect(_.dropWhile(testArray, { 'user': 'barney', 'active': false })).toEqual(result);
    });

    test('should apply _.matchesProperty shorthand', () => {
        const result =  [{ 'user': 'pebbles', 'active': true }];
        expect(_.dropWhile(testArray, ['active', false])).toEqual(result);
    });

    test('should apply _.property shorthand', () => {
        expect(_.dropWhile(testArray, 'active')).toEqual(testArray);
        testArray[0].active = true;
        let result = [testArray[1], testArray[2]];
        expect(_.dropWhile(testArray, 'active')).toEqual(result);

        testArray = [
            { 'a': { 'b': 2 } },
            { 'a': { 'b': 1 } },
            { 'a': { 'b': false } },
        ];
        result = [{ 'a': { 'b': false } }];
        expect(_.dropWhile(testArray, 'a.b')).toEqual(result);
    });

    test('should return an empty array without a predicate', () => {
        expect(_.dropWhile(testArray)).toEqual([]);
    });

    test('should split a string', () => {
        const testFunction = (value) => value === '1';
        expect(_.dropWhile('11234', testFunction)).toEqual(['2', '3', '4']);
    });

    test('should operate with array-like objects', () => {
        const testArrayLike = {
            0: 1,
            1: 1,
            2: 2,
            3: 3,
            length: 4
        }
        const testFunction = (value) => value === 1;
        expect(_.dropWhile(testArrayLike, testFunction)).toEqual([2, 3]);
    });

    test('should return an empty array if \'array\' is an invalid type', () => {
        expect(_.dropWhile({ 0 : 3 })).toEqual([]);
        expect(_.dropWhile(null)).toEqual([]);
        expect(_.dropWhile(undefined)).toEqual([]);
        expect(_.dropWhile(Infinity)).toEqual([]);
        const testFunction = (value) => value === 1;
        let testArrayLike = {
            0: 1,
            1: 2,
            length: 'a'
        }
        expect(_.dropWhile(testArrayLike, testFunction)).toEqual([]);
        testArrayLike = {
            0: 1,
            1: 2,
            length: Infinity
        }
        expect(_.dropWhile(testArrayLike, testFunction)).toEqual([]);
    });
});
