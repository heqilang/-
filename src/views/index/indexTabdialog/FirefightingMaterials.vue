<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div v-if="sign == '中心监控应急物资清单'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div></div>
                <el-table class="xf-table" :data="dataTable" style="width: 100%; margin-top: 30px">
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
            </div>
            <div v-if="sign == '(中心监控)应急救援物资清单'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="dataTable1" style="width: 100%; margin-top: 30px">
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
            </div>
            <div v-if="sign == '25号消防车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="dataTable2" style="width: 100%; margin-top: 30px">
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
            </div>
            <div v-if="sign == '26号消防车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="dataTable3" style="width: 100%; margin-top: 30px">
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
            </div>
            <div v-if="sign == '28号云梯车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="dataTable4" style="width: 100%; margin-top: 30px">
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
            </div>
            <div v-if="sign == 'B12号排烟车随车装备统计表'" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <el-table class="xf-table" :data="dataTable5" style="width: 100%; margin-top: 30px">
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
            dataTable: [],
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
                },
                {
                    id: 8,
                    materialName: '抢险救援服',
                    specifications: '/',
                    unit: '套',
                    num: '8',
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
                }
            ];
        } else if (this.sign == '(中心监控)应急救援物资清单') {
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
                    materialName: '抢险救援头盔',
                    num: '12',
                    place: '中心监控内展架'
                },
                {
                    id: 5,
                    materialName: '消防员灭火防护服',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 6,
                    materialName: '消防避火服',
                    num: '2',
                    place: '中心监控内展架'
                },
                {
                    id: 7,
                    materialName: '防峰服',
                    num: '9',
                    place: '中心监控内展架'
                },
                {
                    id: 8,
                    materialName: '抢险救援服',
                    num: '9',
                    place: '中心监控内展架'
                }
            ];
        } else if (this.sign == '25号消防车随车装备统计表') {
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
                    unit: '2',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 3,
                    materialName: '救援担架',
                    unit: '',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 4,
                    materialName: '铁铲',
                    unit: '1',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 5,
                    materialName: '铁铤',
                    unit: '1',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '手抬机动泵',
                    unit: '1',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 7,
                    materialName: '灭火毯',
                    unit: '1',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 8,
                    materialName: '消防救援绳',
                    unit: '1',
                    num: '14',
                    place: '左前器材室',
                    remarks: '-'
                }
            ];
        } else if (this.sign == '26号消防车随车装备统计表') {
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
                }
            ];
        } else if (this.sign == '28号云梯车随车装备统计表') {
            this.dataTable4 = [
                {
                    id: 1,
                    materialName: '消防救援软梯',
                    unit: '套',
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
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 5,
                    materialName: '安全绳',
                    unit: '套',
                    num: '2',
                    place: '右前器材室',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '安全头盔',
                    unit: '个',
                    num: '2',
                    place: '右前器材室',
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
                    place: '右中器材室',
                    remarks: '-'
                },
                {
                    id: 10,
                    materialName: '转换接头',
                    unit: '个',
                    num: '4',
                    place: '右中器材室',
                    remarks: '-'
                }
            ];
        } else if (this.sign == 'B12号排烟车随车装备统计表') {
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
                    num: '3',
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
                    num: '4',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 6,
                    materialName: '排烟管',
                    unit: '个',
                    num: '3',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 7,
                    materialName: '正压式空气呼吸器',
                    unit: '具',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                },
                {
                    id: 8,
                    materialName: '灭火器',
                    unit: '具',
                    num: '1',
                    place: '左前器材室',
                    remarks: '-'
                }
            ];
        }
    },
    methods: {
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
