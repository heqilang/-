<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div v-if="currentLayerLevel == 1" style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div style="cursor: pointer; margin-bottom: 12px" v-if="showF != 'first'" @click="showF == 'second' ? (showF = 'first') : (showF = 'second')">< 返回</div>
                <div v-if="showF == 'first'" class="firstLevel_header">
                    <el-radio-group v-model="radio4" size="medium" fill="#1671f9">
                        <el-radio-button label="消防队"></el-radio-button>
                        <el-radio-button label="消防物资"></el-radio-button>
                    </el-radio-group>

                    <div v-if="radio4 == '消防队'">
                        <div style="margin-top: 20px" class="tableConent">
                            <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                            <div class="tabelCon" v-if="radio4 == '消防队'">
                                <div class="tableHeader">政府专职消防队</div>
                                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                    <el-table-column align="center" prop="teamName" label="队伍名称"> </el-table-column>
                                    <el-table-column align="center" prop="personNum" label="队伍人数"> </el-table-column>

                                    <el-table-column align="center" prop="concat" label="联系人"> </el-table-column>
                                    <el-table-column align="center" prop="phone" label="联系电话"> </el-table-column>
                                    <el-table-column align="center" prop="searve" label="服务电话"> </el-table-column>

                                    <el-table-column align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="buttom_clean">
                                                <el-button type="text" size="small" @click="intoLayer2('政府专职消防队')">查看</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div style="margin-top: 20px" class="tableConent">
                            <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                            <div class="tabelCon" v-if="radio4 == '消防队'">
                                <div class="tableHeader">企业消防队</div>
                                <el-table :data="tableData_a" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                    <el-table-column align="center" prop="teamName" label="队伍名称"> </el-table-column>
                                    <el-table-column align="center" prop="personNum" label="队伍人数"> </el-table-column>
                                    <el-table-column align="center" prop="concat" label="联系人"> </el-table-column>
                                    <el-table-column align="center" prop="phone" label="联系电话"> </el-table-column>
                                    <el-table-column align="center" prop="searve" label="服务电话"> </el-table-column>
                                    <el-table-column align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="buttom_clean">
                                                <el-button type="text" size="small" @click="intoLayer2('企业消防队')">查看</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>

                        <div style="margin-top: 20px" class="tableConent">
                            <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                            <div class="tabelCon" v-if="radio4 == '消防队'">
                                <div class="tableHeader">微型消防站</div>
                                <el-table :data="tableData_b" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                    <el-table-column align="center" prop="teamName" label="队伍名称"> </el-table-column>
                                    <el-table-column align="center" prop="personNum" label="队伍人数"> </el-table-column>
                                    <el-table-column align="center" prop="concat" label="联系人"> </el-table-column>
                                    <el-table-column align="center" prop="phone" label="联系电话"> </el-table-column>
                                    <el-table-column align="center" prop="searve" label="服务电话"> </el-table-column>
                                    <el-table-column align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="buttom_clean">
                                                <el-button type="text" size="small" @click="intoLayer2('微型消防站')">查看</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div v-if="pager.pageIndex == 1">
                            <div style="margin-top: 20px" class="tableConent">
                                <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                                <div class="tabelCon">
                                    <div class="tableHeader">中心监控应急物资清单</div>
                                    <el-table :data="tableData_1" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                        <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                        <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                        <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                        <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                                <div class="buttom_clean">
                                                    <el-button type="text" size="small" @click="intoLayerDedail('中心监控应急物资清单')">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>

                            <div style="margin-top: 20px" class="tableConent">
                                <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                                <div class="tabelCon">
                                    <div class="tableHeader">(中心监控)应急救援物资清单</div>
                                    <el-table :data="tableData_2" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                        <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                        <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                        <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                        <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                                <div class="buttom_clean">
                                                    <el-button type="text" size="small" @click="intoLayerDedail('(中心监控)应急救援物资清单')">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>

                            <div style="margin-top: 20px" class="tableConent">
                                <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                                <div class="tabelCon">
                                    <div class="tableHeader">25号消防车随车装备统计表</div>
                                    <el-table :data="tableData_3" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                        <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                        <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                        <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                        <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                                <div class="buttom_clean">
                                                    <el-button type="text" size="small" @click="intoLayerDedail('25号消防车随车装备统计表')">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>

                            <div style="margin-top: 20px" class="tableConent">
                                <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                                <div class="tabelCon">
                                    <div class="tableHeader">26号消防车随车装备统计表</div>
                                    <el-table :data="tableData_4" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                        <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                        <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                        <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                        <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                                <div class="buttom_clean">
                                                    <el-button type="text" size="small" @click="intoLayerDedail('26号消防车随车装备统计表')">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>

                            <div style="margin-top: 20px" class="tableConent">
                                <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                                <div class="tabelCon">
                                    <div class="tableHeader">28号云梯车随车装备统计表</div>
                                    <el-table :data="tableData_5" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                        <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                        <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                        <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                        <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                                <div class="buttom_clean">
                                                    <el-button type="text" size="small" @click="intoLayerDedail('28号云梯车随车装备统计表')">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div v-if="pager.pageIndex == 2">
                            <div style="margin-top: 20px" class="tableConent">
                                <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                                <div class="tabelCon">
                                    <div class="tableHeader">B12号排烟车随车装备统计表</div>
                                    <el-table :data="tableData_6" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                        <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                        <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                        <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                        <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                                <div class="buttom_clean">
                                                    <el-button type="text" size="small" @click="intoLayerDedail('B12号排烟车随车装备统计表')">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <!-- <div style="margin-top: 20px" class="tableConent">
                            <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" />
                            <div class="tabelCon">
                                <div class="tableHeader">东北区消防器材清单</div>
                                <el-table :data="tableData_7" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                    <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                    <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                    <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                    <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                    <el-table-column align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="buttom_clean">
                                                <el-button type="text" size="small">查看</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div> -->

                        <!-- <div style="margin-top: 20px" class="tableConent">
                            <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" />
                            <div class="tabelCon">
                                <div class="tableHeader">东北秩序部防暴应急物资清单</div>
                                <el-table :data="tableData_8" style="width: 100%" :header-cell-style="{ color: '#636c77' }">
                                    <el-table-column align="center" prop="teamName" label="物资清单名称"> </el-table-column>
                                    <el-table-column align="center" prop="personNum" label="物资类型(项)"> </el-table-column>

                                    <el-table-column align="center" prop="concat" label="物资数量"> </el-table-column>
                                    <el-table-column align="center" prop="phone" label="保管使用部门"> </el-table-column>

                                    <el-table-column align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="buttom_clean">
                                                <el-button type="text" size="small" @click="intoLayer4()">查看</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div> -->
                        <div class="text_c mar-t-18">
                            <!-- 分页 -->
                            <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="loadListData"></customPagination>
                        </div>
                    </div>
                </div>
                <div v-if="showF == 'second'">
                    <el-radio-group v-model="radio1" size="mini">
                        <el-radio-button label="人员"></el-radio-button>
                        <el-radio-button label="配置"></el-radio-button>
                    </el-radio-group>
                    <div style="margin-top: 20px">
                        <img @click="showF = 'third'" v-if="radio1 == '人员'" style="width: 100%" src="../../../assets/images/globalCenterNew/PowerS1.jpg" alt="" />
                        <img @click="showF = 'third'" v-if="radio1 == '配置'" style="width: 100%" src="../../../assets/images/globalCenterNew/PowerS2.jpg" alt="" />
                    </div>
                </div>
                <div v-if="showF == 'third'">
                    <div style="margin-top: 20px">
                        <img style="width: 100%" src="../../../assets/images/globalCenterNew/powerThrd.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="stats-layer-container" v-if="currentLayerLevel === 2">
            <a class="return-upper-level-btn" v-on:click="intoLayer1()"><<</a>
            <!-- <patrolList v-if="currentLayerLevel === 2" :number="number" :dataRange="dataRange" :patrolStatus="activePatrolStatus" v-on:viewDetailOnclick="intoLayer3" /> -->
            <filterChild1 v-on:viewDetailOnclick="viewDetailOnclick" :imgSing="imgSing"></filterChild1>
        </div>
        <div class="stats-layer-container" v-if="currentLayerLevel === 3">
            <a class="return-upper-level-btn" v-on:click="intoLayer2()"><<</a>
            <!-- <patrolList v-if="currentLayerLevel === 2" :number="number" :dataRange="dataRange" :patrolStatus="activePatrolStatus" v-on:viewDetailOnclick="intoLayer3" /> -->
            <filterChild2 :imgSing="imgSing" :peopleSign="peopleSign"></filterChild2>
        </div>
        <div class="stats-layer-container" v-if="currentLayerLevel === 4">
            <a class="return-upper-level-btn" v-on:click="intoLayer1()"><<</a>
            <FirefightingMaterials v-on:viewDetailOnclickDetail="viewDetailOnclickDetail" :sign="sign"></FirefightingMaterials>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import filterChild1 from './filterChild1.vue';
import filterChild2 from './filterChild2.vue';
import FirefightingMaterials from './FirefightingMaterials.vue';
export default {
    props: ['safetyrespons', 'compType'],
    data() {
        return {
            currentLayerLevel: 1,
            tableData: [
                {
                    num: '01',
                    teamName: '政府专职消防队',
                    personNum: '20',
                    equip: '200',
                    concat: '任衍富',
                    phone: '13880481490',
                    searve: '-'
                }
            ],

            tableData_a: [
                {
                    num: '01',
                    teamName: '企业消防队',
                    personNum: '37',
                    equip: '200',
                    concat: '唐大根',
                    phone: '13730891958',
                    searve: '-'
                }
            ],

            tableData_1: [
                {
                    num: '01',
                    teamName: '中心监控物资清单',
                    personNum: '35',
                    equip: '200',
                    concat: '197',
                    phone: '安防管理部',
                    searve: '安防管理部'
                }
            ],

            tableData_2: [
                {
                    num: '01',
                    teamName: '(中心监控)应急救援物资清单',
                    personNum: '35',
                    equip: '200',
                    concat: '177',
                    phone: '-',
                    searve: '-'
                }
            ],
            tableData_3: [
                {
                    num: '01',
                    teamName: '25号消防车随车装备统计表',
                    personNum: '35',
                    equip: '200',
                    concat: '104',
                    phone: '-',
                    searve: '-'
                }
            ],
            tableData_4: [
                {
                    num: '01',
                    teamName: '26号消防车随车装备统计表 ',
                    personNum: '37',
                    equip: '200',
                    concat: '94',
                    phone: '-',
                    searve: '-'
                }
            ],
            tableData_5: [
                {
                    num: '01',
                    teamName: '28号云梯车随车装备统计表 ',
                    personNum: '10',
                    equip: '200',
                    concat: '18',
                    phone: '-',
                    searve: '-'
                }
            ],
            tableData_6: [
                {
                    num: '01',
                    teamName: 'B12号排烟车随车装备统计表 ',
                    personNum: '30',
                    equip: '200',
                    concat: '54',
                    phone: '-',
                    searve: '-'
                }
            ],
            tableData_7: [
                {
                    num: '01',
                    teamName: '东北区消防器材清单 ',
                    personNum: '9',
                    equip: '200',
                    concat: '4098',
                    phone: '-',
                    searve: '-'
                }
            ],
            tableData_8: [
                {
                    num: '01',
                    teamName: '东北秩序部防暴应急物资清单',
                    personNum: '14',
                    equip: '200',
                    concat: '144',
                    phone: '-',
                    searve: '-'
                }
            ],

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
                pageSize: 5,
                pageIndex: 1,
                total: 6
            },
            tabitemindex: 0,
            tablist: [
                { name: '重大隐患', value: '2' },
                { name: '一般隐患', value: '1' }
            ],
            dialogFormVisible: true,
            dataTable: [],
            timeLineData: '',
            sign: '', //跳转标识
            imgSing: '' //图片标识
        };
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        intoLayer1() {
            this.currentLayerLevel = 1;
        },
        intoLayer2(name) {
            //前往第二层
            if (name) {
                this.imgSing = name;
            }
            this.currentLayerLevel = 2;
        },
        viewDetailOnclick(item) {
            this.currentLayerLevel = 3;
            this.peopleSign = item;
            console.log('item>>>>>>.', item);
        },
        //2022年9月4日forrest
        intoLayerDedail(val) {
            //前往第二层
            if (val) {
                this.sign = val;
            }
            this.currentLayerLevel = 4;
        },
        viewDetailOnclickDetail(index, item) {
            this.currentLayerLevel = 5;
        },
        loadListData() {}
    },
    computed: {},
    components: {
        filterChild1,
        filterChild2,
        FirefightingMaterials
    }
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
