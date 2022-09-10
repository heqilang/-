<!--
巡查情况-巡查次数统计
-->

<template>
    <div
        :class="{
            'xf-indicator': true,
            'xf-indicator-cs': type === 'cs',
            'xf-indicator-active': active,
            'xf-indicator-active-clickable': hasOnClick
        }"
        v-on:click="onClick"
    >
        <div class="xf-indicator-title">
            <span>{{ title }}</span>
        </div>
        <div class="xf-indicator-body">
            <span>{{ num }}</span>
            <span>{{ unit }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            required: false,
            default: 'normal'
        },
        active: {
            required: false,
            default: false
        },
        title: {
            required: true
        },
        num: {
            required: true
        },
        unit: {
            required: false
        }
    },
    data: () => ({}),
    created() {},
    mounted() {},
    computed: {
        hasOnClick() {
            return this.$listeners && this.$listeners.onclick;
        }
    },
    methods: {
        onClick() {
            this.$emit('onclick');
        }
    }
};
</script>

<style lang="scss">
@import './XfIndicator.scss';
</style>
