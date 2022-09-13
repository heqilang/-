<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div style="padding-left: 10px" v-if="showNumber === 1">
            <ul>
                <li>
                    更新时间：<span> {{ modelDate.addtime }}</span>
                </li>
                <li>
                    设备名称：<span> {{ modelDate.equipmentName }} </span>
                </li>
                <li>
                    所属系统： <span> {{ modelDate.lookup.owningSystem }}</span>
                </li>
                <li>
                    设备类型： <span>{{ modelDate.host == 'YES' ? '主机' : '探测器' }}</span>
                </li>

                <li>
                    报警类型： <span>{{ modelDate.alarmType }}</span>
                </li>
                <li>
                    安装位置： <span>{{ modelDate.unitName }}</span>
                </li>
            </ul>
        </div>

        <div style="padding-left: 10px" v-else-if="showNumber === 2">
            <ul>
                <li>
                    巡检类型：<!-- <span v-if="modelDate.patrolType == 'DAY'">日检</span>
                                    <span v-else-if="modelDate.patrolType == 'WEEK'">周检</span>
                                    <span v-else-if="modelDate.patrolType == 'MONTH'">月检</span>
                                    <span v-else-if="modelDate.patrolType == 'QUARTER'">季检</span>
                                    <span v-else-if="modelDate.patrolType == 'YEAR'">年检</span>
                                    <span v-else-if="modelDate.patrolType == 'TEMPORARY'">临时检</span> -->
                    <span v-if="modelDate.type == '1'">普通巡检</span>
                    <span v-else>防火巡检</span>
                </li>
                <li>巡检状态：<span v-if="modelDate.result == '0'">进行中</span> <span v-else>已完成</span></li>
                <li>模板名称：{{ modelDate.location }}</li>
                <li>开始日期：{{ modelDate.beginTime }}</li>
                <li>截至日期：{{ null }}</li>
                <li>巡检人员：{{ modelDate.inspectPerson }}</li>
                <li>完成时间：{{ modelDate.addtime }}</li>
            </ul>
        </div>

        <div style="padding-left: 10px" v-else-if="showNumber === 3">
            <ul>
                <li>上报时间：{{ modelDate.createTime || '--' }}</li>
                <li>隐患类型：{{ modelDate.risksType == 'EQUIPMENT' ? '设备隐患' : '环境隐患' }}</li>
                <!--  <div>上报人员：{{ modelDate.lookup.handleReportor || '--' }}</div> -->
                <li>上报人员：{{ modelDate.createUser || '--' }}</li>
                <!--      <div>隐患位置：{{ (modelDate.lookup.building == 'null' || '') + (modelDate.lookup.floor == 'null' || '') + modelDate.address }}</div> -->
                <li>隐患位置：{{ modelDate.unitName + modelDate.troubleLocation }}</li>
                <li>隐患等级：{{ modelDate.lookup.level == 1 ? '一般隐患' : '重大隐患' }}</li>
                <li>备注说明：{{ modelDate.lookup.risksRemark || '--' }}</li>
                <li v-if="modelDate.risksImages">
                    <img style="width: 120px" :src="modelDate.risksImages" alt="" />
                </li>
            </ul>
        </div>
        <div v-if="showNumber === 1">
            <div class="box2">流程追溯</div>
            <div style="height: 400px">
                <el-scrollbar style="height: 100%; width: 90%">
                    <el-timeline>
                        <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.lineDate" placement="top">
                            <el-card style="font-size: 14px">
                                <p v-if="(item.alarmDate || '') != ''">{{ item.alarmDesc }}：{{ item.alarmDate }}</p>
                                <p v-else-if="(item.dealName || '') != ''">
                                    处理人员：{{ item.dealName }} {{ item.dealPhone }}<br />
                                    处理描述：{{ item.dealDesc }}
                                </p>
                                <p v-else-if="(item.pushUserName || '') != ''">
                                    <span style="display: block">{{ item.orgPushDesc }}</span>
                                    <span style="display: flex; justify-content: space-between">
                                        <span>{{ item.pushUserName }} {{ item.pushPhone }}</span
                                        ><span>{{ item.pushResult == '短信推送成功' ? '语音、短信通知成功' : item.pushResult }}</span>
                                    </span>
                                </p>
                            </el-card>
                        </el-timeline-item>
                        <!-- <el-timeline-item v-if="(alarmanalysis6_params.alarmTime || '') != ''" :timestamp="alarmanalysis6_params.alarmTime" placement="top">
                                    <el-card style="font-size: 14px">
                                        <p>设备报警：{{ alarmanalysis6_params.alarmTime }}</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item v-for="(item, index) in sourcelist" :key="index" v-if="item.show && item.title != '被指派了报警工单'" :timestamp="item.addtime" placement="top">
                                    <el-card style="font-size: 14px">
                                        <p>{{ item.targetObjectJob }}</p>
                                        <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                            <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                            ><span>语音、短信通知成功</span>
                                        </p>
                                        <p v-else-if="item.verifyTime">处理人员：{{ item.verifier || '--' }} {{ item.verifierPhone }}<br />处理描述：{{ item.result | confirmResultType }}</p>
                                        <p v-else-if="item.confirmTime">确认人员：{{ item.confirmor || '--' }} {{ item.confirmorPhone }}<br />确认描述：{{ item.confirmResult | confirmResultType }}</p>
                                    </el-card>
                                </el-timeline-item> -->
                    </el-timeline>
                </el-scrollbar>
            </div>
        </div>

        <div v-else-if="showNumber === 2">
            <div class="eventMsgInfo">
                <div class="box2">流程追溯</div>
                <!-- style="height: 450px" -->
                <div style="height: 400px">
                    <el-scrollbar style="height: 100%; width: 90%">
                        <el-timeline>
                            <el-timeline-item v-for="(item, index) in sourcelist" :key="index" :timestamp="item.addtime" v-if="item.show && item.title != '被指派了报警工单'" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>{{ item.targetObjectJob }}</p>
                                    <p style="display: flex; justify-content: space-between" v-if="item.title == '消防监控管理平台有一条报警消息，超时受理确认，请您及时处理！'">
                                        <span>{{ item.lookup.targetObject }} {{ item.targetObjectJobMobile }}</span
                                        ><span>语音、短信通知成功</span>
                                    </p>
                                    <p v-else-if="item.beginTime">
                                        <span>巡查人员：{{ item.inspectPerson || '--' }}</span
                                        ><span style="float: right">{{ item.inspectStatus }}</span> <br />巡查时间：{{ item.beginTime }}
                                    </p>
                                </el-card>
                            </el-timeline-item>
                            <!-- <el-timeline-item v-if="(alarmanalysis6_params.verifyTime||'')!=''" :timestamp="alarmanalysis6_params.verifyTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>处理人员：{{ alarmanalysis6_params.verifier || '--' }}</p>
                                    <p>处理描述：{{ alarmanalysis6_params.result || '--'}}</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="(alarmanalysis6_params.confirmTime||'')!=''" :timestamp="alarmanalysis6_params.confirmTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>确认人员：{{ alarmanalysis6_params.confirmor || '--' }}</p>
                                    <p>确认描述：{{ alarmanalysis6_params.confirmResult || '--'}}</p>
                                </el-card>
                            </el-timeline-item> -->
                        </el-timeline>
                    </el-scrollbar>
                </div>
            </div>
        </div>

        <div v-else-if="showNumber === 3">
            <div class="eventMsgInfo">
                <div class="box2">流程追溯</div>
                <!-- style="height: 450px" -->
                <div style="height: 400px">
                    <el-scrollbar style="height: 100%; width: 90%">
                        <el-timeline>
                            <el-timeline-item v-if="(riskId.createTime || '') != ''" :timestamp="riskId.createTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>上报隐患：{{ riskId.createTime }}</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="(riskId.handleTime || '') != ''" :timestamp="riskId.handleTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>处置人员：{{ riskId.createUser || '--' }} {{ riskId.handlerMobile || '--' }}</p>
                                    <p>处置结果：已完成隐患处理</p>
                                </el-card>
                            </el-timeline-item>
                            <!--
                                    reporterMobile 上报人电话
                                    dispatcherMobile 派单人电话
                                    takerMobile 接单人电话
                                    handlerMobile 处理人电话
                                    handleReportorMobile 处理上报的人电话
                                    -->

                            <!-- <el-timeline-item v-if="(alarmanalysis6_params.verifyTime||'')!=''" :timestamp="alarmanalysis6_params.verifyTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>处理人员：{{ alarmanalysis6_params.verifier || '--' }}</p>
                                    <p>处理描述：{{ alarmanalysis6_params.result || '--'}}</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item v-if="(alarmanalysis6_params.confirmTime||'')!=''" :timestamp="alarmanalysis6_params.confirmTime" placement="top">
                                <el-card style="font-size: 14px">
                                    <p>确认人员：{{ alarmanalysis6_params.confirmor || '--' }}</p>
                                    <p>确认描述：{{ alarmanalysis6_params.confirmResult || '--'}}</p>
                                </el-card>
                            </el-timeline-item> -->
                        </el-timeline>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    modelDate: {
      required: true
    },
    showLi: {
      required: false,
      default: true
    },
    showNumber: {
      required: false,
      default: 1
    }
  },
  data: () => ({
    pager: {
      pageSize: 5,
      pageIndex: 1,
      total: 0
    },
    sourcelist: [],
    riskId: "",
    dataTable: [],
    searchModel: {
      fhfq: '',
      installSite: undefined
    }
  }),
  created () {
    this.getfindMessages(this.modelDate)

  },
  mounted () { },
  methods: {
    //告警总计
    getfindMessages (val) {



      let _self = this;
      _self.sourcelist = [];
      if (_self.showNumber == 1) {
        _self._http({
          url: '/api/web/indexCountV3/alarmFlow', ///api/web/indexCountTwo/findMessages
          type: 'get',
          isBody: true,
          data: {
            alarmId: val.id,
            sourceId: val.id,
            transform: 'U:targetObject'
          },
          success: function (res) {
            _self.sourcelist = res.data.data || [];

          }
        });
      } else if (_self.showNumber == 2) {

        _self._http({
          url: '/api/web/indexCountTwo/findMessages', ///api/web/indexCountTwo/findMessages
          type: 'get',
          isBody: true,
          data: {
            sourceId: val.id,
            transform: 'U:targetObject'
          },
          success: function (res) {
            console.dir(res)
            _self.sourcelist = res.data.records || [];
            console.dir(_self.sourcelist)
            let arr = [];
            _self.sourcelist.forEach((item, index) => {
              item.targetObjectJob = item.targetObjectJob || '';
              if (item.targetObjectJob.indexOf('责任人') == -1) {
                item.show = false;
              } else {
                let has = false;
                for (let i = 0; i < arr.length; i++) {
                  if (item.targetObjectJob == arr[i]) {
                    has = true;
                    break;
                  }
                }
                if (!has) {
                  item.show = true;
                  arr.push(item.targetObjectJob);
                } else {
                  item.show = false;
                }
              }
            });
            if ((val.beginTime || '') != '') {
              _self.sourcelist.push({
                addtime: val.beginTime,
                beginTime: val.beginTime,
                // lookup:{
                //     targetObject:val.lookup.verifier
                // },
                inspectPerson: val.inspectPerson,
                inspectStatus: val.inspectStatus,
                patrolStatus: val.patrolStatus == 'NORMAL' ? '正常' : val.patrolStatus == 'TIMEOUT' ? '超时' : '未巡检',
                title: '',
                show: true
              });
            }
            _self.sourcelist = _self.sourcelist.sort((a, b) => {
              return a.addtime > b.addtime ? 1 : -1;
            });



            console.dir(_self.sourcelist)

          }
        });

      } else {
        this.riskId = val
      }


    }
  }
};
</script>

<style lang="scss" scoped>
.equipment-type-list-wrapper {
    li {
        color: white;
        font-size: 16px;
        line-height: 30px;
    }
    padding: 20px 25px 70px 25px;
}
.box2 {
    color: rgb(255, 255, 255);
    font-size: 16px;
    padding: 30px 20px;
}
.box2::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #25a6ff;
    margin-left: -12px;
    margin-top: 2px;
    border-radius: 2px;
}
.eventMsgInfo {
    border-radius: 8px;
    .el-card {
        background-color: #264365;
        border: none;
        color: #fff;
        font-size: 14px;
        line-height: 24px;
    }
    .el-tabs__item {
        color: #fff;
    }
    .el-card__body {
        padding: 10px 20px !important;
    }
    .box1 {
        padding: 10px 15px 0 15px;
        color: rgb(255, 255, 255);
        font-size: 16px;
        line-height: 30px;
    }
    .box2 {
        color: rgb(255, 255, 255);
        font-size: 16px;
        padding: 30px 20px;
    }
    .box2::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 18px;
        background-color: #25a6ff;
        margin-left: -12px;
        margin-top: 2px;
        border-radius: 2px;
    }
}
.el-timeline-item__timestamp.is-top {
    position: absolute;
    margin-left: -120px;
    color: rgb(255, 255, 255);
    width: 80px;
    font-size: 14px;
    text-align: center;
}
.el-timeline-item {
    margin-left: 110px;
}
.el-timeline-item__node {
    background-color: rgb(0, 166, 255);
    box-shadow: 0 0 3px 2px rgba(0, 166, 255, 0.5);
    border: 1px rgba(0, 0, 0, 0.5) solid;
}
.el-timeline-item__tail {
    border-color: rgb(0, 166, 255);
}

.textBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 400px;
}
.globalCenterIndexCon div {
    box-sizing: border-box;
}
.el-card {
    background-color: #264365;
    border: none;
    color: #fff;
    font-size: 14px;
    line-height: 24px;
}
</style>
