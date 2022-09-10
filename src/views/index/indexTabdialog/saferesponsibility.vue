<template>
    <div class="saferesDialog">
        <el-dialog :before-close="closeDialog" :modal-append-to-body="false" title="企业消防安全责任" :visible.sync="dialogFormVisible" :close-on-click-modal="true" class="unit-edit-con">
            <div style="height: 46px; background-color: #2b4b6b; line-height: 46px; padding-left: 12px; color: #fff">设备统计</div>
            <div class="saferes">
                <div style="display: flex; height: 40px">
                    <div @click="tabitemchange(index)" v-for="(item, index) in tablist" :key="index">
                        <div :class="tabitemindex == index ? 'activetab' : ''" style="color: #fff; padding: 0px 10px; cursor: pointer">{{ item.name }}</div>
                    </div>
                </div>
                <img v-if="tabitemindex == '0'" @click="statistics" style="width: 100%" src="../../../assets/images/globalCenterNew/eq1.jpg" />
                <img v-if="tabitemindex == '1'" @click="statistics" style="width: 100%" src="../../../assets/images/globalCenterNew/eq2.jpg" />
                <img v-if="tabitemindex == '2'" @click="statistics" style="width: 100%" src="../../../assets/images/globalCenterNew/eq3.jpg" />
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
                { name: '消防设备', value: '1' },
                { name: '安防设备', value: '2' },
                { name: '逃生疏散设备', value: '3' }
            ],
            dialogFormVisible: true,
            dataTable: []
        };
    },
    watch: {},
    created() {},
    mounted() {
        // this.getList();
    },
    filters: {
        equipmentStateType(val) {
            if (val == '1') return '正常';
            if (val == '2') return '故障';
            if (val == '3') return '离线';
            if (val == '4') return '预警';
            if (val == '9') return '火警';
        }
    },
    methods: {
        statistics() {
            this.$emit('statistics');
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
            _self.loading = true;
            let searchObj = {
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                equipmentState: _self.tablist[_self.tabitemindex].value,
                option: 'MONTH', //DAY：当天，MONTH：当月
                transform: 'B:building,F:floor'
            };
            _self.dataTable = [];
            _self._http({
                url: '/api/web/indexCountTwo/find',
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
.saferesDialog {
    padding: 12px;
    .saferes {
        background-color: #192233;
    }
    .activetab {
        background: #3f3d71;
        color: #fff;
    }
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
