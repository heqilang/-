const equipStateOpt = [
    {
        value: 1,
        label: '正常'
    },
    {
        value: 2,
        label: '故障'
    },
    {
        value: 3,
        label: '离线'
    },
    {
        value: 4,
        label: '预警'
    },
    {
        value: 9,
        label: '火警'
    }
];
const alarmTypeOpt = [
    {
        value: 0,
        label: '无'
    },
    {
        value: 6,
        label: '温度高报'
    },
    {
        value: 7,
        label: '温度低报'
    },
    {
        value: 8,
        label: '压力高报'
    },
    {
        value: 9,
        label: '压力低报'
    },
    {
        value: 10,
        label: '液位高报'
    },
    {
        value: 11,
        label: '液位低报'
    },
    {
        value: 12,
        label: '主电故障'
    },
    {
        value: 13,
        label: '备电故障'
    },
    {
        value: 14,
        label: '总线故障'
    },
    {
        value: 15,
        label: '总线短路'
    },
    {
        value: 16,
        label: '短路'
    },
    {
        value: 17,
        label: '开路'
    },
    {
        value: 18,
        label: '漏电高报'
    },
    {
        value: 19,
        label: '漏电低报'
    },
    {
        value: 20,
        label: '电流高报'
    },
    {
        value: 21,
        label: '电流低报'
    },
    {
        value: 22,
        label: '断线'
    },
    {
        value: 23,
        label: '拆动报警'
    },
    {
        value: 24,
        label: '低电量'
    }
];

export default {
    equipStateOpt: equipStateOpt,
    alarmTypeOpt: alarmTypeOpt
};
