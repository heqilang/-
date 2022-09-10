<template>
    <div class="classReadyDialog">
        <div class="firstLevel">
            <div class="safetheaderCon diaHeadStandardC">企业消防安全责任体系</div>
            <!-- ../../assets/images/globalCenterNew/safetyresponsibility1.png -->
            <div class="img-con">
                <img style="width: 100%" src="../../../assets/images/globalCenterNew/safetyresponsibility.png" alt="safety" />
                <!-- 电话号码定位显示 -->
                <span
                    class="img-item"
                    :style="{
                        left: `${item.x}%`,
                        top: `${item.y}%`
                    }"
                    v-for="(item, index) in phoneList"
                    :key="index"
                >
                    <el-tooltip class="item" effect="dark" :content="item.phone" placement="top-start" v-if="item.phone">
                        <img class="width100 height100 pointer" src="../../../assets/images/globalCenterNew/phone_icon.png" />
                    </el-tooltip>
                    <img v-else class="width100 height100" src="../../../assets/images/globalCenterNew/phone_icon.png" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
// import * as echarts from 'echarts';
export default {
    props: ['safetyrespons', 'compType'],
    data() {
        return {
            phoneList: [
                {
                    name: '魏冬',
                    phone: '13908093855',
                    x: 51.5,
                    y: 13.6
                },
                {
                    name: '赵氢',
                    phone: '13908048815',
                    x: 77.5,
                    y: 41.6
                },
                {
                    name: '李道海',
                    phone: '13881790967',
                    x: 8.5,
                    y: 75.4
                },
                {
                    name: '赵海',
                    phone: '13808087979',
                    x: 22.5,
                    y: 75.4
                },
                {
                    name: '李灿',
                    phone: '13982197166',
                    x: 36.5,
                    y: 75.4
                },
                {
                    name: '杜庭远',
                    phone: '13348818688',
                    x: 51.5,
                    y: 75.4
                },
                {
                    name: '谢波',
                    phone: '15692882807',
                    x: 65.5,
                    y: 75.4
                },
                {
                    name: '马莉娜',
                    phone: '18608005333',
                    x: 80.5,
                    y: 75.4
                },
                {
                    name: '刘颖',
                    phone: '',
                    x: 94.5,
                    y: 75.4
                },
                {
                    name: '宁巍',
                    phone: '13882209946',
                    x: 8.5,
                    y: 93.5
                },
                {
                    name: '唐大根',
                    phone: '13730891958',
                    x: 22.5,
                    y: 93.5
                },
                {
                    name: '张睿',
                    phone: '13668230312',
                    x: 36.5,
                    y: 93.5
                },
                {
                    name: '何黎',
                    phone: '13658084301',
                    x: 51.5,
                    y: 93.5
                },
                {
                    name: '纪军',
                    phone: '13881807770',
                    x: 65.5,
                    y: 93.5
                },
                {
                    name: '杨静',
                    phone: '18583675999',
                    x: 80.5,
                    y: 93.5
                },
                {
                    name: '唐鸿',
                    phone: '13908224749',
                    x: 94.5,
                    y: 93.5
                }
            ]
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

    .img-con {
        position: relative;
        .img-item {
            position: absolute;
            display: inline-block;
            width: 22px;
            height: 22px;
        }
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
