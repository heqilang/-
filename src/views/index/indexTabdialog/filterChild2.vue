<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <!-- {
                no: '01',
                name: '刘洪野',
                sex: '男',
                duty: '分队长',
                phone: '18682757363',
                intoTime:'2014/06'
            }, -->
            <div v-if="currentLayerLevel == 1" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div style="cursor: pointer; margin-bottom: 12px" v-if="showF != 'first'" @click="showF == 'second' ? (showF = 'first') : (showF = 'second')">< 返回</div>
                <div v-if="showF == 'first'" class="firstLevel_header">
                    <el-table class="xf-table" :data="dataTable" height="500" style="width: 100%">
                        <el-table-column align="center" prop="no" label="序号" :show-overflow-tooltip="true" width="180" />
                        <el-table-column align="center" prop="name" label="姓名" :show-overflow-tooltip="true" width="180" />
                        <el-table-column align="center" prop="sex" label="性别" :show-overflow-tooltip="true" />
                        <el-table-column align="center" prop="duty" label="职位" :show-overflow-tooltip="true" />
                        <el-table-column align="center" prop="phone" label="联系电话" :show-overflow-tooltip="true" />
                        <el-table-column align="phone" prop="intoTime" label="入职时间" :show-overflow-tooltip="true" />
                        <el-table-column align="phone" prop="by" label="是否服役" :show-overflow-tooltip="true" />
                        <!-- <el-table-column align="center" fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleViewDetailClick(scope.row)">查看</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"></el-pagination> -->
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="loadListData"></customPagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['safetyrespons', 'compType', 'imgSing', 'peopleSign'],
    data() {
        return {
            currentLayerLevel: 1,
            radio4: '组织机构',
            dataTable: [],
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
                pageSize: 5,
                pageIndex: 1,
                total: 8
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
        console.log('peopleSign', this.peopleSign);
        this.radio4 = '组织机构';
        if (this.imgSing == '政府专职消防队') {
            if (this.peopleSign.duty == '队长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '任衍富',
                        sex: '男',
                        duty: '队长',
                        phone: '13880481490',
                        intoTime: '2009.02',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '代理指导员') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '杜开龙',
                        sex: '男',
                        duty: '代理指导员',
                        phone: '13608184734',
                        intoTime: '2016.02',
                        by: '是'
                    }
                ];
            } else if (this.peopleSign.duty == '分队长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '刘洪野',
                        sex: '男',
                        duty: '分队长',
                        phone: '18682759535',
                        intoTime: '2014.06',
                        by: '是'
                    },
                    {
                        no: '02',
                        name: '瞿  磊',
                        sex: '男',
                        duty: '分队长',
                        phone: '15756258545',
                        intoTime: '2017.06',
                        by: '是'
                    }
                ];
            } else if (this.peopleSign.duty == '文书') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '孙崇文',
                        sex: '男',
                        duty: '文书',
                        phone: '18281605116',
                        intoTime: '2022.05',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '班长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '肖文涛',
                        sex: '男',
                        duty: '班长',
                        phone: '18382555545',
                        intoTime: '2014.07',
                        by: '否'
                    },
                    {
                        no: '02',
                        name: '高  鑫',
                        sex: '男',
                        duty: '班长',
                        phone: '17323245011',
                        intoTime: '2019.09',
                        by: '是'
                    },
                    {
                        no: '03',
                        name: '周云生',
                        sex: '男',
                        duty: '班长',
                        phone: '18281605116',
                        intoTime: '2019.09',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '副班长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '罗  旺',
                        sex: '男',
                        duty: '副班长',
                        phone: '18583735080',
                        intoTime: '2013.03',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '战斗员') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '郭佳明',
                        sex: '男',
                        duty: '战斗员',
                        phone: '15882328540',
                        intoTime: '2020.09',
                        by: '否'
                    },
                    {
                        no: '02',
                        name: '刘骏杰',
                        sex: '男',
                        duty: '战斗员',
                        phone: '15680007944',
                        intoTime: '2022.06',
                        by: '是'
                    },
                    {
                        no: '03',
                        name: '何治汶',
                        sex: '男',
                        duty: '战斗员',
                        phone: '13548091120',
                        intoTime: '2022.06',
                        by: '否'
                    },
                    {
                        no: '04',
                        name: '范  波',
                        sex: '男',
                        duty: '战斗员',
                        phone: '17889102095',
                        intoTime: '2021.09',
                        by: '是'
                    },
                    {
                        no: '05',
                        name: '邓  川',
                        sex: '男',
                        duty: '战斗员',
                        phone: '17381496679',
                        intoTime: '2022.05',
                        by: '否'
                    },
                    {
                        no: '06',
                        name: '冯长春',
                        sex: '男',
                        duty: '战斗员',
                        phone: '13550840157',
                        intoTime: '2022.05',
                        by: '否'
                    },
                    {
                        no: '07',
                        name: '闵达',
                        sex: '男',
                        duty: '战斗员',
                        phone: '18283527517',
                        intoTime: '2022.05',
                        by: '是'
                    },
                    {
                        no: '08',
                        name: '刘  洋',
                        sex: '男',
                        duty: '战斗员',
                        phone: '13881757004',
                        intoTime: '2022.05',
                        by: '否'
                    },
                    {
                        no: '09',
                        name: '高  健',
                        sex: '男',
                        duty: '战斗员',
                        phone: '15881226556',
                        intoTime: '2022.05',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '驾驶员') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '秦大祥',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '1354040128（632611)',
                        intoTime: '2019.02',
                        by: '是'
                    },
                    {
                        no: '02',
                        name: '杜劲松',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '15884468903',
                        intoTime: '2022.05',
                        by: '是'
                    }
                ];
            }
        } else if (this.imgSing == '企业消防队') {
            if (this.peopleSign.duty == '安防经理') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '唐大根',
                        sex: '男',
                        duty: '安防经理',
                        phone: '13730891958',
                        intoTime: '2007/11/20',
                        by: '是'
                    }
                ];
            } else if (this.peopleSign.duty == '安防主管') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '刘德明',
                        sex: '男',
                        duty: '安防主管',
                        phone: '18008096532',
                        intoTime: '2007/3/29',
                        by: '是'
                    },
                    {
                        no: '02',
                        name: '廖小龙',
                        sex: '男',
                        duty: '安防主管',
                        phone: '15182398225',
                        intoTime: '2015/1/29',
                        by: '是'
                    },
                    {
                        no: '03',
                        name: '任 超',
                        sex: '男',
                        duty: '安防主管',
                        phone: '13540026657',
                        intoTime: '2012/8/6',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '消防领班') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '何 龙',
                        sex: '男',
                        duty: '消防领班',
                        phone: '13198534525',
                        intoTime: '2017/4/10',
                        by: '是'
                    },
                    {
                        no: '02',
                        name: '黄 帅',
                        sex: '男',
                        duty: '消防领班',
                        phone: '13212349955',
                        intoTime: '2018/5/10',
                        by: '是'
                    },
                    {
                        no: '03',
                        name: '邓 军',
                        sex: '男',
                        duty: '消防领班',
                        phone: '13551246073',
                        intoTime: '2018/10/9',
                        by: '否'
                    }
                ];
            } else if (this.peopleSign.duty == '消防员') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '胡龙彬',
                        sex: '男',
                        duty: '消防员',
                        phone: '15908190629',
                        intoTime: '2014/4/5',
                        by: '否'
                    },
                    {
                        no: '02',
                        name: '张青林',
                        sex: '男',
                        duty: '消防员',
                        phone: '15881077622',
                        intoTime: '2015/9/29',
                        by: '是'
                    },
                    {
                        no: '03',
                        name: '李继翔',
                        sex: '男',
                        duty: '消防员',
                        phone: '17711560521',
                        intoTime: '2017/11/28',
                        by: '是'
                    },
                    {
                        no: '04',
                        name: '杨伟粒',
                        sex: '男',
                        duty: '消防员',
                        phone: '13684141020',
                        intoTime: '2018/3/26',
                        by: '是'
                    },
                    {
                        no: '05',
                        name: '孙 建',
                        sex: '男',
                        duty: '消防员',
                        phone: '13696082741',
                        intoTime: '2018/5/2',
                        by: '是'
                    },
                    {
                        no: '06',
                        name: '张袁能',
                        sex: '男',
                        duty: '消防员',
                        phone: '18227657232',
                        intoTime: '2018/6/5',
                        by: '否'
                    },
                    {
                        no: '07',
                        name: '许霁鹏',
                        sex: '男',
                        duty: '消防员',
                        phone: '13696157581',
                        intoTime: '2018/6/22',
                        by: '是'
                    },
                    {
                        no: '08',
                        name: '张文强',
                        sex: '男',
                        duty: '消防员',
                        phone: '15282264644',
                        intoTime: '2019/1/16',
                        by: '是'
                    },
                    {
                        no: '09',
                        name: '姚 建',
                        sex: '男',
                        duty: '消防员',
                        phone: '15828054451',
                        intoTime: '2019/1/21',
                        by: '是'
                    },
                    {
                        no: '10',
                        name: '李建波',
                        sex: '男',
                        duty: '消防员',
                        phone: '18215528154',
                        intoTime: '2019/3/19',
                        by: '是'
                    },
                    {
                        no: '11',
                        name: '张鑫洋',
                        sex: '男',
                        duty: '消防员',
                        phone: '18208155414',
                        intoTime: '2020/10/26',
                        by: '否'
                    },
                    {
                        no: '12',
                        name: '黄国铮',
                        sex: '男',
                        duty: '消防员',
                        phone: '18349174468',
                        intoTime: '2020/11/2',
                        by: '是'
                    },
                    {
                        no: '13',
                        name: '刘金升',
                        sex: '男',
                        duty: '消防员',
                        phone: '18508259228',
                        intoTime: '2022.05',
                        by: '是'
                    },
                    {
                        no: '14',
                        name: '许文武',
                        sex: '男',
                        duty: '消防员',
                        phone: '18384236552',
                        intoTime: '2021/4/9',
                        by: '是'
                    },
                    {
                        no: '15',
                        name: '赖 欢',
                        sex: '男',
                        duty: '消防员',
                        phone: '17723474686',
                        intoTime: '2021/5/17',
                        by: '是'
                    },
                    {
                        no: '16',
                        name: '吴 丹',
                        sex: '男',
                        duty: '消防员',
                        phone: '18582898949',
                        intoTime: '2021/6/28',
                        by: '否'
                    },
                    {
                        no: '17',
                        name: '程 浩',
                        sex: '男',
                        duty: '消防员',
                        phone: '13096161070',
                        intoTime: '2021/7/2',
                        by: '是'
                    },
                    {
                        no: '18',
                        name: '田 洲',
                        sex: '男',
                        duty: '消防员',
                        phone: '17608733580',
                        intoTime: '2021/7/17',
                        by: '是'
                    },
                    {
                        no: '19',
                        name: '张 波',
                        sex: '男',
                        duty: '消防员',
                        phone: '13032878168',
                        intoTime: '2021/8/23',
                        by: '是'
                    },
                    {
                        no: '20',
                        name: '罗 林',
                        sex: '男',
                        duty: '消防员',
                        phone: '17623880762',
                        intoTime: '2022.05',
                        by: '是'
                    },
                    {
                        no: '21',
                        name: '晋磊',
                        sex: '男',
                        duty: '消防员',
                        phone: '15209716186',
                        intoTime: '2021/11/15',
                        by: '是'
                    },

                    {
                        no: '22',
                        name: '文屈',
                        sex: '男',
                        duty: '消防员',
                        phone: '18584323545',
                        intoTime: '2021/3/4',
                        by: '是'
                    },
                    {
                        no: '23',
                        name: '张虎',
                        sex: '男',
                        duty: '消防员',
                        phone: '19822933667',
                        intoTime: '2022/4/20',
                        by: '是'
                    }
                ];
            } else if (this.peopleSign.duty == '驾驶员') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '杨凤军',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '15928856996',
                        intoTime: '2013/4/25',
                        by: '否'
                    },
                    {
                        no: '02',
                        name: '王 军',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '13880487961',
                        intoTime: '2014/7/1',
                        by: '否'
                    },
                    {
                        no: '03',
                        name: '夏俊明',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '18981717750',
                        intoTime: '2014/7/10',
                        by: '否'
                    },
                    {
                        no: '04',
                        name: '张青林',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '15881077622',
                        intoTime: '2015/9/29',
                        by: '是'
                    },
                    {
                        no: '05',
                        name: '李财富',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '15828482406',
                        intoTime: '2015/12/3',
                        by: '否'
                    },
                    {
                        no: '06',
                        name: '彭 广',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '15928558705',
                        intoTime: '2016/10/8',
                        by: '是'
                    },
                    {
                        no: '07',
                        name: '杨 震',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '13908075671',
                        intoTime: '2018/4/4',
                        by: '否'
                    },
                    {
                        no: '08',
                        name: '宋 微',
                        sex: '男',
                        duty: '驾驶员',
                        phone: '18990350458',
                        intoTime: '2021/3/12',
                        by: '否'
                    }
                ];
            }
        } else if (this.imgSing == '微型消防站') {
            if (this.peopleSign.duty == '站长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '王虎',
                        sex: '男',
                        duty: '站长',
                        phone: '13551368121'
                    }
                ];
            } else if (this.peopleSign.duty == '副站长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '王润',
                        sex: '男',
                        duty: '副站长',
                        phone: '18782111009'
                    }
                ];
            } else if (this.peopleSign.duty == '队长') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '陈熙',
                        sex: '男',
                        duty: '队长',
                        phone: '13688020627'
                    },
                    {
                        no: '02',
                        name: '廖 刚',
                        sex: '男',
                        duty: '队长',
                        phone: '18780266467'
                    },
                    {
                        no: '03',
                        name: '刘本良',
                        sex: '男',
                        duty: '队长',
                        phone: '15184399456'
                    }
                ];
            } else if (this.peopleSign.duty == '专职义务消防员') {
                this.dataTable = [
                    {
                        no: '01',
                        name: '陈仕敏',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '18482287267'
                    },
                    {
                        no: '02',
                        name: '何宁',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '13541230481'
                    },
                    {
                        no: '03',
                        name: '左光全',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '15882028547'
                    },
                    {
                        no: '04',
                        name: '张文俊',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '18482190877'
                    },
                    {
                        no: '05',
                        name: '邹莉',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '18780162387'
                    },
                    {
                        no: '06',
                        name: '古洪仙',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '15008496702'
                    },
                    {
                        no: '07',
                        name: '白洋',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '166082736498'
                    },
                    {
                        no: '08',
                        name: '王永燕',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '18728797195'
                    },
                    {
                        no: '09',
                        name: '董朝斌',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '13688020627'
                    },
                    {
                        no: '10',
                        name: '唐斌',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '15682377675'
                    },
                    {
                        no: '11',
                        name: '罗勇',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '17752545774'
                    },
                    {
                        no: '12',
                        name: '倪红军',
                        sex: '男',
                        duty: '专职义务消防员',
                        phone: '17381999320'
                    }
                ];
            }
        }
        // this.dataTable = [
        //     {
        //         no: '01',
        //         name: '刘洪野',
        //         sex: '男',
        //         duty: '分队长',
        //         phone: '18682757363',
        //         intoTime: '2014/06',
        //         by: '是'
        //     }
        //     // {
        //     //     no: '02',
        //     //     name: '曲磊',
        //     //     sex: '男',
        //     //     duty: '分队长',
        //     //     phone: '15728374951',
        //     //     intoTime: '2017/06',
        //     //     by: '是'
        //     // }
        // ];
    },
    methods: {
        intoLayer1() {
            this.currentLayerLevel = 1;
        },
        intoLayer2() {
            //前往第二层
            this.currentLayerLevel = 2;
        },
        loadListData() {
            let _self = this;
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
