import BraftEditor from 'braft-editor';
import Ux from 'ux';

const initValue = (props) => {
    // Fix：解决切换问题
    const value = props['data-__meta'].initialValue;
    if (value) {
        return BraftEditor.createEditorState(value);
    } else {
        return BraftEditor.createEditorState(null);
    }
};

const initState = (props) => {
    const config = initConfig(props);
    return {
        content: initValue(props),
        config
    };
};

const on2Change = (reference) => (editorState) => {
    if (editorState) {
        reference.setState({content: editorState});
        // 调用Ant中的OnChange
        Ux.xtChange(reference, editorState.toHTML(), true);
    }
};
/**
 * controls = [
 * 'undo', 'redo', 'separator',
 'font-size', 'line-height', 'letter-spacing', 'separator',
 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
 'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'separator',
 'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
 'link', 'separator', 'hr', 'separator',
 'media', 'separator',
 'clear'
 * ]
 * @param props
 * @returns {*}
 */
const initConfig = (props) => {
    let {config = {}} = props;
    config = Ux.clone(config);
    config.controls = [
        'bold', 'italic', 'underline', 'strike-through', 'separator',
        'text-color', 'font-size', 'text-align', 'separator',
        'line-height', 'letter-spacing', 'separator'
    ];
    return config;
};
export default {
    initState,
    initValue,
    on2Change
};