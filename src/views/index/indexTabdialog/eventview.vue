<template>
    <div class="eventDialog">
        <div class="eventMsgInfo">
            <div style="height: 46px; line-height: 46px; padding: 0 0.12rem; color: #eee; font-size: 0.14rem; background-color: #17548e">
                <el-row>
                    <el-col class="text_l" :span="12">{{ title }}</el-col>
                    <el-col class="text_r" style="cursor: pointer" :span="12" @click.native="closeDialog">关闭</el-col>
                </el-row>
            </div>
            <div style="padding: 0.18rem; background-color: #070f1a">
                <div style="margin-bottom: 10px">{{ title }}</div>
                <div style="margin-bottom: 8px; border-bottom: 1px solid rgb(23, 84, 142); padding-bottom: 10px">
                    <div v-if="title == '设备报警情况'">
                        <div style="display: flex">
                            <div>报警时间：</div>
                            <div>{{ equipInfs.alarmTime }}</div>
                        </div>
                        <div style="display: flex">
                            <div>设备名称：</div>
                            <div>{{ equipInfs.equipmentName }}</div>
                        </div>
                        <div style="display: flex">
                            <div>所属系统：</div>
                            <div>{{ equipInfs.owningSystem }}</div>
                        </div>
                        <div style="display: flex">
                            <div>设备类型：</div>
                            <div>--</div>
                        </div>
                        <div style="display: flex">
                            <div>报警类型：</div>
                            <div>{{ _comm.getAlarmTypeByCode(equipInfs.alarmType) || '--' }}</div>
                        </div>
                        <div style="display: flex">
                            <div>报警位置：</div>
                            <div>{{ equipInfs.lookup.building }}-{{ equipInfs.lookup.floor }}-{{ equipInfs.address }}</div>
                        </div>
                    </div>
                    <div v-if="title == '隐患详情'">
                        <div style="display: flex">
                            <div>上报时间：</div>
                            <div>{{ equipInfs.handleReportTime }}</div>
                        </div>
                        <div style="display: flex">
                            <div>隐患类型：</div>
                            <div>{{ equipInfs.equipmentName == 'EQUIPMENT' ? '消防设备' : '环境隐患' }}</div>
                        </div>
                        <div style="display: flex">
                            <div>上报人员：</div>
                            <div>{{ equipInfs.handleReportor }}</div>
                        </div>
                        <div style="display: flex">
                            <div>隐患位置：</div>
                            <div>{{ equipInfs.lookup.building }}-{{ equipInfs.lookup.floor }}-{{ equipInfs.address }}</div>
                        </div>
                        <div style="display: flex">
                            <div>隐患分级：</div>
                            <div>{{ equipInfs.level == '1' ? '一般隐患' : '重大隐患' }}</div>
                        </div>
                        <div style="display: flex">
                            <div>备注说明：</div>
                            <div>{{ equipInfs.lookup.risksRemark }}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-bottom: 10px">流程追溯</div>

                <div style="height: 450px">
                    <el-scrollbar style="width: 80%; height: 80%; margin-left: 10%">
                        <el-timeline>
                            <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.addtime" placement="top">
                                <el-card style="font-size: 10px">
                                    <p>{{ item.targetObjectJob }}</p>
                                    <p>{{ item.title }}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['equipInfo', 'alatitle'],
    data() {
        return {
            sourcelist: [],
            showAlarmMsgInfo: false,
            equipInfs: '',
            title: '',
            pager: {
                pageSize: 10,
                pageIndex: 1,
                total: null
            },
            tabitemindex: 0,
            tablist: [
                { name: '火警事故', value: '9' },
                { name: '预警事件', value: '4' },
                { name: '故障事件', value: '2' },
                { name: '离线事件', value: '3' }
            ],
            dialogFormVisible: true,
            dataTable: []
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.equipInfs = this.equipInfo;
        this.title = this.alatitle;
        this.getfindMessages(this.equipInfs);
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
        closeDialog() {
            this.$emit('viewchange', '');
            this.$emit('closeDialog');
        },
        getfindMessages(val) {
            let _self = this;
            _self.sourcelist = [];
            _self._http({
                url: '/api/web/indexCountTwo/findMessages',
                type: 'get',
                isBody: true,
                data: {
                    sourceId: val.id
                },
                success: function (res) {
                    _self.sourcelist = _self.sortKey(res.data.records, 'addtime');
                }
            });
        },
        sortKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }
    },

    computed: {},
    components: {}
};
</script>
<style lang="scss">
.eventDialog {
    .eventMsgInfo {
        width: 520px;
        position: absolute;
        z-index: 9999;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        overflow: hidden;
        //阴影
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        border: 1px solid #1a63a7;
        .el-card {
            background-color: #212e43;
            border: none;
            color: #fff;
        }
        .el-tabs__item {
            color: #fff;
        }
        .el-card__body {
            padding: 10px !important;
        }
    }
}
</style>
