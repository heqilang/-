import _storage from '@/js/utils/storage';
import _config from '@/js/utils/config';
import _comm from '@/js/utils/common';
import mqtt from 'mqtt';
import store from '../../vuex/store';
class mqttFn {
    /**
     * @description input
     * @Author      HHQ
     * @DateTime    2019-12-16
     * @param       {[type]}   initSubscribeParams [链接成功时，初始订阅参数]
     * @return      {[type]}                   [description]
     */
    constructor(initSubscribeParams) {
        let _self = this;
        _self._mqttStatus = ''; //数据返回时，状态改变
        _self._mqttRes = {}; //返回数据对象
        _self.subscribeFn = _self.subscribe; //主题订阅方法
        _self.sendFn = _self.send; //发送消息

        const MQTT_SERVICE = _config.mqttApi + '/mqtt';
        const options = {
            connectTimeout: 5000,
            clientId: _comm.getUUID(),
            // clientId: '2',
            username: 'vitalong',
            password: 'vitalong@2019',
            clean: true
        };
        /*console.log('options------>',options)
        console.log('MQTT_SERVICE--->',MQTT_SERVICE)*/
        // 获取链接对象
        _self.client = mqtt.connect(MQTT_SERVICE, options);
        // mqtt连接
        _self.client.on('connect', (e) => {
            console.log('连接成功:', e);
            if (initSubscribeParams && initSubscribeParams.url) {
                _self.subscribe(initSubscribeParams.url, initSubscribeParams.params, initSubscribeParams.callback);
            }
        });
        // 接收消息处理
        _self.client.on('message', (topic, message) => {
            message = message.toString();
            console.log('收到来自', topic, '的消息', message);
            console.log('收到时间：', new Date().Format('yyyy-MM-dd hh:mm:ss'));
            _self._mqttStatus = _comm.getUUID();
            _self._mqttRes = { topic, message };
            // 随机数
            let random = Math.random();
            store.commit('setAlarmEquipInfo', message + '&' + random);
            console.log(store.state.alarmEquipInfo);
        });
        // 断开发起重连
        _self.client.on('reconnect', (error) => {
            console.log('正在重连:', error);
        });
        // 链接异常处理
        _self.client.on('error', (error) => {
            console.log('连接失败:', error);
        });
    }
    /**
     * @description 主题订阅
     * @Author      HHQ
     * @DateTime    2019-12-17
     * @param       {[type]}   url      [订阅url]
     * @param       {[type]}   params   [订阅时传入参数]
     * @param       {Function} callback [订阅成功后回调函数]
     * @return      {[type]}            [description]
     */
    subscribe(url, params, callback) {
        let _self = this;
        _self.client.subscribe(url, params, (error) => {
            if (!error) {
                console.log('订阅成功>url:', url, '\n参数：', params);
                callback && callback();
            } else {
                console.log('订阅失败>', url, params);
            }
        });
    }
    /**
     * @description 发送消息
     * @Author      HHQ
     * @DateTime    2019-12-17
     * @param       {[type]}   url    [description]
     * @param       {[type]}   params [description]
     * @return      {[type]}          [description]
     */
    send(url, params, callback) {
        let _self = this;
        console.log('发布消息>url:', url, '\n参数：', params);
        _self.client.publish(url, params, null, callback);
    }
}

export default mqttFn;
