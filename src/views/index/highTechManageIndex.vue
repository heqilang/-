<template>
    <div class="globalCenterIndexCon">
        <div class="headerConb"></div>
        <div class="mainConb">
            <el-row class="height100" :gutter="16">
                <el-col class="height100" :span="6">
                    <div class="height100 leftConb">
                        <div class="cardItemB">
                            <div class="cardItemS">
                                <div class="cardTit">告警数据统计</div>
                                <div class="cardMain">
                                    <el-row class="height100">
                                        <el-col class="height100 text_c" :span="12">
                                            <div>
                                                <div style="font-size: 0.12rem"><span style="font-size: 0.2rem; color: #75eade">113</span> 起</div>
                                                <div>
                                                    <img style="height: 0.83rem; margin: 0.06rem 0" src="../../assets/images/globalCenter/evenPic1.png" alt="" />
                                                </div>
                                                <div>真实火灾报警</div>
                                            </div>
                                        </el-col>
                                        <el-col class="height100 text_c" :span="12">
                                            <div>
                                                <div style="font-size: 0.12rem"><span style="font-size: 0.2rem; color: #75eade">1518</span> 起</div>
                                                <div>
                                                    <img style="height: 0.83rem; margin: 0.06rem 0" src="../../assets/images/globalCenter/evenPic.png" alt="" />
                                                </div>
                                                <div>其他报警</div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div class="cardItemB50">
                            <div class="cardItemS">
                                <div class="cardTit">监管数据统计</div>
                                <div class="cardMain">
                                    <div style="height: 35%">
                                        <el-row style="height: 50%">
                                            <el-col class="height100 text_c" :span="8">
                                                <div>
                                                    <div style="font-size: 0.2rem; color: #83eff4">203</div>
                                                    <div style="font-size: 0.12rem">单位总数</div>
                                                </div>
                                            </el-col>
                                            <el-col class="height100 text_c" :span="8">
                                                <div>
                                                    <div style="font-size: 0.2rem; color: #83eff4">203</div>
                                                    <div style="font-size: 0.12rem">运营单位</div>
                                                </div>
                                            </el-col>
                                            <el-col class="height100 text_c" :span="8">
                                                <div>
                                                    <div style="font-size: 0.2rem; color: #83eff4">203</div>
                                                    <div style="font-size: 0.12rem">维保单位</div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row style="height: 50%">
                                            <el-col class="height100 text_c" :span="8">
                                                <div>
                                                    <div style="font-size: 0.2rem; color: #83eff4">203</div>
                                                    <div style="font-size: 0.12rem">技术服务人员</div>
                                                </div>
                                            </el-col>
                                            <el-col class="height100 text_c" :span="8">
                                                <div>
                                                    <div style="font-size: 0.2rem; color: #83eff4">203</div>
                                                    <div style="font-size: 0.12rem">消防控制室</div>
                                                </div>
                                            </el-col>
                                            <el-col class="height100 text_c" :span="8">
                                                <div>
                                                    <div style="font-size: 0.2rem; color: #83eff4">203</div>
                                                    <div style="font-size: 0.12rem">微型消防站</div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div style="height: 65%">
                                        <div style="height: 0.3rem; background-color: #082239; line-height: 0.25rem; padding-left: 0.12rem"><span style="font-size: 0.2rem; color: #3b95ea">■</span> 单位消防管理</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cardItemB">
                            <div class="cardItemS">
                                <div class="cardTit">报警趋势图</div>
                                <div class="cardMain">
                                    <div class="height100" id="incresChart1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="height100" :span="12">
                    <div class="height100 midConb">
                        <div class="midTopC">
                            <div class="cardItemS">
                                <div class="cardTit">监管数据统计</div>
                                <div class="cardMain">
                                    <div id="containeraMap" style="width: 100%; height: 100%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="midMidC">
                            <el-row class="height100" :gutter="16">
                                <el-col class="height100" :span="12">
                                    <div class="cardItemS">
                                        <div class="cardTitm">告警时段分析</div>
                                        <div class="cardMain">
                                            <div style="height: 50%">
                                                <el-row class="height100 text_c" style="padding: 0.12rem" :gutter="12">
                                                    <el-col class="height100" :span="8">
                                                        <el-row class="height100">
                                                            <el-col class="height100 text_c" :span="11">
                                                                <img style="width: 110%" src="../../assets/images/globalCenter/yjzyPic1.png" alt="" />
                                                            </el-col>
                                                            <el-col class="height100 text_c" :span="13">
                                                                <div>
                                                                    <div class="text_l" style="font-size: 0.2rem; color: #54e5e5">13</div>
                                                                    <div class="text_l small">救援队伍</div>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                    <el-col class="height100" :span="8">
                                                        <el-row class="height100">
                                                            <el-col class="height100 text_c" :span="11">
                                                                <img style="width: 110%" src="../../assets/images/globalCenter/yjzyPic2.png" alt="" />
                                                            </el-col>
                                                            <el-col class="height100 text_c" :span="13">
                                                                <div>
                                                                    <div class="text_l" style="font-size: 0.2rem; color: #54e5e5">38</div>
                                                                    <div class="text_l small">救援人员</div>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                    <el-col class="height100" :span="8">
                                                        <el-row class="height100">
                                                            <el-col class="height100 text_c" :span="11">
                                                                <img style="width: 110%" src="../../assets/images/globalCenter/yjzyPic3.png" alt="" />
                                                            </el-col>
                                                            <el-col class="height100 text_c" :span="13">
                                                                <div>
                                                                    <div class="text_l" style="font-size: 0.2rem; color: #54e5e5">7</div>
                                                                    <div class="text_l small">避难场所</div>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                            <div style="height: 50%">
                                                <el-row class="height100 text_c" style="padding: 0.12rem" :gutter="12">
                                                    <el-col class="height100" :span="8">
                                                        <el-row class="height100">
                                                            <el-col class="height100 text_c" :span="11">
                                                                <img style="width: 110%" src="../../assets/images/globalCenter/yjzyPic4.png" alt="" />
                                                            </el-col>
                                                            <el-col class="height100 text_c" :span="13">
                                                                <div>
                                                                    <div class="text_l" style="font-size: 0.2rem; color: #54e5e5">293</div>
                                                                    <div class="text_l small">应急物资</div>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                    <el-col class="height100" :span="8">
                                                        <el-row class="height100">
                                                            <el-col class="height100 text_c" :span="11">
                                                                <img style="width: 110%" src="../../assets/images/globalCenter/yjzyPic5.png" alt="" />
                                                            </el-col>
                                                            <el-col class="height100 text_c" :span="13">
                                                                <div>
                                                                    <div class="text_l" style="font-size: 0.2rem; color: #54e5e5">6</div>
                                                                    <div class="text_l small">消防车</div>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                    <el-col class="height100" :span="8">
                                                        <el-row class="height100">
                                                            <el-col class="height100 text_c" :span="11">
                                                                <img style="width: 110%" src="../../assets/images/globalCenter/yjzyPic6.png" alt="" />
                                                            </el-col>
                                                            <el-col class="height100 text_c" :span="13">
                                                                <div>
                                                                    <div class="text_l" style="font-size: 0.2rem; color: #54e5e5">33</div>
                                                                    <div class="text_l small">微型消防站</div>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col class="height100" :span="12">
                                    <div class="cardItemS">
                                        <div class="cardTitm">系统评分</div>
                                        <div class="cardMain">
                                            <div class="height100 sysRemark">
                                                <el-row class="height100 text_c">
                                                    <el-col class="" :span="6">
                                                        <div class="" style="text-align: center">
                                                            <div style="font-size: 0.38rem; color: #3bfafc">96</div>
                                                            <div>系统评分</div>
                                                        </div>
                                                    </el-col>
                                                    <el-col class="" :span="18">
                                                        <div class="text_r" style="padding: 0.12rem">
                                                            <el-row>
                                                                <el-col :span="10"><span>&nbsp;</span></el-col>
                                                                <el-col style="text-align: center; margin-bottom: 0.36rem" :span="7">
                                                                    <div style="color: #3bfafc; font-size: 0.22rem">99%</div>
                                                                    <div class="small">设备完好率</div>
                                                                </el-col>
                                                                <el-col style="text-align: center; margin-bottom: 0.36rem" :span="7">
                                                                    <div style="color: #3bfafc; font-size: 0.22rem">97%</div>
                                                                    <div class="small">报警处置率</div>
                                                                </el-col>
                                                                <el-col :span="10"><span>&nbsp;</span></el-col>
                                                                <el-col style="text-align: center" :span="7">
                                                                    <div style="color: #3bfafc; font-size: 0.22rem">93%</div>
                                                                    <div class="small">巡检完成率</div>
                                                                </el-col>
                                                                <el-col style="text-align: center" :span="7">
                                                                    <div style="color: #3bfafc; font-size: 0.22rem">94%</div>
                                                                    <div class="small">隐患处理率</div>
                                                                </el-col>
                                                            </el-row>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
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
                                <div class="cardTit">设备在线率</div>
                                <div class="cardMain">
                                    <div class="height100" id="incresChart"></div>
                                </div>
                            </div>
                        </div>
                        <div class="cardItemB">
                            <div class="cardItemS">
                                <div class="cardTit">隐患复查统计</div>
                                <div class="cardMain">
                                    <div class="height100" id="alarmLineChart"></div>
                                </div>
                            </div>
                        </div>
                        <div class="cardItemB">
                            <div class="cardItemS">
                                <div class="cardTit">监管类型统计</div>
                                <div class="cardMain" id="checkTypeChart">
                                    <el-row>
                                        <el-col></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div class="cardItemB">
                            <div class="cardItemS msgNoticeBox">
                                <div class="cardTit">消息通知</div>
                                <div class="cardMain" style="overflow: hidden">
                                    <el-tabs class="tabBox" v-model="alarmMsg">
                                        <el-tab-pane label="告警消息(23)" name="first"></el-tab-pane>
                                        <el-tab-pane label="隐患消息(8)" name="second"></el-tab-pane>
                                        <el-tab-pane label="巡检消息(12)" name="third"></el-tab-pane>
                                    </el-tabs>
                                    <div v-if="alarmMsg == 'first'" style="font-size: 0.12rem !important">
                                        <el-row style="height: 0.35rem; line-height: 0.35rem; background-color: #09304b; color: #51cdd0; padding: 0 0.08rem">
                                            <el-col :span="8">告警时间</el-col>
                                            <el-col :span="8" class="text_c">告警位置</el-col>
                                            <el-col :span="8" class="text_r">设备类型</el-col>
                                            <!-- <el-col :span="2">操作</el-col> -->
                                        </el-row>
                                        <el-scrollbar style="width: 100%; height: 2rem">
                                            <el-row style="border-bottom: 1px solid #cccccc30; height: 0.35rem; line-height: 0.35rem; padding: 0 0.08rem" v-for="item in msgTypeList1" :key="item">
                                                <el-col :span="8">{{ item.time }}</el-col>
                                                <el-col :span="8" class="text_c">{{ item.posi }}</el-col>
                                                <el-col :span="8" class="text_r">{{ item.equipType }}</el-col>
                                                <!-- <el-col :span="2" @click.native="showAlarmMsgInfoFn(item)" style="color: #3e92ef; cursor: pointer">查看</el-col> -->
                                            </el-row>
                                        </el-scrollbar>
                                    </div>
                                    <div v-if="alarmMsg == 'second'" style="font-size: 0.12rem !important">
                                        <el-row style="height: 0.35rem; line-height: 0.35rem; padding: 0 0.08rem; background-color: #09304b; color: #51cdd0">
                                            <el-col :span="8">指派时间</el-col>
                                            <el-col :span="8" class="text_c">巡检类型</el-col>
                                            <el-col :span="8" class="text_r">巡检类型</el-col>
                                            <!-- <el-col :span="2">操作</el-col> -->
                                        </el-row>
                                        <el-scrollbar style="width: 100%; height: 2rem">
                                            <el-row style="border-bottom: 1px solid #cccccc30; height: 0.35rem; line-height: 0.35rem; padding: 0 0.08rem" v-for="item in msgTypeList2" :key="item">
                                                <el-col :span="8">{{ item.time }}</el-col>
                                                <el-col :span="8" class="text_c">{{ item.posi }}</el-col>
                                                <el-col :span="8" class="text_r">{{ item.equipType }}</el-col>
                                                <!-- <el-col :span="2" @click.native="showAlarmMsgInfoFn(item)" style="color: #3e92ef; cursor: pointer">查看</el-col> -->
                                            </el-row>
                                        </el-scrollbar>
                                    </div>
                                    <div v-if="alarmMsg == 'third'" style="font-size: 0.12rem !important">
                                        <el-row style="height: 0.35rem; line-height: 0.35rem; padding: 0 0.08rem; background-color: #09304b; color: #51cdd0">
                                            <el-col :span="8">告警时间</el-col>
                                            <el-col :span="8" class="text_c">告警位置</el-col>
                                            <el-col :span="8" class="text_r">设备类型</el-col>
                                            <!-- <el-col :span="2">操作</el-col> -->
                                        </el-row>
                                        <el-scrollbar style="width: 100%; height: 2rem">
                                            <el-row style="border-bottom: 1px solid #cccccc30; height: 0.35rem; line-height: 0.35rem; padding: 0 0.08rem" v-for="item in msgTypeList3" :key="item">
                                                <el-col :span="8">{{ item.time }}</el-col>
                                                <el-col :span="8" class="text_c">{{ item.posi }}</el-col>
                                                <el-col :span="8" class="text_r">{{ item.equipType }}</el-col>
                                                <!-- <el-col :span="2" @click.native="showAlarmMsgInfoFn(item)" style="color: #3e92ef; cursor: pointer">查看</el-col> -->
                                            </el-row>
                                        </el-scrollbar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
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
            showAlarmMsgInfo: false,
            msgTypeList1: [
                {
                    time: '2022-08.07 17:33:28',
                    posi: '环球中心一楼',
                    equipType: '独立感烟'
                },
                {
                    time: '2022-08.07 16:31:28',
                    posi: '环球中心负一楼',
                    equipType: '火灾报警'
                },
                {
                    time: '2022-08.07 16:26:21',
                    posi: '环球中心三楼',
                    equipType: '独立感烟'
                },
                {
                    time: '2022-08.07 16:13:33',
                    posi: '环球中心二楼',
                    equipType: '火灾报警'
                },
                {
                    time: '2022-08.07 12:23:06',
                    posi: '环球中心负一楼楼',
                    equipType: '消防给水'
                },
                {
                    time: '2022-08.07 12:13:18',
                    posi: '环球中心一楼',
                    equipType: '独立感烟'
                },
                {
                    time: '2022-08.07 11:33:18',
                    posi: '环球中心二楼',
                    equipType: '消防给水'
                },
                {
                    time: '2022-08.07 10:53:13',
                    posi: '环球中心一楼',
                    equipType: '消防给水'
                }
            ],
            msgTypeList2: [
                {
                    time: '2022-08.07 17:55:21',
                    posi: '环球中心二楼',
                    equipType: '人员操作隐患'
                },
                {
                    time: '2022-08.07 15:39:28',
                    posi: '环球中心负一楼',
                    equipType: '施工工艺隐患'
                },
                {
                    time: '2022-08.07 16:26:21',
                    posi: '环球中心三楼',
                    equipType: '消防设备隐患'
                },
                {
                    time: '2022-08.07 16:41:38',
                    posi: '环球中心二楼',
                    equipType: '人员操作隐患'
                },
                {
                    time: '2022-08.07 12:33:16',
                    posi: '环球中心负二楼楼',
                    equipType: '用电安全隐患'
                },
                {
                    time: '2022-08.07 12:23:18',
                    posi: '环球中心一楼',
                    equipType: '消防设备隐患'
                },
                {
                    time: '2022-08.07 11:55:18',
                    posi: '环球中心三楼',
                    equipType: '人员操作隐患'
                },
                {
                    time: '2022-08.07 11:52:13',
                    posi: '环球中心一楼',
                    equipType: '用电安全隐患'
                }
            ],
            msgTypeList3: [
                {
                    time: '2022-08.07 17:33:28',
                    posi: '环球中心负一楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 16:39:28',
                    posi: '环球中心负一楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 16:26:21',
                    posi: '环球中心二楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 16:13:23',
                    posi: '环球中心一楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 12:29:01',
                    posi: '环球中心负一楼楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 11:23:18',
                    posi: '环球中心一楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 10:23:18',
                    posi: '环球中心二楼',
                    equipType: '日检'
                },
                {
                    time: '2022-08.07 08:53:13',
                    posi: '环球中心一楼',
                    equipType: '日检'
                }
            ]
        };
    },
    methods: {
        showAlarmMsgInfoFn() {
            this.showAlarmMsgInfo = true;
        },
        drawAlarmLineChart() {
            this.chartOne = echarts.init(document.getElementById('alarmLineChart'));
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
                        data: ['8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8']
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
                        symbol: 'none',
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
                        data: [70, 38, 36, 69, 79, 33, 66]
                    },
                    {
                        name: '处理隐患',
                        type: 'bar',
                        barWidth: 8,
                        data: [22, 33, 14, 63, 24, 31, 62],
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
                    data: ['设备在线率'],
                    left: 'center',
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
                        data: ['8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8']
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
                        name: '设备在线率',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#3470b5'
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#3470b530'
                                    },
                                    {
                                        offset: 1,
                                        color: '#3470b510'
                                    }
                                ])
                            }
                        },
                        data: [2, 3, 4, 3, 4, 1, 2]
                    }
                ]
            };
            this.chartTwo.setOption(option);
        },
        drawIncresChart1() {
            this.chartTwo = echarts.init(document.getElementById('incresChart1'));
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
                    data: ['报警趋势'],
                    left: 'center',
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
                        data: ['8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8']
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
                        name: '报警趋势',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#26bcb8'
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#26bcb830'
                                    },
                                    {
                                        offset: 1,
                                        color: '#26bcb810'
                                    }
                                ])
                            }
                        },
                        data: [2, 3, 4, 3, 4, 1, 2]
                    }
                ]
            };
            this.chartTwo.setOption(option);
        },
        drawCheckTypeChart() {
            var chartDom = document.getElementById('checkTypeChart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    orient: 'vertical',
                    top: '10%',
                    right: '10%',
                    data: ['重点单位', '一般单位', '九小场所', '居民住宅'],
                    formatter(v) {
                        if (v == '重点单位') {
                            return '查岗798次';
                        } else if (v == '一般单位') {
                            return '在岗率：78%';
                        } else if (v == '九小场所') {
                            return '脱岗率：22%';
                        } else {
                            return '脱岗率：22%';
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
                color: ['#3555df', '#fbefbc', '#3fd395', '#bfe5fa'],
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: '重点单位' },
                            { value: 735, name: '一般单位' },
                            { value: 580, name: '九小场所' },
                            { value: 580, name: '居民住宅' }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
        },
        initMap() {
            var map = new AMap.Map('containeraMap', {
                zoom: 16,
                showLabel: true,
                viewMode: '3D',
                center: [104.069418, 30.575021],
                mapStyle: 'amap://styles/darkblue',
                zoomEnable: false,
                dragEnable: false
            });
            let disCountry = new AMap.DistrictLayer.Country({
                zIndex: 10,
                SOC: 'CHN',
                depth: 1,
                styles: {
                    fill: ['#0b0b0d'],
                    'stroke-width': 2,
                    'coastline-stroke': [0.85, 0.63, 0.94, 0],
                    'province-stroke': '#7186cd',
                    'nation-stroke': '#b66b68'
                }
            });
            disCountry.setMap(map);

            var loca = new Loca.Container({
                map
            });
            var pl = (window.pl = new Loca.PointLayer({
                zIndex: 10,
                opacity: 1,
                blend: 'normal'
            }));
            var geo = new Loca.GeoJSONSource({
                url: 'static/data.json'
            });
            pl.setSource(geo);
            var colors = ['#da6741', '#da6741', '#da6741', '#da6741', '#da6741', '#da6741', '#da6741', '#da6741'];

            var style = {
                unit: 'meter',
                radius: (index, f) => {
                    var n = f.properties['人口'];
                    return n * 60;
                },
                color: (index, f) => {
                    var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
                    return colors[n];
                },
                borderWidth: 0,
                blurRadius: -1
            };

            pl.setStyle(style);
            loca.add(pl);

            var dat = new Loca.Dat();
            dat.addLayer(pl, 'GDP');

            // 动画
            map.on('complete', function () {
                pl.addAnimate({
                    key: 'radius',
                    value: [0, 1],
                    duration: 2000,
                    easing: 'Linear',
                    yoyo: true,
                    repeat: 99999
                });
                pl.show(1000);
            });

            map.on('mousemove', (e) => {
                const feat = pl.queryFeature(e.pixel.toArray());

                if (feat) {
                    // pl.setStyle({
                    //     unit: 'meter',
                    //     radius: (index, f) => {
                    //         var n = f.properties['人口'] * 100;
                    //         if (f === feat) {
                    //             return n + 30000;
                    //         }
                    //         return n;
                    //     },
                    //     color: (index, f) => {
                    //         var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
                    //         return colors[n];
                    //     },
                    //     borderWidth: (index, f) => {
                    //         return 0;
                    //     },
                    //     blurWidth: -1
                    // });
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
        _self.$nextTick(() => {
            _self.drawAlarmLineChart();
            _self.drawIncresChart();
            _self.drawIncresChart1();
            _self.drawCheckTypeChart();
        });
        _self.initMap();
    }
};
</script>
<style lang="scss">
.dg,
.ac,
.amap-logo,
.amap-copyright {
    display: none !important;
}
.globalCenterIndexCon {
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #fff;
    font-size: 0.14rem;
    background-image: url('../../assets/images/globalCenter/maxBg.png');
    background-size: 100% 100%;
    min-height: 900px;
    position: relative;
    .msgNoticeBox {
        position: relative;
        .tabBox {
            position: absolute;
            right: 0.08rem;
            top: 0.05rem;
            z-index: 99;
        }
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
    }
    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
    div {
        box-sizing: border-box;
    }
    .headerConb {
        height: 0.8rem;
        background-image: url('../../assets/images/globalCenter/headerBG.png');
        background-size: 100% 100%;
    }
    .mainConb {
        height: calc(100% - 0.8rem);
        box-sizing: border-box;
        padding: 0.2rem;
        padding-bottom: 0;
        .cardItemB50 {
            height: 50%;
            box-sizing: border-box;
            padding-bottom: 2.5%;
            .cardItemS {
                // background-color: red;
                height: calc(100% - 0.1rem);
                .cardTit {
                    height: 0.33rem;
                    line-height: 0.33rem;
                    box-sizing: border-box;
                    padding-left: 0.36rem;
                    background-image: url('../../assets/images/globalCenter/cardTit.png');
                    background-size: 100% 100%;
                }
                .cardMain {
                    height: calc(100% - 0.33rem);
                    background-image: url('../../assets/images/globalCenter/cardMain.png') !important;
                    background-size: 100% 100%;
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
        .cardItemB {
            height: 25%;
            box-sizing: border-box;
            padding-bottom: 2.5%;
            .cardItemS {
                // background-color: red;
                height: calc(100% - 0.1rem);
                .cardTit {
                    height: 0.33rem;
                    line-height: 0.33rem;
                    box-sizing: border-box;
                    padding-left: 0.36rem;
                    background-image: url('../../assets/images/globalCenter/cardTit.png');
                    background-size: 100% 100%;
                }
                .cardMain {
                    height: calc(100% - 0.33rem);
                    background-image: url('../../assets/images/globalCenter/cardMain.png') !important;
                    background-size: 100% 100%;
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
        .midConb {
            .midTopC {
                height: 75%;
                box-sizing: border-box;
                padding-bottom: 1.25%;
                .buildInfo {
                    background-image: url('../../assets/images/globalCenter/buildBg.png');
                    background-size: 100% 100%;
                    padding: 0.22rem;
                    .leftItem {
                        color: #6cffff;
                    }
                    .sliderMenu {
                        background-image: url('../../assets/images/globalCenter/sliderBg.png');
                        background-size: 100% 100%;
                        width: 66%;
                        margin-left: 33%;
                        text-align: center;
                        padding: 0.32rem 0;
                        li {
                            height: 0.32rem;
                            line-height: 0.32rem;
                            cursor: pointer;
                        }
                        .activeFloor {
                            background-image: url('../../assets/images/globalCenter/floorActive.png');
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .midMidC {
                height: 25%;
                box-sizing: border-box;
                padding-bottom: 1.25%;
            }
            .midBotC {
                height: 25%;
                box-sizing: border-box;
                padding-bottom: 1.25%;
                .equipmentAllCount {
                    padding: 0.12rem;
                    .equipItemC {
                        background-image: url('../../assets/images/globalCenter/equipbG.png');
                        background-size: 100% 100%;
                    }
                }
            }
            .cardItemS {
                // background-color: red;
                height: calc(100% - 0.1rem);
                .cardTit {
                    height: 0.33rem;
                    line-height: 0.33rem;
                    box-sizing: border-box;
                    padding-left: 0.36rem;
                    background-image: url('../../assets/images/globalCenter/midCardTit.png');
                    background-size: 100% 100%;
                }
                .cardTitm {
                    height: 0.33rem;
                    line-height: 0.33rem;
                    box-sizing: border-box;
                    padding-left: 0.36rem;
                    background-image: url('../../assets/images/globalCenter/cardTit.png');
                    background-size: 100% 100%;
                }
                .cardMain {
                    height: calc(100% - 0.33rem);
                    background-image: url('../../assets/images/globalCenter/midCardMain.png');
                    background-size: 100% 100%;
                }
            }
        }
        .sysRemark {
            background-image: url('../../assets/images/globalCenter/sysRemark.png');
            background-size: 100% auto;
            background-repeat: no-repeat;
            background-position: center;
        }
        .ritConb {
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
</style>
