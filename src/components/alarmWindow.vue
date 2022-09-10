<template>
    <div class="alarmContainerMain">
        <div class="alarmHead">
            <el-row>
                <el-col :span="20"
                    ><span style="font-size: 15px; padding-left: 10px">共有 {{ totalAlarm }} 条报警</span> <span style="padding-left: 30px; cursor: pointer" @click="lookMore">查看更多</span>
                    <span style="padding-left: 30px; cursor: pointer" @click="vdiochange">报警测试</span>
                </el-col>
                <el-col :span="4" class="text_r">
                    <i v-if="voiceFlag" @click="voiceFlag = !voiceFlag" class="el-icon-message-solid pointer" style="font-size: 26px; margin-right: 20px; color: #fff"></i>
                    <i v-else @click="voiceFlag = !voiceFlag" class="el-icon-bell pointer" style="font-size: 26px; margin-right: 20px; color: #fff"></i>
                </el-col>
            </el-row>
        </div>
        <div class="listCon">
            <el-scrollbar class="height100">
                <div v-for="item in alarmList" :key="item.id" class="listItem">
                    <el-row class="height100">
                        <el-col class="height100" :span="14">
                            <div style="height: 36px; line-height: 36px">
                                <i class="el-icon-info fs-30" style="vertical-align: middle"></i>
                                <span style="margin-left: 10px" :class="[_comm.getStatusClass(item.equipmentState)]"
                                    >{{ _comm.getEuipmentNameByCode(item.equipmentState) }} <span v-if="item.alarmType && item.alarmType != 0">（{{ _comm.getAlarmTypeByCode(item.alarmType) }}）</span></span
                                >
                                <span style="color: #f43131">报警次数：{{ item.alarmTimes }}</span>
                            </div>
                            <div class="ellipsis" style="height: 26px; line-height: 26px">设备：{{ item.equipmentName }}（ {{ item.qrId }} ）</div>
                            <div style="height: 26px; line-height: 26px">位置：{{ item.lookup.building }} | {{ item.lookup.floor + item.address }}</div>
                        </el-col>
                        <el-col class="height100 text_r" :span="10">
                            <div style="height: 25%; line-height: 28px">最新报警：{{ item.lastAlarmTime }}</div>
                            <div style="height: 25%; line-height: 28px">首次报警：{{ item.addtime }}</div>
                            <div style="height: 50%; line-height: 44px">
                                <el-button @click="handelAlarm(item)">{{ item.equipmentState == 9 ? '详情' : '受理' }}</el-button>
                                <el-button v-if="item.equipmentState != 9">忽略</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="height: 30px"></div>
            </el-scrollbar>
        </div>
        <div class="alertModel">
            <el-dialog top="20vh" :modal-append-to-body="false" height="1100px" width="600px" title="视频" :visible.sync="showvdio" :close-on-click-modal="true" class="unit-edit-con">
                <div style="position: relative">
                    <component :videoid="videoid" :is="require('./homevideo.vue')"></component>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showvdio: false,
            voiceFlag: true,
            alarmList: [],
            totalAlarm: '',
            videoid: 0
        };
    },
    methods: {
        vdiochange() {
            this.showvdio = true;
            this.videoid += 1;
        },
        lookMore() {
            this.$router.push({
                path: '/alarmCall'
            });
        },
        handelAlarm(item) {
            let _self = this;
            _self._http({
                url: '/api/web/webAlarmList/autoHandleList',
                type: 'post',
                isBody: true,
                data: {
                    ids: item.id,
                    userIds: _self._storage.LStorage.get('_UserInfo').id
                },
                success: function (res) {
                    if (item.equipmentState == 9) {
                        _self.$router.push({
                            path: '/alarmCall'
                        });
                    } else {
                        _self._http({
                            url: '/api/web/webAlarmList/autoHandleList',
                            type: 'post',
                            isBody: true,
                            data: {
                                ids: item.id,
                                userIds: _self._storage.LStorage.get('_UserInfo').id
                            },
                            success: function (res) {
                                setTimeout(function () {
                                    _self.$message({
                                        message: '受理成功',
                                        type: 'success'
                                    });
                                }, 500);
                            }
                        });
                    }
                    _self.getAlarmList();
                }
            });
        },
        getAlarmList() {
            let _self = this;
            _self._http({
                url: '/api/web/webAlarmList/findAlarmList',
                type: 'get',
                data: {
                    current: 1,
                    size: 20,
                    transform: 'F:floor;B:building',
                    sorts: 'lastAlarmTime:desc'
                },
                success: function (res) {
                    _self.alarmList = res.data.records;
                    _self.totalAlarm = res.data.total;
                }
            });
        }
    },
    created() {},
    mounted() {
        this.getAlarmList();
    },
    watch: {
        '$store.state.alarmEquipInfo'() {
            console.log('变化', this.$store.state.alarmEquipInfo);
            this.getAlarmList();
        }
    }
};
</script>
<style lang="scss">
.alarmContainerMain {
    width: 100%;
    height: calc(100% - 30px);
    // background-color: #f2f5fa;
    background-color: #1f324f;
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
    overflow: hidden;
    .el-dialog__body {
        max-height: 65vh !important;
    }
    .alarmHead {
        height: 60px;
        color: #fff;
        line-height: 66px;
        //左上到右下渐变色
        // background: linear-gradient(to right, #ed3a3a, #ed3a3a);
        background: linear-gradient(to bottom right, #192640, #192640);
    }
    .listCon {
        height: calc(100% - 60px);
        padding: 10px;
        .listItem {
            border-radius: 6px;
            height: 110px;
            //  background-color: #fff;
            background-color: #1d3c5e;
            color: #fff;

            border: 1px solid #14447d;
            margin-bottom: 10px;
            .el-col-14 {
                padding-left: 10px;
            }
            .el-col-10 {
                padding-right: 10px;
                button {
                    height: 30px !important;
                    padding: initial !important;
                    line-height: 30px;
                    padding: 0 6px !important;
                }
            }
        }
    }
}
</style>
