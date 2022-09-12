<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div>
            <ul>
                <li>
                    更新时间：<span> {{ activeDealie.lastUpdatetime }}</span>
                </li>
                <li>
                    设备状态：<span :style="{ color: activeDealie.equipmentState == 1 ? '#29f329d4' : '' }"> {{ activeDealie.newEquipmentState }} </span>
                </li>
                <li>
                    设备名称： <span> {{ activeDealie.equipmentName }}</span>
                </li>
                <li>
                    设备类型： <span>{{ activeDealie.lookup.equipmentType }}</span>
                </li>
                <li>
                    所属系统： <span> {{ activeDealie.lookup.owningSystem }}</span>
                </li>
                <li>
                    安装位置： <span>{{ activeDealie.lookup.building + activeDealie.lookup.floor }}</span>
                </li>
                <li>
                    详细地址： <span>{{ activeDealie.address }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    activeDealie: {
      //设备详情数据
      required: true
    }
  },
  data: () => ({
    pager: {
      pageSize: 5,
      pageIndex: 1,
      total: 0
    },
    dataTable: [],
    searchModel: {
      fhfq: '',
      installSite: undefined
    },
    systemName: ''
  }),
  created () {
    if (this.activeDealie.equipmentState == 1) {
      this.activeDealie.newEquipmentState = '正常';
      // 1正常  2故障  3离线  4预警  9火警）
    } else if (this.activeDealie.equipmentState == 2) {
      this.activeDealie.newEquipmentState = '故障';
    } else if (this.activeDealie.equipmentState == 3) {
      this.activeDealie.newEquipmentState = '离线';
    } else if (this.activeDealie.equipmentState == 4) {
      this.activeDealie.newEquipmentState = '预警';
    } else if (this.activeDealie.equipmentState == 9) {
      this.activeDealie.newEquipmentState = '火警）';
    }

    //
    switch (this.activeDealie.owningSystem) {
      case 'equipSys1':
        this.systemName = '火灾报警系统';
        break;
      case 'equipSys10':
        this.systemName = '耐火构建系统';
        break;
      case 'equipSys11':
        this.systemName = '消防电梯设施';
        break;
      case 'equipSys12':
        this.systemName = '电源监控系统';
        break;
      case 'equipSys3':
        this.systemName = '消防给水系统';
        break;
      case 'equipSys4':
        this.systemName = '独立式感烟火灾系统';
        break;
      case 'equipSys5':
        this.systemName = '灭火器系统';
        break;
      case 'equipSys6':
        this.systemName = '防烟排烟系统';
        break;
      case 'equipSys8':
        this.systemName = '喷水灭火系统';
        break;
      case 'equipSys9':
        this.systemName = '消防供水设备';
        break;
      case 'gfmhsbxt':
        this.systemName = '干粉灭火系统';
        break;
      case 'hzfhcpxt':
        this.systemName = '火灾防护系统';
        break;
      case 'jznhgjxt':
        this.systemName = '建筑耐火构建系统';
        break;
    }
  },
  mounted () { },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import './equipmentTypeList.scss';

.equipment-type-list-wrapper {
    li {
        color: white;
        font-size: 16px;
        line-height: 30px;
    }
}
</style>
