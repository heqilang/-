<!--
巡查情况-隐患情况统计
-->
<template>
    <div>
        <div class="diaHeadStandardC" style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">
            {{ title }}

            <div style="height: 20px; display: flex; justify-content: space-between" class="clhangImg">
                <i class="el-icon-circle-close" @click="$emit('closeRiskStats')" style="font-size: 26px; color: #5e9ffb; cursor: pointer"> </i>
            </div>
        </div>
        <!--   <i @click="$emit('closeTsCompF')" class="el-icon-circle-close" style="font-size: 26px; margin: 12px 20px; color: #5e9ffb; cursor: pointer"> </i>  -->
        <div style="position: relative">
            <div class="xf-stats-wrapper">
                <div class="risk-stats-wrapper" v-if="currentLayerLevel === 1">
                    <div class="risk-stats-indicators">
                        <!-- <XfIndicator v-on:onclick="intoLayer2(1, '', '', '')" title="全部隐患数" :num="statsData.allRisks" unit="个" />
                        <XfIndicator v-on:onclick="intoLayer2(1, '一般隐患', '', '')" title="一般隐患数" :num="statsData.commonRisks" unit="个" />
                        <XfIndicator v-on:onclick="intoLayer2(1, '重大隐患', '', '')" title="重大隐患数" :num="statsData.greatRisks" unit="个" /> -->
                        <XfIndicator v-on:onclick="changeLayer1('')" title="全部隐患数" :num="statsData.allRisks" unit="个" />
                        <XfIndicator v-on:onclick="changeLayer1('一般隐患')" title="一般隐患数" :num="statsData.commonRisks" unit="个" />
                        <XfIndicator v-on:onclick="changeLayer1('重大隐患')" title="重大隐患数" :num="statsData.greatRisks" unit="个" />
                    </div>

                    <div class="risk-stats-charts-wrapper">
                        <div class="risk-stats-charts-header">
                            <!-- {{ activeRiskLevel == '0' ? '一般隐患' : activeRiskLevel == '1' ? '重大隐患' : activeRiskLevel }} -->
                            {{ activeRiskLevel == '0' ? '一般隐患' : activeRiskLevel == '1' ? '重大隐患' : activeRiskLevel }}
                        </div>
                        <div class="risk-stats-charts-body">
                            <div class="risk-stats-charts-stats">
                                <div>
                                    <!--                  <XfIndicator type="cs" v-on:onclick="intoLayer2(activeRiskLevel, '已整改', '')" title="已整改数" :num="statsData.handleRisk"/>
                                    <XfIndicator type="cs" v-on:onclick="intoLayer2(activeRiskLevel, '限期已整改', '')" title="限期已整改数" :num="statsData.handleOpportunelyNum"/>
                                    <XfIndicator type="cs" v-on:onclick="intoLayer2(activeRiskLevel, '逾期已整改', '')" title="逾期已整改数" :num="statsData.notHandleOpportunelyNum"/>-->
                                    <XfIndicator type="cs" v-on:onclick="intoLayer1dot5(activeRiskLevel, '已整改', '')" title="已整改数" :num="statsData.handleRisk" />
                                    <XfIndicator type="cs" title="限期已整改数" :num="statsData.handleOpportunelyNum" />
                                    <XfIndicator type="cs" title="逾期已整改数" :num="statsData.notHandleOpportunelyNum" />
                                </div>
                                <div>
                                    <!--                  <XfIndicator type="cs" title="未整改数" v-on:onclick="intoLayer2(activeRiskLevel, '未整改', '')" :num="statsData.notHandle"/>
                                    <XfIndicator type="cs" title="限期未整改数" v-on:onclick="intoLayer2(activeRiskLevel, '限期未整改', '')" :num="statsData.timeOutNotHandleRisks"/>
                                    <XfIndicator type="cs" title="逾期未整改数" v-on:onclick="intoLayer2(activeRiskLevel, '已整逾期未整改', '')" :num="statsData.notTimeOutNotHandleRisks"/>-->
                                    <XfIndicator type="cs" title="未整改数" v-on:onclick="intoLayer1dot5(activeRiskLevel, '未整改', '')" :num="statsData.notHandle" />
                                    <XfIndicator type="cs" title="限期未整改数" :num="statsData.timeOutNotHandleRisks" />
                                    <XfIndicator type="cs" title="逾期未整改数" :num="statsData.notTimeOutNotHandleRisks" />
                                </div>
                            </div>
                            <div class="risk-stats-charts-content">
                                <div class="risk-stats-chart" id="risk-stats-chart1"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stats-layer-container" v-if="currentLayerLevel === 1.5">
                    <a class="return-upper-level-btn" v-on:click="intoLayer1()"><<</a>
                    <!-- riskLevel -->
                    <riskTypeChart :data-range="dataRange" :newLevel="activeRiskLevel" :risk-status="activeRiskStatus" v-on:viewDetailOnclick="intoLayer2" />
                </div>

                <div class="stats-layer-container" v-if="currentLayerLevel === 2">
                    <a class="return-upper-level-btn" v-on:click="prevLayerLevel === 1.5 ? intoLayer1dot5(activeRiskLevel, activeRiskStatus, activeRiskType) : intoLayer1()"><<</a>
                    <riskList v-if="currentLayerLevel === 2" :risk-level="activeRiskLevel === '全部隐患' ? '' : activeRiskLevel" :risk-status="activeRiskStatus" :risk-type="activeRiskType" :dataRange="dataRange" v-on:viewDetailOnclick="intoLayer3" />
                </div>

                <div class="stats-layer-container" v-if="currentLayerLevel === 3">
                    <a class="return-upper-level-btn" v-on:click="intoLayer2(prevLayerLevel, activeRiskLevel, activeRiskStatus, activeRiskType)"><<</a>
                    <riskDetail v-if="currentLayerLevel === 3" :riskId="activeRiskId" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import XfIndicator from '../common/XfIndicator';
import * as echarts from 'echarts';
import riskList from './riskList';
import riskDetail from './riskDetail';
import riskTypeChart from './riskTypeChart';

export default {
    components: {
        XfIndicator,
        riskList,
        riskTypeChart,
        riskDetail
    },
    props: {
        dataRange: {
            //数据范围 (当月 | 当日)
            required: true
        }
    },
    data: () => ({
        newLevel: '',
        statsData: {
            allRisks: 0,
            notTimeOutNotHandleRisks: 0,
            handleRisk: 0,
            commonRisks: 0,
            notHandleOpportunelyNum: 0,
            greatRisks: 0,
            timeOutNotHandleRisks: 0,
            risksTypeCount: [
                {
                    number: 0,
                    risksType: '其他'
                }
            ],
            handleOpportunelyNum: 0,
            notHandle: 0
        },

        currentLayerLevel: 1,
        activeRiskLevel: '全部隐患', //当前激活的隐患级别 TODO 目前是个中文字符串,后面应该要改成字典id
        activeRiskStatus: '已整改', //当前激活的隐患状态 TODO 目前是个中文字符串,后面应该要改成字典id
        activeRiskType: '用火用电', //当前激活的隐患类型 TODO 目前是个中文字符串,后面应该要改成字典id
        activeRiskId: undefined, //当前选中(查看详情)的隐患记录

        prevLayerLevel: undefined,

        riskLevel: undefined,

        dataRiskLevel: []
    }),
    created() {},
    mounted() {
        this.getDataListLevel();
        this.loadStatsData();
    },
    watch: {
        statsData: {
            handler: function (newVal, oldVal) {
                console.log(newVal);
                // this.drawPieChart('risk-stats-chart1', '隐患级别', [
                //     { name: '一般隐患', value: newVal.commonRisks },
                //     { name: '重大隐患', value: newVal.greatRisks }
                // ]);
                if (this.riskLevel == '一般隐患' || this.activeRiskLevel == '0') {
                    this.drawPieChart('risk-stats-chart1', '隐患级别', [{ name: '一般隐患', value: newVal.commonRisks }]);
                } else if (this.riskLevel == '重大隐患' || this.activeRiskLevel == '1') {
                    this.drawPieChart('risk-stats-chart1', '隐患级别', [{ name: '重大隐患', value: newVal.greatRisks }]);
                } else {
                    this.drawPieChart('risk-stats-chart1', '隐患级别', [
                        { name: '一般隐患', value: newVal.commonRisks },
                        { name: '重大隐患', value: newVal.greatRisks }
                    ]);
                }
            }
        },
        currentLayerLevel: {
            immediate: true,
            handler: function (newVal, oldVal) {
                let that = this;
                if (newVal === 1) {
                    this.title = `${this.dataRange}隐患`;
                } else if (newVal === 1.5) {
                    this.title = `${this.dataRange}隐患-${this.activeRiskStatus}`;
                } else if (newVal === 2) {
                    this.title = `${this.dataRange}隐患列表`;
                } else if (newVal === 3) {
                    this.title = `隐患详情`;
                }

                setTimeout(() => {
                    if (newVal !== oldVal && newVal === 1) {
                        if (that.riskLevel == '一般隐患' || that.activeRiskLevel == '0') {
                            that.drawPieChart('risk-stats-chart1', '隐患级别', [{ name: '一般隐患', value: that.statsData.commonRisks }]);
                        } else if (that.riskLevel == '重大隐患' || that.activeRiskLevel == '1') {
                            that.drawPieChart('risk-stats-chart1', '隐患级别', [{ name: '重大隐患', value: that.statsData.greatRisks }]);
                        } else {
                            that.drawPieChart('risk-stats-chart1', '隐患级别', [
                                { name: '一般隐患', value: that.statsData.commonRisks },
                                { name: '重大隐患', value: that.statsData.greatRisks }
                            ]);
                        }
                    }
                }, 50);
            }
        }
    },
    methods: {
        onMainXfIndicatorClick(type) {
            this.activeRiskLevel = type;
        },
        intoLayer1() {
            this.currentLayerLevel = 1;
        },
        intoLayer1dot5(riskLevel, riskStatus, riskType) {
            this.activeRiskLevel = riskLevel;
            this.activeRiskStatus = riskStatus;
            console.dir(riskStatus);
            this.activeRiskType = riskType;
            this.currentLayerLevel = 1.5;
        },
        intoLayer2(prevLayerLevel, riskLevel, riskStatus, riskType) {
            console.log(prevLayerLevel, riskLevel, riskStatus, riskType);
            let arr = this.dataRiskLevel || [];
            let level = undefined;
            for (let i in arr) {
                if (riskLevel == arr[i].dictValue) {
                    level = arr[i].dictCode;
                    break;
                }
            }
            if (riskLevel == '一般隐患') {
                level = 0;
            } else if (riskLevel == '重大隐患') {
                level = 1;
            }
            // this.activeRiskLevel = level;
            this.activeRiskLevel = riskLevel;

            this.activeRiskStatus = riskStatus;
            this.activeRiskType = riskType;

            this.prevLayerLevel = prevLayerLevel;

            this.currentLayerLevel = 2;

            console.log(riskLevel, riskStatus, riskType, prevLayerLevel);
        },
        intoLayer3(riskItem) {
            this.activeRiskId = riskItem;
            this.currentLayerLevel = 3;
        },
        changeLayer1(val) {
            this.riskLevel = val || undefined;
            this.activeRiskLevel = val || '全部隐患';
            this.loadStatsData();
        },
        //隐患级别
        getDataListLevel() {
            let that = this;
            that._http({
                url: '/api/auth/dict/dictItem',
                type: 'get',
                isBody: true,
                data: {
                    parentCode: 'riskLevel'
                },
                success: function (res) {
                    that.dataRiskLevel = res.data || [];
                }
            });
        },
        loadStatsData() {
            const that = this;
            let arr = this.dataRiskLevel || [];
            let level = undefined;
            for (let i in arr) {
                if (this.activeRiskLevel == arr[i].dictValue) {
                    level = arr[i].dictCode;
                    break;
                }
            }
            if (this.activeRiskLevel == '一般隐患') {
                level = 0;
            } else if (this.activeRiskLevel == '重大隐患') {
                level = 1;
            }
            that._http({
                url: '/api/web/indexCountV3/thirdRisksSecond', ///api/web/indexCountTwo/thirdRisksSecond
                type: 'get',
                isBody: true,
                data: {
                    type: that.dataRange === '当日' ? 1 : 2,
                    level: level
                },
                success: function (res) {
                    that.statsData = res.data;
                }
            });
        },
        drawPieChart(elementId, serieName, data) {
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
                        },
                        formatter: function (name) {
                            let value = 0;
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].name == name) {
                                    value = data[i].value;
                                    break;
                                }
                            }
                            return name + ' ' + ' ' + value;
                        }
                    }
                ],
                series: [
                    {
                        name: serieName,
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['40%', '50%'],
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
                                        fontSize: 14,
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
                that.intoLayer2(1, serieName === '隐患级别' ? d.name : '', '', serieName === '隐患类型' ? d.name : '');
            });
        }
    }
};
</script>

<style lang="scss">
@import './riskStats.scss';

.clhangImg {
    position: absolute;
    right: 27px;
    top: 8px;
}

.xf-timeline .el-timeline-item .el-timeline-item__timestamp {
    left: -200px !important;
}
</style>
