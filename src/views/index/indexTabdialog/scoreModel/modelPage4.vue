<template>
    <div class="scoreModelItem classReadyDialog">
        <div v-if="showDealie">
            <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
                <el-col :span="18">
                    <div style="height: 46px; line-height: 46px">综合评分 》巡查完成率</div>
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
                                <div>巡查总数</div>
                                <div>
                                    <span>{{ sonData.allPatrol }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>未处置数</div>
                                <div>
                                    <span>{{ sonData.notHandlePatrol }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>已处置数</div>
                                <div>
                                    <span>{{ sonData.handlePatrol }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>巡查完成率</div>
                                <div>
                                    <span>{{ sonData.patrolHandlePercent }}</span> %
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <div style="margin:12px 0">
                <el-radio-group @change="getList()" v-model="radio4" size="mini">
                    <el-radio-button label="未整改"></el-radio-button>
                    <el-radio-button label="已整改"></el-radio-button>
                </el-radio-group>
            </div> -->
                <el-table height="340" header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable" ref="treeTable" border style="width: 100%">
                    <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                    <el-table-column prop="patrolType" label="巡查类型" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--  <span v-if="scope.row.patrolType == 'DAY'">日检</span>
                        <span v-else-if="scope.row.patrolType == 'WEEK'">周检</span>
                        <span v-else-if="scope.row.patrolType == 'MONTH'">月检</span>
                        <span v-else-if="scope.row.patrolType == 'QUARTER'">季检</span>
                        <span v-else-if="scope.row.patrolType == 'YEAR'">年检</span>
                        <span v-else-if="scope.row.patrolType == 'TEMPORARY'">临时检</span> -->
                            <span v-if="scope.row.type == '1'">普通巡查</span>
                            <span v-else>防火巡查</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="result" label="巡查状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span v-if="scope.row.result == '0'">进行中</span>
                            <span v-else>已完成</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="location" label="巡查名称" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column v-if="false" prop="beginTime" label="开始日期" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column v-if="false" prop="addtime" label="截至日期" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-popover v-if="false" placement="right" width="400" trigger="click">
                                <div>
                                    <div>
                                        巡查类型：<!-- <span v-if="scope.row.patrolType == 'DAY'">日检</span>
                                    <span v-else-if="scope.row.patrolType == 'WEEK'">周检</span>
                                    <span v-else-if="scope.row.patrolType == 'MONTH'">月检</span>
                                    <span v-else-if="scope.row.patrolType == 'QUARTER'">季检</span>
                                    <span v-else-if="scope.row.patrolType == 'YEAR'">年检</span>
                                    <span v-else-if="scope.row.patrolType == 'TEMPORARY'">临时检</span> -->
                                        <span v-if="scope.row.type == '1'">普通巡查</span>
                                        <span v-else>防火巡查</span>
                                    </div>
                                    <div>巡查状态：<span v-if="scope.row.result == '0'">进行中</span> <span v-else>已完成</span></div>
                                    <div>模板名称：{{ scope.row.location }}</div>
                                    <div>开始日期：{{ scope.row.beginTime }}</div>
                                    <div>截至日期：{{ null }}</div>
                                    <div>巡查人员：{{ scope.row.inspectPerson }}</div>
                                    <div>完成时间：{{ scope.row.addtime }}</div>
                                </div>
                                <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> 查看 </el-button>
                                <!-- <el-button >click 激活</el-button> -->
                            </el-popover>
                            <el-button slot="reference" type="text" size="mini" @click="updateOrDeleteInfo('update', scope.row)"> 查看 </el-button>
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

            <modelpagedealie :showNumber="2" :modelDate="modelDate" />
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

            // radio4:'已整改',
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
            _self._http({
                url: '/api/web/indexCountV3/findPatrolList', //迪威-巡查列表-3级页面
                //   url: '/api/web/indexCountTwo/findPatrol',
                type: 'get',
                data: {
                    /*   size: _self.pager.pageSize,
current: _self.pager.pageIndex,
transform: 'U:handler;OW:owningSystem;B:building;F:floor'
// eliminateRisks: _self.radio4=='未整改'?'NO':'YES', */
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    patrolStatus: 'NORMAL',
                    timeType: 2, //按月查询
                    sorts: 'beginTime:desc',
                    transform: 'U:handler;OW:owningSystem;B:building;F:floor'
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
