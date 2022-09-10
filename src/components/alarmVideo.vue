<template>
    <div class="alarmVideo">
        <el-dialog width="88%" title="消控室确认" :visible.sync="rireContrshow">
            <div>
                <el-form :model="confirmCForm" ref="confirmCForm">
                    <el-form-item label="选择结果" prop="confirmResult">
                        <el-radio-group v-model="confirmCForm.confirmResult">
                            <el-radio :label="'01'">误报</el-radio>
                            <el-radio :label="'02'">真实火警</el-radio>
                        </el-radio-group>
                        <!-- <el-select v-model="confirmCForm.confirmResult" placeholder="请选择结果">
                            <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="备注" prop="confirmRemark">
                        <el-input style="width: 100%" maxlength="50" v-model="confirmCForm.confirmRemark" autoComplete="off" placeholder="请输入备注" clearable></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="text_c" style="margin-top: 30px">
                <el-button class="btn-search w100 mar-r-18" type="primary" @click="$emit('closeVideoAlarm')">取消</el-button>
                <el-button class="btn-search w100 mar-r-18" type="primary" @click="confirmList">确定</el-button>
            </div>
        </el-dialog>
        <el-row>
            <el-col :span="6" class="text_c">
                <img style="width: 80%" :src="require('../assets/images/equipImg/' + equipInfo.owningSystem + '.png')" alt="" />
                <!-- <img style="width: 80%" src="../assets/images/forrest-1.png" alt="" /> -->
                <!-- <img style="width: 80%" src="../assets/images/forrest-1.png" alt="" /> -->
                <!-- <img style="width: 80%" src="../assets/images/forrest-1.png" alt="" /> -->
            </el-col>
            <el-col :span="18">
                <!-- <div>首次报警：{{ equipInfo.addtime }}</div> -->
                <div>最新报警：{{ equipInfo.lastUpdatetime }}</div>
                <div>设备名称：{{ equipInfo.equipmentName }}</div>
                <div>报警类型：{{ _comm.getAlarmTypeByCode(equipInfo.alarmType) }}</div>
                <div>二维码ID：{{ equipInfo.qr }}</div>
                <div>二次码：{{ equipInfo.params }}</div>
            </el-col>
        </el-row>
        <div style="margin-top: 20px">报警位置：{{ equipInfo.lookup.building + equipInfo.lookup.floor + (equipInfo.address || '') }}</div>
        <div style="margin-top: 5px">火源类型：其他</div>
        <div id="alarmVideo" style="margin-top: 20px; background-color: #fff"></div>
        <div style="height: 60px" class="text_c">
            <el-row :gutter="30">
                <el-col :span="8"><el-button @click="go51PagesFn" size="small" type="primary">疏散指引</el-button></el-col>
                <el-col :span="8"><el-button @click="postPersonHandel" size="small" type="primary">消控室确认</el-button></el-col>
                <el-col :span="8"><el-button @click="$emit('closeVideoAlarm')" size="small" type="info">忽略</el-button></el-col>
            </el-row>
            <!-- <el-button type="primary">主要按钮</el-button>
            <el-button type="primary">主要按钮</el-button> -->
            <!-- <span @click="$emit('closeVideoAlarm')" style="display: inline-blick; padding: 5px 15px; border-radius: 5px; background-color: #2f82ff; cursor: pointer">确定</span> -->
        </div>
    </div>
</template>
<script>
var player = null;
import EZUIKit from 'ezuikit-js';
export default {
    props: ['equipInfo'],
    data() {
        return {
            optionsType: [
                {
                    value: '01',
                    label: '误报'
                },
                {
                    value: '02',
                    label: '真实火警'
                }
            ],
            rireContrshow: false,
            confirmCForm: {
                id: '',
                confirmResult: '',
                confirmRemark: ''
            },
            checkUserList: [],
            userList: [],
            handelId: ''
        };
    },
    methods: {
        go51PagesFn() {
            window.open('http://182.151.21.153:18080/#/?role=company');
        },
        confirmList() {
            let _self = this;
            this.$refs.confirmCForm.validate((valid) => {
                if (valid) {
                    _self._http({
                        url: '/api/web/webAlarmList/confirmList',
                        type: 'post',
                        isBody: true,
                        data: _self.confirmCForm,
                        success: function (res) {
                            _self.$message({
                                message: '消控室确认成功',
                                type: 'success'
                            });
                            _self.rireContrshow = false;
                            _self.$emit('closeVideoAlarm');
                            _self.getList();
                        }
                    });
                }
            });
        },
        getAlarmInfo() {
            // equipmentId
            // /api/web/webAlarmList/find
            let _self = this;
            _self._http({
                url: '/api/web/webAlarmList/find',
                type: 'get',
                data: {
                    current: 1,
                    equipmentId: _self.equipInfo.id,
                    sorts: 'alarmTime:desc',
                    size: 5
                },
                success: function (res) {
                    _self.confirmCForm.id = res.data.records[0].id;
                    _self.rireContrshow = true;
                }
            });
        },
        addHndelPerson() {
            let _self = this;
            _self._http({
                url: '/api/web/webAlarmList/handleList',
                type: 'post',
                isBody: true,
                data: {
                    ids: _self.handelId,
                    userIds: _self.checkUserList.join(',')
                },
                success: function (res) {
                    _self.personDiaVisiable = false;
                    setTimeout(function () {
                        _self.$message({
                            message: '受理成功',
                            type: 'success'
                        });
                    }, 1000);
                }
            });
        },
        cancelHandel() {},
        postPersonHandel() {
            this.getAlarmInfo();
        },
        getUserList() {
            let _self = this;
            _self._http({
                url: '/api/auth/user/find',
                type: 'get',
                data: {
                    current: 1,
                    size: 999
                },
                success: function (res) {
                    _self.userList = res.data.records;
                    _self.personDiaVisiable = true;
                }
            });
        },
        getVideoInfo() {
            let _self = this;
            _self._http({
                url: '/api/web/webEquipmentVideo/findByEquipId',
                type: 'get',
                data: {
                    equipId: _self.equipInfo.id
                },
                success: function (res) {
                    _self.playVideo(res.data.serialNumber);
                }
            });
        },
        playVideo(serialNumber) {
            let _self = this;
            // let h = document.getElementsByClassName('mhPic')[0].clientHeight;
            // console.log('------------>>>>>>>>', h);
            _self._http({
                url: '/api/web/webYsYun/accessToken',
                type: 'get',
                success: function (res) {
                    // videoToken = res.data;
                    player = new EZUIKit.EZUIKitPlayer({
                        autoplay: true,
                        id: 'alarmVideo', // 视频容器ID
                        accessToken: res.data,
                        url: 'ezopen://open.ys7.com/' + (serialNumber ? serialNumber : 'J63364396') + '/1.live',
                        template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                        // 视频上方头部控件
                        header: ['capturePicture', 'save', 'zoom'], // 如果templete参数不为simple,该字段将被覆盖
                        plugin: ['talk', 'broadcast'], // 加载插件，talk-对讲
                        // 视频下方底部控件
                        footer: ['talk', 'broadcast', 'hd', 'fullScreen'], // 如果template参数不为simple,该字段将被覆盖
                        audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                        openSoundCallBack: (data) => console.log('开启声音回调', data),
                        closeSoundCallBack: (data) => console.log('关闭声音回调', data),
                        startSaveCallBack: (data) => console.log('开始录像回调', data),
                        stopSaveCallBack: (data) => console.log('录像回调', data),
                        capturePictureCallBack: (data) => console.log('截图成功回调', data),
                        fullScreenCallBack: (data) => {
                            console.log(123);
                            this.$emit('changeFull');
                        },
                        getOSDTimeCallBack: (data) => console.log('获取OSDTime回调', data),
                        height: 260
                    });
                }
            });

            window.addEventListener('keyup', this.handleKeyup);
        }
    },
    created() {},
    mounted() {
        this.getVideoInfo();
    }
};
</script>
<style lang="scss">
.alarmVideo {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 12px;
    color: #fff;
    .broadcast {
        display: none !important;
    }
    .el-dialog {
        margin-top: 15px !important;
    }
}
</style>
