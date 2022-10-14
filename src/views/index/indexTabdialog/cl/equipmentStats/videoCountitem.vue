<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div class="videostils">
            <video :id="postId" class="video-js vjs-default-skin videos" data-setup="{}"></video>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
    props: {
        getvideoitem: {
            required: true
        }
    },
    data() {
        return {
            // videoUrl2: 'rtmp://119.6.226.37:29765/live/1282482383_51010900001991003544_0_0'
            postId: 'video' + new Date().getTime().toString().substr(8)
        };
    },
    created() {},
    mounted() {
        this.loadListData();
    },
    methods: {
        loadListData() {
            let _self = this;
            // if (_self.owningSystem) {
            _self._http({
                url: '/api/open/longGuan/getVideoUrl',
                type: 'get',
                data: {
                    id: _self.getvideoitem.id,
                    ip: ''
                },
                success: function (res) {
                    let videoPlayer = videojs(_self.postId, {
                        preload: 'auto', // 预加载
                        autoplay: true, // 自动播放
                        flash: {
                            swf: '//vjs.zencdn.net/swf/5.4.2/video-js.swf'
                        },
                        notSupportedMessage: '你的浏览器不支持Flash播放'
                    });

                    videoPlayer.src({
                        type: 'rtmp/flv',
                        // src: "rtmp://119.6.226.38:29745/live/1282609116_51010900001991003545_0_0"
                        src: res.data
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
.videostils {
    .videos {
        height: 600px;
        width: 1100px;
    }
}
</style>
