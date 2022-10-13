<!--
巡查情况-巡查次数统计
-->

<template>
    <div>

        <div v-if="changePage=='0'">
            <div class="diaHeadStandardC patrolHome"
                style="height: 42px; line-height: 42px; padding-left: 12px; background-color: #364b6a; color: #fff">
                <span   class="diaHeadStandardCcolor"  > {{ title }}</span>


                <div style="height: 20px; display: flex; justify-content: space-between" class="clhangImg">
                    <i class="el-icon-circle-close" @click="$emit('closeRiskStats')"
                        style="font-size: 26px; color: #5e9ffb; cursor: pointer"> </i>
                </div>
            </div>

            <div style="position: relative">
                <div class="xf-stats-wrapper">
                    <div class="patrol-stats-wrapper">

                        <div class="risk-stats-charts-wrapper">
                            <div class="patrol-stats-charts-content">
                                <ul class="patrolHome_box" @click="getChangLi">
                                    <li class="patrolHome_box_li" v-for="item in monthDate" :key="item.name"
                                        :value="item.name"  :title="item.label"   > {{item.label}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="changePage=='3'">
             
            <PatrolStats   @closeRiskStats="closePage"     :dataRange="dataRange"  :titleTop="titleTop"      />


        </div>

    </div>


</template>

<script>
import XfIndicator from '../common/XfIndicator';



import PatrolStats from './patrolStats.vue'


const mockChartBarData = [
    { timeslot: '01', normalTotal: 7, overtimeTotal: 5 }, //时间段 超时次数, 正常次数
    { timeslot: '02', normalTotal: 17, overtimeTotal: 15 },
    { timeslot: '03', normalTotal: 7, overtimeTotal: 5 },
    { timeslot: '04', normalTotal: 12, overtimeTotal: 2 },
    { timeslot: '05', normalTotal: 11, overtimeTotal: 1 },
    { timeslot: '06', normalTotal: 2, overtimeTotal: 2 },
    { timeslot: '07', normalTotal: 4, overtimeTotal: 1 },
    { timeslot: '08', normalTotal: 12, overtimeTotal: 11 },
    { timeslot: '09', normalTotal: 6, overtimeTotal: 3 }
];

export default {
    components: {
        XfIndicator,


        PatrolStats
    },
    props: {
        dataRange: {
            //数据范围 (当月 | 当日)
            required: true
        },
        datatype: {
            required: false
        },
        nameTime: {
            required: false
        }
    },
    data: () => ({
        changePage: '0',
        titleTop:'',
        alparams: false,
        dataTable: [],
        pager: {
            pageSize: 5,
            pageIndex: 1,
            total: null
        },
        buttonDay: require('@/assets/patroLableImg/daybotton.png'),
        buttonMonth: require('@/assets/patroLableImg/monthbotton.png'),

        monthDate: [
            { label: '环球融创会展文旅集团', name: '1' },
            { label: '四川大区物业', name: '2' },
            { label: '环球购物中心', name: '3' },
            { label: '环球物业公司', name: '4' },
            { label: '乐天百货', name: '5' },
            { label: '洗衣工厂', name: '6' },
            { label: '洲际酒店', name: '7' },
            { label: '海洋乐园', name: '8' },
            { label: '能源公司', name: '9' }
        ],
        showTitle: true,
        showTitleWord: '',
        time: '',
        alarmRadio: 'DAY',
        readyAlarmType: 1,
        getRed: 3,
        getRedDate: '',
        list: [],
        newlist: [],
        activeName: 'first',
        activeType: 'one',
        showAmep: false,
        statsData: {
            notOpportunelyFinish: 0,
            opportunelyFinish: 0,
            allFinishPatrol: 0
        },

        title: '',
        currentLayerLevel: 1,
        activePatrolStatus: '', //当前激活的 巡查状态(正常 或 超时)
        activePartolPointId: undefined, //当前激活的 巡查点位id


    }),
    created() {

    },
    mounted() {
        this.title = '选择区域'
    },
    methods: {
        getChangLi(event) {
       
            console.log(event, 'ssss');
              
              if(event.target.value=='3'){
                this.changePage=event.target.value
              this.titleTop=event.target.title
              console.dir(event.target.title);
              }
           



        },
        closePage(){
            this.$emit('closeRiskStats')
        }
    }


};
</script>

<style lang="scss">
@import './patrolStats.scss';

.patrolHome_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .patrolHome_box_li {
        width: 30%;
        height: 152px;
        background: rgba(55,140,240,0.4);
        box-shadow: inset 0px 0px 20px 0px rgba(82,180,236,0.25);
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        border: 3px solid #3676C1;
        text-align: center;
        line-height:152px ;
        font-size: 24px;
        margin-bottom: 20px;
        
   font-family: Alibaba PuHuiTi 2.0-95 ExtraBold, Alibaba PuHuiTi 20;
     font-weight: normal;
   margin-right: 5px;
background: linear-gradient(180deg, #FFFFFF 0%, #3CA2F8 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
    }
}
</style>
