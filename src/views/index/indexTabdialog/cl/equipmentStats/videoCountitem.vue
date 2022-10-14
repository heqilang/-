<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div id="alarmVideo" style="margin-top: 20px; background-color: #fff"></div>
    </div>
</template>

<script>
export default {
    props: {
        getvideoitem: {
            required: true
        }
    },
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
