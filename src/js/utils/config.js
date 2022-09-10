/*
 * @Author:  HHQ
 * @Date: 2022-05-26 10:06:15
 * @LastEditTime: 2022-06-01 10:29:35
 * @LastEditors: HHQ
 * @Description: ComponentS简介
 * 改动内容：
 */
export default {
    apiTimeout: 30000,
    tokenAge: 10 * 24 * 60 * 60 * 1000, //token失效时间
    url: '',
    gaodeMapKey: '5f3ff65611d2ad9722a59b11ab8d52a6',
    api: 'http://118.114.172.18:26188', //测试环境
    mqttApi: 'wss://mqtt.vitalong.cn:10443',
    // api: "http://172.16.7.71:180", //正式环境1api
    // api: 'http://172.16.7.72:180', //正式环境2api
    debug: true
};
