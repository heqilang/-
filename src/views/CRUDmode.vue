<!--
 * @Author:  HHQ
 * @Date: 2022-05-26 15:56:38
 * @LastEditTime: 2022-06-06 10:45:42
 * @LastEditors: HHQ
 * @Description: ComponentS简介
 * 改动内容：
-->
<template>
    <div>
        <div class="searchTop" id="searchTop">
            <el-row>
                <el-col :span="6">
                    <el-col :span="6" class="text_r">系统名称：</el-col>
                    <el-col :span="18">
                        <el-input class="w250 mar-r-18" v-model="search.dictValue" placeholder="请输入设备系统名称"></el-input>
                    </el-col>
                </el-col>
                <el-col class="mar-t-18">
                    <el-button class="btn-search w100 mar-r-18" type="primary" @click="clearSearch">重置</el-button>
                    <el-button class="btn-search w100 mar-r-18" type="primary" @click="getListSearch"><i class="iconfont iconsousuo"></i>查询</el-button>
                    <el-button class="btn-add w100 mar-r-18" type="primary" @click="showDrawerFn"><i class="iconfont icontianjia-"></i>添加</el-button>
                </el-col>
            </el-row>
        </div>
        <el-card class="mainPageTable mar-t-18" id="mainPageTable">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="70" label="序号" fixed="left" :index="indexMethod" align="center"></el-table-column>
                <el-table-column align="center" prop="dictValue" label="设备系统名称"></el-table-column>
                <el-table-column align="center" prop="dictCode" label="系统编码"></el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text_c mar-t-18">
                <!-- 分页 -->
                <customPagination v-if="pager.total !== 0" :paginationData="pager" @getList="getList"></customPagination>
            </div>
        </el-card>
        <el-drawer append-to-body :title="drawerTitle" size="58%" modal wrapperClosable :visible.sync="showDrawer" direction="rtl" :before-close="handleDrawerClose">
            <div class="drawer-formBox">
                <el-form ref="form" :model="form" label-width="138px" :rules="formRules">
                    <el-form-item label="系统名称" prop="dictValue">
                        <el-input v-model="form.dictValue" placeholder="请输入字典名称" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="系统编码" prop="dictCode">
                        <el-input v-model="form.dictCode" placeholder="请输入字典名称" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onFormSubmit">提交</el-button>
                        <el-button @click="closeDrawer">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: {
                dictValue: ''
            },
            tableData: [],
            form: {
                id: '',
                dictValue: '',
                dictCode: ''
            },
            formRules: {
                dictValue: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
                dictCode: [{ required: true, message: '请选择系统编码', trigger: 'blur' }]
            },
            drawerTitle: '',
            showDrawer: false,
            pager: {
                pageSize: 10,
                pageIndex: 1,
                total: null
            },
            value: '',
            input: ''
        };
    },
    methods: {
        getListSearch() {
            this.pager.pageIndex = 1;
            this.pager.pageSize = 10;
            this.getList();
        },
        clearSearch() {
            this.search = {
                dictValue: ''
            };
        },
        clearFormInfo() {
            this.form = {
                id: '',
                dictValue: '',
                dictCode: ''
            };
        },
        handleChangeState(row) {
            let _self = this;
            _self._http({
                url: '/api/admin/gateway/updateState',
                type: 'put',
                isBody: true,
                data: {
                    ids: row.id,
                    state: row.state == '01' ? '09' : '01'
                },
                success: function (res) {
                    _self.getList();
                }
            });
        },
        closeDrawer() {
            this.$refs.form.resetFields();
            this.showDrawer = false;
        },
        onFormSubmit() {
            console.log('submit!');
            let _self = this;
            _self.$refs['form'].validate((valid) => {
                if (valid) {
                    _self._http({
                        url: _self.form.id ? '/api/admin/equipmentSystem/update' : '/api/admin/equipmentSystem/add',
                        type: _self.form.id ? 'put' : 'post',
                        isBody: true,
                        data: _self.form,
                        success: function (res) {
                            _self.getList();
                            _self.closeDrawer();
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleDelete(row) {
            let _self = this;
            _self
                .$confirm('此操作将永久删除设备系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    console.log(123);
                    _self._http({
                        url: '/api/admin/equipmentSystem/remove/' + row.id,
                        type: 'delete',
                        success: function (res) {
                            _self.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _self.getList();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        handleEdit(row) {
            this.drawerTitle = '编辑设备系统';
            this.clearFormInfo();

            //将scope.row与this.form中的字段匹配
            for (let key in this.form) {
                if (row.hasOwnProperty(key)) {
                    this.form[key] = row[key];
                }
            }
            this.showDrawer = true;
        },
        showDrawerFn() {
            this.drawerTitle = '添加设备系统';
            this.clearFormInfo();
            this.showDrawer = true;
        },
        handleDrawerClose() {
            this.closeDrawer();
        },
        getList() {
            let _self = this;
            _self.loading = true;
            let searchObj = {
                size: _self.pager.pageSize,
                current: _self.pager.pageIndex,
                ..._self.search
            };
            for (let key in searchObj) {
                if (searchObj[key] == '') {
                    delete searchObj[key];
                }
            }
            searchObj['dictValue.symbol'] = 'LIKE';
            _self._http({
                url: '/api/admin/equipmentSystem/find',
                type: 'get',
                isBody: true,
                data: searchObj,
                success: function (res) {
                    _self.tableData = res.data.records;
                    _self.pager.total = res.data.total;
                    _self.loading = false;
                }
            });
        },
        // 序号方法
        indexMethod(index) {
            let _self = this;
            if (_self.pager.pageIndex * _self.pager.pageSize > _self.totalCount) {
                let tempIndex = index + 1 + _self.pager.pageSize * (_self.pager.pageIndex - 1);
                if (tempIndex < _self.totalCount) {
                    return tempIndex;
                } else {
                    return _self.totalCount;
                }
            } else {
                return index + 1 + _self.pager.pageSize * (_self.pager.pageIndex - 1);
            }
        },
        initPage() {
            // 获取Id为searchTop元素高度
            let searchTop = document.getElementById('searchTop');
            let searchTopHeight = searchTop.offsetHeight;
            console.log(searchTopHeight);
            // 设置id元素mainPageTable的最小高度
            let mainPageTable = document.getElementById('mainPageTable');
            mainPageTable.style.minHeight = 'calc(100% - ' + (20 + Number(searchTopHeight)) + 'px)';
            this.getList();
        }
    },
    created() {},
    mounted() {
        this.initPage();
    }
};
</script>
<style lang="scss"></style>
