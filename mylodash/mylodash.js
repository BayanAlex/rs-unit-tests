class MyLodash {
    pushToArray(array, value) {
        array[array.length] = value;
    }

    arrayFrom(array) {
        if (array instanceof Array) return [...array];
        if (typeof array === 'string') return array.split('');
        if (array.length) {
            const count = +array.length;
            if (isNaN(count) || !isFinite(count) || count <= 0) return [];
            const result = [];
            for (let i = 0; i < count; i += 1) {
                this.pushToArray(result, array[i]);
            }
            return result;
        }
        return [];
    }

    slice(array, start, end) {
        let result = [];
        const _end = (!end || end > array.length) ? array.length : end;
        for (let curItem = start; curItem < _end; curItem += 1) {
            this.pushToArray(result, array[curItem]);
        }
        return result;
    }

    chunk(array, size = 1) {
        const result = [];
        const intSize = +size;
        if (!array || !array.length || isNaN(intSize) || intSize <= 0) return [];

        const testArray = this.arrayFrom(array);

        const intCount = Math.floor(testArray.length / intSize);
        const modCount = testArray.length % intSize;
        for (let i = 0; i < intCount; i += 1) {
            const curArray = this.slice(testArray, i * intSize, (i + 1) * intSize);
            this.pushToArray(result, curArray);
        }
        if (modCount > 0) {
            const curArray = this.slice(testArray, testArray.length - modCount, testArray.length);
            this.pushToArray(result, curArray);
        }
        return result;
    }

    compact(array) {
        if (!array || !array.length) return [];

        const testArray = this.arrayFrom(array);
        const result = [];
        for (let value of testArray) {
            if (!!value) this.pushToArray(result, value);
        }
        return result;
    }

    drop(array, n = 1) {
        const start = +n;
        if (!array || !array.length) return [];
        if (start <= 0 || isNaN(start)) return array;

        const result = this.slice(this.arrayFrom(array), start);
        return result;
    }

    static identity = (value) => value;

    static get(object, path, defaultValue) {
        let _path;
        if (path instanceof Array) {
            _path = path;
        } else if (typeof path === 'string') {
            _path = path.split('.');
        } else {
            _path = [path];
        }

        let result = object;
        for (let i = 0; i < _path.length; i += 1) {
            if (result) {
                result = result[_path[i]];
            } else return defaultValue;
        }
        return result;
    }

    static matches(source) {
        return (obj) => JSON.stringify(obj) === JSON.stringify(source);
    }

    static matchesProperty(path, srcValue) {
        return (obj) => MyLodash.get(obj, path) === srcValue;
    }

    static property(path) {
        return (obj) => MyLodash.get(obj, path);
    }

    static assignSpecFunction(value) {
        if (value instanceof Function) {
            return value;
        } else if (value instanceof Array) {
            return MyLodash.matchesProperty(...value);
        } else if (value instanceof Object) {
            return MyLodash.matches(value);
        } else {
            return MyLodash.property(value);
        }
    }

    dropWhile(array, predicate = MyLodash.identity) {
        if (!array || !array.length || !predicate) return [];
        const testArray = this.arrayFrom(array);

        const result = [];
        const specFunction = MyLodash.assignSpecFunction(predicate);

        let keepDropping = true;
        for (let i = 0; i < testArray.length; i += 1) {
            if (keepDropping && !specFunction(testArray[i], i, testArray)) {
                keepDropping = false;
            }
            if (!keepDropping) {
                this.pushToArray(result, testArray[i]);
            }
        }
        return result;
    }

    take(array, n = 1) {
        const end = +n;
        if(!array || !array.length || end <= 0 || isNaN(end)) return [];

        const result = this.slice(this.arrayFrom(array), 0, end);
        return result;
    }

    filter(collection, predicate = MyLodash.identity) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return [];

        const result = [];
        const specFunction = MyLodash.assignSpecFunction(predicate);
        for (let prop in collection) {
            if (specFunction(collection[prop], prop, collection)) {
                this.pushToArray(result, collection[prop]);
            }
        }
        return result;
    }

    find(collection, predicate = MyLodash.identity, fromIndex = 0) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return [];

        let start = +fromIndex;
        if (isNaN(start)) start = 0;
        const specFunction = MyLodash.assignSpecFunction(predicate);

        let index = 0;
        for (let prop in collection) {
            if (index >= start && specFunction(collection[prop], prop, collection)) {
                return collection[prop];
            }
            index += 1;
        }
        return undefined;
    }

    includes(collection, value, fromIndex = 0) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return false;

        let start = +fromIndex;
        if (isNaN(start)) start = 0;

        if(typeof collection === 'string') {
            const searchValue = '' + value;
            return collection.includes(searchValue); //String.prototype function is allowed
        }

        let index = 0;
        for (let prop in collection) {
            if (index >= start && (typeof collection[prop] === 'object' ? JSON.stringify(collection[prop]) ===  JSON.stringify(value) : collection[prop] === value)) {
                return true;
            }
            index += 1;
        }
        return false;
    }

    map(collection, iteratee = MyLodash.identity) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return [];

        if (iteratee === null || iteratee === undefined) return collection;

        const specFunction = MyLodash.assignSpecFunction(iteratee);

        const result = [];
        for (let prop in collection) {
            this.pushToArray(result, specFunction(collection[prop], prop, collection));
        }
        return result;
    }

    zip(...arrays) {
        if (arrays.length === 0) return [];

        const result = [];
        const validArray = (array) => !!array && (array instanceof Array || (typeof array === 'object' && !isNaN(array.length)));
        const lenArr = this.map(arrays, (array) => validArray(array) ? +array.length : 0);
        const maxLength = Math.max(...lenArr);
        for (let array of arrays) {
            if (validArray(array)) {
                for (let i = 0; i < maxLength; i += 1) {
                    if (result.length <= i) {
                        this.pushToArray(result, []);
                    }
                    this.pushToArray(result[i], array[i]);
                }
            }
        }
        return result;
    }

//*************** Objects ***************

    merge(object, ...sources) {
        const result = object instanceof Object ? JSON.parse(JSON.stringify(object)) : new Object(object);
        if (!sources || (typeof object !== 'object')) return result;

        const setProp = (source, dest, prop) => {
            if (!(dest[prop] instanceof Object && source[prop] instanceof Object)) {
                if (source[prop] !== undefined) dest[prop] = source[prop];
                return;
            }
            for (let p in source[prop]) {
                if (typeof source[prop][p] === 'object') {
                    setProp(source[prop], dest[prop], p);
                }
                else if (source[prop] !== undefined) {
                    dest[prop][p] = source[prop][p];
                }
            }
        };

        for (let source of sources) {
            for (let prop in source) {
                setProp(source, result, prop);
            }
        }

        return result;
    }

    // omit() {

    // }

    // omitBy() {

    // }

    // pick() {

    // }

    // pickBy() {

    // }

    // toPairs() {

    // }
}

module.exports = MyLodash;
