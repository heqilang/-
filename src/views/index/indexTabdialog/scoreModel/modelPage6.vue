<template>
    <div class="scoreModelItem classReadyDialog">
        <div v-if="showDealie">
            <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
                <el-col :span="18">
                    <div style="height: 46px; line-height: 46px">综合评分 》报警处置率</div>
                </el-col>
                <el-col :span="6">
                    <div class="text_r">
                        <i @click="$emit('closeTsComp')" class="el-icon-circle-close" style="font-size: 26px; margin: 12px 20px; color: #5e9ffb; cursor: pointer"> </i>
                        <!-- <span @click="$emit('closeTsComp')" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span> -->
                    </div>
                </el-col>
            </el-row>
            <div class="tabelCon" style="padding: 12px; color: #fff">
                <el-row style="padding: 10px">
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>报警总数</div>
                                <div>
                                    <span>{{ sonData.allAlarm }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>未处置数</div>
                                <div>
                                    <span>{{ sonData.notHandleAlarm }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>已处置数</div>
                                <div>
                                    <span>{{ sonData.handleAlarm }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>报警处置率</div>
                                <div>
                                    <span>{{ sonData.alarmHandlePercent }}</span> %
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <div style="margin: 12px 0">
                <el-radio-group @change="getList()" v-model="radio4" size="mini">
                    <el-radio-button label="火警事件"></el-radio-button>
                    <el-radio-button label="告警事件"></el-radio-button>
                </el-radio-group>
            </div> -->
                <el-table header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable" ref="treeTable" border style="width: 100%">
                    <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>

                    <el-table-column prop="alarmLocation" label="设备名称" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{ filterWords(scope.row.alarmLocation) }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="equipmentState" label="设备状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span style="color: #ed3a3a" v-if="scope.row.equipmentState == 9">火警</span>
                        <span style="color: #f77e05" v-else-if="scope.row.equipmentState == 4">预警</span>
                        <span style="color: #bfa900" v-else-if="scope.row.equipmentState == 2">故障</span>
                        <span style="color: #a7acba" v-else-if="scope.row.equipmentState == 3">离线</span>
                    </template>
                </el-table-column> -->
                    <!-- <el-table-column prop="alarmType" label="报警时间" :show-overflow-tooltip="true"> </el-table-column> -->
                    <el-table-column prop="alarmType" label="安装位置" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--   <span>{{ scope.row.lookup.building + scope.row.lookup.floor }}</span> -->
                            <span> {{ scope.row.unitName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="alarmLocation" label="详细地址" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-popover v-if="false" placement="right" width="400" trigger="click">
                                <div>
                                    <div>更新时间：{{ scope.row.addtime }}</div>
                                    <div>设备名称：{{ scope.row.equipmentName }}</div>
                                    <div>所属系统：{{ scope.row.lookup.owningSystem }}</div>
                                    <div>设备类型：{{ scope.row.host == 'YES' ? '主机' : '探测器' }}</div>
                                    <div>
                                        报警类型：<!-- <span style="color: #ed3a3a" v-if="scope.row.equipmentState == 9">火警</span>
                                    <span style="color: #f77e05" v-else-if="scope.row.equipmentState == 4">预警</span>
                                    <span style="color: #bfa900" v-else-if="scope.row.equipmentState == 2">故障</span>
                                    <span style="color: #a7acba" v-else-if="scope.row.equipmentState == 3">离线</span> -->
                                        <span>{{ scope.row.alarmType }}</span>
                                    </div>
                                    <div>
                                        安装位置：<!-- {{ scope.row.lookup.building + scope.row.lookup.floor + scope.row.address }} -->
                                        {{ scope.row.unitName }}
                                    </div>
                                </div>
                                <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看333 </el-button>
                                <!-- <el-button >click 激活</el-button> -->
                            </el-popover>
                            <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看 </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex text_c mar-t-18 mar-b-18">
                    <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="diaHeadStandardC classReadyDialogTitle">
                <a class="returnbtn" @click="turntopage('alarmanalysis1')"><i class="el-icon-d-arrow-left"></i></a><a class="returnbtn2" @click="closeDialog"><i class="el-icon-circle-close" style="font-size: 26px; color: #5e9ffb; cursor: pointer"></i></a><span>消防安全运行综合评分</span>
            </div>

            <modelpagedealie :modelDate="modelDate" />
        </div>
    </div>
</template>
<script>
import modelpagedealie from './modelPageDealie.vue';
export default {
    components: {
        modelpagedealie
    },
    props: ['sonData'],
    data() {
        return {
            modelDate: '', //传值
            showDealie: true,
            radio4: '火警事件',
            pager: {
                pageSize: 5,
                pageIndex: 1,
                total: null
            },
            dataTable: []
        };
    },
    methods: {
        turntopage() {
            this.showDealie = true;
        },
        closeDialog() {
            this.$emit('closeDealie', false);
            this.$emit('closeTsComp');
        },
        updateOrDeleteInfo(update, val) {
            this.modelDate = val;
            this.showDealie = false;
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
        filterWords(str) {
            let _self = this;
            return str.replace('环球中心2号控制室', '');
        },
        getList() {
            let _self = this;
            _self.loading = true;
            _self.dataTable = [];
            let etype = '';
            switch (_self.radio4) {
                case '火警事件':
                    etype = 9;
                    break;
                case '预警事件':
                    etype = 4;
                    break;
                case '故障事件':
                    etype = 2;
                    break;
                case '告警事件':
                    etype = 3;
                    break;
            }
            _self._http({
                url: '/api/web/indexCountV3/find', // 迪威告警数据表查询
                //  url: '/api/web/indexCountTwo/scoreFindAlarm',
                type: 'get',
                data: {
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    // equipmentState: etype,
                    option: 'MONTH', //统计都用当月的
                    transform: 'U:handler;ES:owningSystem;B:building;F:floor',
                    sort: ''
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        }
    },
    created() {
        console.dir('报警页码');
    },
    mounted() {
        this.getList();
    }
};
</script>
<style lang="scss">
.diaHeadStandardC {
    background: linear-gradient(to right, #084c9d, #18243e) !important;
}

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
