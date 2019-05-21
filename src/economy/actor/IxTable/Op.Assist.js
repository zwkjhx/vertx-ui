import Ux from 'ux';
import {Tag} from 'antd';
import React from 'react';

const initSelection = (reference) => {
    return {
        onChange: ($keys = []) => {
            reference.setState({$keys});
        }
    }
};
const initTotal = (reference) => (total) => {
    const {$table = {}} = reference.props;
    if ($table.total) {
        const {$query = {}, $selected = []} = reference.props;
        const {pager = {}} = $query;
        const page = Ux.valueInt(total / pager.size) + 1;
        const {report, selected} = $table.total;
        const reportJsx = Ux.formatExpr(report, {total, page});
        return (
            <span>
                {selected ? (
                    <Tag color={"magenta"}>
                        {Ux.formatExpr(selected, {count: $selected.length})}
                    </Tag>
                ) : false}
                {reportJsx}
            </span>
        )
    } else return false;
};
const initPager = (reference = {}) => {
    const {$data = {}, $query = {}} = reference.props;
    const {pager = {}} = $query;
    return {
        showSizeChanger: true,
        showQuickJumper: true,

        size: "small",
        pageSize: pager.size,

        total: $data.count,
        showTotal: initTotal(reference)
    };
};
export default {
    initSelection,
    initPager,
}