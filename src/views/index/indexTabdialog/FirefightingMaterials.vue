<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div v-if="sign == '中心监控应急物资清单'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div></div>
                <el-table class="xf-table" :data="testTbale" style="width: 100%; height: 528px; margin-top: 30px">
                    <el-table-column align="center" prop="id" label="序号" :show-overflow-tooltip="true" width="80" />
                    <el-table-column align="center" prop="materialName" label="物品名称" :show-overflow-tooltip="true" width="180" />
                    <el-table-column align="center" prop="specifications" label="规格型号" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="unit" label="单位" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="num" label="数量" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="place" label="存放地点" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="department" label="保管/使用部门" :show-overflow-tooltip="true" />
                    <el-table-column v-if="false" align="center" label="操作">
                        <template slot-scope="scope">
                            <div class="buttom_clean">
                                <el-button type="text" size="small" @click="intoLayerDedail('中心监控应急物资清单')">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
            <div v-if="sign == '(中心监控)应急救援物资清单'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="testTbale1" style="width: 100%; height: 528px; margin-top: 30px">
                    <el-table-column align="center" prop="id" label="序号" :show-overflow-tooltip="true" width="80" />
                    <el-table-column align="center" prop="materialName" label="物品名称" :show-overflow-tooltip="true" width="180" />
                    <el-table-column align="center" prop="num" label="数量" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="place" label="存放地点" :show-overflow-tooltip="true" />

                    <el-table-column v-if="false" align="center" label="操作">
                        <template slot-scope="scope">
                            <div class="buttom_clean">
                                <el-button type="text" size="small" @click="intoLayerDedail('(中心监控)应急救援物资清单')">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
            <div v-if="sign == '25号消防车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="testTbale2" style="width: 100%; height: 528px; margin-top: 30px">
                    <el-table-column align="center" prop="id" label="序号" :show-overflow-tooltip="true" width="80" />
                    <el-table-column align="center" prop="materialName" label="器材装备名称" :show-overflow-tooltip="true" width="180" />
                    <el-table-column align="center" prop="unit" label="单位" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="num" label="数量" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="place" label="存放具体位置" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="remarks" label="备注" :show-overflow-tooltip="true" />
                    <el-table-column align="center" label="操作" v-if="false">
                        <template slot-scope="scope">
                            <div class="buttom_clean">
                                <el-button type="text" size="small" @click="intoLayerDedail('25号消防车随车装备统计表')">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
            <div v-if="sign == '26号消防车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="testTbale3" style="width: 100%; height: 528px; margin-top: 30px">
                    <el-table-column align="center" prop="id" label="序号" :show-overflow-tooltip="true" width="80" />
                    <el-table-column align="center" prop="materialName" label="器材装备名称" :show-overflow-tooltip="true" width="180" />
                    <el-table-column align="center" prop="unit" label="单位" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="num" label="数量" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="place" label="存放具体位置" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="remarks" label="备注" :show-overflow-tooltip="true" />
                    <el-table-column align="center" v-if="false" label="操作">
                        <template slot-scope="scope">
                            <div class="buttom_clean">
                                <el-button type="text" size="small" @click="intoLayerDedail('26号消防车随车装备统计表')">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
            <div v-if="sign == '28号云梯车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="testTbale4" style="width: 100%; height: 528px; margin-top: 30px">
                    <el-table-column align="center" prop="id" label="序号" :show-overflow-tooltip="true" width="80" />
                    <el-table-column align="center" prop="materialName" label="器材装备名称" :show-overflow-tooltip="true" width="180" />
                    <el-table-column align="center" prop="unit" label="单位" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="num" label="数量" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="place" label="存放具体位置" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="remarks" label="备注" :show-overflow-tooltip="true" />
                    <el-table-column v-if="false" align="center" label="操作">
                        <template slot-scope="scope">
                            <div class="buttom_clean">
                                <el-button type="text" size="small" @click="intoLayerDedail('28号云梯车随车装备统计表')">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
            <div v-if="sign == 'B12号排烟车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="testTbale5" style="width: 100%; height: 528px; margin-top: 30px">
                    <el-table-column align="center" prop="id" label="序号" :show-overflow-tooltip="true" width="80" />
                    <el-table-column align="center" prop="materialName" label="器材装备名称" :show-overflow-tooltip="true" width="180" />
                    <el-table-column align="center" prop="unit" label="单位" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="num" label="数量" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="place" label="存放具体位置" :show-overflow-tooltip="true" />
                    <el-table-column align="center" prop="remarks" label="备注" :show-overflow-tooltip="true" />

                    <el-table-column align="center" v-if="false" label="操作">
                        <template slot-scope="scope">
                            <div class="buttom_clean">
                                <el-button type="text" size="small" @click="intoLayerDedail('B12号排烟车随车装备统计表')">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['sign'],
    data() {
        return {
            currentLayerLevel: 1,
            // pageSize:10,
            dataTable: [],
            testTbale: [],
            testTbale1: [],
            testTbale2: [],
            testTbale3: [],
            testTbale4: [],
            testTbale5: [],
            dataTable1: [
                {
                    id: 1,
                    materialName: '正压式空气呼吸器',
                    specifications: 'RHZKF6.8/30',
                    unit: '个',
                    num: '17',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 2,
                    materialName: '双气瓶空呼',
                    specifications: 'HG-GB=RHZKF9',
                    unit: '个',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 3,
                    materialName: '消防头盔',
                    specifications: '/',
                    unit: '顶',
                    num: '11',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 4,
                    materialName: '抢险救援头盔',
                    specifications: 'RJF-F',
                    unit: '个',
                    num: '10',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 5,
                    materialName: '消防员灭火防护服',
                    specifications: '/',
                    unit: '套',
                    num: '12',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 6,
                    materialName: '消防避火服',
                    specifications: '/',
                    unit: '套',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 7,
                    materialName: '防峰服',
                    specifications: '/',
                    unit: '套',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                }
            ],
            dataTable2: [
                {
                    id: 1,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 2,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 3,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 4,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 5,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 6,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 7,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                },
                {
                    id: 8,
                    materialName: '正压式空气呼吸器',
                    num: '17',
                    place: '中心监控内展架'
                }
            ],
            dataTable3: [],
            dataTable4: [],
            dataTable5: [],
            showF: 'first',
            radio4: '消防队',
            showImg1: false,
            showImg2: false,
            radio1: '人员',
            firstPageData1: '',
            firstPageData2: '',
            showLeavel: 1,
            activeName: 'first',
            activeSenName: 'first',
            pager: {
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
            timeLineData: ''
        };
    },
    watch: {},
    created() {},
    mounted() {
        console.log('!!!!!', this.sign);
        if (this.sign == '中心监控应急物资清单') {
            this.pager.total = 35;
            this.dataTable = [
                {
                    id: 1,
                    materialName: '正压式空气呼吸器',
                    specifications: 'RHZKF6.8/30',
                    unit: '个',
                    num: '17',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 2,
                    materialName: '双气瓶空呼',
                    specifications: 'HG-GB=RHZKF9',
                    unit: '个',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 3,
                    materialName: '消防头盔',
                    specifications: '/',
                    unit: '顶',
                    num: '11',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 4,
                    materialName: '抢险救援头盔',
                    specifications: 'RJF-F',
                    unit: '个',
                    num: '10',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 5,
                    materialName: '消防员灭火防护服',
                    specifications: '/',
                    unit: '套',
                    num: '12',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 6,
                    materialName: '消防避火服',
                    specifications: '/',
                    unit: '套',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 7,
                    materialName: '防峰服',
                    specifications: '/',
                    unit: '套',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 8,
                    materialName: '抢险救援服',
                    specifications: '/',
                    unit: '套',
                    num: '8',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 9,
                    materialName: '液压扩张器',
                    specifications: '/',
                    unit: '套',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 10,
                    materialName: '消防员呼救器',
                    specifications: 'RHJ240',
                    unit: '个',
                    num: '10',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 11,
                    materialName: '过滤式消防自救呼吸器',
                    specifications: 'TZL30',
                    unit: '个',
                    num: '20',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 12,
                    materialName: '手动破拆工具组',
                    specifications: '9套一组',
                    unit: '组',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 13,
                    materialName: '多功能挠钩',
                    specifications: '/',
                    unit: '组',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 14,
                    materialName: '消防应急包',
                    specifications: '红色',
                    unit: '套',
                    num: '3',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 15,
                    materialName: '灭火探测试验器',
                    specifications: '/',
                    unit: '套',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 16,
                    materialName: '救生缓降器',
                    specifications: '/',
                    unit: '套',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 17,
                    materialName: '救生衣',
                    specifications: '/',
                    unit: '件',
                    num: '10',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 18,
                    materialName: '救援担架',
                    specifications: '/',
                    unit: '副',
                    num: '4',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 19,
                    materialName: '救援绳索',
                    specifications: '50米/100米',
                    unit: '根',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 20,
                    materialName: '救援软梯',
                    specifications: '/',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 21,
                    materialName: '救援起重垫',
                    specifications: '京建',
                    unit: '张',
                    num: '4',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 22,
                    materialName: '多功能担架',
                    specifications: '/',
                    unit: '副',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 23,
                    materialName: '多功能水枪',
                    specifications: 'QLD6',
                    unit: '把',
                    num: '6',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 24,
                    materialName: '快速转换接口',
                    specifications: '65/80内扣式/型卡式',
                    unit: '个',
                    num: '20',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 25,
                    materialName: '20米65mm/80mm消防水带',
                    specifications: '/',
                    unit: '盘',
                    num: '25',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 26,
                    materialName: '消防演习烟雾弹',
                    specifications: '白色',
                    unit: '罐',
                    num: '8',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 27,
                    materialName: 'LED火焰灯',
                    specifications: '模拟火盆',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 28,
                    materialName: '发光照明线',
                    specifications: '100',
                    unit: '组',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 29,
                    materialName: '灭火毯',
                    specifications: '/',
                    unit: '个',
                    num: '4',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 30,
                    materialName: '手持燃气测漏检测仪',
                    specifications: 'PT8800B',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 31,
                    materialName: '大屏激光距仪',
                    specifications: 'DL331120P',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 32,
                    materialName: '温度测试仪',
                    specifications: 'HRDG51396',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 33,
                    materialName: '汽油锯',
                    specifications: '雅马哈',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 34,
                    materialName: '手摇报警器',
                    specifications: 'SY-100型',
                    unit: '个',
                    num: '1',
                    place: '中心监控内展架',
                    department: '安防管理部'
                },
                {
                    id: 35,
                    materialName: '多功能讲解器',
                    specifications: '/',
                    unit: '套',
                    num: '2',
                    place: '中心监控内展架',
                    department: '安防管理部'
                }
            ];
        } else if (this.sign == '(中心监控)应急救援物资清单') {
            this.pager.total = 35;
            this.dataTable1 = [
                {
                    id: 1,
                    materialName: '正压式空气呼吸器',
                    num: '14',
                    place: '中心监控内展架'
                },
                {
                    id: 2,
                    materialName: '双气瓶空呼',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 3,
                    materialName: '消防头盔',
                    num: '12',
                    place: '中心监控内展架'
                },
                {
                    id: 4,
                    materialName: '消防员灭火防护服',
                    num: '12',
                    place: '中心监控内展架'
                },
                {
                    id: 5,
                    materialName: '消防避火服',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 6,
                    materialName: '防峰服',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 7,
                    materialName: '抢险救援服',
                    num: '9',
                    place: '中心监控内展架'
                },
                {
                    id: 8,
                    materialName: '抢险救援头盔',
                    num: '9',
                    place: '中心监控内展架'
                },
                {
                    id: 9,
                    materialName: '手动破拆工具组',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 10,
                    materialName: '多功能挠钩',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 11,
                    materialName: '消防员呼救器',
                    num: '6',
                    place: '中心监控内展架'
                },
                {
                    id: 12,
                    materialName: '过滤式消防自救呼吸器',
                    num: '20',
                    place: '中心监控内展架'
                },
                {
                    id: 13,
                    materialName: '消防应急包',
                    num: '3',
                    place: '中心监控内展架'
                },
                {
                    id: 14,
                    materialName: '灭火探测试验器',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 15,
                    materialName: '救生缓降器',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 16,
                    materialName: '救生衣',
                    num: '10',
                    place: '中心监控内展架'
                },
                {
                    id: 17,
                    materialName: '救援担架',
                    num: '4',
                    place: '中心监控内展架'
                },
                {
                    id: 18,
                    materialName: '救援绳索',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 19,
                    materialName: '救援软梯',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 20,
                    materialName: '救援起重垫',
                    num: '4',
                    place: '中心监控内展架'
                },
                {
                    id: 21,
                    materialName: '多功能担架',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 22,
                    materialName: '多功能水枪',
                    num: '6',
                    place: '中心监控内展架'
                },
                {
                    id: 23,
                    materialName: '快速转换接口',
                    num: '7',
                    place: '中心监控内展架'
                },
                {
                    id: 24,
                    materialName: '20米65mm/80mm消防水带',
                    num: '25',
                    place: '中心监控内展架'
                },
                {
                    id: 25,
                    materialName: '消防演习烟雾弹',
                    num: '8',
                    place: '中心监控内展架'
                },
                {
                    id: 26,
                    materialName: 'LED火焰灯',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 27,
                    materialName: '发光照明线',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 28,
                    materialName: '灭火毯',
                    num: '3',
                    place: '中心监控内展架'
                },
                {
                    id: 29,
                    materialName: '手持燃气测漏检测仪',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 30,
                    materialName: '大屏激光距仪',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 31,
                    materialName: '温度测试仪',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 32,
                    materialName: '汽油锯',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 33,
                    materialName: '手摇报警器',
                    num: '1',
                    place: '中心监控内展架'
                },
                {
                    id: 34,
                    materialName: '多功能讲解器',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 35,
                    materialName: '傲雷手电',
                    num: '1',
                    place: '中心监控内展架'
                }
            ];
        } else if (this.sign == '25号消防车随车装备统计表') {
            this.pager.total = 35;
            this.dataTable2 = [
                {
                    id: 1,
                    materialName: '正压式空气呼吸器',
                    unit: '具',
                    num: '3',
                    place: '驾驶室后排',
                    remarks: '-'
                },
                {
                    id: 2,
                    materialName: '吸水管扳手',
                    unit: '个',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 3,
                    materialName: '救援担架',
                    unit: '副',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 4,
                    materialName: '铁铲',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 5,
                    materialName: '铁铤',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '手抬机动泵',
                    unit: '台',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 7,
                    materialName: '灭火毯',
                    unit: '张',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 8,
                    materialName: '消防救援绳',
                    unit: '捆',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 9,
                    materialName: '消防灭火服',
                    unit: '套',
                    num: '4',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 10,
                    materialName: '地下消火栓扳手',
                    unit: '把',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 11,
                    materialName: '消防斧',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 12,
                    materialName: '消防尖斧头',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 13,
                    materialName: '消防员呼救器',
                    unit: '套',
                    num: '3',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 14,
                    materialName: '绝缘钳',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 15,
                    materialName: '头灯',
                    unit: '支',
                    num: '3',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 16,
                    materialName: '自救呼吸器',
                    unit: '盒',
                    num: '3',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 17,
                    materialName: '井盖挂钩',
                    unit: '把',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 18,
                    materialName: '消防手套',
                    unit: '10',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 19,
                    materialName: '绳包',
                    unit: '个',
                    num: '4',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 20,
                    materialName: '转换接头',
                    unit: '个',
                    num: '5',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 21,
                    materialName: '分水器2通式',
                    unit: '个',
                    num: '1',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 22,
                    materialName: '消防水带',
                    unit: '盘',
                    num: '5',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 23,
                    materialName: '吸水管转换接头',
                    unit: '个',
                    num: '1',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 24,
                    materialName: '灭火器',
                    unit: '具',
                    num: '2',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 25,
                    materialName: '水带包布',
                    unit: '卷',
                    num: '4',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 26,
                    materialName: '水带挂钩',
                    unit: '个',
                    num: '4',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 27,
                    materialName: '消防水带',
                    unit: '盘',
                    num: '14',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 28,
                    materialName: '分水器3通式',
                    unit: '个',
                    num: '1',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 29,
                    materialName: '扳手',
                    unit: '把',
                    num: '1',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 30,
                    materialName: '转换接头',
                    unit: '个',
                    num: '6',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 31,
                    materialName: '消防水带',
                    unit: '盘',
                    num: '5',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 32,
                    materialName: '吸水管扳手',
                    unit: '个',
                    num: '1',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 33,
                    materialName: '吸水管',
                    unit: '根',
                    num: '4',
                    place: '车顶',
                    remarks: '-'
                },
                {
                    id: 34,
                    materialName: '桡钩',
                    unit: '把',
                    num: '1',
                    place: '车顶',
                    remarks: '-'
                },
                {
                    id: 35,
                    materialName: '水枪',
                    unit: '支',
                    num: '4',
                    place: '后器材室',
                    remarks: '-'
                }
            ];
        } else if (this.sign == '26号消防车随车装备统计表') {
            this.pager.total = 37;
            this.dataTable3 = [
                {
                    id: 1,
                    materialName: '手电筒',
                    unit: '把',
                    num: '1',
                    place: '驾驶室',
                    remarks: '-'
                },
                {
                    id: 2,
                    materialName: '正压式空气呼吸器',
                    unit: '具',
                    num: '2',
                    place: '驾驶室后排',
                    remarks: '-'
                },
                {
                    id: 3,
                    materialName: '安全警示带',
                    unit: '卷',
                    num: '2',
                    place: '驾驶室后排',
                    remarks: '-'
                },
                {
                    id: 4,
                    materialName: '绝缘钳',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 5,
                    materialName: '轻型救援绳',
                    unit: '捆',
                    num: '4',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '灭火器',
                    unit: '具',
                    num: '3',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 7,
                    materialName: '扳手',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 8,
                    materialName: '过滤式自救呼吸器',
                    unit: '个',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 9,
                    materialName: '救援担架',
                    unit: '副',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 10,
                    materialName: '铁铲',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 11,
                    materialName: '铁铤',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 12,
                    materialName: '雨衣',
                    unit: '套',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 13,
                    materialName: '消防救援绳',
                    unit: '捆',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 14,
                    materialName: '地上消火栓扳手',
                    unit: '把',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 15,
                    materialName: '地下消火栓扳手',
                    unit: '把',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 16,
                    materialName: '消防斧',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 17,
                    materialName: '消防尖斧头',
                    unit: '把',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 18,
                    materialName: '泡沫枪吸管',
                    unit: '根',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 19,
                    materialName: '泡沫吸管',
                    unit: '根',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 20,
                    materialName: '灭火毯',
                    unit: '张',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 21,
                    materialName: '三脚架',
                    unit: '个',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 22,
                    materialName: '分水器3通式',
                    unit: '个',
                    num: '1个快口',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 23,
                    materialName: '消防水带',
                    unit: '盘',
                    num: '3盘80快口,6盘65快口',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 24,
                    materialName: '泡沫软管扳手',
                    unit: '把',
                    num: '2',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 25,
                    materialName: '机动切割机',
                    unit: '台',
                    num: '1',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 26,
                    materialName: '消防战斗服',
                    unit: '套',
                    num: '4',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 27,
                    materialName: '消防员呼救器',
                    unit: '套',
                    num: '3',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 28,
                    materialName: '头灯',
                    unit: '支',
                    num: '2',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 29,
                    materialName: '正压式空气呼吸器',
                    unit: '具',
                    num: '3',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 30,
                    materialName: '水带转换接头',
                    unit: '个',
                    num: '12',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 31,
                    materialName: '水带布包',
                    unit: '卷',
                    num: '2',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 32,
                    materialName: '水带挂钩',
                    unit: '个',
                    num: '3',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 33,
                    materialName: '分水器3通式',
                    unit: '个',
                    num: '1个快口',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 34,
                    materialName: '消防水带',
                    unit: '盘',
                    num: '2盘80快口,8盘65快口',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 35,
                    materialName: '二节拉梯',
                    unit: '个',
                    num: '1',
                    place: '车顶',
                    remarks: '-'
                },
                {
                    id: 36,
                    materialName: '火钩',
                    unit: '个',
                    num: '1',
                    place: '车顶',
                    remarks: '-'
                },
                {
                    id: 37,
                    materialName: '水枪',
                    unit: '支',
                    num: '2把快口直流,2把快口多功能,2把快口泡沫',
                    place: '后器材室',
                    remarks: '-'
                }
            ];
        } else if (this.sign == '28号云梯车随车装备统计表') {
            this.pager.total = 10;
            this.dataTable4 = [
                {
                    id: 1,
                    materialName: '消防救援软梯',
                    unit: '部',
                    num: '1',
                    place: '驾驶室后排',
                    remarks: '-'
                },
                {
                    id: 2,
                    materialName: '抢险服',
                    unit: '套',
                    num: '1',
                    place: '驾驶室后排',
                    remarks: '-'
                },
                {
                    id: 3,
                    materialName: '地上消火栓扳手',
                    unit: '个',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 4,
                    materialName: '吸水管转换接头',
                    unit: '个',
                    num: '1',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 5,
                    materialName: '安全绳',
                    unit: '套',
                    num: '2',
                    place: '右前储物箱',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '安全头盔',
                    unit: '个',
                    num: '2',
                    place: '右前储物箱',
                    remarks: '-'
                },
                {
                    id: 7,
                    materialName: '吸水管扳手',
                    unit: '个',
                    num: '1',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 8,
                    materialName: '水带',
                    unit: '盘',
                    num: '4',
                    place: '右中器材室',
                    remarks: '-'
                },
                {
                    id: 9,
                    materialName: '灭火器',
                    unit: '具',
                    num: '1',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 10,
                    materialName: '转换接头',
                    unit: '个',
                    num: '4',
                    place: '右后器材室',
                    remarks: '-'
                }
            ];
        } else if (this.sign == 'B12号排烟车随车装备统计表') {
            this.pager.total = 30;
            this.dataTable5 = [
                {
                    id: 1,
                    materialName: '消火栓扳手',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 2,
                    materialName: '铁铤',
                    unit: '把',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 3,
                    materialName: '地下消火栓扳手',
                    unit: '把',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 4,
                    materialName: '排烟机',
                    unit: '个',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 5,
                    materialName: '导向绳',
                    unit: '跟',
                    num: '2',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '排烟管',
                    unit: '个',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 7,
                    materialName: '正压式空气呼吸器',
                    unit: '具',
                    num: '1',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 8,
                    materialName: '灭火器',
                    unit: '具',
                    num: '2',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 9,
                    materialName: '水枪',
                    unit: '支',
                    num: '2个65卡口',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 10,
                    materialName: '接线盘',
                    unit: '个',
                    num: '1',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 11,
                    materialName: '头盔',
                    unit: '顶',
                    num: '1',
                    place: '左后器材室',
                    remarks: '-'
                },
                {
                    id: 12,
                    materialName: '消防灭火服',
                    unit: '套',
                    num: '2',
                    place: '中间器材室',
                    remarks: '-'
                },
                {
                    id: 13,
                    materialName: '雨衣',
                    unit: '件',
                    num: '10',
                    place: '中间器材室',
                    remarks: '-'
                },
                {
                    id: 14,
                    materialName: '腰斧',
                    unit: '把',
                    num: '2',
                    place: '中间器材室',
                    remarks: '-'
                },
                {
                    id: 15,
                    materialName: '分水器2通式',
                    unit: '个',
                    num: '1个卡口',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 16,
                    materialName: '铁锹',
                    unit: '把',
                    num: '1',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 17,
                    materialName: '消防救援绳',
                    unit: '捆',
                    num: '1',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 18,
                    materialName: '排烟管',
                    unit: '个',
                    num: '1',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 19,
                    materialName: '水炮',
                    unit: '台',
                    num: '1',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 20,
                    materialName: '消防水带',
                    unit: '盘',
                    num: '2盘65卡口',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 21,
                    materialName: '头盔',
                    unit: '顶',
                    num: '1',
                    place: '右后器材室',
                    remarks: '-'
                },
                {
                    id: 22,
                    materialName: '发电机',
                    unit: '台',
                    num: '1',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 23,
                    materialName: '灭火毯',
                    unit: '张',
                    num: '1',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 24,
                    materialName: '反光背心',
                    unit: '件',
                    num: '1',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 25,
                    materialName: '过滤式自救呼吸器',
                    unit: '个',
                    num: '7',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 26,
                    materialName: '绝缘鞋',
                    unit: '双',
                    num: '2',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 27,
                    materialName: '应急灯',
                    unit: '个',
                    num: '1',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 28,
                    materialName: '防爆灯',
                    unit: '个',
                    num: '1',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 29,
                    materialName: '抢险救援服',
                    unit: '套',
                    num: '2',
                    place: '后器材室',
                    remarks: '-'
                },
                {
                    id: 30,
                    materialName: '正压式空气呼吸器',
                    unit: '具',
                    num: '1',
                    place: '后器材室',
                    remarks: '-'
                }
            ];
        }
        console.log();
        this.testTbale = this.dataTable.slice(0, 10);
        this.testTbale1 = this.dataTable1.slice(0, 10);
        this.testTbale2 = this.dataTable2.slice(0, 10);
        this.testTbale3 = this.dataTable3.slice(0, 10);
        this.testTbale4 = this.dataTable4.slice(0, 10);
        this.testTbale5 = this.dataTable5.slice(0, 10);
    },
    methods: {
        getList() {
            console.log(this.pager);
            this.testTbale = this.dataTable.slice((this.pager.pageIndex - 1) * this.pager.pageSize, this.pager.pageIndex * this.pager.pageSize);
            // console.log(this.testTbale,this.dataTable);
            this.testTbale1 = this.dataTable1.slice((this.pager.pageIndex - 1) * this.pager.pageSize, this.pager.pageIndex * this.pager.pageSize);
            this.testTbale2 = this.dataTable2.slice((this.pager.pageIndex - 1) * this.pager.pageSize, this.pager.pageIndex * this.pager.pageSize);
            this.testTbale3 = this.dataTable3.slice((this.pager.pageIndex - 1) * this.pager.pageSize, this.pager.pageIndex * this.pager.pageSize);
            this.testTbale4 = this.dataTable4.slice((this.pager.pageIndex - 1) * this.pager.pageSize, this.pager.pageIndex * this.pager.pageSize);
            this.testTbale5 = this.dataTable5.slice((this.pager.pageIndex - 1) * this.pager.pageSize, this.pager.pageIndex * this.pager.pageSize);
        },
        intoLayer1() {
            this.currentLayerLevel = 1;
        },
        intoLayer2() {
            //前往第二层
            this.currentLayerLevel = 2;
        },
        handleViewDetailClick(item) {
            console.log('点击了查看数据');
            this.$emit('viewDetailOnclick', item);
        },

        intoLayerDedail(val) {
            console.dir(val);
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="scss">
.tableConent {
    border: 2px solid #1f5074 !important;
}

.tableHeader {
    text-align: left;
    width: 100%;
    height: 24px;
    background-color: #1c3e61 !important;
    line-height: 24px;
}

.firstLevel_header {
    text-align: center;
}

.classReadyDialog {
    width: 100%;
    height: 100%;

    .tabelCon {
        background-color: #1c2232;

        .el-table th,
        .el-table td,
        .el-table--border {
            background-color: #1c2232 !important;
            border: none !important;
        }

        .el-table td {
            color: #fff;
        }

        .el-table::before {
            background-color: #1c2232 !important;
        }
    }

    box-sizing: border-box;

    .safetheaderCon {
        background-color: #2b4b6b;
        color: #fff;
        padding: 10px;
    }

    .cursCbox {
        position: absolute;
        width: 66%;
        height: 66px;
        // background-color: red;
        left: 50%;
        top: 16%;
        transform: translateX(-50%);
        cursor: pointer;
    }

    .cursCbox1 {
        position: absolute;
        width: 58px;
        height: 170px;
        // background-color: red;
        left: 26%;
        bottom: 3%;
        cursor: pointer;
    }

    .cursCbox2 {
        position: absolute;
        // background-color: red;
        left: 6%;
        top: 6%;
        cursor: pointer;
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

/deep/.is-active {
    background-color: #1671c9 !important;
}

/deep/.globalCenterIndexCon .el-radio-group .is-active .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #1671c9 !important;
    border-color: #1671c9 !important;
}

.buttom_clean {
    width: 56px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #fff !important;
    background-color: #2d4778;
    margin: auto;
}

.el-button--small {
    color: #fff !important;
}
</style>
