const MyLodash = require('../mylodash');

describe('MyLodash: toPairs', () => {
    let _ = new MyLodash();

    let object1, object2, object3;
    let array, string;
    beforeEach(() => {
        object1 = { 'a': 1, 'b': '2', 'c': 3 };
        object2 = { 'a': 1, 'b': {'a': 1, 'c': 5}, 'c': 3 };
        object3 = { NaN: null, undefined: '', true: false };
        array = [0, 1, 'a', true, null];
        string = 'test';
    });

    test('function must be defined', () => {
        expect(_.toPairs).toBeDefined();
    });

    test('should not modify function arguments', () => {
        const objectCopy1 = Object.assign({}, object1);
        let result = _.toPairs(object1);
        expect(object1).toEqual(objectCopy1);
    });

    test('should make pairs of object properties', () => {
        let result = [['a', 1], ['b', '2'], ['c', 3]];
        expect(_.toPairs(object1)).toEqual(result);
        result = [['a', 1], ['b', {'a': 1, 'c': 5}], ['c', 3]];
        expect(_.toPairs(object2)).toEqual(result);
    });

    test('should process different types of keys and values', () => {
        result = [['NaN', null], ['undefined', ''], ['true', false]];
        expect(_.toPairs(object3)).toEqual(result);
    });

    test('should make an object from string', () => {
        const result = [['0', 't'], ['1', 'e'], ['2', 's'], ['3', 't']];
        expect(_.toPairs(string)).toEqual(result);
    });

    test('should make an object from array', () => {
        const result = [['0', 0], ['1', 1], ['2', 'a'], ['3', true], ['4', null]];
        expect(_.toPairs(array)).toEqual(result);
    });

    test('should take only own properties', () => {
        function Foo() {
            this.a = 1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        const result = [['a', 1], ['b', 2]];
        expect(_.toPairs(new Foo)).toEqual(result);
    });

    test('should return map and set entries', () => {
        const map = new Map();
        map.set('a', 1);
        map.set(2, true);
        let result = [['a', 1], [2, true]];
        expect(_.toPairs(map)).toEqual(result);
        const set = new Set([1, 'a']);
        result = [[1, 1], ['a', 'a']];
        expect(_.toPairs(set)).toEqual(result);
    });

    test('should return an empty array if \'object\' is invalid', () => {
        expect(_.toPairs(12)).toEqual([]);
        expect(_.toPairs(undefined)).toEqual([]);
        expect(_.toPairs(null)).toEqual([]);
    });
});
