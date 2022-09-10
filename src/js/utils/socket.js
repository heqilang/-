import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
export default {
    mqConnect() {
        // 连接地址
        var ws = new WebSocket('ws://192.168.1.200:15674/ws');
        var client = Stomp.over(ws);
        // 账号密码
        const factory = {
            login: 'test',
            passcode: '123456'
        };

        // 交换器或队列
        const topic = '/exchange/orderPayExchange/goodOrderSuccess';
        // const topic = '/queue/41client'

        // 队列参数
        const conditions = {
            durable: true,
            'x-message-ttl': 1000 * 60
        };

        // 连接与消息接收
        client.connect(
            factory,
            () => {
                client.subscribe(
                    topic,
                    (msg) => {
                        console.log('success msg => ', msg.body);
                    },
                    conditions
                );
                client.send(topic, { 'reply-to': '/temp-queue/foo' }, '我是发送内容');
            },
            (e) => {
                console.log('error => ', e);
            }
        );
    }
};
