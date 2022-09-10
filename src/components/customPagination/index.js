import myPagination from './index.vue';
const customPagination = {
    install: function (Vue) {
        Vue.component('customPagination', myPagination);
    }
};
// 导出分页组件
export default customPagination;
