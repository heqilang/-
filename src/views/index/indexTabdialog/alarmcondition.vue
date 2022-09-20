<template>
    <!-- <div class="classReadyDialog" @click="showequipment"> -->
    <div class="classReadyDialog">
        <div v-if="showanalysis == 'alarmanalysis1'">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div class="classReadyDialogBox">
                <div class="firstLevel" v-show="showAlarm1Day">
                    <!-- <div class="headerCon">当日设备报警</div> -->
                    <el-row>
                        <el-col :span="10">
                            <div class="alarmanalysis1Title">
                                <div @click="turntopage('alarmanalysis2', 'overLevel')">
                                    <div style="display: flex; justify-content: space-around">
                                        <p>当日设备报警数量</p>
                                        <p>
                                            <span style="color: #a0d1fa">{{ leftDataTop.dayAlarms || 0 }}</span> 次
                                        </p>
                                    </div>
                                </div>
                                <div @click="turntopage('alarmanalysis2', 'overLevel1')">
                                    <div style="display: flex; justify-content: space-around">
                                        <p>当日报警处置数量</p>
                                        <p>
                                            <span style="color: #a0d1fa">{{ leftDataTop.dayAlarmsOver || 0 }}</span> 个
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div style="height: 200px" id="quxianChart1"></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div style="margin-bottom: 12px">
                                <el-radio-group v-model="chartRadio1" @change="tabitemchange" size="mini">
                                    <el-radio-button label="设备报警数量">
                                        <!-- <i class="el-icon-s-grid"></i> -->
                                    </el-radio-button>
                                    <el-radio-button label="报警处置数量">
                                        <!-- <i class="el-icon-s-data"></i> -->
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <el-table class="xf-table" :data="dataTable" height="345">
                                <el-table-column label="序号" align="center" width="50">
                                    <template slot-scope="scope">
                                        {{ (pager.pageIndex - 1) * pager.pageSize + scope.$index + 1 }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="alarmTime" label="报警时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
                                <el-table-column prop="equipmentState" label="报警类型" width="140">
                                    <template slot-scope="scope">
                                        <!--  <div v-if="scope.row.alarmType">{{ scope.row.alarmType | alarmStateType }}</div>
                                        <div v-else>--</div> -->
                                        <div>{{ scope.row.alarmType }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="equipmentName" label="设备类型" width="140" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <span>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="building" label="报警位置" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <!-- <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }} - {{ scope.row.lookup.floor }} - {{ scope.row.address }}</div>
                                        <div v-else>--</div> -->
                                        <div>{{ scope.row.alarmLocation }}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="state" label="处置状态" width="120">
                                    <template slot-scope="scope">
                                        <!-- <div v-if="scope.row.state">{{ scope.row.state == '02' ? '未处置' : '处置完毕' }}</div>
                                        <div v-else>--</div> -->
                                        <div>{{ scope.row.alarmStatus == '1' ? '处置中' : scope.row.alarmStatus == '2' ? '已处置' : '未处置' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="times" label="操作" width="80" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="viewchange(scope.row, '设备报警情况')"> 查看 </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="text_c mar-t-18 backColorPage">
                                <!-- 分页 -->
                                <customPaginationNoSizes v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPaginationNoSizes>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="firstLevel" v-show="!showAlarm1Day">
                    <el-row>
                        <el-col :span="10">
                            <div class="alarmanalysis1Title">
                                <div @click="turntopage('alarmanalysis2', 'overLevel')">
                                    <div style="display: flex; justify-content: space-around">
                                        <p>当月设备报警数量</p>
                                        <p>
                                            <span style="color: #a0d1fa">{{ leftDataTop.monthAlarms || 0 }}</span> 次
                                        </p>
                                    </div>
                                </div>
                                <div @click="turntopage('alarmanalysis2', 'overLevel1')">
                                    <div style="display: flex; justify-content: space-around">
                                        <p>当月报警处置数量</p>
                                        <p>
                                            <span style="color: #a0d1fa">{{ leftDataTop.monthAlarmsOver || 0 }}</span> 个
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <el-row>
                                <el-col :span="24">
                                    <div style="height: 200px" id="dangyeCharts1"></div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <div style="margin-bottom: 12px">
                        <el-radio-group v-model="chartRadio1" @change="tabitemchange" size="mini">
                            <el-radio-button label="设备报警数量">
                                <!-- <i class="el-icon-s-grid"></i> -->
                            </el-radio-button>
                            <el-radio-button label="报警处置数量">
                                <!-- <i class="el-icon-s-data"></i> -->
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                    <el-table class="xf-table" :data="dataTable" height="345">
                        <el-table-column label="序号" align="center" width="50">
                            <template slot-scope="scope">
                                {{ (pager.pageIndex - 1) * pager.pageSize + scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="alarmTime" label="报警时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="equipmentState" label="报警类型" width="140">
                            <template slot-scope="scope">
                                <!--   <div v-if="scope.row.alarmType">{{ scope.row.alarmType | alarmStateType }}</div>
                                <div v-else>--</div> -->
                                <div>{{ scope.row.alarmType }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="equipmentName" label="设备类型" width="140" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="building" label="报警位置" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <!-- <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }} - {{ scope.row.lookup.floor }} - {{ scope.row.address }}</div>
                                <div v-else>--</div> -->
                                <div>{{ scope.row.alarmLocation }}</div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="state" label="处置状态" width="120">
                            <template slot-scope="scope">
                                <!-- <div v-if="scope.row.state">{{ scope.row.state == '02' ? '未处置' : '处置完毕' }}</div>
                                <div v-else>--</div> -->
                                <div>{{ scope.row.alarmStatus == '1' ? '处置中' : scope.row.alarmStatus == '2' ? '已处置' : '未处置' }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="times" label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="viewchange(scope.row, '设备报警情况')"> 查看 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="text_c mar-t-18 backColorPage">
                        <!-- 分页 -->
                        <customPaginationNoSizes v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPaginationNoSizes>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showanalysis == 'alarmanalysis2'">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis1')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div class="classReadyDialogBox">
                <div class="firstLevel" v-show="showAlarm1Day">
                    <div class="headerCon">{{ overLevel == true ? '当日报警处置' : '当日设备报警' }}</div>
                    <div style="color: #fff; padding: 12px">
                        <el-row>
                            <el-col :span="12">
                                <div style="height: 400px" id="quxianChart"></div>
                            </el-col>
                            <el-col :span="12">
                                <div style="height: 400px" id="ripieChart"></div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="firstLevel" v-show="!showAlarm1Day">
                    <div class="headerCon">
                        {{ overLevel == true ? '当月报警处置' : '当月设备报警' }}
                        <el-switch style="float: right" v-model="Month30" active-color="#25A6FF" inactive-color="#25A6FF" active-text="近30天" inactive-text="当月" @change="handleMonthChange"> </el-switch>
                    </div>
                    <div style="color: #fff; padding: 12px">
                        <el-row>
                            <el-col :span="14">
                                <div style="height: 400px" id="dangyeCharts"></div>
                            </el-col>
                            <el-col :span="10">
                                <div style="height: 400px" id="dangyeploucCharts"></div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showanalysis == 'alarmanalysis3'">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis2')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div class="classReadyDialogBox">
                <div class="firstLevel">
                    <div style="color: #fff; padding: 12px">
                        <div style="display: flex; justify-content: center">
                            <div v-for="(item, index) in MONTHcountByType.number" :key="index" @click="analysischange('alarmanalysis4', item, chartRadio == '当日' ? 'DAY' : 'MONTH')" style="margin: 0 10px; text-align: center; padding: 30px; background-image: linear-gradient(to bottom, #162542, #1a3d63)">
                                <div style="line-height: 30px">{{ item.name || '--' }}</div>
                                <div style="color: #ffffff">
                                    <span class="numColorN">{{ item.value }}</span> 个
                                </div>
                            </div>
                        </div>
                        <el-row align="middle">
                            <el-col :span="14">
                                <div style="height: 350px" id="dangyuepieCharts"></div>
                                <div style="text-align: center; font-size: 16px">{{ floorname }}报警</div>
                                <div style="text-align: center">
                                    <span class="numColorN" style="font-size: 30px">{{ floornamenumber }}</span
                                    >个
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="textBox">
                                    <div class="textBox1" v-for="(item, index) in MONTHcountByType.number" :key="index">
                                        <!-- @click="turntopage('alarmanalysis4')" -->
                                        <span><i :style="{ backgroundColor: colors[index] }"></i>{{ item.name }}</span
                                        ><span>{{ item.value }}</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showanalysis == 'alarmanalysis4'">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis3')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div class="classReadyDialogBox">
                <div class="firstLevel">
                    <div class="headerCon">设备类型</div>
                    <div style="color: #fff">
                        <el-row>
                            <el-col :span="12">
                                <div style="height: 450px" id="EquipmentCharts"></div>
                            </el-col>
                            <el-col :span="12">
                                <div class="textBox">
                                    <div class="textBox1" v-for="(item, index) in equipmentTypeList" :key="index" @click="EchartsChange(index)">
                                        <!-- @click="turntopage('alarmanalysis5', item.equipmentType)" -->
                                        <span><i :style="{ backgroundColor: colors[index] }"></i>{{ item.name }}</span
                                        ><span>{{ item.value }}</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showanalysis == 'alarmanalysis5'">
            <div class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis2')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div class="classReadyDialogBox">
                <a class="returnbtn1" @click="turntopage('alarmanalysis2')"><i class="el-icon-pie-chart"></i>图表模式</a>
                <div style="margin-bottom: 12px">
                    <el-radio-group v-model="chartRadio" @change="tabitemchange" size="mini">
                        <el-radio-button label="当日">
                            <!-- <i class="el-icon-s-grid"></i> -->
                        </el-radio-button>
                        <el-radio-button label="当月">
                            <!-- <i class="el-icon-s-data"></i> -->
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <div style="overflow: auto">
                    <el-table class="xf-table" :data="dataTable" height="650">
                        <el-table-column label="序号" align="center" width="50">
                            <template slot-scope="scope">
                                {{ (pager.pageIndex - 1) * pager.pageSize + scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="alarmTime" label="报警时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="equipmentState" label="报警类型" width="140">
                            <template slot-scope="scope">
                                <!--   <div v-if="scope.row.alarmType">{{ scope.row.alarmType | alarmStateType }}</div>
                                <div v-else>--</div> -->
                                <div>{{ scope.row.alarmType }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="equipmentName" label="设备类型" width="140" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="building" label="报警位置" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <!-- <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }} - {{ scope.row.lookup.floor }} - {{ scope.row.address }}</div>
                                <div v-else>--</div> -->
                                <div>{{ scope.row.alarmLocation }}</div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="state" label="处置状态" width="120">
                            <template slot-scope="scope">
                                <!-- <div v-if="scope.row.state">{{ scope.row.state == '02' ? '未处置' : '处置完毕' }}</div>
                                <div v-else>--</div> -->
                                <div>{{ scope.row.alarmStatus == '1' ? '处置中' : scope.row.alarmStatus == '2' ? '已处置' : '未处置' }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="times" label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="viewchange(scope.row, '设备报警情况')"> 查看 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="text_c mar-t-18 backColorPage">
                        <!-- 分页 -->
                        <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showanalysis == 'alarmanalysis6'">
            <div v-show="!_self.isLevel1" class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis5')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div v-show="_self.isLevel1" class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis1')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close"></i></a><span>报警情况</span>
            </div>
            <div class="classReadyDialogBox">
                <div class="eventMsgInfo">
                    <div class="box1">
                        <div v-if="alarmanalysis6_optin == '设备报警情况'">
                            <div style="display: flex">
                                <div>报警时间：</div>
                                <div>{{ alarmanalysis6_params.alarmTime }}</div>
                            </div>
                            <!-- <div style="display: flex">
                                <div>设备名称：</div>
                                <div>{{ alarmanalysis6_params.equipmentName || '--' }}</div>
                            </div>
                            <div style="display: flex">
                                <div>所属系统：</div>
                                <div>{{ alarmanalysis6_params.lookup.owningSystem||'--' }}</div>
                            </div> -->
                            <!-- <div style="display: flex">
                                <div>设备类型：</div>
                                <div v-if="alarmanalysis6_params.equipmentName">{{ alarmanalysis6_params.equipmentName | equipmentStateType }}</div>
                                <div v-else>--</div>
                            </div> -->
                            <!-- <div style="display: flex">
                                <div>报警类型：</div>
                                <div>{{ _comm.getAlarmTypeByCode(alarmanalysis6_params.alarmType) || '--' }}</div>
                            </div> -->
                            <div style="display: flex">
                                <div>报警位置：</div>
                                <!-- <div>{{ alarmanalysis6_params.lookup.building }}-{{ alarmanalysis6_params.lookup.floor }}-{{ alarmanalysis6_params.address }}</div> -->
                                <div>{{ alarmanalysis6_params.alarmLocation }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="box2">流程追溯</div>
                    <div style="height: 450px">
                        <el-scrollbar style="height: 100%; width: 90%">
                            <el-timeline>
                                <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.lineDate" placement="top">
                                    <el-card style="font-size: 14px">
                                        <p v-if="(item.alarmDate || '') != ''">{{ item.alarmDesc }}：{{ item.alarmDate }}</p>
                                        <p v-else-if="(item.dealName || '') != ''">
                                            处理人员：{{ item.dealName }} {{ item.dealPhone }}<br />
                                            处理描述：{{ item.dealDesc }}
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
                                <!-- <el-timeline-item v-if="(alarmanalysis6_params.alarmTime || '') != ''" :timestamp="alarmanalysis6_params.alarmTime" placement="top">
                                    <el-card style="font-size: 14px">
                                        <p>设备报警：{{ alarmanalysis6_params.alarmTime }}</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item v-for="(item, index) in sourcelist" :key="index" v-if="item.show && item.title != '被指派了报警工单'" :timestamp="item.addtime" placement="top">
                                    <el-card style="font-size: 14px">
                                        <p>{{ item.targetObjectJob }}</p>
                                        <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                            <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                            ><span>语音、短信通知成功</span>
                                        </p>
                                        <p v-else-if="item.verifyTime">处理人员：{{ item.verifier || '--' }} {{ item.verifierPhone }}<br />处理描述：{{ item.result | confirmResultType }}</p>
                                        <p v-else-if="item.confirmTime">确认人员：{{ item.confirmor || '--' }} {{ item.confirmorPhone }}<br />确认描述：{{ item.confirmResult | confirmResultType }}</p>
                                    </el-card>
                                </el-timeline-item> -->
                            </el-timeline>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { watch } from 'vue';
export default {
    // props: ['showanaly'],
    props: {
        visible: {
            type: Boolean,
            require: false
        },
        showAlarm1Day: {}
    },
    data() {
        return {
            showanalysis: 'alarmanalysis1',
            floorname: '',
            floornamenumber: '',

            leftDataTop: '',

            DAYdrawLeftLineList: { everyHour: [], number: [], every: '' },
            MONTHdrawLeftLineList: { everyDay: [], number: [], every: '' },

            DAYcountByType: { equipmentTypeCN: [], number: [] },
            MONTHcountByType: { equipmentTypeCN: [], number: [] },

            Month30: false,

            countAlarmByFloorlist: { floorCN: [], number: [] },
            DAYAlarmByFloorlist: { floorCN: [], number: [] },

            countAlarmByReasonlist: { reasonCN: [], number: [] },
            countByPlacelist: { placeCN: [], number: [] },

            alarmanalysis3_params: null, //楼层参数
            alarmanalysis3_optin: null,

            alarmanalysis4_params: null, //设备类型

            chartRadio: '当日',
            chartRadio1: '设备报警数量',
            over: undefined, //是否已处置
            overLevel: undefined, //下钻是否已处置

            pager: {
                pageSize: 5,
                pageIndex: 1,
                total: null
            },
            tablist: [
                { name: '火警事件', value: '9' },
                { name: '设备告警事件', value: '4' }
                // { name: '故障事件', value: '2' },
                // { name: '离线事件', value: '3' }
            ],
            dialogFormVisible: true,
            dataTable: [],
            equipInfs: '',
            sourcelist: [],

            alarmanalysis6_params: null,
            alarmanalysis6_optin: null,

            isLevel1: false,

            floor: undefined, //楼层参数
            equipmentName: undefined, //设备名称
            equipmentNameOther: [], //其它
            equipmentType: undefined, //设备类型
            equipmentTypeList: [
                { name: '手动火灾报警按钮', value: 0 },
                { name: '点型感温火灾探测器', value: 0 },
                { name: '点型感烟火灾探测器', value: 0 },
                { name: '线性光束感烟火灾探测器', value: 0 },
                { name: '消防栓按钮', value: 0 },
                { name: '其它', value: 0 }
            ],

            colors: ['#7CFBDD', '#549EFF', '#8ef2a7', '#fdfd39', '#325efb', '#d37f8b', '#468080', '#5aa1fc']
        };
    },
    watch: {
        visible: function (val) {
            this.showanalysis = 'alarmanalysis1';
            this.chartRadio1 = '设备报警数量';
            this.Month30 = false;
            this.getleftNumData();
            this.pager.pageIndex = 1;

            this.getList();
        },
        showAlarm1Day: function (val) {
            this.showanalysis = 'alarmanalysis1';
            this.Month30 = false;
            // this.getleftNumData();
            // this.getList();
        }
    },
    created() {},
    mounted() {
        this.showanalysis = 'alarmanalysis1';
        this.getleftNumData();
        this.getList();
    },
    filters: {
        equipmentStateType(val) {
            if (val == '1') return '正常';
            if (val == '2') return '故障';
            if (val == '3') return '离线';
            if (val == '4') return '预警';
            if (val == '9') return '火警';
        },
        alarmStateType(val) {
            // if (val == '0') return '无';
            if (val == '0') return '火警';
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
    methods: {
        turntopage(type, option) {
            console.dir('什么情况');
            console.log(type, option);
            let _self = this;
            this.showanalysis = type;
            if (option == 'overLevel') {
                this.overLevel = false;
            } else if (option == 'overLevel1') {
                this.overLevel = true;
            }
            this.pager.pageSize = 10;
            if (type == 'alarmanalysis1') {
                this.pager.pageSize = 5;
                this.getleftNumData();
            } else if (type == 'alarmanalysis2') {
                this.getcountAlarms();
                this.getcountAlarmByFloor();
            } else if (type == 'alarmanalysis3') {
                this.analysischange(type, _self.alarmanalysis3_params, _self.alarmanalysis3_optin);
            } else if (type == 'alarmanalysis4') {
                console.dir(_self.showAlarm1Day);

                this.analysischange(type, _self.alarmanalysis4_params, _self.showAlarm1Day ? 'DAY' : 'MONTH');
            } else if (type == 'alarmanalysis5') {
                this.equipmentType = option;
                this.equipmentName = option;
                this.getList();
            }
        },
        analysischange(type, data, optin) {
            this.showanalysis = type;
            if (type == 'alarmanalysis3') {
                this.$nextTick(() => {
                    this.getcountAlarmByArea(data, optin);
                });
            } else if (type == 'alarmanalysis4') {
                this.$nextTick(() => {
                    console.log(optin);
                    this.getcountByType(data, optin);
                });
            } else if (type == 'alarmanalysis5') {
                this.$nextTick(() => {
                    this.getList(0);
                });
            } else if (type == 'alarmanalysis6') {
                this.$nextTick(() => {
                    this.getfindMessages(data);
                });
            }
        },
        //告警总计
        getleftNumData() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCountV3/alarmStatistics', ///api/web/indexCountTwo/alarmStatistics
                type: 'get',
                success: function (res) {
                    _self.leftDataTop = res.data;
                    if (_self.showAlarm1Day) {
                        _self.drawLeftLine1();
                    } else {
                        _self.drawdangyeCharts1();
                    }
                }
            });
        },
        //楼层
        getcountAlarmByFloor() {
            let _self = this;
            if (_self.showAlarm1Day) {
                _self.DAYAlarmByFloorlist.floorCN = [];
                _self.DAYAlarmByFloorlist.number = [];

                _self._http({
                    url: '/api/web/indexCountTwo/countAlarmByFloor',
                    type: 'get',
                    isBody: true,
                    data: {
                        option: 'DAY',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];
                        res.data.sort((a, b) => {
                            return a.number > b.number ? 1 : -1;
                        });
                        res.data.map((item) => {
                            if (item.floorCN && item.number) {
                                _self.DAYAlarmByFloorlist.floorCN.push(item.floorCN);
                                let number = { value: item.number, name: item.floorCN, floor: item.floor };
                                _self.DAYAlarmByFloorlist.number.push(number);
                            }
                        });
                        _self.drawPieChart();
                    }
                });
            } else {
                _self.countAlarmByFloorlist.floorCN = [];
                _self.countAlarmByFloorlist.number = [];
                _self._http({
                    url: '/api/web/indexCountTwo/countAlarmByFloor',
                    type: 'get',
                    isBody: true,
                    data: {
                        option: 'MONTH',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];
                        res.data.sort((a, b) => {
                            return a.number > b.number ? 1 : -1;
                        });
                        res.data.map((item) => {
                            if (item.floorCN && item.number) {
                                _self.countAlarmByFloorlist.floorCN.push(item.floorCN);
                                let number = { value: item.number, name: item.floorCN, floor: item.floor };
                                _self.countAlarmByFloorlist.number.push(number);
                            }
                        });
                        _self.drawdangyeploucCharts();
                    }
                });
            }
        },
        //设备类型
        getcountByType(data, optin) {
            let _self = this;
            _self.DAYcountByType.equipmentTypeCN = [];
            _self.DAYcountByType.number = [];
            _self._http({
                url: '/api/web/indexCountTwo/countAlarmByName', ///api/web/indexCountTwo/countByType
                type: 'get',
                isBody: true,
                data: {
                    option: optin,
                    floor: _self.floor,
                    over: _self.overLevel,
                    area: data.area
                },
                success: function (res) {
                    _self.equipmentTypeList = [
                        { name: '手动火灾报警按钮', value: 0 },
                        { name: '点型感温火灾探测器', value: 0 },
                        { name: '点型感烟火灾探测器', value: 0 },
                        { name: '线性光束感烟火灾探测器', value: 0 },
                        { name: '消防栓按钮', value: 0 },
                        { name: '其它', value: 0 }
                    ];
                    _self.equipmentNameOther = [];
                    res.data.map((item) => {
                        let isOther = false;
                        for (let i = 0; i < _self.equipmentTypeList.length; i++) {
                            if (_self.equipmentTypeList[i].name == item.equipmentName) {
                                _self.equipmentTypeList[i].value = _self.equipmentTypeList[i].value + item.number;
                                isOther = false;
                                break;
                            } else {
                                isOther = true;
                            }
                        }
                        if (isOther) {
                            _self.equipmentTypeList[5].value = _self.equipmentTypeList[5].value + item.number;
                            _self.equipmentNameOther.push(item.equipmentName);
                        }

                        // _self.DAYcountByType.equipmentTypeCN.push(`${item.equipmentTypeCN}`);
                        // _self.DAYcountByType.number.push({ value: item.number, name: `${item.equipmentTypeCN}`, equipmentType: item.equipmentType });
                    });

                    _self.equipmentTypeList.forEach((item) => {
                        _self.DAYcountByType.equipmentTypeCN.push(item.name);
                        _self.DAYcountByType.number.push({ value: item.value, name: item.name });
                    });
                    _self.drawEquipment();
                }
            });
        },
        //设备类型
        drawEquipment() {
            var chartDom = document.getElementById('EquipmentCharts');
            var myChart = echarts.init(chartDom);
            var option;
            let _self = this;

            option = {
                title: {
                    show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
                    text: '设备类型报警占比', //主标题文本，'\n'指定换行
                    bottom: '1%',
                    left: 'center',
                    textStyle: {
                        fontSize: 16,
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    icon: 'circle',
                    left: 'left',
                    y: 'center',
                    // data: _self.DAYcountByType.equipmentTypeCN,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                color: _self.colors,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '60%',
                        data: _self.DAYcountByType.number,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}({d}%)'
                            }
                        }
                    }
                ]
            };

            myChart.on('click', function (params) {
                _self.equipmentType = params.data.equipmentType || undefined;
                _self.equipmentName = params.data.name || undefined;
                // console.log(params)
                _self.showequipment();
            });
            option && myChart.setOption(option);
        },
        EchartsChange(i) {
            console.log(i);
        },
        //楼层统计
        getcountAlarmByArea(data, optin) {
            let _self = this;
            _self.floorname = data.name;
            _self.floornamenumber = data.value;
            _self.MONTHcountByType.equipmentTypeCN = [];
            _self.MONTHcountByType.number = [];
            this.floor = data.floor;
            _self._http({
                /*         url: '/api/web/indexCountTwo/countAlarmByArea', */
                url: '/api/web/indexCountV3/countAlarmByArea',
                type: 'get',
                isBody: true,
                data: {
                    option: optin,
                    floor: data.floor,
                    over: _self.overLevel
                },
                success: function (res) {
                    let arr = ['第一防火分区报警', '第二防火分区报警', '第三防火分区报警', '第四防火分区报警', '第五防火分区报警', '第六防火分区报警', '第七防火分区报警'];
                    res.data = res.data || [];
                    res.data.forEach((item) => {
                        let index = Math.floor(Math.random() * 7);
                        let name = arr[index] || '第一防火分区报警';
                        _self.MONTHcountByType.equipmentTypeCN.push(`${item.areaCN || name}`);
                        let number = { value: item.number, name: `${item.areaCN || name}`, optin: optin, area: item.area || null };
                        _self.MONTHcountByType.number.push(number);
                        arr.splice(index, 1);
                    });
                    _self.drawdangyuepieCharts();
                }
            });
        },

        //告警次数
        getcountAlarms() {
            let _self = this;

            if (_self.showAlarm1Day) {
                _self.DAYdrawLeftLineList.everyHour = [];
                _self.DAYdrawLeftLineList.number = [];
                _self.DAYdrawLeftLineList.every = '';
                _self._http({
                    url: '/api/web/indexCountV3/countAlarms', ///api/web/indexCountTwo/countAlarms
                    type: 'get',
                    isBody: true,
                    data: {
                        option: 'DAY',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];
                        _self.DAYdrawLeftLineList.every = res.data[0].everyHour.substring(11, 2);
                        res.data.forEach((item) => {
                            _self.DAYdrawLeftLineList.everyHour.push(item.everyHour.substring(item.everyHour.length, item.everyHour.length - 2));
                            _self.DAYdrawLeftLineList.number.push(item.number);
                        });
                        _self.drawLeftLine();
                    }
                });
            } else {
                _self.MONTHdrawLeftLineList.everyDay = [];
                _self.MONTHdrawLeftLineList.number = [];
                _self.MONTHdrawLeftLineList.every = '';
                _self._http({
                    // url: '/api/web/indexCountTwo/countAlarms',
                    url: '/api/web/indexCountV3/countAlarms',
                    type: 'get',
                    isBody: true,
                    data: {
                        option: 'MONTH',
                        over: _self.overLevel
                    },
                    success: function (res) {
                        res.data = res.data || [];
                        _self.MONTHdrawLeftLineList.every = res.data[0].everyDay.substring(0, 5);
                        res.data.forEach((item) => {
                            _self.MONTHdrawLeftLineList.everyDay.push(item.everyDay.substring(5, 11));
                            _self.MONTHdrawLeftLineList.number.push(item.number);
                        });
                        _self.drawdangyeCharts();
                    }
                });
            }
        },
        //当月切换
        getMothAlarms() {
            let _self = this;
            _self.MONTHdrawLeftLineList.everyDay = [];
            _self.MONTHdrawLeftLineList.number = [];
            _self.MONTHdrawLeftLineList.every = '';

            _self.countAlarmByFloorlist.floorCN = [];
            _self.countAlarmByFloorlist.number = [];
            _self._http({
                // url: '/api/web/indexCountTwo/countAlarms',
                url: '/api/web/indexCountV3/countAlarms',
                type: 'get',
                isBody: true,
                data: {
                    option: _self.Month30 ? 'BEFORE30DAY' : 'MONTH',
                    over: _self.overLevel
                },
                success: function (res) {
                    res.data = res.data || [];
                    _self.MONTHdrawLeftLineList.every = res.data[0].everyDay.substring(0, 5);
                    res.data.map((item) => {
                        _self.MONTHdrawLeftLineList.everyDay.push(item.everyDay.substring(5, 11));
                        _self.MONTHdrawLeftLineList.number.push(item.number);
                    });
                    _self.drawdangyeCharts();
                }
            });
            _self._http({
                url: '/api/web/indexCountTwo/countAlarmByFloor',
                type: 'get',
                isBody: true,
                data: {
                    option: _self.Month30 ? 'BEFORE30DAY' : 'MONTH',
                    over: _self.overLevel
                },
                success: function (res) {
                    res.data = res.data || [];
                    res.data.sort((a, b) => {
                        return a.number > b.number ? 1 : -1;
                    });
                    res.data.map((item) => {
                        if (item.floorCN && item.number) {
                            _self.countAlarmByFloorlist.floorCN.push(item.floorCN);
                            let number = { value: item.number, name: item.floorCN, floor: item.floor };
                            _self.countAlarmByFloorlist.number.push(number);
                        }
                    });
                    _self.drawdangyeploucCharts();
                }
            });
        },
        // 当日
        drawLeftLine1(val = false) {
            let quxianChart1 = echarts.init(document.getElementById('quxianChart1'));
            quxianChart1.off('click');
            let option = null;
            let _self = this;

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
                    trigger: 'item',
                    axisPointer: {
                        type: 'none'
                    }
                    // formatter: '时段：{b0}<br />设备警告：{c0} 次'
                },
                legend: {
                    data: ['设备报警数量', '报警处置数量'],
                    right: '0%',
                    textStyle: {
                        color: '#ffffff'
                    },
                    icon: 'circle'
                    /*   selected: { 设备报警数量: !val, 报警处置数量: val } */
                },
                grid: {
                    top: '20%',
                    left: '5%',
                    right: '0%',
                    bottom: '5%',
                    containLabel: true
                },
                //  color: ['#25A6FF', '#E7745B'],
                color: ['#6bd0ca', '#2aadff'],
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
                        name: '设备报警数量',
                        data: [_self.leftDataTop.dayAlarms || 0], // [{value:leftDataTop.monthAlarms || 0,name:'设备报警数量'}]
                        type: 'bar',
                        barMaxWidth: 80
                    },
                    {
                        name: '报警处置数量',
                        data: [_self.leftDataTop.dayAlarmsOver || 0], // [{value:leftDataTop.monthAlarmsOver || 0,name:'报警处置数量'}]
                        type: 'bar',
                        barMaxWidth: 80
                    }
                ]
            };
            quxianChart1.on('click', function (params) {
                _self.turntopage('alarmanalysis2', params.seriesName == '报警处置数量' ? 'overLevel1' : 'overLevel');
            });
            if (option && typeof option === 'object') {
                quxianChart1.setOption(option);
            }
        },
        // 当月告警统计
        drawdangyeCharts1(val = false) {
            let dangyeCharts1 = echarts.init(document.getElementById('dangyeCharts1'));
            dangyeCharts1.off('click');
            let option = null;
            let _self = this;

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
                    trigger: 'item',
                    axisPointer: {
                        type: 'none'
                    }
                    // formatter: '时段：{b0}<br />设备警告：{c0} 次'
                },
                legend: {
                    data: ['设备报警数量', '报警处置数量'],
                    right: '0%',
                    textStyle: {
                        color: '#ffffff'
                    },
                    icon: 'circle'
                    /*  selected: { 设备报警数量: !val, 报警处置数量: val } */
                },
                grid: {
                    top: '20%',
                    left: '5%',
                    right: '0%',
                    bottom: '5%',
                    containLabel: true
                },
                //25A6FF  E7745B
                color: ['#6bd0ca', '#2aadff'],
                xAxis: {
                    type: 'category',
                    data: ['数量'], //['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
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
                        name: '设备报警数量',
                        data: [_self.leftDataTop.monthAlarms || 0], // [{value:leftDataTop.monthAlarms || 0,name:'设备报警数量'}]
                        type: 'bar',
                        barMaxWidth: 80
                    },
                    {
                        name: '报警处置数量',
                        data: [_self.leftDataTop.monthAlarmsOver || 0], // [{value:leftDataTop.monthAlarmsOver || 0,name:'报警处置数量'}]
                        type: 'bar',
                        barMaxWidth: 80
                    }
                ]
            };
            dangyeCharts1.on('click', function (params) {
                _self.turntopage('alarmanalysis2', params.seriesName == '报警处置数量' ? 'overLevel1' : 'overLevel');
            });
            if (option && typeof option === 'object') {
                dangyeCharts1.setOption(option);
            }
        },
        // 当日时段报警处置
        drawLeftLine() {
            let quxianChart = echarts.init(document.getElementById('quxianChart'));
            quxianChart.off('click');
            let option = null;
            let _self = this;

            let text1 = _self.overLevel == true ? '处置时段分析' : '报警时段分析';
            let text2 = _self.overLevel == true ? '报警处置' : '设备报警';
            // let text1 = '';
            // text2 = '';
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
                    formatter: `时段：${_self.DAYdrawLeftLineList.every}{b0}<br />` + text2 + '：{c0} 次'
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
        //当日楼层报警处置
        drawPieChart() {
            var ripieChart = document.getElementById('ripieChart');
            var myChart = echarts.init(ripieChart);
            myChart.off('click');
            var option;
            let _self = this;

            let text1 = _self.overLevel == true ? '处置楼层' : '报警楼层';
            let text2 = _self.overLevel == true ? '处置次数' : '报警次数';

            option = {
                title: {
                    text: text1,
                    left: '20%',
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'bolder',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '楼层：{b0}<br />' + text2 + '：{c0} 次'
                },
                legend: {
                    data: [text2],
                    right: '5%',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '5%',
                    containLabel: true
                },
                color: ['#6BD0CA'],
                xAxis: {
                    name: '（次）',
                    nameTextStyle: {
                        color: '#ffffff'
                    },
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
                yAxis: {
                    type: 'category',
                    data: _self.DAYAlarmByFloorlist.floorCN, //_self.DAYAlarmByFloorlist.floorCN[]

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
                series: [
                    {
                        name: text2,
                        data: _self.DAYAlarmByFloorlist.number, //_self.DAYAlarmByFloorlist.number[]
                        type: 'bar',
                        barMaxWidth: 10
                    }
                ]
            };
            myChart.on('click', function (params) {
                _self.alarmanalysis3_params = params.data;
                _self.alarmanalysis3_optin = 'DAY';
                _self.chartRadio = '当日';
                _self.analysischange('alarmanalysis3', params.data, 'DAY');
            });
            option && myChart.setOption(option);
        },
        //当月时段报警处置
        drawdangyeCharts() {
            let drawLine2 = echarts.init(document.getElementById('dangyeCharts'));
            drawLine2.off('click');
            let option = null;
            let _self = this;

            let text1 = _self.overLevel == true ? '处置时段分析' : '报警时段分析';
            let text2 = _self.overLevel == true ? '报警处置' : '设备报警';
            // let text1 = '',
            //     text2 = '';
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
                    formatter: `时段：${_self.MONTHdrawLeftLineList.every}{b0}<br />` + text2 + '：{c0} 次'
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
        },
        //当月楼层报警处置
        drawdangyeploucCharts() {
            var chartDom = document.getElementById('dangyeploucCharts');
            var myChart = echarts.init(chartDom);
            myChart.off('click');
            var option;
            let _self = this;

            let text1 = _self.overLevel == true ? '处置楼层' : '报警楼层';
            let text2 = _self.overLevel == true ? '处置次数' : '报警次数';

            option = {
                title: {
                    text: text1,
                    left: '20%',
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'bolder',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '楼层：{b0}<br />' + text2 + '：{c0} 次'
                },
                legend: {
                    data: [text2],
                    right: '5%',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '5%',
                    containLabel: true
                },
                color: ['#6BD0CA'],
                xAxis: {
                    name: '（次）',
                    nameTextStyle: {
                        color: '#ffffff'
                    },
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
                yAxis: {
                    type: 'category',
                    // data: [], //_self.countAlarmByFloorlist.floorCN
                    data: _self.countAlarmByFloorlist.floorCN,

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
                series: [
                    {
                        name: text2,
                        // data: [], //_self.countAlarmByFloorlist.number
                        data: _self.countAlarmByFloorlist.number,
                        type: 'bar',
                        barMaxWidth: 10
                    }
                ]
            };

            myChart.on('click', function (params) {
                _self.alarmanalysis3_params = params.data;
                _self.alarmanalysis3_optin = 'MONTH';
                _self.chartRadio = '当月';
                _self.analysischange('alarmanalysis3', params.data, 'MONTH');
                // _self.analysischange('alarmanalysis4', params.data, 'MONTH');
            });

            option && myChart.setOption(option);
        },
        //楼层统计
        drawdangyuepieCharts() {
            var chartDom = document.getElementById('dangyuepieCharts');
            var myChart = echarts.init(chartDom);
            myChart.off('click');
            var option;
            let _self = this;

            option = {
                title: {
                    show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
                    // text: '设备类型报警占比', //主标题文本，'\n'指定换行
                    bottom: '1%',
                    left: 'center',
                    textStyle: {
                        fontSize: 16,
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    icon: 'circle',
                    left: 'left',
                    y: 'center',
                    // data: _self.MONTHcountByType.equipmentTypeCN,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                color: _self.colors,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '60%',
                        data: _self.MONTHcountByType.number,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}({d}%)'
                            }
                        }
                    }
                ]
            };

            myChart.on('click', function (params) {
                _self.alarmanalysis4_params = params.data;
                _self.analysischange('alarmanalysis4', params.data, _self.chartRadio == '当日' ? 'DAY' : 'MONTH');
            });
            option && myChart.setOption(option);
        },
        drawplaceChartChart() {
            var chartDom = document.getElementById('placeChart');
            var myChart = echarts.init(chartDom);
            myChart.off('click');
            var option;
            let _self = this;
            // 绘制图表
            option = {
                //此处插入echart实例中的option内部内容
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                // legend用数组两项，分两排显示
                legend: [
                    {
                        orient: 'vertical',
                        // 图例变圆
                        icon: 'circle',

                        // 调整第一排图例位置
                        bottom: 0,
                        x: '80%',
                        textStyle: {
                            color: '#ffffff' //字体颜色
                        },
                        data: _self.countByPlacelist.placeCN,
                        y: 'center'
                    }
                    // {
                    //     orient: 'vertical',
                    //     icon: 'circle',

                    //     // 调整第二排图例位置
                    //     bottom: 0,
                    //     x: '90%',

                    //     data: ['视频广告', '搜索引擎'],
                    //     y: 'center',
                    //     // x: 'right'
                    // }
                ],
                label: {
                    fontSize: 12,
                    show: true,
                    position: 'inner',
                    // formatter: "{b}:{c}" + "\n\r" + "({d}%)",
                    // 每一块的数据显示格式
                    formatter: '{c}'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,

                        data: _self.countByPlacelist.number
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        showequipment() {
            // this.$emit('showequipment');
            this.analysischange('alarmanalysis5');
        },
        handleMonthChange(value) {
            this.Month30 = value;
            this.getMothAlarms();
        },

        viewchange(row, title) {
            // this.$emit('viewchange', row, title);

            console.dir('报警页面');
            this.alarmanalysis6_params = row;
            this.alarmanalysis6_optin = title;
            this.analysischange('alarmanalysis6', row, title);
        },
        closeDialog() {
            this.$emit('update:visible', false);
            this.turntopage('alarmanalysis1');
        },
        tabitemchange(val) {
            console.dir(val);
            this.getList(0);
            let getDate = '';
            if (val == '报警处置数量') {
                getDate = true;
            } else {
                getDate = false;
            }
            if (this.chartRadio == '当日') {
                this.drawLeftLine1(getDate);
            } else {
                this.drawdangyeCharts1(getDate);
            }
        },
        getList(val = 1) {
            let _self = this;
            _self.loading = true;

            console.dir('切换', val);
            if (_self.showanalysis == 'alarmanalysis1') {
                if (_self.showAlarm1Day) {
                    _self.chartRadio = '当日';
                } else {
                    _self.chartRadio = '';
                }
                if (_self.chartRadio1 == '设备报警数量') {
                    _self.over = undefined;
                } else {
                    _self.over = true;
                }
                _self.floor = undefined;
                _self.equipmentType = undefined;
                _self.equipmentName = undefined;
                _self.equipmentNameOther = [];
                _self.isLevel1 = true;
            } else {
                _self.over = _self.overLevel;
                _self.isLevel1 = false;
            }
            let searchObj = {
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                option: _self.chartRadio == '当日' ? 'DAY' : 'MONTH', //DAY：当日，MONTH：当月
                floor: _self.floor,
                equipmentType: _self.equipmentType,
                equipmentName: _self.equipmentName == '其它' ? _self.equipmentNameOther.join(',') : _self.equipmentName,
                'equipmentName.symbol': _self.equipmentName == '其它' ? 'IN' : undefined,
                over: _self.over,
                sorts: 'alarmTime:desc',
                transform: 'B:building,F:floor,ES:owningSystem,U:confirmor,U:verifier'
            };
            console.dir(searchObj);
            _self.dataTable = [];
            _self._http({
                // url: val === 1 ? '/api/web/indexCountV3/find' : 'api/web/indexCountTwo/find',
                // url: 'api/web/indexCountTwo/find',
                url: '/api/web/indexCountV3/find',
                type: 'get',
                isBody: true,
                data: searchObj,
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                }
            });
        },
        getfindMessages(val) {
            let _self = this;
            _self.sourcelist = [];
            _self._http({
                url: '/api/web/indexCountV3/alarmFlow', ///api/web/indexCountTwo/findMessages
                type: 'get',
                isBody: true,
                data: {
                    alarmId: val.id,
                    sourceId: val.id,
                    transform: 'U:targetObject'
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
.el-switch__label {
    color: rgba(255, 255, 255, 0.6);
}
.el-switch__label.is-active {
    color: #25a6ff;
}
//全局表格样式
.el-table {
    background-image: linear-gradient(#19253e, #223e61);
}
.el-table::before {
    width: 0;
}
.el-table th {
    background-color: #2a3953 !important;
    color: rgba(255, 255, 255, 0.8);
}
//全局表格样式
.el-table tr {
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.6);
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(255, 255, 255, 0.05) !important;
    /*  background-color: red !important; */
}

.el-table th.is-leaf,
.el-table td {
    border-color: #07203b;
}

.el-table td {
    border-color: #07203b !important;
}

.el-radio-button__inner {
    background-color: #19253e;
    border: 1px #2a3953 solid !important;
    color: #ffffff;
}
.el-pagination__total,
.el-pagination__jump {
    color: rgba(255, 255, 255, 0.5);
}
.classReadyDialog {
    box-sizing: border-box;
    background-image: linear-gradient(#162542, #1a3d63);
    .classReadyDialogTitle {
        position: relative;
        padding-left: 20px;
        height: 42px;
        line-height: 42px;
        background-color: #364b6a;
        span {
            font-size: 16px;
            display: inline-block;
            color: #fff;
        }
    }
    .classReadyDialogBox {
        padding: 20px;
    }
    .headerCon {
        font-size: 16px;
        color: #fff;
        padding: 15px 10px;
        font-weight: bold;
    }
    .headerCon::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 18px;
        background-color: #25a6ff;
        margin-left: -12px;
        margin-top: 2px;
        border-radius: 2px;
    }
    .returnbtn {
        cursor: pointer;
        color: rgb(255, 255, 255);
        padding-right: 5px;
        i {
            font-size: 20px;
        }
    }
    .returnbtn1 {
        cursor: pointer;
        float: right;
        color: #24f4ed;
        border: 1px rgba(36, 244, 237, 0.5) solid;
        padding: 5px 10px;
        border-radius: 10px;
        i {
            margin-right: 5px;
        }
    }
    .returnbtn2 {
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
        color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        i {
            font-size: 24px;
        }
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

.eventMsgInfo {
    border-radius: 8px;
    .el-card {
        background-color: #264365;
        border: none;
        color: #fff;
        font-size: 14px;
        line-height: 24px;
    }
    .el-tabs__item {
        color: #fff;
    }
    .el-card__body {
        padding: 10px 20px !important;
    }
    .box1 {
        padding: 10px 15px 0 15px;
        color: rgb(255, 255, 255);
        font-size: 16px;
        line-height: 30px;
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
}
.el-timeline-item__timestamp.is-top {
    position: absolute;
    margin-left: -120px;
    color: rgb(255, 255, 255);
    width: 80px;
    font-size: 14px;
    text-align: center;
}
.el-timeline-item {
    margin-left: 110px;
}
.el-timeline-item__node {
    background-color: rgb(0, 166, 255);
    box-shadow: 0 0 3px 2px rgba(0, 166, 255, 0.5);
    border: 1px rgba(0, 0, 0, 0.5) solid;
}
.el-timeline-item__tail {
    border-color: rgb(0, 166, 255);
}

.textBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 400px;
}
.textBox1 {
    padding: 5px 10px;
    margin: 10px 0;
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    color: rgb(255, 255, 255);
    border-radius: 15px;
}
.textBox1 i {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    margin-right: 5px;
}

.alarmanalysis1Title {
    > div {
        padding: 20px;
        margin: 10px 0;
        background-image: linear-gradient(to bottom, #1e2843, #273d61);
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 30px;
        span {
            font-size: 24px;
            font-weight: bold;
        }
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
.backColorPage {
    //background-color: #07203b;
    .el-pagination span {
        background-color: #213c5e !important;
    }

    .el-pagination .el-select .el-input .el-input__inner {
        background-color: #213c5e !important;
    }
    .el-pager {
        background-color: #213c5e !important;
    }
    li.number {
        background-color: #213c5e !important;
    }
    .btn-prev,
    .btn-next,
    .el-input__inner {
        background-color: #213c5e !important;
    }
}
.failed {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    margin: auto !important;
}
</style>
