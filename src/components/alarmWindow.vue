<template>
    <div class="alarmContainerMain">
        <div class="alarmHead">
            <el-row>
                <el-col :span="20"
                    ><span style="font-size: 15px; padding-left: 10px">共有 {{ totalAlarm }} 条报警</span> <span style="padding-left: 15px; cursor: pointer" @click="lookMore">查看更多</span> <span style="padding-left: 15px; cursor: pointer" @click="vdiochange">报警测试</span>
                    <span style="padding-left: 15px; cursor: pointer" @click="vdioYiluchange">视频</span>
                    <span style="padding-left: 15px; cursor: pointer" @click="vdioPurpleChange">紫光视频</span>
                    <span style="padding-left: 15px; cursor: pointer" @click="getAlarmHead">火情事件</span>
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
                                <el-button @click="handelAlarm(item)">{{ item.equipmentState == 9 ? '详情' : '受理' }} </el-button>
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
        <div class="alertModel">
            <el-dialog top="20vh" :modal-append-to-body="false" height="1100px" width="600px" title="视频" :visible.sync="showYiluvdio" :close-on-click-modal="true" class="unit-edit-con">
                <div style="position: relative">
                    <component :videoid="videoid" :is="require('./homeYiluvideo.vue')"></component>
                </div>
            </el-dialog>
        </div>
        <div class="alertModel">
            <el-dialog top="20vh" :modal-append-to-body="false" height="1100px" width="600px" title="紫光视频" :visible.sync="showPurplevdio" :close-on-click-modal="true" class="unit-edit-con">
                <div style="position: relative">
                    <component :videoid="videoid" :is="require('./homePurplevideo.vue')"></component>
                </div>
            </el-dialog>
        </div>

        <div class="alertModels">
            <el-dialog top="20vh" v-if="showalarmHead" :modal-append-to-body="false" height="80%" width="80%" title="火情事件" :visible.sync="showalarmHead" :close-on-click-modal="true">
                <div style="width: 100%; height: 100%">
                    <component v-if="showalarmHead" @getFireDate="getFireDate" :videoid="videoid" :is="require('./homeFire.vue')"> </component>
                </div>
            </el-dialog>
        </div>

        <div class="alertModels">
            <el-dialog top="20vh" :modal-append-to-body="false" height="80%" width="600px" title="结束火情" :visible.sync="showalarmHeads" :close-on-click-modal="true">
                <div style="width: 100%; height: 100%">
                    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item
                            v-if="showalarmHeads"
                            label="解除备注"
                            prop="age"
                            :rules="[
                                { required: true, message: '解除备注不能为空' },
                                { min: 0, max: 40, message: '长度在 0 到 40个字符', trigger: 'change' }
                            ]"
                        >
                            <el-input maxlength="40" type="text" v-model="numberValidateForm.age" placeholder="请填写备注信息" autocomplete="off"> </el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center; margin-right: 30px">
                            <el-button @click="resetForm('numberValidateForm')">取消</el-button>
                            <el-button type="primary" @click="submitForm('numberValidateForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };

        return {
            showalarmHeads: false,
            showalarmHead: false,
            showPurplevdio: false,
            showYiluvdio: false,
            showvdio: false,
            voiceFlag: true,
            alarmList: [],
            totalAlarm: '',
            videoid: 0,
            numberValidateForm: {
                age: ''
            },
            eventId: ''
        };
    },
    methods: {
        submitForm(formName) {
            let _self = this;
            //   /api/web/indexCountV3/finishAlarmEvent
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self._http({
                        url: '/api/web/indexCountV3/finishAlarmEvent',
                        type: 'post',
                        isBody: true,
                        data: {
                            remark: _self.numberValidateForm.age,
                            eventId: _self.eventId
                        },
                        success: function (res) {
                            _self.showalarmHeads = false;
                            _self.showalarmHead = true;
                            _self.numberValidateForm.age = '';
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.showalarmHeads = false;
            this.showalarmHead = true;
        },

        getFireDate(val) {
            this.showalarmHeads = true;
            this.showalarmHead = false;
            console.log(val);
            this.eventId = val.eventId;
        },

        //火情
        getAlarmHead() {
            this.showalarmHead = true;
        },

        vdioPurpleChange() {
            //紫光视频
            this.showPurplevdio = true;
        },

        vdioYiluchange() {
            this.showYiluvdio = true;
            this.videoid += 1;
        },
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
.alertModels .el-button {
    padding: 10px 36px;
}

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

.alarmHead_box {
    position: absolute;
    right: 0;
    top: 0;
}

.alarmContainerMain .alertModels .el-dialog__body {
    max-height: 76vh !important;
}
</style>
