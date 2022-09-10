<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div class="safetheaderCon">
                {{ safetyrespons }}
            </div>
            <div style="background-color: #1c2232; color: #fff; padding: 12px">
                <img v-if="safetyrespons == '环球会展集团'" style="width: 100%" src="../../../assets/images/indexImg/环球会展集团.jpg" />
                <img v-if="safetyrespons == '四川大区物业'" style="width: 100%" src="../../../assets/images/indexImg/四川大区物业.jpg" />
                <img v-if="safetyrespons == '环球购物中心'" style="width: 100%" src="../../../assets/images/indexImg/环球购物中心.jpg" />
                <img v-if="safetyrespons == '环球物业公司'" style="width: 100%" src="../../../assets/images/indexImg/环球物业公司.jpg" />

                <img v-if="safetyrespons == '海洋乐园'" style="width: 100%" src="../../../assets/images/indexImg/海洋乐园.jpg" />
                <img v-if="safetyrespons == '洲际酒店'" style="width: 100%" src="../../../assets/images/indexImg/洲际酒店.jpg" />
                <img v-if="safetyrespons == '洗衣工厂'" style="width: 100%" src="../../../assets/images/indexImg/洗衣工厂.jpg" />
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props: ['safetyrespons'],
    data() {
        return {
            radio1: '已处理',
            firstPageData1: '',
            firstPageData2: '',
            showLeavel: 1,
            activeName: 'first',
            activeSenName: 'first',
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
            dataTable: [],
            timeLineData: ''
        };
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
    computed: {},
    components: {}
};
</script>
<style lang="scss">
.classReadyDialog {
    box-sizing: border-box;
    .safetheaderCon {
        background-color: #2b4b6b;
        color: #fff;
        padding: 10px;
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
</style>
