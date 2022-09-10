<template>
    <div class="classReadyDialog">
        <div v-show="showLeavel == 1" class="firstLevel">
            <div class="headerCon diaHeadStandardC">
                <el-tabs v-model="activeName" @tab-click="changeTabsFirst">
                    <el-tab-pane label="突发类事件预警" name="first"></el-tab-pane>
                    <el-tab-pane label="管理类事件预警" name="second"></el-tab-pane>
                </el-tabs>
            </div>
            <div v-show="activeName == 'first'" class="diaBodyStandardC" style="background: linear-gradient(180deg, #19253e 0%, #223e61 100%); color: #fff; padding: 12px">
                <div class="alarm-radio-com">
                    <el-radio-group v-model="alarmRadio" @change="alarmRadioChange">
                        <el-radio-button label="DAY">当日</el-radio-button>
                        <el-radio-button label="MONTH">当月</el-radio-button>
                    </el-radio-group>
                </div>
                <el-row>
                    <el-col :span="24">
                        <div>
                            <el-row class="text_c">
                                <el-col :span="12">
                                    <div>{{ alarmRadio === 'DAY' ? '当日' : '当月' }}已处置数</div>
                                    <div style="color: #91ffe0; font-size: 0.2rem; margin: 12px 0" @click="showTableList">
                                        <span class="numColorN">{{ firstPageData1.alarmsOver }}</span> 个
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div>{{ alarmRadio === 'DAY' ? '当日' : '当月' }}未处置数</div>
                                    <div style="color: #91ffe0; font-size: 0.2rem; margin: 12px 0" @click="showTableList">
                                        <span class="numColorN">{{ firstPageData1.alarms - firstPageData1.alarmsOver }}</span> 个
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- <el-row class="text_c" v-else-if="alarmRadio === 'MONTH'">
                                <el-col :span="12">
                                    <div>当月已处置数</div>
                                    <div style="color: #91ffe0; font-size: 0.2rem; margin: 12px 0" @click="showTableList">
                                        <span class="numColorN">{{ firstPageData1.alarmsOver }}</span> 个
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div>当月未处置数</div>
                                    <div style="color: #91ffe0; font-size: 0.2rem; margin: 12px 0" @click="showTableList">
                                        <span class="numColorN">{{ firstPageData1.alarms - firstPageData1.alarmsOver }}</span> 个
                                    </div>
                                </el-col>
                            </el-row> -->
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <!-- <div id="Su" style="height: 400px"></div> -->
                    </el-col>
                </el-row>
                <div v-show="alarmRadio === 'DAY'">
                    <div style="height: 300px" id="barChartSudden"></div>
                    <!-- <img style="width: 88%; margin-left: 6%" src="../../../assets/images/globalCenterNew/lineC.jpg" alt="" /> -->
                </div>
                <div v-show="alarmRadio === 'MONTH'">
                    <div style="margin: 20px 0; padding-left: 6%; font-size: 0.2rem; font-weight: 700">当月平均处置时效趋势图</div>
                    <div style="height: 300px; width: 1172px" id="lineChart1"></div>
                    <!-- <img style="width: 88%; margin-left: 6%" src="../../../assets/images/globalCenterNew/lineC.jpg" alt="" /> -->
                </div>
            </div>
            <div v-show="activeName == 'second'" style="background: linear-gradient(180deg, #19253e 0%, #223e61 100%); color: #fff; padding: 12px">
                <div class="alarm-radio-com">
                    <el-radio-group v-model="alarmRadio" @change="manageRadioChange">
                        <el-radio-button label="DAY">当日</el-radio-button>
                        <el-radio-button label="MONTH">当月</el-radio-button>
                    </el-radio-group>
                </div>
                <el-row>
                    <el-col :span="24">
                        <div>
                            <el-row class="text_c">
                                <el-col :span="12">
                                    <div>{{ alarmRadio == 'DAY' ? '当日' : '当月' }}已处置数</div>
                                    <div style="color: #91ffe0; font-size: 0.2rem; margin: 12px 0" @click="showpage2">
                                        <span class="numColorN">{{ firstPageData1.manages || 0 }}</span> 个
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div>{{ alarmRadio == 'DAY' ? '当日' : '当月' }}未处置数</div>
                                    <div style="color: #91ffe0; font-size: 0.2rem; margin: 12px 0" @click="showpage2">
                                        <span class="numColorN">{{ firstPageData1.manages - firstPageData1.managesOver }}</span> 个
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- <div style="height: 300px" id="pieChart1"></div> -->
                    </el-col>
                    <el-col :span="24">
                        <el-radio-group style="transform: scale(0.8); margin-left: -0.2rem; margin: 20px 6%" v-model="timeRadio" size="mini" @change="changeTabsSeco">
                            <el-radio-button label="巡查处置时效"></el-radio-button>
                            <el-radio-button label="隐患处置时效"></el-radio-button>
                        </el-radio-group>
                        <!-- <img v-if="timeRadio == '巡查处置时效'" style="width: 88%; margin-left: 6%" src="../../../assets/images/globalCenterNew/checkTime.jpg" alt="" /> -->
                        <div v-if="timeRadio == '巡查处置时效'" style="height: 300px" id="lineChart2"></div>
                        <div v-if="timeRadio == '隐患处置时效'" style="height: 300px" id="lineChart3"></div>
                        <!-- <img v-if="timeRadio == '隐患处置时效'" style="width: 88%; margin-left: 6%" src="../../../assets/images/globalCenterNew/riskTime.jpg" alt="" /> -->
                        <!-- <div id="Su1" style="height: 400px"></div> -->
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="showLeavel == 2" class="secendLevel">
            <div class="diaHeadStandardC" style="height: 46px; background-color: #2b4b6b; line-height: 46px; padding-left: 12px; color: #fff">
                <span style="cursor: pointer">
                    <span>{{ (alarmRadio === 'DAY' ? '当日' : '当月') + (activeName == 'first' ? '突发类' : '管理类') }}</span
                    >事件预警列表
                </span>
            </div>

            <div style="background: linear-gradient(to right bottom, #192640, #213d60) !important; color: #fff; padding: 12px">
                <el-row>
                    <el-col :span="18">
                        <!-- <div style="font-size: 16px; font-weight: 700">{{ activeName == 'first' ? '突发类预警列表' : '管理类预警列表' }}</div> -->
                        <div style="margin: 10px 0">
                            <el-radio-group size="mini" v-model="radio1" @change="changeRadio">
                                <el-radio-button label="已处理"></el-radio-button>
                                <el-radio-button label="未处理"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="text_r">
                            <span @click="showLeavel = 1" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span>
                        </div>
                    </el-col>
                </el-row>

                <div>
                    <el-tabs v-model="activeSenName" @tab-click="changeSenName">
                        <el-tab-pane label="巡检事件" name="first"></el-tab-pane>
                        <el-tab-pane label="隐患事件" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <!-- 巡检事件 -->
                <div class="tabelCon" v-if="activeSenName === 'first'">
                    <el-table header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable" ref="treeTable" border style="width: 100%">
                        <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>

                        <!--  <el-table-column prop="alarmType" label="事件类型" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                {{ activeName == 'first' ? '突发类' : '管理类' }}
                            </template>
                        </el-table-column> -->
                        <!-- todo -->
                        <!-- <el-table-column prop="" label="预警信息" :show-overflow-tooltip="true"> </el-table-column> -->
                        <el-table-column prop="alarmTime" label="预警时间" :show-overflow-tooltip="true"> </el-table-column>
                        <!-- <el-table-column prop="handleAlarmTime" label="期限时间">
                            <template slot-scope="scope">
                                {{ scope.row.handleAlarmTime || '--' }}
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="title" label="预警人员" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                {{ scope.row.lookup.handler || '--' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="预警位置" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                {{ scope.row.lookup.building ? scope.row.lookup.building : '' }}
                                {{ scope.row.lookup.floor ? scope.row.lookup.floor : '' }}
                                {{ scope.row.address ? scope.row.address : '' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="处理状态" :show-overflow-tooltip="true">
                            <template slot-scope="{ row }">
                                {{ orderStateObj[row.state] }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="flex text_c mar-t-18 mar-b-18">
                        <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                    </div>
                </div>
                <!-- 隐患事件 -->
                <div class="tabelCon" v-else-if="activeSenName === 'second'">
                    <el-table header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable2" ref="treeTable" border style="width: 100%">
                        <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>

                        <el-table-column prop="alarmType" label="事件类型" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                {{ activeName == 'first' ? '突发类' : '管理类' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="addtime" label="预警时间" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="handleAlarmTime" label="期限时间">
                            <template slot-scope="scope">
                                {{ scope.row.handleAlarmTime || '--' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="预警人员" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                {{ scope.row.lookup.handler || '--' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="flex text_c mar-t-18 mar-b-18">
                        <customPagination v-if="pager2.total !== 0" :paginationData="pager2" @getList="getList2"></customPagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showLeavel == 3" class="secendLevel" style="background-color: #2b4b6b; color: #fff">
            <div class="diaHeadStandardC" style="height: 46px; background-color: #2b4b6b; line-height: 46px; padding-left: 12px; color: #fff">
                <span style="cursor: pointer">
                    {{ activeName == 'first' ? '突发类事件预警' : '管理类事件预警' }}
                    <!-- <span>{{ activeName == 'first' ? '突发类' : '管理类' }}</span
                    >事件预警 -->
                </span>
            </div>
            <div style="background: linear-gradient(to right bottom, #192640, #213d60) !important; position: relative">
                <div style="position: absolute; right: 10px; top: 10px; background-color: #1f223000; z-index: 1">
                    <span @click="showLeavel = 2" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span>
                </div>
                <el-scrollbar v-if="sourcelist.length > 0" style="height: 100%; width: 90%">
                    <el-timeline style="margin-top: 20px">
                        <el-timeline-item v-if="(alarmanalysis6_params.alarmTime || '') != ''" :timestamp="alarmanalysis6_params.alarmTime" placement="top">
                            <el-card style="font-size: 14px">
                                <p>设备报警：{{ alarmanalysis6_params.alarmTime }}</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item v-for="(item, index) in sourcelist" :key="index" v-if="item.title != '被指派了报警工单' && item.lookup.targetObject != sourcelist[index - 1].lookup.targetObject" :timestamp="item.addtime" placement="top">
                            <el-card style="font-size: 14px">
                                <p>{{ item.targetObjectJob }}</p>
                                <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                    <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                    ><span>语音、短信通知成功</span>
                                </p>
                                <p v-else-if="item.verifyTime">处理人员：{{ item.verifier || '--' }} <br />处理描述：{{ item.result | confirmResultType }}</p>
                                <p v-else-if="item.confirmTime">处理人员：{{ item.confirmor || '--' }} <br />处理描述：{{ item.confirmResult | confirmResultType }}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-scrollbar>
                <div v-if="sourcelist.length < 1" style="text-align: center; padding: 100px 0">暂时无数据哦.....</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props: ['readyAlarmType'],
    data() {
        return {
            sourcelist: [],
            alarmanalysis6_params: null,
            timeRadio: '巡查处置时效',
            radio1: '已处理',
            firstPageData1: {},
            firstPageData2: {},
            showLeavel: 1,
            activeName: 'first',
            activeSenName: 'first',
            pager: {
                pageSize: 10,
                pageIndex: 1,
                total: null
            },
            pager2: {
                pageSize: 10,
                pageIndex: 1,
                total: null
            },
            tabitemindex: 0,
            tablist: [
                { name: '重大隐患', value: '2' },
                { name: '一般隐患', value: '1' }
            ],
            dialogFormVisible: true,
            dataTable: [],
            dataTable2: [],
            timeLineData: [],
            dellData: [],
            suddenData: [],
            checkData: [],
            riskData: [],
            alarmRadio: 'DAY',
            // manageRadio: 'DAY',
            suddenDataStatistic: {}, // 突发类事件统计
            manageDataStatistic: {}, // 管理类事件统计
            orderStateObj: {
                '01': '待受理',
                '02': '待确认',
                '03': '处理中',
                '04': '完成',
                '05': '忽略'
            },
            currentRow: {}
        };
    },
    watch: {},
    created() {},
    mounted() {
        console.log('pxpxp', this.readyAlarmType);
        if (this.readyAlarmType == 1) {
            this.activeName = 'first';
            this.getFirstData();
        } else {
            this.activeName = 'second';
            this.getFirstData();
        }
        let _self = this;
        // this.readyAlarmType==1?:
        // this.getList();
        // this.getTfEventData();
    },
    filters: {
        confirmResultType(val) {
            if (val == '01') return '误报';
            if (val == '02') return '真实报警';
            if (val == '03') return '故障';
        }
    },
    methods: {
        changeTabsSeco() {
            let _self = this;
            if (this.timeRadio == '巡查处置时效') {
                // 清空id的innerHTML
                // document.getElementById('lineChart3').innerHTML = '';
                _self._http({
                    url: '/api/web/indexCountTwo/countPatrolMinute',
                    type: 'get',
                    success: function (res) {
                        _self.checkData = res.data;
                        _self.drawLineChart2();
                    }
                });
            } else {
                // 隐患时效统计
                // document.getElementById('lineChart2').innerHTML = '';
                _self._http({
                    url: '/api/web/indexCountTwo/countRisksDay',
                    type: 'get',
                    success: function (res) {
                        _self.riskData = res.data;
                        _self.drawLineChart3();
                    }
                });
                // this.drawLineChart3();
            }
        },
        getTfEventData() {
            let _self = this;
            // 巡查巡检时效趋势图
            _self._http({
                url: '/api/web/indexCountTwo/countPatrolMinute',
                type: 'get',
                success: function (res) {
                    _self.checkData = res.data;
                    _self.$nextTick(() => {
                        _self.drawLineChart2();
                    });
                }
            });
            // 隐患时效统计
            _self._http({
                url: '/api/web/indexCountTwo/countRisksDay',
                type: 'get',
                success: function (res) {
                    _self.riskData = res.data;
                    _self.$nextTick(() => {
                        _self.drawLineChart3();
                    });
                }
            });
            // _self._http({
            //     url: '/api/web/indexCountTwo/earlyWarningStatistics',
            //     type: 'get',
            //     data: {
            //         option: 'DAY'
            //     },
            //     success: function (res) {
            //         _self.firstPageData1 = res.data;
            //     }
            // });
            // _self._http({
            //     url: '/api/web/indexCountTwo/earlyWarningStatistics',
            //     type: 'get',
            //     data: {
            //         option: 'MONTH'
            //     },
            //     success: function (res) {
            //         _self.firstPageData2 = res.data;
            //     }
            // });
        },
        showpage2() {
            this.showLeavel = 2;
            this.getList();
        },
        updateOrDeleteInfo(type, row) {
            this.showLeavel = 3;
            this.alarmanalysis6_params = row;
            this.getMessageList(row);
        },
        changeRadio(val) {
            this.getList();
        },
        changeTabsFirst(e) {
            let _self = this;
            // _self.alarmRadio = 'DAY'
            _self.getList();
            _self.getFirstData();
            if (_self.activeName == 'first') {
                _self.$nextTick(() => {
                    _self.drawLineChart1();
                });
            } else {
                console.log('second');
                setTimeout(() => {
                    _self.getTfEventData();
                }, 300);
                // setTimeout(() => {
                //     _self.drawPieChart1();
                //     _self.drawSu1();
                // }, 300);
                // _self.$nextTick(() => {
                //     _self.drawLineChart2();
                //     _self.drawLineChart3();
                // });
            }
        },
        getFirstData() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCountTwo/earlyWarningStatistics',
                type: 'get',
                data: {
                    option: _self.alarmRadio
                },
                success: function (res) {
                    _self.firstPageData1 = res.data;

                    if (_self.alarmRadio === 'DAY') {
                        _self.suddenData = [res.data.alarmsOver, res.data.alarms - res.data.alarmsOver];
                        _self.drawLineSuddenChart();
                    } else {
                        if (_self.activeName == 'second') {
                            _self.getTfEventData();
                        }
                    }

                    // _self.drawPieChart();
                    // _self.drawSu();
                }
            });
            /*  _self._http({
                url: '/api/web/indexCountTwo/managesStatistics',
                type: 'get',
                success: function (res) {
                    _self.firstPageData2 = res.data;
                    console.log('pxpxpx', _self.firstPageData2);
                    _self.drawPieChart1();
                    _self.drawSu1();
                }
            }); */
        },
        // todo
        drawLineSuddenChart() {
            console.log('哈哈哈哈哈哈哈哈', this.suddenData);
            var chartDom = document.getElementById('barChartSudden');
            var myChart = echarts.init(chartDom);
            var option;
            // dellData
            // average: 166
            // everyDay: "2022-09-01"
            let _xData = ['已处置', '未处置'];
            let _yData = this.suddenData;
            option = {
                tooltip: {
                    trigger: 'axis'
                    /* formatter: function (val) {
                        return '平均处理时效' + val[0].data + '分钟';
                    } */
                },
                legend: {
                    data: ['已处置', '未处置']
                },
                color: ['#5aa1fc', '#e16b2b'],
                xAxis: {
                    // type: 'category',
                    // boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
                },
                series: [
                    {
                        data: _yData,
                        type: 'bar'
                        // areaStyle: {
                        //     normal: {
                        //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        //             {
                        //                 offset: 0,
                        //                 color: '#2e486e'
                        //             },
                        //             {
                        //                 offset: 1,
                        //                 color: '#2e486e'
                        //             }
                        //         ])
                        //     }
                        // }
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        drawLineChart1() {
            var chartDom = document.getElementById('lineChart1');
            var myChart = echarts.init(chartDom);
            var option;
            // dellData
            // average: 166
            // everyDay: "2022-09-01"
            let _xData = [];
            let _yData = [];
            for (let i = 0; i < this.dellData.length; i++) {
                _xData.push(this.dellData[i].everyDay);
                _yData.push(this.dellData[i].average);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (val) {
                        return '平均处理时效' + val[0].data + '分钟';
                    }
                },
                color: ['#5aa1fc'],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
                },
                series: [
                    {
                        data: _yData,
                        type: 'line',
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
            option && myChart.setOption(option);
            console.log('pxpxpx1', option);
        },
        drawLineChart2() {
            var chartDom = document.getElementById('lineChart2');
            var myChart = echarts.init(chartDom);
            var option;
            // dellData
            // average: 166
            // everyDay: "2022-09-01"
            let _xData = [];
            let _yData = [];
            for (let i = 0; i < this.checkData.length; i++) {
                _xData.push(this.checkData[i].everyDay);
                _yData.push(this.checkData[i].average);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (val) {
                        return '平均处理时效' + val[0].data + '分钟';
                    }
                },
                color: ['#5aa1fc'],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}min',
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    min: 0,
                    max: 60,
                    interval: 20
                },
                series: [
                    {
                        data: _yData,
                        type: 'line',
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
            option && myChart.setOption(option);
            console.log('pxpxpx1', option);
        },
        drawLineChart3() {
            var chartDom = document.getElementById('lineChart3');
            var myChart = echarts.init(chartDom);
            var option;
            // dellData
            // average: 166
            // everyDay: "2022-09-01"
            let _xData = [];
            let _yData = [];
            for (let i = 0; i < this.riskData.length; i++) {
                _xData.push(this.riskData[i].everyDay);
                _yData.push(this.riskData[i].average);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (val) {
                        return '平均处理时效' + val[0].data + '分钟';
                    }
                },
                color: ['#5aa1fc'],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}天',
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    min: 0,
                    max: 60,
                    interval: 20
                },
                series: [
                    {
                        data: _yData,
                        type: 'line',
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
            option && myChart.setOption(option);
            console.log('pxpxpx1', option);
        },
        drawPieChart1() {
            var chartDom = document.getElementById('pieChart1');
            var myChart = echarts.init(chartDom);
            var option;
            // console.log(_self.firstPageData2)
            let _self = this;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                color: ['#5aa1fc', '#91ffe0'],
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 0, name: '巡查巡检超时' },
                            { value: 0, name: '隐患处理超时' }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
        },
        drawSu1() {
            var chartDom = document.getElementById('Su1');
            var myChart = echarts.init(chartDom);
            var option;
            let _self = this;
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['已处理', '未处理'],
                    textStyle: {
                        //图例⽂字的样式
                        color: '#fff'
                    }
                },
                color: ['#91ffe0', '#5aa1fc'],
                xAxis: [
                    {
                        type: 'category',
                        data: ['巡查巡检超时', '隐患处理超时'],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine: {
                            lineStyle: { color: '#fff' } // 坐标轴颜色
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: { color: '#fff' } // 坐标轴颜色
                        }
                    }
                ],
                series: [
                    {
                        name: '未处理',
                        type: 'bar',
                        data: [0]
                    },
                    {
                        name: '已处理',
                        type: 'bar',
                        data: [0]
                    }
                ]
            };

            option && myChart.setOption(option);
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
        tabitemchange(index) {
            this.tabitemindex = index;
            this.getList();
        },
        indexMethod(index) {
            let _self = this;
            if (_self.pager.pageIndex * _self.pager.pageSize > _self.dataTable.totalCount) {
                let tempIndex = index + 1 + _self.pager.pageSize * (_self.pager.pageIndex - 1);
                if (tempIndex < _self.dataTable.totalCount) {
                    return tempIndex;
                } else {
                    return _self.dataTable.totalCount;
                }
            } else {
                return index + 1 + _self.pager.pageSize * (_self.pager.pageIndex - 1);
            }
        },
        // todo
        getList() {
            console.log('_self.activeName:', this.activeSenName);
            let _self = this;
            _self.loading = true;
            _self.dataTable = [];
            _self._http({
                url: _self.activeSenName == 'first' ? '/api/web/indexCountTwo/findPatrols' : '/api/web/indexCountTwo/manageRisks',
                type: 'get',
                data: {
                    option: _self.alarmRadio,
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    handle: _self.radio1 == '已处理' ? true : false,
                    transform: 'U:handler;OW:owningSystem;B:building;F:floor;ES:owningSystem,U:dispatcher,taker,verifier',
                    sorts: 'addtime:desc'
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        },
        // todo
        getList2() {
            let _self = this;
            _self.loading = true;
            _self.dataTable2 = [];
            _self._http({
                url: _self.activeSenName == 'first' ? '/api/web/indexCountTwo/findPatrols' : '/api/web/indexCountTwo/manageRisks',
                type: 'get',
                data: {
                    size: _self.pager2.pageSize,
                    current: _self.pager2.pageIndex,
                    handle: _self.radio1 == '已处理' ? true : false,
                    transform: 'U:handler;OW:owningSystem;B:building;F:floor;ES:owningSystem,U:dispatcher,taker,verifier',
                    sorts: 'addtime:desc'
                },
                success: function (res) {
                    _self.dataTable2 = res.data.records;
                    _self.pager2.total = res.data.total;
                    _self.loading = false;
                }
            });
        },
        changeSenName({ name }) {
            const _self = this;
            console.log('activeName', name);
            if (name === 'first') {
                _self.getList();
            } else if (name === 'second') {
                _self.getList2();
            }
        },
        alarmRadioChange(val) {
            let _self = this;
            _self.alarmRadio = val;

            // if (val == 'DAY') {
            _self.getFirstData();
            // }
            if (val == 'MONTH') {
                _self.$nextTick(() => {
                    _self.getcountAlarmMinute();
                });
            }
        },
        getcountAlarmMinute() {
            let _self = this;
            // 当月平均处置时效趋势图
            _self._http({
                url: '/api/web/indexCountTwo/countAlarmMinute',
                type: 'get',
                success: function (res) {
                    _self.dellData = res.data;
                    _self.$nextTick(() => {
                        _self.drawLineChart1();
                    });
                }
            });
        },
        manageRadioChange(val) {
            const _self = this;
            _self.alarmRadio = val;
            _self.getFirstData();
            // 当天 todo
            if (val === 'DAY') {
                // todo
                _self.getTfEventData();
            }
            // 当月
            else if (val === 'MONTH') {
                _self.getTfEventData();
            }
        },
        showTableList() {
            this.showLeavel = 2;
            this.getList();
        },
        getMessageList(row) {
            const _self = this;
            _self._http({
                url: '/api/web/indexCountTwo/findMessages',
                type: 'get',
                data: {
                    sourceId: row.id,
                    transform: 'U:targetObject'
                },
                success: function (res) {
                    // _self.timeLineData = [{ targetObjectJob: '' }];
                    // let sorlist = _self.sortKey(res.data.records, 'messageDate');
                    // _self.timeLineData.push(...sorlist);
                    _self.currentRow = row;

                    _self.sourcelist = res.data.records || [];
                    if ((_self.alarmanalysis6_params.verifyTime || '') != '') {
                        _self.sourcelist.push({
                            addtime: _self.alarmanalysis6_params.verifyTime,
                            verifyTime: _self.alarmanalysis6_params.verifyTime,
                            lookup: {
                                targetObject: _self.alarmanalysis6_params.lookup.verifier
                            },
                            verifier: _self.alarmanalysis6_params.lookup.verifier,
                            result: _self.alarmanalysis6_params.result
                        });
                    }
                    if ((_self.alarmanalysis6_params.confirmTime || '') != '') {
                        _self.sourcelist.push({
                            addtime: _self.alarmanalysis6_params.confirmTime,
                            confirmTime: _self.alarmanalysis6_params.confirmTime,
                            lookup: {
                                targetObject: _self.alarmanalysis6_params.lookup.confirmor
                            },
                            confirmor: _self.alarmanalysis6_params.lookup.confirmor,
                            confirmResult: _self.alarmanalysis6_params.confirmResult
                        });
                    }
                    console.log(_self.sourcelist);
                    _self.sourcelist = _self.sourcelist.sort((a, b) => {
                        return a.addtime > b.addtime ? 1 : -1;
                    });
                }
            });
        },
        sortKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="scss">
.classReadyDialog {
    box-sizing: border-box;
    .el-scrollbar__wrap {
        margin-right: -30px !important;
    }
    .headerCon {
        // background-color: #2b4b6b;
        // 从左至右渐变色

        // background: linear-gradient(to right, red 0%, #2b4b6b 100%);
        padding: 0 10px;
    }
    .el-input__inner {
        background-color: transparent !important;
        border-color: #6f7682 !important;
    }
    .pagination-container button,
    .pagination-container li {
        background-color: transparent !important;
        border: none !important;
    }
    .tabelCon {
        background-color: #1e2841;
        .el-table th,
        .el-table td,
        .el-table--border {
            background-color: #1e2841 !important;
            border: none !important;
        }
        .el-table td {
            color: #fff;
        }
        .el-table::before {
            background-color: #1e2841 !important;
        }
        .el-table--border::after {
            width: 0 !important;
        }
    }
    .numColorN {
        font-weight: normal;
        font-size: 56px;
        line-height: 56px;
        background: linear-gradient(180deg, #ffffff 0%, #3ca2f8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .el-card {
        background-color: #232c47 !important;
        color: #fff !important;
        border: none !important;
    }
    .el-radio-group .is-active .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #3869a4 !important;
        border-color: #3869a4 !important;
    }
    // .tabelCon {
    //     tr,
    //     th {
    //         border: none !important;
    //         background-color: #1e2231 !important;
    //     }
    //     .hover-row {
    //         background-color: #1e2231 !important;
    //     }
    //     .el-table--group::after,
    //     .el-table--border::after,
    //     .el-table::before {
    //         opacity: 0;
    //     }
    //     .el_table .el-table::before {
    //         height: 0;
    //     }
    //     .el-table--border {
    //         border: none !important;
    //     }
    //     .el-table tbody tr:hover > td {
    //         background-color: #fff;
    //     }
    //     .el-table tbody tr:hover > td {
    //         background-color: transparent !important;
    //     }
    //     // 如果td没有颜色，可以去掉，这里加上保险
    //     .el-table__body tr.hover-row > td {
    //         background-color: transparent;
    //     }
    // }

    .alarm-radio-com {
        padding: 8px 0;
    }
}

.alertModel {
    .el-dialog__header {
        display: none !important;
    }
    .el-dialog {
        border-radius: 8px !important;
        // overflow: hidden;
    }
    .el-tabs__item.is-active {
        color: #fff !important;
    }
    .el-tabs__item {
        color: #fff !important;
    }
    .el-dialog__body {
        padding: 0 !important;
        border-radius: 8px !important;
        // overflow: hidden;
        border: none;
    }
}
</style>
