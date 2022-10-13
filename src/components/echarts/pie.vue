<template>
    <div style="height: 100%; margin-top: 30px">
        <div style="height: 100%" id="lineChar_1"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    props: ['charRadio'],
    data() {
        return {
            checkData: [],
            chartNew: ''
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
                _yData.push(this.checkData[i].nowScore);
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
                    axisPointer: {
                        type: 'line', // 指示器类型（'line' 直线指示器；'shadow' 阴影指示器；'none' 无指示器；'cross' 十字准星指示器。）
                        snap: false, // 坐标轴指示器是否自动吸附到点上。默认自动判断。
                        lineStyle: {
                            color: '#EF6F38',
                            type: 'solid',
                            width: 2
                        }
                    },

                    extraCssText: 'z-index: 2;',

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
                        s += `消防安全运行综合评分:  <span  class='textColor'   >${val[0].data}分</span> `;
                        return s;
                    }
                },
                color: ['#2BADFF'],
                legend: {
                    icon: 'circle',
                    orient: 'rect',
                    selectedMode: false,
                    x: 'right', //可设定图例在左、右、居中
                    padding: [20, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    itemWidth: 14, //图标宽
                    itemHeight: 12, //图标高
                    itemGap: 10, //间距

                    data: ['综合评分'],
                    textStyle: {
                        fontSize: '12px',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        color: '#fff',
                        rich: {
                            a: {
                                verticalAlign: 'middle'
                            }
                        },
                        lineHeight: 12,
                        padding: [0, 10, -4, 5]
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontFamily: 'PingFang SC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: '#FFFFFF'
                        },
                        formatter: function (params) {
                            return params.slice(5, 10);
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
                            fontSize: '12px',
                            fontFamily: ' PingFang SC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: ' #FFFFFF'
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
                            color: ['#999999'],
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
                        /*  symbolSize:5, */
                        //   symbol:'circle',
                        symbolSize: 5,
                        //  smooth: true, //面积图改成弧形状
                        //   showSymbol: false, //去除面积图节点圆
                        showSymbol: true, //是否默认展示圆点
                        // symbol: 'circle',     //设定为实心点
                        //  symbolSize: 5,   //设定实心点的大小 */

                        /*    itemStyle: {
                            normal: {
                                color: '#2BADFF', //拐点颜色
                                borderColor: '#2BADFF', //拐点边框颜色
                                borderWidth: 3 //拐点边框大小
                            },
                            emphasis: {
                                 // 鼠标移上去的时候，拐点的颜色和样式
                                color: '#FFF' ,//hover拐点颜色定义
                                borderColor: '#FFFFFF99', //图形的描边颜色
                                borderWidth: 5, // 描边的线宽
                                shadowBlur: 10, // 图形的阴影大小
                                shadowColor: '#FFFFFF99' // 图形的阴影颜色
                            }
                        }, */

                        lineStyle: {
                            // 设置线条的style等

                            normal: {
                                color: '#2BADFF', //折线线条颜色:
                                width: 3 // 描边的线宽//
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）

                            normal: {
                                color: '#2BADFF', // 折线线条颜色:
                                //  color: '#1E3453FF', //拐点颜色
                                borderColor: '#2BADFF', //拐点边框颜色
                                borderWidth: 2 //拐点边框大小
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#2563EB00'
                                    },
                                    {
                                        offset: 1,
                                        color: '#3EB0FF4D'
                                    }
                                ])
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);

            setTimeout(() => {
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0, // 针对series下第几个数据
                    dataIndex: _yData.length - 1 // 第几个数据
                });
            }, 500); // 这里跟图例一样显示最后一条数据的tooltip，chart有一个默认1s时长的渲染动画，执行到末端正好1s，所以设置定时器延时1s
            console.log('pxpxpx1', option);
            this.chartNew = myChart;
        },
        getMin() {
            let _self = this;
            // 清空id的innerHTML
            // document.getElementById('lineChart3').innerHTML = '';
            _self._http({
                //  url: '/api/web/indexCountV3/countPatrolMinute',//迪威数据
                url: '/api/web/indexCountV3/getScoreTrend',
                data: { timeType: 'DAY' },
                //  url: '/api/web/indexCountTwo/countPatrolMinute',/api/web/indexCountTwo/countAlarmByFloor
                type: 'get',
                data: { timeType: 'DAY' },
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
                url: '/api/web/indexCountV3/getScoreTrend',
                data: { timeType: 'MONTH' },
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
                _yData.push(this.checkData[i].nowScore ? this.checkData[i].nowScore : '');
                _yData_1.push(this.checkData[i].oldScore ? this.checkData[i].oldScore : '');
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
                    axisPointer: {
                        type: 'line', // 指示器类型（'line' 直线指示器；'shadow' 阴影指示器；'none' 无指示器；'cross' 十字准星指示器。）
                        snap: false, // 坐标轴指示器是否自动吸附到点上。默认自动判断。
                        lineStyle: {
                            color: '#EF6F38',
                            type: 'solid',
                            width: 2
                        }
                    },
                    extraCssText: 'z-index: 2;',
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
                        s += `当月消防安全运行综合评分:  <span  class='textColor'   >${val[0].data ? val[0].data : 0}分</span><br/> `;
                        s += `上月消防安全运行综合评分:  <span  class='textColor'   >${val[1].data ? val[1].data : 0}分</span> `;

                        return s;
                    }
                },

                legend: {
                    icon: 'circle',
                    orient: 'horizontal',
                    selectedMode: false,
                    x: 'right', //可设定图例在左、右、居中
                    padding: [22, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    data: ['当月', '上月'],
                    textStyle: {
                        fontSize: '12px',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        color: '#fff',
                        rich: {
                            a: {
                                verticalAlign: 'middle'
                            }
                        },
                        lineHeight: 12,
                        padding: [0, 4, -4, -2]
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontFamily: 'PingFang SC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: '#FFFFFF'
                        },
                        formatter: function (params) {
                            return params.slice(5, 10);
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
                            fontSize: '12px',
                            fontFamily: ' PingFang SC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: ' #FFFFFF'
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
                            color: ['#999999'],
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
                        symbolSize: 5,
                        data: _yData,
                        type: 'line',
                        //   smooth: true, //面积图改成弧形状
                        //  showSymbol: false, //去除面积图节点圆
                        /*  itemStyle: {
                            normal: {
                                color: '#2BADFF', //拐点颜色
                                borderColor: '#2BADFF', //拐点边框颜色
                                borderWidth: 3 //拐点边框大小
                            },
                            emphasis: {
                                 // 鼠标移上去的时候，拐点的颜色和样式
                                color: '#FFF' ,//hover拐点颜色定义
                                borderColor: '#FFFFFF99', //图形的描边颜色
                                borderWidth: 5, // 描边的线宽
                                shadowBlur: 10, // 图形的阴影大小
                                shadowColor: '#FFFFFF99' // 图形的阴影颜色
                            }
                        }, */
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#2BADFF', // 折线线条颜色:
                                width: 3 // 描边的线宽
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#2BADFF', // 折线线条颜色:
                                width: 3 // 描边的线宽
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#2563EB00'
                                    },
                                    {
                                        offset: 1,
                                        color: '#3EB0FF4D'
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: '上月',

                        data: _yData_1,
                        type: 'line',
                        symbolSize: 5,
                        //  smooth: true, //面积图改成弧形状
                        //   showSymbol: false, //去除面积图节点圆
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#F5773F ', // 折线线条颜色:
                                width: 3 // 描边的线宽
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#F5773F', // 折线线条颜色:
                                width: 3 // 描边的线宽
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

            setTimeout(() => {
                console.log('执行了吗');
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0, // 针对series下第几个数据
                    dataIndex: new Date().getDate() - 2 // 第几个数据
                });
            }, 500); // 这里跟图例一样显示最后一条数据的tooltip，chart有一个默认1s时长的渲染动画，执行到末端正好1s，所以设置定时器延时1s
            console.log('pxpxpx1', option);
        },

        getYear() {
            let _self = this;
            // 清空id的innerHTML
            // document.getElementById('lineChart3').innerHTML = '';
            _self._http({
                //  url: '/api/web/indexCountV3/countPatrolMinute',//迪威数据
                url: '/api/web/indexCountV3/getScoreTrend',
                data: { timeType: 'YEAR' },
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

                _yData.push(this.checkData[i].nowScore ? this.checkData[i].nowScore : '');

                _yData_1.push(this.checkData[i].oldScore ? this.checkData[i].oldScore : '');
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
                    extraCssText: 'z-index: 2;',
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
                        s += `当年消防安全运行综合评分:  <span  class='textColor'   >${val[0].data ? val[0].data : 0}分</span> <br/>`;
                        s += `上一年消防安全运行综合评分:  <span  class='textColor'   >${val[1].data ? val[1].data : 0}分</span> `;
                        return s;
                    },
                    axisPointer: {
                        type: 'line', // 指示器类型（'line' 直线指示器；'shadow' 阴影指示器；'none' 无指示器；'cross' 十字准星指示器。）
                        snap: false, // 坐标轴指示器是否自动吸附到点上。默认自动判断。
                        lineStyle: {
                            color: '#EF6F38',
                            type: 'solid',
                            width: 2
                        }
                    }
                },

                legend: {
                    icon: 'circle',
                    orient: 'horizontal',
                    selectedMode: false,
                    x: 'right', //可设定图例在左、右、居中
                    padding: [22, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    data: ['当年', '上一年'],
                    textStyle: {
                        fontSize: '12px',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        color: '#fff',
                        rich: {
                            a: {
                                verticalAlign: 'middle'
                            }
                        },
                        lineHeight: 12,
                        padding: [0, 4, -4, -2]
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,

                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontFamily: 'PingFang SC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: '#FFFFFF'
                        },
                        formatter: function (params) {
                            return params;
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
                            fontSize: '12px',
                            fontFamily: ' PingFang SC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: ' #FFFFFF'
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
                            color: ['#999999'],
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
                        symbolSize: 5,
                        data: _yData,
                        type: 'line',
                        //   smooth: true, //面积图改成弧形状
                        //  showSymbol: false, //去除面积图节点圆
                        /*    itemStyle: {
                            normal: {
                                color: '#2BADFF', //拐点颜色
                                borderColor: '#2BADFF', //拐点边框颜色
                                borderWidth: 3 //拐点边框大小
                            },
                            emphasis: {
                                 // 鼠标移上去的时候，拐点的颜色和样式
                                color: '#FFF' ,//hover拐点颜色定义
                                borderColor: '#FFFFFF99', //图形的描边颜色
                                borderWidth: 5, // 描边的线宽
                                shadowBlur: 10, // 图形的阴影大小
                                shadowColor: '#FFFFFF99' // 图形的阴影颜色
                            }
                        }, */
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#2BADFF' // 折线线条颜色:
                            }
                        },
                        itemStyle: {
                            // 设置线条上点的颜色（和图例的颜色）
                            normal: {
                                color: '#2BADFF' // 折线线条颜色:
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#2563EB00'
                                    },
                                    {
                                        offset: 1,
                                        color: '#3EB0FF4D'
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: '上一年',
                        symbolSize: 5,
                        data: _yData_1,
                        type: 'line',
                        //    smooth: true, //面积图改成弧形状
                        //showSymbol: false, //去除面积图节点圆
                        lineStyle: {
                            // 设置线条的style等
                            normal: {
                                color: '#F5773F ', // 折线线条颜色:
                                width: 3 // 描边的线宽
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

            setTimeout(() => {
                console.log('执行了吗', new Date().getMonth());

                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0, // 针对series下第几个数据
                    dataIndex: new Date().getMonth() - 1 // 第几个数据
                });
            }, 500);
        }
    },
    created() {
        this.getMin();
    },
    mounted() {},
    beforeDestory() {
        if (!this.chartNew) return; //页面销毁钩子销毁chart释放资源
        this.chartNew.dispose();
        this.chartNew = null;
    }
};
</script>

<style lang="scss">
.a {
    border-right: 2px dashed #ccc;
}

#lineChar_1 {
    //  background: linear-gradient(180deg, #1e2e41 0%, #234676 100%);
}
</style>
