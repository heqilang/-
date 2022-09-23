/*
 * @Author:  HHQ
 * @Date: 2022-05-26 10:06:14
 * @LastEditTime: 2022-06-07 17:30:25
 * @LastEditors: HHQ
 * @Description: ComponentS简介
 * 改动内容：
 */
import babelpolyfill from 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import '@/assets/styles/element-variables.scss';
import VueRouter from 'vue-router';
import { _http } from './js/utils/http';
import _comm from './js/utils/common';
// import _config from './js/utils/config';
import _config from '../config/index';
import _selectOpt from './js/utils/selectOpt';
import storage from '@/js/utils/storage';
// 高德地图
import VueAMap from 'vue-amap';
// 富文本编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import quilleditor from './components/quilleditor';

import store from './vuex/store';
import Vuex from 'vuex';
import routes from './router/routes';

import './assets/styles/base.scss';
// import './js/plugins/elDialogDrag.js'

/*********************页面tab标签插件*********************/
import RouterTab from 'vue-router-tab';
import 'vue-router-tab/dist/lib/vue-router-tab.css';
import customPagination from './components/customPagination';
import customPaginationNoSizes from './components/customPaginationNoSizes';
import VueAnimateNumber from 'vue-animate-number';
import dataV from '@jiaminghi/data-view';
Vue.use(dataV);
Vue.use(VueAnimateNumber);
Vue.use(customPagination);
Vue.use(customPaginationNoSizes);
Vue.use(RouterTab);
/*********************页面tab标签插件*********************/
Vue.use(VueRouter);
Vue.use(ElementUI);

/*********************高德地图初始化*********************/
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: _config.gaodeMapKey,
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'MarkerClusterer', 'AMap.Heatmap', 'AMap.DistrictLayer'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.15'
});

// Vue.use(VueRouter)
Vue.use(Vuex);
/*********************给vue原型添加参数*********************/
Vue.prototype._http = _http; //api调用方式
Vue.prototype._comm = _comm; //公共方法使用
Vue.prototype._storage = storage;
// Vue.prototype._config = _config.dev.proxyTable['/api'].target ; //配置文件参数
// 暂时解决图片上传地址问题
Vue.prototype._config = location.hostname == 'localhost' ? _config.dev.proxyTable['/api'].target : location.origin + '/api'; //配置文件参数
Vue.prototype._selectOpt = _selectOpt; //配置文件参数

/*********************定义组件*********************/
Vue.component('quill-editor', quilleditor);

/*********************测试数据api*********************/
/*import Mock from './mock'
Mock.bootstrap();
import { testApi } from './api/api';
Vue.prototype._http = testApi;*/
/*********************测试数据api*********************/

// console.log('routers-------->', routes);
const router = new VueRouter({
    routes,
    mode: 'hash',
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {}
});

router.beforeEach((to, from, next) => {
    console.log('to----->', to);
    console.log('_config000000000000000:', _config.dev.proxyTable['/api'].target);
    if (storage.LStorage.get('_t')) {
        next();
    } else {
        if (to.path == '/login' || to.path == '/authLogin') {
            next();
        } else {
            router.push({
                path: '/login',
                query: {}
            });
        }
    }
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
