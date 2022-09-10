<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div class="safetheaderCon">管理体系</div>
            <div style="background-color: #1c2232; color: #fff; padding: 12px; position: relative; overflow: hidden">
                <div v-if="compType == '环球中心'" @click="(showImg1 = true), (showImg2 = false), (compType = '')" class="cursCbox"></div>
                <div v-if="compType == '环球中心'" @click="(showImg2 = true), (showImg1 = false), (compType = '')" class="cursCbox1"></div>
                <div class="cursCbox2" v-if="showImg1 || showImg2" @click="(showImg2 = false), (showImg1 = false), (compType = '环球中心')">返回</div>
                <img v-if="compType == '环球中心'" style="width: 83%; margin-left: 6%" src="../../../assets/images/globalCenterNew/manage.png" alt="" />
                <img v-if="compType == '购物中心'" style="width: 83%; margin-left: 6%" src="../../../assets/images/globalCenterNew/shopC.png" alt="" />
                <img src="" alt="" />
                <img v-if="showImg1" style="width: 83%; margin-left: 6%" src="../../../assets/images/globalCenterNew/fzr.jpg" alt="" />
                <img src="" alt="" />
                <img v-if="showImg2" style="width: 83%; margin-left: 6%" src="../../../assets/images/globalCenterNew/gwzxpeople.jpg" alt="" />
                <img src="" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props: ['safetyrespons', 'compType'],
    data() {
        return {
            showImg1: false,
            showImg2: false,
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
    .cursCbox {
        position: absolute;
        width: 66%;
        height: 66px;
        // background-color: red;
        left: 50%;
        top: 16%;
        transform: translateX(-50%);
        cursor: pointer;
    }
    .cursCbox1 {
        position: absolute;
        width: 58px;
        height: 170px;
        // background-color: red;
        left: 26%;
        bottom: 3%;
        cursor: pointer;
    }
    .cursCbox2 {
        position: absolute;
        // background-color: red;
        left: 6%;
        top: 6%;
        cursor: pointer;
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
