<template>
    <div class="scoreModelItem classReadyDialog">
        <div v-if="showDealie">
            <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
                <el-col :span="18">
                    <div style="height: 46px; line-height: 46px">综合评分 》报警处置及时率</div>
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
                                <div>未及时处理数</div>
                                <div>
                                    <span>{{ sonData.notOpportunelyAlarm }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>已及时处理数</div>
                                <div>
                                    <span>{{ sonData.handleOpportunelyAlarm }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>报警处置及时率</div>
                                <div>
                                    <span>{{ sonData.alarmHandOpportunelyPercent }}</span> %
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <div style="margin: 12px 0">
                <el-radio-group @change="getList()" v-model="radio4" size="mini">
                    <el-radio-button label="设备报警"></el-radio-button>
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
                    <el-table-column prop="alarmTime" label="报警时间" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column prop="alarmType" label="安装位置" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--    <span>{{ scope.row.lookup.building + scope.row.lookup.floor }}</span> -->
                            <span> {{ scope.row.unitName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="alarmLocation" label="详细地址" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="400" trigger="click">
                                <div>
                                    <!-- <div>更新时间：{{ scope.row.lastUpdatetime }}</div> -->
                                    <div>设备名称：{{ scope.row.equipmentName }}</div>
                                    <div>所属系统：{{ scope.row.lookup.owningSystem }}</div>
                                    <div>设备类型：{{ scope.row.host == 'YES' ? '主机' : '探测器' }}</div>
                                    <!-- <div>
                                    报警类型：<span style="color: #ed3a3a" v-if="scope.row.equipmentState == 9">火警</span>
                                    <span style="color: #f77e05" v-else-if="scope.row.equipmentState == 4">预警</span>
                                    <span style="color: #bfa900" v-else-if="scope.row.equipmentState == 2">故障</span>
                                    <span style="color: #a7acba" v-else-if="scope.row.equipmentState == 3">离线</span>
                                </div> -->
                                    <div>
                                        安装位置：<!-- {{ scope.row.lookup.building + scope.row.lookup.floor + scope.row.address }} -->
                                        {{ scope.row.unitName }}
                                    </div>
                                </div>
                                <!-- <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看 </el-button> -->
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

            <modelpagedealie :showLi="showLi" :modelDate="modelDate" />
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
            showLi: false,
            modelDate: '', //传值
            showDealie: true,
            radio4: '设备报警',
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
        getList() {
            let _self = this;
            _self.loading = true;
            _self.dataTable = [];
            let etype = '';
            switch (_self.radio4) {
                case '设备报警':
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
                // url: '/api/web/indexCountTwo/scoreFindAlarm',
                type: 'get',
                data: {
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    // equipmentState: 1,
                    // 'equipmentState.symbol': 'NE',
                    option: 'MONTH', //统计都用当月的
                    transform: 'U:handler;ES:owningSystem;B:building;F:floor',
                    sorts: 'alarmTime:desc'
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        },
        filterWords(str) {
            let _self = this;
            return str.replace('环球中心2号控制室', '');
        }
    },
    created() {},
    mounted() {
        this.getList();
    }
};
</script>
<style lang="scss"></style>
