<!--
巡查情况-隐患详情
-->
<template>
    <div class="xf-stats-wrapper" style="height: 650px">
        <div class="patrol-detail-wrapper">
            <div class="patrol-detail-panel">
                <div class="patrol-detail-panel-header">基础信息</div>
                <div class="patrol-detail-panel-content patrol-detail-rdp">
                    <div>
                        <div class="patrol-detail-field">
                            <span>点位名称: </span>
                            <span>{{ patrolPointId.pointName }}</span>
                        </div>
                        <div class="patrol-detail-field">
                            <span>单位: </span>
                            <span>新世纪环球中心</span>
                        </div>
                        <div class="patrol-detail-field">
                            <span>巡查频次: </span>
                            <span>每两小时巡查一次</span>
                        </div>
                        <div class="patrol-detail-field">
                            <span>详细地址: </span>
                            <span>{{ patrolPointId.unitName }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="patrol-detail-panel">
                <div class="classReadyDialogBox">
                    <div class="eventMsgInfo">
                        <div class="box2">流程追溯</div>
                        <!-- style="height: 450px" -->
                        <div>
                            <el-scrollbar style="height: 100%; width: 90%">
                                <el-timeline>
                                    <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.addtime" v-if="item.show && item.title != '被指派了报警工单'" placement="top">
                                        <el-card style="font-size: 14px">
                                            <p>{{ item.targetObjectJob }}</p>
                                            <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                                <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                                ><span>语音、短信通知成功</span>
                                            </p>
                                            <p v-else-if="item.beginTime">
                                                <span>巡查人员：{{ item.inspectPerson || '--' }}</span
                                                ><span style="float: right">{{ item.inspectStatus }}</span> <br />巡查时间：{{ item.beginTime }}
                                            </p>
                                        </el-card>
                                    </el-timeline-item>
                                    <!-- <el-timeline-item v-if="(alarmanalysis6_params.verifyTime||'')!=''" :timestamp="alarmanalysis6_params.verifyTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>处理人员：{{ alarmanalysis6_params.verifier || '--' }}</p>
                                    <p>处理描述：{{ alarmanalysis6_params.result || '--'}}</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="(alarmanalysis6_params.confirmTime||'')!=''" :timestamp="alarmanalysis6_params.confirmTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>确认人员：{{ alarmanalysis6_params.confirmor || '--' }}</p>
                                    <p>确认描述：{{ alarmanalysis6_params.confirmResult || '--'}}</p>
                                </el-card>
                            </el-timeline-item> -->
                                </el-timeline>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const mockData = {
    id: 111,
    name: '东南业一层大厅1',
    floor: '1层',
    unitName: '环球中心购物中心',
    frequency: '每两小时巡查一次',
    address: '东商业一层大厅',
    patrolList: [
        // { name: '张三', reportTime: '2022-09-01 09:00:81', patrolTime: '2022-09-01 09:00:81', status: '正常' },
        // { name: '张三', reportTime: '2022-09-01 09:00:81', patrolTime: '2022-09-01 09:00:81', status: '正常' },
        // { name: '张三', reportTime: '2022-09-01 09:00:81', patrolTime: '2022-09-01 09:00:81', status: '正常' },
        // { name: '张三', reportTime: '2022-09-01 09:00:81', patrolTime: '2022-09-01 09:00:81', status: '正常' },
        // { name: '张三', reportTime: '2022-09-01 09:00:81', patrolTime: '2022-09-01 09:00:81', status: '正常' }
    ]
};

export default {
    components: {},
    props: {
        patrolPointId: {
            //巡查点位id
            required: true
        }
    },
    data: () => ({
        patrolPointData: { id: undefined, unitName: '', patrolTime: '', pointName: '', pointAddress: '', patroler: '' },
        sourcelist: []
    }),
    created() {},
    mounted() {
        let that = this;
        this.getfindMessages(that.patrolPointId);
        // this.patrolPointData = mockData;
    },
    methods: {
        loadData() {
            //todo 待接口对接, 使用props中传入的patrolPointId作为查询条件
            this.patrolPointData = mockData;
        },
        getfindMessages(val) {
            let _self = this;
            _self.sourcelist = [];
            _self._http({
                url: '/api/web/indexCountTwo/findMessages',
                type: 'get',
                isBody: true,
                data: {
                    sourceId: val.id,
                    transform: 'U:targetObject'
                },
                success: function (res) {
                    console.dir(res);
                    _self.sourcelist = res.data.records || [];
                    console.dir(_self.sourcelist);
                    let arr = [];
                    _self.sourcelist.forEach((item, index) => {
                        item.targetObjectJob = item.targetObjectJob || '';
                        if (item.targetObjectJob.indexOf('责任人') == -1) {
                            item.show = false;
                        } else {
                            let has = false;
                            for (let i = 0; i < arr.length; i++) {
                                if (item.targetObjectJob == arr[i]) {
                                    has = true;
                                    break;
                                }
                            }
                            if (!has) {
                                item.show = true;
                                arr.push(item.targetObjectJob);
                            } else {
                                item.show = false;
                            }
                        }
                    });

                    if ((val.beginTime || '') != '') {
                        _self.sourcelist.push({
                            addtime: val.beginTime,
                            beginTime: val.beginTime,
                            // lookup:{
                            //     targetObject:val.lookup.verifier
                            // },
                            inspectPerson: val.inspectPerson,
                            inspectStatus: val.inspectStatus,
                            patrolStatus: val.patrolStatus == 'NORMAL' ? '正常' : val.patrolStatus == 'TIMEOUT' ? '超时' : '未巡检',
                            title: '',
                            show: true
                        });
                    }
                    _self.sourcelist = _self.sourcelist.sort((a, b) => {
                        return a.addtime > b.addtime ? 1 : -1;
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
@import './patrolPointDetail.scss';
</style>
