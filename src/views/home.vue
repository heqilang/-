<template>
    <div class="homeContainerBox">
        <div class="header" :style="'height:' + headerH + 'px'">
            <el-row class="height100" v-if="$route.path != '/index'">
                <el-col :span="4" class="text_l height100">
                    <img style="height: 88%; vertical-align: middle; margin-left: 70px" src="../assets/images/hqzx_logo.png" />
                </el-col>
                <el-col :span="16" class="text_c height100 sysTitle"> 消防安全管理平台 </el-col>
                <el-col :span="4" style="box-sizing: border-box; padding-right: 10px" class="text_r height100">
                    <el-button style="background-color: #086ed9; border-color: #086ed9; color: #fff" @click="updatePwd">修改密码</el-button>
                    <el-button style="background-color: #f2414f; border-color: transparent; color: #fff" @click="logout">退出</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="mainBox" :style="'height: calc(100% - ' + headerH + 'px)'">
            <el-col :style="'width:' + asideWidth + 'px'" :span="3" class="asideMenu">
                <!-- <el-scrollbar class="width100 height100">
                    <el-menu :default-active="$route.path" :class="['el-menu-vertical-demo', 'b-p']" unique-opened router :StaticEnableDefaultPopOutImage="false">
                        <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
                            <el-submenu :index="index + ''" :class="item.hideArrow && 'hide-arrow'">
                                <template slot="title">
                                    <router-link :to="item.redirect" class="block width100 height100 c-w"><i :class="item.iconCls"></i>{{ item.title }}</router-link>
                                </template>
                                <el-menu-item class="c-w" v-for="(child, key) in item.children" :index="child.path.replace(':dt', child.param || '')" :key="key" v-if="!child.hidden"><i class="el-icon-arrow-right"></i>{{ child.title }}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-scrollbar> -->
                <el-scrollbar :class="['b-p3 height100']">
                    <el-menu active-text-color="#086ed9" :default-active="$route.path" :class="['el-menu-vertical-demo', 'b-p']" unique-opened router @select="handleselect">
                        <template v-for="(item, index) in menuList" v-if="!item.hidden">
                            <el-submenu :index="index + ''" :class="item.children.length == 0 && 'hide-arrow'">
                                <template slot="title">
                                    <router-link :to="item.moduleUrl == '/' ? '' : item.moduleUrl" class="block width100 height100 c-w"><img style="width: 15px; margin-right: 6px" :src="require('../assets/images/menuIcon' + (item.moduleUrl == '/' ? '/' + item.moduleName + '.png' : item.moduleUrl + '.png'))" alt="" />{{ item.moduleName }}</router-link>
                                </template>
                                <el-menu-item class="c-w" v-for="(child, key) in item.children" :index="child.moduleUrl" :key="key" v-if="!child.hidden"><i class="el-icon-arrow-right"></i>{{ child.moduleName }}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </el-col>
            <el-col :style="'width: calc(100% - ' + asideWidth + 'px)'" :span="21" class="height100">
                <router-tab class="height100"></router-tab>
                <div class="alarmHomeBox" :style="hideAlarm ? 'bottom:-381px' : 'bottom:0px'">
                    <div style="height: 50px" class="text_r">
                        <i v-if="hideAlarm" @click="hideAlarm = !hideAlarm" class="showAlarmIco el-icon-arrow-up"></i>
                        <i v-else @click="hideAlarm = !hideAlarm" class="showAlarmIco el-icon-arrow-down"></i>
                    </div>
                    <component :is="require('@/components/alarmWindow')"></component>
                </div>
                <div class="chekPostDia" v-if="showCheckPost">
                    <div style="font-size: 22px; font-weight: 700; margin-top: 136px">查岗</div>
                    <div style="margin: 12px 0">剩余倒计时</div>
                    <div style="font-size: 36px; color: #f5503c; font-weight: 700">{{ checkTime }}</div>
                    <div class="checkPostBtn" @click="confirmCheckPost">在岗</div>
                    <div class="mhPic"></div>
                </div>
            </el-col>
        </div>
        <div v-if="$route.path == '/index'" class="clopsMenu" :style="'left:' + asideWidth + 'px'">
            <!-- <i class="el-icon-s-fold" @click="showMenus"></i> -->
        </div>

        <el-dialog :modal-append-to-body="false" title="修改密码" :visible.sync="dialogFormVisibleResetPwd" :close-on-click-modal="false" class="unit-edit-con" :destroy-on-close="true" :before-close="closeDialog">
            <el-form :model="dataFormResetPwd" :rules="valiRulesResetPwd" ref="dataFormResetPwd">
                <el-form-item label="原密码" :label-width="formLabelWidth" prop="OldPassword">
                    <el-input type="password" v-model="dataFormResetPwd.OldPassword" autoComplete="off" placeholder="请输入密码" clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="NewPassword">
                    <el-input type="password" v-model="dataFormResetPwd.NewPassword" autoComplete="off" placeholder="请输入密码" clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="passwordAgainForm">
                    <el-input type="password" v-model="dataFormResetPwd.passwordAgainForm" autoComplete="off" placeholder="请确认密码" clearable show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ResetcloDialog('dataFormResetPwd', true)"> <i class="el-icon-circle-close fs-14"></i> 取消 </el-button>
                <el-button type="primary" @click="submitForm('dataFormResetPwd')"> <i class="el-icon-success fs-14"></i> 确定 </el-button>
            </div>
        </el-dialog>
        <div class="alarmVideoCon" v-if="showVideoAlarm">
            <div class="closeIcon">
                <i @click="showVideoAlarm = false" style="font-size: 30px; cursor: pointer" class="el-icon-circle-close"></i>
            </div>
            <component @closeVideoAlarm="showVideoAlarm = false" :equipInfo="alarmVideoInfo" :is="require('@/components/alarmVideo')"></component>
        </div>
    </div>
</template>
<script>
import mqttFn from '@/js/utils/mqtt';
import mqtt from 'mqtt';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
export default {
    data() {
        return {
            showVideoAlarm: false,
            showCheckPost: false,
            menuList: [],
            hideAlarm: true,
            isCollapse: false,
            //header高度
            headerH: 60,
            asideWidth: 238,
            dialogFormVisibleResetPwd: false,
            formLabelWidth: '120px',
            dataFormResetPwd: {
                OldPassword: '',
                NewPassword: '',
                passwordAgainForm: ''
            },
            valiRulesResetPwd: {
                OldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
                NewPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                passwordAgainForm: [
                    { required: true, message: '请确认密码', trigger: 'blur' }
                    // { validator: pwdAgainValidatorResetPwd, trigger: 'change' }
                ]
            },
            client: {},
            mqttRes: '',
            checkPostInfo: '',
            checkTime: '',
            alarmVideoInfo: ''
        };
    },
    methods: {
        socketCon(token, userId) {
            let _self = this;
            console.log(token, userId);
            var socket = new SockJS('https://hqzx.csin.net.cn//websocket/stomp');
            var stompClient = Stomp.over(socket);
            var headers = { Authorization: token };
            stompClient.connect(headers, function (frame) {
                // setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.subscribe('/user/' + userId + '/message', function (greeting) {
                    console.log('消息信息', JSON.parse(greeting.body));
                    _self.showCheckPostDia(JSON.parse(greeting.body));
                });
            });
        },
        confirmCheckPost() {
            let _self = this;
            _self._http({
                url: '/api/web/webCheckRecord/conform',
                type: 'post',
                isBody: true,
                success: function (res) {
                    _self.showCheckPost = false;
                }
            });
        },
        showCheckPostDia(data) {
            let _self = this;
            _self.showCheckPost = true;
            _self.checkPostInfo = data;
            // effective
            let num = data.effective;
            let timer = setInterval(() => {
                if (num == 0) {
                    console.log('clear');
                    clearInterval(timer);
                    _self.showCheckPost = false;
                }
                if (num < 10) {
                    var str = '00:00:0' + num;
                } else {
                    var str = '00:00:' + num;
                }

                _self.checkTime = str;
                num--;
            }, 1000);

            console.log(data);
        },
        //连接服务器
        connectMqtt() {
            let options = {
                username: 'qianduan',
                password:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidml0YWxvbmciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIxNDMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklkXCI6MTEzLFwiVXNlck5hbWVcIjpcInZpdGFsb25nXCIsXCJSZWFsTmFtZVwiOlwi5aiB54m56b6ZXCIsXCJKb2JOdW1iZXJcIjowLFwiUGhvbmVOdW1iZXJcIjpcIjEyMzU0NTc4OTNcIixcIk1haWxcIjpcIjE5MDcyNzEzQHFxLmNvbVwiLFwiQ3VyckVudGVycHJpc2VJZFwiOjE0MSxcIk1haW5FbnRlcnByaXNlSWRcIjoxNDEsXCJFbnRlcnByaXNlU3RyXCI6bnVsbCxcIkVudGVycHJpc2VOYW1lXCI6bnVsbCxcIklzRGlzcGxheUVxdWlwXCI6dHJ1ZSxcIlNlYXJDaEVudGVycHJpc2VJZFwiOjAsXCJFbnRlcnByaXNlVHlwZVwiOjIsXCJJbmR1c3RyeVwiOjEyLFwiRGVwSWRcIjowLFwiR3JvdXBzSWRcIjoxNDMsXCJUb2tlblN0clwiOm51bGwsXCJIZWFkUG9ydHJhaXRzXCI6XCIvWGF5dGhGaWxlcy9FRmlsZS9JbWFnZS95aHR4LzIwMjEwNDIzMDg1ODEzN2doRTZHLnBuZ1wiLFwiU2lnbkltZ1wiOm51bGwsXCJBcHBVc2VyVHlwZVwiOjAsXCJHdWlkS2V5XCI6XCJmNjQ3OWI3Mzc2OWQ0MjI5ODk0OTU2NDJkNDI1ZjY2MlwifSIsImV4cCI6MTY1ODg4Njg4OSwiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.s3ZE-A9aQxPIcfZ7ETslPgLnJR-_PnnqBGOsAVeSTDo',
                cleanSession: false,
                keepAlive: 60,
                clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
                connectTimeout: 4000
            };
            this.client = mqtt.connect('ws://39.99.139.201:8083/mqtt', options);
            this.client.on('connect', (e) => {
                // console.log('成功连接服务器:', e);
                //订阅三个名叫'top/#', 'three/#'和'#'的主题
                // this.client.subscribe(['top/#', 'three/#', '#'], { qos: 1 }, (err) => {
                //     if (!err) {
                //         console.log('订阅成功');
                //         //向主题叫“pubtop”发布一则内容为'hello,this is a nice day!'的消息
                //         this.publish('pubtop', 'hello,this is a nice day!');
                //     } else {
                //         console.log('消息订阅失败！');
                //     }
                // });
            });
            //重新连接
            this.reconnect();
            //是否已经断开连接
            this.mqttError();
            //监听获取信息
            this.getMessage();
        },
        reconnect() {
            this.client.on('reconnect', (error) => {
                console.log('正在重连:', error);
            });
        },
        mqttError() {
            this.client.on('error', (error) => {
                console.log('连接失败：', error);
                this.client.end();
            });
        },
        getMessage() {
            this.client.on('message', (topic, message) => {
                if (message) {
                    console.log('收到来着', topic, '的信息', message.toString());
                    const res = JSON.parse(message.toString());
                    //console.log(res, 'res')
                    switch (topic) {
                        case 'top/#':
                            this.msg = res;
                            break;
                        case 'three/#':
                            this.msg = res;
                            break;
                        case 'three/#':
                            this.msg = res;
                            break;
                        default:
                            return;
                            this.msg = res;
                    }
                    this.msg = message;
                }
            });
        },
        showMenus() {
            if (this.asideWidth == 238) {
                this.asideWidth = 0;
                this.headerH = 0;
            } else {
                // this.headerH = 60;
                this.asideWidth = 238;
            }
        },
        handleselect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        //退出登录
        logout: function () {
            let _self = this;
            _self
                .$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                })
                .then(() => {
                    _self._http({
                        url: '/api/auth/user/logout',
                        type: 'post',
                        isBody: true,
                        success: function (res) {
                            //清理所有localstorage
                            // localStorage.clear();
                            _self._storage.LStorage.clean();
                            _self._comm.logout(() => {
                                _self.$router.push('/login');
                            });
                        }
                    });
                });
        },
        closeDialog(done) {
            this.dataFormResetPwd = {
                OldPassword: '',
                NewPassword: '',
                passwordAgainForm: ''
            };
            this.fileList = [];
            done && done();
        },
        updatePwd() {
            this.dialogFormVisibleResetPwd = true;
        },
        resetForm(formName, isClose) {
            let _self = this;
            if (_self.$refs[formName]) {
                _self.$refs[formName].resetFields();
                _self.closeDialog();
                if (formName == 'dataFormResetPwd') {
                    if (isClose) {
                        _self.dialogFormVisibleResetPwd = false;
                    }
                } else {
                    if (isClose) {
                        _self.dialogFormVisible = false;
                    }
                }
            }
        },
        // submitForm(formName) {
        //     let _self = this;
        //     _self.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             // 修改密码
        //             _self.resetPwdFn();
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        submitForm(formName) {
            let _self = this;
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_self.dataFormResetPwd.NewPassword !== _self.dataFormResetPwd.passwordAgainForm) {
                        _self.$message.error('两次密码不一致');
                        return;
                    } else {
                        _self._http({
                            url: '/api/auth/user/updatePassword',
                            type: 'put',
                            isBody: true,
                            data: {
                                password: _self.dataFormResetPwd.NewPassword,
                                ids: _self._storage.LStorage.get('_UserInfo').id
                            },
                            success: function (res) {
                                _self.$message('密码修改成功，即将重新登录');
                                _self.ResetcloDialog();

                                setTimeout(() => {
                                    _self._storage.LStorage.clean();
                                    _self._comm.logout(() => {
                                        _self.$router.push('/login');
                                    });
                                }, 2000);
                            }

                            // storage.LStorage.clean();
                            // _self._comm.logout(() => {
                            //     _self.$router.push('/login');
                            // });
                        });
                    }
                    this.dialogFormVisibleResetPwd = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        ResetcloDialog() {
            //重置表单验证
            this.dialogFormVisibleResetPwd = false;
            this.$refs.dataFormResetPwd.resetFields();
        },
        getMenuList() {
            let _self = this;
            console.log(_self._storage.LStorage.get('_t'));
            _self._http({
                url: '/api/auth/module/findUserModules',
                type: 'get',
                success: function (res) {
                    _self.menuList = res.data;
                }
            });
            // _self._http({
            //     url: '/api/web/webEquipmentVideo/findByEquipId',
            //     type: 'get',
            //     data: {
            //         equipId: '7459a9ef94d3872e476e3d2f3c9498da'
            //     },
            //     success: function (res) {
            //     }
            // });
        },
        getAlarmType() {
            let _self = this;
            _self._http({
                url: '/api/web/webEquipment/find',
                type: 'get',
                data: {
                    id: _self.$store.state.alarmEquipInfo.split('&')[0],
                    transform: 'F:floor,B:building'
                },
                success: function (res) {
                    console.log('8998765', res);
                    if (res.data.records[0].equipmentState == 9) {
                        _self.alarmVideoInfo = res.data.records[0];
                        _self.showVideoAlarm = true;
                    }
                }
            });
        }
    },
    created() {},
    mounted() {
        // console.log(this.$store.commit('INCREMENT'))
        // console.log(this.$store.getters.getCount)
        let _self = this;
        this.getMenuList();
        // this.connectMqtt();
        if (this.$route.path == '/index' || this.$route.path == '/shouYe') {
            this.asideWidth = 0;
            this.headerH = 0;
            document.querySelectorAll('.router-tab-header')[0].style.height = '0';
            document.querySelectorAll('.router-tab-header')[0].style.overflow = 'hidden';
            document.querySelectorAll('.router-tab-container')[0].style.padding = '0';
        } else {
            this.asideWidth = 238;
            this.headerH = 60;
            document.querySelectorAll('.router-tab-header')[0].style.height = '53px';
            document.querySelectorAll('.router-tab-header')[0].style.overflow = 'hidden';
            document.querySelectorAll('.router-tab-container')[0].style.padding = '12px';
        }
        console.log(this._storage.LStorage.get('_UserInfo'));

        let mqtt = new mqttFn();
        mqtt.subscribe('webapp/topic/alarm/' + _self._storage.LStorage.get('_UserInfo').orgId + '/#', function (msg) {
            console.log(msg);
        });
        // socket.checkPostsocket(_self._storage.LStorage.get('_t'),_self._storage.LStorage.get('_UserInfo').orgId);
        // let checkPost = new mqttFn();
        // checkPost.subscribe('/user/' + _self._storage.LStorage.get('_UserInfo').id + '/message', function (msg) {
        //     console.log(msg);
        // });
        this.socketCon(_self._storage.LStorage.get('_t'), _self._storage.LStorage.get('_UserInfo').id);
        console.log(mqtt._mqttRes);
    },
    watch: {
        '$store.state.alarmEquipInfo'() {
            this.hideAlarm = false;
            this.getAlarmType();
            console.log('watch收到推送消息');
        },
        $route(to, from) {
            if (to.path == '/index') {
                this.asideWidth = 0;
                this.headerH = 0;
                document.querySelectorAll('.router-tab-header')[0].style.height = '0';
                document.querySelectorAll('.router-tab-header')[0].style.overflow = 'hidden';
                document.querySelectorAll('.router-tab-container')[0].style.padding = '0';
            } else {
                this.asideWidth = 238;
                this.headerH = 60;
                document.querySelectorAll('.router-tab-header')[0].style.height = '53px';
                document.querySelectorAll('.router-tab-header')[0].style.overflow = 'hidden';
                document.querySelectorAll('.router-tab-container')[0].style.padding = '12px';
            }
        }
    }
};
</script>
<style lang="scss">
.homeContainerBox {
    position: relative;

    .alarmVideoCon {
        width: 460px;
        // height: 500px;
        background-color: #4a4f5b;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        z-index: 99999;

        .closeIcon {
            position: absolute;
            width: 20px;
            height: 20px;
            color: #fff;
            // background-color: #fff;
            right: 20px;
            top: 10px;
            z-index: 99;
        }
    }

    .chekPostDia {
        position: absolute;
        z-index: 999;
        width: 360px;
        height: 360px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        background-image: url('../assets/images/forrest-2.jpg');
        background-size: 100% auto;
        background-repeat: no-repeat;
        //阴影
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        text-align: center;

        .checkPostBtn {
            margin-top: 20px;
            width: 60%;
            margin-left: 20%;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            background-color: orange;
            //渐变背景色
            background: linear-gradient(to bottom, #fdae42, #f78726);
            color: #fff;
            cursor: pointer;
            font-size: 16px;
        }

        .mhPic {
            position: absolute;
            height: 130px;
            width: 130px;
            background-image: url('../assets/images/forrest-1.png');
            background-size: 100% 100%;
            top: -65px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .showAlarmIco {
        color: #fff;
        font-weight: bold;
        background-color: #ed3a3a;
        padding: 9px 10px;
        font-size: 30px;
        cursor: pointer;
        border-radius: 10px;
    }

    .clopsMenu {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 0.7rem;

        i {
            font-size: 0.28rem;
            cursor: pointer;
            color: #fff;
        }
    }

    width: 100%;
    height: 100%;
    min-width: 1366px;
    // background-color: pink;
    overflow: hidden;

    .header {
        background-color: #01122b;
        color: #fff;
        line-height: 60px;

        .sysTitle {
            font-size: 28px;
        }

        transition: all 0.2s linear;
    }

    .mainBox {
        transition: all 0.2s linear;

        .asideMenu {
            height: 100%;
            background-color: #01122b;
            transition: all 0.2s linear;
        }

        .router-tab-container {
            padding: 12px;
            box-sizing: border-box;
        }

        .el-menu {
            border-right: none;
        }

        .el-menu--inline {
            background-color: #01122b;
        }

        .el-menu-item {
            color: #fff !important;
        }

        .el-menu-item:hover,
        .el-menu-item:focus {
            background-color: #01122b !important;
        }

        // .is-active {
        //     color: #086ed9 !important;
        // }
        .el-submenu:hover,
        .el-menu--inline .el-submenu:hover {
            background-color: rgba(99, 99, 99, 0.3) !important;
        }

        .el-submenu__title:hover,
        .el-menu--inline .el-submenu:hover {
            background-color: rgba(99, 99, 99, 0.3) !important;
        }

        .router-tab-header {
            height: initial;
            border-bottom: initial;

            .router-tab-nav {
                height: 100%;
            }

            .router-tab-item {
                height: 100%;
                // line-height: 48px;
                border-radius: 3px;
                /* margin-right: 5px;
            margin-top: 5px; */
                margin: 10px 5px 10px 0;

                .tab-icon {
                    display: none;
                }
            }

            .nav-prev,
            .nav-next,
            .nav-next:hover,
            .nav-prev:hover {
                background-color: #ebe1d8;
                // border-color: #e84d5a;
            }

            .nav-next,
            .nav-prev {
                // padding-top: 30px;
            }
        }

        .router-tab-scroll {
            background-color: #f5f7fa;
            padding: 0 10px;
            // background-color: rgba(234, 235, 240, 1);
        }

        .router-tab-item {
            // background-color: #01122b;
            background-color: #1f2b3c1d;
            border-color: transparent;

            color: #01122b;

            .tab-close {
                // position: initial;
                // color: #67452F;
                // background-color: rgba(167, 172, 186, 1);
                top: -4px;
                right: -10px;
                border-radius: 2px;
                // vertical-align: middle;
                margin-left: 18px;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAElBMVEUAAAD///////////////////8+Uq06AAAABnRSTlMAMODmgGDCpqsuAAAAKklEQVQI12NAA44MDCJASkiAURFIMSoKCYBEhQ0ZoBRUEKEkkIFBFM0MAGCVAlS4n94EAAAAAElFTkSuQmCC);
            }
        }

        .el-scrollbar__view,
        .nav-menu-con {
            height: 100%;
        }

        .router-tab-item:not(.actived).contextmenu,
        .router-tab-item:not(.actived):hover {
            background-color: #01122b;
            border-color: transparent;
            color: #fff;
        }

        .router-tab-item.actived {
            // background-color: #1f2b3c1d;
            background-color: #01122b;
            border-color: transparent;
            color: #fff;

            .tab-close {
                background-image: url(data:/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAD1BMVEUAAACKioqHh4eHh4eHh4ckdXKMAAAABXRSTlMAMOKAYO4XA80AAAAqSURBVAjXY0ADhgwMwkBKSIBREUgxKgoJMIC4QA6EggoilDgyMIigmQEAVU8CEFHyN0cAAAAASUVORK5CYII=);
            }
        }
    }

    .hide-arrow .el-icon-arrow-down:before {
        display: none;
    }

    .app-main {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 230px;
        height: 100%;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }

    .alarmHomeBox {
        width: 580px;
        height: 430px;
        position: absolute;
        z-index: 10000000;
        right: 10px;
        transition: all 0.3s ease;
    }
}
</style>
