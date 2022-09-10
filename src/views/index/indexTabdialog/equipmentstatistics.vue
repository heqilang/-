<template>
    <div class="saferesDialog">
        <el-dialog :before-close="closeDialog" :modal-append-to-body="false" title="设备统计" :visible.sync="dialogFormVisible" :close-on-click-modal="true" class="unit-edit-con">
            <el-table :data="dataTable">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="equipmentName" label="设备状态">
                    <template slot-scope="scope">
                        <span style="color: #ed3a3a" v-if="scope.row.equipmentState == '9'">火警</span>
                        <span style="color: #f77e05" v-if="scope.row.equipmentState == '4'">预警</span>
                        <span style="color: #bfa900" v-if="scope.row.equipmentState == '2'">故障</span>
                        <span style="color: #a7acba" v-if="scope.row.equipmentState == '3'">离线</span>
                        <span style="color: #00b695" v-if="scope.row.equipmentState == '1'">正常</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="equipmentState" label="报警类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.equipmentState">{{ scope.row.equipmentState | equipmentStateType }}</div>
                        <div v-else>--</div>
                    </template>
                </el-table-column> -->

                <el-table-column prop="equipmentName" label="设备名称"> </el-table-column>
                <!-- <el-table-column prop="alarmTime" label="最新报警时间"> </el-table-column> -->
                <el-table-column prop="building" label="安装位置">
                    <template slot-scope="scope">
                        <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }}-{{ scope.row.lookup.floor }}</div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="详细地址"> </el-table-column>
                <el-table-column prop="contact" label="处置人员"> </el-table-column>
            </el-table>
            <div class="text_c mar-t-18">
                <!-- 分页 -->
                <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            pager: {
                pageSize: 10,
                pageIndex: 1,
                total: null
            },
            tabitemindex: 0,
            tablist: [
                { name: '消防设备', value: '1' },
                { name: '安防设备', value: '2' },
                { name: '逃生疏散设备', value: '3' }
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
        // equipmentStateType(val) {
        //     if (val == '1') return '正常';
        //     if (val == '2') return '故障';
        //     if (val == '3') return '离线';
        //     if (val == '4') return '预警';
        //     if (val == '9') return '火警';
        // }
    },
    methods: {
        statistics() {
            this.$emit('statistics');
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
        tabitemchange(index) {
            this.tabitemindex = index;
            this.getList();
        },
        getList() {
            let _self = this;
            _self.loading = true;
            let searchObj = {
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                transform: 'B:building,F:floor'
            };
            _self.dataTable = [];
            _self._http({
                url: '/api/web/indexCountTwo/findEquipment',
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
.saferesDialog {
    .activetab {
        background: #3f3d71;
        color: #fff;
    }
}
</style>
