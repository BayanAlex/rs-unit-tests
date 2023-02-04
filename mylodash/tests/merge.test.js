const MyLodash = require('../mylodash');
const OrigLodash = require('lodash');

describe('MyLodash: merge', () => {
    let _ = new MyLodash();

    let object1, object2;
    beforeEach(() => {
        object1 = {
            'a': [{ 'b': 2 }, { 'd': 4 }],
        };

        object2 = {
            'a': [{ 'c': 3 }, { 'e': 5 }],
        };
    });

    test('function must be defined', () => {
        expect(_.merge).toBeDefined();
    });

    test('should not modify function arguments', () => {
        const objectCopy1 = Object.assign({}, object1);
        const objectCopy2 = Object.assign({}, object2);
        expect(object1).toEqual(objectCopy1);
        expect(object2).toEqual(objectCopy2);
    });

    test('should merge objects\' properties', () => {
        expect(_.merge(object1, object2)).toEqual(OrigLodash.merge(object1, object2));
        expect(_.merge({ cpp: '12' }, { java: '23' }, { python: '35' })).toEqual(OrigLodash.merge({ cpp: '12' }, { java: '23' }, { python: '35' }));
    });

    test('should merge arrays as objects', () => {
        object1 = { 0: '1', 3: 2 };
        object2 = [3, 4];
        expect(_.merge(object1, object2)).toEqual(OrigLodash.merge(object1, object2));
        expect(_.merge(object2, object1)).toEqual(OrigLodash.merge(object2, object1));
    });

    test('should merge strings to objects', () => {
        object1 = { 0: '1', 3: 2 };
        object2 = 'ab';
        expect(_.merge(object1, object2)).toEqual(OrigLodash.merge(object1, object2));
    });

    test('should skip undefined source properties if they exist in the \'object\'', () => {
        object1 = { 0: 3, 1: {'a': 2} };
        object2 = { 0: undefined, 1: {'a': undefined}, 3: 2 };
        expect(_.merge(object1, object2)).toEqual(OrigLodash.merge(object1, object2));
    });

    test('should return Object-wrapped primitives if passed to \'object\' argument', () => {
        expect(_.merge(12, object1)).toEqual(OrigLodash.merge(12, object1));
        expect(_.merge('ab', object1)).toEqual(OrigLodash.merge('ab', object1));
        expect(_.merge(true, object1)).toEqual(OrigLodash.merge(true, object1));
    });

    test('should skip invalid or empty \'sources\'', () => {
        expect(_.merge(object1)).toEqual(OrigLodash.merge(object1));
        expect(_.merge([1, 2], {})).toEqual(OrigLodash.merge([1, 2], {}));
        expect(_.merge(object1, '', object2, null)).toEqual(OrigLodash.merge(object1, '', object2, null));
        expect(_.merge(object1, null, 11)).toEqual(OrigLodash.merge(object1, null, 11));
        expect(_.merge(object1, undefined)).toEqual(OrigLodash.merge(object1, undefined));
        expect(_.merge(object1, NaN)).toEqual(OrigLodash.merge(object1, NaN));
    });
});
