<template>
    <div class="scoreMark">
        <div v-show="showPage == 1">
            <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
                <el-col :span="18">
                    <div style="height: 46px; line-height: 46px">消防安全运行综合评分</div>
                </el-col>
                <el-col :span="6">
                    <div class="text_r">
                        <i @click="$emit('closeTsCompF')" class="el-icon-circle-close" style="font-size: 26px; margin: 12px 20px; color: #5e9ffb; cursor: pointer"> </i>
                        <!-- <span @click="$emit('closeTsComp')" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span> -->
                    </div>
                </el-col>
            </el-row>
            <!-- <div class="diaHeadStandardC" style="height: 46px; background-color: #2b4b6b; line-height: 46px; padding-left: 12px; color: #fff">消防安全运行综合评分</div> -->
            <div style="padding: 12px; background: linear-gradient(180deg, #19253e 0%, #223e61 100%)">
                <el-row>
                    <el-col class="text_c" :span="6">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">报警处置情况</div>
                            <div @click="showPageChage(6)" style="text-align: left; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span style="font-size: 30px; color: #468080">■</span>
                                <span> &nbsp; &nbsp;报警处置率 &nbsp; &nbsp; {{ sonData.alarmHandlePercent }}%</span>
                            </div>
                            <div @click="showPageChage(3)" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span style="font-size: 30px; color: #fdfd39">■</span>
                                <span> &nbsp; &nbsp;报警处置及时率 &nbsp; &nbsp; {{ sonData.alarmHandOpportunelyPercent }}%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="text_c" :span="6">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">巡查完成情况</div>
                            <div @click="showPageChage(4)" style="text-align: left; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span style="font-size: 30px; color: #325efb">■</span>
                                <span> &nbsp; &nbsp;巡查完成率 &nbsp; &nbsp; {{ sonData.patrolHandlePercent }}%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="text_c" :span="6">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">隐患整治情况</div>
                            <div @click="showPageChage(2)" style="text-align: left; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span style="font-size: 30px; color: #8ef2a7">■</span>
                                <span> &nbsp; &nbsp;隐患发现率 &nbsp; &nbsp; {{ sonData.risksPercent }}%</span>
                            </div>
                            <div @click="showPageChage(5)" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span style="font-size: 30px; color: #d37f8b">■</span>
                                <span> &nbsp; &nbsp;隐患整改率 &nbsp;&nbsp; {{ sonData.risksHandlePercent }}%</span>
                            </div>
                            <div @click="showPageChage(7)" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span style="font-size: 30px; color: #5aa1fc">■</span>
                                <span> &nbsp; &nbsp;隐患按时整改率 &nbsp; &nbsp; {{ sonData.risksOpportunelyPercent }}%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="text_c">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">综合评分</div>
                            <div class="textColor" style="line-height: 140px; font-size: 0.36rem; text-align: center; font-weight: 700">{{ (systemScoreList.score / 1).toFixed(2) }}</div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="20">
                    <el-col :span="6">
                        <div @click="showPageChage(2)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #37007c">■</span>
                            <span> &nbsp; &nbsp;隐患发现率 &nbsp; &nbsp; {{ sonData.risksPercent }}%</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div @click="showPageChage(5)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #d37f8b">■</span>
                            <span> &nbsp; &nbsp;隐患整改率 &nbsp;&nbsp; {{ sonData.risksHandlePercent }}%</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div @click="showPageChage(7)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #5aa1fc">■</span>
                            <span> &nbsp; &nbsp;隐患按时整改率 &nbsp; &nbsp; {{ sonData.risksOpportunelyPercent }}%</span>
                        </div>
                    </el-col>
                </el-row> -->
                <!-- <el-row :gutter="20" style="margin-top: 20px">
                    <el-col :span="6">
                        <div @click="showPageChage(6)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #468080">■</span>
                            <span> &nbsp; &nbsp;报警处置率 &nbsp; &nbsp; {{ sonData.alarmHandlePercent }}%</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div @click="showPageChage(3)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #fdfd39">■</span>
                            <span> &nbsp; &nbsp;报警处置及时率 &nbsp; &nbsp; {{ sonData.alarmHandOpportunelyPercent }}%</span>
                        </div>
                    </el-col>
                </el-row> -->
                <!-- <el-row :gutter="20" style="margin-top: 20px">
                    <el-col :span="6">
                        <div @click="showPageChage(1)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #91ffe0">■</span>
                            <span> &nbsp; &nbsp;设备完好率 &nbsp;&nbsp;&nbsp; {{ sonData.equipPercent }}%</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top: 20px">
                    <el-col :span="6">
                        <div @click="showPageChage(4)" style="height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                            <span style="font-size: 30px; color: #325efb">■</span>
                            <span> &nbsp; &nbsp;巡查完成率 &nbsp; &nbsp; {{ sonData.patrolHandlePercent }}%</span>
                        </div>
                    </el-col>
                </el-row> -->
                <div id="pieChart" style="height: 360px"></div>
            </div>
        </div>

        <div v-if="showPage == 2" class="alertModel">
            <!-- <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec1" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec1 = false), (showPage = 1)" :is="require('./scoreModel/modelPage1')"></component>
            </el-dialog>
            <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec2" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec2 = false), (showPage = 1)" :is="require('./scoreModel/modelPage2')"></component>
            </el-dialog>
            <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec3" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec3 = false), (showPage = 1)" :is="require('./scoreModel/modelPage3')"></component>
            </el-dialog>
            <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec4" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec4 = false), (showPage = 1)" :is="require('./scoreModel/modelPage4')"></component>
            </el-dialog>
            <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec5" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec5 = false), (showPage = 1)" :is="require('./scoreModel/modelPage5')"></component>
            </el-dialog>
            <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec6" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec6 = false), (showPage = 1)" :is="require('./scoreModel/modelPage6')"></component>
            </el-dialog>
            <el-dialog :modal-append-to-body="false" width="1200px" top="5vh" title="隐患清单" :visible.sync="showSec7" :close-on-click-modal="false" class="unit-edit-con">
                <component :sonData="sonData" @closeDialog="homedilogshow = ''" @closeTsComp="(showSec7 = false), (showPage = 1)" :is="require('./scoreModel/modelPage7')"></component>
            </el-dialog> -->
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-if="showSec1" :visible.sync="showSec1" @closeTsComp="(showSec1 = false), (showPage = 1)" :is="require('./scoreModel/modelPage1')"></component>
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec2" :visible.sync="showSec2" @closeTsComp="(showSec2 = false), (showPage = 1)" :is="require('./scoreModel/modelPage2')"></component>
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec3" :visible.sync="showSec3" @closeTsComp="(showSec3 = false), (showPage = 1)" :is="require('./scoreModel/modelPage3')"></component>
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec4" :visible.sync="showSec4" @closeTsComp="(showSec4 = false), (showPage = 1)" :is="require('./scoreModel/modelPage4')"></component>
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec5" :visible.sync="showSec5" @closeTsComp="(showSec5 = false), (showPage = 1)" :is="require('./scoreModel/modelPage5')"></component>
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec6" :visible.sync="showSec6" @closeTsComp="(showSec6 = false), (showPage = 1)" :is="require('./scoreModel/modelPage6')"></component>
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec7" :visible.sync="showSec7" @closeTsComp="(showSec7 = false), (showPage = 1)" :is="require('./scoreModel/modelPage7')"></component>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            sonData: '',
            showPage: 1,
            showSec1: false,
            showSec2: false,
            showSec3: false,
            showSec4: false,
            showSec5: false,
            showSec6: false,
            showSec7: false,
            systemScoreList: ''
        };
    },
    methods: {
        showPageChage(e) {
            this.showPage = 2;
            switch (e) {
                case 1:
                    this.showSec1 = true;
                    break;
                case 2:
                    this.showSec2 = true;
                    break;
                case 3:
                    this.showSec3 = true;
                    break;
                case 4:
                    this.showSec4 = true;
                    break;
                case 5:
                    this.showSec5 = true;
                    break;
                case 6:
                    this.showSec6 = true;
                    break;
                case 7:
                    this.showSec7 = true;
                    break;
                default:
                    break;
            }
        },
        getSonpageData() {
            // /api/web/indexCountTwo/systemScoreThird
            let _self = this;
            _self._http({
                url: '/api/web/indexCountTwo/systemScoreThird',
                type: 'get',
                success: function (res) {
                    _self.sonData = res.data;
                    _self.drawPieChart();
                }
            });
            _self._http({
                url: '/api/web/indexCountTwo/systemScore',
                type: 'get',
                success: function (res) {
                    _self.systemScoreList = res.data;
                }
            });
        },
        drawPieChart() {
            var chartDom = document.getElementById('pieChart');
            var myChart = echarts.init(chartDom);
            var option;
            let _self = this;
            option = {
                title: {
                    show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
                    text: '核算维度权重占比', //主标题文本，'\n'指定换行
                    // left: '48%',
                    top: '10%',
                    left: 'center',
                    textStyle: {
                        //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                color: ['#8ef2a7', '#fdfd39', '#325efb', '#d37f8b', '#468080', '#5aa1fc'],
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '50%',
                        // data: [
                        //     // { value: _self.sonData.equipPercent, name: '设备完好率' },
                        //     { value: _self.sonData.risksPercent, name: '隐患发现率' },
                        //     { value: _self.sonData.alarmHandOpportunelyPercent, name: '报警处置及时率' },
                        //     { value: _self.sonData.patrolHandlePercent, name: '巡查完成率 ' },
                        //     { value: _self.sonData.risksHandlePercent, name: '隐患整改率 ' },
                        //     { value: _self.sonData.alarmHandlePercent, name: '报警处置率 ' },
                        //     { value: _self.sonData.risksOpportunelyPercent, name: ' 隐患按时整改率 ' }
                        // ]
                        data: [
                            // { value: _self.sonData.equipPercent, name: '设备完好率' },
                            { value: 20, name: '隐患发现率' },
                            { value: 20, name: '报警处置及时率' },
                            { value: 20, name: '巡查完成率' },
                            { value: 10, name: '隐患整改率' },
                            { value: 10, name: '报警处置率' },
                            { value: 20, name: ' 隐患按时整改率 ' }
                        ],
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}({d}%)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    },
    created() {},
    mounted() {
        this.getSonpageData();
        // this.$nextTick(() => {
        //     this.drawPieChart();
        // });
    }
};
</script>
<style lang="scss">
.scoreMark {
    // height: 300px;
    .textColor {
        color: #ffffff;
        text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
        background: linear-gradient(180deg, #ffffff 0%, #48e5e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .total_head_card {
        height: 200px;
        margin: 10px;
        padding: 10px;
        width: 100%;
        background: linear-gradient(180deg, rgba(33, 57, 90, 0) 0%, #1c3e61 100%);
        border-radius: 6px 6px 6px 6px;
    }
    .third_head_card {
        width: 88%;
        margin-left: 6%;
        height: 150px;
        background: linear-gradient(180deg, rgba(33, 57, 90, 0) 0%, #1c3e61 100%);
        border-radius: 6px 6px 6px 6px;
        span {
            font-size: 0.42rem;
            font-family: Alibaba PuHuiTi 2-85 Bold, Alibaba PuHuiTi 20;
            font-weight: normal;
            line-height: 0.62rem;
            background: linear-gradient(180deg, #ffffff 0%, #3ca2f8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
    .tabelCon {
        // background-color: #2a3b5c;
        .el-table th,
        .el-table td,
        .el-table--border {
            background-color: #2b488c00 !important;
            border: none !important;
        }
        .el-table td {
            color: #fff;
        }
        .el-table::before {
            background-color: #2b488c00 !important;
        }
        .el-table--border::after {
            width: 0 !important;
        }
        .table-header-class th {
            color: #666c76 !important;
        }
    }
    .el-input__inner {
        background-color: transparent !important;
        border-color: #707683 !important;
    }
    .pagination-container button,
    .pagination-container li {
        background-color: transparent !important;
        border: none !important;
    }
}
</style>
