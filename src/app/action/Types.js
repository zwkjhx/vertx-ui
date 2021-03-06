import Ux from "ux";

export default {
    fnDeptList: Ux.createAction("/RX/MODULE/DEPT/SEARCH"),
    // Tree列表
    fnCategoryList: Ux.createAction("/RX/MODULE/CAT/LIST"),
    fnCategory: Ux.createAction("/RX/MODULE/CAT/TREE"),
    // Rank列表（处理TreeTable专用）
    fnTreeData: Ux.createAction("/RX/MODULE/TREE/DATA"),
    fnTreeData1: Ux.createAction("/RX/MODULE/TREE/DATA1"),
    // 树形/列表输入（处理TableEditor专用）
    fnTableList: Ux.createAction("/RX/MODULE/TABLE/LIST"),
    fnTableTree: Ux.createAction("/RX/MODULE/TABLE/TREE"),
    // MultiCheckbox专用
    fnCredits: Ux.createAction("/RX/MODULE/CHECK-BOX/CREDIT"),
    // 商品明细
    fnMaterials: Ux.createAction("/RX/MODULE/MATERIAL/ITEMS")
}
