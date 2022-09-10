import Router from 'vue-router';

//加载组件function
const importPage = (viewUrl) => {
    // return require(`@/views/${viewUrl}`)
    // 按需加载路由
    return () => import(`@/views/${viewUrl}`);
};

// Vue.use(Router)

let routers = [
    {
        path: '/',
        redirect: '/index',
        name: 'home',
        title: '首页',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: true, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),
        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/index',
                component: importPage('index/globalCenterIndex'),
                name: 'chartPage',
                title: '首页',
                meta: {
                    title: '首页', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/',
        redirect: '',
        name: 'home',
        title: '远程监控',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: false, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),
        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/videoCenter',
                component: importPage('remoteControl/videoCenter'),
                name: 'videoCenter',
                title: '安防视频',
                meta: {
                    title: '安防视频', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireSysList/1',
                component: importPage('remoteControl/fireSysList'),
                name: 'fireSysList',
                title: '火灾报警',
                meta: {
                    title: '火灾报警', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireSysList/2',
                component: importPage('remoteControl/fireSysList'),
                name: 'fireSysList',
                title: '电气火灾',
                meta: {
                    title: '电气火灾', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireSysList/3',
                component: importPage('remoteControl/fireSysList'),
                name: 'fireSysList',
                title: '消防给水',
                meta: {
                    title: '消防给水', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireSysList/4',
                component: importPage('remoteControl/fireSysList'),
                name: 'fireSysList',
                title: '独立式感烟',
                meta: {
                    title: '独立式感烟', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireSysList/5',
                component: importPage('remoteControl/fireSysList'),
                name: 'fireSysList',
                title: '灭火器',
                meta: {
                    title: '灭火器', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            }
        ]
    },
    {
        path: '/fireCRT',
        redirect: '/fireCRT',
        name: 'home',
        title: '消防CRT',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/fireCRT',
                component: importPage('fireCRT/fireCRT'),
                name: 'fireCRT',
                title: '消防CRT',
                meta: {
                    title: '消防CRT', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/',
        redirect: '',
        name: 'home',
        title: '消防管理',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: false, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/alarmCall',
                component: importPage('fireSafeManage/alarmCall'),
                name: 'alarmCall',
                title: '事件管理',
                meta: {
                    title: '事件管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/hideTrouble',
                component: importPage('fireSafeManage/hideTrouble'),
                name: 'hideTrouble',
                title: '隐患管理',
                meta: {
                    title: '隐患管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/pollingManage',
                component: importPage('fireSafeManage/pollingManage'),
                name: 'pollingManage',
                title: '巡检管理',
                meta: {
                    title: '巡检管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/dutyManage',
                component: importPage('fireSafeManage/dutyManage'),
                name: 'dutyManage',
                title: '值班管理',
                meta: {
                    title: '值班管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/checkPost',
                component: importPage('fireSafeManage/checkPost'),
                name: 'checkPost',
                title: '查岗管理',
                meta: {
                    title: '查岗管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireDatum',
                component: importPage('fireSafeManage/fireDatum'),
                name: 'fireDatum',
                title: '消防档案',
                meta: {
                    title: '消防档案', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            }
        ]
    },
    {
        path: '/',
        redirect: '',
        name: 'home',
        title: '消防服务',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: false, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/maintenanceManage',
                component: importPage('fireSafeServe/maintenanceManage'),
                name: 'maintenanceManage',
                title: '维保管理',
                meta: {
                    title: '维保管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/repairManage',
                component: importPage('fireSafeServe/repairManage'),
                name: 'repairManage',
                title: '维修管理',
                meta: {
                    title: '维修管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireSafeTrain',
                component: importPage('fireSafeServe/fireSafeTrain'),
                name: 'fireSafeTrain',
                title: '消防培训',
                meta: {
                    title: '消防培训', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/fireKnowledge',
                component: importPage('fireSafeServe/fireKnowledge'),
                name: 'fireKnowledge',
                title: '消防知识',
                meta: {
                    title: '消防知识', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            }
        ]
    },
    {
        path: '/contingencyPlan',
        redirect: '/contingencyPlan',
        name: 'home',
        title: '应急预案',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/contingencyPlan',
                component: importPage('contingencyPlan/contingencyPlan'),
                name: 'contingencyPlan',
                title: '应急预案',
                meta: {
                    title: '应急预案', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/smartExit',
        redirect: '/smartExit',
        name: 'home',
        title: '智能疏散',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/smartExit',
                component: importPage('smartExit/smartExit'),
                name: 'smartExit',
                title: '智能疏散',
                meta: {
                    title: '智能疏散', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/fireRescue',
        redirect: '/fireRescue',
        name: 'home',
        title: '作战资源',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/fireRescue',
                component: importPage('fireRescue/fireRescue'),
                name: 'fireRescue',
                title: '作战资源',
                meta: {
                    title: '作战资源', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/helpModel',
        redirect: '/helpModel',
        name: 'home',
        title: '作战方案',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/helpModel',
                component: importPage('fireRescue/helpModel'),
                name: 'helpModel',
                title: '作战方案',
                meta: {
                    title: '作战方案', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/zoneManage',
        redirect: '/zoneManage',
        name: 'home',
        title: '分区管理',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/zoneManage',
                component: importPage('zoneManage/zoneManage'),
                name: 'zoneManage',
                title: '分区管理',
                meta: {
                    title: '分区管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/zoneRoom',
        redirect: '/zoneRoom',
        name: 'home',
        title: '分区房间管理',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/zoneRoom',
                component: importPage('zoneManage/zoneRoom'),
                name: 'zoneManage',
                title: '分区房间管理',
                meta: {
                    title: '分区房间管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/chartPage',
        redirect: '/chartPage',
        name: 'home',
        title: '统计分析',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/chartPage',
                component: importPage('chartPage/chartPage'),
                name: 'chartPage',
                title: '统计分析',
                meta: {
                    title: '统计分析', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/',
        redirect: '',
        name: 'home',
        title: '设备管理',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: false, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/videoManage',
                component: importPage('euipManagement/videoManage'),
                name: 'videoManage',
                title: '视频管理',
                meta: {
                    title: '视频管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/1',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '火灾报警',
                meta: {
                    title: '火灾报警', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/2',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '电器火灾',
                meta: {
                    title: '电器火灾', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/3',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '消防给水',
                meta: {
                    title: '消防给水', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/4',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '独立式感烟',
                meta: {
                    title: '独立式感烟', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/5',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '灭火器',
                meta: {
                    title: '灭火器', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/6',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '防烟排烟',
                meta: {
                    title: '防烟排烟', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/7',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '逃生避难',
                meta: {
                    title: '逃生避难', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/8',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '喷水灭火',
                meta: {
                    title: '喷水灭火', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/9',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '消防供水',
                meta: {
                    title: '消防供水', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/10',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '耐火构件',
                meta: {
                    title: '耐火构件', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/11',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '消防电梯',
                meta: {
                    title: '消防电梯', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/equipManaList/12',
                component: importPage('euipManagement/equipManaList'),
                name: 'equipManaList',
                title: '电源监控',
                meta: {
                    title: '电源监控', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            }
        ]
    },
    {
        path: '/',
        redirect: '',
        name: 'home',
        title: '系统设置',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: false, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/buildManage',
                component: importPage('sysConfig/buildManage'),
                name: 'buildManage',
                title: '建筑管理',
                meta: {
                    title: '建筑管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/userOrgManage',
                component: importPage('sysConfig/userOrgManage'),
                name: 'userOrgManage',
                title: '用户机构管理',
                meta: {
                    title: '用户机构管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/userRole',
                component: importPage('sysConfig/userRole'),
                name: 'userRole',
                title: '角色权限',
                meta: {
                    title: '角色权限', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/msgPushManage',
                component: importPage('sysConfig/msgPushManage'),
                name: 'msgPushManage',
                title: '推送管理',
                meta: {
                    title: '推送管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/dataSetting',
                component: importPage('sysConfig/dataSetting'),
                name: 'dataSetting',
                title: '数据设置',
                meta: {
                    title: '数据设置', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            },
            {
                path: '/noticeManage',
                component: importPage('sysConfig/noticeManage'),
                name: 'noticeManage',
                title: '通知公告',
                meta: {
                    title: '通知公告', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            }
        ]
    },
    {
        path: '/unitInfo',
        redirect: '/unitInfo',
        name: 'home',
        title: '单位信息',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/unitInfo',
                component: importPage('unitInfo/unitInfo'),
                name: 'unitInfo',
                title: '单位信息',
                meta: {
                    title: '单位信息', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/attendance',
        redirect: '/attendance',
        name: 'home',
        title: '考勤管理',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/attendance',
                component: importPage('attendance/attendance'),
                name: 'attendance',
                title: '考勤管理',
                meta: {
                    title: '考勤管理', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/userCenter',
        redirect: '/userCenter',
        name: 'home',
        title: '个人中心',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/userCenter',
                component: importPage('userCenter/userCenter'),
                name: 'userCenter',
                title: '个人中心',
                meta: {
                    title: '个人中心', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/operaLog',
        redirect: '/operaLog',
        name: 'home',
        title: '操作日志',
        iconCls: 'iconfont icontongzhigonggao',
        hideArrow: true, //是否隐藏菜单右侧箭头
        component: importPage('home'),

        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/operaLog',
                component: importPage('operaLog/operaLog'),
                name: 'operaLog',
                title: '操作日志',
                meta: {
                    title: '操作日志', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: true //是否隐藏菜单
            }
        ]
    },
    {
        path: '/login',
        iconCls: 'el-icon-menu',
        component: importPage('login/login'),
        name: 'login',
        hidden: true
    },
    {
        path: '/authLogin',
        iconCls: 'el-icon-menu',
        component: importPage('login/authLogin'),
        name: 'authLogin',
        hidden: true
    },
    {
        path: '/shouYe',
        redirect: '/shouYe',
        name: 'home',
        title: '我的首页',
        iconCls: 'iconfont el-icon-menu',
        hideArrow: true, //是否隐藏菜单右侧箭头
        // 父路由组件内必须包含 <router-tab>
        component: importPage('home'),
        // 子路由里配置需要通过页签打开的页面路由
        children: [
            {
                path: '/shouYe',
                component: importPage('shouYe/shouYe'),
                name: 'shouYe',
                title: 'my首页1',
                meta: {
                    title: 'my首页1', // 页签标题
                    icon: 'icon-user', // 页签图标，可选
                    tips: '', // 页签提示，可选，如未设置则跟title一致
                    aliveId: 'fullPath' // 路由打开页签规则，可选
                },
                hidden: false //是否隐藏菜单
            }
        ]
    }
];

export default routers;
