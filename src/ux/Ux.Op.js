import Params from './fun/Ux.Param';

/**
 *
 * componentDidUpdate中的List专用生命周期函数
 * @method cycleUpdatePageList
 * @param {React.PureComponent} reference React对应组件引用
 * @param key 数据对应的props中的键值，默认使用`$list`；
 * @param prevProps 之前的属性信息
 */
const cycleUpdatePageList = (reference = {}, key = 'list', prevProps = {}) => {
    const data = reference.props[`$${key}`];
    if (!data) {
        const {fnData} = reference.props;
        if (fnData) {
            // 查询条件规范化
            const query = Params.parseQuery(reference);
            fnData(query);
        }
    }
};
/**
 * componentDidUnmount生命的Form专用函数
 * @method cycleDestoryForm
 * @param props 当前属性
 * @param prevProps 之前属性
 */
const cycleDestoryForm = (props = {}, prevProps = {}) => {
    // 销毁函数
    const $destory = props.$destory;
    const $prevDestory = prevProps.$destory;
    if ($destory !== $prevDestory && $destory) {
        const {form} = props;
        if (form) {
            // 因为是销毁，不做Reset，而是直接青空所有表单值
            form.resetFields();
        }
    }
    // 路由切换时重设表单函数
    const $router = props.$router;
    const $prevRouter = prevProps.$router;
    if ($router && $prevRouter) {
        if ($router.path() !== $prevRouter.path()) {
            // 重设Form，Reset当前表单
            const {form} = props;
            if (form) {
                form.resetFields();
            }
        }
    }
};
/**
 * componentDidUpdate的Form组件生命周期专用函数
 * @method cycleUpdateForm
 * @param props 当前属性
 * @param prevProps 之前属性
 */
const cycleUpdateForm = (props = {}, prevProps = {}) => {
    const {fnInit} = props;
    // E.fxWarning(!props.hasOwnProperty("fnInit"), 10013, fnInit);
    if (fnInit) {
        const $key = props.$key;
        const $prevKey = prevProps.$key;
        if ($key !== $prevKey && $key) {
            fnInit({id: $key});
        }
        // 执行Destory的动作
        cycleDestoryForm(props, prevProps);
    }
};
/**
 * @class Op
 * @description 操作专用类
 */
export default {
    // 更新
    cycleUpdatePageList,
    cycleUpdateForm,
    cycleDestoryForm,
};
