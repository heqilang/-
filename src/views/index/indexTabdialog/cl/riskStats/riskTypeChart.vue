<!--
巡查情况-隐患情况统计
-->
<template>
    <div class="risk-type-chart-wrapper" style="height: 720px">
        <div class="risk-type-chart" id="risk-type-chart" style="height: 500px"></div>
    </div>
</template>

<script>
import XfIndicator from '../common/XfIndicator';
import * as echarts from 'echarts';
import riskList from './riskList';
import riskDetail from './riskDetail';

export default {
    components: {
        XfIndicator,
        riskList,
        riskDetail
    },
    props: {
        dataRange: {
            //数据范围 (当月 | 当日)
            required: true
        },
        riskStatus: {
            //已整改 | 未整改
            required: true
        },
        newLevel: {
            required: true
        }
    },
    data: () => ({
        statsData: [
            {
                number: 0,
                risksType: '其他'
            }
        ]
    }),
    created() {},
    mounted() {
        this.loadStatsData();
    },
    watch: {
        statsData: {
            handler: function (newVal, oldVal) {
                this.drawPieChart(
                    'risk-type-chart',
                    newVal.map((d) => ({ name: d.risksType, value: d.number }))
                );
            }
        }
    },
    methods: {
        loadStatsData() {
            const that = this;

            that._http({
                url: '/api/auth/dict/dictItem',
                type: 'get',
                isBody: true,
                data: {
                    parentCode: 'riskLevel'
                },
                success: function (res) {
                    let Arr = res.data.filter((res) => res.dictValue === that.newLevel);
                    console.dir(Arr);
                    that._http({
                        // url: '/api/web/indexCountTwo/patrolRisksBing',
                        url: '/api/web/indexCountV3/patrolRisksBing',
                        type: 'get',
                        isBody: true,
                        data: {
                            level: Arr.length > 0 ? Arr[0].dictCode : undefined,
                            type: that.dataRange === '当日' ? 1 : 2,
                            state: that.riskStatus === '已整改' ? 1 : 2
                        },
                        success: function (res) {
                            that.statsData = res.data;
                        }
                    });
                }
            });
        },
        drawPieChart(elementId, data) {
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
                legend: [
                    {
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        align: 'left',
                        data: data.map((d) => d.name),
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                ],
                series: [
                    {
                        name: '隐患类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['40%', '50%'],
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
                console.log(this);
                this.$emit('viewDetailOnclick', 1.5, this.newLevel, that.riskStatus, d.name);
            });
        }
    }
};
</script>

<style lang="scss">
@import './riskTypeChart.scss';
</style>
