<!--
巡查情况-隐患详情
-->
<template>
    <div class="xf-stats-wrapper" style="height: 720px">
        <div v-if="true" class="risk-detail-wrapper">
            <div class="risk-detail-panel">
                <div class="risk-detail-panel-header">隐患信息</div>
                <div class="risk-detail-panel-content risk-detail-rdp">
                    <div>
                        <div class="risk-detail-field">
                            <span>上报时间: </span>
                            <span>{{ riskId.createTime }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>隐患类型: </span>
                            <span>{{ riskId.risksTypeText }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>上报人员: </span>
                            <span>{{ riskId.createUser }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>隐患位置: </span>
                            <span>{{ riskId.troubleLocation }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>隐患级别: </span>
                            <span style="color:rgb(255,0,0)">{{ riskId.risksTypeText }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>整改状态: </span>
                            <span>{{ riskId.stateText }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>备注说明: </span>
                            <span>{{ riskId.troubleDesc }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="risk-detail-panel">
                <div class="classReadyDialogBox">
                    <div class="eventMsgInfo">
                        <div class="box2">流程追溯</div>
                        <!-- style="height: 450px" -->
                        <div>
                            <el-scrollbar style="height: 100%; width: 90%">
                                <el-timeline>
                                    <el-timeline-item v-if="(riskId.createTime || '') != ''" :timestamp="riskId.createTime" placement="top">
                                        <el-card style="font-size: 14px">
                                            <p>上报隐患：{{ riskId.createTime }}</p>
                                        </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item v-if="(riskId.handleTime || '') != ''" :timestamp="riskId.handleTime" placement="top">
                                        <el-card style="font-size: 14px">
                                            <p>处置人员：{{ riskId.createUser || '--' }} {{riskId.handlerMobile || '--'}}</p>
                                            <p>处置结果：已完成隐患处理</p>
                                        </el-card>
                                    </el-timeline-item>
                                    <!--
                                    reporterMobile 上报人电话
                                    dispatcherMobile 派单人电话
                                    takerMobile 接单人电话
                                    handlerMobile 处理人电话
                                    handleReportorMobile 处理上报的人电话
                                    -->

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
const riskData = {
    seq: 7,
    id: 111,
    riskType: '用火用电',
    equipmentState: '小磊',
    reportTime: '2022-09-01 09:00:81',
    area: '',
    address: '新世纪环球中心12楼',
    riskStatus: '',
    riskLevel: '一般隐患',
    flows: [
        {
            flowTime: '2022-08-12 16:24:11',
            flowType: '上报隐患',
            actionTime: '2022-08-12 16:22:02',
            liable: false,
            user: '李先生',
            phone: '13709098888'
        },
        {
            flowTime: '2022-08-12 16:24:11',
            flowType: '派单',
            actionTime: '2022-08-12 16:22:02',
            liable: true,
            user: '李先生',
            phone: '13709098888'
        },
        {
            flowTime: '2022-08-12 16:24:11',
            flowType: '处置隐患',
            actionTime: '2022-08-12 16:22:02',
            liable: true,
            user: '李先生',
            phone: '13709098888'
        },
        {
            flowTime: '2022-08-12 16:24:11',
            flowType: '上报隐患',
            actionTime: '2022-08-12 16:22:02',
            liable: false,
            user: '李先生',
            phone: '13709098888'
        }
    ]
};

export default {
    components: {},
    props: {
        riskId: {
            //隐患记录id
            required: true
        }
    },
    data: () => ({
        riskData: {
            seq: '',
            id: '',
            riskType: '',
            equipmentState: '',
            reportTime: '',
            area: '',
            address: '',
            riskStatus: '',
            riskLevel: '',
            description: '',
            flows: []
        },
        sourcelist: [],
    }),
    created() {},
    mounted() {
        // this.riskData = riskData;
        console.log(this.riskId);
    },
    methods: {
        loadData() {
            //todo 待接口对接  使用props中传入的riskId作为查询条件
            this.riskData = riskData;
        },
    }
};
</script>

<style lang="scss">
@import './riskDetail.scss';

.risk-detail-panel .el-card__body {
    background-color: #264365 !important;
    border: none !important;
    color: #fff !important;
}

.el-card {
    border: none !important;
}
</style>
