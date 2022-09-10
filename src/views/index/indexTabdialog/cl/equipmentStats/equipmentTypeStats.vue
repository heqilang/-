<!--
设备统计- 资源大类型分类统计
-->
<template>
    <div class="equipment-type-stats-wrapper">
        <div class="equipment-types">
            <a class="equipment-type" v-for="item in equipmentTypeData" :key="item" v-on:click="onClick(item.equipmentType)">
                <div class="equipment-type-flag">
                    <span class="equipment-type-flag-color" v-bind:style="'background-color:' + item.color"></span>
                </div>
                <div class="equipment-type-content">
                    <span class="equipment-type-name">{{ item.name }}</span>
                    <span class="equipment-type-num">{{ item.value }}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
const equipmentTypeData = [
    // { name: '光电感烟探测器', value: 11842, color: '#BE4C3D' },
    // { name: '输出模块', value: 1443, color: '#3DBE71' },
    // { name: '点型光电感烟火灾探测器', value: 1443, color: '#25A6FF' },
    // { name: '壁挂式扬声器', value: 1443, color: '#3DA7BE' },
    // { name: '消火栓按钮', value: 1443, color: '#D97730' },
    // { name: '输入模块', value: 1443, color: '#BE3DA2' },
    // { name: '手动火灾报警按钮', value: 1443, color: '#9C3DBE' },
    // { name: '线性光束烟感', value: 1443, color: '#AA2830' },
    // { name: '火灾声光警报器', value: 1443, color: '#FFA825' }
];

export default {
    props: {
        typeName: {
            //设备类型的请求过滤条件
            required: true
        }
    },
    data: () => ({
        equipmentTypeData: []
    }),
    created() {},
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            //todo 接口已对接 但后端未根据equipmentName进行筛选，需后端进行调整
            this.equipmentTypeData = equipmentTypeData;

            let _self = this;
            if (_self.typeName) {
                _self._http({
                    url: '/api/web/indexCountTwo/countByName',
                    // url: '/api/web/indexCountTwo/countEquipmentByType',
                    type: 'get',
                    data: {
                        //equipmentName: _self.typeName,
                        owningSystem: _self.typeName
                        // number: 100
                    },
                    success: function (res) {
                        let colors = ['#BE4C3D', '#3DBE71', '#25A6FF', '#3DA7BE', '#D97730', '#BE3DA2', '#9C3DBE', '#AA2830', '#FFA825'];
                        _self.equipmentTypeData = [];
                        let colorIndex = 0;
                        res.data.forEach((d) => {
                            _self.equipmentTypeData.push({
                                name: d.equipmentTypeCN || d.equipmentName,
                                value: d.number,
                                equipmentType: d.equipmentType,
                                color: colors[colorIndex++]
                            });
                            if (colorIndex == colors.length) colorIndex = 0;
                        });
                        // _self.equipmentTypeData = [
                        //     { name: '光电感烟探测器', value: 10221, color: '#BE4C3D' },
                        //     { name: '输出模块', value: 300, color: '#3DBE71' },
                        //     { name: '点型感温火灾探测器', value: 1443, color: '#25A6FF' },
                        //     { name: '壁挂式扬声器', value: 60, color: '#3DA7BE' },
                        //     { name: '消火栓按钮', value: 1443, color: '#D97730' },
                        //     { name: '输入模块', value: 463, color: '#BE3DA2' },
                        //     { name: '手动火灾报警按钮', value: 2254, color: '#9C3DBE' },
                        //     { name: '线性光束感烟火灾探测器', value: 1200, color: '#AA2830' },
                        //     { name: '火灾声光警报器', value: 2230, color: '#FFA825' }
                        // ];
                    }
                });
            }
        },
        onClick(type) {
            this.$emit('onclick', type);
        }
    }
};
</script>

<style lang="scss">
@import './equipmentTypeStats.scss';
</style>
