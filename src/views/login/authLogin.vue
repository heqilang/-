<template>
    <div></div>
</template>
<script>
export default {
    data() {
        return {
            loading: ''
        };
    },
    methods: {
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
    },
    created() {},
    mounted() {
        let _self = this;
        _self.loading = _self.$loading({
            lock: true,
            text: '授权登录中，请稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        //判断window.location.href里面是否含有code字符串
        if (window.location.href.indexOf('code') != -1) {
            let fullPathCode = window.location.href.split('/')[3].slice(1).split('=')[1];
            fullPathCode = fullPathCode.slice(0, fullPathCode.length - 1);
            console.log(fullPathCode);
            _self._http({
                url: '/api/auth/user/login',
                type: 'post',
                isBody: true,
                data: {
                    code: fullPathCode,
                    loginType: '03',
                    appid: 'nuNhQDuo'
                },
                success: function (res) {
                    // 登录成功
                    _self._storage.LStorage.set('_t', res.data.token);
                    _self._storage.LStorage.set('_UserInfo', res.data);
                    setTimeout(() => {
                        _self.getMenuList();
                    }, 500);
                },
                success_false: function (res) {
                    _self.loading.close();
                    return falsle;
                }
            });
        } else {
            window.open('http://118.122.86.19:9080/oauth/authorize?client_id=nuNhQDuo&response_type=code&scope=read&redirect_uri=https%3A%2F%2Fhqzx.csin.net.cn%2F%23%2FauthLogin', '_self');
        }
    }
};
</script>
<style lang="scss"></style>
