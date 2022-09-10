<!--
设备统计- 资源小类型分类统计
-->

<template>
    <div class="xf-stats-wrapper">
        <div class="equipment-category-stats-wrapper" v-if="currentLayerLevel === 1">
            <div class="equipment-category-groups">
                <a :class="{ 'equipment-category-group': true, 'group-active': activeEquipmentGroup === '消防设备' }" v-on:click="changeEquipmentGroup('消防设备')">消防设备</a>
                <a :class="{ 'equipment-category-group': true, 'group-active': activeEquipmentGroup === '安防设备' }" v-on:click="changeEquipmentGroup('安防设备')">安防设备</a>
                <a :class="{ 'equipment-category-group': true, 'group-active': activeEquipmentGroup === '逃生疏散设备' }" v-on:click="changeEquipmentGroup('逃生疏散设备')">逃生疏散设备</a>
            </div>
            <div class="equipment-categorys">
                <a class="equipment-category" v-for="item in equipmentGroupCategoryData" :key="item" v-bind:style="'background-image:url(' + item.img + ')'" v-on:click="intoLayer2(item.code)">
                    {{ item.value }}
                </a>
            </div>
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 2">
            <a class="return-upper-level-btn" v-on:click="intoLayer1()"><<</a>
            <equipmentTypeStats :typeName="activeEquipmentCategory" v-on:onclick="intoLayer3" />
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 3">
            <a class="return-upper-level-btn" v-on:click="intoLayer2(activeEquipmentCategory)"><<</a>
            <equipmentTypeList :type="activeEquipmentType" :owning-system="activeEquipmentCategory" />
        </div>
    </div>
</template>

<script>
import equipmentTypeStats from './equipmentTypeStats';
import equipmentTypeList from './equipmentTypeList';

export default {
    components: {
        equipmentTypeStats,
        equipmentTypeList
    },
    props: {},
    data: () => ({
        equipmentGroupCategoryData: {},

        currentLayerLevel: 1,
        activeEquipmentGroup: '消防设备', //当前激活的 设备分组 TODO 目前是个中文字符串,后面应该要改成字典id
        activeEquipmentCategory: '', //当前激活的 设备分类 TODO 目前是个中文字符串,后面应该要改成字典id
        activeEquipmentType: '', //当前激活的 设备类型 TODO 目前是个中文字符串,后面应该要改成字典id
        group1: {},
        group2: {},
        group3: {}
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
                    { name: '火灾报警系统', code: 'equipSys1', value: res.data.equipSys1, img: require('@/assets/images/cl/huozaibaojing.png') },
                    { name: '消防供水设备', code: 'equipSys9', value: res.data.equipSys9, img: require('@/assets/images/cl/xiaofanggongsui.png') },
                    { name: '喷水灭火系统', code: 'equipSys10', value: res.data.equipSys10, img: require('@/assets/images/cl/pensuimiehuo.png') },
                    // { name: '耐火构件系统', code: 'equipSys3', value: res.data.equipSys3 + res.data.equipSys4 + res.data.equipSys8, img: require('@/assets/images/cl/xiaofanggeishui.png') },
                    { name: '耐火构件系统', code: 'equipSys3', value: res.data.equipSys3, img: require('@/assets/images/cl/xiaofanggeishui.png') },
                    { name: '手提式干粉灭火器', code: 'equipSys5', value: res.data.equipSys5, img: require('@/assets/images/cl/xiaofangmiehuo.png') },
                    { name: '其它', code: '', value: 0, img: require('@/assets/images/cl/qita.png') }
                ];

                _self.group2 = [
                    { name: '安防摄像头', code: 'videoCount', value: res.data.videoCount, img: require('@/assets/images/cl/anfangshexiangtou.png') }
                    // { name: '摄像头B', value: 45445, img: require('@/assets/images/cl/pensuimiehuo.png') }
                ];

                _self.group3 = [
                    { name: '防烟排烟系统', code: 'equipSys6', value: res.data.equipSys6, img: require('@/assets/images/cl/fypyxt.png') },
                    { name: '逃生避难系统', code: 'tsbnxt', value: res.data.tsbnxt, img: require('@/assets/images/cl/tsbnxt.png') },
                    { name: '消防电梯设施', code: 'equipSys11', value: res.data.equipSys11, img: require('@/assets/images/cl/xfdtss.png') }
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
        },
        intoLayer3(type) {
            this.activeEquipmentType = type;
            this.currentLayerLevel = 3;
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
        }
    }
};
</script>

<style lang="scss">
@import './equipmentStats.scss';
</style>
