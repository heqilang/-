<template>
    <div class="globalCenterIndexCon">
        <div class="iframeBox">
            <iframe src="http://182.151.21.153:18080/enterprise/#/" frameborder="0"></iframe>
        </div>
        <div class="mainClas">
            <div class="swipBtnBox1" @click="goPage51Fn1"></div>
            <div class="swipBtnBox2" @click="goPage51Fn2"></div>
            <div class="alarmMsgInfo" v-if="showAlarmMsgInfo">
                <div style="height: 46px; line-height: 46px; padding: 0 0.12rem; color: #eee; font-size: 0.14rem; background-color: #17548e">
                    <el-row>
                        <el-col class="text_l" :span="12" v-if="alarmMsg == 'first'">告警消息</el-col>
                        <el-col class="text_l" :span="12" v-if="alarmMsg == 'second'">隐患消息</el-col>
                        <el-col class="text_l" :span="12" v-if="alarmMsg == 'third'">巡检消息</el-col>
                        <el-col class="text_r" style="cursor: pointer" :span="12" @click.native="showAlarmMsgInfo = false">关闭</el-col>
                    </el-row>
                </div>
                <div style="padding: 0.18rem; background-color: #070f1a">
                    <el-tabs v-model="activeAlarmTabName">
                        <el-tab-pane label="流程跟踪" name="first"></el-tab-pane>
                        <el-tab-pane v-if="alarmMsg == 'first'" label="告警信息" name="second"></el-tab-pane>
                        <el-tab-pane v-if="alarmMsg == 'second'" label="隐患信息" name="second"></el-tab-pane>
                        <el-tab-pane v-if="alarmMsg == 'third'" label="巡检信息" name="second"></el-tab-pane>
                    </el-tabs>
                    <el-scrollbar v-if="activeAlarmTabName == 'first'" style="width: 100%; height: 580px">
                        <el-timeline v-if="alarmMsg == 'first'">
                            <el-timeline-item v-if="popEventData.dispatchTime" :timestamp="'派单时间：' + popEventData.dispatchTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">派单</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">派单成功</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>派单人员：{{ popEventData.dispatcher }}</p>
                                    <p>系统给{{ popEventData.dispatcher }}进行派单</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="popEventData.takeTime" :timestamp="'接单时间：' + popEventData.takeTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">接单</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">接单成功</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>接单人员：{{ popEventData.taker }}</p>
                                    <p>{{ popEventData.taker }}进行接单</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="popEventData.verifyTime" :timestamp="'处理时间：' + popEventData.verifyTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">处理</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">处理完毕</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>处理人员：{{ popEventData.verifier }}</p>
                                    <p>处理结果：{{ popEventData.result || '--' }}</p>
                                    <p>备注：{{ popEventData.verifyRemark || '--' }}</p>
                                    <div v-if="popEventData.verifyImages">图片：<img :src="popEventData.verifyImages" alt="" /></div>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="popEventData.noticeTime" :timestamp="'确认时间：' + (popEventData.noticeTime || '--')" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">控制室确认</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">确认完毕</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>确认人员：{{ popEventData.noticer }}</p>
                                    <p>{{ popEventData.noticer }}进行确认</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                        <el-timeline v-if="alarmMsg == 'second'">
                            <!-- popEventData -->
                            <el-timeline-item :timestamp="'上报时间：' + popEventData.risksTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">隐患上报</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">上报成功</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>隐患类型：{{ popEventData.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}</p>
                                    <p>隐患备注：{{ popEventData.risksRemark || '--' }}</p>
                                    <p>{{ popEventData.dispatcher }}上报隐患</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item :timestamp="'受理时间：' + popEventData.takeTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">隐患受理</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">受理成功</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>{{ popEventData.taker }}</p>
                                    <p>{{ popEventData.taker }}受理隐患</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item :timestamp="'派单时间：' + popEventData.dispatchTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">隐患派单</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">派单完毕</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>{{ popEventData.dispatcher }}</p>
                                    <p>{{ popEventData.dispatcher }}进行派单</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item :timestamp="'处理时间：' + popEventData.handleTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">隐患处理</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">处理完毕</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>处理人：{{ popEventData.handler }}</p>
                                    <p>处理结果：{{ popEventData.result || '--' }}</p>
                                    <p>{{ popEventData.handler }}处理隐患</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                        <el-timeline v-if="alarmMsg == 'third'">
                            <!-- popEventData -->
                            <el-timeline-item :timestamp="'派单时间：' + popEventData.dispatchTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">巡检派单</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">派单成功</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>派单人：{{ popEventData.dispatcher }}</p>
                                    <p>{{ popEventData.dispatcher }}进行了派单</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item :timestamp="'接单时间：' + popEventData.takeTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">巡检接单</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">接单成功</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>接单人：{{ popEventData.taker }}</p>
                                    <p>{{ popEventData.taker }}进行了接单</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item :timestamp="'巡检完成时间：' + popEventData.completeTime" placement="top">
                                <el-card>
                                    <div>
                                        <el-row>
                                            <el-col :span="12">
                                                <h4 class="text_l">巡检过程</h4>
                                            </el-col>
                                            <el-col :span="12">
                                                <h4 class="text_r" style="color: #73a67b">巡检完毕</h4>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <p>巡检人：{{ popEventData.userName }}</p>
                                    <p>巡检状态：{{ popEventData.patrolStatus == 'NORMAL' ? '正常' : '异常' }}</p>
                                    <p>巡检结果：{{ popEventData.result }}</p>
                                    <p>{{ popEventData.userName }}进行了巡检</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </el-scrollbar>
                    <el-scrollbar v-else style="width: 100%; height: 580px">
                        <!-- {{alarmEequipInfo}} -->
                        <div v-if="alarmMsg == 'first'" style="line-height: 0.32rem; margin-bottom: 20px">
                            <!-- {{ alarmEequipInfo }} -->
                            <h2>设备信息</h2>
                            <div>最新报警：{{ alarmEequipInfo.lastUpdatetime }}</div>
                            <div>首次报警：--</div>
                            <div>消防系统：{{ alarmEequipInfo.lookup.owningSystem }}</div>
                            <div>设备名称：{{ alarmEequipInfo.equipmentName }}</div>
                            <div>报警类型：--</div>
                            <div>二维码ID：{{ alarmEequipInfo.qr }}</div>
                            <div>报警位置：{{ alarmEequipInfo.lookup.building + alarmEequipInfo.lookup.floor }}</div>
                            <div>火源类型：其他</div>
                        </div>
                        <el-timeline>
                            <el-timeline-item v-for="item in msgTimeLine" :key="item.id" :timestamp="'时间：' + item.addtime" placement="top">
                                <el-card>
                                    <p>{{ item.sourceObject }}</p>
                                    <p>{{ item.title }}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </el-scrollbar>
                </div>
            </div>
            <div class="headerConb"></div>
            <div class="mainConb">
                <el-row class="height100" :gutter="16">
                    <el-col class="height100" :span="6">
                        <div class="height100 leftConb">
                            <div class="cardItemB">
                                <div class="cardItemS">
                                    <div class="cardTit">
                                        <div class="navIconC"></div>
                                        设备报警情况
                                    </div>
                                    <div class="cardMain">
                                        <div style="height: 49%" @click="goPagesEventFn('equipment1')">
                                            <el-row class="height100" style="padding: 0.12rem" :gutter="12">
                                                <el-col class="height100" :span="7">
                                                    <img style="position: relative; left: 30%; height: 80%" src="../../assets/images/globalCenterNew/equipDay.png" alt="" />
                                                </el-col>
                                                <el-col class="height100" :span="17">
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">设备报警数量</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataTop.dayAlarms || 0 }}</span> 次</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">报警处置数量</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataTop.dayAlarmsOver || 0 }}</span> 个</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <div class="lineLinera"></div>
                                        <div style="height: 49%" @click="goPagesEventFn('equipment2')">
                                            <el-row class="height100" style="padding: 0.12rem" :gutter="12">
                                                <el-col class="height100" :span="7">
                                                    <img style="position: relative; left: 30%; height: 80%" src="../../assets/images/globalCenterNew/equiMonth.png" alt="" />
                                                </el-col>
                                                <el-col class="height100" :span="17">
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">设备报警数量</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataTop.monthAlarms || 0 }}</span> 次</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">报警处置数量</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataTop.monthAlarmsOver || 0 }}</span> 个</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cardItemB">
                                <!--TODO 陈磊: 巡查情况-->
                                <!--<div class="cardItemS" @click="goPagesEventFn('patro')">-->
                                <div class="cardItemS">
                                    <div class="cardTit flex f-between">
                                        <div>
                                            <div class="navIconC"></div>
                                            巡查情况
                                        </div>

                                        <el-radio-group style="transform: scale(0.73)" v-model="alarmRadioDate" @change="getAlarmStatisticsDate">
                                            <el-radio-button label="DAY">当日</el-radio-button>
                                            <el-radio-button label="MONTH">当月</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                    <div class="cardMain">
                                        <div style="height: 49%" v-if="alarmRadioDate === 'DAY'">
                                            <el-row class="height100 zwstyle" style="padding: 0.12rem" :gutter="12">
                                                <el-col class="height100" :span="8">
                                                    <img style="position: relative; left: 30%; height: 80%" src="../../assets/images/globalCenterNew/checkDay.png" alt="" />
                                                </el-col>

                                                <el-col v-if="false" class="height100" :span="17">
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row @click.native="(patrolOrRiskRange = '当日'), (patrolStatsVisible = true)">
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.patrolCountDay || 0 }}</span> 次</el-col
                                                            >
                                                            <el-col :span="16" style="margin-top: 0.06rem">当日巡查次数<!-- 巡查情况 --></el-col>
                                                        </el-row>
                                                    </div>

                                                    <div style="height: 25%; padding-left: 12%">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row @click.native="(patrolOrRiskRange = '当日'), (riskStatsVisible = true)">
                                                            <el-col :span="16" style="margin-top: 0.06rem"> 当前隐患数量<!-- 隐患数量 --></el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.risksCountDay || 0 }}</span> 个</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                </el-col>

                                                <el-col class="height100" :span="8">
                                                    <div style="height: 100%; padding-left: 12%; display: flex; align-items: center; text-align: center" class="display_flex">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row style="height: 100%" @click.native="(patrolOrRiskRange = '当日'), (patrolStatsVisible = true)">
                                                            <el-col style="height: 50%; display: flex; align-items: center; text-align: center; justify-content: center" :span="24"> 当日巡查次数 </el-col>
                                                            <el-col :span="24" style="height: 50%"
                                                                ><!-- 巡查情况 -->
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.patrolCountDay || 0 }}</span
                                                                >次
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </el-col>

                                                <el-col class="height100" :span="8">
                                                    <div style="height: 100%; padding-left: 12%; display: flex; align-items: center; text-align: center">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row style="height: 100%" @click.native="(patrolOrRiskRange = '当日'), (riskStatsVisible = true)">
                                                            <el-col :span="24" style="height: 50%; display: flex; align-items: center; text-align: center; justify-content: center"> 当前隐患数量<!-- 隐患数量 --></el-col>
                                                            <el-col style="height: 50%" :span="24">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.risksCountDay || 0 }}</span> 个</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <div style="height: 49%" v-if="alarmRadioDate === 'MONTH'">
                                            <el-row class="height100 zwstyle" style="padding: 0.12rem" :gutter="12">
                                                <el-col @click.native="goPagesEventFn('/alarmCall')" class="height100" :span="8">
                                                    <img style="position: relative; left: 30%; height: 80%" src="../../assets/images/globalCenterNew/checkMonth.png" alt="" />
                                                </el-col>

                                                <el-col v-if="false" class="height100" :span="17">
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row @click.native="(patrolOrRiskRange = '当月'), (patrolStatsVisible = true)">
                                                            <el-col :span="16" style="margin-top: 0.06rem">巡查情况</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.patrolCountMonth || 0 }}</span
                                                                >&nbsp;&nbsp; 次</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row @click.native="(patrolOrRiskRange = '当月'), (riskStatsVisible = true)">
                                                            <el-col :span="16" style="margin-top: 0.06rem">隐患数量</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.risksCountMonth || 0 }}</span> 个</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                </el-col>

                                                <el-col class="height100" :span="8">
                                                    <div style="height: 100%; padding-left: 12%; display: flex; align-items: center; text-align: center">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row style="height: 100%" @click.native="(patrolOrRiskRange = '当月'), (patrolStatsVisible = true)">
                                                            <el-col style="height: 50%; display: flex; align-items: center; text-align: center; justify-content: center" :span="24"> 当月巡查情况</el-col>
                                                            <el-col :span="24" style="height: 50%">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.patrolCountMonth || 0 }}</span> 次
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </el-col>

                                                <el-col class="height100" :span="8">
                                                    <div style="height: 100%; padding-left: 12%; display: flex; align-items: center; text-align: center">
                                                        <!--TODO 陈磊: 巡查情况-->
                                                        <el-row style="height: 100%" @click.native="(patrolOrRiskRange = '当月'), (riskStatsVisible = true)">
                                                            <el-col :span="24" style="height: 50%; display: flex; align-items: center; text-align: center; justify-content: center">当前隐患数量</el-col>
                                                            <el-col style="height: 50%" :span="24">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataMid.risksCountMonth || 0 }}</span> 个</el-col
                                                            >
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cardItemB">
                                <div class="cardItemS">
                                    <div class="cardTit flex f-between">
                                        <div>
                                            <div class="navIconC"></div>
                                            预警情况
                                        </div>
                                        <el-radio-group style="transform: scale(0.73)" v-model="alarmRadio" @change="getAlarmStatistics">
                                            <el-radio-button label="DAY">当日</el-radio-button>
                                            <el-radio-button label="MONTH">当月</el-radio-button>
                                        </el-radio-group>
                                    </div>

                                    <div class="cardMain">
                                        <div style="height: 49%" @click="readyAlarmShow(1)">
                                            <el-row class="height100" style="padding: 0.12rem" :gutter="12">
                                                <el-col class="height100" :span="7">
                                                    <img style="position: relative; left: 30%; height: 80%" src="../../assets/images/globalCenter/evenPic1.png" alt="" />
                                                </el-col>
                                                <el-col class="height100" :span="17">
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">突发类事件预警</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataBot.alarms || 0 }}</span> 次
                                                                <!-- <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ alarmRadio == 'DAY' ? '9' : '19' }}</span> 次 -->
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">处置数</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataBot.alarmsOver || 0 }}</span> 个
                                                                <!-- <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ alarmRadio == 'DAY' ? '9' : '19' }}</span> 个 -->
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <div class="lineLinera"></div>
                                        <div style="height: 49%" @click="readyAlarmShow(2)">
                                            <el-row class="height100" style="padding: 0.12rem" :gutter="12">
                                                <el-col class="height100" :span="7">
                                                    <img style="position: relative; left: 30%; height: 80%" src="../../assets/images/globalCenter/evenPic.png" alt="" />
                                                </el-col>
                                                <el-col class="height100" :span="17">
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">管理类事件预警</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataBot.manages || 0 }}</span> 次
                                                                <!-- <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ 0 }}</span> 次 -->
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div style="height: 50%; padding-left: 12%">
                                                        <el-row>
                                                            <el-col :span="16" style="margin-top: 0.06rem">处置数</el-col>
                                                            <el-col :span="8">
                                                                <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ leftDataBot.managesOver || 0 }}</span> 个
                                                                <!-- <span class="textColor" style="font-size: 0.26rem; font-weight: 700">{{ 0 }}</span> 个 -->
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="height100" :span="12">
                        <div class="height100 midConb" style="margin-top: 0.2rem">
                            <div class="dataMainCount" style="padding: 0.2rem">
                                <!-- <span @click="showLCImg = true" style="border: 1px solid #ccc; padding: 0.06rem 0.12rem; cursor: pointer">建筑概况</span> -->
                                <div class="cardItemB" @click="showLCImg = true">
                                    <div class="cardItemS" style="height: 0px">
                                        <div class="cardTit" style="background: transparent">
                                            <div class="navIconC"></div>
                                            建筑概况
                                        </div>
                                    </div>
                                </div>
                                <el-row class="height100 text_c">
                                    <el-col style="width: 20%; height: 100">
                                        <div>建筑面积</div>
                                        <div style="margin-top: 12px">
                                            <span class="textColor" style="font-size: 0.32rem; font-weight: 700">{{ buildingInfo.area }}</span> 万平方米
                                        </div>
                                    </el-col>
                                    <el-col style="width: 20%; height: 100">
                                        <div>建筑高度</div>
                                        <div style="margin-top: 12px">
                                            <span class="textColor" style="font-size: 0.32rem; font-weight: 700">{{ buildingInfo.buildingHeight }}</span> 米
                                        </div>
                                    </el-col>
                                    <el-col style="width: 20%; height: 100">
                                        <div>地上层数</div>
                                        <div style="margin-top: 12px">
                                            <span class="textColor" style="font-size: 0.32rem; font-weight: 700">{{ buildingInfo.floorsOnGround }}</span> 层
                                        </div>
                                    </el-col>
                                    <el-col style="width: 20%; height: 100">
                                        <div>地下层数</div>
                                        <div style="margin-top: 12px">
                                            <span class="textColor" style="font-size: 0.32rem; font-weight: 700">{{ buildingInfo.floorsUnderground }}</span> 层
                                        </div>
                                    </el-col>
                                    <el-col style="width: 20%; height: 100">
                                        <div>建筑类别</div>
                                        <div style="margin-top: 12px">
                                            <span class="textColor" style="font-size: 0.32rem; font-weight: 700">{{ 1 }}</span> 类高层公共建筑
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="height100" :span="6">
                        <div class="height100 ritConb">
                            <div class="cardItemB">
                                <div class="cardItemS">
                                    <div class="cardTit">
                                        <div class="navIconC"></div>
                                        消防安全运行综合评分
                                    </div>
                                    <div class="cardMain" @click="showScoreMark = true">
                                        <div class="height100 sysRemark text_c">
                                            <span style="margin-top: -9.9%; font-size: 0.38rem">{{ (systemScoreList.score / 1).toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cardItemB">
                                <div class="cardItemS">
                                    <div class="cardTit">
                                        <div class="navIconC"></div>
                                        企业消防安全责任体系
                                    </div>
                                    <div class="cardMain" style="padding: 0.03rem 0.12rem">
                                        <img @click="showsafetyresponsi = true" style="width: 100%; height: 100%; cursor: pointer" src="../../assets/images/globalCenterNew/safetyresponsibility.png" alt="safety" />

                                        <!-- <el-scrollbar class="height100">
                                            <div>
                                                <el-radio-group style="transform: scale(0.8); margin-left: -0.2rem" v-model="compRadio" size="mini">
                                                    <el-radio-button label="环球中心"></el-radio-button>
                                                    <el-radio-button label="购物中心"></el-radio-button>
                                                </el-radio-group>
                                            </div>

                                            <el-row v-if="compRadio == '环球中心'" @click.native="showsafetyresponsi = true" v-for="item in personList" :key="item.id" class="listPersonC">
                                                <el-col style="color: #c97c44" :span="7">{{ item.job }}</el-col>
                                                <el-col :span="7">{{ item.comp }}</el-col>
                                                <el-col :span="4">{{ item.jobLv }}</el-col>
                                                <el-col class="textColor" :span="4">{{ item.uName }}</el-col>
                                                <el-col :span="2">
                                                    <img style="height: 0.18rem" src="../../assets/images/globalCenterNew/callico.png" alt="" />
                                                </el-col>
                                            </el-row>
                                            <el-row v-if="compRadio == '购物中心'" @click.native="showsafetyresponsi = true" v-for="item in personList1" :key="item.id" class="listPersonC">
                                                <el-col style="color: #c97c44" :span="7">{{ item.job }}</el-col>
                                                <el-col :span="7">{{ item.comp }}</el-col>
                                                <el-col :span="4">{{ item.jobLv }}</el-col>
                                                <el-col class="textColor" :span="4">{{ item.uName }}</el-col>
                                                <el-col :span="2">
                                                    <img style="height: 0.18rem" src="../../assets/images/globalCenterNew/callico.png" alt="" />
                                                </el-col>
                                            </el-row>
                                        </el-scrollbar> -->
                                    </div>
                                </div>
                            </div>
                            <div class="cardItemB">
                                <div class="cardItemS">
                                    <div class="cardTit">
                                        <div class="navIconC"></div>
                                        消防资源
                                    </div>
                                    <div class="cardMain">
                                        <el-row class="height100 text_c" :gutter="10">
                                            <!--TODO 陈磊: 设备统计-->
                                            <el-col :span="12" @click.native="equipmentStatsVisible = true">
                                                <div style="border-right: 2px dashed #ccc; padding-left: 10%">
                                                    <div>
                                                        <el-row>
                                                            <el-col class="text_l" :span="12">
                                                                <img style="height: 0.56rem" src="../../assets/images/globalCenterNew/mhqIco.png" alt="" />
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <div class="text_l">设备总数</div>
                                                                <div class="text_l">
                                                                    <span class="textColor" style="font-size: 0.2rem; font-weight: 700">{{ alarmEventList.total }}</span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="14">消防设备：</el-col>
                                                            <el-col :span="10"> {{ alarmEventList.equipSys1 + alarmEventList.equipSys3 + alarmEventList.equipSys4 + alarmEventList.equipSys8 + alarmEventList.equipSys5 + alarmEventList.equipSys9 + alarmEventList.equipSys10 }} </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="14">安防设备：</el-col>
                                                            <el-col :span="10"> {{ alarmEventList.videoCount }} </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="14">逃生疏散设备：</el-col>
                                                            <el-col :span="10"> {{ alarmEventList.tsbnxt + alarmEventList.equipSys6 + alarmEventList.equipSys11 }} </el-col>
                                                        </el-row>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" @click.native="fireForcesVisible = true">
                                                <div style="padding-left: 10%">
                                                    <div>
                                                        <el-row>
                                                            <el-col class="text_l" :span="14">
                                                                <img style="height: 0.56rem" src="../../assets/images/globalCenterNew/buildIco.png" alt="" />
                                                            </el-col>

                                                            <el-col :span="10">
                                                                <div class="text_l" style="margin-top: 13px">消防力量</div>
                                                                <!-- <div class="text_l"><span class="textColor" style="font-size: 0.2rem; font-weight: 700">6</span> 个</div> -->
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="16">政府专职消防队：</el-col>
                                                            <el-col :span="8">1 </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="16">企业消防队：</el-col>
                                                            <el-col :span="8"> 1 </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="16">微型消防站：</el-col>
                                                            <el-col :span="8"> 1 </el-col>
                                                        </el-row>
                                                    </div>
                                                    <div class="text_l" style="margin-top: 0.12rem">
                                                        <el-row>
                                                            <el-col :span="16">消防物资：</el-col>
                                                            <el-col :span="8"> 6 </el-col>
                                                        </el-row>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <!-- <el-row class="height100 text_c">
                                        <el-col style="height: 100%; position: relative" :span="12">
                                            <span style="position: absolute; left: 50%; top: 53%; transform: translate(-50%, -50%); display: inline-block; font-size: 0.22rem">{{ countCheckList.onP }}%</span>
                                            <img style="height: 76%; margin-top: 10%" src="../../assets/images/globalCenter/water.gif" alt="" />
                                        </el-col>
                                        <el-col :span="12" style="line-height: 0.36rem">
                                            <div style="width: 100%; text-align: left">查岗次数：&nbsp;&nbsp;&nbsp;{{ countCheckList.total }}次</div>
                                            <div style="width: 100%; text-align: left">在岗率：&nbsp;&nbsp;&nbsp;{{ countCheckList.onP }} %</div>
                                            <div style="width: 100%; text-align: left">脱岗率：&nbsp;&nbsp;&nbsp;{{ countCheckList.offP }} %</div>
                                        </el-col>
                                    </el-row> -->
                                        <!-- <dv-water-level-pond :config="configP" style="width:100px;height:120px" /> -->
                                        <!-- <div class="height100" id="checkDutyChart"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 设备报警情况列表 -->
        <component @closeDialog="homedilogshow = ''" @viewchange="viewchange" :aquifloor="aquifloor" v-if="homedilogshow == 'equipment'" :is="require('./indexTabdialog/equipment.vue')"></component>
        <component @closeDialog="homedilogshow = ''" :alatitle="alatitle" :equipInfo="eventviewshow" @viewchange="viewchange" v-if="eventviewshow" :is="require('./indexTabdialog/eventview.vue')"></component>
        <!-- 隐患清单 -->
        <component @closeDialog="homedilogshow = ''" @viewchange="viewchange" v-if="homedilogshow == 'patro'" :is="require('./indexTabdialog/patrolinspection.vue')"></component>
        <!-- 硬件资源 -->
        <component @closeDialog="homedilogshow = ''" @statistics="statistics" v-if="homedilogshow == 'saferesponsi'" :is="require('./indexTabdialog/saferesponsibility.vue')"></component>
        <!--        <component @closeDialog="homedilogshow = ''" v-if="homedilogshow == 'statistics'" :is="require('./indexTabdialog/equipmentstatistics.vue')"></component>-->

        <!-- TODO 陈磊: 设备统计 -->
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" :visible.sync="equipmentStatsVisible" v-if="equipmentStatsVisible" :close-on-click-modal="true" class="unit-edit-con" width="1200px">
                <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">消防资源</div>
                <div style="position: relative">
                    <component :is="require('./indexTabdialog/cl/equipmentStats/equipmentStats.vue')" />
                </div>
            </el-dialog>
        </div>

        <!-- TODO 陈磊: 巡查情况-巡查(次数)统计 -->
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" :visible.sync="patrolStatsVisible" v-if="patrolStatsVisible" :close-on-click-modal="true" class="unit-edit-con" width="1200px">
                <component :dataRange="patrolOrRiskRange" @closeRiskStats="patrolStatsVisible = false" :is="require('./indexTabdialog/cl/patrolStats/patrolStats.vue')" />
            </el-dialog>
        </div>

        <!-- TODO 陈磊: 巡查情况-隐患(次数)统计 -->
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" :visible.sync="riskStatsVisible" v-if="riskStatsVisible" :close-on-click-modal="true" class="unit-edit-con" width="1200px">
                <component :dataRange="patrolOrRiskRange" @closeRiskStats="riskStatsVisible = false" :is="require('./indexTabdialog/cl/riskStats/riskStats.vue')" />
            </el-dialog>
        </div>

        <!-- TODO 陈磊20220901: 消防力量 -->
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" :visible.sync="fireForcesVisible" v-if="fireForcesVisible" :close-on-click-modal="true" class="unit-edit-con" width="1200px">
                <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">消防力量</div>
                <div style="position: relative">
                    <component :is="require('./indexTabdialog/filter.vue')" />
                    <!--  <component :is="require('./indexTabdialog/cl/fireForces/index.vue')" /> -->
                </div>
            </el-dialog>
        </div>

        <!-- 企业消防安全责任 -->
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" title="隐患清单" width="1200px" :visible.sync="showsafetyresponsi" :close-on-click-modal="true" class="unit-edit-con">
                <!-- <component @closeDialog="homedilogshow = ''" :compType="compRadio" :safetyrespons="safetyrespons" :is="require('./indexTabdialog/safetyresponsibilityNew.vue')"></component> -->
                <component @closeDialog="homedilogshow = ''" :is="require('./indexTabdialog/safetyresponsibilityNew2.vue')"></component>
            </el-dialog>
        </div>
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="报警情况" :visible.sync="showAlarm1" :close-on-click-modal="true" class="unit-edit-con">
                <!-- <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">报警分析</div> -->
                <div style="position: relative">
                    <component :visible.sync="showAlarm1" :showAlarm1Day="showAlarm1Day" :showanaly="showanalysis" @showequipment="showequipment" :is="require('./indexTabdialog/alarmcondition.vue')"></component>
                </div>
            </el-dialog>
        </div>
        <div class="alertModel">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="巡查情况" :visible.sync="showAlarm2" :close-on-click-modal="true" class="unit-edit-con">
                <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">巡查情况</div>
                <div style="position: relative">
                    <div @click="homedilogshow = 'patro'" style="position: absolute; width: 100%; height: 130px; top: 31%; background-color: transprent; z-index: 1; cursor: pointer"></div>
                    <img style="width: 100%" src="../../assets/images/globalCenterNew/check.jpg" alt="" />
                </div>
            </el-dialog>
        </div>

        <!-- <div class="alertModel" v-if="showReadyAlarm">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="隐患清单" :visible.sync="showReadyAlarm" :close-on-click-modal="true" class="unit-edit-con">
                <component @closeDialog="homedilogshow = ''" :readyAlarmType="readyAlarmType" :is="require('./indexTabdialog/readyAlarm')"></component>
            </el-dialog>
        </div> -->

        <!-- 预警情况 -->
        <!-- 突发类事件预警 -->
        <div class="alertModel" v-if="showearlyemergency">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="突发类事件预警" :visible.sync="showearlyemergency" :close-on-click-modal="true" class="unit-edit-con">
                <component :visible.sync="showearlyemergency" @closeDialog="homedilogshow = ''" :alarmRadiofu="alarmRadio" :readyAlarmType="readyAlarmType" :is="require('./indexTabdialog/early/earlyemergency')"></component>
            </el-dialog>
        </div>

        <!-- 管理类事件预警 -->
        <div class="alertModel" v-if="showearlymanageevents">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="管理类事件预警" :visible.sync="showearlymanageevents" :close-on-click-modal="true" class="unit-edit-con">
                <component :visible.sync="showearlymanageevents" @closeDialog="homedilogshow = ''" :alarmRadiofu="alarmRadio" :readyAlarmType="readyAlarmType" :is="require('./indexTabdialog/early/earlymanageevents')"></component>
            </el-dialog>
        </div>

        <div class="alertModel" v-if="showFirePowerDia">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="消防力量" :visible.sync="showFirePowerDia" :close-on-click-modal="true" class="unit-edit-con">
                <component @closeDialog="homedilogshow = ''" :readyAlarmType="readyAlarmType" :is="require('./indexTabdialog/firePower')"></component>
            </el-dialog>
        </div>
        <!-- 消防安全运行综合评分 -->
        <div class="alertModel">
            <el-dialog top="5vh" @closed="showScoreMark = false" :modal-append-to-body="false" width="1200px" title="隐患清单" :visible.sync="showScoreMark" :close-on-click-modal="true" class="unit-edit-con">
                <component @closeDialog="homedilogshow = ''" @closeTsCompF="showScoreMark = false" :is="require('./indexTabdialog/scoreMark')"></component>
            </el-dialog>
        </div>
        <div v-if="showSSImg" class="showSSVideo">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="环球中心人员疏散智能辅助指引" :visible.sync="showSSImg" :close-on-click-modal="true" class="unit-edit-con">
                <!-- <img style="width: 100%" src="../../assets/images/globalCenter/ssPic.png" alt="" /> -->
                <video loop width="100%" height="auto" muted autoplay src="../../../static/video/ssVideo.mp4"></video>
            </el-dialog>
        </div>
        <div v-if="showLCImg" class="showSSVideo">
            <el-dialog top="5vh" :modal-append-to-body="false" width="1200px" title="建筑情况" :visible.sync="showLCImg" :show-close="false" :close-on-click-modal="true">
                <!-- class="unit-edit-con" position: relative;   -->
                <div style="width: 100px; height: 20px; display: flex; justify-content: space-between" class="clhangImg">
                    <span style="margin-top: 5px; color: #fff" @click="handleClose">{{ showImg ? '查看平面图' : '查看剖面图' }} </span> <i @click="showLCImg = false" class="el-icon-circle-close" style="font-size: 26px; color: #5e9ffb; cursor: pointer"> </i>
                </div>

                <!-- <a href="http://182.151.21.153:18/enterprise/#/" target="_self">
                    <div  @mouseout="showSvg = false" @mouseover="showSvg = true" class="box imghover">s</div>
                </a> -->
                <div @click="showImg = true" @mouseout="showSvg = false" @mouseover="showSvg = true" class="box imghover">s</div>

                <!--   <img @click="changeImg" @mouseover="getImg" v-show="!showImg" style="width: 100%; display: block" src="" alt="" /> -->
                <img @click="changeImg" @mouseover="getImg" v-show="!showImg" style="width: 100%; display: block" :src="img" alt="" />
                <!--  <img @mouseover="getImg" @click="changeImg" class="imghover" v-show="!showImg" style="width: 100%" src="../../assets/images/globalCenterNew/20220906-230217.png" alt="" /> -->
                <img v-show="showImg" style="width: 100%" src="../../assets/images/globalCenterNew/20220906-230232.png" alt="" />
            </el-dialog>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { Radar } from '@antv/g2plot';
export default {
    data() {
        return {
            img: require('../../assets/images/globalCenterNew/xxxx.svg'),
            showSvg: false,
            showImg: false,
            text: '查看剖面图',
            aquifloor: '',
            showanalysis: 0,
            /**
             *   TODO 陈磊: 巡查的2个弹窗和设备统计弹窗的状态控制
             */
            equipmentStatsVisible: false,
            patrolStatsVisible: false,
            riskStatsVisible: false,
            /**
             *   TODO 陈磊20220901: 消防力量弹窗
             */
            fireForcesVisible: false,
            /**
             *   TODO 陈磊: 巡查的2个弹窗数据范围
             */

            patrolOrRiskRange: '当日', // 当日 | 当月
            alarmRadioDate: 'DAY',
            safetyrespons: '',
            eventviewshow: '',
            alatitle: '',
            homedilogshow: '',
            showLCImg: false,
            showFirePowerDia: false,
            showsafetyresponsi: false,
            showAlarm1: false,
            showAlarm1Day: false,
            showAlarm2: false,
            showSSImg: false,
            showReadyAlarm: false,
            showScoreMark: false,
            compRadio: '环球中心',
            personList: [
                {
                    id: '1',
                    job: '安委会主任',
                    comp: '环球会展集团',
                    jobLv: '总经理',
                    uName: '魏东'
                },
                {
                    id: '2',
                    job: '安委会常务副主任',
                    comp: '四川大区物业',
                    jobLv: '董事长',
                    uName: '赵氢'
                },
                {
                    id: '3',
                    job: '安委会副主任',
                    comp: '环球购物中心',
                    jobLv: '总经理',
                    uName: '李道海'
                },
                {
                    id: '4',
                    job: '安委会副主任',
                    comp: '环球物业公司',
                    jobLv: '总经理',
                    uName: '赵海'
                },
                {
                    id: '5',
                    job: '安委会副主任',
                    comp: '海洋乐园',
                    jobLv: '总经理',
                    uName: '马莉娜'
                },
                {
                    id: '6',
                    job: '安委会副主任',
                    comp: '洲际酒店',
                    jobLv: '总经理',
                    uName: '谢波'
                },
                {
                    id: '7',
                    job: '安委会副主任',
                    comp: '洗衣工厂',
                    jobLv: '总经理',
                    uName: '杜庭远'
                },
                {
                    id: '8',
                    job: '安委会副主任',
                    comp: '乐天百货',
                    jobLv: '总经理',
                    uName: '李灿'
                },
                {
                    id: '9',
                    job: '安委会副主任',
                    comp: '能源公司',
                    jobLv: '总经理',
                    uName: '刘颖'
                }
            ],
            personList1: [
                {
                    id: '1',
                    job: '安委会主任',
                    comp: '环球购物',
                    jobLv: '总经理',
                    uName: '李道海'
                },
                {
                    id: '2',
                    job: '安全负责人',
                    comp: '环球购物',
                    jobLv: '副总经理',
                    uName: '宁巍'
                },
                {
                    id: '3',
                    job: '安全联络人',
                    comp: '环球购物中心',
                    jobLv: '物业经理',
                    uName: '王虎'
                },
                {
                    id: '4',
                    job: '安全联络人',
                    comp: '环球物业公司',
                    jobLv: '安全经理',
                    uName: '谭天'
                }
            ],
            leftDataTop: '',
            leftDataMid: '',
            leftDataBot: '',
            radio4: '消防设备',
            timeStr: '',
            countEquipmentStateList: '',
            alarmList: '',
            buildingInfo: '',
            chartOne: '',
            chartTwo: '',
            chartThree: '',
            chartFour: '',
            screenWidth: '',
            alarmMsg: 'first',
            activeAlarmTabName: 'first',
            activeEquiTypeName: 'first',
            showAlarmMsgInfo: false,
            equipSysCountList: '',
            alarmEventList: '',
            countEquipment: '',
            equipStateList: '',
            systemScoreList: '',
            emergencyResourcesList: '',
            countDutiesList: '',
            countCheckList: '',
            countRisksNumberList: '',
            alarmEventListAll: [],
            hideTroEventList: [],
            checkEventList: [],
            sevenDaysALarmCount: [],
            timeSliceArr: [],
            msgTimeLine: '',
            popEventData: '',
            alarmEequipInfo: '',
            configP: {
                data: [66]
            },
            showearlyemergency: false, //1.突发类事件预警show
            showearlymanageevents: false, //2.管理类事件预警show
            readyAlarmType: 1, //预警情况：1.突发类事件预警2.管理类事件预警
            alarmRadio: 'DAY' //预警情况日、月
        };
    },
    watch: {
        showLCImg: function (newValue, oldvalue) {
            if (newValue) {
                this.showImg = false;
            }
        },
        showSvg: function (newValue) {
            if (newValue) {
                this.img = require('../../assets/images/globalCenterNew/Frame 97.svg');
            } else {
                this.img = require('../../assets/images/globalCenterNew/xxxx.svg');
            }
        }
    },

    methods: {
        getImg(event) {
            let x = Number(event.layerX),
                y = Number(event.layerY);
            console.dir(x);
            console.dir(y);
        },

        changeImg(event) {
            //购物中心 x 811 x 842  y 232  y 391
            let x = Number(event.layerX),
                y = Number(event.layerY);

            console.dir(x);
            console.dir(y);
            if (753 < x && x < 790 && 167 < y && y < 362) {
                //购物中心
                this.showImg = true;
            } else if (666 < x && x < 723 && 132 < y && y < 368) {
                //东区
                console.dir('东区');
            } else if (720 < x && x < 746 && 393 < y && y < 553) {
                //乐天百货
                console.dir('乐天百货');
            } else if (695 < x && x < 719 && 393 < y && y < 553) {
                //写字楼
                console.dir('写字楼');
            } else if (579 < x && x < 616 && 186 < y && y < 326) {
                //上酒店区
                console.dir('上酒店区');
            } else if (568 < x && x < 617 && 364 < y && y < 553) {
                //下酒店区
                console.dir('下酒店区');
            }

            return;
        },

        handleClose() {
            this.showImg = !this.showImg;
        },

        showequipment(val) {
            this.aquifloor = val;
            this.homedilogshow = 'equipment';
            this.showAlarm1 = false;
        },
        readyAlarmShow(e) {
            if (e == 1) {
                this.showearlyemergency = true;
            }
            if (e == 2) {
                this.showearlymanageevents = true;
            }
            this.readyAlarmType = e;
        },
        showCopmInfo() {
            this.showsafetyresponsi = true;
        },
        safetyresponsichange(comp) {
            this.safetyrespons = comp;
            this.showsafetyresponsi = true;
        },
        goPage51Fn1() {
            this.showSSImg = true;
        },
        goPage51Fn2() {
            // window.open('http://182.151.21.153:18080/#/');
            window.open('http://182.151.21.153:18/');
        },
        viewchange(val, title) {
            this.alatitle = title;
            this.eventviewshow = val;
        },
        statistics(val) {
            this.homedilogshow = 'statistics';
        },
        gitBuildVideoList() {},
        goPagesEventFn(type) {
            if (type == 'equipment1') {
                this.showanalysis += 1;
                this.showAlarm1Day = true;
                this.showAlarm1 = true;
            }
            if (type == 'equipment2') {
                this.showanalysis += 1;
                this.showAlarm1Day = false;
                this.showAlarm1 = true;
            } else if (type == 'patro') {
                this.showAlarm2 = true;
            } else {
                this.homedilogshow = type;
            }
            // this.$router.push(url);
        },
        goPages(url) {
            //跳转
            this.$router.push(url);
        },
        getTimeSlice() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/alarmTimeSlice',
                type: 'get',
                success: function (res) {
                    let dayW = 0;
                    let dayN = 0;
                    let dayA = 0;
                    for (let i = 0; i < res.data.length; i++) {
                        if (i <= 3 || i >= 10) {
                            for (let key in res.data[i]) {
                                dayW += res.data[i][key] / 1;
                                dayA += res.data[i][key] / 1;
                            }
                        } else {
                            for (let key in res.data[i]) {
                                dayN += res.data[i][key] / 1;
                                dayA += res.data[i][key] / 1;
                            }
                        }
                    }
                    res.data.push({
                        dayW: dayW,
                        dayN: dayN,
                        dayWP: ((dayW / dayA) * 100).toFixed(2),
                        dayNP: ((dayN / dayA) * 100).toFixed(2)
                    });
                    _self.timeSliceArr = res.data;
                    _self.drawAlarmTimePie();
                }
            });
        },
        get7DayAlarmCount() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/countAlarmNumber',
                type: 'get',
                data: {
                    n: 7
                },
                success: function (res) {
                    _self.sevenDaysALarmCount = res.data;
                    _self.drawIncresChart();
                }
            });
        },
        getEventListAll() {
            let _self = this;
            _self._http({
                url: '/api/web/webAlarmList/find',
                type: 'get',
                data: {
                    current: 1,
                    size: 20,
                    state: '04',
                    transform: 'B:building,F:floor',
                    sorts: 'alarmTime:desc'
                },
                success: function (res) {
                    _self.alarmEventListAll = res.data;
                }
            });

            _self._http({
                url: '/api/web/webRisksList/find',
                type: 'get',
                data: {
                    current: 1,
                    size: 20,
                    state: '04',
                    transform: 'B:building,F:floor',
                    sorts: 'dispatchTime:desc'
                },
                success: function (res) {
                    _self.hideTroEventList = res.data;
                }
            });
            _self._http({
                url: '/api/web/webPatrolRecord/findList',
                type: 'get',
                data: {
                    current: 1,
                    size: 20,
                    state: '04',
                    sorts: 'completeTime:desc'
                },
                success: function (res) {
                    _self.checkEventList = res.data;
                }
            });
            //
        },
        getcountRisksNumber() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/countRisksNumber',
                type: 'get',
                data: {
                    n: 7
                },
                success: function (res) {
                    _self.countRisksNumberList = res.data;
                    _self.drawAlarmLineChart();
                }
            });
        },
        getcountCheck() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/countCheckList',
                type: 'get',
                success: function (res) {
                    // res.data.off = 10;
                    // res.data.on = 10;
                    // res.data.total = 20;

                    res.data['offP'] = ((res.data.off / res.data.total) * 100).toFixed(2);
                    res.data['onP'] = ((res.data.on / res.data.total) * 100).toFixed(2);
                    if (res.data.offP == 'NaN') {
                        res.data.offP = 0;
                    }
                    if (res.data.onP == 'NaN') {
                        res.data.onP = 0;
                    }
                    _self.countCheckList = res.data;

                    console.log('_self.countCheckList:', _self.countCheckList);
                    _self.drawCheckDutyChart();
                }
            });
        },
        getcountDuties() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/radarPic',
                type: 'get',
                success: function (res) {
                    _self.countDutiesList = res.data;
                    _self.drawRedarChart();
                }
            });
        },
        getemergencyResources() {
            let _self = this;
            _self._http({
                url: '/api/open/fiveOne/emergencyResources',
                type: 'get',
                success: function (res) {
                    _self.emergencyResourcesList = res.data;
                }
            });
        },
        getsystemScore() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCountV3/systemScore', //迪威的系统评分
                //  url: '/api/web/indexCountTwo/systemScore',
                type: 'get',
                success: function (res) {
                    _self.systemScoreList = res.data;
                    console.log('eeeeeeeeeeeeeeeeeeeeeee');
                    console.dir(res);
                }
            });
        },
        getAlarmEventCount() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCountTwo/resourceStatistics',
                type: 'get',
                success: function (res) {
                    _self.alarmEventList = res.data;
                }
            });
        },
        getSysEquipCount() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/systemType',
                type: 'get',
                success: function (res) {
                    _self.equipSysCountList = res.data;
                }
            });
        },
        goPageList(type) {
            let _self = this;
            // 1，7，3，6，10，11
            switch (type) {
                case 1:
                    _self.$router.push({
                        path: '/equipManaList/1'
                    });
                    break;
                case 7:
                    _self.$router.push({
                        path: '/equipManaList/7'
                    });
                    break;
                case 8:
                    _self.$router.push({
                        path: '/equipManaList/8'
                    });
                    break;
                case 3:
                    _self.$router.push({
                        path: '/equipManaList/3'
                    });
                    break;
                case 6:
                    _self.$router.push({
                        path: '/equipManaList/6'
                    });
                    break;
                case 9:
                    _self.$router.push({
                        path: '/equipManaList/9'
                    });
                    break;
                case 10:
                    _self.$router.push({
                        path: '/equipManaList/10'
                    });
                    break;
                case 11:
                    _self.$router.push({
                        path: '/equipManaList/11'
                    });
                    break;
                default:
                    break;
            }
        },
        showAlarmMsgInfoFn(e) {
            this.popEventData = e;
            this.showAlarmMsgInfo = true;
            let _self = this;
            // alarmMsg == 'first'
            if (_self.alarmMsg == 'first') {
                _self._http({
                    url: '/api/web/webEquipment/find',
                    type: 'get',
                    data: {
                        current: 1,
                        size: 20,
                        id: e.equipmentId,
                        transform: 'B:building,F:floor,ES:owningSystem'
                    },
                    success: function (res) {
                        _self.alarmEequipInfo = res.data.records[0];
                    }
                });
            }

            this.getMessagesInfo(e.id);
        },
        // /api/web/indexCount/findMessages
        getMessagesInfo(id) {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/findMessages',
                type: 'get',
                data: {
                    sourceId: id,
                    sorts: 'addtime:asc'
                },
                success: function (res) {
                    _self.msgTimeLine = res.data.records;
                }
            });
        },
        getCountEquipmentState() {
            let _self = this;
            _self._http({
                url: '/api/web/webAlarmList/find',
                type: 'get',
                data: {
                    current: 1,
                    size: 20,
                    transform: 'F:floor;B:building'
                },
                success: function (res) {
                    _self.alarmList = res.data.records;
                }
            });
        },
        getEquipStateCount() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/countEquipment',
                type: 'get',
                success: function (res) {
                    // 5231
                    // if (res.data['5']) {
                    //     res.data['5'] = ((res.data['5'] / res.data.total) * 100).toFixed(1) / 1;
                    // } else {
                    //     res.data['5'] = 0;
                    // }
                    // if (res.data['2']) {
                    //     res.data['2'] = ((res.data['2'] / res.data.total) * 100).toFixed(1) / 1;
                    // } else {
                    //     res.data['2'] = 0;
                    // }
                    // if (res.data['3']) {
                    //     res.data['3'] = ((res.data['3'] / res.data.total) * 100).toFixed(1) / 1;
                    // } else {
                    //     res.data['3'] = 0;
                    // }
                    // if (res.data['1']) {
                    //     res.data['1'] = ((res.data['1'] / res.data.total) * 100).toFixed(1) / 1;
                    // } else {
                    //     res.data['1'] = 0;
                    // }
                    _self.equipStateList = res.data;
                }
            });
        },
        getBuildInfo() {
            let _self = this;
            // /api/web/webBuilding/find
            _self._http({
                url: '/api/web/webBuilding/find',
                type: 'get',
                success: function (res) {
                    if (res.data.records.length > 0) {
                        _self._http({
                            url: '/api/web/indexCount/getBuilding',
                            type: 'get',
                            data: {
                                id: res.data.records[0].id
                            },
                            success: function (res) {
                                _self.buildingInfo = res.data;
                            }
                        });
                    }
                }
            });
        },
        getDutyNUm() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCount/countCheckList',
                type: 'get',
                success: function (res) {}
            });
        },
        drawCheckDutyChart() {
            this.chartFour = echarts.init(document.getElementById('checkDutyChart'));
            let _thit = this;
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    orient: 'vertical',
                    top: '10%',
                    right: '10%',
                    data: ['查岗次数', '在岗次数', '脱岗次数'],
                    formatter(v) {
                        if (v == '查岗次数') {
                            return `查岗${_thit.countCheckList.total}次`;
                        } else if (v == '在岗次数') {
                            return `在岗率：${_thit.countCheckList.onP == 'NaN' ? '0' : _thit.countCheckList.onP}%`;
                        } else if (v == '脱岗次数') {
                            return `脱岗率：${_thit.countCheckList.offP == 'NaN' ? '0' : _thit.countCheckList.offP}%`;
                        }
                    },
                    textStyle: {
                        color: '#aebcd6',
                        fontSize: '10'
                    }
                },
                grid: {
                    top: '20%',
                    left: '10%',
                    right: '3%',
                    bottom: '8%'
                },
                color: ['#39c6a5', '#3254dd', '#bee5fb'],
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '60%',
                        center: ['35%', '55%'],
                        data: [
                            { value: _thit.countCheckList.total, name: '查岗次数' },
                            { value: _thit.countCheckList.on, name: '在岗次数' },
                            { value: _thit.countCheckList.off, name: '脱岗次数' }
                        ],
                        label: {
                            show: false,
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
            _thit.chartFour.setOption(option);
        },
        drawRedarChart() {
            let _thit = this;
            const data = [
                {
                    item: 'A',
                    user: 'a',
                    score: _thit.countDutiesList.regulation
                },
                {
                    item: 'B',
                    user: 'a',
                    score: _thit.countDutiesList.organization
                },
                {
                    item: 'C',
                    user: 'a',
                    score: _thit.countDutiesList.teach
                },
                {
                    item: 'D',
                    user: 'a',
                    score: _thit.countDutiesList.yearTraining
                },
                {
                    item: 'E',
                    user: 'a',
                    score: _thit.countDutiesList.emergence
                },
                {
                    item: 'F',
                    user: 'a',
                    score: _thit.countDutiesList.files
                }
            ];
            const radarPlot = new Radar('raderChart', {
                data,
                xField: 'item',
                yField: 'score',
                padding: [40, 40, 40, 40],
                meta: {
                    score: {
                        alias: '分数',
                        min: 0,
                        max: 100
                    }
                },
                xAxis: {
                    line: null,
                    tickLine: null,
                    title: {
                        style: {
                            color: 'red'
                        }
                    },
                    grid: {
                        line: {
                            style: {
                                lineDash: null
                            }
                        }
                    }
                },
                yAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                        line: {
                            type: 'line',
                            style: {
                                lineDash: null
                            }
                        },
                        // alternateColor: ['#ccc','#cccccc70','#cccccc50','#cccccc30']
                        alternateColor: 'transparent'
                    }
                },
                // 开启面积
                area: {},
                // 开启辅助点
                point: {
                    size: 1
                }
            });
            radarPlot.render();
        },
        drawAlarmLineChart() {
            this.chartOne = echarts.init(document.getElementById('alarmLineChart'));
            let dateArr = [];
            let findArr = [];
            let handelArr = [];
            for (let i = 0; i < this.countRisksNumberList.length; i++) {
                dateArr.push(this.countRisksNumberList[i].day.slice(5, 10));
                if (this.countRisksNumberList[i].total) {
                    findArr.push(this.countRisksNumberList[i].total);
                } else {
                    findArr.push(0);
                }
                if (this.countRisksNumberList[i].over) {
                    handelArr.push(this.countRisksNumberList[i].over);
                } else {
                    handelArr.push(0);
                }
            }
            var option = {
                title: {
                    text: '',
                    textStyle: {
                        fontSize: '14',
                        color: '#73c1d0'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    top: '6%',
                    data: ['发现隐患', '处理隐患'],
                    textStyle: {
                        color: '#aebcd6',
                        fontSize: '10'
                    }
                },
                grid: {
                    top: '27%',
                    left: '10%',
                    right: '6%',
                    bottom: '16%'
                },
                // color: ['#175ff8', '#10c7c0'],
                color: ['#10c7c0'],
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ['#46536f'],
                                width: 1,
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            lineStyle: { color: '#5e708e' } // 坐标轴颜色
                        },
                        data: dateArr
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#707B7C'
                        },
                        axisLine: {
                            // symbol: ['none', 'arrow'],
                            lineStyle: { color: '#707B7C' } // 坐标轴颜色
                        },
                        // min: '0',
                        // max: '6',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#46536f'],
                                width: 1,
                                type: 'dashed'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '发现隐患',
                        type: 'line',
                        smooth: true,
                        // symbol: 'none',
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(16,199,192,1)'
                                    },
                                    {
                                        offset: 0.5,
                                        color: 'rgba(16,199,192,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(16,199,192,0.1)'
                                    }
                                ])
                            }
                        },
                        data: findArr
                    },
                    {
                        name: '处理隐患',
                        type: 'bar',
                        barWidth: 8,
                        data: handelArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    { offset: 0, color: '#3E92EF' },
                                    { offset: 1, color: '#24F4ED' }
                                ])
                            }
                        }
                    }
                ]
            };
            this.chartOne.setOption(option);
        },
        drawIncresChart() {
            this.chartTwo = echarts.init(document.getElementById('incresChart'));
            let dateArr = [];
            let dataArr = [];
            for (let i = 0; i < this.sevenDaysALarmCount.length; i++) {
                dateArr.push(this.sevenDaysALarmCount[i].everyDay.slice(5, 10));
                dataArr.push(this.sevenDaysALarmCount[i].number);
            }
            var option = {
                title: {
                    text: '',
                    textStyle: {
                        fontSize: '14',
                        color: '#73c1d0'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    data: ['报警次数'],
                    right: '7%',
                    textStyle: {
                        color: '#aebcd6',
                        fontSize: '10'
                    }
                },
                grid: {
                    top: '17%',
                    left: '10%',
                    right: '6%',
                    bottom: '16%'
                },
                // color: ['#175ff8', '#10c7c0'],
                color: ['#10c7c0'],
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ['#46536f'],
                                width: 1,
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            lineStyle: { color: '#5e708e' } // 坐标轴颜色
                        },
                        data: dateArr
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#707B7C'
                        },
                        axisLine: {
                            lineStyle: { color: '#707B7C' } // 坐标轴颜色
                        },
                        // min: '0',
                        // max: '6',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#46536f'],
                                width: 1,
                                type: 'dashed'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '报警次数',
                        type: 'line',
                        smooth: true,
                        // symbol: 'none',
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(16,199,192,1)'
                                    },
                                    {
                                        offset: 0.5,
                                        color: 'rgba(16,199,192,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(16,199,192,0.1)'
                                    }
                                ])
                            }
                        },
                        data: dataArr
                    }
                ]
            };
            this.chartTwo.setOption(option);
        },
        drawAlarmTimePie() {
            this.chartThree = echarts.init(document.getElementById('alarmTimePie'));
            var option;
            let nameArr = [];
            let dataArr = [];
            for (let i = 0; i < this.timeSliceArr.length - 1; i++) {
                for (let key in this.timeSliceArr[i]) {
                    nameArr.push(key);
                    dataArr.push({
                        name: key,
                        value: this.timeSliceArr[i][key]
                    });
                }
            }
            console.log(nameArr, dataArr);
            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    right: 0
                },
                color: ['#2b8ef3', '#48e5e5', '#3254dd', '#bee5fb', '#3cd495'],
                series: [
                    {
                        type: 'pie',
                        radius: [15, 60],
                        center: ['50%', '60%'],
                        roseType: 'radius',
                        itemStyle: {
                            borderRadius: 2
                        },
                        label: {
                            show: false,
                            normal: {
                                show: false
                            }
                        },
                        data: dataArr
                    }
                ]
            };

            option && this.chartThree.setOption(option);
        },
        //获取年月日，时分秒并补齐2位格式化
        getTime() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            let timeStr = year + '年' + this.addZero(month) + '月' + this.addZero(day) + '日 ' + this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
            this.timeStr = timeStr;
        },
        //补齐2位格式化
        addZero(num) {
            return num < 10 ? '0' + num : num;
        },
        getleftNumData() {
            let _self = this;
            _self._http({
                // url: '/api/web/indexCountTwo/alarmStatistics',
                url: '/api/web/indexCountV3/alarmStatistics',
                type: 'get',
                success: function (res) {
                    _self.leftDataTop = res.data;
                }
            });
            _self._http({
                // url: '/api/web/indexCountTwo/patrolStatistics',
                url: '/api/web/indexCountV3/patrolStatistics',
                type: 'get',
                success: function (res) {
                    _self.leftDataMid = res.data;
                }
            });
        },
        getAlarmStatisticsDate(val) {
            console.dir(val);
        },
        getAlarmStatistics() {
            const _self = this;
            _self._http({
                url: '/api/web/indexCountTwo/earlyWarningStatistics',
                type: 'get',
                data: {
                    option: _self.alarmRadio
                },
                success: function (res) {
                    _self.leftDataBot = res.data;
                }
            });
        }
    },
    created() {},
    mounted() {
        let _self = this;
        _self.screenWidth = document.body.clientWidth;
        const htmlDom = document.getElementsByTagName('html')[0];
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        htmlDom.style.fontSize = `${htmlWidth / 19.2}px`;
        // 监听class为asideMenu的元素宽度变化
        let aside = document.querySelectorAll('.globalCenterIndexCon')[0];
        aside.addEventListener('resize', () => {
            console.log(123);
        });

        setInterval(() => {
            this.getTime();
        }, 1000);
        this.getleftNumData();
        this.getAlarmEventCount();
        this.getAlarmStatistics();
        // this.get7DayAlarmCount();
        // this.getEventListAll();
        // this.getSysEquipCount();
        // this.getCountEquipmentState();
        // this.getEquipStateCount();
        this.getBuildInfo();
        // this.getDutyNUm();
        this.getsystemScore();
        // this.getemergencyResources();
        // this.getcountDuties();
        // this.getcountCheck();
        // this.getcountRisksNumber();
        // this.getTimeSlice();
        this.$nextTick(() => {
            // this.drawIncresChart();
            // this.drawRedarChart();
            // this.drawAlarmLineChart();
            // this.drawCheckDutyChart();
            // this.drawAlarmTimePie();
        });

        setTimeout(() => {
            let progArr = document.querySelectorAll('.el-progress__text');
            //设置文字颜色
            for (let i = 0; i < progArr.length; i++) {
                let prog = progArr[i];
                if (i == 0) {
                    prog.style.color = '#ed4545';
                } else if (i == 1) {
                    prog.style.color = '#fb7a31';
                } else if (i == 2) {
                    prog.style.color = '#aa9d9b';
                } else {
                    prog.style.color = '#72e260';
                }
            }
        }, 2000);
    }
};
</script>
<style lang="scss">
.globalCenterIndexCon {
    width: 100%;
    height: 100%;
    // aspect-ratio: 16/9;
    overflow: hidden;
    color: #fff;
    // background-color: #242529;
    font-size: 0.15rem;
    // background-image: url('../../assets/images/globalCenter/maxBg.png');
    // background-size: 100% 100%;
    background-image: url('../../assets/images/globalCenter/buildBg.png');
    background-size: 100% 100%;
    position: relative;
    .showSSVideo {
        .el-dialog__body {
            padding: 0 !important;
        }
    }
    .el-dialog {
        border-radius: 6px !important;
        overflow: hidden !important;
    }
    .alertModel,
    .showSSVideo {
        .el-dialog__body {
            max-height: initial !important;
        }
    }
    .iframeBox {
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        iframe {
            width: 100%;
            height: 100%;
            display: none;
            // opacity: 0;
        }
    }
    .mainClas {
        position: absolute;
        // z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .swipBtnBox1 {
            position: absolute;
            z-index: 1;
            left: 13.8%;
            top: 0.08rem;
            width: 160px;
            height: 30px;
            background-image: url('../../assets/images/globalCenterNew/swipBtn1.png');
            background-size: 100% 100%;
            cursor: pointer;
        }
        .swipBtnBox2 {
            position: absolute;
            z-index: 1;
            right: 13.8%;
            top: 0.08rem;
            width: 180px;
            height: 30px;
            background-image: url('../../assets/images/globalCenterNew/swipBtn2.png');
            background-size: 100% 100%;
            cursor: pointer;
        }
        .midConb {
            .dataMainCount {
                height: 1.58rem;
                background: linear-gradient(360deg, rgba(23, 71, 126, 0) 0%, #28589f90 100%);
                border-radius: 8px 8px 8px 8px;
            }
        }
    }
    .textColor {
        color: #ffffff;
        text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
        background: linear-gradient(180deg, #ffffff 0%, #48e5e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .lineLinera {
        height: 2px;
        width: 88%;
        margin-left: 6%;
        background: linear-gradient(90deg, rgba(37, 166, 255, 0.1) 0%, #25a6ff 51%, rgba(37, 166, 255, 0.1) 100%);
    }
    .alarmMsgInfo {
        width: 520px;
        position: absolute;
        z-index: 999;
        left: 50%;
        top: 40%;
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
    }
    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
    div {
        box-sizing: border-box;
    }
    .checkRitem {
        font-size: 0.18rem;
        width: 88%;
        height: 0.43rem;
        line-height: 0.43rem;
        background: linear-gradient(90deg, rgba(72, 229, 229, 0.35) 0%, rgba(72, 229, 229, 0) 100%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 0.06rem;
        border-radius: 0.05rem;
    }
    .el-radio-group .is-active .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #3869a4 !important;
        border-color: #3869a4 !important;
    }
    .headerConb {
        height: 0.8rem;
        background-image: url('../../assets/images/globalCenter/headerBG.png');
        background-size: 100% 220%;
    }
    .mainConb {
        height: calc(100% - 0.5rem);
        box-sizing: border-box;
        padding: 0.2rem;
        padding-bottom: 0;
        margin-top: -0.3rem;
        // background-image: url('../../assets/images/globalCenter/buildBg.png');
        // background-size: 100% 100%;
        .equipStateCountCon {
            background-image: url('../../assets/images/globalCenter/equiStateCountB.png');
            background-repeat: no-repeat;
            background-size: 93% auto;
            background-position: 50% 90%;
            .equipStaCon {
                position: absolute;
                top: 26%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .cardItemB {
            height: 33%;
            box-sizing: border-box;
            padding-bottom: 2.5%;
            .cardItemS {
                // background-color: red;
                height: calc(100% - 0.1rem);
                background: linear-gradient(180deg, #19253e98 0%, #223e6198 100%);
                box-shadow: inset 0px 0px 30px 0px rgba(37, 166, 255, 0.5);
                border-radius: 8px 8px 8px 8px;
                .cardTit {
                    height: 0.39rem;
                    line-height: 0.39rem;
                    box-sizing: border-box;
                    padding-left: 0.46rem;
                    font-size: 0.18rem;
                    font-weight: 700;
                    background: linear-gradient(90deg, rgba(0, 95, 201, 0.5) 0%, rgba(0, 95, 201, 0) 100%);
                    border-radius: 8px 8px 0px 0px;
                    margin-bottom: 2px;
                    position: relative;
                    .navIconC {
                        position: absolute;
                        height: 0.3rem;
                        width: 0.3rem;
                        top: 0.04rem;
                        left: 0.08rem;
                        background-image: url('../../assets/images/globalCenterNew/navIcon.png') !important;
                        background-size: 100% 100%;
                    }
                }
                .test-flex {
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    .cardMain {
                        height: calc(100% - 0.39rem);
                    }
                }
                .cardMain {
                    height: calc(100% - 0.39rem);
                    // background-image: url('../../assets/images/globalCenter/cardMain.png') !important;
                    // background-size: 100% 100%;
                    .listPersonC {
                        border: 1px dashed #eeeeee60;
                        margin-top: 0.02rem;
                        box-sizing: border-box;
                        padding: 0.01rem;
                        margin-top: 0.03rem;
                        text-align: center;
                    }

                    .zwstyle {
                        margin-top: 50px;
                    }
                }
                .el-tabs__header {
                    margin-bottom: 5px !important;
                }
                .el-tabs__item {
                    height: 28px !important;
                    line-height: 28px !important;
                    font-size: 0.13rem !important;
                    color: #ccc;
                }
                .el-tabs__active-bar {
                    background-color: none !important;
                    height: 1px !important;
                }
                .is-active {
                    color: #3e92ef;
                }
                .el-tabs__nav-wrap::after {
                    height: 1px !important;
                    background-color: rgba(204, 204, 204, 0.404);
                }
            }
        }
        .bynGroups {
            position: absolute;
            top: 4px;
            right: 0px;
            transform: scale(0.9);
            .el-radio-button__inner {
                background-color: #2f4367;
                border: none;
                padding: 5px 8px;
            }
        }
        .leftConb {
            .el-progress-circle {
                width: 100% !important;
                aspect-ratio: 1/1 !important;
                height: initial !important;
            }
            .el-progress__text {
                // color: #ed4545 !important;
                font-size: 0.13rem !important;
            }
            .el-progress path:first-child {
                stroke: #1e2735 !important;
            }
        }
        .ritConb {
            .sysRemark {
                background-image: url('../../assets/images/globalCenterNew/sysScore.png');
                background-size: auto 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
            .alarmMsgT {
                height: 0.33rem;
                // background-color: #ccc;
                line-height: 0.33rem;
                color: #57ffff;
                padding: 0 0.12rem;
                border-bottom: 2px solid #0ba1f660;
            }
            .alarmMsgC {
                height: 0.3rem;
                border-bottom: 1px solid #ffffff30;
                line-height: 0.3rem;
                padding: 0 0.12rem;
            }
        }
    }
}
.clhangImg {
    position: absolute;
    right: 25px;
    top: 14px;
}

.showSSVideo {
    .el-dialog__header {
        background-color: rgb(54, 75, 106);

        .el-dialog__title {
            color: rgb(255, 255, 255) !important;
        }
    }
    .el-dialog__body {
        background-color: rgb(54, 75, 106);
    }
}

.box {
    width: 37px;
    height: 195px;
    background-color: red;
    position: absolute;
    top: 221px;
    right: 409px;
    opacity: 0;
}

.imghover:hover {
    cursor: pointer;
}
</style>
