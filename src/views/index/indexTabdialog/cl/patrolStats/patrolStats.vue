<!--
巡查情况-巡查次数统计
-->

<template>
    <div>
        <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">
            {{ nameTime ? nameTime : title }}

            <div style="height: 20px; display: flex; justify-content: space-between" class="clhangImg">
                <i class="el-icon-circle-close" @click="$emit('closeRiskStats')" style="font-size: 26px; color: #5e9ffb; cursor: pointer"> </i>
            </div>
        </div>

        <div style="position: relative">
            <div class="xf-stats-wrapper">
                <div class="patrol-stats-wrapper" v-if="currentLayerLevel === 1">
                    <div class="patrol-stats-indicators" v-if="!nameTime">
                        <XfIndicator title="巡查次数" :num="statsData.allFinishPatrol" unit="次" v-on:onclick="intoLayer2('')" />
                        <XfIndicator title="正常巡查次数" :num="statsData.opportunelyFinish" unit="次" v-on:onclick="intoLayer2('NORMAL')" />
                        <XfIndicator title="逾期未巡查次数" :num="statsData.notOpportunelyFinish" unit="次" v-on:onclick="intoLayer2('TIMEOUT')" />
                    </div>
                    <div class="risk-stats-charts-wrapper" v-if="!showAmep">
                        <div class="patrol-stats-charts-content">
                            <div class="patrol-stats-charts-content_box">
                                <div style="width: 208px" v-if="dataRange == '当日'">
                                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                        <el-tab-pane v-if="!nameTime" :label="dataRange + '平均处置时效'" name="first"></el-tab-pane>
                                        <el-tab-pane label="点位列表" name="second"></el-tab-pane>
                                    </el-tabs>
                                </div>
                                <div v-if="datatype">
                                    <el-button type="text" @click="getNewPage" size="mini">查看当月点位</el-button>
                                </div>
                            </div>

                            <div v-show="activeName == 'first'" class="patrol-stats-chart" id="patrol-stats-chart1"></div>
                            <!-- 
                            <div style="width: 208px">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="dataRange + '平均处置时效'" name="first"></el-tab-pane>
                                    <el-tab-pane label="点位列表" name="second"></el-tab-pane>
                                </el-tabs>
                            </div -->

                            <div v-show="activeName == 'first'">
                                <div v-if="dataRange == '当日'" style="height: 200px" id="quxianChart"></div>
                                <div v-else style="height: 200px" id="dangyeCharts"></div>
                            </div>

                            <div v-show="activeName !== 'first'" class="patroLabel" style="height: 600px">
                                <ul>
                                    <li class="box_li" v-for="(item, index) in list" :key="index">
                                        <div class="box_li_title_left">{{ item.pointName }}</div>
                                        <div class="box_li_title_right">
                                            <div style="height: 100%; width: 357px">
                                                <div style="height: 50%; width: 357px; padding: 5px 5px">
                                                    <span>详细地址：{{ item.pointName }} </span>
                                                </div>
                                                <div style="height: 50%; width: 357px; padding: 5px 5px">
                                                    <span>巡查区域：环球中心购物中心</span>
                                                </div>
                                            </div>

                                            <div class="box_patroLbaelww">
                                                <component :chlidList="item.datas" :is="require('./patroLable.vue')" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div v-else style="height: 440px; position: relative">
                        <div class="centerText">暂无数据</div>
                    </div>
                </div>
                <div class="stats-layer-container" v-if="currentLayerLevel === 2">
                    <a class="return-upper-level-btn" v-on:click="intoLayer1()"> << </a>
                    <patrolList v-if="currentLayerLevel === 2" :dataRange="dataRange" :patrolStatus="activePatrolStatus" v-on:viewDetailOnclick="intoLayer3" />
                </div>
                <div class="stats-layer-container" v-if="currentLayerLevel === 3">
                    <a class="return-upper-level-btn" v-on:click="intoLayer2(activePatrolStatus)"> << </a>
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
        },
        datatype: {
            required: false
        },
        nameTime: {
            required: false
        }
    },
    data: () => ({
        list: [],
        activeName: 'first',
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

        DAYdrawLeftLineList: { everyHour: [], number: [], every: '' },
        MONTHdrawLeftLineList: { everyDay: [], number: [], every: '' }
    }),
    created() {
        this.activeName = this.datatype ? 'second' : 'first';
        this.getPostion(this.nameTime);
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
        getNewPage() {
            //传给父组件的
            console.dir('222222222222');
            this.$emit('getNewPage');
        },

        getPostion(val) {
            let time = null;
            let _self = this;
            if (val) {
                time = val;
            } else {
                time = _self.getDate();
            }

            // 清空id的innerHTML
            // document.getElementById('lineChart3').innerHTML = '';
            _self._http({
                //  url: '/api/web/indexCountV3/countPatrolMinute',//迪威数据
                url: '/api/web/indexCountV3/listPointCheckStatus',
                data: { timeName: time },
                //  url: '/api/web/indexCountTwo/countPatrolMinute',/api/web/indexCountTwo/countAlarmByFloor
                type: 'get',

                success: function (res) {
                    _self.list = res.data;
                    console.dir(res);
                }
            });
        },

        getDate() {
            var myDate = new Date();
            var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var myToday = myDate.getDate(); //获取当前日(1-31)
            var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            var myHour = myDate.getHours(); //获取当前小时数(0-23)
            var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
            var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
            let MONTH = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
            let DATE = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
            var nowDate = myDate.getFullYear() + '-' + MONTH + '-' + DATE;
            return nowDate;
        },

        handleClick() {},

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
                        label: {
                            normal: {
                                show: true,
                                formatter: '  {ng|{b}    }',
                                //标识内容；若要设置标识内容的样式，则需要像这样设置一个变量per或者ng，在rich配置项里去设置这2个变量的样式，则会改变对应标识内容的样式
                                rich: {
                                    //设置标识内容样式
                                    per: {
                                        color: 'rgba(133, 138, 155, 1)', //设置变量per的颜色，即设置{d}%的颜色
                                        padding: [2, 4],
                                        borderRadius: 2
                                    },
                                    ng: {
                                        fontSize: 12,
                                        color: '#fff',
                                        fontWeight: 500,
                                        lineHeight: 32,
                                        align: 'right'
                                        //设置变量ng的颜色，即设置{c}的颜色
                                    }
                                }
                            }
                        },
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
                /*    _self.MONTHdrawLeftLineList.everyDay = [];
_self.MONTHdrawLeftLineList.number = []; */

                _self._http({
                    url: '/api/web/indexCountV3/countPatrolMinute',
                    type: 'get',
                    isBody: true,
                    data: {
                        timeType: 'DAY',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];

                        _self.DAYdrawLeftLineList.every = res.data[0].timeName.substring(0, 10);
                        res.data.forEach((item) => {
                            _self.DAYdrawLeftLineList.everyHour.push(item.timeName.substring(11, 13));
                            _self.DAYdrawLeftLineList.number.push(item.average);
                            /*    _self.DAYdrawLeftLineList.everyHour.push(item.everyHour.substring(11, 13));
_self.DAYdrawLeftLineList.number.push(item.number); */
                        });

                        _self.drawLeftLine();
                        console.dir(_self.DAYdrawLeftLineList);
                    }
                });
            } else {
                _self.MONTHdrawLeftLineList.everyDay = [];
                _self.MONTHdrawLeftLineList.number = [];
                _self._http({
                    url: '/api/web/indexCountV3/countPatrolMinute',
                    type: 'get',
                    isBody: true,
                    data: {
                        timeType: 'MONTH',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        console.dir(res);
                        res.data = res.data || [];

                        _self.MONTHdrawLeftLineList.every = res.data[0].timeName.substring(0, 5);

                        res.data.forEach((item) => {
                            _self.MONTHdrawLeftLineList.everyDay.push(item.timeName.substring(5, 10));
                            _self.MONTHdrawLeftLineList.number.push(item.average);
                            /*   _self.MONTHdrawLeftLineList.everyDay.push(item.everyDay.substring(5, 11));
_self.MONTHdrawLeftLineList.number.push(item.number); */
                        });
                        console.dir(_self.MONTHdrawLeftLineList);
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

            let text1 = _self.overLevel == true ? '当日平均处置时效' : '当日平均处置时效';
            let text2 = _self.overLevel == true ? '平均处置时效' : '平均处置时效';

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
                    /*  formatter: '时段：{b0}<br />' + text2 + '：{c0} 次', */
                    formatter: `时段： ${_self.DAYdrawLeftLineList.every}   {b0}<br />` + text2 + '：{c0} 分钟'
                },
                /*   legend: {
                    data: [text2],
                    right: '5%',
                    textStyle: {
                        color: '#ffffff'
                    }
                }, */
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

            let text1 = _self.overLevel == true ? '当月平均处置时效' : '当月平均处置时效';
            let text2 = _self.overLevel == true ? '平均处置时效' : '平均处置时效';

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
                    formatter: `时段:${_self.MONTHdrawLeftLineList.every}{b0}<br />` + text2 + '：{c0} 分钟'
                    //formatter: '时段：{b0}<br />' + text2 + '：{c0} 分钟'
                },
                /*    legend: {
                    data: [text2],
                    right: '5%',
                    
                    textStyle: {
                        color: '#ffffff'
                    }
                }, */
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

.el-tabs__active-bar {
    background: #48e5e5;
}

.el-tabs__nav-wrap::after {
    position: static !important;
}

.patroLabel {
    overflow: auto;
    position: relative;

    .box_li {
        width: 99%;
        height: 51px;

        margin-bottom: 5px;
        border-radius: 12px 12px 12px 12px;
        overflow: hidden;
        opacity: 1;
        border: 2px solid #5c88a7;

        display: flex;
        overflow: hidden;

        .box_li_title_left {
            width: 274px;
            height: 51px;
            background: #4f6f98;
            border-radius: 12px 0px 0px 12px;
            opacity: 1;
            border: 2px solid #5c88a7;
            text-align: center;
            line-height: 51px;

            font-size: 14px;
            font-family: Alibaba PuHuiTi 2-85 Bold, Alibaba PuHuiTi 20;
            font-weight: normal;
            color: #ffffff;
            box-sizing: border-box;
        }

        .box_li_title_right {
            width: calc(99% - 274px);
            display: flex;
            font-size: 12px;
            font-family: Alibaba PuHuiTi 2-55 Regular, Alibaba PuHuiTi 20;
            font-weight: normal;
            color: #ffffff;

            .box_patroLbaelww {
                flex: 1;
                height: 100%;
                float: right;
            }
        }
    }
}
.patrol-stats-charts-content_box {
    display: flex;
    justify-content: space-between;
}
.patrol-stats-charts-content_box .el-button {
    padding: 10px 14px !important;
    background-color: rgb(54, 75, 106);
}
.patrol-stats-charts-content_box .el-button--text {
    border-color: rgb(54, 75, 106);
    color: #fff;
}
</style>
