<!--
消防力量- 3级 -- 消防队中的某个编制下的消防员列表
-->
<template>
    <div class="fire-man-list-wrapper">
        <el-table v-if="false" class="xf-table" :data="dataTable" height="400" style="width: 100%">
            <el-table-column prop="seq" label="序号" width="80" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="sex" label="性别" width="180" />
            <el-table-column prop="post" label="职务" />
            <el-table-column prop="phone" label="联系电话" />
            <el-table-column prop="address" label="现在住址" />
            <el-table-column prop="entryDate" label="入职时间" />
            <el-table-column prop="serve" label="是否服役" />
            <el-table-column prop="political" label="是否服役" />
        </el-table>
        <!-- <el-pagination v-if="pager.total > 0" class="xf-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.pageIndex" :page-sizes="[10, 50, 200]" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.total"> </el-pagination> -->
        <!-- <el-radio-button label="政府专职消防队"></el-radio-button>
            <el-radio-button label="企业消防队"></el-radio-button>
            <el-radio-button label="微型消防队" -->
        <div v-for="(item, index) in dataTable2" :key="index">
            <div style="font-size: 20px; color: white" v-if="index == 0">政府专职消防队</div>
            <div style="font-size: 20px; color: white; margin-top: 12px" v-else-if="index == 1">企业消防队</div>
            <div style="font-size: 20px; color: white; margin-top: 12px" v-else>微型消防队</div>
            <el-divider></el-divider>
            <li v-for="(item2, index2) in item" :key="index2" style="font-size: 12px; color: white; margin-top: 8px">{{ item2.name }}: {{ item2.number }}</li>
        </div>
    </div>
</template>

<script>
const mockData = [
    { seq: 1, name: '王虎', sex: '男', post: '站长', phone: '13608045907', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 2, name: '王润', sex: '男', post: '副站长', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 3, name: '倪红军', sex: '男', post: '专职消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 4, name: '陈仕敏', sex: '男', post: '专职消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 5, name: '唐斌', sex: '男', post: '专职消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 6, name: '张文俊', sex: '男', post: '专职消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 7, name: '廖刚', sex: '男', post: '队长', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 8, name: '邓军', sex: '男', post: '消防 领班', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 9, name: '张文强', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 10, name: '姚建', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 11, name: '李建波', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 12, name: '何宁', sex: '男', post: '队长', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 13, name: '张鑫洋', sex: '男', post: '消防员', phone: '', address: '中和', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 14, name: '黄国铮', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 15, name: '刘金升', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 16, name: '宋 微', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 17, name: '刘金升', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 18, name: '刘本良', sex: '男', post: '队长', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '党员' },
    { seq: 19, name: '许文武', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 20, name: '田洲', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 21, name: '张波', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' },
    { seq: 22, name: '罗 林', sex: '男', post: '消防员', phone: '', address: '宿舍', entryDate: '2022-08-10', serve: '是', political: '群众' }
];

const mockData2 = [
    [
        {
            name: '指挥员',
            number: 4
        },
        {
            name: '驾驶员',
            number: 2
        },
        {
            name: '通信员',
            number: 2
        },
        {
            name: '班长',
            number: 2
        },
        {
            name: '战斗员',
            number: 10
        }
    ],
    [
        {
            name: '消防经理',
            number: 1
        },
        {
            name: '消防主管',
            number: 3
        },
        {
            name: '消防领班',
            number: 3
        },
        {
            name: '消防员',
            number: 23
        },
        {
            name: '司机',
            number: 7
        }
    ],
    [
        {
            name: '经理',
            number: 1
        },
        {
            name: '物业经理',
            number: 1
        },
        {
            name: '安保经理',
            number: 1
        },
        {
            name: '安防主管',
            number: 1
        },
        {
            name: '消防主管',
            number: 1
        },
        {
            name: '消防领班',
            number: 1
        },
        {
            name: '安防领班',
            number: 4
        }
    ]
];

export default {
    props: {
        guard: {
            //消防队的某个编制记录
            required: true
        }
    },
    data: () => ({
        pager: {
            pageSize: 10,
            pageIndex: 1,
            total: mockData.length
        },
        dataTable: [],
        dataTable2: []
    }),
    created() {},
    mounted() {
        this.loadListData();
    },
    methods: {
        loadListData() {
            //todo 待接口对接 this.guard是上级页面选中的列表记录
            this.dataTable = mockData;
            this.dataTable2 = mockData2;
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
        }
    }
};
</script>

<style lang="scss">
@import './fireMan.scss';
</style>
