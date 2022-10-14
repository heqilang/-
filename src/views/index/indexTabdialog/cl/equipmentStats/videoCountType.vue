<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <el-table class="xf-table" :data="dataTable" height="425" style="width: 100%">
            <el-table-column label="序号" width="80" align="center" fixed>
                <template slot-scope="scope">
                    {{ scope.$index + (pager.pageIndex - 1) * pager.pageSize + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="id" label="视频ID" />
            <el-table-column prop="videoName" label="视频名称" />
            <el-table-column label="视频地址">
                <template slot-scope="scope">
                    {{ setupAddress(scope.row) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button slot="reference" type="text" size="mini" @click="updateOrInfo(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[5, 10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"> </el-pagination>
    </div>
</template>

<script>
export default {
    props: {},
    data: () => ({
        pager: {
            pageSize: 5,
            pageIndex: 1,
            total: 0
        },
        dataTable: [],
        searchModel: {
            fhfq: '',
            installSite: undefined
        }
    }),
    created() {},
    mounted() {
        this.loadListData();
    },
    methods: {
        updateOrInfo(val) {
            this.$emit('getvideo', val);
        },
        loadListData() {
            let _self = this;
            // if (_self.owningSystem) {
            _self._http({
                url: '/api/web/indexCountV3/findVideoEquipment',
                type: 'get',
                data: {
                    // equipmentName: _self.type,
                    // owningSystem: _self.owningSystem,
                    // equipmentName: _self.type,
                    current: _self.pager.pageIndex,
                    size: _self.pager.pageSize,
                    sorts: 'id:desc;',
                    transform: 'B:building;F:floor;ET:equipmentType;ES:owningSystem',
                    'owningSystem.symbol': 'IN'
                },
                success: function (res) {
                    _self.dataTable = res.data.records;
                    _self.pager.total = res.data.total;
                }
            });
        },
        handleSizeChange(val) {
            this.pager.pageSize = val;
            this.loadListData();
        },
        handleCurrentChange(val) {
            this.pager.pageIndex = val;
            this.loadListData();
        },
        setupAddress(row) {
            if (row.lookup) {
                return (row.lookup.building ? row.lookup.building : '') + (row.lookup.floor ? row.lookup.floor : '');
            } else {
                return '';
            }
        }
    }
};
</script>

<style lang="scss">
@import './equipmentTypeList.scss';
.el-button {
    padding: 10px 3px;
}
</style>
