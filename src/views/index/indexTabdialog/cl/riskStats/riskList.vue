<!--
巡查情况-隐患清单
-->
<template>
    <div class="risk-list-wrapper" style="height: 720px">
        <el-form :inline="true" :model="searchModel" class="xf-form" size="small">
            <el-form-item label="隐患级别">
                <el-select v-model="searchModel.riskLevel" clearable placeholder="隐患级别" @change="changeRiskLevel">
                    <el-option label="一般隐患" value="一般隐患"></el-option>
                    <el-option label="重大隐患" value="重大隐患"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="整改状态">
                <el-select v-model="searchModel.riskStatus" clearable placeholder="整改状态" @change="changeRiskStatus">
                    <el-option label="逾期未整改" value="1"></el-option>
                    <el-option label="限期未整改" value="2"></el-option>
                    <el-option label="逾期已整改" value="3"></el-option>
                    <el-option label="未整改" value="4"></el-option>
                    <el-option label="已整改" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="隐患类型">
                <el-select v-model="searchModel.riskType" clearable placeholder="隐患类型" @change="changeRiskType">
                    <el-option label="用火用电" value="用火用电"></el-option>
                    <el-option label="疏散通道" value="疏散通道"></el-option>
                    <el-option label="疏散指示" value="疏散指示"></el-option>
                    <el-option label="应急照明" value="应急照明"></el-option>
                    <el-option label="防火门/卷帘" value="防火门/卷帘"></el-option>
                    <el-option label="消防器材" value="消防器材隐患"></el-option>
                    <el-option label="重点部位" value="重点部位"></el-option>
                    <el-option label="电动车隐患" value="电动车隐患"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table class="xf-table" :data="dataTable" height="540" style="width: 100%">
            <el-table-column type="index" label="序号" align="center"> </el-table-column>
            <el-table-column prop="risksType" label="隐患类型" :show-overflow-tooltip="true" width="120" />
            <!--    <el-table-column prop="handleReportor" label="上报人员" :show-overflow-tooltip="true" width="120" /> -->
            <el-table-column prop="reporter" label="上报人员" :show-overflow-tooltip="true" width="120" />
            <!--      <el-table-column prop="handleReportTime" label="上报时间" :show-overflow-tooltip="true" width="180" /> -->
            <el-table-column prop="reportTime" label="上报时间" :show-overflow-tooltip="true" width="180" />
            <el-table-column prop="area" label="所属区域" :show-overflow-tooltip="true" />
            <el-table-column prop="address" label="详细地址" :show-overflow-tooltip="true" />
            <!-- <el-table-column prop="firePartition" label="现场照片"/>-->
            <!--   <el-table-column prop="state" align="center" label="整改状态" :show-overflow-tooltip="true" /> -->

            <el-table-column fixed="right" align="center" label="整改状态" width="100">
                <template slot-scope="scope">
                    <div>{{ getLabel(scope.row.state) }}</div>
                </template>
            </el-table-column>

            <!--        <el-table-column prop="level" label="隐患级别" :show-overflow-tooltip="true" /> -->

            <el-table-column fixed="right" align="center" label="隐患级别" width="100">
                <template slot-scope="scope">
                    <div>{{ getLevelabel(scope.row.level) }}</div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleViewDetailClick(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
        <div class="text_c mar-t-18">
            <!-- 分页 -->
            <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="loadListData"></customPagination>
        </div>
    </div>
</template>

<script>
const equipmentTypeListData = [
    {
        seq: 1,
        id: 111,
        riskType: '用火用电',
        equipmentState: '小磊',
        reportTime: '2022-09-01 09:00:81',
        area: '',
        address: '新世纪环球中心12楼',
        riskStatus: '',
        riskLevel: '一般隐患'
    },
    {
        seq: 2,
        id: 111,
        riskType: '用火用电',
        equipmentState: '小磊',
        reportTime: '2022-09-01 09:00:81',
        area: '',
        address: '新世纪环球中心12楼',
        riskStatus: '',
        riskLevel: '一般隐患'
    },
    {
        seq: 3,
        id: 111,
        riskType: '用火用电',
        equipmentState: '小磊',
        reportTime: '2022-09-01 09:00:81',
        area: '',
        address: '新世纪环球中心12楼',
        riskStatus: '',
        riskLevel: '一般隐患'
    },
    {
        seq: 4,
        id: 111,
        riskType: '用火用电',
        equipmentState: '小磊',
        reportTime: '2022-09-01 09:00:81',
        area: '',
        address: '新世纪环球中心12楼',
        riskStatus: '',
        riskLevel: '一般隐患'
    },
    {
        seq: 5,
        id: 111,
        riskType: '用火用电',
        equipmentState: '小磊',
        reportTime: '2022-09-01 09:00:81',
        area: '',
        address: '新世纪环球中心12楼',
        riskStatus: '',
        riskLevel: '一般隐患'
    },
    {
        seq: 6,
        id: 111,
        riskType: '用火用电',
        equipmentState: '小磊',
        reportTime: '2022-09-01 09:00:81',
        area: '',
        address: '新世纪环球中心12楼',
        riskStatus: '',
        riskLevel: '一般隐患'
    },
    { seq: 7, id: 111, riskType: '用火用电', equipmentState: '小磊', reportTime: '2022-09-01 09:00:81', area: '', address: '新世纪环球中心12楼', riskStatus: '', riskLevel: '一般隐患' }
];

export default {
    props: {
        dataRange: {
            required: false
        },
        riskLevel: {
            required: false
        },
        riskStatus: {
            required: false
        },
        riskType: {
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
        dataTable: [],
        arr: [],
        Arr: []
    }),
    watch: {
        riskLevel: {
            immediate: true,
            handler: function (newVal, oldVal) {
                console.log(newVal);
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
    created() {
        const that = this;
        that._http({
            /* '/api/web/indexCountTwo/findRisksList', */
            url: '/api/auth/dict/dictItem',
            type: 'get',
            isBody: true,
            data: {
                parentCode: 'riskLevel'
            },
            success: function (res) {
                that.Arr = res.data;
            }
        });

        this.arr = [
            { label: '待处理', value: '01' },
            { label: '待确认', value: '02' },
            { label: '处理中', value: '03' },
            { label: '完成', value: '04' },
            { label: '忽略', value: '05' }
        ];
    },
    mounted() {
        this.loadListData();
    },
    methods: {
        search() {
            this.loadListData();
        },
        getLevelabel(val) {
            let arr = this.Arr.filter((res) => {
                return res.dictCode == val;
            });
            return arr[0].dictValue;
        },
        getLabel(val) {
            let arr = this.arr.filter((res) => {
                return res.value == val;
            });
            return arr[0].label;
        },

        loadListData() {
            // this.dataTable = equipmentTypeListData;
            //todo 待接口对接, 可使用props中传入的参数作为查询条件

            const that = this;
            let getType = new Promise((resolve, reject) => {
                that._http({
                    /* '/api/web/indexCountTwo/findRisksList', */
                    url: '/api/auth/dict/dictItem',
                    type: 'get',
                    isBody: true,
                    data: {
                        parentCode: 'riskType'
                    },
                    success: function (res) {
                        resolve(res);
                        console.dir(res);
                    }
                });
            });

            let getLevel = new Promise((resolve, reject) => {
                that._http({
                    url: '/api/auth/dict/dictItem',
                    type: 'get',
                    isBody: true,
                    data: {
                        parentCode: 'riskLevel'
                    },
                    success: function (res) {
                        resolve(res);
                    }
                });
            });

            Promise.all([getType, getLevel]).then((res) => {
                let Arr = res[1].data.filter((res) => res.dictValue == that.searchModel.riskLevel);
                let arr = res[0].data.filter((res) => res.dictValue == that.searchModel.riskType);
                console.dir(arr);
                that._http({
                    url: '/api/web/indexCountTwo/findRisksList',
                    /*   url: '/api/web/indexCountTwo/scoreFindRisks', */
                    type: 'get',
                    isBody: true,
                    data: {
                        current: that.pager.pageIndex,
                        size: that.pager.pageSize,
                        timeType: that.dataRange === '当日' ? 1 : 2,
                        level: Arr.length > 0 ? Arr[0].dictCode : undefined,
                        risksType: arr.length > 0 ? arr[0].dictCode : undefined,
                        handel: that.searchModel.riskStatus == '未整改' ? 4 : that.searchModel.riskStatus == '已整改' ? 5 : that.searchModel.riskStatus,
                        sorts: 'handleReportTime:desc',
                        code: Arr.length > 0 ? Arr[0].dictCode : undefined
                    },
                    success: function (res) {
                        that.dataTable = res.data.records || [];
                        that.pager.pageSize = res.data.size;
                        that.pager.pageIndex = res.data.current;
                        that.pager.total = res.data.total;
                    }
                });
            });
            /* '/api/web/indexCountTwo/findRisksList', */
            /*     that._http({
 
    url: '/api/web/indexCountTwo/scoreFindRisks',
    type: 'get',
    isBody: true,
    data: {
        timeType: that.dataRange === '当日' ? 1 : 2,
        level: this.searchModel.riskLevel || undefined,
        risksType: this.searchModel.riskType || undefined,
        handel: this.searchModel.riskStatus || undefined,
        sorts: 'handleReportTime:desc'
    },
    success: function (res) {
        that.dataTable = res.data.records || [];
        that.pager.pageSize = res.data.size;
        that.pager.pageIndex = res.data.current;
        that.pager.total = res.data.total;
    }
}); */
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadListData();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.loadListData();
        },
        handleViewDetailClick(riskItem) {
            this.$emit('viewDetailOnclick', riskItem);
        },
        changeRiskLevel(val) {
            this.searchModel.riskLevel = val;
            this.loadListData();
        },
        changeRiskStatus(val) {
            this.searchModel.riskStatus = val;
            this.loadListData();
        },
        changeRiskType(val) {
            this.searchModel.riskType = val;
            this.loadListData();
        }
    }
};
</script>

<style lang="scss">
@import './riskList.scss';
</style>
