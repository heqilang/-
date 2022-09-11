<template>
    <div class="pagination-container" v-if="paginationData.total">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageIndex" :page-size="paginationData.pageSize" @size-change="handleSizeChange" :page-sizes="paginationData.pageSizes ? paginationData.pageSizes : pageSizes" :layout="paginationData.layOuts ? paginationData.layOuts : layOuts" :total="paginationData.total"></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageSizes: [5, 10, 50, 200],
            layOuts: 'total,prev,pager,next,jumper'
        };
    },
    // 外部参数传递model
    // paginationData: {
    //   pageSize: 15,
    //   pageIndex: 1,
    //   total: null
    // }
    props: ['paginationData'],
    created() {
        // console.log('-----分页组件-----')
        // console.log(this.paginationData, 'paginationData11');
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.paginationData.pageSize = val;
            this.paginationData.pageIndex = 1;
            this.$emit('getList');
        },
        handleCurrentChange(val) {
            this.paginationData.pageIndex = val;
            this.$emit('getList');
            console.log('22222222222222222');
            console.log('val', val);
        }
    }
};
</script>

<style lang="scss" scoped></style>
