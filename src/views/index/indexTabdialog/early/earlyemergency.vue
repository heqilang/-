<template>
    <div class="classReadyDialog">
        <div v-show="showLeavel == 1" class="firstLevel">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <span style="cursor: pointer">
                    <span>{{ (alarmRadio === 'DAY' ? '当日' : '当月') + (activeName == 'first' ? '突发类' : '管理类') }}</span
                    >事件预警列表
                </span>
                <a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a>
            </div>
            <div class="classReadyDialogBox">
                <div class="firstLevel">
                    <div style="color: #fff; padding: 12px">
                        <el-row>
                            <el-col :span="10">
                                <div class="alarmanalysis1Title">
                                    <div @click="showLeavelchage('0')">
                                        <div style="display: flex; justify-content: space-around">
                                            <p>{{ alarmRadio === 'DAY' ? '当日' : '当月' }}突发类事件预警</p>
                                            <p>
                                                <span style="color: #a0d1fa">{{ firstPageData1.alarms || 0 }}</span> 次
                                            </p>
                                        </div>
                                    </div>
                                    <div @click="showLeavelchage('true')">
                                        <!-- justify-content: space-around -->
                                        <div style="display: flex; justify-content: space-around">
                                            <p>{{ alarmRadio === 'DAY' ? '当日' : '当月' }}已处置数</p>
                                            <p>
                                                <span style="color: #a0d1fa; margin-left: 25px">{{ firstPageData1.alarmsOver || 0 }}</span> 个
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div style="height: 200px" id="barChartSudden"></div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div v-show="alarmRadio === 'MONTH'">
                    <div style="height: 150px; width: 100%" id="lineChart1"></div>
                </div>
            </div>
        </div>

        <div v-if="showLeavel == 1" style="padding: 0 30px">
            <el-row>
                <el-col :span="24">
                    <div style="margin-bottom: 12px">
                        <el-radio-group v-model="chartRadio1" @change="tabitemchange" size="mini">
                            <el-radio-button label="0">突发类事件预警</el-radio-button>
                            <el-radio-button label="true">已处置</el-radio-button>
                            <el-radio-button label="false">未处置</el-radio-button>
                        </el-radio-group>
                    </div>
                    <el-table class="xf-table" :data="dataTable" height="380">
                        <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                        <el-table-column prop="waringInfo" label="预警信息" width="160" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="sendTime" label="预警时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="sendName" label="预警人员" width="160" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <!-- <div>{{ scope.row.sendName.slice(scope.row.sendName.length - 3, scope.row.sendName.length) }}</div> -->
                                <div>{{ scope.row.sendName.split(':')[scope.row.sendName.split(':').length - 1] }}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="equipmentState" label="报警类型" width="140">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.alarmType">{{ scope.row.alarmType | alarmStateType }}</div>
                                    <div v-else>--</div>
                                </template>
                            </el-table-column> -->
                        <!-- <el-table-column prop="equipmentName" label="设备类型" :show-overflow-tooltip="true"></el-table-column> -->
                        <el-table-column prop="unitName" label="预警位置" :show-overflow-tooltip="true"> </el-table-column>

                        <el-table-column prop="completeStatus" label="处置状态" width="120">
                            <template slot-scope="scope">
                                <div v-if="scope.row.completeStatus">{{ scope.row.completeStatus == '1' ? '处置中' : scope.row.completeStatus == '2' ? '处置完毕' : '待处置' }}</div>
                                <div v-else>--</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="times" label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <!-- <i class="el-icon-edit fs-16"></i>  -->
                                <el-button type="text" size="mini" @click="updateOrDeleteInfo('update1', scope.row)"> 查看 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="text_c mar-t-18 backColorPage" style="padding-bottom: 15px">
                        <!-- 分页 -->
                        <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                        <div v-else style="height: 32px"></div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div v-if="showLeavel == 2" class="seacondLeavel" style="background-color: #2b4b6b; color: #fff">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <span style="cursor: pointer">
                    <span>{{ (alarmRadio === 'DAY' ? '当日' : '当月') + (activeName == 'first' ? '突发类' : '管理类') }}</span
                    >事件预警列表
                </span>
                <!-- <a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a> -->
                <span @click="showLeavel = 1" style="float: right; margin-right: 20px; cursor: pointer">
                    <i class="el-icon-d-arrow-left"></i>
                </span>
            </div>
            <el-row style="padding: 20px">
                <el-col :span="24">
                    <div style="margin-bottom: 12px">
                        <el-radio-group v-model="chartRadio1" @change="tabitemchange" size="mini">
                            <el-radio-button label="0">突发类事件预警</el-radio-button>
                            <el-radio-button label="true">已处置</el-radio-button>
                            <el-radio-button label="false">未处置</el-radio-button>
                        </el-radio-group>
                    </div>
                    <el-table class="xf-table" :data="dataTable" height="340">
                        <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                        <el-table-column prop="waringInfo" label="预警信息" width="160" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="sendTime" label="预警时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column label="预警人员" width="160" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <!-- <div>{{ scope.row.sendName.slice(scope.row.sendName.length - 3, scope.row.sendName.length) }}</div> -->
                                <div>{{ scope.row.sendName.split(':')[scope.row.sendName.split(':').length - 1] }}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="equipmentState" label="报警类型" width="140">
                            <template slot-scope="scope">
                                <div v-if="scope.row.alarmType">{{ scope.row.alarmType | alarmStateType }}</div>
                                <div v-else>--</div>
                            </template>
                        </el-table-column> -->
                        <!-- <el-table-column prop="equipmentName" label="设备类型" :show-overflow-tooltip="true"></el-table-column> -->
                        <el-table-column prop="unitName" label="预警位置" :show-overflow-tooltip="true"> </el-table-column>

                        <el-table-column prop="completeStatus" label="处置状态" width="120">
                            <template slot-scope="scope">
                                <div v-if="scope.row.completeStatus">{{ scope.row.completeStatus == '1' ? '处置中' : scope.row.completeStatus == '2' ? '处置完毕' : '待处置' }}</div>
                                <div v-else>--</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="times" label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <!-- <i class="el-icon-edit fs-16"></i> -->
                                <el-button type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> 查看 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="text_c mar-t-18 backColorPage">
                        <!-- 分页 -->
                        <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                        <div v-else style="height: 32px"></div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div v-if="showLeavel == 3" class="secendLevel" style="background-color: #2b4b6b; color: #fff">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <span style="cursor: pointer">
                    <!-- <span>{{ (alarmRadio === 'DAY' ? '当日' : '当月') + (activeName == 'first' ? '突发类' : '管理类') }}</span
                    >事件预警 -->
                    <span>{{ activeName == 'first' ? '突发类' : '管理类' }}</span
                    >事件预警
                </span>
                <!-- <a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a> -->
                <span v-if="changFather" @click="showLeavel = 2" style="float: right; margin-right: 20px; cursor: pointer">
                    <i class="el-icon-d-arrow-left"></i>
                </span>
                <span v-else @click="showLeavel = 1" style="float: right; margin-right: 20px; cursor: pointer">
                    <i class="el-icon-d-arrow-left"></i>
                </span>
            </div>
            <!-- <div class="diaHeadStandardC" style="height: 46px; background-color: #2b4b6b; line-height: 46px; padding-left: 12px; color: #fff">
                <span style="cursor: pointer">
                    {{ activeName == 'first' ? '突发类事件预警' : '管理类事件预警' }}
                </span>
            </div> -->
            <div style="background: linear-gradient(to right bottom, #192640, #213d60) !important; padding: 30px">
                <div>
                    <div style="display: flex">
                        <div>预警时间：</div>
                        <div>{{ alarmanalysis6_params.sendTime }}</div>
                    </div>
                    <div style="display: flex">
                        <div>预警位置：</div>
                        <div>{{ alarmanalysis6_params.unitName }}</div>
                    </div>
                </div>
                <div class="box2">流程追溯</div>
                <el-scrollbar v-if="sourcelist.length > 0" style="height: 100%; width: 90%">
                    <el-timeline style="margin-top: 20px">
                        <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.lineDate" placement="top">
                            <el-card style="font-size: 14px">
                                <p v-if="(item.alarmDate || '') != ''">{{ '设备报警' }}：{{ item.alarmDate }}</p>
                                <p v-else-if="(item.dealName || '') != ''">
                                    处置人员：{{ item.dealName }} {{ item.dealPhone }}<br />
                                    处置描述：{{ item.dealDesc }}
                                </p>
                                <p v-else-if="(item.pushUserName || '') != ''">
                                    <span style="display: block">{{ item.orgPushDesc }}</span>
                                    <span style="display: flex; justify-content: space-between">
                                        <span>{{ item.pushUserName }} {{ item.pushPhone }}</span
                                        ><span>{{ item.pushResult == '短信推送成功' ? '语音、短信通知成功' : item.pushResult }}</span>
                                    </span>
                                </p>
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
    props: ['readyAlarmType', 'alarmRadiofu'],
    data() {
        return {
            changFather: true,
            chartRadio1: '0',
            warninginformation: '您好，这里是消防控制中心，您有一条报警信息，已超时未处置，请您及时确认，以免造成更大损失。',
            sourcelist: [],
            alarmanalysis6_params: null,
            timeRadio: '巡查处置时效',
            radio1: '已处置',
            firstPageData1: {},
            firstPageData2: {},
            showLeavel: 1,
            activeName: 'first',
            activeSenName: 'first',
            pager: {
                pageSize: 5,
                pageIndex: 1,
                total: null
            },
            pager2: {
                pageSize: 5,
                pageIndex: 1,
                total: null
            },
            tabitemindex: 0,
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
                '03': '处置中',
                '04': '完成',
                '05': '忽略'
            },
            currentRow: {}
        };
    },
    watch: {},
    created() {},
    filters: {
        equipmentStateType(val) {
            if (val == '1') return '正常';
            if (val == '2') return '故障';
            if (val == '3') return '离线';
            if (val == '4') return '预警';
            if (val == '9') return '火警';
        },
        alarmStateType(val) {
            if (val == '0') return '无';
            if (val == '6') return '温度高报';
            if (val == '7') return '温度低报';
            if (val == '8') return '压力高报';
            if (val == '9') return '压力低报';
            if (val == '10') return '液位高报';
            if (val == '11') return '液位低报';
            if (val == '12') return '主电故障';
            if (val == '13') return '备电故障';
            if (val == '14') return '总线故障';
            if (val == '15') return '总线短路';
            if (val == '16') return '短路';
            if (val == '17') return '开路';
            if (val == '18') return '漏电高报';
            if (val == '19') return '漏电低报';
            if (val == '20') return '电流高报';
            if (val == '21') return '电流低报';
            if (val == '22') return '断线';
        },
        confirmResultType(val) {
            if (val == '01') return '误报';
            if (val == '02') return '真实报警';
            if (val == '03') return '故障';
        }
    },
    mounted() {
        this.alarmRadio = this.alarmRadiofu; //当日、当月
        if (this.alarmRadiofu == 'MONTH') {
            this.$nextTick(() => {
                this.getcountAlarmMinute();
            });
        }
        if (this.readyAlarmType == 1) {
            this.activeName = 'first';
            this.getFirstData();
        } else {
            this.activeName = 'second';
            this.getFirstData();
        }
        this.getList();
    },
    methods: {
        closeDialog() {
            this.$emit('update:visible', false);
            // this.turntopage('alarmanalysis1');
        },
        showLeavelchage(value) {
            this.showLeavel = 2;
            this.chartRadio1 = value;
            this.getList();
        },
        updateOrDeleteInfo(type, row) {
            console.log('点击参数');
            console.log(row);

            this.showLeavel = 3;
            this.alarmanalysis6_params = row;
            if (type == 'update1') {
                this.changFather = false;
            } else {
                this.changFather = true;
            }

            // this.getMessageList(row);
            this.getfindMessages(row);
        },
        getFirstData() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCountV3/earlyWarningStatistics', ///api/web/indexCountTwo/earlyWarningStatistics
                type: 'get',
                data: {
                    option: _self.alarmRadio
                },
                success: function (res) {
                    _self.firstPageData1 = res.data;
                    _self.suddenData = [res.data.alarms, res.data.alarmsOver];
                    _self.drawLineSuddenChart();
                }
            });
        },
        // 留
        drawLineSuddenChart(val) {
            let changLengthLeft = '',
                changLengthriht = '';
            if (val == 'false') {
                changLengthLeft = false;
                changLengthriht = false;
            } else if (val == 'true') {
                changLengthLeft = false;
                changLengthriht = true;
            } else {
                changLengthLeft = true;
                changLengthriht = true;
            }
            let _self = this;
            var chartDom = document.getElementById('barChartSudden');
            var myChart = echarts.init(chartDom);
            var option;
            let _xData = ['突发类事件预警', '已处置数'];
            let _yData = this.suddenData;
            option = {
                title: {
                    text: '',
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'bolder',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    trigger: 'item'
                    // formatter: '时段：{b0}<br />设备警告：{c0} 次'
                },
                legend: {
                    data: ['突发类事件预警', '已处置数'],
                    right: '5%',
                    textStyle: {
                        color: '#ffffff'
                    },
                    icon: 'circle',
                    selected: { 突发类事件预警: changLengthLeft, 已处置数: changLengthriht }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                //  color: ['#25A6FF', '#E7745B'],
                color: ['#e16b2b', '#178cea'],
                xAxis: {
                    type: 'category',
                    data: ['数量'],
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
                        name: '突发类事件预警',
                        data: [_yData[0] || 0], // [{value:leftDataTop.monthAlarms || 0,name:'设备报警数量'}]
                        type: 'bar',
                        barMaxWidth: 20
                    },
                    {
                        name: '已处置数',
                        data: [_yData[1] || 0], // [{value:leftDataTop.monthAlarmsOver || 0,name:'报警处置数量'}]
                        type: 'bar',
                        barMaxWidth: 20
                    }
                ]
            };
            option && myChart.setOption(option);
            myChart.on('click', (d) => {
                // console.log(d);
                _self.showLeavel = 2;
                d.seriesIndex == 0 ? (_self.chartRadio1 = '0') : (_self.chartRadio1 = 'true');
                this.getList();
            });
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
                title: {
                    text: '当月平均处置时效',
                    textStyle: {
                        fontSize: '14',
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (val) {
                        return '平均处置时效' + val[0].data + '分钟';
                    }
                },
                grid: {
                    top: '25%',
                    left: '0%',
                    right: '5%',
                    bottom: '0%',
                    containLabel: true
                },
                color: ['#5aa1fc'],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
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
                    }
                },
                series: [
                    {
                        data: _yData,
                        type: 'line',
                        smooth: true,
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
        tabitemchange(val) {
            this.chartRadio1 = val;
            this.getList();
            this.drawLineSuddenChart(val);
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
        // 留
        getList() {
            let _self = this;
            _self.loading = true;
            _self.dataTable = [];
            let searchObj = {
                option: _self.alarmRadio,
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                handle: _self.chartRadio1 == '0' ? '' : _self.chartRadio1,
                transform: 'U:handler;OW:owningSystem;B:building;F:floor;ES:owningSystem,U:dispatcher,taker,verifier',
                sorts: 'addtime:desc'
            };
            //删除空值
            for (let key in searchObj) {
                if (searchObj[key] == '') {
                    delete searchObj[key];
                }
            }
            _self._http({
                // url: '/api/web/indexCountTwo/findAlarms',
                url: '/api/web/indexCountV3/findAlarms',
                type: 'get',
                data: searchObj,
                success: function (res) {
                    res.data.records.sort((a, b) => {
                        return new Date(b.sendTime) - new Date(a.sendTime);
                    });
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        },
        // 留
        getcountAlarmMinute() {
            let _self = this;
            // 当月平均处置时效趋势图
            _self._http({
                // url: '/api/web/indexCountTwo/countAlarmMinute',
                url: '/api/web/indexCountV3/countAlarmMinute',
                type: 'get',
                success: function (res) {
                    res.data.forEach((item) => {
                        item.everyDay = item.everyDay.slice(5, 10);
                    });

                    _self.dellData = res.data;
                    _self.$nextTick(() => {
                        _self.drawLineChart1();
                    });
                }
            });
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
        },
        getfindMessages(val) {
            let _self = this;
            _self.sourcelist = [];
            _self._http({
                url: '/api/web/indexCountV3/findDwMessages', ///api/web/indexCountTwo/findMessages
                type: 'get',
                isBody: true,
                data: {
                    waringId: val.waringRecordId
                    // sourceId: val.id,
                    // transform: 'U:targetObject'
                },
                success: function (res) {
                    _self.sourcelist = res.data.data || [];
                    // let arr = [];
                    // _self.sourcelist.forEach((item, index) => {
                    //     item.targetObjectJob = item.targetObjectJob || '';
                    //     if (item.targetObjectJob.indexOf('责任人') == -1) {
                    //         item.show = false;
                    //     } else {
                    //         let has = false;
                    //         for (let i = 0; i < arr.length; i++) {
                    //             if (item.targetObjectJob == arr[i]) {
                    //                 has = true;
                    //                 break;
                    //             }
                    //         }
                    //         if (!has) {
                    //             item.show = true;
                    //             arr.push(item.targetObjectJob);
                    //         } else {
                    //             item.show = false;
                    //         }
                    //     }
                    // });
                    // if ((_self.alarmanalysis6_params.verifyTime || '') != '') {
                    //     _self.sourcelist.push({
                    //         addtime: _self.alarmanalysis6_params.verifyTime,
                    //         verifyTime: _self.alarmanalysis6_params.verifyTime,
                    //         lookup: {
                    //             targetObject: _self.alarmanalysis6_params.lookup.verifier
                    //         },
                    //         verifier: _self.alarmanalysis6_params.lookup.verifier,
                    //         result: _self.alarmanalysis6_params.result,
                    //         title: '',
                    //         verifierPhone: _self.alarmanalysis6_params.verifierPhone || '',
                    //         show: true
                    //     });
                    // }
                    // if ((_self.alarmanalysis6_params.confirmTime || '') != '') {
                    //     _self.sourcelist.push({
                    //         addtime: _self.alarmanalysis6_params.confirmTime,
                    //         confirmTime: _self.alarmanalysis6_params.confirmTime,
                    //         lookup: {
                    //             targetObject: _self.alarmanalysis6_params.lookup.confirmor
                    //         },
                    //         confirmor: _self.alarmanalysis6_params.lookup.confirmor,
                    //         confirmResult: _self.alarmanalysis6_params.confirmResult,
                    //         confirmorPhone: _self.alarmanalysis6_params.confirmorPhone || '',
                    //         title: '',
                    //         show: true
                    //     });
                    // }
                    // _self.sourcelist = _self.sourcelist.sort((a, b) => {
                    //     return a.addtime > b.addtime ? 1 : -1;
                    // });
                }
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

.box2 {
    color: rgb(255, 255, 255);
    font-size: 16px;
    padding: 30px 20px;
}
.box2::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #25a6ff;
    margin-left: -12px;
    margin-top: 2px;
    border-radius: 2px;
}
</style>
