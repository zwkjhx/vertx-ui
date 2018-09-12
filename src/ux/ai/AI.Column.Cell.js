import Value from "../Ux.Value";
import fieldRender from "../jsx/Ux.Jsx.Single";
import Format from "../util/Ux.Format";
import Expr from "../util/Ux.Expr";
import RxAnt from "./AI.RxAnt";
import Ai from './AI'
import Prop from "../prop/Ux.Prop";
import Type from "../Ux.Type";
import React from "react";
import {Icon} from "antd";
import U from 'underscore'
import CellOp from './AI.Column.Op';

/**
 * 【高阶函数：二阶】列render方法处理器，用于处理双值
 * * 配置键：LOGICAL
 * * true/false对应不同的双值，以及不同值呈现值
 * * 附加配置项中包含$mapping用于描述双值配置
 * @method aiCellLogical
 * @private
 * @param {React.PureComponent} reference React对应组件引用
 * @param {Object} config 单列配置数据
 * @return {function(*): *}
 * @example
 *
 *      ...
 *      {
 *          "title": "房包早",
 *          "dataIndex": "brekker",
 *          "$render": "LOGICAL",
 *          "$mapping": {
 *              "true": "是",
 *              "false": "否"
 *          }
 *      }
 */
const aiCellLogical = (reference, config = {}) => text => {
    const {$mapping = {}} = config;
    const literal = text ? $mapping["true"] : $mapping["false"];
    const item = Value.valueIcon(literal);
    return fieldRender.jsxIcon(item);
};

/**
 * 【高阶函数：二阶】列render方法处理器，用于处理带百分号（%）的字符串格式化
 * * 配置值：PERCENT
 * @method aiCellPercent
 * @private
 * @param {React.PureComponent} reference React对应组件引用
 * @param {Object} config 单列配置数据
 * @return {function(*=): *}
 */
const aiCellPercent = (reference, config) => text => {
    return (
        <span>{Format.fmtPercent(text)}</span>
    )
};
/**
 * 【高阶函数：二阶】列render方法处理器，用于处理时间格式化
 * * 配置值：DATE
 * * 附加配置中包含$format用于描述moment的格式Pattern
 * @method aiCellDate
 * @private
 * @param {React.PureComponent} reference React对应组件引用
 * @param {Object} config 单列配置数据
 * @return {function(*=): *}
 * @example
 *
 *      ...
 *      {
 *          "title": "抵达日期",
 *          "dataIndex": "arriveTime",
 *          "$render": "DATE",
 *          "$format": "YYYY年MM月DD日 HH:mm:ss"
 *      }
 */
const aiCellDate = (reference, config) => text => {
    if (config.$empty) {
        if (!text) {
            return false;
        }
    }
    return <span>{Expr.formatDate(text, config.$format)}</span>;
};
/**
 * 【高阶函数：二阶】列render方法处理器，用于处理货币格式化
 * * 配置值：CURRENCY
 * * 附加配置中包含$flag用于描述货币符号，默认为￥
 * @method aiCellCurrency
 * @private
 * @param {React.PureComponent} reference React对应组件引用
 * @param {Object} config 单列配置数据
 * @return {function(*=): *}
 * @example
 *
 *      ...
 *      {
 *          "title": "单价",
 *          "dataIndex": "unitPrice",
 *          "$render": "CURRENCY"
 *      },
 */
const aiCellCurrency = (reference, config = {}) => text => {
    const unit = config.$unit ? config.$unit : "￥";
    return <span>{unit}{Format.fmtCurrency(text)}</span>;
};
/**
 * 【高阶函数：二阶】列render方法处理函数，用于处理表达式格式化
 * * 配置项：EXPRESSION
 * * 附加配置$expr用于描述表达式，表达式中的占位符使用`:value`的格式
 * @method aiCellExpression
 * @private
 * @param {React.PureComponent} reference React对应组件引用
 * @param {Object} config 单列配置数据
 * @return {function(*=): *}
 * @example
 *
 *      ...
 *      {
 *          "title": "入住天数",
 *          "dataIndex": "insideDays",
 *          "$render": "EXPRESSION",
 *          "$expr": ":value天"
 *      }
 */
const aiCellExpression = (reference, config) => text => {
    return undefined !== text ? (
        <span> {Expr.formatExpr(config.$expr, {value: text})}</span>) : false
};
/**
 * 【高阶函数：二阶】列render方法处理函数，用于处理Datum类型：Tabular/Assist专用格式化
 * * 配置项：DATUM
 * * 附加配置项：$datum用于描述关联的信息，source = key, value和display对应值和呈现字段
 * @method aiCellDatum
 * @private
 * @param {React.PureComponent} reference React对应组件引用
 * @param {Object} config 单列配置数据
 * @return {function(*=): *}
 * @example
 *
 *      ...
 *      {
 *          "title": "会计科目",
 *          "dataIndex": "accountId",
 *          "$render": "DATUM",
 *          "$datum": {
 *              "source": "account.item",
 *              "value": "category",
 *              "display": "name"
 *          }
 *      }
 */
const aiCellDatum = (reference, config) => text => {
    const $datum = config['$datum'];
    const datum = "string" === typeof $datum ? RxAnt.toParsed($datum) : $datum;
    const data = Prop.onDatum(reference, datum.source);
    if (U.isArray(text)) {
        const result = [];
        text.forEach(each => result.push(Type.elementUnique(data, datum.value, each)));
        return (
            <span>{result.map(item => item[datum.display]).join('，')}</span>)
    } else {
        const item = Type.elementUnique(data, datum.value, text);
        return <span>{item ? item[datum.display] : false}</span>;
    }
};
const aiCellIcon = (reference, config) => text => {
    const mapping = config['$mapping'] ? config['$mapping'] : {};
    const target = mapping[text];
    if (U.isObject(target)) {
        return <span>
            {target.icon ? <Icon type={target.icon}
                                 style={target.style ? target.style : {}}/> : false}
            &nbsp;&nbsp;{target.text}
        </span>
    } else {
        return <span>{target}</span>
    }
};
const aiCellDownload = (reference, config) => (text) => {
    // TODO:
    let downloadConfig = config["$download"];
    if (!downloadConfig) downloadConfig = {};
    return (
        <a href={text}>{downloadConfig.flag ? downloadConfig.flag : text}</a>)
};
const aiCellMapping = (reference, config) => (text) => {
    const mapping = config['$mapping'];
    if (mapping) {
        const literal = mapping[text];
        if (literal && 0 < literal.indexOf(",")) {
            const item = Ai.aiExprIcon(literal);
            return fieldRender.jsxIcon(item);
        } else {
            return <span>{mapping[text]}</span>
        }
    } else {
        return <span>{text}</span>
    }
};
export default {
    LOGICAL: aiCellLogical,
    DATE: aiCellDate,
    CURRENCY: aiCellCurrency,
    EXPRESSION: aiCellExpression,
    DATUM: aiCellDatum,
    PERCENT: aiCellPercent,
    ICON: aiCellIcon,
    MAPPING: aiCellMapping,
    DOWNLOAD: aiCellDownload,
    ...CellOp,
}