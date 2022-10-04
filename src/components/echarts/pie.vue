<template>
    <div>
        <div style="height: 244px" id="lineChar_1"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    props: ['charRadio'],
    data() {
        return {
            checkData: []
        };
    },

    watch: {
        charRadio: function (val) {
            echarts.init(document.getElementById('lineChar_1')).dispose();
            console.log(val);
            if (val == 'MONTH') {
                this.getMonth();
            }
            if (val == 'min') {
                this.getMin();
            }
            if (val == 'YEAR') {
                this.getYear();
            }
        }
    },

    methods: {
        drawLineChart2() {
            var chartDom = document.getElementById('lineChar_1');
            var myChart = echarts.init(chartDom);
            var option;
            // dellData
            // average: 166
            // everyDay: "2022-09-01"
            let _xData = [];
            let _yData = [];
            for (let i = 0; i < this.checkData.length; i++) {
                _xData.push(this.checkData[i].everyDay);
                _yData.push(this.checkData[i].average);
            }

            /*     function formatData(arr) {
                    let newHashArray = [];
                    for (var i = 0; i < arr.length; i++) {
                        let obj = {};
                        let temp = arr[i];
                        if (arr[i] > 0 && arr[i] < 50) {
                            arr[i] = 0 + arr[i] * (500 / 50);
                        } else if (arr[i] > 50 && arr[i] < 300) {
                            arr[i] = 500 + (arr[i] - 50) * ((1000 - 500) / (300 - 50));
                        } else if (arr[i] > 300 && arr[i] < 900) {
                            arr[i] = 1000 + (arr[i] - 300) * ((1500 - 1000) / (900 - 300));
                        } else if (arr[i] > 900 && arr[i] < 2100) {
                            arr[i] = 1500 + (arr[i] - 900) * ((2000 - 1500) / (2100 - 900));
                        }
                        obj.value = arr[i];
                        obj.formatV = temp;
                        newHashArray.push(obj);
                    }
                    return newHashArray;
                }
    
                let wxArray = formatData(_yData); */
            console.dir(_yData);

            option = {
                title: {
                    textStyle: {
                        fontSize: '14',
                        color: '#ffffff'
                    }
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#1F7093', //设置背景颜色
                    color: '#fff',
                    borderWidth: '0', //边框宽度设置1
                    borderColor: 'gray', //设置边框颜色
                    textStyle: {
                        color: '#fff' //设置文字颜色
                    },
                    formatter: function (val) {
                        console.dir(val);
                        var s = '';
                        s += '查询时间:' + val[0].axisValue + '<br/>';
                        s += '消防安全运行综合评分:' + val[0].data;
                        return s;
                    }
                },

                legend: {
                    icon: 'circle',
                    orient: 'rect',
                    selectedMode: false,
                    x: 'right', //可设定图例在左、右、居中
                    padding: [20, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    data: ['综合评分'],
                    textStyle: {
                        fontSize: '12px',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        color: '#fff'
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,

                        textStyle: {
                            color: '#FFFFFF'
                        },
                        formatter: function (params) {
                            return params.slice(8, 10);
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    type: 'value',

                    /*      min: 0,
                         max: 2000,
                         splitNumber: 5, */

                    axisLabel: {
                        formatter: '{value}',
                        type: 'log',

                        /*     formatter: (v, i) => {
                                let item = '';
                                if (i === 0) {
                                    item = '0';
                                } else if (i == 1) {
                                    item = '50';
                                } else if (i == 2) {
                                    item = '300';
                                } else if (i == 3) {
                                    item = '900';
                                } else if (i == 4) {
                                    item = '2100';
                                }
                                return item;
                            }, */
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
                    /*   min: 0,
max: 60,
interval: 20 */
                },
                series: [
                    {
                        name: '综合评分',

                        data: _yData,
                        type: 'line',
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#56AFF9' // 折线线条颜色:
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#56AFF9' // 折线线条颜色:
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#053457'
                                    },
                                    {
                                        offset: 1,
                                        color: '#005695 '
                                    }
                                ])
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        getMin() {
            let _self = this;
            // 清空id的innerHTML
            // document.getElementById('lineChart3').innerHTML = '';
            _self._http({
                //  url: '/api/web/indexCountV3/countPatrolMinute',//迪威数据
                url: '/api/web/indexCountV3/countPatrolManageMinute',
                //  url: '/api/web/indexCountTwo/countPatrolMinute',/api/web/indexCountTwo/countAlarmByFloor
                type: 'get',
                success: function (res) {
                    console.dir(res);
                    res.data.forEach((item) => {
                        item.everyDay = item.timeName;
                    });

                    _self.checkData = res.data;
                    _self.drawLineChart2();
                }
            });
        },

        getMonth() {
            let _self = this;
            // 清空id的innerHTML
            // document.getElementById('lineChart3').innerHTML = '';
            _self._http({
                //  url: '/api/web/indexCountV3/countPatrolMinute',//迪威数据
                url: '/api/web/indexCountV3/countPatrolManageMinute',
                //  url: '/api/web/indexCountTwo/countPatrolMinute',/api/web/indexCountTwo/countAlarmByFloor
                type: 'get',
                success: function (res) {
                    console.dir(res);
                    res.data.forEach((item) => {
                        item.everyDay = item.timeName;
                    });

                    _self.checkData = res.data;
                    _self.drawLineChartMonth();
                }
            });
        },

        drawLineChartMonth() {
            var chartDom = document.getElementById('lineChar_1');
            var myChart = echarts.init(chartDom);
            var option;
            let _xData = [];
            let _yData = [];
            let _yData_1 = [];
            for (let i = 0; i < this.checkData.length; i++) {
                _xData.push(this.checkData[i].everyDay);
                _yData.push(this.checkData[i].average);
                _yData_1.push(this.checkData[i].average + 10);
            }
            console.dir(_yData);
            option = {
                title: {
                    textStyle: {
                        fontSize: '14',
                        color: '#ffffff'
                    }
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#1F7093', //设置背景颜色
                    color: '#fff',
                    borderWidth: '0', //边框宽度设置1
                    borderColor: 'gray', //设置边框颜色
                    textStyle: {
                        color: '#fff' //设置文字颜色
                    },
                    formatter: function (val) {
                        console.dir(val);
                        var s = '';
                        s += '查询时间:' + val[0].axisValue + '<br/>';
                        s += '当月消防安全运行综合评分:' + val[0].data + '<br/>';
                        s += '上月消防安全运行综合评分:' + val[1].data;
                        return s;
                    }
                },

                legend: {
                    icon: 'circle',
                    orient: 'horizontal',
                    selectedMode: false,
                    x: 'right', //可设定图例在左、右、居中
                    padding: [20, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    data: ['当月', '上月'],
                    textStyle: {
                        fontSize: '12px',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        color: '#fff'
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,

                        textStyle: {
                            color: '#FFFFFF'
                        },
                        formatter: function (params) {
                            return params.slice(8, 10);
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}',
                        type: 'log',
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
                    /*   min: 0,
max: 60,
interval: 20 */
                },
                series: [
                    {
                        name: '当月',

                        data: _yData,
                        type: 'line',
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#56AFF9' // 折线线条颜色:
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#56AFF9' // 折线线条颜色:
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#03253E '
                                    },
                                    {
                                        offset: 1,
                                        color: '#005695 '
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: '上月',

                        data: _yData_1,
                        type: 'line',
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#F5773F ' // 折线线条颜色:
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#F5773F' // 折线线条颜色:
                            }
                        }
                        /*    areaStyle: {
                           normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#053457'
                                    },
                                    {
                                        offset: 1,
                                        color: '#005695 '
                                    }
                                ])
                            } 
                        } */
                    }
                ]
            };
            option && myChart.setOption(option);
        },

        getYear() {
            let _self = this;
            // 清空id的innerHTML
            // document.getElementById('lineChart3').innerHTML = '';
            _self._http({
                //  url: '/api/web/indexCountV3/countPatrolMinute',//迪威数据
                url: '/api/web/indexCountV3/countPatrolManageMinute',
                //  url: '/api/web/indexCountTwo/countPatrolMinute',/api/web/indexCountTwo/countAlarmByFloor
                type: 'get',
                success: function (res) {
                    console.dir(res);
                    res.data.forEach((item) => {
                        item.everyDay = item.timeName;
                    });

                    _self.checkData = res.data;
                    _self.drawLineChartYear();
                }
            });
        },
        drawLineChartYear() {
            var chartDom = document.getElementById('lineChar_1');
            var myChart = echarts.init(chartDom);
            var option;
            let _xData = [];
            let _yData = [];
            let _yData_1 = [];
            for (let i = 0; i < this.checkData.length; i++) {
                _xData.push(this.checkData[i].everyDay);
                _yData.push(this.checkData[i].average);
                _yData_1.push(this.checkData[i].average + 20);
            }
            console.dir(_yData);
            option = {
                title: {
                    textStyle: {
                        fontSize: '14',
                        color: '#ffffff'
                    }
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#1F7093', //设置背景颜色
                    color: '#fff',

                    borderWidth: '0', //边框宽度设置1
                    borderColor: 'gray', //设置边框颜色
                    textStyle: {
                        color: '#fff' //设置文字颜色
                    },
                    formatter: function (val) {
                        console.dir(val);
                        var s = '';
                        s += '查询时间:' + val[0].axisValue + '<br/>';
                        s += '当年消防安全运行综合评分:' + val[0].data + '<br/>';
                        s += '上一年消防安全运行综合评分:' + (val[1] ? val[1].data : 0);
                        return s;
                    }
                },

                legend: {
                    icon: 'circle',
                    orient: 'horizontal',
                    selectedMode: false,
                    x: 'right', //可设定图例在左、右、居中
                    padding: [20, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    data: ['当年', '上一年'],
                    textStyle: {
                        fontSize: '12px',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        color: '#fff'
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,

                        textStyle: {
                            color: '#FFFFFF'
                        },
                        formatter: function (params) {
                            return params.slice(8, 10);
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    data: _xData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}',
                        type: 'log',
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BBF6FF00',
                            width: 2
                        },
                        symbol: ['none', 'arrow']
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#BBF6FF'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
                    /*   min: 0,
max: 60,
interval: 20 */
                },
                series: [
                    {
                        name: '当年',

                        data: _yData,
                        type: 'line',
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#56AFF9' // 折线线条颜色:
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#56AFF9' // 折线线条颜色:
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#053457'
                                    },
                                    {
                                        offset: 1,
                                        color: '#005695 '
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: '上一年',

                        data: _yData_1,
                        type: 'line',
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#F5773F ' // 折线线条颜色:
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#F5773F' // 折线线条颜色:
                            }
                        }
                        /*        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#053457'
                                    },
                                    {
                                        offset: 1,
                                        color: '#005695 '
                                    }
                                ])
                            } 
                        } */
                    }
                ]
            };
            option && myChart.setOption(option);
        }
    },
    created() {
        this.getMin();
    },
    mounted() {}
};
</script>

<style lang="scss">
.a {
    border-right: 2px dashed #ccc;
}
#lineChar_1 {
    background: linear-gradient(180deg, #1e2e41 0%, #234676 100%);
}
</style>
