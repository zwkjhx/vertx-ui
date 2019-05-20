import React from 'react'
import Ex from '../Ex'
import Fn from '../Fx';
import {Tabs} from "antd";

import RENDERS from './UI.Render';

import ExAction from '../ExAction/UI';

@Ex({
    // 1. 验证专用函数
    verify: Fn.verify,
    // 2. 初始化状态的专用函数（静态配置初始化）
    hoc: Fn.init,
    // 3. 类型处理
    type: "grid",
    // 4. 初始化状态
    state: {
        tabs: {},
        options: {}     // 所有配置项
    }
})
class Component extends React.PureComponent {
    componentDidMount() {
        // 动态配置初始化
        Fn.rxSearch(this);
    }

    render() {
        const $tabs = Fn.configTab(this);
        const {items = [], ...rest} = $tabs;
        /* options */
        const {options = {}} = this.state;
        return (
            <Tabs {...rest}
                  tabBarExtraContent={<ExAction {...this.props} $options={options}/>}>
                {items.map(item => {
                    const {type, ...itemRest} = item;
                    const fnRender = RENDERS[type];
                    /* */
                    return (
                        <Tabs.TabPane {...itemRest}>
                            {fnRender(this, itemRest, rest.activeKey)}
                        </Tabs.TabPane>
                    )
                })}
            </Tabs>
        )
    }
}

export default Component