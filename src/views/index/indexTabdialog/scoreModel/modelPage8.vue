<template>
    <div class="scoreModelItem classReadyDialog">
        <div v-if="showDealie">
            <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
                <el-col :span="18">
                    <div style="height: 46px; line-height: 46px">综合评分 》巡查按时完成率</div>
                </el-col>
                <el-col :span="6">
                    <div class="text_r">
                        <i @click="$emit('closeTsComp')" class="el-icon-circle-close" style="font-size: 26px; margin: 12px 20px; color: #5e9ffb; cursor: pointer"> </i>
                        <!-- <span @click="$emit('closeTsComp')" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span> -->
                    </div>
                </el-col>
            </el-row>
            <div class="tabelCon" style="padding: 12px; color: #fff">
                <el-row>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>计划巡查总数</div>
                                <div>
                                    <span>{{ sonData.allHandlePatrol }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>巡查总数</div>
                                <div>
                                    <span>{{ sonData.handlePatrol }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>消防巡查预警数</div>
                                <div>
                                    <span>{{ sonData.notHandleOpportunelyPatrol }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>巡查按时完成率</div>
                                <div>
                                    <span>{{ sonData.patrolHandleOpportunelyPercent }}</span> %
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div style="margin: 12px 0">
                    <el-radio-group @change="getList()" v-model="radio4" size="mini">
                        <el-radio-button label="巡查总数"></el-radio-button>
                        <el-radio-button label="消防巡查预警"></el-radio-button>
                    </el-radio-group>
                </div>

                <el-table height="400" v-if="radio4 === '消防巡查预警'" header-row-class-name="table-header-class" row-class-name="table-row-class" ref="treeTable" border style="width: 100%" :data="dataTable">
                    <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                    <el-table-column prop="waringInfo" label="预警信息" width="160" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column prop="sendTime" label="预警时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column prop="sendName" label="预警人员" width="160" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!-- <div>{{ scope.row.sendName.slice(scope.row.sendName.length - 3, scope.row.sendName.length) }}</div> -->
                            <div v-if="scope.row.sendName">{{ Inchange(scope.row.sendName) }}</div>
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

                    <el-table-column prop="state" label="处置状态" width="120">
                        <template slot-scope="scope">
                            <div v-if="scope.row.completeStatus">{{ scope.row.completeStatus == '1' ? '处置中' : scope.row.completeStatus == '2' ? '处置完毕' : '待处置' }}</div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="times" label="操作" width="80" align="center">
                        <template slot-scope="scope">
                            <!-- <i class="el-icon-edit fs-16"></i>  -->
                            <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看 </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-table height="400" v-else header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable" ref="treeTable" border style="width: 100%">
                    <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                    <el-table-column prop="risksType" label="巡查类型" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="inspectStatus" label="巡查状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--  {{ scope.row.lookup.handleReportor || '--' }} -->
                            {{ scope.row.inspectStatus || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="location" label="巡查名称" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--     {{ scope.row.handleReportTime || '--' }} -->
                            {{ scope.row.location || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="开始日期" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--     {{ (scope.row.lookup.building == 'null' ? '-' : scope.row.lookup.building) + (scope.row.lookup.floor == 'null' ? '-' : scope.row.lookup.floor) }} -->
                            <span>{{ scope.row.beginTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="endTime" label="结束日期" :show-overflow-tooltip="true"> </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-popover v-if="false" placement="right" width="400" trigger="click">
                                <div>
                                    <!--   <div>上报时间：{{ scope.row.handleReportTime || '--' }}</div>
                                <div>隐患类型：{{ scope.row.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}</div>
                                <div>上报人员：{{ scope.row.lookup.handleReportor || '--' }}</div>
                                <div>隐患位置：{{ scope.row.lookup.building + scope.row.lookup.floor + scope.row.address }}</div>
                                <div>隐患等级：{{ scope.row.lookup.level == 1 ? '一般隐患' : '重大隐患' }}</div>
                                <div>备注说明：{{ scope.row.lookup.risksRemark || '--' }}</div>
                                <div v-if="scope.row.risksImages">
                                    <img style="width: 120px" :src="scope.row.risksImages" alt="" />
                                </div> -->

                                    <div>上报时间：{{ scope.row.createTime || '--' }}</div>
                                    <div>隐患类型：{{ scope.row.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}</div>
                                    <!--  <div>上报人员：{{ scope.row.lookup.handleReportor || '--' }}</div> -->
                                    <div>上报人员：{{ scope.row.createUser || '--' }}</div>
                                    <!--      <div>隐患位置：{{ (scope.row.lookup.building == 'null' || '') + (scope.row.lookup.floor == 'null' || '') + scope.row.address }}</div> -->
                                    <div>隐患位置：{{ scope.row.unitName + scope.row.troubleLocation }}</div>
                                    <div>隐患等级：{{ scope.row.lookup.level == 1 ? '一般隐患' : '重大隐患' }}</div>
                                    <div>备注说明：{{ scope.row.lookup.risksRemark || '--' }}</div>
                                    <div v-if="scope.row.risksImages">
                                        <img style="width: 120px" :src="scope.row.risksImages" alt="" />
                                    </div>
                                </div>
                                <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> <i class="el-icon-edit fs-16"></i> 查看 </el-button>
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

            <modelpagedealie :showNumber="radio4 === '消防巡查预警' ? 4 : 2" :modelDate="modelDate" />
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
            radio4: '巡查总数',
            pager: {
                pageSize: 5,
                pageIndex: 1,
                total: null
            },
            dataTable: []
        };
    },
    methods: {
        Inchange(val) {
            return val.split(':')[val.split(':').length - 1];
        },

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
            console.log('getList');
            let _self = this;
            _self.loading = true;
            _self.dataTable = [];

            const that = this;
            // console.log('loadListData');
            // console.log(this.dataRange);
            that._http({
                url: _self.radio4 === '巡查总数' ? '/api/web/indexCountV3/findPatrolList' : '/api/web/indexCountV3/findPatrols', ///api/web/indexCountTwo/findPatrolList
                type: 'get',
                isBody: true,
                data: {
                    size: that.pager.pageSize,
                    current: that.pager.pageIndex,
                    // patrolStatus: 'NORMAL',
                    inspectStatus: _self.radio4 === '巡查总数' ? '巡查完成' : null,
                    option: 'MONTH',
                    patrolStatus: that.patrolStatus,
                    timeType: that.dataRange == '当日' ? 1 : 2,
                    sorts: 'beginTime:desc'

                    /*  size: that.pager.pageSize,
           current: that.pager.pageIndex,
           timeType: that.dataRange == '当日' ? '1' : '2',
           patrolStatus: that.patrolStatus || undefined,
           sorts: 'completeTime:desc' */
                },
                success: function (res) {
                    that.dataTable = res.data.records || [];
                    that.pager.pageSize = res.data.size;
                    that.pager.pageIndex = res.data.current;
                    that.pager.total = res.data.total;
                }
            });

            return;
            _self._http({
                url: '/api/web/indexCountV3/findRisksList', //迪威--隐患列表-3级页面
                // url: '/api/web/indexCountTwo/scoreFindRisks',
                type: 'get',
                data: {
                    /*   size: _self.pager.pageSize,
current: _self.pager.pageIndex,
transform: 'U:handler;OW:owningSystem;B:building;F:floor',
// feedback: _self.radio4 == '未整改' ? 'NO' : 'YES'
queryState: _self.radio4 == '未整改' ? 1 : 2 */
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    patrolStatus: 'NORMAL',
                    sorts: 'completeTime:desc',
                    transform: 'U:handler;OW:owningSystem;B:building;F:floor',
                    queryState: _self.radio4 == '未整改' ? 1 : 2,
                    completeStatus: _self.radio4 == '未整改' ? 1 : 2,
                    timeType: 2
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        }
    },
    created() {},
    mounted() {
        this.getList();
    }
};
</script>
<style lang="scss">
.scoreModelItem {
}
</style>
