<!--
巡查情况-巡查列表
-->
<template>
    <div class="patrol-list-wrapper" style="height: 650px">
        <el-table class="xf-table" :data="dataTable" height="520" style="width: 100%">
            <el-table-column type="index" label="序号" align="center"> </el-table-column>
            <el-table-column prop="" label="单位名称" :show-overflow-tooltip="true" width="180">
                <template slot-scope="scope">
                    <span>新世纪环球中心</span>
                </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="巡查时间" :show-overflow-tooltip="true" width="180" />
            <el-table-column prop="pointName" label="点位名称" :show-overflow-tooltip="true" />
            <el-table-column prop="unitName" label="点位地址" :show-overflow-tooltip="true" />
            <el-table-column prop="inspectPerson" label="巡查人" :show-overflow-tooltip="true" />
            <el-table-column fixed="right" align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleViewDetailClick(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="text_c mar-t-18">
            <!-- 分页 -->
            <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="loadListData"></customPagination>
        </div>
        <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
    </div>
</template>

<script>
const equipmentTypeListData = [
    { id: 111, unitName: '环球中心购物中心', patrolTime: '2022-09-01 09:00:81', pointId: 1, pointName: '东商业一层大厅', pointAddress: '东商业一层大厅', patroler: '小磊' },
    { id: 112, unitName: '环球中心购物中心', patrolTime: '2022-09-01 09:00:81', pointId: 2, pointName: '地商环形通道', pointAddress: '地商环形通道', patroler: '小磊' },
    { id: 113, unitName: '环球中心购物中心', patrolTime: '2022-09-01 09:00:81', pointId: 3, pointName: 'B1F24通道机房', pointAddress: 'B1F24通道机房', patroler: '小磊' },
    { id: 114, unitName: '环球中心购物中心', patrolTime: '2022-09-01 09:00:81', pointId: 4, pointName: '一层S小厅', pointAddress: '一层S小厅', patroler: '小磊' },
    { id: 114, unitName: '环球中心购物中心', patrolTime: '2022-09-01 09:00:81', pointId: 4, pointName: '一层S小厅', pointAddress: '一层S小厅', patroler: '小磊' },
    { id: 115, unitName: '环球中心购物中心', patrolTime: '2022-09-01 09:00:81', pointId: 4, pointName: '一层S小厅', pointAddress: '一层S小厅', patroler: '小磊' }
];

export default {
    props: {
        dataRange: {
            //当日 还是 当月
            required: false
        },
        patrolStatus: {
            //巡查状态(正常 或 超时)
            required: false
        }
    },
    data: () => ({
        searchModel: {
            riskLevel: '',
            riskStatus: '',
            riskType: ''
        },
        pager: {
            pageSize: 10,
            pageIndex: 1,
            total: equipmentTypeListData.length
        },
        dataTable: []
    }),
    watch: {
        riskLevel: {
            immediate: true,
            handler: function (newVal, oldVal) {
                this.searchModel.riskLevel = newVal;
            }
        },
        riskStatus: {
            immediate: true,
            handler: function (newVal, oldVal) {
                this.searchModel.riskStatus = newVal;
            }
        },
        riskType: {
            immediate: true,
            handler: function (newVal, oldVal) {
                this.searchModel.riskType = newVal;
            }
        }
    },
    created() {},
    mounted() {
        console.log(this.patrolStatus);
        this.loadListData();
    },
    methods: {
        loadListData() {
            //todo 待接口对接, 可使用props中传入的参数作为查询条件
            // this.dataTable = equipmentTypeListData;
            const that = this;
            console.log(that.dataRange);
            that._http({
                url: '/api/web/indexCountV3/findPatrolList', ///api/web/indexCountTwo/findPatrolList
                type: 'get',
                isBody: true,
                data: {
                    size: that.pager.pageSize,
                    current: that.pager.pageIndex,
                    timeType: that.dataRange == '当日' ? '1' : '2',
                    patrolStatus: that.patrolStatus || undefined,
                    sorts: 'completeTime:desc'
                },
                success: function (res) {
                    that.dataTable = res.data.records || [];
                    that.pager.pageSize = res.data.size;
                    that.pager.pageIndex = res.data.current;
                    that.pager.total = res.data.total;
                }
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
        },
        handleViewDetailClick(item) {
            this.$emit('viewDetailOnclick', item);
        }
    }
};
</script>

<style lang="scss">
@import './patrolList.scss';
</style>
