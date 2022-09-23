<template>
    <div class="scoreModelItem">
        <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
            <el-col :span="18">
                <div style="height: 46px; line-height: 46px">综合评分 》设备完好率</div>
            </el-col>
            <el-col :span="6">
                <div class="text_r">
                    <i @click="$emit('closeTsComp')" class="el-icon-circle-close" style="font-size: 26px; margin: 12px 20px; color: #5e9ffb; cursor: pointer"> </i>
                    <!-- <span @click="$emit('closeTsComp')" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span> -->
                </div>
            </el-col>
        </el-row>
        <div class="tabelCon" style="padding: 12px; color: #fff">
            <el-row>
                <el-col :span="4">设备总数：{{ sonData.allEquip }} 个</el-col>
                <el-col :span="4">故障设备：{{ sonData.faultEquip }} 个</el-col>
                <el-col :span="4">设备完好率：{{ sonData.equipPercent }}%</el-col>
            </el-row>
            <el-table header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable" ref="treeTable" border style="width: 100%">
                <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                <el-table-column prop="equipmentName" label="设备名称" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column prop="equipmentState" label="设备状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span style="color: #ed3a3a" v-if="scope.row.equipmentState == '9'">火警</span>
                        <span style="color: #f77e05" v-if="scope.row.equipmentState == '4'">预警</span>
                        <span style="color: #bfa900" v-if="scope.row.equipmentState == '2'">故障</span>
                        <span style="color: #a7acba" v-if="scope.row.equipmentState == '3'">离线</span>
                        <span style="color: #00b695" v-if="scope.row.equipmentState == '1'">正常</span>
                    </template>
                </el-table-column>
                <el-table-column prop="addtime" label="更新时间" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column label="安装位置" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.lookup.building + scope.row.lookup.floor }}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="详细地址" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="400" trigger="click">
                            <div>
                                <!-- <div>更新时间：{{ scope.row.addtime }}</div> -->
                                <div>设备名称：{{ scope.row.equipmentName }}</div>
                                <div>所属系统：{{ scope.row.lookup.owningSystem }}</div>
                                <div>设备类型：{{ scope.row.host == 'YES' ? '主机' : '探测器' }}</div>
                                <!-- <div>
                                    报警类型：<span style="color: #ed3a3a" v-if="scope.row.equipmentState == 9">火警</span>
                                    <span style="color: #f77e05" v-else-if="scope.row.equipmentState == 4">预警</span>
                                    <span style="color: #bfa900" v-else-if="scope.row.equipmentState == 2">故障</span>
                                    <span style="color: #a7acba" v-else-if="scope.row.equipmentState == 3">离线</span>
                                </div> -->
                                <div>安装位置：{{ scope.row.lookup.building + scope.row.lookup.floor + scope.row.address }}</div>
                            </div>
                            <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> 查看 </el-button>
                            <!-- <el-button >click 激活</el-button> -->
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex text_c mar-t-18 mar-b-18">
                <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['sonData'],
    data() {
        return {
            pager: {
                pageSize: 5,
                pageIndex: 1,
                total: null
            },
            dataTable: []
        };
    },
    methods: {
        indexMethod(index) {
            let _self = this;
            if (_self.pager.pageIndex * _self.pager.pageSize > _self.dataTable.totalCount) {
                let tempIndex = index + 1 + _self.pager.pageSize * (_self.pager.pageIndex - 1);
                if (tempIndex < _self.dataTable.totalCount) {
                    return tempIndex;
                } else {
                    return _self.dataTable.totalCount;
                }
            } else {
                return index + 1 + _self.pager.pageSize * (_self.pager.pageIndex - 1);
            }
        },
        getList() {
            let _self = this;
            _self.loading = true;
            _self.dataTable = [];
            _self._http({
                url: '/api/web/indexCountTwo/findEquipment',
                type: 'get',
                data: {
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    transform: 'U:handler;OW:owningSystem;B:building;F:floor'
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        }
    },
    created() {},
    mounted() {
        this.getList();
    }
};
</script>
<style lang="scss">
.scoreModelItem {
}
</style>
