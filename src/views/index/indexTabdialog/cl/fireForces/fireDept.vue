<!--
消防力量- 1级 -- 消防组织分类列表
-->
<template>
    <div class="fire-dept-list-wrapper">
        <el-row>
            <el-col :span="16">
                <el-radio-group class="xf-radio-group" v-model="dpType" size="medium" @change="handleDeptTypeChange">
                    <el-radio-button label="政府专职消防队"></el-radio-button>
                    <el-radio-button label="企业消防队"></el-radio-button>
                    <el-radio-button label="微型消防站"></el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="8" class="text_r">
                <div @click="showFireWz = true" style="color: #fff; display: inline-block; border: 1px solid #2f3952; padding: 6px 12px; border-radius: 3px; cursor: pointer">消防物资</div>
            </el-col>
        </el-row>
        <div style="margin-top: 12px" v-if="!showFireWz">
            <el-table class="xf-table" :data="dataTable" height="400" style="width: 100%">
                <el-table-column prop="seq" label="序号" width="80" />
                <el-table-column prop="teamName" label="队伍名称" width="180" />
                <el-table-column prop="teamSize" label="队伍人数" width="180" />
                <el-table-column prop="equipmentConf" label="设备配置" />
                <el-table-column prop="contacts" label="联系人" />
                <el-table-column prop="contactsPhone" label="联系电话" />
                <el-table-column prop="servicePhone" label="服务电话" />
                <el-table-column fixed="right" align="center" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleViewDetailClick(scope.row)" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"> </el-pagination>
        </div>
        <div style="margin-top: 12px" v-else>
            <img style="width: 100%" src="../../../../../assets/images/globalCenterNew/fireWz.jpg" alt="" />
        </div>
    </div>
</template>

<script>
const mockData1 = [
    { seq: 1, teamName: '政府专职消防队', teamSize: '20', equipmentConf: '-', contacts: '-', contactsPhone: '-', servicePhone: '-' }
    // { seq: 2, teamName: '政府专职消防队', teamSize: '22', equipmentConf: '222', contacts: '李四', contactsPhone: '13338807837', servicePhone: '13883023834' },
    // { seq: 3, teamName: '政府专职消防队', teamSize: '33', equipmentConf: '222', contacts: '王五', contactsPhone: '13338807837', servicePhone: '13883023834' },
    // { seq: 4, teamName: '政府专职消防队', teamSize: '44', equipmentConf: '222', contacts: '张三', contactsPhone: '13338807837', servicePhone: '13883023834' },
    // { seq: 5, teamName: '政府专职消防队', teamSize: '55', equipmentConf: '222', contacts: '张三', contactsPhone: '13338807837', servicePhone: '13883023834' }

    //     序号	队伍名称	队伍人数	设备配置	联系人	联系电话	服务电话	操作
    // 1	微型消防站	21	——	王虎	13608045907	——	查看
];
const mockData2 = [
    { seq: 1, teamName: '企业消防队', teamSize: '37', equipmentConf: '——', contacts: '王虎', contactsPhone: '13608045907', servicePhone: '——' }
    // { seq: 2, teamName: '企业消防队', teamSize: '22', equipmentConf: '222', contacts: '李四', contactsPhone: '13338807837', servicePhone: '13883023834' },
    // { seq: 3, teamName: '企业消防队', teamSize: '33', equipmentConf: '222', contacts: '王五', contactsPhone: '13338807837', servicePhone: '13883023834' }
];
const mockData3 = [
    { seq: 1, teamName: '微型消防站', teamSize: '10', equipmentConf: '——', contacts: '-', contactsPhone: '-', servicePhone: '——' }
    // { seq: 1, teamName: '微型消防站', teamSize: '12', equipmentConf: '222', contacts: '张三', contactsPhone: '13338807837', servicePhone: '13883023834' },
    // { seq: 2, teamName: '微型消防站', teamSize: '22', equipmentConf: '222', contacts: '李四', contactsPhone: '13338807837', servicePhone: '13883023834' }
];

export default {
    props: {
        deptType: {
            required: true
        }
    },
    data: () => ({
        dpType: undefined,
        showFireWz: false,
        pager: {
            pageSize: 10,
            pageIndex: 1,
            total: 0
        },
        dataTable: []
    }),
    created() {},
    mounted() {
        this.dpType = this.deptType;
        this.loadListData();
    },
    methods: {
        loadListData() {
            //todo 待接口对接

            if (this.dpType === '政府专职消防队') {
                this.dataTable = mockData1;
            } else if (this.dpType === '企业消防队') {
                this.dataTable = mockData2;
            } else if (this.dpType === '微型消防站') {
                this.dataTable = mockData3;
            }
            this.pager = {
                pageSize: 10,
                pageIndex: 1,
                total: this.dataTable.length
            };
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
        },
        handleDeptTypeChange(deptType) {
            this.showFireWz = false;
            this.loadListData();
            this.$emit('deptTypeChange', deptType);
        },
        handleViewDetailClick(item) {
            this.$emit('viewDetailOnclick', item);
        }
    }
};
</script>

<style lang="scss">
@import './fireDept.scss';
</style>
