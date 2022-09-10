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
                            <span>{{ riskData.reportTime }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>隐患类型: </span>
                            <span>{{ riskData.riskType }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>上报人员: </span>
                            <span>{{ riskData.reportTime }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>隐患位置: </span>
                            <span>{{ riskData.address }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>隐患级别: </span>
                            <span>{{ riskData.riskLevel }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>整改状态: </span>
                            <span>{{ riskData.riskStatus }}</span>
                        </div>
                        <div class="risk-detail-field">
                            <span>备注说明: </span>
                            <span>{{ riskData.description }}</span>
                        </div>
                    </div>
                    <div class="rdp-right">
                        <img :src="require('@/assets/images/indexImg/maxBgImg.png')" />
                    </div>
                </div>
            </div>
            <div class="risk-detail-panel">
                <div class="risk-detail-panel-header" style="margin: 30px 0px">流程追溯22222</div>

                <div style="height: 450px">
                    <el-scrollbar style="height: 100%; width: 90%">
                        <el-timeline>
                            <el-timeline-item v-for="flow in riskData.flows" :key="flow.Id" :timestamp="flow.flowTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <h4 style="display: flex; justify-content: space-between">
                                        <span v-if="flow.liable">岗位责任人</span>
                                        <span>{{ flow.flowType }}</span>
                                    </h4>
                                    <p>
                                        <span v-if="!flow.liable">{{ flow.actionTime }}</span>
                                        <span v-if="flow.liable">{{ flow.user }}</span>
                                        <span v-if="flow.liable">{{ flow.phone }}</span>
                                    </p>
                                </el-card>

                                <!--       <el-card style="font-size: 14px">
                                    <p>设备报警：{{ alarmanalysis6_params.alarmTime }}</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-for="(item, index) in sourcelist" :key="index" v-if="item.show && item.title != '被指派了报警工单'" :timestamp="item.addtime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>{{ item.targetObjectJob }}</p>
                                    <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                        <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                        ><span>语音、短信通知成功</span>
                                    </p>
                                    <p v-else-if="item.verifyTime">处理人员：{{ item.verifier || '--' }} <br />处理描述：{{ item.result | confirmResultType }} {{ item.verifierPhone }}</p>
                                    <p v-else-if="item.confirmTime">确认人员：{{ item.confirmor || '--' }} <br />确认描述：{{ item.confirmResult | confirmResultType }} {{ item.confirmPhone }}</p>
                                </el-card> -->
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

                <div v-if="false" class="risk-detail-panel-content risk-detail-flows">
                    <el-timeline class="xf-timeline">
                        <el-timeline-item v-for="flow in riskData.flows" :key="flow.Id" :timestamp="flow.flowTime" placement="top">
                            <el-card>
                                <h4>
                                    <span v-if="flow.liable">岗位责任人</span>
                                    <span>{{ flow.flowType }}</span>
                                </h4>
                                <p>
                                    <span v-if="!flow.liable">{{ flow.actionTime }}</span>
                                    <span v-if="flow.liable">{{ flow.user }}</span>
                                    <span v-if="flow.liable">{{ flow.phone }}</span>
                                </p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
        </div>

        <div v-else class="classReadyDialogBox">
            <div class="eventMsgInfo">
                <div class="box1">
                    <div v-if="alarmanalysis6_optin == '设备报警情况'">
                        <div style="display: flex">
                            <div>报警时间：</div>
                            <div>{{ alarmanalysis6_params.alarmTime }}</div>
                        </div>
                        <div style="display: flex">
                            <div>设备名称：</div>
                            <div>{{ alarmanalysis6_params.equipmentName }}</div>
                        </div>
                        <div style="display: flex">
                            <div>所属系统：</div>
                            <div>{{ alarmanalysis6_params.lookup.owningSystem }}</div>
                        </div>
                        <!-- <div style="display: flex">
                                <div>设备类型：</div>
                                <div v-if="alarmanalysis6_params.equipmentName">{{ alarmanalysis6_params.equipmentName | equipmentStateType }}</div>
                                <div v-else>--</div>
                            </div> -->
                        <!-- <div style="display: flex">
                                <div>报警类型：</div>
                                <div>{{ _comm.getAlarmTypeByCode(alarmanalysis6_params.alarmType) || '--' }}</div>
                            </div> -->
                        <div style="display: flex">
                            <div>报警位置：</div>
                            <div>{{ alarmanalysis6_params.lookup.building }}-{{ alarmanalysis6_params.lookup.floor }}-{{ alarmanalysis6_params.address }}</div>
                        </div>
                    </div>
                    <div v-if="alarmanalysis6_optin == '隐患详情'">
                        <div style="display: flex">
                            <div>上报时间：</div>
                            <div>{{ alarmanalysis6_params.handleReportTime }}</div>
                        </div>
                        <div style="display: flex">
                            <div>隐患类型：</div>
                            <div>{{ alarmanalysis6_params.equipmentName == 'EQUIPMENT' ? '消防设备' : '环境隐患' }}</div>
                        </div>
                        <div style="display: flex">
                            <div>上报人员：</div>
                            <div>{{ alarmanalysis6_params.handleReportor }}</div>
                        </div>
                        <div style="display: flex">
                            <div>隐患位置：</div>
                            <div>{{ alarmanalysis6_params.lookup.building }}-{{ alarmanalysis6_params.lookup.floor }}-{{ alarmanalysis6_params.address }}</div>
                        </div>
                        <div style="display: flex">
                            <div>隐患分级：</div>
                            <div>{{ alarmanalysis6_params.level == '1' ? '一般隐患' : '重大隐患' }}</div>
                        </div>
                        <div style="display: flex">
                            <div>备注说明：</div>
                            <div>{{ alarmanalysis6_params.lookup.risksRemark }}</div>
                        </div>
                    </div>
                </div>

                <div class="box2">流程追溯</div>

                <div style="height: 450px">
                    <el-scrollbar style="height: 100%; width: 90%">
                        <el-timeline>
                            <el-timeline-item v-if="(alarmanalysis6_params.alarmTime || '') != ''" :timestamp="alarmanalysis6_params.alarmTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>设备报警：{{ alarmanalysis6_params.alarmTime }}</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-for="(item, index) in sourcelist" :key="index" v-if="item.show && item.title != '被指派了报警工单'" :timestamp="item.addtime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>{{ item.targetObjectJob }}</p>
                                    <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                        <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                        ><span>语音、短信通知成功</span>
                                    </p>
                                    <p v-else-if="item.verifyTime">处理人员：{{ item.verifier || '--' }} <br />处理描述：{{ item.result | confirmResultType }} {{ item.verifierPhone }}</p>
                                    <p v-else-if="item.confirmTime">确认人员：{{ item.confirmor || '--' }} <br />确认描述：{{ item.confirmResult | confirmResultType }} {{ item.confirmPhone }}</p>
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
        }
    }),
    created() {},
    mounted() {
        this.riskData = riskData;
    },
    methods: {
        loadData() {
            //todo 待接口对接  使用props中传入的riskId作为查询条件
            this.riskData = riskData;
        }
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
