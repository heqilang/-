import myPagination from './index.vue';
const customPaginationNoSizes = {
    install: function (Vue) {
        Vue.component('customPaginationNoSizes', myPagination);
    }
};
// 导出分页组件
export default customPaginationNoSizes;
