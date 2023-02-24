const MyLodash = require('../mylodash');

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
        let result = _.merge(object1, object2);
        expect(object1).toEqual(objectCopy1);
        expect(object2).toEqual(objectCopy2);
    });

    test('should merge objects\' properties', () => {
        let result = { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] };
        expect(_.merge(object1, object2)).toEqual(result);
        result = {cpp: '12', java: '23', python: '35'};
        expect(_.merge({ cpp: '12' }, { java: '23' }, { python: '35' })).toEqual(result);
    });

    test('should merge arrays as objects', () => {
        object1 = { 0: '1', 3: 2 };
        object2 = [3, 4];
        let result = { 0: 3, 1: 4, 3: 2 };
        expect(_.merge(object1, object2)).toEqual(result);
        result = ['1', 4, undefined, 2];
        expect(_.merge(object2, object1)).toEqual(result);
    });

    test('should merge strings to objects', () => {
        object1 = { 0: '1', 3: 2 };
        object2 = 'ab';
        const result = { 0: 'a', 1: 'b', 3: 2 };
        expect(_.merge(object1, object2)).toEqual(result);
    });

    test('should skip undefined source properties if they exist in the \'object\'', () => {
        object1 = { 0: 3, 1: {'a': 2} };
        object2 = { 0: undefined, 1: {'a': undefined}, 3: 2 };
        const result = { 0: 3, 1: {'a': 2}, 3: 2 };
        expect(_.merge(object1, object2)).toEqual(result);
    });

    test('should return an Object-wrapped primitive passed to \'object\' argument merged with the object \'value\'', () => {
        let result = new Number(12);
        result.a = [{b: 2}, {d: 4}];
        expect(_.merge(12, object1)).toEqual(new Number(12));
        result = new String('ab');
        result.a = [{b: 2}, {d: 4}];
        expect(_.merge('ab', object1)).toEqual(result);
        result = new Boolean(true);
        result.a = [{b: 2}, {d: 4}];
        expect(_.merge(true, object1)).toEqual(result);
    });

    test('should skip invalid or empty \'sources\'', () => {
        expect(_.merge(object1)).toEqual(object1);
        expect(_.merge([1, 2], {})).toEqual([1, 2]);
        const result = { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] };
        expect(_.merge(object1, '', object2, null)).toEqual(result);
        expect(_.merge(object1, null, 11)).toEqual(object1);
        expect(_.merge(object1, undefined)).toEqual(object1);
        expect(_.merge(object1, NaN)).toEqual(object1);
    });
});
