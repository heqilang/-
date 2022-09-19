<!--
巡查情况-隐患清单
-->
<template>
    <div class="risk-list-wrapper" style="height: 720px">
        <el-form :inline="true" :model="searchModel" class="xf-form" size="small">
            <el-form-item label="隐患级别">
                <el-select v-model="searchModel.riskLevel" clearable placeholder="隐患级别" @change="changeRiskLevel">
                    <el-option label="一般隐患" :value="0"></el-option>
                    <el-option label="重大隐患" :value="1"></el-option>
                    <!-- <el-option v-for="item in dataRiskLevel" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode" /> -->
                </el-select>
            </el-form-item>
            <el-form-item label="整改状态">
                <el-select v-model="searchModel.riskStatus" clearable placeholder="整改状态" @change="changeRiskStatus">
                    <!-- <el-option label="逾期未整改" value="1"></el-option>
                    <el-option label="限期未整改" value="2"></el-option>
                    <el-option label="逾期已整改" value="3"></el-option> -->
                    <el-option label="未整改" value="4"></el-option>
                    <el-option label="已整改" value="5"></el-option>
                    <!-- <el-option v-for="item in dataRiskStatus" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode" /> -->
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="隐患类型">
                <el-select v-model="searchModel.riskType" clearable placeholder="隐患类型" @change="changeRiskType"> -->
            <!-- <el-option label="用火用电" value="用火用电"></el-option>
                    <el-option label="疏散通道" value="疏散通道"></el-option>
                    <el-option label="疏散指示" value="疏散指示"></el-option>
                    <el-option label="应急照明" value="应急照明"></el-option>
                    <el-option label="防火门/卷帘" value="防火门/卷帘"></el-option>
                    <el-option label="消防器材" value="消防器材隐患"></el-option>
                    <el-option label="重点部位" value="重点部位"></el-option>
                    <el-option label="电动车隐患" value="电动车隐患"></el-option>
                    <el-option label="其他" value="其他"></el-option> -->
            <!-- <el-option v-for="item in dataRiskType" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="">
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table class="xf-table" :data="dataTable" height="540" style="width: 100%">
            <el-table-column type="index" label="序号" align="center"> </el-table-column>
            <!-- 迪威没有隐患类型字段 -->
            <!-- <el-table-column prop="risksType" label="隐患类型" :show-overflow-tooltip="true" width="120">
                <template slot-scope="scope">
                    <div>{{ dataRiskTypeJson[scope.row.risksType] }}</div>
                    <div>{{ dataRiskLevelJson[scope.row.troubleType] }}</div>
                </template>
            </el-table-column> -->
            <!--    <el-table-column prop="handleReportor" label="上报人员" :show-overflow-tooltip="true" width="120" /> -->
            <el-table-column prop="createUser" label="上报人员" :show-overflow-tooltip="true" width="120">
                <template slot-scope="scope">
                    <div>{{ scope.row.createUser || '-' }}</div>
                </template>
            </el-table-column>
            <!--      <el-table-column prop="handleReportTime" label="上报时间" :show-overflow-tooltip="true" width="180" /> -->
            <el-table-column prop="createTime" label="上报时间" :show-overflow-tooltip="true" width="180" />
            <el-table-column prop="area" label="所属区域" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div>{{ scope.row.area || '-' }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="troubleLocation" label="详细地址" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div>{{ scope.row.troubleLocation || '-' }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="firePartition" label="现场照片"/>-->
            <!--   <el-table-column prop="state" align="center" label="整改状态" :show-overflow-tooltip="true" /> -->

            <el-table-column fixed="right" align="center" label="整改状态" width="100">
                <template slot-scope="scope">
                    <div>{{ dataRiskStatusJson[scope.row.completeStatus] }}</div>
                </template>
            </el-table-column>

            <!--        <el-table-column prop="level" label="隐患级别" :show-overflow-tooltip="true" /> -->

            <el-table-column fixed="right" align="center" label="隐患级别" width="100">
                <template slot-scope="scope">
                    <div>{{ dataRiskLevelJson[scope.row.troubleType] }}</div>
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
            riskLevel: undefined,
            riskStatus: undefined,
            riskType: undefined
        },
        pager: {
            pageSize: 10,
            pageIndex: 1,
            total: 0
        },
        dataTable: [],
        dataRiskLevel: [],
        dataRiskLevelJson: {
            0: '一般隐患',
            1: '重大隐患'
        },
        dataRiskType: [],
        dataRiskTypeJson: {},
        dataRiskStatus: [
            { dictValue: '逾期未整改', dictCode: '1' },
            { dictValue: '限期未整改', dictCode: '2' },
            { dictValue: '逾期已整改', dictCode: '3' },
            { dictValue: '未整改', dictCode: '4' },
            { dictValue: '已整改', dictCode: '5' }
        ],
        dataRiskStatusJson: {
            1: '逾期未整改',
            2: '限期未整改',
            3: '逾期已整改',
            4: '未整改',
            5: '已整改'
        },
        status: [
            { label: '待处理', value: '01' },
            { label: '待确认', value: '02' },
            { label: '处理中', value: '03' },
            { label: '完成', value: '04' },
            { label: '忽略', value: '05' }
        ],
        statusJson: {
            '01': '待处理',
            '02': '待确认',
            '03': '处理中',
            '04': '完成',
            '05': '忽略'
        }
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
                let newValtype = '';
                this.dataRiskStatus.map((item) => {
                    if (newVal == item.dictValue) {
                        newValtype = item.dictCode;
                    }
                });
                this.searchModel.riskStatus = newValtype;
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
        console.dir(this.riskLevel);
        const that = this;
        this.getDataListLevel();
        this.getDataListType();
    },
    mounted() {
        this.loadListData();
    },
    methods: {
        search() {
            console.log('哈哈哈哈哈');
            this.pager.pageIndex = 1;
            this.loadListData();
        },
        loadListData() {
            const that = this;
            console.log('啊哈哈哈哈：', that.searchModel.riskLevel);
            // this.dataTable = equipmentTypeListData;
            // let newDate = that.searchModel.riskLevel == 1 ? 'ciaw2awr' : 'nwvl7lvw';
            that._http({
                url: '/api/web/indexCountV3/findRisksList', ///api/web/indexCountTwo/findRisksList
                type: 'get',
                isBody: true,
                data: {
                    current: that.pager.pageIndex,
                    size: that.pager.pageSize,
                    timeType: that.dataRange === '当日' ? 1 : 2,
                    // level: newDate || undefined,
                    // risksType: that.searchModel.riskType || undefined,
                    troubleType: that.searchModel.riskLevel !== '' ? that.searchModel.riskLevel : undefined, //隐患级别
                    handle: that.searchModel.riskStatus || undefined,
                    sorts: 'handleReportTime:desc',
                    transform: 'U:reporter,U:handler'
                },
                success: function (res) {
                    that.dataTable = res.data.records || [];
                    that.pager.pageSize = res.data.size;
                    that.pager.pageIndex = res.data.current;
                    that.pager.total = res.data.total;
                }
            });
        },
        //隐患级别
        getDataListLevel() {
            let that = this;
            that._http({
                url: '/api/auth/dict/dictItem',
                type: 'get',
                isBody: true,
                data: {
                    parentCode: 'riskLevel'
                },
                success: function (res) {
                    that.dataRiskLevel = res.data || [];
                    that.dataRiskLevel.forEach((element) => {
                        that.dataRiskLevelJson[element.dictCode] = element.dictValue;
                        that.dataRiskLevelJson[element.dictValue] = element.dictCode;
                    });
                }
            });
        },
        //隐患类型
        getDataListType() {
            let that = this;
            that._http({
                url: '/api/auth/dict/dictItem',
                type: 'get',
                isBody: true,
                data: {
                    parentCode: 'riskType'
                },
                success: function (res) {
                    that.dataRiskType = res.data || [];
                    that.dataRiskType.forEach((element) => {
                        that.dataRiskTypeJson[element.dictCode] = element.dictValue;
                    });
                }
            });
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
            riskItem['risksTypeText'] = this.dataRiskLevelJson[riskItem.troubleType];
            riskItem['levelText'] = this.dataRiskLevelJson[riskItem.level];
            riskItem['stateText'] = this.dataRiskStatusJson[riskItem.completeStatus];
            this.$emit('viewDetailOnclick', riskItem);
        },
        changeRiskLevel(val) {
            console.dir(val);
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
