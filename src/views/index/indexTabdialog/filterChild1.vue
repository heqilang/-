<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div v-if="currentLayerLevel == 1" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div style="cursor: pointer; margin-bottom: 12px" v-if="showF != 'first'" @click="showF == 'second' ? (showF = 'first') : (showF = 'second')">< 返回</div>
                <div v-if="showF == 'first'" class="firstLevel_header">
                    <el-radio-group v-model="radio4" size="medium" fill="#1671f9">
                        <el-radio-button label="组织机构"></el-radio-button>
                        <el-radio-button label="人员"></el-radio-button>
                        <el-radio-button v-if="imgSing == '企业消防队'" label="装备器材"></el-radio-button>
                        <el-radio-button v-if="imgSing == '企业消防队'" label="消防器材物资清单"></el-radio-button>
                    </el-radio-group>

                    <div v-if="radio4 == '组织机构'">
                        <img v-if="imgSing == '政府专职消防队'" style="width: 100%" src="../../../assets/images/zzimg.png" alt="" />
                        <img v-if="imgSing == '企业消防队'" style="width: 100%" src="../../../assets/images/qyimg.png" alt="" />
                        <img v-if="imgSing == '微型消防站'" style="width: 100%" src="../../../assets/images/orange.png" alt="" />
                    </div>

                    <div v-if="radio4 == '人员'">
                        <el-table class="xf-table" :data="dataTable" height="400" style="width: 100%">
                            <el-table-column align="center" prop="no" label="序号" :show-overflow-tooltip="true" width="180" />
                            <el-table-column align="center" prop="duty" label="职位" :show-overflow-tooltip="true" width="180" />
                            <el-table-column align="center" prop="bianzhi" label="编制" :show-overflow-tooltip="true" />
                            <el-table-column align="center" prop="have" label="现有" :show-overflow-tooltip="true" />
                            <el-table-column align="center" fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handleViewDetailClick(scope.row)">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                    </div>
                    <div v-if="radio4 == '装备器材'">
                        <el-table class="xf-table" :data="dataTable2" height="400" style="width: 100%">
                            <el-table-column align="center" prop="no" label="序号" :show-overflow-tooltip="true" width="180" />
                            <el-table-column align="center" prop="mc" label="名称" :show-overflow-tooltip="true" width="180" />
                            <el-table-column align="center" prop="pp" label="品牌" :show-overflow-tooltip="true" />
                            <el-table-column align="center" prop="sl" label="数量" :show-overflow-tooltip="true" />
                        </el-table>
                    </div>
                    <div v-if="radio4 == '消防器材物资清单'">
                        <el-table class="xf-table" :data="dataTable3" height="400" style="width: 100%">
                            <el-table-column align="center" prop="no" label="序号" :show-overflow-tooltip="true" width="180" />
                            <el-table-column align="center" prop="lx" label="类型" :show-overflow-tooltip="true" width="180" />
                            <el-table-column align="center" prop="mc" label="名称" :show-overflow-tooltip="true" />
                            <el-table-column align="center" prop="xh" label="型号" :show-overflow-tooltip="true" />
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['modleName', 'imgSing', 'radioChange'],
    data() {
        return {
            currentLayerLevel: 1,
            radio4: '组织机构',
            dataTable: [],
            dataTable2: [],
            dataTable3: [],
            arr: [
                /*      {

                title: 中心监控应急物资清单,

                    tableData: [
                        {
                            num: '01',
                            teamName: '中心监控物资清单',
                            personNum: '35',
                            equip: '200',
                            concat: '197',
                            phone: '安防管理部',
                            searve: '安防管理部'
                        }
                    ]

                 
                },  */
                /*  {
                    title: '(中心监控)备用应急物资清单',
                    tableData: [

                        {
                            num: '01',
                            teamName: '政府专职消防队',
                            personNum: '30',
                            equip: '200',
                            concat: '任衍富',
                            phone: '13880481490',
                            searve: '-'
                        }
                    ],



                   
                }  */
            ],

            tableData_b: [
                {
                    num: '01',
                    teamName: '微型消防站',
                    personNum: '17',
                    equip: '200',
                    concat: '王虎',
                    phone: '13551368121',
                    searve: '-'
                },
                {
                    num: '01',
                    teamName: '-',
                    personNum: '-',
                    equip: '-',
                    concat: '-',
                    phone: '-',
                    searve: '-'
                },
                {
                    num: '01',
                    teamName: '-',
                    equip: '-',
                    concat: '-',
                    phone: '-',
                    searve: '-'
                },
                {
                    num: '01',
                    teamName: '-',
                    personNum: '-',
                    equip: '-',
                    concat: '-',
                    phone: '-',
                    searve: '-'
                }
            ],

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
        this.radio4 = '组织机构';
        console.log('this.imgSing????>>>>>', this.imgSing);
        if (this.imgSing == '政府专职消防队') {
            this.dataTable = [
                {
                    no: '01',
                    duty: '队长',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '02',
                    duty: '代理指导员',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '03',
                    duty: '分队长',
                    bianzhi: '-',
                    have: '2'
                },
                {
                    no: '04',
                    duty: '文书',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '05',
                    duty: '班长',
                    bianzhi: '-',
                    have: '3'
                },
                {
                    no: '06',
                    duty: '副班长',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '07',
                    duty: '战斗员',
                    bianzhi: '-',
                    have: '9'
                },
                {
                    no: '08',
                    duty: '驾驶员',
                    bianzhi: '-',
                    have: '2'
                }
            ];
        } else if (this.imgSing == '企业消防队') {
            this.dataTable = [
                {
                    no: '01',
                    duty: '安防经理',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '02',
                    duty: '安防主管',
                    bianzhi: '-',
                    have: '3'
                },
                {
                    no: '03',
                    duty: '消防领班',
                    bianzhi: '-',
                    have: '3'
                },
                {
                    no: '04',
                    duty: '消防员',
                    bianzhi: '-',
                    have: '23'
                },
                {
                    no: '05',
                    duty: '驾驶员',
                    bianzhi: '-',
                    have: '7'
                }
            ];
        } else if (this.imgSing == '微型消防站') {
            this.dataTable = [
                {
                    no: '01',
                    duty: '站长',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '02',
                    duty: '副站长',
                    bianzhi: '-',
                    have: '1'
                },
                {
                    no: '03',
                    duty: '队长',
                    bianzhi: '-',
                    have: '3'
                },
                {
                    no: '04',
                    duty: '专职义务消防员',
                    bianzhi: '-',
                    have: '12'
                }
            ];
        }

        this.dataTable2 = [
            {
                no: '01',
                mc: '泡沫水罐车',
                pp: '五十铃',
                sl: '1台'
            },
            {
                no: '02',
                mc: '水罐车',
                pp: '五十铃',
                sl: '1台'
            },
            {
                no: '03',
                mc: '登高平台车',
                pp: '-',
                sl: '1台'
            },
            {
                no: '04',
                mc: '四轮巡逻车',
                pp: '五十铃',
                sl: '3台'
            },
            {
                no: '05',
                mc: '个人防护装备',
                pp: '-',
                sl: '1台'
            },
            {
                no: '06',
                mc: '灭火器材',
                pp: '-',
                sl: '1台'
            },
            {
                no: '07',
                mc: '破拆工具',
                pp: '-',
                sl: '1台'
            },
            {
                no: '08',
                mc: '救援装备',
                pp: '-',
                sl: '1台'
            }
        ];

        this.dataTable3 = [
            {
                no: '01',
                lx: '消防器材',
                mc: '消防员避火防护服',
                xh: 'HAT-BHF'
            },
            {
                no: '02',
                lx: '消防器材',
                mc: '消防员灭火防护服',
                xh: 'ZFMH-YZHA D'
            },
            {
                no: '03',
                lx: '消防器材',
                mc: '抢险救援服',
                xh: 'RJF-F'
            },
            {
                no: '04',
                lx: '消防器材',
                mc: '救生衣背心',
                xh: '谋福 233'
            },
            {
                no: '05',
                lx: '消防器材',
                mc: '双风扇防蜂服',
                xh: '宏兴（HongXing）DA-034'
            },
            {
                no: '06',
                lx: '消防器材',
                mc: '手摇报警器',
                xh: 'SY-100型手摇警报器'
            },
            {
                no: '07',
                lx: '消防器材',
                mc: '模拟火盆',
                xh: 'YL-LS006DMX'
            },
            {
                no: '08',
                lx: '消防器材',
                mc: '手抬机动泵',
                xh: 'G10D55S038988F'
            }
        ];

        this.radio4 = this.radioChange;
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
            console.log('点击了查看数据人员');
            console.log('item', item);
            this.$emit('viewDetailOnclick', item);
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
