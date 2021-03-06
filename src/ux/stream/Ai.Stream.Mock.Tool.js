import Prop from "../prop/Ux.Prop";
import U from "underscore";
import Value from '../Ux.Value';
import Ai from '../ai/AI';

const keys = (reference) => {
    const grid = Prop.fromHoc(reference, "grid");
    // 启用了 Mock
    const {options = {}} = grid ? grid : {};
    let fields = [];
    if (options['mock.enabled']) {
        const keys = options['mock.keys'];
        if (U.isArray(keys)) {
            fields = keys;
        } else {
            fields = keys.split(",");
        }
    }
    return fields;
};
const input = (source) => {
    let data = {};
    if (U.isArray(source)) {
        /* JsonArray格式专用 */
        data.data = Value.clone(source);
        data.type = Symbol.for("ARRAY");
        data.size = source.length;
    } else if (U.isObject(source)) {
        const fnObject = (object = {}) => {
            const result = {};
            result.data = Value.clone(object);
            result.type = Symbol.for("OBJECT");
            result.size = Object.keys(object).length;
            return result;
        };
        /* List分页专用 */
        if (2 === Object.keys(source).length) {
            const {list, count} = source;
            if (undefined !== list && undefined !== count) {
                data.data = Value.clone(list);
                data.type = Symbol.for("LIST");
                data.size = count;
            } else {
                data = fnObject(source);
            }
        } else {
            data = fnObject(source);
        }
    }
    return data;
};
const filter = (data = {}, $query = {}) => {
    const input = Value.clone(data.data);
    const searcher = Ai.aiSearcher(input);
    const list = searcher.query($query);
    const count = searcher.count($query);
    return {list, count};
};
const remove = (data = {}, id, keyField = 'key') => {
    let result = Value.clone(data.data);
    /* 全部 id */
    let ids;
    if (U.isArray(id)) {
        ids = Value.immutable(id);
    } else {
        ids = Value.immutable([id]);
    }
    result = result.filter(item => !ids.contains(item[keyField]));
    /* 刷新data */
    data.data = result;
    data.size = data.size - 1;
    return resultList(data);
};
const get = (data = {}, id, keyField = 'key') => {
    let result = Value.clone(data.data);
    result = result.filter(item => id === item[keyField]);
    if (result[0]) {
        return result[0];
    }
};
/*
 * data 是源
 * record 是Object
 *
 */
const updateItem = (data = [], record, keyField = 'key') => {
    if (record) {
        data.forEach(item => {
            if (item && item[keyField] === record[keyField]) {
                /* 覆盖掉，但是不覆盖主键 */
                const key = item.key;
                Object.assign(item, record);
                item.key = key;
            }
        });
    }
    return data;
};
const update = (data, records, keyField = 'key') => {
    let result = Value.clone(data.data);
    /* 全部记录 */
    if (records) {
        if (U.isArray(records)) {
            records.forEach(record => updateItem(result, record, keyField));
        } else {
            updateItem(result, records, keyField);
        }
    }
    /* 刷新data */
    data.data = result;
    return resultList(data);
};
const add = (data, records) => {
    let original = Value.clone(data.data);
    let result = [];
    if (records) {
        if (U.isArray(records)) {
            records.forEach(record => result.push(record));
        } else {
            result.push(records);
        }
    }
    original.forEach(old => result.push(old));
    data.data = result;
    return resultList(data);
};
const resultList = (data) => {
    const {type} = data;
    if (Symbol.for("LIST") === type) {
        /* 返回source */
        return {
            list: data.data,
            count: data.size,
        };
    } else {
        return data.data;
    }
};
const consume = (data = {}, fnList, fnObject) => {
    const {type} = data;
    if (Symbol.for("LIST") === type ||
        Symbol.for("ARRAY") === type) {
        if (U.isFunction(fnList)) {
            return fnList();
        }
    } else {
        if (U.isFunction(fnObject)) {
            return fnObject();
        }
    }
};
const fnList = (data = {}, fnList) => {
    const {type} = data;
    return consume(data, fnList,
        () => {
            throw new Error(`[Ox] 该操作对 type = ${Symbol.keyFor(type)} 的模拟数据不支持！`);
        });
};
export default {
    keys,       // 读取 keys
    input,      // 输入解析
    filter,     // 搜索
    get,        // 读取数据
    // ---- 返回 source ----
    remove,     // 修改 data，返回 source
    update,     // 修改 data，返回 source
    add,        // 修改 data，返回 source
    // 执行
    fnList,
};