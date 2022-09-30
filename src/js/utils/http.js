import axios from 'axios';
import qs from 'qs';
import config from './config';
import storage from '@/js/utils/storage';
import comm from '@/js/utils/common';
import { MessageBox, Loading } from 'element-ui';
import { Message, Notify } from './resetPopup'; //重置弹窗
// axios.defaults.baseURL = config.api;
axios.defaults.withCredentials = false;
const _axios = function (opt) {
    let options = opt.data;
    // 清除空数据和数字类型数据转换
    // options = comm.convertParams(options);
    // if (!opt.isFormData) {
    //     options = comm.convertParams(options);
    // }
    // console.log('5888', storage.LStorage.get('_t'));
    axios.defaults.headers.common['Authorization'] = storage.LStorage.get('_t');
    if (opt.isVideo) {
        axios.defaults.headers.common['Token'] =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidml0YWxvbmciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIxNDMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklkXCI6MTEzLFwiVXNlck5hbWVcIjpcInZpdGFsb25nXCIsXCJSZWFsTmFtZVwiOlwi5aiB54m56b6ZXCIsXCJKb2JOdW1iZXJcIjowLFwiUGhvbmVOdW1iZXJcIjpcIjEyMzU0NTc4OTNcIixcIk1haWxcIjpcIjE5MDcyNzEzQHFxLmNvbVwiLFwiQ3VyckVudGVycHJpc2VJZFwiOjE0MSxcIk1haW5FbnRlcnByaXNlSWRcIjoxNDEsXCJFbnRlcnByaXNlU3RyXCI6bnVsbCxcIkVudGVycHJpc2VOYW1lXCI6bnVsbCxcIklzRGlzcGxheUVxdWlwXCI6dHJ1ZSxcIlNlYXJDaEVudGVycHJpc2VJZFwiOjAsXCJFbnRlcnByaXNlVHlwZVwiOjIsXCJJbmR1c3RyeVwiOjEyLFwiRGVwSWRcIjowLFwiR3JvdXBzSWRcIjoxNDMsXCJUb2tlblN0clwiOm51bGwsXCJIZWFkUG9ydHJhaXRzXCI6XCIvWGF5dGhGaWxlcy9FRmlsZS9JbWFnZS95aHR4LzIwMjEwNDIzMDg1ODEzN2doRTZHLnBuZ1wiLFwiU2lnbkltZ1wiOm51bGwsXCJBcHBVc2VyVHlwZVwiOjAsXCJHdWlkS2V5XCI6XCI5MzRmMDg4ZTg5ZTY0OTQ3OGUzZGY4ZDIyYjg0MjhiOVwifSIsImV4cCI6MTY2MjM2MTc0OSwiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.XVUz8yJu1TDi8lGgPFZcOb5kATalcBKz_AdaiBAirhw';
        // axios.defaults.headers.common['enterpriseid'] = 141;
    }

    if (config.debug) {
        let _debugApi = comm.querystring('debugapi');
        _debugApi && (opt.url = _debugApi + opt.url);
    }

    let tempParams;
    if (opt.isBlob) {
        //设置返回数据为blob
        console.log('kiii', axios.defaults);
        axios.defaults.responseType = 'blob';
    } else {
        axios.defaults.responseType = 'json';
    }
    // 数据提交类型
    if (opt.isBody) {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.put['Content-Type'] = 'application/json';
        axios.defaults.headers.delete['Content-Type'] = 'application/json';
        tempParams = JSON.stringify(options);
    } else {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        tempParams = qs.stringify(options);
    }
    // console.log('56788',storage.LStorage.get('_t'))
    if (opt.type == 'post') {
        return axios.post(opt.url, tempParams);
    } else if (opt.type == 'get') {
        if (opt.isBlob) {
            console.log('blobkkkkk');
            return axios.get(
                opt.url,
                { params: options },
                {
                    responseType: 'blob'
                }
            );
        } else {
            return axios.get(opt.url, { params: options });
        }
    } else if (opt.type == 'put') {
        return axios.put(opt.url, tempParams);
    } else if (opt.type == 'delete') {
        return axios.delete(opt.url, { data: options });
    }
};
/*************参数组成*************/
/* opt = {
    url: '',
    type: '',//列如get
    data: {},//传入参数
    success: function() {},//接口调用成功,status为true
    success_false: function() {},//接口调用成功,status为false
    failure: function() {},//接口调用失败
    isLoading:false //禁止显示loading，为true关闭loading
}*/
export const _http = (opt) => {
    let $Loading;
    if (opt.isLoading) {
        $Loading = Loading.service({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    _axios(opt)
        .then((res) => {
            if (opt.isBlob) {
                opt.success && opt.success(res);
            } else {
                let httpRes = res.data;
                let tempOptions = comm.convertParams(opt.data);
                console.log('');
                console.log('api:', opt.url);
                if (opt.isBody) {
                    console.log('api传入参数：', JSON.stringify(tempOptions));
                } else {
                    console.log('api传入参数：\n', qs.stringify(tempOptions).replace(/=/g, ':').replace(/&/g, '\n'));
                }
                console.log('api返回数据：', httpRes);
                // 接口调用成功,状态为true
                if (httpRes.success || opt.isVideo) {
                    opt.success && opt.success(httpRes);
                } else if (httpRes.code == '403') {
                    // opt.success_false && opt.success_false();
                    // MessageBox.alert('登录超时请重新登录', '系统提示', {
                    //     confirmButtonText: '确定',
                    //     callback: (action) => {
                    //         // 登录超时，退回登录页
                    //         comm.logout(() => {
                    //             location.href = '/';
                    //         });
                    //     },
                    //     beforeClose: (action, instance, done) => {
                    //         //避免重复弹框
                    //         done();
                    //     }
                    // });
                    // 登录超时，退回登录页
                    Message({
                        message: '登录超时请重新登录',
                        type: 'error',
                        duration: 2000
                    });
                    setTimeout(() => {
                        comm.logout(() => {
                            location.href = '/';
                        });
                    }, 3000);
                    opt.success_false && opt.success_false();
                } else if (httpRes.code == '502') {
                    MessageBox.alert('请求错误', '系统提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {}
                    });
                    opt.success_false && opt.success_false();
                } else if (httpRes.code == '500') {
                    MessageBox.alert(httpRes.msg || '网络异常', '系统提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                            comm.logout(() => {
                                location.href = '/';
                            });
                        }
                    });
                    opt.success_false && opt.success_false();
                } else if (httpRes.code == '441') {
                    console.log('httpRes.message->' + httpRes.message);
                    MessageBox.alert(httpRes.msg || '数据验证失败', '系统提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {}
                    });
                    opt.success_false && opt.success_false();
                } else if (httpRes.code == '442') {
                    MessageBox.alert(httpRes.msg || '网络异常', '系统提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {}
                    });
                    opt.success_false && opt.success_false();
                }
                // 接口调用错误提示
                else {
                    if (httpRes.code != '200') {
                        MessageBox.alert(httpRes.msg, '系统提示', {
                            confirmButtonText: '确定',
                            callback: (action) => {}
                        });
                        opt.success_false && opt.success_false();
                    }
                }
                $Loading && $Loading.close();
            }
        })
        .catch((err) => {
            // console.log('接口错误信息------------->', err);
            // let httpResponse = err.response;
            // if (httpResponse && httpResponse.data.code == 442) {
            //     MessageBox.alert(httpResponse.data.msg || '网络异常', '系统提示', {
            //         confirmButtonText: '确定',
            //         callback: (action) => {}
            //     });
            // } else {
            //     MessageBox.alert('网络异常', '系统提示', {
            //         confirmButtonText: '确定',
            //         callback: (action) => {}
            //     });
            // }
            $Loading && $Loading.close();
        });
};
