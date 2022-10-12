<template>
    <div class="classReadyDialog">
        <div class="secendLevel" style="background-color: #2b4b6b; color: #fff">
            <!--    <div class="diaHeadStandardC classReadyDialogTitle">
                <span style="cursor: pointer">
                 
                    <span> 管理类 </span>事件预警
                </span>
            
                
            </div> -->
            <div class="classReadyDialog_box_bottom" style="background: linear-gradient(to right bottom, #192640, #213d60) !important; padding: 30px">
                <div>
                    <div style="display: flex">
                        <div>预警时间：</div>
                        <div>{{ alarmanalysis6_params.sendTime }}</div>
                    </div>
                    <div style="display: flex">
                        <div>预警位置：</div>
                        <div>{{ alarmanalysis6_params.unitName }}</div>
                    </div>
                </div>
                <div class="box2">流程追溯</div>
                <el-scrollbar v-if="sourcelist.length > 0" style="height: 100%; width: 90%">
                    <el-timeline style="margin-top: 20px">
                        <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.lineDate" placement="top">
                            <el-card style="font-size: 14px">
                                <p v-if="(item.alarmDate || '') != ''">{{ item.alarmDesc }}：{{ item.alarmDate }}</p>
                                <p v-else-if="(item.dealName || '') != ''">
                                    处置人员：{{ item.dealName }} {{ item.dealPhone }}<br />
                                    处置描述：{{ item.dealDesc }}
                                </p>
                                <p v-else-if="(item.pushUserName || '') != ''">
                                    <span style="display: block">{{ item.orgPushDesc }}</span>
                                    <span style="display: flex; justify-content: space-between">
                                        <span>{{ item.pushUserName }} {{ item.pushPhone }}</span
                                        ><span>{{ item.pushResult == '短信推送成功' ? '语音、短信通知成功' : item.pushResult }}</span>
                                    </span>
                                </p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-scrollbar>
                <div v-if="sourcelist.length < 1" style="text-align: center; padding: 100px 0">加载中.....</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['readyAlarmType', 'alarmRadiofu', 'getRed', 'getRedDate', 'alparams'],
    data() {
        return {
            sourcelist: [],
            alarmanalysis6_params: {
                sendTime: '2022',
                unitName: '环球中心'
            },
            loading: true
        };
    },
    watch: {},
    created() {
        console.log(this.getRedDate);
    },

    mounted() {
        this.getPatroLable(this.getRedDate);
    },
    methods: {
        getPatroLable(val) {
            console.log(val, '问');

            this.showLeavel = 3;
            this.alarmanalysis6_params = {
                sendTime: val.sendTime,
                unitName: val.unitName || val.pointName
                // waringRecordId: "334110422576816128"
            };
            // this.getMessageList(row);
            this.getfindMessages(val);
        },

        getfindMessages(val) {
            let _self = this;

            _self.sourcelist = [];
            _self._http({
                url: '/api/web/indexCountV3/findDwMessages', ///api/web/indexCountTwo/findMessages
                type: 'get',
                isBody: true,
                data: { waringId: val.waringRecordId || val.id }, //_self.alarmanalysis6_params ? val.waringRecordId :
                success: function (res) {
                    _self.loading = false;

                    _self.sourcelist = res.data.data || [];
                }
            });
        }
    },
    computed: {}
};
</script>
<style lang="scss">
.classReadyDialog {
    box-sizing: border-box;

    .el-scrollbar__wrap {
        margin-right: -30px !important;
    }

    .headerCon {
        // background-color: #2b4b6b;
        // 从左至右渐变色

        // background: linear-gradient(to right, red 0%, #2b4b6b 100%);
        padding: 0 10px;
    }

    .el-input__inner {
        background-color: transparent !important;
        border-color: #6f7682 !important;
    }

    .pagination-container button,
    .pagination-container li {
        background-color: transparent !important;
        border: none !important;
    }

    .tabelCon {
        background-color: #1e2841;

        .el-table th,
        .el-table td,
        .el-table--border {
            background-color: #1e2841 !important;
            border: none !important;
        }

        .el-table td {
            color: #fff;
        }

        .el-table::before {
            background-color: #1e2841 !important;
        }

        .el-table--border::after {
            width: 0 !important;
        }
    }

    .numColorN {
        font-weight: normal;
        font-size: 56px;
        line-height: 56px;
        background: linear-gradient(180deg, #ffffff 0%, #3ca2f8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .el-card {
        background-color: #232c47 !important;
        color: #fff !important;
        border: none !important;
    }

    .el-radio-group .is-active .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #3869a4 !important;
        border-color: #3869a4 !important;
    }

    // .tabelCon {
    //     tr,
    //     th {
    //         border: none !important;
    //         background-color: #1e2231 !important;
    //     }
    //     .hover-row {
    //         background-color: #1e2231 !important;
    //     }
    //     .el-table--group::after,
    //     .el-table--border::after,
    //     .el-table::before {
    //         opacity: 0;
    //     }
    //     .el_table .el-table::before {
    //         height: 0;
    //     }
    //     .el-table--border {
    //         border: none !important;
    //     }
    //     .el-table tbody tr:hover > td {
    //         background-color: #fff;
    //     }
    //     .el-table tbody tr:hover > td {
    //         background-color: transparent !important;
    //     }
    //     // 如果td没有颜色，可以去掉，这里加上保险
    //     .el-table__body tr.hover-row > td {
    //         background-color: transparent;
    //     }
    // }

    .alarm-radio-com {
        padding: 8px 0;
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

.box2 {
    color: rgb(255, 255, 255);
    font-size: 16px;
    padding: 30px 20px;
}

.box2::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #25a6ff;
    margin-left: -12px;
    margin-top: 2px;
    border-radius: 2px;
}
</style>
