<template>
    <div id="apps">
        <ul class="steps">
            <li
                v-for="(item, index) in list"
                :key="index"
                :class="{
                    step_pass: item.zt == 1,
                    step_active: item.zt == 2,
                    step_edd: list.length == index + 1
                }"
            >
                <div class="step-line"></div>
                <div :class="{ 'step-content': true, sort: index === list.length - 1 }">
                    <el-tooltip placement="top-start" style="color: white; border: none" popper-class="tip-class">
                        <div class="tip-class" slot="content">
                            <div class="box_content_tip">
                                <div>巡查状态：正常</div>
                                <br />
                                <div>巡查人员：正常</div>
                                <br />
                                <div>巡查时间：</div>
                            </div>
                        </div>

                        <div v-if="!item.show" @mousemove="mouseList(item)" class="step-num_border">
                            <div class="step-num"></div>
                        </div>

                        <div v-else @mouseleave="mouseleft(item)" class="show step-num_border">
                            <div class="step-num"></div>
                        </div>
                    </el-tooltip>

                    <!--      <div class="sub_title">{{ item.name }}</div> -->
                    <div class="step-sub">
                        <!--  <el-timeline>
                <el-timeline-item v-for="ele in item.child" :key="ele.id" :timestamp="ele.rq" placement="top">
                  <el-card style="width: 100%">
                    <h4>{{ ele.name }}</h4>
                    <p style="word-wrap: break-word">{{ ele.nr }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline> -->
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'patroLable',
    components: {},
    data() {
        return {
            list: [
                {
                    id: '1',
                    name: '开始',
                    zt: 1,
                    show: 0,
                    child: [
                        /*  {
                 rq: "2018-03-01",
                 id: "11",
                 nr: "提交",
                 nr: "对方的说法的说法是抗老化反馈啦返回来打手将发生了的减肥了的看是否",
               },
               {
                 rq: "2018-03-01",
                 id: "12",
                 nr: "修改",
                 nr: "对方的说法的说法是抗老化反馈啦返回来打手将发生了的减肥了的看是否",
               },
               {
                 rq: "2018-03-01",
                 id: "13",
                 nr: "提交",
                 nr: "对方的说法的说法是抗老化反馈啦返回来打手将发生了的减肥了的看是否",
               }, */
                    ]
                },
                {
                    id: '2',
                    name: '审核',
                    zt: 2,
                    show: 0,
                    child: [
                        /*    {
                   rq: "2018-03-01",
                   id: "12",
                   nr: "修改",
                   nr: "对方的说法的说法是抗老化反馈啦返回来打手将发生了的减肥了的看是否",
                 },
                 {
                   rq: "2018-03-01",
                   id: "21",
                   nr: "提交",
                   nr: "对方的说法的说法是抗老化反馈啦返回来打手将发生了的减肥了的看是否",
                 }, */
                    ]
                },
                {
                    id: '3',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '4',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '5',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '6',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '7',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '8',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '9',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '10',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '11',
                    name: '完成',
                    zt: 0,
                    show: 0
                },
                {
                    id: '12',
                    name: '完成',
                    zt: 0,
                    show: 0
                }
            ]
        };
    },
    methods: {
        mouseList(val) {
            val.show = 1;
            console.log(val, 8888888);
        },
        mouseleft(val) {
            val.show = 0;
        }
    }
};
</script>

<style lang="scss">
.apps {
    width: 100%;
    height: 100%;
}
.flow_com {
    width: 100%;
    height: 70%;
    /* overflow: auto; */
}

.steps {
    list-style: none;
    display: flex;

    margin-top: 31px;
}

.steps li {
    flex: 1;
    position: relative;
    width: 40px;
}

.step-num {
    display: inline-block;
    height: 30px;
    width: 30px;
    color: #fff;
    background-color: #b9b9b9;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    border: 2px solid rgba(224, 224, 224, 1);

    width: 16px;
    height: 16px;
    background: #5c88a7;
    opacity: 1;
    line-height: 16px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
}

.step_active .step-num {
    background-color: #e55050;
}

.step_pass .step-num {
    background-color: #56b754;
}

/* .step-num:after {
    content: "";
    width: 90%;
    height: 5px;
    background-color: #e0e0e0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 10px;
    margin-left: 6%;
  } */

.step_edd .step-num:after {
    display: none;
}

.step_pass .step-num:after {
    background-color: #56b754;
}

.step-sub {
    width: 90%;
    position: absolute;
    left: 50%;
}

.step_active .step-num_border {
    background-color: #e55050;
}

.step_pass .step-num_border {
    background-color: #56b754;
}

.step-num_border {
    display: inline-block;
    height: 40px;
    width: 40px;
    color: #fff;
    background-color: #b9b9b9;

    border-radius: 50%;
    text-align: center;
    border: none;
    width: 18px;
    height: 18px;
    background: #5c88a7;
    opacity: 1;

    position: relative;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999 !important;
}

.step-num_border:after {
    /*   content: "";
    width: 525%;
    height: 5px;
    background-color: #e0e0e0;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 20%);
    position: absolute;
    top: 7px;
    margin-left: 52%; */
}

.step-content:after {
    content: '';
    width: 84%;
    height: 5px;
    background-color: #5c88a7;

    position: absolute;
    top: 12px;
    margin-left: 24%;
}

.step_pass .step-num:after {
    background-color: #56b754;
}

.step_pass .step-content:after {
    background-color: #56b754;
}

/* .step_pass .step-num:after {
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #f3862d;
    position: relative;
    top: 50px;
    left: 50px;
  
  } */

.step-content {
    height: 30px;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    margin: auto;
}

.show {
    width: 20px;
    height: 20px;
}

.show .step-num {
    width: 18px;
    height: 18px;
}

.sort:after {
    display: none !important;
}

/* [x-placement^='A'] A指的是el-tooltip标签中的placement的值，此处是bottom。猜测用于动态设置border-A-color。*/

.el-tooltip__popper {
    background: #3e5e99 !important;
    width: 242px;
    height: 80px;
}
.el-tooltip__popper[x-placement^='top'] .popper__arrow:after {
    border-top-color: #3e5e99 !important;
}
.box_content_tip {
    margin-top: 20px;
    margin: auto;
}
</style>
