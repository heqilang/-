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
        activePartolPointId: undefined //当前激活的 巡查点位id
    }),
    created() {
        console.dir(this.statsData);
    },
    mounted() {
        this.loadStatsData();
    },

    watch: {
        statsData: {
            handler: function (newVal, oldVal) {
                //todo 陈磊20220902 新增的图表 , 目前的数据是mockChartBarData  后续需要对接接口
                this.drawBarChart('patrol-stats-chart1', [
                    { name: '正常巡查次数', value: newVal.opportunelyFinish },
                    { name: '逾期未巡查次数', value: newVal.notOpportunelyFinish }
                ]);
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
                url: '/api/web/indexCountTwo/thirdPatrolSecond',
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
