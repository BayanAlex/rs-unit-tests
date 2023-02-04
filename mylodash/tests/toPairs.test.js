const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

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
        expect(_.toPairs(object1)).toEqual(OrigLodash.toPairs(object1));
        expect(_.toPairs(object2)).toEqual(OrigLodash.toPairs(object2));
    });

    test('should process different types of keys and values', () => {
        expect(_.toPairs(object3)).toEqual(OrigLodash.toPairs(object3));
    });

    test('should make an object from string', () => {
        expect(_.toPairs(string)).toEqual(OrigLodash.toPairs(string));
    });

    test('should make an object from array', () => {
        const result = [['0', 0], ['1', 1], ['2', 'a'], ['3', true], ['4', null]];
        expect(_.toPairs(array)).toEqual(OrigLodash.toPairs(array));
    });

    test('should take only own properties', () => {
        function Foo() {
            this.a = 1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        expect(_.toPairs(new Foo)).toEqual(OrigLodash.toPairs(new Foo));
    });

    test('should return map and set entries', () => {
        const map = new Map();
        map.set('a', 1);
        map.set(2, true);
        expect(_.toPairs(map)).toEqual(OrigLodash.toPairs(map));
        const set = new Set([1, 'a']);
        expect(_.toPairs(set)).toEqual(OrigLodash.toPairs(set));
    });

    test('should return an empty array if \'object\' is invalid', () => {
        expect(_.toPairs(12)).toEqual(OrigLodash.toPairs(12));
        expect(_.toPairs(undefined)).toEqual(OrigLodash.toPairs(undefined));
        expect(_.toPairs(null)).toEqual(OrigLodash.toPairs(null));
    });
});
