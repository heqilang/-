<!--
设备统计- 资源小类型分类下的设备清单
-->
<template>
    <div class="equipment-type-list-wrapper">
        <div v-if="showNumber === 1">
            <ul>
                <li v-show="showLi">
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

                <li v-show="showLi">
                    报警类型： <span>{{ modelDate.alarmType }}</span>
                </li>
                <li>
                    安装位置： <span>{{ modelDate.unitName }}</span>
                </li>
            </ul>
        </div>

        <div v-else-if="showNumber === 2">
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

        <div v-else-if="showNumber === 3">
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
        dataTable: [],
        searchModel: {
            fhfq: '',
            installSite: undefined
        }
    }),
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.equipment-type-list-wrapper {
    li {
        color: white;
        font-size: 16px;
        line-height: 30px;
    }
    padding: 51px 25px 70px 25px;
}
</style>
