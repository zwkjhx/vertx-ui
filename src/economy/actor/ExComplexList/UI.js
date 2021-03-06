import React from 'react';
import Ex from '../Ex';
import Fn from '../Fx';
import {Tabs} from "antd";

import RENDERS from './UI.Render';

import IxExtra from '../IxExtra/UI';
import IxLoading from '../IxLoading/UI';

import Ux from "ux";
import Op from './Op';

/**
 *  三种函数的基本命名规则：
 *  1. A 为父组件，B、C 为 A 的两个子组件，结构如：
 *       A
 *     /   \
 *    B     C
 *  2. A 继承给 B 和 C的的函数统一使用：fnXXXX命名
 *  3. A 从 B 反向生成的函数在 C组件中使用：doXXXX命名
 *  4. 直接使用的事件，如 A、B、C 则直接使用：rxXXXX命名
 */
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
        options: {},     // 所有配置项
        $submitting: false, // 控制右上角的提交，防止和底层的 $loading 变量冲突
    }
})
class Component extends React.PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        Op.update(this, {prevState, prevProps});
    }

    render() {
        if (Op.isRender(this)) {
            const $tabs = Fn.configTab(this);
            const {items = [], ...rest} = $tabs;
            /* options */
            const {className = Ux.ECONOMY.TAB_CONTAINER} = this.props;
            Ux.dgDebug({
                props: this.props,
                state: this.state,
            }, "[Ex] ComplexList：");
            Ux.dgDebug({
                key: $tabs.activeKey,
            }, "[Ex] 激活Tab页ID", "#369");
            console.groupCollapsed("[Ex] ExComplexList 子组件: ");
            return (
                <Tabs {...rest}
                      tabBarExtraContent={
                          <IxExtra {...this.props} {...Op.inBar(this, $tabs)}/>
                      }
                      className={className}>
                    {items.map(item => {
                        const {type, ...itemRest} = item;
                        const fnRender = RENDERS[type];
                        return (
                            <Tabs.TabPane {...itemRest}>
                                {fnRender(this, itemRest, rest.activeKey)}
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
            );
        } else return (<IxLoading/>);
    }
}

export default Component;