<template>
    <p class="page-container c-p2 mar-t-18 fs-20 text_c">
        页面未找到，
        <el-link type="primary" class="fs-20" @click="goToLogin">点击重新登录</el-link>
    </p>
</template>
<script>
export default {
    methods: {
        goToLogin() {
            let _self = this;
            _self._comm.logout(() => {
                location.href = '/';
            });
        }
    }
};
</script>
