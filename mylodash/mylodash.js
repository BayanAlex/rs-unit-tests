class MyLodash {

//*************** Utils ***************

    pushToArray(array, value) {
        array[array.length] = value;
    }

    arrayFrom(value) {
        if (value instanceof Array) return [...value];
        if (typeof value === 'string') return value.split('');
        if (value?.length) {
            const count = +value.length;
            if (isNaN(count) || !isFinite(count) || count <= 0) return [];
            const result = [];
            for (let i = 0; i < count; i += 1) {
                this.pushToArray(result, value[i]);
            }
            return result;
        }
        return [];
    }

    objectFrom(value) {
        if (typeof value === 'string' || value instanceof Array) return {...value};
        if (value instanceof Object) return JSON.parse(JSON.stringify(value));
        return {};
    }

    slice(array, start, end) {
        let result = [];
        const _end = (!end || end > array.length) ? array.length : end;
        for (let curItem = start; curItem < _end; curItem += 1) {
            this.pushToArray(result, array[curItem]);
        }
        return result;
    }

    toPath(value) {
        if (value instanceof Array) {
            return value;
        } else if (typeof value === 'string') {
            return value.replace('.[', '.').replace('[', '.').replace('].', '.').replace(']', '.').split('.');
        } else {
            return [value];
        }
    }

    identity = (value) => value;

    get(object, path, defaultValue) {
        let _path = this.toPath(path);
        let result = object;
        for (let i = 0; i < _path.length; i += 1) {
            if (result) {
                result = result[_path[i]];
            } else return defaultValue;
        }
        return result;
    }

    set(object, path, value) {
        const _path = this.toPath(path);
        let curPath = object;
        for (let i = 0; i < _path.length - 1; i += 1) {
            if (!isNaN(Number.parseInt(_path[i + 1]))) curPath[_path[i]] = [];
            else curPath[_path[i]] = {};
            curPath = curPath[_path[i]];
        }
        curPath[_path[_path.length - 1]] = value;
    }

    matches(source) {
        return (obj) => JSON.stringify(obj) === JSON.stringify(source);
    }

    matchesProperty(path, srcValue) {
        return (obj) => this.get(obj, path) === srcValue;
    }

    property(path) {
        return (obj) => this.get(obj, path);
    }

    assignSpecFunction(value) {
        if (value instanceof Function) {
            return value;
        } else if (value instanceof Array) {
            return this.matchesProperty(...value);
        } else if (value instanceof Object) {
            return this.matches(value);
        } else {
            return this.property(value);
        }
    }

//*************** Objects ***************

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

    dropWhile(array, predicate = this.identity) {
        if (!array || !array.length || !predicate) return [];
        const testArray = this.arrayFrom(array);

        const result = [];
        const specFunction = this.assignSpecFunction(predicate);

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

    filter(collection, predicate = this.identity) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return [];

        const result = [];
        const specFunction = this.assignSpecFunction(predicate);
        for (let prop in collection) {
            if (specFunction(collection[prop], prop, collection)) {
                this.pushToArray(result, collection[prop]);
            }
        }
        return result;
    }

    find(collection, predicate = this.identity, fromIndex = 0) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return undefined;

        let start = +fromIndex;
        if (isNaN(start)) start = 0;
        const specFunction = this.assignSpecFunction(predicate);

        let count = 0;
        for (let prop in collection) count += 1;
        if (start < 0) start = count + start;
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

        if (typeof collection === 'string') {
            const searchValue = '' + value;
            return collection.includes(searchValue); //String.prototype is not forbidden
        }

        let count = 0;
        for (let prop in collection) count += 1;
        if (start < 0) start = count + start;
        let index = 0;
        for (let prop in collection) {
            if (index >= start && collection[prop] === value) {
                return true;
            }
            index += 1;
        }
        return false;
    }

    map(collection, iteratee = this.identity) {
        if (!collection || (!collection.length && !(typeof collection === 'object'))) return [];

        if (iteratee === null || iteratee === undefined) return collection;

        const specFunction = this.assignSpecFunction(iteratee);

        const result = [];
        for (let prop in collection) {
            this.pushToArray(result, specFunction(collection[prop], prop, collection));
        }
        return result;
    }

    zip(...arrays) {
        if (arrays.length === 0) return [];

        const result = [];
        const validArray = (array) => !!array && (array instanceof Array || (typeof array === 'object' && !isNaN(+array.length) && isFinite(+array.length)));
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

        const setProp = (source, dest, prop) => {
            if (!(dest[prop] instanceof Object && source[prop] instanceof Object)) {
                if (source[prop] !== undefined) dest[prop] = source[prop];
                return;
            }
            for (let p in source[prop]) {
                if (typeof source[prop][p] === 'object') {
                    setProp(source[prop], dest[prop], p);
                }
                else if (source[prop][p] !== undefined) {
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

    omit(object, ...paths) {
        const result = this.objectFrom(object);

        const removeProp = (path) => {
            let _path = this.toPath(path);
            let curPath = result;
            for (let i = 0; i < _path.length; i += 1) {
                if (!curPath) return;
                if (i < _path.length - 1) curPath = curPath[_path[i]];
            }
            delete curPath[_path[_path.length - 1]];
        };

        for (let path of paths) {
            if (path instanceof Array) {
                for (let subpath of path) {
                    removeProp(subpath);
                }
            } else {
                removeProp(path);
            }
        }
        return result;
    }

    omitBy(object, predicate = this.identity) {
        if (!(object instanceof Object) && (typeof object !== 'string')) return {};
        if (!(predicate instanceof Function)) return object;

        const result = this.objectFrom(object);
        for (let key in result) {
            if (predicate(result[key], key)) {
                delete result[key];
            }
        }

        return result;
    }

    pick(object, ...paths) {
        if (!(object instanceof Object) && (typeof object !== 'string')) return {};

        const result = {};

        const addProp = (path) => {
            const noValue = {};
            const value = this.get(object, path, noValue);
            if (value !== noValue) {
                this.set(result, path, value);
            }
        };

        for (let path of paths) {
            if (path instanceof Array) {
                for (let subpath of path) {
                    addProp(subpath);
                }
            } else {
                addProp(path);
            }
        }
        return result;
    }

    pickBy(object, predicate = this.identity) {
        if (!(predicate instanceof Function)) return {};

        const result = this.objectFrom(object);
        for (let key in result) {
            if (!predicate(result[key], key)) {
                delete result[key];
            }
        }

        return result;
    }

    toPairs(object) {
        const result = [];
        if (object instanceof Set) {
            for (let key of object.keys()) { // Set.prototype is not forbidden
                this.pushToArray(result, [key, key]);
            }
            return result;
        }

        if (object instanceof Map) {
            for (let key of object.keys()) { // Map.prototype is not forbidden
                this.pushToArray(result, [key, object.get(key)]);
            }
            return result;
        }

        const _object = this.objectFrom(object);
        for (let i in _object) {
            this.pushToArray(result, [i, _object[i]]);
        }

        return result;
    }
}

module.exports = MyLodash;
