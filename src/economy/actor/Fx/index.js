import Hoc from './Fx.Hoc';
import Tab from './Fx.Tab';
import Q from './Fx.Query';
import Init from './Fx.Init.Op';
import Jsx from './Fx.UI';
import Dialog from './Fx.Init.Dialog';
import Projection from './Fx.Projection';
import Action from './Fx.Event';
import Mock from './Fx.Mock';
import Unity from './Fx.Unity';
import Limit from './Fx.Limit';

const exported = {
    ...Hoc,
    ...Action,
    // 列处理
    ...Projection,
    // Tab Render
    configTab: Tab.render,

    // 列处理，垂直映射处理（列过滤专用）
    // mapColumns: Projection.initColumns,
    // mapOptions: Projection.initOptions,
    // mapFields: Projection.initFields,

    rxCriteria: Q.criteria,
    // 是否更新了 $query 一系列
    testQuery: Q.is,
    testBatch: Init.isBatch,

    // 行为专用
    initOpen: Init.initOpen,
    initBatch: Init.initBatch,
    initSearch: Init.initSearch,
    initExtra: Init.initExtra,
    initBar: Init.initBar,
    // 窗口专用
    initDialog: Dialog.init,
    // initColumn: Projection.initColumn,
    // initColumns: Projection.inColumns,
    // etatProjection: Etat.Query.projection,

    jsxDialog: Jsx.jsxDialog,
    jsxComponent: Jsx.jsxComponent,
    jsxFailure: Jsx.jsxFailure,
    jsxSuccess: Jsx.jsxSuccess,
    // 调用函数
    doLoading: Unity.doLoading,
    doRefresh: Unity.doRefresh,
    doSubmit: Unity.doSubmit,
    doClose: Unity.doClose,
    // Css
    cssGrid: Jsx.cssGrid,
    // Mock数据
    Mock,
    Limit,
};
console.info(exported);
export default exported;