<template>
    <div class="menu-dev">
        <!-- 报警弹窗不显示报警弹窗菜单 -->
        <template v-for="(menuObj, index) in menuListView">
            <el-submenu :index="indexParent + index" v-if="menuObj.children && menuObj.children.length > 0">
                <template slot="title">
                    <i :class="['iconfont mar-r-12 fs-20 iconjiantou']"></i>
                    <span slot="title">{{ menuObj.moduleName }}</span>
                </template>
                <!-- 存在子菜单时，继续添加 -->
                <nav-menu-item :menuListView="menuObj.children" :indexParent="indexParent + index"></nav-menu-item>
            </el-submenu>
            <!-- .split('/')[1] -->
            <el-menu-item :index="menuObj.moduleUrl.split('/')[1]" :route="{ path: menuObj.moduleUrl }" v-else>
                <i :class="['iconfont mar-r-12 fs-20 iconjiantou']"></i>
                <span slot="title">{{ menuObj.moduleName }}</span>
            </el-menu-item>
        </template>
    </div>
</template>
<script>
export default {
    name: 'navMenuItem',
    props: {
        menuListView: Array,
        indexParent: String
    },
    data() {
        return {};
    },
    mounted() {
        let _self = this;
    },
    methods: {},
    components: {}
};
</script>
<style lang="scss">
.el-submenu__title {
    span {
        color: #fff;
    }
}
</style>
