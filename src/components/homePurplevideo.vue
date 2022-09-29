<template>
    <div class="homeYiluvideo">
        <el-row>
            <el-col :span="24">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="相机id:">
                        <el-input v-model="formLabelAlign.cameraId"></el-input>
                    </el-form-item>
                    <el-form-item label="流模式:">
                        <el-input v-model="formLabelAlign.streamMode"></el-input>
                    </el-form-item>
                    <el-form-item label="链接可使用时间:">
                        <el-input v-model="formLabelAlign.keepAlive"></el-input>
                    </el-form-item>

                    <el-form-item class="form">
                        <el-button type="primary" @click="getPurPle">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- <div style="margin-top: 20px">报警位置：{{ '新世纪环球中心1楼1FB09外侧通道' }}</div> -->
        <div style="text-align: center">
            <div id="homeYiluvideo" style="margin-top: 20px; background-color: #fff"></div>
            <video height="100%" controls width="100%" :src="scrImg"></video>
        </div>
    </div>
</template>
<script>
var player = null;
import EZUIKit from 'ezuikit-js';
import axios from 'axios';

export default {
    props: ['videoid'],
    data() {
        return {
            confirmCForm: {
                id: '',
                confirmResult: '01',
                confirmRemark: ''
            },
            labelPosition: 'right',
            formLabelAlign: {
                cameraId: '', //51010900011320999873
                streamMode: '', //3
                keepAlive: '', //7200
                visitIp: '192.168.3.40'
            },
            scrImg: ''
        };
    },
    watch: {
        videoid: function (val) {
            document.getElementById('homeYiluvideo').innerHTML = '';
            // this.getVideoInfo();
            this.playVideo('K27020363');
        }
    },
    methods: {
        getPurPle() {
            let _self = this;
            _self._http({
                url: '/api/web/indexCountV3/getUnisinsightVideoUrl',
                type: 'get',
                data: _self.formLabelAlign,
                success: function (res) {
                    this.scrImg = res.data;
                    console.log(this.scrImg, 6666);
                }
            });
        },
        // getVideoInfo() {
        //     let _self = this;
        //     _self._http({
        //         url: '/api/web/webEquipmentVideo/findByEquipId',
        //         type: 'get',
        //         data: {
        //             equipId: '00eed3514f544ad495c60f3fdd015001'
        //         },
        //         success: function (res) {
        //             _self.playVideo(res.data.serialNumber);
        //         }
        //     });
        // },
        playVideo(serialNumber) {
            let _self = this;
            _self._http({
                url: '/api/web/webYsYun/accessToken',
                type: 'get',
                success: function (res) {
                    // videoToken = res.data;
                    player = new EZUIKit.EZUIKitPlayer({
                        autoplay: true,
                        id: 'homeYiluvideo', // 视频容器ID
                        accessToken: res.data,
                        url: 'ezopen://open.ys7.com/' + (serialNumber ? serialNumber : 'K27019861') + '/1.live',
                        // template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                        // 视频上方头部控件
                        // header: ['capturePicture', 'save', 'zoom'], // 如果templete参数不为simple,该字段将被覆盖
                        // plugin: ['talk', 'broadcast'], // 加载插件，talk-对讲
                        // 视频下方底部控件
                        // footer: ['talk', 'broadcast', 'hd', 'fullScreen'], // 如果template参数不为simple,该字段将被覆盖
                        // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                        // openSoundCallBack: (data) => console.log('开启声音回调', data),
                        // closeSoundCallBack: (data) => console.log('关闭声音回调', data),
                        // startSaveCallBack: (data) => console.log('开始录像回调', data),
                        // stopSaveCallBack: (data) => console.log('录像回调', data),
                        // capturePictureCallBack: (data) => console.log('截图成功回调', data),
                        // fullScreenCallBack: (data) => {
                        //     console.log(123);
                        //     this.$emit('changeFull');
                        // },
                        // getOSDTimeCallBack: (data) => console.log('获取OSDTime回调', data),
                        height: '260',
                        width: '550'
                    });
                }
            });

            window.addEventListener('keyup', this.handleKeyup);
        }
    },
    created() {
        /* let _self = this;
            _self._http({
                url: '/api/web/indexCountV3/getUnisinsightVideoUrl',
                type: 'get',
                data:_self.formLabelAlign,
                success: function (res) {
              console.dir(res)
                }
            }); */
        // window.addEventListener('keyup', this.handleKeyup);
    },
    mounted() {
        // this.getVideoInfo();
        /*      this.playVideo('K27020363');
      console.dir("222222222222222222")


      let _self = this;
            _self._http({
                url: "apli/cityjson?ie=utf-8",
                type: 'post',
                success: function (res) {
              console.dir(res)
                }
            });
 
 
        console.dir("6666666666666666") */
    }
};
</script>

<style lang="scss">
.homeYiluvideo {
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
    .el-form-item__content {
        width: 300px !important;
        margin-left: 140px !important;
    }
    .el-form-item__label {
        width: 140px !important;
        color: #fff;
    }
}
.form {
    text-align: center;
}
</style>
