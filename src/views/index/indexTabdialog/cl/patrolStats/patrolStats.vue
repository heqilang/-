<!--
巡查情况-巡查次数统计
-->

<template>
    <div>
        <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">
            {{ title }}

            <div style="height: 20px; display: flex; justify-content: space-between" class="clhangImg">
                <i class="el-icon-circle-close" @click="$emit('closeRiskStats')" style="font-size: 26px; color: #5e9ffb; cursor: pointer"> </i>
            </div>
        </div>

        <div style="position: relative">
            <div class="xf-stats-wrapper">
                <div class="patrol-stats-wrapper" v-if="currentLayerLevel === 1">
                    <div class="patrol-stats-indicators">
                        <XfIndicator title="巡查次数" :num="statsData.allFinishPatrol" unit="次" v-on:onclick="intoLayer2('')" />
                        <XfIndicator title="正常巡查次数" :num="statsData.opportunelyFinish" unit="次" v-on:onclick="intoLayer2('NORMAL')" />
                        <XfIndicator title="逾期未巡查次数" :num="statsData.notOpportunelyFinish" unit="次" v-on:onclick="intoLayer2('TIMEOUT')" />
                    </div>
                    <div class="risk-stats-charts-wrapper" v-if="!showAmep">
                        <div class="patrol-stats-charts-content">
                            <div class="patrol-stats-chart" id="patrol-stats-chart1"></div>
                            <div v-if="dataRange == '当日'" style="height: 200px" id="quxianChart"></div>
                            <div v-else style="height: 200px" id="dangyeCharts"></div>
                        </div>
                    </div>

                    <div v-else style="height: 440px; position: relative">
                        <div class="centerText">暂无数据</div>
                    </div>
                </div>
                <div class="stats-layer-container" v-if="currentLayerLevel === 2">
                    <a class="return-upper-level-btn" v-on:click="intoLayer1()"><<</a>
                    <patrolList v-if="currentLayerLevel === 2" :dataRange="dataRange" :patrolStatus="activePatrolStatus" v-on:viewDetailOnclick="intoLayer3" />
                </div>
                <div class="stats-layer-container" v-if="currentLayerLevel === 3">
                    <a class="return-upper-level-btn" v-on:click="intoLayer2(activePatrolStatus)"><<</a>
                    <patrolPointDetail v-if="currentLayerLevel === 3" :patrolPointId="activePartolPointId" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import XfIndicator from '../common/XfIndicator';
import * as echarts from 'echarts';
import patrolList from './patrolList';
import patrolPointDetail from './patrolPointDetail';

const mockChartBarData = [
    { timeslot: '01', normalTotal: 7, overtimeTotal: 5 }, //时间段 超时次数, 正常次数
    { timeslot: '02', normalTotal: 17, overtimeTotal: 15 },
    { timeslot: '03', normalTotal: 7, overtimeTotal: 5 },
    { timeslot: '04', normalTotal: 12, overtimeTotal: 2 },
    { timeslot: '05', normalTotal: 11, overtimeTotal: 1 },
    { timeslot: '06', normalTotal: 2, overtimeTotal: 2 },
    { timeslot: '07', normalTotal: 4, overtimeTotal: 1 },
    { timeslot: '08', normalTotal: 12, overtimeTotal: 11 },
    { timeslot: '09', normalTotal: 6, overtimeTotal: 3 }
];

export default {
    components: {
        XfIndicator,
        patrolList,
        patrolPointDetail
    },
    props: {
        dataRange: {
            //数据范围 (当月 | 当日)
            required: true
        }
    },
    data: () => ({
        showAmep: false,
        statsData: {
            notOpportunelyFinish: 0,
            opportunelyFinish: 0,
            allFinishPatrol: 0
        },

        title: '',
        currentLayerLevel: 1,
        activePatrolStatus: '', //当前激活的 巡查状态(正常 或 超时)
        activePartolPointId: undefined, //当前激活的 巡查点位id

        DAYdrawLeftLineList: { everyHour: [], number: [] },
        MONTHdrawLeftLineList: { everyDay: [], number: [] }
    }),
    created() {
        console.dir(this.statsData);
    },
    mounted() {
        this.loadStatsData();
        this.getcountAlarms();
    },

    watch: {
        statsData: {
            handler: function (newVal, oldVal) {
                //todo 陈磊20220902 新增的图表 , 目前的数据是mockChartBarData  后续需要对接接口
                this.drawBarChart('patrol-stats-chart1', [
                    { name: '正常巡查次数', value: newVal.opportunelyFinish },
                    { name: '逾期未巡查次数', value: newVal.notOpportunelyFinish }
                ]);
                if (this.dataRange == '当日') {
                    this.drawLeftLine();
                } else {
                    this.drawdangyeCharts();
                }
            }
        },
        currentLayerLevel: {
            immediate: true,
            handler: function (newVal, oldVal) {
                if (newVal === 1) {
                    this.title = `${this.dataRange}巡查`;
                } else if (newVal === 2) {
                    this.title = `${this.dataRange}巡查列表`;
                } else if (newVal === 3) {
                    this.title = `点位详情`;
                }
                setTimeout(() => {
                    if (newVal !== oldVal && newVal === 1) {
                        this.drawBarChart('patrol-stats-chart1', [
                            { name: '正常巡查次数', value: this.statsData.opportunelyFinish },
                            { name: '逾期未巡查次数', value: this.statsData.notOpportunelyFinish }
                        ]);
                        if (this.dataRange == '当日') {
                            this.drawLeftLine();
                        } else {
                            this.drawdangyeCharts();
                        }
                    }
                }, 50);
            }
        }
    },

    methods: {
        intoLayer1() {
            this.currentLayerLevel = 1;
        },
        intoLayer2(patrolStatus) {
            this.activePatrolStatus = patrolStatus;
            this.currentLayerLevel = 2;
        },
        intoLayer3(partolItem) {
            this.activePartolPointId = partolItem;
            this.currentLayerLevel = 3;
        },
        loadStatsData() {
            const that = this;
            that._http({
                url: '/api/web/indexCountV3/thirdPatrolSecond', ///api/web/indexCountTwo/thirdPatrolSecond
                type: 'get',
                isBody: true,
                data: {
                    type: that.dataRange === '当日' ? 1 : 2
                },
                success: function (res) {
                    that.statsData = res.data;
                    this.showAmep = this.statsData.notOpportunelyFinish + this.statsData.opportunelyFinish + this.statsData.allFinishPatrol;
                }
            });
        },
        drawBarChart(elementId, data) {
            const chartDom = document.getElementById(elementId);
            const myChart = echarts.init(chartDom);
            const that = this;
            const option = {
                color: ['#6BD0CA', '#25A6FF', '#3DBE71', '#ACBE3D', '#FFA825', '#BE4C3D', '#9C3DBE', '#BE3D3D', '#909C9C'],
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                series: [
                    {
                        name: '巡查类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '50%'],
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);

            myChart.on('click', (d) => {
                let name = 'NORMAL';
                if (d.name == '逾期未巡检次数') {
                    name = 'TIMEOUT';
                }
                that.intoLayer2(name);
            });
        },
        //告警次数
        getcountAlarms() {
            let _self = this;

            if (_self.dataRange == '当日') {
                _self.DAYdrawLeftLineList.everyHour = [];
                _self.DAYdrawLeftLineList.number = [];

                _self._http({
                    url: '/api/web/indexCountTwo/countPatrolMinute', ///api/web/indexCountTwo/countAlarms
                    type: 'get',
                    isBody: true,
                    data: {
                        option: 'DAY',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];
                        res.data.forEach((item) => {
                            _self.DAYdrawLeftLineList.everyHour.push(item.everyHour.substring(11, 13));
                            _self.DAYdrawLeftLineList.number.push(item.number);
                        });
                        _self.drawLeftLine();
                    }
                });
            } else {
                _self.MONTHdrawLeftLineList.everyDay = [];
                _self.MONTHdrawLeftLineList.number = [];
                _self._http({
                    url: '/api/web/indexCountTwo/countPatrolMinute',
                    type: 'get',
                    isBody: true,
                    data: {
                        option: 'MONTH',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];
                        res.data.forEach((item) => {
                            _self.MONTHdrawLeftLineList.everyDay.push(item.everyDay.substring(5, 11));
                            _self.MONTHdrawLeftLineList.number.push(item.number);
                        });
                        _self.drawdangyeCharts();
                    }
                });
            }
        },
        // 当日时段报警处置
        drawLeftLine() {
            let quxianChart = echarts.init(document.getElementById('quxianChart'));
            quxianChart.off('click');
            let option = null;
            let _self = this;

            let text1 = _self.overLevel == true ? '当日平均处理时效' : '当日平均处理时效';
            let text2 = _self.overLevel == true ? '平均处理时效' : '平均处理时效';

            option = {
                title: {
                    text: text1,
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'bolder',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '时段：{b0}<br />' + text2 + '：{c0} 次'
                },
                legend: {
                    data: [text2],
                    right: '5%',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                color: ['#25A6FF', '#E7745B'],
                xAxis: {
                    type: 'category',
                    data: _self.DAYdrawLeftLineList.everyHour, //['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#596677'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#C9CED5'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#596677',
                            type: 'dotted'
                        }
                    }
                },
                yAxis: {
                    // name:'次',
                    // nameTextStyle: {
                    //     color: '#ffffff'
                    // },
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#596677'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#C9CED5'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#596677',
                            type: 'dotted'
                        }
                    }
                },
                series: [
                    {
                        name: text2,
                        data: _self.DAYdrawLeftLineList.number, //[2, 6, 3, 0, 0, 2, 1, 0, 0, 3, 0, 7]
                        // barMaxWidth: 10,
                        smooth: true,
                        type: 'line',
                        smoothMonotone: 'x',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#2e486e'
                                    },
                                    {
                                        offset: 1,
                                        color: '#2e486e'
                                    }
                                ])
                            }
                        }
                    }
                ]
            };

            if (option && typeof option === 'object') {
                quxianChart.setOption(option);
            }
        },
        //当月时段报警处置
        drawdangyeCharts() {
            let drawLine2 = echarts.init(document.getElementById('dangyeCharts'));
            drawLine2.off('click');
            let option = null;
            let _self = this;

            let text1 = _self.overLevel == true ? '当月平均处理时效' : '当月平均处理时效';
            let text2 = _self.overLevel == true ? '平均处理时效' : '平均处理时效';

            option = {
                title: {
                    text: text1,
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'bolder',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '时段：{b0}<br />' + text2 + '：{c0} 次'
                },
                legend: {
                    data: [text2],
                    right: '5%',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '5%',
                    containLabel: true
                },
                color: ['#25A6FF', '#E7745B'],
                xAxis: {
                    type: 'category',
                    data: _self.MONTHdrawLeftLineList.everyDay, //['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#596677'
                        }
                    },
                    axisLabel: {
                        show: true,
                        rotate: 60,
                        textStyle: {
                            color: '#C9CED5'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#596677',
                            type: 'dotted'
                        }
                    }
                },
                yAxis: {
                    // name:'次',
                    // nameTextStyle: {
                    //     color: '#ffffff'
                    // },
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#596677'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#C9CED5'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#596677',
                            type: 'dotted'
                        }
                    }
                },
                series: [
                    {
                        name: text2,
                        smooth: true,
                        data: _self.MONTHdrawLeftLineList.number, // [2, 6, 3, 0, 0, 2, 1, 0, 0, 3, 0, 7]
                        type: 'line',
                        smoothMonotone: 'x',
                        // barMaxWidth: 10,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#2e486e'
                                    },
                                    {
                                        offset: 1,
                                        color: '#2e486e'
                                    }
                                ])
                            }
                        }
                    }
                ]
            };

            if (option && typeof option === 'object') {
                drawLine2.setOption(option);
            }
        }
    }
};
</script>

<style lang="scss">
@import './patrolStats.scss';
.clhangImg {
    position: absolute;
    right: 27px;
    top: 8px;
}
.centerText {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: normal;
    font-size: 20px;
}
</style>
