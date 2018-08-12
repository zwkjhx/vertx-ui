import Ux from 'ux';

const $opSave = (reference: any) => Ux.ai2Event(reference, (values, mockData) => {
    Ux.ajaxPut("/api/dept", values, mockData)
        .then(data => Ux.showDialog(reference, "edit", () => {
            console.info("更新成功：", data);
            reference.props.fnClose();
        }))
});
const $opAdd = (reference: any) => Ux.ai2Event(reference, (values, mockData) => {
    Ux.ajaxPost("/api/dept", values, mockData)
        .then(data => Ux.showDialog(reference, "add", () => {
            console.info("添加成功：", data);
            reference.props.fnClose();
        }))
});
const $opReset = (reference: any) => (event: any) => {
    event.preventDefault();
    Ux.formReset(reference);
};
const $opEditPost = (reference: any) => (record: any, id: any) => {
    // 在编辑点击过后操作，将数据写入到items
    console.info(record, id);
};
export default {
    $opSave,
    $opAdd,
    $opReset,
    $opEditPost
}