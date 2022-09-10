<template>
    <div class="container">
        <div class="amap-wrapper">
            <!-- 搜索框 -->
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap ref="gaoDeMap" vid="amap" :zoom="zoom" :center="center" :plugin="plugin" :events="events" class="amap-demo">
                <!-- 标记插件 -->
                <el-amap-marker vid="component-marker" :position="marker.position" :events="marker.events"></el-amap-marker>
            </el-amap>
        </div>
    </div>
</template>
<script>
export default {
    props: [],
    data() {
        let _self = this;
        return {
            searchOption: '',
            // amapManager,
            zoom: 10,
            center: [104.0663479707031, 30.60062212234876],
            events: {
                init: (o) => {
                    o.getCity((result) => {
                        console.log(result);
                    });
                    this.center = [];
                },
                moveend: () => {},
                zoomchange: () => {},
                click: (e) => {
                    let _self = this;
                    console.log(e);
                    // 获取当前选中的经纬度
                    _self.$emit('getClickPosition', e.lnglat);
                }
            },
            plugin: [
                {
                    pName: 'ToolBar',
                    position: 'RB'
                },
                {
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    _self.lng = result.position.lng;
                                    _self.lat = result.position.lat;
                                    // _self.center = [121.59996, 31.197646];
                                    _self.loaded = true;
                                    _self.$nextTick();
                                }
                            });
                        }
                    }
                }
            ],
            componentMarker: {
                position: []
                /*contentRender: (h, instance) => h(exampleComponents, { style: { backgroundColor: '#fff' }, props: { text: '' } }, [''])*/
            },
            marker: {
                position: [121.5273285, 31.21515044],
                events: {
                    click: (e) => {
                        _self.$emit('getClickPosition', e.lnglat);
                    },
                    dragend: (e) => {
                        // console.log('---event---: dragend')
                        // this.marker.position = [e.lnglat.lng, e.lnglat.lat];
                    }
                },
                visible: true,
                draggable: false,
                template: ''
            }
        };
    },
    mounted() {
        console.log('地图组件----->', this.$refs.gaoDeMap);
    },
    methods: {
        onSearchResult(posiValList) {
            let _self = this;
            let tempPosi = [posiValList[0].lng, posiValList[0].lat];
            _self.$set(_self.marker, 'position', tempPosi);
            // 定位到标记位置，并且放大地图
            _self.center = tempPosi;
            _self.zoom = 20;
        }
    }
};
</script>
<style lang="scss">
.amap-wrapper {
    height: 60vh;

    .el-vue-search-box-container {
        border: 1px solid rgba(0, 0, 0, 0.11);
        border-radius: 4px;
    }

    .el-vue-amap-container,
    .el-vue-amap-container .el-vue-amap {
        height: 92%;
    }

    .el-vue-amap {
    }
}
</style>
