<template>
    <div class="classDialog">
        <el-dialog :before-close="closeDialog" :modal-append-to-body="false" title="隐患清单" :visible.sync="dialogFormVisible" :close-on-click-modal="false" class="unit-edit-con" :destroy-on-close="true">
            <div style="display: flex; height: 40px">
                <div @click="tabitemchange(index)" v-for="(item, index) in tablist" :key="index">
                    <div :class="tabitemindex == index ? 'activetab' : ''" style="padding: 0px 10px; cursor: pointer">{{ item.name }}</div>
                </div>
            </div>
            <el-table :data="dataTable">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="risksType" label="隐患类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.risksType">{{ scope.row.risksType == 'EQUIPMENT' ? '消防设备' : '环境隐患' }}</div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="handleReportor" label="上报人员"> </el-table-column>
                <el-table-column prop="handleReportTime" label="上报时间"> </el-table-column>
                <el-table-column prop="building" label="所属区域">
                    <template slot-scope="scope">
                        <div v-if="scope.row.lookup.building">{{ scope.row.lookup.building }}-{{ scope.row.lookup.floor }}</div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="详细地址"> </el-table-column>
                <el-table-column prop="risksImages" label="现场照片">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini"> 查看 </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="feedback" label="反馈状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.feedback">{{ scope.row.feedback == 'YES' ? '成功' : '失败' }}</div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column prop="handler" label="处置人员"> </el-table-column>
                <el-table-column prop="takeTime" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="viewchange(scope.row, '隐患详情')"> 查看 </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text_c mar-t-18">
                <!-- 分页 -->
                <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
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
            dataTable: []
        };
    },
    watch: {},
    created() {},
    mounted() {
        this.getList();
    },
    methods: {
        viewchange(row, title) {
            this.$emit('viewchange', row, title);
            this.$emit('closeDialog');
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
        tabitemchange(index) {
            this.tabitemindex = index;
            this.getList();
        },
        getList() {
            let _self = this;
            let searchObj = {
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                level: _self.tablist[_self.tabitemindex].value,
                transform: 'B:building,F:floor'
            };
            _self.dataTable = [];
            _self._http({
                url: '/api/web/indexCountTwo/findRisks',
                type: 'get',
                isBody: true,
                data: searchObj,
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                }
            });
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="scss">
.classDialog {
    .el-dialog__body {
        min-height: 50vh;
    }

    .activetab {
        background: red;
        color: #fff;
    }
}
</style>
