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
                <div :class="{ 'step-content': true, sort: index === list.length - 1 }" @click="getPost(item)">
                    <el-tooltip placement="top-start" style="color: white; border: none" popper-class="tip-class">
                        <div class="tip-class" slot="content">
                            <div class="box_content_tip">
                                <div>巡查状态：{{ item.status }}</div>
                                <br />
                                <div>巡查人员：{{ item.inspectPerson }}</div>
                                <br />
                                <div>巡查时间：{{ item.beginTime }}</div>
                            </div>
                        </div>
                        <div v-if="!item.show" @mousemove="mouseList(item)" class="step-num_border">
                            <div class="step-num">
                                <img width="100%" :src="item.img" alt="" />
                            </div>
                        </div>

                        <div v-else @mouseleave="mouseleft(item)" class="show step-num_border">
                            <div class="step-num">
                                <img width="100%" :src="item.hoverImg" alt="" />
                            </div>
                        </div>
                    </el-tooltip>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'patroLable',
    props: ['chlidList', 'pointName', 'time'],
    data() {
        return {
            list: []
        };
    },
    mounted() {
        console.dir(this.chlidList);
        let that = this;
        this.list = this.chlidList.map((item, index) => {
            let time = ['02:00:00', '04:00:00', '06:00:00', '08:00:00', '10:00:00', '12:00:00', '14:00:00', '16:00:00', '18:00:00', '20:00:00', '22:00:00', '23:59:59'];
            return {
                id: item.id,
                name: item.inspectPerson,
                zt: item.status, //等于1 正常色 等于2 灰色 等于三 红的
                show: 0,
                inspectPerson: item.inspectPerson,
                beginTime: item.beginTime,
                pointName: that.pointName,
                status: item.status == 1 ? '正常巡查' : item.status == 2 ? '未巡查' : '未开始巡查',
                img: item.status == 1 ? require('../../../../../assets/patroLableImg/green.png') : item.status == 2 ? require('../../../../../assets/patroLableImg/red.png') : require('../../../../../assets/patroLableImg/grey.png'),
                hoverImg: item.status == 1 ? require('../../../../../assets/patroLableImg/green_1.png') : item.status == 2 ? require('../../../../../assets/patroLableImg/red_1.png') : require('../../../../../assets/patroLableImg/grey_1.png'),
                endTime: that.time + ' ' + time[index],
                sendTime: item.sendTime || that.time + ' ' + time[index]
            };
        });
    },
    methods: {
        mouseList(val) {
            val.show = 1;
        },
        mouseleft(val) {
            val.show = 0;
        },
        getPost(val) {
         

            if (val.zt === 1 || val.zt === 2) {
                if (val.id) {
                    this.$emit('getPatroLable', val);
                } else {
                    this.$message.error('数据源未生成预警信息');
                }
            }

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

    margin-top: 12px;
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
    //  background-color: #b9b9b9;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;

    width: 24px;
    height: 24px;
    //  background: #5c88a7;
    opacity: 1;
    line-height: 24px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
}

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

.step-num_border {
    display: inline-block;
    height: 40px;
    width: 40px;
    color: #fff;

    border-radius: 50%;
    text-align: center;
    border: none;
    width: 24px;
    height: 24px;
    //  background: #5c88a7;
    opacity: 1;

    position: relative;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999 !important;
}

.step-content:after {
    content: '';
    width: 40%;
    height: 5px;
    background-color: #5c88a7;
    position: absolute;
    top: 12px;
    margin-left: 20%;
}

.step_pass .step-num:after {
    background-color: #56b754;
}

.step_pass .step-content:after {
    background-color: #56b754;
}

.step_active .step-content:after {
    //这里是红色圆点后的那条线
    // background-color: #e55050;
    //现在改成绿色
    background-color: #56b754;
}
.step_active img {
    cursor: pointer;
}
.step_pass img {
    cursor: pointer;
}

.step-content {
    height: 30px;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    margin: auto;
}

.show .step-num {
    width: 30px;
    height: 30px;
}

.sort:after {
    display: none !important;
}

.el-tooltip__popper {
    background: #3e5e99 !important;
    width: 175px;
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
