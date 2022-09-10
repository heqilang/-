<!--
 * @Author:  HHQ
 * @Date: 2022-06-08 10:26:27
 * @LastEditTime: 2022-06-08 10:50:31
 * @LastEditors: HHQ
 * @Description: ComponentS简介
 * 改动内容：
-->
<!-- 导航菜单，使用根路由展示菜单高亮 -->
<template>
    <div class="nav-menu-con">
        {{ $route.path }}
        <el-menu :default-active="$route.path" background-color="#01122b" active-text-color="red" :class="['b-p3', 'el-menu-vertical-demo']" :unique-opened="true" :collapse="collapse" router>
            <menu-item :menuListView="menuList" :indexParent="'1'"></menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    props: {
        menuList: Array
    },
    data() {
        return {
            collapse: false
        };
    },
    mounted() {
        let _self = this;
    },
    methods: {},
    components: {
        'menu-item': require('./navMenuItem')
    }
};
</script>
<style lang="scss">
.nav-menu-con {
    /*.el-menu-vertical-demo {
        overflow: hidden;

        [slot="title"],
        .el-submenu__icon-arrow {
            display: none;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 230px;
        min-height: 400px;

        [slot="title"],
        .el-submenu__icon-arrow {
            display: inline;
        }
    }*/
}
</style>
