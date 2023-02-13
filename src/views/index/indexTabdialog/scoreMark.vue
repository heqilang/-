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
                            <div @click="showPageChage(6)" class="scoreMark_topIcon" style="text-align: left; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #6bd0ca">■</span>
                                <span class="Icon_Span">报警处置率</span>
                                <span>{{ sonData.alarmHandlePercent || 0 }}%</span>
                            </div>
                            <div @click="showPageChage(3)" class="scoreMark_topIcon" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #e4af3d">■</span>
                                <span class="Icon_Span">报警处置及时率</span>
                                <span>{{ sonData.alarmHandOpportunelyPercent || 0 }}%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="text_c" :span="6">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">巡查完成情况</div>
                            <div @click="showPageChage(4)" class="scoreMark_topIcon" style="text-align: left; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #cd685b">■</span>
                                <span class="Icon_Span">巡查完成率</span>
                                <span>{{ sonData.patrolHandlePercent || 0 }}%</span>
                            </div>
                            <div @click="showPageChage(8)" class="scoreMark_topIcon" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #ffd700">■</span>
                                <span class="Icon_Span"> 巡查按时完成率 </span>
                                <span> {{ sonData.patrolHandleOpportunelyPercent || 0 }}%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="text_c" :span="6">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">隐患整治情况</div>
                            <div @click="showPageChage(2)" class="scoreMark_topIcon" style="text-align: left; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #25a6ff">■</span>
                                <span class="Icon_Span">隐患发现率 </span>
                                <span> {{ sonData.risksPercent || 0 }}%</span>
                            </div>
                            <div @click="showPageChage(5)" class="scoreMark_topIcon" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #83bdbf">■</span>
                                <span class="Icon_Span">隐患整改率 </span>
                                <span>{{ sonData.risksHandlePercent || 0 }}%</span>
                            </div>
                            <div @click="showPageChage(7)" class="scoreMark_topIcon" style="text-align: left; margin-top: 12px; height: 38px; line-height: 38px; background: linear-gradient(to right, #2b4b6b 0%, #2b4b6b00 100%); padding: 0 12px; border-radius: 38px 0 0 38px; color: #fff">
                                <span class="Icon" style="font-size: 30px; color: #a259bc">■</span>
                                <span class="Icon_Span"> 隐患按时整改率 </span>
                                <span> {{ sonData.risksOpportunelyPercent || 0 }}%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="text_c">
                        <div class="total_head_card">
                            <div style="text-align: left; color: #fff; font-size: 0.2rem; font-weight: 700; margin-bottom: 12px">综合评分</div>
                            <div class="textColor" style="width: 40%; line-height: 140px; font-size: 20px; text-align: center; font-weight: 700">
                                {{ (systemScoreList.score / 1).toFixed(2) || 0 }}
                            </div>
                            <div class="scores" style="width: 75%">
                                <div class="alarmDisposalScore">报警处置分：{{ (systemScoreList.alarmScore / 1).toFixed(2) || 0 }}分/{{ systemScoreList.alarmScoreAll }}分</div>
                                <div class="alarmDisposalScore">巡查完成分：{{ (systemScoreList.patrolScore / 1).toFixed(2) || 0 }}分/{{ systemScoreList.patrolScoreAll }}分</div>
                                <!-- risksScore -->
                                <div class="alarmDisposalScore">隐患整治分：{{ ((systemScoreList.score / 1).toFixed(2) - (systemScoreList.alarmScore / 1).toFixed(2) - (systemScoreList.patrolScore / 1).toFixed(2)).toFixed(2) || 0 }}分/{{ systemScoreList.risksScoreAll }}分</div>
                                <!-- <div class="alarmDisposalScore">隐患整治分：{{ (systemScoreList.risksScore / 1).toFixed(2)||0 }}</div> -->
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <div style="width: 100%; height: 360px; display: flex">
                    <div id="pieChart" style="width: 30%; height: 360px"></div>

                    <div class="pieChart_box" v-if="false" style="color: #fff; text-align: left; font-size: 15px; width: 45%; height: 360px">
                        <div class="pieChart_box_title" style="padding: 0px 0 20px 0">
                            <ul style="margin-bottom: 30px">
                                <li>
                                    <span v-if="false">
                                        当前综合评分为 <span style="color: red"> {{ (systemScoreList.score / 1).toFixed(2) || 0 }}</span>
                                    </span>
                                </li>
                                <li v-if="false">
                                    <span style="display: flex; flex-wrap: wrap"
                                        >需要尽快完成 <span v-for="(item, index) in totalTitle" :key="index">{{ item.title }}</span>
                                    </span>
                                </li>

                                <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px; margin-top: 30px">*<span>提示</span></li>
                                <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px">
                                    <span>低于95分，发送给社区相关人员；</span>
                                </li>
                                <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px">
                                    <span>低于90分，发送给街道相关人员；</span>
                                </li>
                                <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px">
                                    <span>低于85分，发送给行业主管部门，消防救援机构，安办相关人员</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="dataMainCountBottom" style="width: 70%; height: 360px; margin-left: 356px">
                        <div class="cardItemB">
                            <div class="cardItemS" style="height: 0px">
                                <div class="cardTit" style="background: transparent">
                                    <el-radio-group style="transform: scale(0.73); float: right" v-model="charRadio" @change="getCharRadio">
                                        <el-radio-button label="min">近30天</el-radio-button>
                                        <el-radio-button label="MONTH">当月</el-radio-button>
                                        <el-radio-button label="YEAR">当年</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>

                        <div class="cardItem_box">
                            <component :charRadio="charRadio" :is="require('@/components/echarts/pie.vue')" />
                        </div>
                    </div>
                </div>

                <div class="pieChart_bottom" style="width: 100%">
                    <ul style="padding-left: 20px">
                        <li>
                            <span style="font-size: 12px; color: rgba(133, 180, 231, 0.8)">
                                备注：<br />
                                当前综合评分为 <span style="color: #fff">{{ (systemScoreList.score / 1).toFixed(2) || 0 }}分</span>
                                ，需尽快完成报警处置、巡查巡检、隐患排查、隐患整改。低于95分，发送给社区相关人员，低于90分，发送给街道相关人员，低于85分，发送给行业主管部门，消防救援机构，安办相关人员。
                            </span>
                            <span v-if="false">
                                当前综合评分为 <span style="color: red"> {{ (systemScoreList.score / 1).toFixed(2) || 0 }}</span>
                            </span>
                        </li>

                        <li v-if="false">
                            <span style="display: flex; flex-wrap: wrap"
                                >需要尽快完成
                                <span v-for="(item, index) in totalTitle" :key="index">{{ item.title }}</span>
                                *<span>提示</span> <span>低于95分，发送给社区相关人员；</span> <span>低于90分，发送给街道相关人员；</span><span>低于85分，发送给行业主管部门，消防救援机构，安办相关人员</span>
                            </span>
                        </li>

                        <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px; margin-top: 30px">*<span>提示</span></li>
                        <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px">
                            <span>低于95分，发送给社区相关人员；</span>
                        </li>
                        <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px">
                            <span>低于90分，发送给街道相关人员；</span>
                        </li>
                        <li v-if="false" style="color: #fff; text-align: left; font-size: 12px; font-weight: 400; line-height: 20px">
                            <span>低于85分，发送给行业主管部门，消防救援机构，安办相关人员</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-if="showPage == 2" class="alertModel">
            <component :sonData="sonData" @closeDialog="homedilogshow = ''" v-if="showSec1" :visible.sync="showSec1" @closeTsComp="(showSec1 = false), (showPage = 1)" :is="require('./scoreModel/modelPage1')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec2" :visible.sync="showSec2" @closeTsComp="(showSec2 = false), (showPage = 1)" :is="require('./scoreModel/modelPage2')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec3" :visible.sync="showSec3" @closeTsComp="(showSec3 = false), (showPage = 1)" :is="require('./scoreModel/modelPage3')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec4" :visible.sync="showSec4" @closeTsComp="(showSec4 = false), (showPage = 1)" :is="require('./scoreModel/modelPage4')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec5" :visible.sync="showSec5" @closeTsComp="(showSec5 = false), (showPage = 1)" :is="require('./scoreModel/modelPage5')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec6" :visible.sync="showSec6" @closeTsComp="(showSec6 = false), (showPage = 1)" :is="require('./scoreModel/modelPage6')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec7" :visible.sync="showSec7" @closeTsComp="(showSec7 = false), (showPage = 1)" :is="require('./scoreModel/modelPage7')"></component>
            <component @closeDealie="closeDealie" :sonData="sonData" @closeDialog="homedilogshow = ''" v-else-if="showSec8" :visible.sync="showSec8" @closeTsComp="(showSec8 = false), (showPage = 1)" :is="require('./scoreModel/modelPage8')"></component>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    props: ['showScoreMark'],
    data() {
        return {
            charRadio: 'min',
            sonData: '',
            showPage: 1,
            showSec1: false,
            showSec2: false,
            showSec3: false,
            showSec4: false,
            showSec5: false,
            showSec6: false,
            showSec7: false,
            showSec8: false,
            systemScoreList: ''
        };
    },
    watch: {
        showScoreMark: function (newOlde) {
            if (newOlde) {
                this.showPage = 1;
            }
        }
    },
    computed: {
        totalTitle: {
            get() {
                let arr = [
                    {
                        title: '报警处置',
                        showTitle: this.sonData.alarmHandlePercent !== 100
                    },
                    {
                        title: '报警及时处置',
                        showTitle: this.sonData.alarmHandOpportunelyPercent !== 100
                    },
                    {
                        title: '巡查计划',
                        showTitle: this.sonData.patrolHandlePercent !== 100
                    },
                    {
                        title: '巡查按时完成率',
                        showTitle: this.sonData.patrolHandleOpportunelyPercent !== 100
                    },
                    {
                        title: '隐患排查',
                        showTitle: this.sonData.risksPercent !== 100
                    },
                    {
                        title: '隐患整改',
                        showTitle: this.sonData.risksHandlePercent !== 100
                    },
                    {
                        title: '按时整改隐患',
                        showTitle: this.sonData.risksOpportunelyPercent !== 100
                    }
                ];
                let newArr = arr.filter((item) => {
                    return item.showTitle == true;
                });
                newArr.forEach((item, index) => {
                    if (newArr.length - 1 !== index) {
                        item.title = item.title + '、';
                    }
                });
                return newArr;
            },
            set() {}
        }
    },
    methods: {
        getCharRadio(val) {
            console.log(val, this.charRadio);
        },
        closeDealie(val) {
            this.$emit('closeTsCompF');
            this.$emit('closeDialog');
            setTimeout(() => {});
        },
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
                case 8:
                    this.showSec8 = true;
                    break;
                default:
                    break;
            }
        },
        getSonpageData() {
            // /api/web/indexCountTwo/systemScoreThird
            let _self = this;
            _self._http({
                url: '/api/web/indexCountV3/systemScoreThird', //迪威--系统评分--三级级页面--所有统计数据
                //  url: '/api/web/indexCountTwo/systemScoreThird',
                type: 'get',
                success: function (res) {
                    _self.sonData = res.data;

                    console.log('评分所有数据', res);
                    _self.drawPieChart();
                }
            });
            _self._http({
                url: '/api/web/indexCountV3/systemScoreSecond', //迪威--系统评分--二级页面
                // url: '/api/web/indexCountTwo/systemScore',
                type: 'get',
                success: function (res) {
                    console.log('评分二级页面8条数据', res);
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
                    left: 'left',
                    show: false
                },
                color: ['#25A6FF', '#E4AF3D', '#CD685B', '#83BDBF', '#6bd0ca', '#A259BC', '#ffd700'],
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '40%',

                        labelLine: {
                            normal: {
                                length: 20, //第一条线
                                length2: 80, //第二条线
                                lineStyle: {
                                    width: 1, // 线条的宽度
                                    color: '#fff' //线的颜色设置， 如没有设置颜色则线条的颜色跟随饼状图的颜色
                                }
                            }
                        },
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
                            {
                                value: 10,
                                name: '隐患发现率'
                            },
                            {
                                value: 20,
                                name: '报警处置及时率'
                            },
                            {
                                value: 20,
                                name: '巡查完成率'
                            },
                            {
                                value: 10,
                                name: '隐患整改率'
                            },
                            {
                                value: 10,
                                name: '报警处置率'
                            },
                            {
                                value: 20,
                                name: '隐患按时整改率'
                            },
                            {
                                value: 10,
                                name: '巡查按时完成率'
                            }
                        ].map((item, index) => {
                            let color = ['#25A6FF', '#E4AF3D', '#CD685B', '#83BDBF', '#6bd0ca', '#A259BC', '#ffd700'];
                            item.label = {
                                color: color[index]
                            };
                            return item;
                        }),
                        /*     label: {
                              position: 'outer',
                              alignTo: 'labelLine',  // 'labelLine'：label line 的末端对齐，其中最短的长度由 labelLine.length2 决定
                              bleedMargin: 5,
                                 normal: {
                                     show: true,
                                     formatter: '{b}({d}%)'
                                 },
                                 
                             }  */

                        itemStyle: {
                            color: (params) => {
                                var index = params.dataIndex;

                                let color = ['#25A6FF', '#E4AF3D', '#CD685B', '#83BDBF', '#6bd0ca', '#A259BC', '#ffd700'];

                                return color[index];
                            }
                        },

                        label: {
                            position: 'outer',
                            alignTo: 'labelLine', // 'labelLine'：label line 的末端对齐，其中最短的长度由 labelLine.length2 决定
                            bleedMargin: 5,
                            normal: {
                                alignTo: 'labelLine',
                                show: true,
                                formatter: function (params, ticket, callback) {
                                    console.dir(params);
                                    console.dir(params.name.length);
                                    if (params.name.length < 7) {
                                        return '{per|' + '■' + ' }' + '{a|' + params.data.name + ' ' + ' }' + '{b|' + params.percent + '% }';
                                    } else {
                                        return '{per|' + '■' + ' }' + '{a|' + params.data.name + ' ' + ' }' + '{b|' + params.percent + '% }'; // params.name + params.percent+"%"
                                    }
                                },

                                borderWidth: 20,
                                borderRadius: 4,
                                padding: [0, -145, 20, -130],
                                rich: {
                                    a: {
                                        fontSize: 12,
                                        color: '#fff',
                                        fontWeight: 500,
                                        lineHeight: 32,
                                        align: 'right'
                                    },
                                    b: {
                                        color: '#fff',
                                        fontSize: 12,
                                        lineHeight: 33
                                    },
                                    per: {
                                        fontSize: 18,
                                        padding: [2, 4, 5, 0],
                                        borderRadius: 2
                                    }
                                }
                                /* 
                                                                formatter: function (pram) {
                                                                    return '     {a|' + pram.data.name + '     ' + pram.percent + '% }'
                                                                },
                                                                padding: [0, -120, 20, -120],//关键代码！关键代码！关键代码！
                                                                rich: {
                                                                    a: {
                                                                        fontSize: 12,
                                                                        color: '#fff',
                                                                        fontWeight: 500,
                                                                        lineHeight: 32,
                                                                        align: "right",
                                                                    },
                                                                }, */
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
    .mydiv {
        width: 100px;
        height: 100px;
        background-color: #bfa;
    }

    // height: 300px;
    .textColor {
        color: #ffffff;
        text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
        background: linear-gradient(180deg, #ffffff 0%, #48e5e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .scores {
        float: right;
        color: #ffffff;
        margin-right: -28px;
        margin-top: -110px;

        div {
            margin-bottom: 10px;
            text-align: left;
        }
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

.pieChart_box {
    /*  position: absolute;
    right: 5%;
    top: 84px; */
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
}

.scoreMark_topIcon {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .Icon {
        padding-bottom: 10px;
    }

    .Icon_Span {
        width: 140px;
        text-align: left;
    }
}

.pieChart_bottom {
    height: auto;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
}
</style>
<!-- 4.6.0  "echarts": "^3.3.2", -->
