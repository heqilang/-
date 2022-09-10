<!--
消防力量- 1级
-->
<template>
    <div class="xf-stats-wrapper">
        <div class="stats-layer-container" v-if="currentLayerLevel === 1">
            <fireDept :deptType="activeFireDeptType" v-on:viewDetailOnclick="intoLayer3" v-on:deptTypeChange="handleDeptTypeChange" />
        </div>
        <div class="stats-layer-container" v-if="currentLayerLevel === 2">
            <a class="return-upper-level-btn" v-on:click="intoLayer1(activeFireDeptType)"><<</a>

            <fireGuard :dept="activeFireDept" v-on:viewDetailOnclick="intoLayer3" />
        </div>

        <div class="stats-layer-container" v-if="currentLayerLevel === 3">
            <a class="return-upper-level-btn" v-on:click="intoLayer1(activeFireDept)"><<</a>

            <fireMan :guard="activeFireGuard" />
        </div>
    </div>
</template>

<script>
import fireGuard from './fireGuard';
import fireDept from './fireDept';
import fireMan from './fireMan';

export default {
    components: {
        fireDept,
        fireGuard,
        fireMan
    },
    props: {},
    data: () => ({
        currentLayerLevel: 1,
        activeFireDeptType: '政府专职消防队', //选中的消防组织类型
        activeFireDept: undefined, //选中的消防队列表记录
        activeFireGuard: undefined //选中的消防员列表记录
    }),
    created() {},
    mounted() {
        // this.currentLayerLevel = 2;
    },
    methods: {
        handleDeptTypeChange(fireDeptType) {
            this.activeFireDeptType = fireDeptType;
        },
        intoLayer1(fireDeptType) {
            this.activeFireDeptType = fireDeptType;
            this.currentLayerLevel = 1;
            console.log(11111);
        },
        intoLayer2(fireDept) {
            this.fireDept = fireDept;
            this.currentLayerLevel = 2;
            console.log(22222);
        },
        intoLayer3(fireGuard) {
            this.fireGuard = fireGuard;
            this.currentLayerLevel = 3;
            console.log(this.currentLayerLevel);
        }
    }
};
</script>

<style lang="scss"></style>
