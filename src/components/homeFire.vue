<template>
    <div class="aquiDialog">
        <div style="overflow: auto">
            <el-table :data="dataTable" height="346px">
                <el-table-column type="index" align="center" label="序号"> </el-table-column>
                <el-table-column prop="eventId" align="center" :show-overflow-tooltip="false" label="事件ID"> </el-table-column>
                <!-- <el-table-column prop="equipmentState" label="设备状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.equipmentState">{{ scope.row.equipmentState | equipmentStateType }}</div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column> -->
                <el-table-column prop="alarmTime" align="center" label="报警时间"> </el-table-column>
                <el-table-column prop="building" align="center" :show-overflow-tooltip="false" label="建筑"> </el-table-column>
                <el-table-column prop="floor" align="center" width="50" :show-overflow-tooltip="false" label="楼层"> </el-table-column>
                <el-table-column prop="area" align="center" :show-overflow-tooltip="false" label="防火分区"> </el-table-column>
                <el-table-column prop="address" align="center" :show-overflow-tooltip="false" label="详细地址"> </el-table-column>
                <el-table-column prop="times" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text"   size="mini" @click="viewchange(scope.row)">结束火情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text_c mar-t-18">
                <!-- 分页 -->
                <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"> </customPagination>
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
    created() {},
    mounted() {
        this.getList();
    },

    methods: {
        viewchange(val) {
            this.$emit('getFireDate', val);
        },

        getList() {
            let _self = this;
            _self.loading = true;
            let searchObj = {
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                transform: 'B:building,F:floor,A:area,E:eventId'
            };
            _self.dataTable = [];
            _self._http({
                url: '/api/web/indexCountV3/findAlarmEvent',
                type: 'get',
                isBody: true,
                data: searchObj,
                success: function (res) {
                    res.data.records.forEach((item) => {
                        item.floor = item.lookup.floor;
                        item.x_type = '购物中心';
                        item.building = item.lookup.building;
                        item.area = item.lookup.area.slice(item.lookup.area.length - 6,item.lookup.area.length);
                    });

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
<style lang="scss" scoped>
.aquiDialog {
    .el-dialog__body {
        overflow: auto;
    }

    .activetab {
        background: red;
        color: #fff;
    }
}

.aquiDialog .el-button {
    padding: 10px 14px !important;
    background-color: #086ed9
}

.el-button--text{
    border-color: #086ed9;
    color: #fff;
}
</style>
