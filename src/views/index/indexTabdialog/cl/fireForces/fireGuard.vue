<!--
消防力量- 2级 -- 消防队中的按职位的分组列表
-->
<template>
    <div class="fire-guard-list-wrapper">
        <el-table class="xf-table" :data="dataTable" height="400" style="width: 100%">
            <el-table-column prop="seq" label="序号" width="80" />
            <el-table-column prop="name" label="队伍名称" width="180" />
            <el-table-column prop="peopleSum" label="队伍人数" width="180" />
            <el-table-column prop="deviceSetting" label="设备配置" width="180" />
            <el-table-column prop="contractMan" label="联系人" width="180" />
            <el-table-column prop="phone" label="联系电话" width="180" />
            <el-table-column prop="xyNum" label="现有" />
            <el-table-column fixed="right" align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleViewDetailClick(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"> </el-pagination>
    </div>
</template>

<script>
const mockData = [{ seq: 1, name: '微信消防站', peopleSum: 37, deviceSetting: '--', contractMan: '王虎', phone: '13608045907', 服务电话: '--' }];
export default {
    props: {
        dept: {
            //消防队信息
            required: true
        }
    },
    data: () => ({
        pager: {
            pageSize: 10,
            pageIndex: 1,
            total: mockData.length
        },
        dataTable: []
    }),
    created() {},
    mounted() {
        this.loadListData();
    },
    methods: {
        loadListData() {
            //todo 待接口对接 this.dept是上级页面选中的列表记录
            this.dataTable = mockData;
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
        },
        handleViewDetailClick(item) {
            console.log(item);
            this.$emit('viewDetailOnclick', item);
        }
    }
};
</script>

<style lang="scss">
@import './fireGuard.scss';
</style>
