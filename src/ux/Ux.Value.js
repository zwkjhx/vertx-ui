import U from "underscore";
import Value from './value';

/**
 * 两个字符串的专用连接方法，用于做不重复链接，
 * @method stringConnect
 * @private
 * @param left
 * @param right
 */
const stringConnect = (left, right) => {
    if (left && right && "string" === typeof left && "string" === typeof right) {
        if (right.startsWith(left)) {
            return right;
        } else {
            return left + right;
        }
    }
};
const arrayConnect = (item, fnEach, dividier = ',') => {
    if (!item) return [];
    if (U.isArray(item)) return item;
    if ("string" === typeof item) {
        const result = item.split(dividier);
        if (fnEach) {
            return result.map(fnEach);
        } else {
            return result;
        }
    } else {
        return [];
    }
};
const fix = (cell, reference) => {
    // Fix：特殊Fix，兼容Raft模式和非Raft模式
    // Raft模式下应该是cell, reference
    // 非Raft模式下允许直接调用
    if (undefined === reference) {
        return cell;
    } else {
        return reference;
    }
};
/**
 * @class Value
 * @description 数值计算器
 */
export default {

    // Raft模式和非Raft模式专用方法
    fix,
    // 多形态数组统一调用
    arrayConnect,
    // 合并左右处理（left,right)，简单归并
    stringConnect,

    ...Value,
};
