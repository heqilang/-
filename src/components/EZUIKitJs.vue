<!--
 * @Author:  HHQ
 * @Date: 2021-12-21 14:58:34
 * @LastEditTime: 2021-12-27 09:03:00
 * @LastEditors: HHQ
 * @Description: ComponentS简介
 * 改动内容：
-->
<template>
    <div class="EZUIKitConMain">
        <div class="hello-ezuikit-js" style="width: 100%; height: 100%">
            <div ref="audio" id="video-container" style="width: 100%; height: 100%"></div>
        </div>
        <!-- <div class="contralBtn" @click="showContaolMen = !showContaolMen">
            <i class="el-icon-rank" style="color:#fff"></i>云台控制
        </div>
        <div v-if="showContaolMen" class="contralMenu">
            <el-row style="height: 33%; text-align: center; line-height: 33px">
                <el-col style="height: 100%" :span="8">&nbsp;</el-col>
                <el-col style="height: 100%" class="el-col-8p" :span="8"><i class="el-icon-top"></i></el-col>
                <el-col style="height: 100%" :span="8">&nbsp;</el-col>
            </el-row>
            <el-row style="height: 33%; line-height: 33px">
                <el-col style="height: 100%; text-align: center" class="el-col-8p" :span="8"><i class="el-icon-back"></i></el-col>
                <el-col style="height: 100%" :span="8">&nbsp;</el-col>
                <el-col style="height: 100%; text-align: center" class="el-col-8p" :span="8"><i class="el-icon-right"></i></el-col>
            </el-row>
            <el-row style="height: 33%; text-align: center; line-height: 33px">
                <el-col style="height: 100%" :span="8">&nbsp;</el-col>
                <el-col style="height: 100%" class="el-col-8p" :span="8"><i class="el-icon-bottom"></i></el-col>
                <el-col style="height: 100%" :span="8">&nbsp;</el-col>
            </el-row>
        </div> -->
    </div>
</template>

<script>
import EZUIKit from 'ezuikit-js';
var player = null;

export default {
    props: ['videoParams'],
    data() {
        return {
            showVideo: true,
            showContaolMen: false
        };
    },
    mounted() {
        console.log(this.videoParams);
        console.group('mounted 组件挂载完毕状态===============》');
        let _self = this;
        let h = document.getElementsByClassName('video-item-inside')[0].clientHeight - 98;
        console.log('------------>>>>>>>>', h);
        player = new EZUIKit.EZUIKitPlayer({
            autoplay: true,
            id: 'video-container', // 视频容器ID
            accessToken: _self.videoParams.accessToken,
            url: 'ezopen://open.ys7.com/' + _self.videoParams.DeviceSerial + '/' + _self.videoParams.ChannelNo + '.live',
            template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
            // 视频上方头部控件
            header: ['capturePicture', 'save', 'zoom'], // 如果templete参数不为simple,该字段将被覆盖
            plugin: ['talk'], // 加载插件，talk-对讲
            // 视频下方底部控件
            footer: _self.videoParams.footer || ['talk', 'hd', 'fullScreen'], // 如果template参数不为simple,该字段将被覆盖
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
            height: h
        });
        // _self.$nextTick(() => {
        //     _self.$refs.audio.play();
        // });
        window.addEventListener('keyup', this.handleKeyup);
        // console.log("player",player);
        // setTimeout(()=>{
        //   player.stop(); // 方法调用示例，10秒后关闭视频
        // },10000)
    },
    methods: {
        moveFn() {
            let _self = this;
            _self._http({
                url: 'https://open.ys7.com/api/lapp/device/ptz/start',
                type: 'post',
                data: {
                    accessToken: _self.videoParams.videoParams,
                    deviceSerial: _self.videoParams.DeviceSerial,
                    channelNo: 1,
                    direction: 2,
                    speed: 1
                },
                success: function (res) {}
            });
            // https://open.ys7.com/api/lapp/device/ptz/start
        },
        handleKeyup(e) {
            console.log(e.keyCode == 27);
            if (e.keyCode == 27) {
                this.$emit('changeFull');
            }
        },
        change() {
            player.stop();
            // 切换为直播
            player.play({
                url: 'ezopen://open.ys7.com/244640009/1.live'
            });

            // setTimeout(()=>{
            //   player.play({
            //     url:"ezopen://open.ys7.com/244640009/1.live"
            //   })
            // },1000)
        }
    },
    watch: {
        'videoParams.DeviceSerial'() {
            let _self = this;
            // _self.showVideo = false;
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            // _self.$nextTick(() => {
            //   console.log(2);
            //     _self.showVideo = true;
            // });
        }
    }
};
</script>
<style lang="scss">
.EZUIKitConMain {
    position: relative;
    .contralBtn {
        position: absolute;
        z-index: 10;
        bottom: 5px;
        left: 197px;
        width: 84px;
        height: 38px;
        box-sizing: border-box;
        line-height: 38px;
        box-shadow: 0px 0px 5px #00000050;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
    .contralMenu {
        position: absolute;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        .el-col-8p {
            box-sizing: border-box;
            border: 1px solid #ccc;
            color: #fff;
            cursor: pointer;
        }
    }
    .time-area {
        display: none !important;
    }
}
</style>
