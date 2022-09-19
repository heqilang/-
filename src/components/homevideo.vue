<template>
    <div class="homeVideo">
        <el-row>
            <el-col :span="18">
                <div>最新报警：{{ '2022.09.07 22.50.33' }}</div>
                <div>设备名称：{{ '点烟火灾探测器' }}</div>
                <div>报警类型：{{ '无' }}</div>
                <div>二维码ID：{{ '136.191.638' }}</div>
                <div>二次码：{{ '6516532159877416' }}</div>
            </el-col>
        </el-row>
        <div style="margin-top: 20px">报警位置：{{ '环球中心3楼' }}</div>
        <div style="margin-top: 5px">火源类型：其他</div>
        <div style="text-align: center">
            <div id="homeVideo" style="margin-top: 20px; background-color: #fff"></div>
        </div>
    </div>
</template>
<script>
var player = null;
import EZUIKit from 'ezuikit-js';
export default {
    props: ['videoid'],
    data() {
        return {
            confirmCForm: {
                id: '',
                confirmResult: '01',
                confirmRemark: ''
            }
        };
    },
    watch: {
        videoid: function (val) {
            document.getElementById('homeVideo').innerHTML = '';
            this.getVideoInfo();
        }
    },
    methods: {
        getVideoInfo() {
            let _self = this;
            _self._http({
                url: '/api/web/webEquipmentVideo/findByEquipId',
                type: 'get',
                data: {
                    equipId: '00eed3514f544ad495c60f3fdd015001'
                },
                success: function (res) {
                    _self.playVideo(res.data.serialNumber);
                }
            });
        },
        playVideo(serialNumber) {
            let _self = this;
            _self._http({
                url: '/api/web/webYsYun/accessToken',
                type: 'get',
                success: function (res) {
                    // videoToken = res.data;
                    player = new EZUIKit.EZUIKitPlayer({
                        autoplay: true,
                        id: 'homeVideo', // 视频容器ID
                        accessToken: res.data,
                        url: 'ezopen://open.ys7.com/' + (serialNumber ? serialNumber : 'J63364396') + '/1.live',
                        // template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                        // // 视频上方头部控件
                        // header: ['capturePicture', 'save', 'zoom'], // 如果templete参数不为simple,该字段将被覆盖
                        // plugin: ['talk', 'broadcast'], // 加载插件，talk-对讲
                        // // 视频下方底部控件
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
    created() {},
    mounted() {
        this.getVideoInfo();
    }
};
</script>
<style lang="scss">
.homeVideo {
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
