<template>
    <div class="login-container-out b-p text_c">
        <div class="loginBoxCon">
            <el-row class="height100">
                <el-col class="height100" :span="12">`</el-col>
                <el-col class="height100 text_c" :span="12">
                    <div>
                        <div style="color: #333; font-size: 22px; font-weight: bold; margin-bottom: 50px">环球中心消防安全管理平台</div>
                        <div style="margin: 20px 0; text-align: left; color: #aeaeae">Hi，请使用账号密码登录</div>
                        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px">
                            <el-form-item prop="userName">
                                <el-input type="text" v-model="loginForm.loginName" auto-complete="off" placeholder="账号"></el-input>
                            </el-form-item>
                            <el-form-item prop="userPwd">
                                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
                            </el-form-item>
                            <el-form-item style="width: 100%; margin-top: 50px">
                                <el-button style="background-color: #2563eb !important; width: 100%; color: #fff" :plain="true" type="primary" @click.native.prevent="handleSubmit">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <div class="bgimg"></div>
            <h3 class="title">管理员登录</h3>
            <el-form-item prop="userName">
                <el-input type="text" v-model="loginForm.loginName" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
           <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width: 100%; margin-top: 50px">
                <el-button :plain="true" type="primary" style="width: 100%" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form> -->
    </div>
</template>
<script>
// import { requestLogin } from '../../api/api';
export default {
    data() {
        return {
            logining: '',
            loginForm: {
                loginName: '',
                password: '',
                loginType: '01'
            },
            rules: {
                loginName: [
                    {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
            checked: true
        };
    },
    mounted() {
        let _self = this;
    },
    methods: {
        handleSubmit() {
            // 如果输入框没有东西，就不能让他调用api，前端弹出提示框
            console.log('输入账号密码');
            if (this._data.loginForm.loginName == '' || this._data.loginForm.password == '') {
                this.$message.error('请输入完整的账号或密码');
            } else {
                let _self = this;

                /*    _self._storage.LStorage.remove('_t'); */
                // return false
                _self.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        _self.loading = _self.$loading({
                            lock: true,
                            text: '登录中，请稍等...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        /*         _self._http({
                                    url: '', //可以传入自己项目中登录url
                                    type: 'post',
                                    isBody: true,
                                    data: _self.loginForm,
                                    success: function (res) {
                                        // 登录成功
                                        _self._storage.LStorage.set('_t', res.data.token);
                                        _self._storage.LStorage.set('_UserInfo', res.data);
                                        setTimeout(() => {
                                            _self.getMenuList();
                                        }, 500);
                                        // _self.$router.push({ path: '/index' });
                                    },
                                    success_false: function (res) {
                                        _self.loading.close();
                                        return falsle;
                                    }
                                }); */
                        _self._storage.LStorage.set('_t', '我是假的token');
                        console.log('这里吗');
                        _self.$router.push({ path: '/index' });
                        setTimeout(() => {
                            _self.loading.close();
                            //  _self.getMenuList();
                        }, 500);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        getMenuList() {
            let _self = this;
            console.log(_self._storage.LStorage.get('_t'));
            // return false;
            // let _self = this;
            _self._http({
                url: '/api/auth/module/findUserModules',
                type: 'get',
                success: function (res) {
                    _self._storage.LStorage.set('_menu', res.data);
                    if (res.data.length == 0) {
                        _self.$message({
                            message: '您没有权限，请联系管理员',
                            type: 'error'
                        });
                        return false;
                    }
                    if (res.data[0].children.length > 0) {
                        _self.$router.push({ path: res.data[0].children[0].moduleUrl });
                    } else {
                        _self.$router.push({ path: res.data[0].moduleUrl });
                    }
                    setTimeout(() => {
                        _self.loading.close();
                    }, 1000);
                    // _self.$router.push({ path: '/index' });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-container-out {
    width: 100%;
    height: 100%;
    min-width: 1366px;
    min-height: 700px;
    // margin-left: 1000px;
    background-image: url('../../assets/images/login/loginBG.png');
    background-size: 100% 100%;
    position: relative;

    .loginBoxCon {
        width: 860px;
        height: 512px;
        border-radius: 6px;
        opacity: 1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url('../../assets/images/login/loginsBG.png');
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-color: #fff;
    }

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        // margin: 0 auto;
        width: 270px;
        height: 300px;
        padding: 0px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        // box-shadow: 0 0 12px #cac6c6;
        margin-left: 50%;

        .bgimg {
            width: 150px;
            height: 25px;
            background-color: #bfa;
            margin: 0 auto 10px;
        }

        .title {
            margin: 0px auto 20px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
}
</style>
