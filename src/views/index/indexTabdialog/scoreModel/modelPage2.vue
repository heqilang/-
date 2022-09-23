<template>
    <div class="scoreModelItem classReadyDialog">
        <div v-if="showDealie">
            <el-row class="diaHeadStandardC" style="background-color: #2b4b6b; padding-left: 12px; color: #fff">
                <el-col :span="18">
                    <div style="height: 46px; line-height: 46px">综合评分 》隐患发现率</div>
                </el-col>
                <el-col :span="6">
                    <div class="text_r">
                        <i @click="$emit('closeTsComp')" class="el-icon-circle-close" style="font-size: 26px; margin: 12px 20px; color: #5e9ffb; cursor: pointer"> </i>
                        <!-- <span @click="$emit('closeTsComp')" style="margin: 12px 20px; display: inline-block; padding: 3px 6px; border: 1px solid #616266; color: #616266; cursor: pointer"><<</span> -->
                    </div>
                </el-col>
            </el-row>
            <div class="tabelCon" style="padding: 12px; color: #fff">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>隐患总数</div>
                                <div>
                                    <span>{{ sonData.allRisks }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>上报隐患</div>
                                <div>
                                    <span>{{ sonData.findRisks }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>被查隐患</div>
                                <div>
                                    <span>{{ sonData.beanRisks }}</span> 个
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="third_head_card text_c">
                            <div>
                                <div>隐患发现率</div>
                                <div>
                                    <span>{{ sonData.risksPercent }}</span> %
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div style="margin: 12px 0">
                    <el-radio-group @change="getList()" v-model="radio4" size="mini">
                        <el-radio-button v-for="(item, index) in dictItemlist" :key="index" :label="item.dictValue"></el-radio-button>
                    </el-radio-group>
                </div>
                <el-table header-row-class-name="table-header-class" row-class-name="table-row-class" :data="dataTable" ref="treeTable" border style="width: 100%">
                    <el-table-column type="index" width="50" label="序号" fixed="left" :index="indexMethod"> </el-table-column>
                    <el-table-column prop="risksType" label="隐患类型" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="handleReportor" label="上报人员" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--  {{ scope.row.lookup.handleReportor || '--' }} -->
                            <!-- scope.row.createUser -->
                            {{ scope.row.reporter || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="handleReportTime" label="上报时间" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--     {{ scope.row.handleReportTime || '--' }} -->
                            <!-- scope.row.createTime -->
                            {{ scope.row.reportTime || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="所属区域" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--     {{ (scope.row.lookup.building == 'null' ? '-' : scope.row.lookup.building) + (scope.row.lookup.floor == 'null' ? '-' : scope.row.lookup.floor) }} -->
                            <span>{{ scope.row.unitName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="troubleLocation" label="详细地址" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column prop="risksImages" label="现场照片">
                        <template slot-scope="scope">
                            <el-image v-if="scope.row.risksImages" style="width: 100px; height: 100px" :src="scope.row.risksImages" :fit="fit"></el-image>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="反馈状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <!--         {{ scope.row.feedback ? (scope.row.feedback == 'YES' ? '成功' : '失败') : '--' }} -->
                            {{ scope.row.completeStatus ? (scope.row.completeStatus == '1' ? '处置中' : '已处置') : '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="lookup.handler" label="处置人员" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-popover v-if="false" placement="right" width="400" trigger="click">
                                <div>
                                    <!--       <div>上报时间：{{ scope.row.handleReportTime || '--' }}</div> -->
                                    <!-- scope.row.createTime -->
                                    <div>上报时间：{{ scope.row.reportTime || '--' }}</div>
                                    <div>隐患类型：{{ scope.row.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}</div>
                                    <!--  <div>上报人员：{{ scope.row.lookup.handleReportor || '--' }}</div> -->
                                    <div>上报人员：{{ scope.row.reporter || '--' }}</div>
                                    <!-- 上报人员 scope.row.createUser -->
                                    <!--      <div>隐患位置：{{ (scope.row.lookup.building == 'null' || '') + (scope.row.lookup.floor == 'null' || '') + scope.row.address }}</div> -->
                                    <div>隐患位置：{{ scope.row.unitName + scope.row.troubleLocation }}</div>
                                    <div>隐患等级：{{ scope.row.lookup.level == 1 ? '一般隐患' : '重大隐患' }}</div>
                                    <div>备注说明：{{ scope.row.lookup.risksRemark || '--' }}</div>
                                    <div v-if="scope.row.risksImages">
                                        <img style="width: 120px" :src="scope.row.risksImages" alt="" />
                                    </div>
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

            <modelpagedealie :showNumber="3" :modelDate="modelDate" />
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
            dictItemlist: [],
            radio4: '',
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
            let radiCode = '';
            _self.dictItemlist.map((item) => {
                if (item.dictValue == _self.radio4) {
                    radiCode = item.dictCode;
                }
            });

            _self._http({
                url: '/api/web/indexCountV3/findRisksList', //迪威--隐患列表-3级页面
                // url: '/api/web/indexCountTwo/scoreFindRisks',
                type: 'get',
                data: {
                    size: _self.pager.pageSize,
                    current: _self.pager.pageIndex,
                    patrolStatus: 'NORMAL',
                    sorts: 'completeTime:desc',
                    transform: 'U:handler;U:reporter;U:handleReportor;OW:owningSystem;B:building;F:floor',
                    level: radiCode,
                    timeType: 2,
                    troubleType: _self.radio4 == '一般隐患' ? 0 : 1
                    /*    size: _self.pager.pageSize,
current: _self.pager.pageIndex,
transform: 'U:handler;U:handleReportor;OW:owningSystem;B:building;F:floor',
level: radiCode */
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        },
        getdictItem() {
            let _self = this;
            _self._http({
                url: '/api/auth/dict/dictItem',
                type: 'get',
                data: {
                    parentCode: 'riskLevel'
                },
                success: function (res) {
                    _self.dictItemlist = res.data;
                    _self.radio4 = res.data[0].dictValue;
                    _self.getList();
                }
            });
        }
    },
    created() {},
    mounted() {
        this.getdictItem();
    }
};
</script>
<style lang="scss"></style>
