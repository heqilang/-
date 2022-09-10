<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div class="safetheaderCon">消防力量</div>
            <div style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div style="cursor: pointer; margin-bottom: 12px" v-if="showF != 'first'" @click="showF == 'second' ? (showF = 'first') : (showF = 'second')">< 返回</div>
                <div v-if="showF == 'first'">
                    <el-radio-group v-model="radio4" size="mini">
                        <el-radio-button label="政府专职消防队"></el-radio-button>
                        <el-radio-button label="企业消防队"></el-radio-button>
                        <el-radio-button label="微型消防站"></el-radio-button>
                    </el-radio-group>
                    <div style="margin-top: 20px">
                        <!-- <img @click="showF = 'second'" v-if="radio4 == '政府专职消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power1.jpg" alt="" /> -->
                        <div class="tabelCon" v-if="radio4 == '政府专职消防队'">
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column prop="num" label="序号" width="180"> </el-table-column>
                                <el-table-column prop="teamName" label="队伍名称"> </el-table-column>
                                <el-table-column prop="personNum" label="队伍人数"> </el-table-column>
                                <el-table-column prop="equip" label="设备配置"> </el-table-column>
                                <el-table-column prop="concat" label="联系人"> </el-table-column>
                                <el-table-column prop="phone" label="联系电话"> </el-table-column>
                                <el-table-column prop="searve" label="服务电话"> </el-table-column>
                            </el-table>
                        </div>
                        <img @click="showF = 'second'" v-if="radio4 == '企业消防队'" style="width: 100%" src="../../../assets/images/globalCenterNew/power2.jpg" alt="" />
                        <img @click="showF = 'second'" v-if="radio4 == '微型消防站'" style="width: 100%" src="../../../assets/images/globalCenterNew/power3.jpg" alt="" />
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
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props: ['safetyrespons', 'compType'],
    data() {
        return {
            tableData: [
                {
                    num: '01',
                    teamName: '政府专职消防队',
                    personNum: '30',
                    equip: '200',
                    concat: '任衍富',
                    phone: '13880481490',
                    searve: '(028)62723708'
                }
            ],
            showF: 'first',
            radio4: '政府专职消防队',
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
    mounted() {},
    methods: {},
    computed: {},
    components: {}
};
</script>
<style lang="scss">
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
</style>
