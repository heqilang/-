<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div>
            <el-form :inline="true" :model="searchModel" class="xf-form" size="small">
                <el-form-item label="防火分区">
                    <el-input v-model="searchModel.fhfq" placeholder="请输入防火分区"></el-input>
                </el-form-item>
                <!-- <el-form-item label="安装位置">
                    <el-input v-model="searchModel.installSite" placeholder="请输入防火分区"></el-input>
                </el-form-item> -->
                <el-form-item label="">
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table class="xf-table" :data="dataTable" height="425" style="width: 100%">
            <el-table-column label="序号" width="80" align="center" fixed>
                <template slot-scope="scope">
                    {{ scope.$index + (pager.pageIndex - 1) * pager.pageSize + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="equipmentState" label="设备状态" width="180" v-if="false" />
            <!-- <el-table-column prop="qr" label="二维码" width="220" fixed /> -->
            <el-table-column prop="equipmentName" label="设备名称" width="180" fixed />
            <el-table-column label="安装地址" width="180">
                <template slot-scope="scope">
                    {{ setupAddress(scope.row) }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="详细地址" width="280" />
            <el-table-column prop="firePartition" label="防火分区" />
            <!-- <el-table-column label="使用单位" />
            <el-table-column label="责任单位">
                <template slot-scope="scope"> 环球中心 </template>
            </el-table-column>
            <el-table-column label="责任部门" />
            <el-table-column label="维保单位">
                <template slot-scope="scope"> 威特龙 </template>
            </el-table-column>
            <el-table-column label="安装单位">
                <template slot-scope="scope"> 中安 </template>
            </el-table-column> -->
        </el-table>
        <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[5, 10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"> </el-pagination>
    </div>
</template>

<script>
const equipmentTypeListData = [
    // { seq: 1, equipmentState: '正常', equipmentName: '光电感烟探测器', azAddress: '', address: '新世纪环球中心12楼', firePartition: '' },
    // { seq: 2, equipmentState: '正常', equipmentName: '光电感烟探测器', azAddress: '', address: '新世纪环球中心12楼', firePartition: '' },
    // { seq: 3, equipmentState: '正常', equipmentName: '光电感烟探测器', azAddress: '', address: '新世纪环球中心12楼', firePartition: '' },
    // { seq: 4, equipmentState: '正常', equipmentName: '光电感烟探测器', azAddress: '', address: '新世纪环球中心12楼', firePartition: '' },
    // { seq: 5, equipmentState: '正常', equipmentName: '光电感烟探测器', azAddress: '', address: '新世纪环球中心12楼', firePartition: '' },
    // { seq: 6, equipmentState: '正常', equipmentName: '光电感烟探测器', azAddress: '', address: '新世纪环球中心12楼', firePartition: '' }
];

export default {
    props: {
        type: {
            //设备类型的请求过滤条件
            required: true
        },
        owningSystem: {
            //设备类型的请求过滤条件
            required: true
        }
    },
    data: () => ({
        pager: {
            pageSize: 5,
            pageIndex: 1,
            total: 0
        },
        dataTable: [],
        searchModel: {
            fhfq: '',
            installSite: undefined
        }
    }),
    created() {},
    mounted() {
        console.log(this.type, this.owningSystem);
        this.loadListData();
    },
    methods: {
        search() {
            let _self = this;
        },
        loadListData() {
            //todo 待接口对接
            // this.dataTable = equipmentTypeListData;

            let _self = this;
            if (_self.type && _self.owningSystem) {
                // if (_self.owningSystem) {
                _self._http({
                    url: '/api/app/index/findEquipment',
                    type: 'get',
                    data: {
                        // equipmentName: _self.type,
                        owningSystem: _self.owningSystem,
                        equipmentName: _self.type,
                        current: _self.pager.pageIndex,
                        size: _self.pager.pageSize,
                        sorts: 'id:desc;',
                        transform: 'B:building;F:floor'
                    },
                    success: function (res) {
                        _self.dataTable = res.data.records;
                        _self.pager.total = res.data.total;
                    }
                });
            }
        },
        handleSizeChange(val) {
            this.pager.pageSize = val;
            this.loadListData();
        },
        handleCurrentChange(val) {
            this.pager.pageIndex = val;
            this.loadListData();
        },
        setupAddress(row) {
            if (row.lookup) {
                return (row.lookup.building ? row.lookup.building : '') + (row.lookup.floor ? row.lookup.floor : '');
            } else {
                return '';
            }
        }
    }
};
</script>

<style lang="scss">
@import './equipmentTypeList.scss';
</style>
