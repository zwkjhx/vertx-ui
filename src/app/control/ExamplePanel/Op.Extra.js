import Ux from "ux";
import U from "underscore";
import {Button, Icon, Popover, Tree} from "antd";
import React from "react";

const TreeNode = Tree.TreeNode;

const applyKey = (data = {}) => {
    Ux.itObject(data, (field, value) => {
        if (U.isArray(value)) {
            value.forEach(each => applyKey(each));
        }
    });
    data.key = Ux.randomUUID();
    if (data.children) {
        data.icon = "folder";
    } else {
        data.icon = "file";
    }
    if (data.title.endsWith(".js")) {
        data.title = (<span style={{
            color: "#e79627"
        }}>{data.title}</span>)
    } else if (data.title.endsWith(".ts")) {
        data.title = (<span style={{
            color: "#1e8cd5"
        }}>
            {data.title}
        </span>)
    } else {
        data.title = (<span style={{
            color: "black",
            fontWeight: 700
        }}>
            {data.title}
        </span>)
    }
    data.selectable = false;
};
const applyKeys = (data = {}, ref = []) => {
    if (U.isArray(ref)) {
        if (data.children) {
            ref.push(data.key);
            data.children.forEach(each => applyKeys(each, ref))
        }
    }
};
const renderTreeNodes = (data = {}) => {
    const {children, icon, ...rest} = data;
    return (
        <TreeNode {...rest} icon={(<Icon type={icon}/>)}>
            {children ? children.map(node => renderTreeNodes(node)) : false}
        </TreeNode>
    )
};
const renderExtra = (reference) => {
    const {$datatree = {}} = reference.props;
    const treeData = Ux.clone($datatree);
    applyKey(treeData);
    const keys = [];
    applyKeys(treeData, keys);
    return (
        <Popover trigger={"click"} placement={"left"}
                 content={
                     <Tree showLine defaultExpandAll
                           expandedKeys={keys}>
                         {renderTreeNodes(treeData)}
                     </Tree>
                 }>
            <Button icon={"cluster"}/>
        </Popover>
    )
};
export default {
    renderExtra
}