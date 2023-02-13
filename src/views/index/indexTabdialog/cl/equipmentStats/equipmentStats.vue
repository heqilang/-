<!--
设备统计- 资源小类型分类统计
-->

<template>
    <div class="xf-stats-wrapper">
        <div class="equipment-category-stats-wrapper" v-if="currentLayerLevel === 1">
            <!--    <div class="equipment-category-groups">
                <a :class="{ 'equipment-category-group': true, 'group-active': true }" v-on:click="changeEquipmentGroup('消防设备')">消防设备</a>
           <a :class="{ 'equipment-category-group': true, 'group-active': activeEquipmentGroup === '安防设备' }" v-on:click="changeEquipmentGroup('安防设备')">安防设备</a>
                <a :class="{ 'equipment-category-group': true, 'group-active': activeEquipmentGroup === '逃生疏散设备' }" v-on:click="changeEquipmentGroup('逃生疏散设备')">逃生疏散设备</a> 
            </div> -->

            <ul>
                <li class="xf-stats-wrapper_li">
                    <div class="grid-content bg-purple">
                        <h3>
                            <span>消防设备</span> <br />
                            <span class="xf-stats-wrapper_li_span"> 已接入：{{ alarmEventList.equipSys1 + alarmEventList.equipSys3 + alarmEventList.equipSys8 + alarmEventList.equipSys5 + alarmEventList.equipSys9 }}</span>
                        </h3>

                        <div class="equipment-categorys">
                            <a class="equipment-category" v-for="item in equipmentGroupCategoryData" :key="item" v-bind:style="'background-image:url(' + item.img + ')'" v-on:click="intoLayer2(item.code)">
                                <span class="equipment-category_spanword">{{ item.name }} </span> <br />

                                <span class="equipment-category_spanvalue">
                                    {{ item.value }}
                                </span>
                                <div class="equipment-category_img"></div>
                                <img width="88px" height="88px" class="equipment-category_imggggg" :src="item.img" alt="" />
                            </a>
                        </div>
                    </div>
                </li>

                <li class="xf-stats-wrapper_li" style="margin: 0px 10px">
                    <div class="grid-content bg-purple-light">
                        <h3>
                            <span>安防设备</span> <br />
                            <span class="xf-stats-wrapper_li_span"> 已接入：{{ alarmEventList.videoCount }} </span>
                        </h3>
                        <!--   <div class="equipment-category-groups">
                          
                          <a :class="{ 'equipment-category-group': true, 'group-active': true }" v-on:click="changeEquipmentGroup('安防设备')">安防设备</a>
                         
                      </div> -->
                        <div class="equipment-categorys">
                            <a class="equipment-category" v-for="item in group2" :key="item" v-bind:style="'background-image:url(' + item.img + ')'" v-on:click="intoLayer2(item.code)">
                                <span class="equipment-category_spanword">{{ item.name }} </span> <br />

                                <span class="equipment-category_spanvalue">
                                    {{ item.value }}
                                </span>
                                <div class="equipment-category_img"></div>
                                <img width="88px" height="88px" class="equipment-category_imggggg" :src="item.img" alt="" />
                            </a>
                        </div>
                    </div>
                </li>

                <li class="xf-stats-wrapper_li">
                    <div class="grid-content bg-purple">
                        <h3>
                            <span>逃生疏散设备</span> <br />
                            <span class="xf-stats-wrapper_li_span"> 已接入： {{ alarmEventList.tsbnxt + alarmEventList.equipSys6 + alarmEventList.equipSys11 + alarmEventList.equipSys10 }}</span>
                        </h3>
                        <div class="equipment-categorys">
                            <a class="equipment-category" v-for="item in group3" :key="item" v-bind:style="'background-image:url(' + item.img + ')'" v-on:click="intoLayer2(item.code)">
                                <span class="equipment-category_spanword">{{ item.name }} </span> <br />

                                <span class="equipment-category_spanvalue">
                                    {{ item.value }}
                                </span>
                                <img class="equipment-categorys_immg" src="../../../../../assets//images//globalCenter/liimg.png" alt="" />
                                <img width="88px" height="88px" class="equipment-category_imggggg" :src="item.img" alt="" />
                            </a>
                        </div>
                    </div>
                </li>
            </ul>

            <!--  <div class="equipment-category-groups">
                
                <a :class="{ 'equipment-category-group': true, 'group-active': true }" v-on:click="changeEquipmentGroup('逃生疏散设备')">逃生疏散设备</a>
               
            </div> -->
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 2">
            <a class="return-upper-level-btn" v-on:click="intoLayer1()"><<</a>
            <equipmentTypeStats :typeName="activeEquipmentCategory" v-on:onclick="intoLayer3" />
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 3">
            <a class="return-upper-level-btn" v-on:click="intoLayer2(activeEquipmentCategory)"><<</a>
            <equipmentTypeList :type="activeEquipmentType" @getDealie="getDealie" :owning-system="activeEquipmentCategory" />
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 4">
            <a class="return-upper-level-btn" v-on:click="intoLayer4(activeEquipmentCategory)"><<</a>
            <equipmentDealie :activeDealie="activeDealie" />
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 5">
            <a class="return-upper-level-btn" v-on:click="intoLayer5(activeEquipmentCategory)"><<</a>
            <videoCountType @getvideo="getvideo" />
        </div>
        <div class="stats-layer-container" v-if="currentLayerLevel === 6">
            <a class="return-upper-level-btn" v-on:click="intoLayer6(activeEquipmentCategory)"><<</a>
            <videoCountitem :getvideoitem="getvideoitem" />
        </div>
    </div>
</template>

<script>
import equipmentTypeStats from './equipmentTypeStats';
import equipmentTypeList from './equipmentTypeList';
import equipmentDealie from './equipmentDealie';
import videoCountType from './videoCountType';
import videoCountitem from './videoCountitem';

export default {
    components: {
        equipmentTypeStats,
        equipmentTypeList,
        equipmentDealie,
        videoCountType,
        videoCountitem
    },
    props: ['alarmEventList'],
    data: () => ({
        equipmentGroupCategoryData: {},

        currentLayerLevel: 1,
        activeEquipmentGroup: '消防设备', //当前激活的 设备分组 TODO 目前是个中文字符串,后面应该要改成字典id
        activeEquipmentCategory: '', //当前激活的 设备分类 TODO 目前是个中文字符串,后面应该要改成字典id
        activeEquipmentType: '', //当前激活的 设备类型 TODO 目前是个中文字符串,后面应该要改成字典id
        activeDealie: '', //设备详情页面的数据
        group1: {},
        group2: {},
        group3: {},
        getvideoitem: ''
    }),
    created() {},
    mounted() {
        let _self = this;
        _self._http({
            url: '/api/web/indexCountTwo/resourceStatistics',
            type: 'get',
            // isBody: true,
            // data: searchObj,
            success: function (res) {
                _self.group1 = [
                    { name: '火灾报警系统', code: 'equipSys1', value: res.data.equipSys1, img: require('@/assets/images/cl/huozaibaojing/1.png') },
                    { name: '消防供水设备', code: 'equipSys9', value: res.data.equipSys9, img: require('@/assets/images/cl/huozaibaojing/2.png') },
                    { name: '喷水灭火系统', code: 'equipSys3,equipSys8', value: res.data.equipSys8 + res.data.equipSys3, img: require('@/assets/images/cl/huozaibaojing/3.png') },
                    // { name: '耐火构件系统', code: 'equipSys3', value: res.data.equipSys3 + res.data.equipSys4 + res.data.equipSys8, img: require('@/assets/images/cl/xiaofanggeishui.png') },
                    { name: '手提式干粉灭火器', code: 'equipSys5', value: res.data.equipSys5, img: require('@/assets/images/cl/huozaibaojing/4.png') }

                    // { name: '其它', code: '', value: 0, img: require('@/assets/images/cl/qita.png') }
                ];

                _self.group2 = [
                    { name: '安防摄像头', code: 'videoCount', value: res.data.videoCount, img: require('@/assets/images/cl/huozaibaojing/5.png') }
                    // { name: '摄像头B', value: 45445, img: require('@/assets/images/cl/pensuimiehuo.png') }
                ];

                _self.group3 = [
                    { name: '防烟排烟系统', code: 'equipSys6', value: res.data.equipSys6, img: require('@/assets/images/cl/huozaibaojing/6.png') },
                    { name: '逃生避难系统', code: 'tsbnxt', value: res.data.tsbnxt, img: require('@/assets/images/cl/huozaibaojing/7.png') },
                    { name: '消防电梯设施', code: 'equipSys11', value: res.data.equipSys11, img: require('@/assets/images/cl/huozaibaojing/8.png') },
                    { name: '耐火构件系统', code: 'equipSys10', value: res.data.equipSys10, img: require('@/assets/images/cl/huozaibaojing/9.png') }
                ];

                _self.equipmentGroupCategoryData = _self.group1;
            }
        });
    },
    methods: {
        intoLayer1() {
            this.currentLayerLevel = 1;
        },
        intoLayer2(category) {
            if (category !== 'videoCount') {
                this.activeEquipmentCategory = category;
                this.currentLayerLevel = 2;
            }
            if (category == 'videoCount') {
                this.activeEquipmentCategory = category;
                this.currentLayerLevel = 5;
            }
        },
        intoLayer3(type) {
            this.activeEquipmentType = type;
            this.currentLayerLevel = 3;
        },
        intoLayer4() {
            this.currentLayerLevel = 3;
        },
        intoLayer5() {
            this.currentLayerLevel = 1;
        },
        intoLayer6() {
            this.currentLayerLevel = 5;
        },
        getDealie(val) {
            this.currentLayerLevel = 4;
            this.activeDealie = val;
            console.dir(val);
        },
        changeEquipmentGroup(groupName) {
            let _self = this;
            this.activeEquipmentGroup = groupName;
            _self.equipmentGroupCategoryData = [];
            if (groupName === '消防设备') {
                this.equipmentGroupCategoryData = _self.group1;
            } else if (groupName === '安防设备') {
                this.equipmentGroupCategoryData = _self.group2;
                console.log(this.equipmentGroupCategoryData);
                screen;
            } else if (groupName === '逃生疏散设备') {
                this.equipmentGroupCategoryData = _self.group3;
            }
        },
        getvideo(val) {
            this.getvideoitem = val;
            this.currentLayerLevel = 6;
        }
    }
};
</script>

<style lang="scss">
@import './equipmentStats.scss';
</style>
