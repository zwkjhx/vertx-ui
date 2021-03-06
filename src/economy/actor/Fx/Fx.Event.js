import Ux from 'ux';
import Q from './Fx.Query';
import Mock from './Fx.Mock';
import Cond from './Fx.Condition';
import Unity from './Fx.Unity';
/* 继承 */
import Inherit from './Fx.Event.Inherit';
import Tab from './Fx.Event.Tab';
import Batch from './Fx.Event.Batch';
import Column from './Fx.Event.Column';
/* 过滤 */
import Filter from './Fx.Event.Filter';
import {Modal} from 'antd';
/* 这里的 reference 是 IxTable */
const rxEdit = (reference, id) => Unity.submit(reference, () => {
    // 读取记录
    const {$options = {}} = reference.props;
    const uri = $options['ajax.get.uri'];
    Ux.ajaxGet(uri, {id}, Mock.mockGet(reference, id)).then(data => {
        /* 本层引用处理 */
        reference.setState({$loading: false});
        /* 上层引用处理 */
        Tab.rxEditTab(reference, id, data);
    });
});

/* 这里的 reference 是 IxTable */
const rxDelete = (reference, id) => Unity.submit(reference, () => {
    // 删除记录
    const {$options = {}} = reference.props;
    const uri = $options['ajax.delete.uri'];
    Ux.ajaxDelete(uri, {id}, Mock.mockDelete(reference, id))
        .then(Unity.doDelete(reference,
            () => rxRefresh(reference), id));
});
/* 这里的 reference 是 IxExtra */
const rxDeleteDetail = (reference, id) => (event) => {
    event.preventDefault();
    const {$options = {}, fnMock} = reference.props;
    const message = $options['confirm.delete'];
    const $mocker = fnMock();
    const {fnSubmitting, fnClose, fnRefresh, fnLoading} = reference.props;
    const executor = () => {
        /* 防重复提交 */
        fnSubmitting();
        fnLoading();
        const uri = $options['ajax.delete.uri'];
        Ux.ajaxDelete(uri, {id}, Mock.mockDeleteWithMocker(reference, id, $mocker))
            .then(data => {
                /* 关闭防重复提交 */
                fnSubmitting(false);
                if (data) {
                    fnClose();
                    fnRefresh();
                }
            });
    };
    // 执行器
    if (message) {
        Modal.confirm({content: message, onOk: executor})
    } else {
        executor()
    }
};
/* 这里的 reference 是 IxTable */
const rxRefresh = (reference) => Ux.toLoading(() => {
    const query = Cond.initFilters(reference);
    rxSearch(reference, query.to());
});

/* 这里的 reference 是 IxTable */
const rxChange = (reference) => (pagination, filters, sorter) => Unity.change(reference, () => {
    const params = Q.criteria(reference)(pagination, filters, sorter);
    Unity.consume(reference, 'fnQuery')(fnQuery => fnQuery(params));
}, {pagination, filters, sorter});

/* 这里的 reference 是 IxTable */
const rxSearch = (reference, query = {}, extraState = {}) =>
    Unity.consume(reference, 'fnSearch')(fnSearch => fnSearch(query)
        .then(Mock.mockSearchResult(reference, query))
        .then(data => reference.setState({
            data,
            $loading: false, // 和分页专用统一
            ...extraState
        })));

export default {
    rxChange,   // 表格发生变更（分页、排序、页尺寸改变、列变更）
    rxRefresh,  // 刷新表格专用方法
    rxSearch,   // 搜索专用方法

    rxEdit,
    rxDelete,   // 行删除
    rxDeleteDetail, // 详细内容删除事件

    ...Filter,  // 过滤处理专用方法
    ...Column,  // 列相关处理
    ...Batch,   // Batch批量操作
    ...Tab,     // Tab页签相关
    ...Inherit  // 继承操作相关
};