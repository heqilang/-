<template>
    <div class="aquiDialog">

        <div style="overflow: auto">
            <el-table :data="dataTable" height="346px">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="eventId" :show-overflow-tooltip="true" label="事件ID"></el-table-column>
                <!-- <el-table-column prop="equipmentState" label="设备状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.equipmentState">{{ scope.row.equipmentState | equipmentStateType }}</div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column> -->
                <el-table-column prop="alarmTime" label="报警时间">
                </el-table-column>
                <el-table-column prop="building" :show-overflow-tooltip="true" label="建筑">
                    <template slot-scope="scope">
                        <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }}-{{
                        scope.row.lookup.floor }}</div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="floor" :show-overflow-tooltip="true" label="楼层"> </el-table-column>
                <el-table-column prop="area" :show-overflow-tooltip="true" label="防火分区"> </el-table-column>
                <el-table-column prop="address" :show-overflow-tooltip="true" label="房间"> </el-table-column>
                <el-table-column prop="address" :show-overflow-tooltip="true" label="场所类型"> </el-table-column>
                <el-table-column prop="address" :show-overflow-tooltip="true" label="详细地址"> </el-table-column>
                <el-table-column prop="times" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="viewchange(scope.row, '设备报警情况')"> 结束火情 </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text_c mar-t-18">
                <!-- 分页 -->
                <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList">
                </customPagination>
            </div>
        </div>




    </div>
</template>

<script>
export default {
    props: ['aquifloor'],
    data() {
        return {
            innerVisible: false,
            chartRadio: '当日',
            pager: {
                pageSize: 5,
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
    created() { },
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
        viewchange(val) {


            this.$emit("getFireDate", val)
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
                url: '/api/web/indexCountV3/findAlarmEvent',
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
<style lang="scss"  scoped  >
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
