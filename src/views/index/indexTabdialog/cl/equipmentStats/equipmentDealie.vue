<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div>
            <ul>
                <li>更新时间：{{ activeDealie.lastUpdatetime }}</li>
                <li>
                    设备状态：<span :style="{ color: activeDealie.equipmentState == 1 ? '#29f329d4' : '' }"> {{ activeDealie.newEquipmentState }} </span>
                </li>
                <li>设备名称：{{ activeDealie.equipmentName }}</li>
                <li>设备类型： {{ activeDealie.lookup.equipmentType }}</li>
                <li>所属系统： {{ activeDealie.owningSystem }}</li>
                <li>安装位置：{{ activeDealie.lookup.building + activeDealie.lookup.floor }}</li>
                <li>详细地址：{{ activeDealie.address }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        activeDealie: {
            //设备详情数据
            required: true
        }
    },
    data: () => ({
        pager: {
            pageSize: 5,
            pageIndex: 1,
            total: 0
        },
        dataTable: [],
        searchModel: {
            fhfq: '',
            installSite: undefined
        }
    }),
    created() {
        if (this.activeDealie.equipmentState == 1) {
            this.activeDealie.newEquipmentState = '正常';
            // 1正常  2故障  3离线  4预警  9火警）
        } else if (this.activeDealie.equipmentState == 2) {
            this.activeDealie.newEquipmentState = '故障';
        } else if (this.activeDealie.equipmentState == 3) {
            this.activeDealie.newEquipmentState = '离线';
        } else if (this.activeDealie.equipmentState == 4) {
            this.activeDealie.newEquipmentState = '预警';
        } else if (this.activeDealie.equipmentState == 9) {
            this.activeDealie.newEquipmentState = '火警）';
        }
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
@import './equipmentTypeList.scss';

.equipment-type-list-wrapper {
    li {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
    }
}
</style>
