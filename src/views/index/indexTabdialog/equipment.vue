<template>
    <div class="aquiDialog">
        <el-dialog style="overflow: auto" :before-close="closeDialog" :modal-append-to-body="false" title="设备报警情况列表" :visible.sync="dialogFormVisible" :close-on-click-modal="true" class="unit-edit-con" :destroy-on-close="true">
            <div style="margin-bottom: 12px">
                <el-radio-group v-model="chartRadio" @change="tabitemchange" size="mini">
                    <el-radio-button label="当日">
                        <!-- <i class="el-icon-s-grid"></i> -->
                    </el-radio-button>
                    <el-radio-button label="当月">
                        <!-- <i class="el-icon-s-data"></i> -->
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div style="overflow: auto">
                <el-table :data="dataTable">
                    <el-table-column type="index" label="序号"> </el-table-column>
                    <el-table-column prop="equipmentName" label="设备类型"></el-table-column>
                    <!-- <el-table-column prop="equipmentState" label="设备状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.equipmentState">{{ scope.row.equipmentState | equipmentStateType }}</div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="alarmTime" label="报警时间"> </el-table-column>
                    <el-table-column prop="building" label="安装位置">
                        <template slot-scope="scope">
                            <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }}-{{ scope.row.lookup.floor }}</div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="防火分区"> </el-table-column>
                    <el-table-column prop="address" label="房间名称"> </el-table-column>
                    <el-table-column prop="address" label="场所类型"> </el-table-column>
                    <el-table-column prop="address" label="详细地址"> </el-table-column>
                    <el-table-column prop="times" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="viewchange(scope.row, '设备报警情况')"> 查看 </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="text_c mar-t-18">
                    <!-- 分页 -->
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
            <!-- <div v-if="chartRadio == '图表'">
                <img style="width: 90%; margin-left: 5%" src="../../../assets/images/globalCenterNew/eqlineC.jpg" alt="" />
            </div> -->
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['aquifloor'],
    data() {
        return {
            chartRadio: '当日',
            pager: {
                pageSize: 10,
                pageIndex: 1,
                total: null
            },
            tablist: [
                { name: '火警事件', value: '9' },
                { name: '设备告警事件', value: '4' }
                // { name: '故障事件', value: '2' },
                // { name: '离线事件', value: '3' }
            ],
            dialogFormVisible: true,
            dataTable: []
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getList();
    },
    filters: {
        equipmentStateType(val) {
            if (val == '1') return '正常';
            if (val == '2') return '故障';
            if (val == '3') return '离线';
            if (val == '4') return '预警';
            if (val == '9') return '火警';
        }
    },
    methods: {
        viewchange(row, title) {
            this.$emit('viewchange', row, title);
            this.$emit('closeDialog');
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
        tabitemchange() {
            this.getList();
        },
        getList() {
            let _self = this;
            _self.loading = true;
            let searchObj = {
                floor: _self.aquifloor.floor,
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                option: _self.chartRadio == '当日' ? 'DAY' : 'MONTH', //DAY：当日，MONTH：当月
                transform: 'B:building,F:floor'
            };
            _self.dataTable = [];
            _self._http({
                url: '/api/web/indexCountTwo/find',
                type: 'get',
                isBody: true,
                data: searchObj,
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                }
            });
        }
    },

    computed: {},
    components: {}
};
</script>
<style lang="scss">
.aquiDialog {
    .el-dialog__body {
        overflow: auto;
    }
    .activetab {
        background: red;
        color: #fff;
    }
}
</style>
