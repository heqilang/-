webpackJsonp([39],{1654:function(e,t,a){var l=a(1655);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(1114)("17568adf",l,!0)},1655:function(e,t,a){t=e.exports=a(1113)(),t.push([e.i,".risk-list-wrapper{padding:51px 25px 70px}",""])},1656:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(148),i=function(e){return e&&e.__esModule?e:{default:e}}(l),r=[{seq:1,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"},{seq:2,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"},{seq:3,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"},{seq:4,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"},{seq:5,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"},{seq:6,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"},{seq:7,id:111,riskType:"用火用电",equipmentState:"小磊",reportTime:"2022-09-01 09:00:81",area:"",address:"新世纪环球中心12楼",riskStatus:"",riskLevel:"一般隐患"}];t.default={props:{dataRange:{required:!1},riskLevel:{required:!1},riskStatus:{required:!1},riskType:{required:!1}},data:function(){return{searchModel:{riskLevel:"",riskStatus:"",riskType:""},pager:{pageSize:10,pageIndex:1,total:r.length},dataTable:[],arr:[],Arr:[]}},watch:{riskLevel:{immediate:!0,handler:function(e,t){console.log(e),this.searchModel.riskLevel=e}},riskStatus:{immediate:!0,handler:function(e,t){this.searchModel.riskStatus=e}},riskType:{immediate:!0,handler:function(e,t){this.searchModel.riskType=e}}},created:function(){var e=this;e._http({url:"/api/auth/dict/dictItem",type:"get",isBody:!0,data:{parentCode:"riskLevel"},success:function(t){e.Arr=t.data}}),this.arr=[{label:"待处理",value:"01"},{label:"待确认",value:"02"},{label:"处理中",value:"03"},{label:"完成",value:"04"},{label:"忽略",value:"05"}]},mounted:function(){this.loadListData()},methods:{search:function(){this.loadListData()},getLevelabel:function(e){return this.Arr.filter(function(t){return t.dictCode==e})[0].dictValue},getLabel:function(e){return this.arr.filter(function(t){return t.value==e})[0].label},loadListData:function(){var e=this,t=new i.default(function(t,a){e._http({url:"/api/auth/dict/dictItem",type:"get",isBody:!0,data:{parentCode:"riskType"},success:function(e){t(e),console.dir(e)}})}),a=new i.default(function(t,a){e._http({url:"/api/auth/dict/dictItem",type:"get",isBody:!0,data:{parentCode:"riskLevel"},success:function(e){t(e)}})});i.default.all([t,a]).then(function(t){var a=t[1].data.filter(function(t){return t.dictValue==e.searchModel.riskLevel}),l=t[0].data.filter(function(t){return t.dictValue==e.searchModel.riskType});console.dir(l),e._http({url:"/api/web/indexCountTwo/findRisksList",type:"get",isBody:!0,data:{current:e.pager.pageIndex,size:e.pager.pageSize,timeType:"当日"===e.dataRange?1:2,level:a.length>0?a[0].dictCode:void 0,risksType:l.length>0?l[0].dictCode:void 0,handel:"未整改"==e.searchModel.riskStatus?4:"已整改"==e.searchModel.riskStatus?5:e.searchModel.riskStatus,sorts:"handleReportTime:desc",code:a.length>0?a[0].dictCode:void 0},success:function(t){e.dataTable=t.data.records||[],e.pager.pageSize=t.data.size,e.pager.pageIndex=t.data.current,e.pager.total=t.data.total}})})},handleSizeChange:function(e){this.pageSize=e,this.loadListData()},handleCurrentChange:function(e){this.pageIndex=e,this.loadListData()},handleViewDetailClick:function(e){this.$emit("viewDetailOnclick",e)},changeRiskLevel:function(e){this.searchModel.riskLevel=e,this.loadListData()},changeRiskStatus:function(e){this.searchModel.riskStatus=e,this.loadListData()},changeRiskType:function(e){this.searchModel.riskType=e,this.loadListData()}}}},1657:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"risk-list-wrapper",staticStyle:{height:"720px"}},[a("el-form",{staticClass:"xf-form",attrs:{inline:!0,model:e.searchModel,size:"small"}},[a("el-form-item",{attrs:{label:"隐患级别"}},[a("el-select",{attrs:{clearable:"",placeholder:"隐患级别"},on:{change:e.changeRiskLevel},model:{value:e.searchModel.riskLevel,callback:function(t){e.$set(e.searchModel,"riskLevel",t)},expression:"searchModel.riskLevel"}},[a("el-option",{attrs:{label:"一般隐患",value:"一般隐患"}}),e._v(" "),a("el-option",{attrs:{label:"重大隐患",value:"重大隐患"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"整改状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"整改状态"},on:{change:e.changeRiskStatus},model:{value:e.searchModel.riskStatus,callback:function(t){e.$set(e.searchModel,"riskStatus",t)},expression:"searchModel.riskStatus"}},[a("el-option",{attrs:{label:"逾期未整改",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"限期未整改",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"逾期已整改",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"未整改",value:"4"}}),e._v(" "),a("el-option",{attrs:{label:"已整改",value:"5"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"隐患类型"}},[a("el-select",{attrs:{clearable:"",placeholder:"隐患类型"},on:{change:e.changeRiskType},model:{value:e.searchModel.riskType,callback:function(t){e.$set(e.searchModel,"riskType",t)},expression:"searchModel.riskType"}},[a("el-option",{attrs:{label:"用火用电",value:"用火用电"}}),e._v(" "),a("el-option",{attrs:{label:"疏散通道",value:"疏散通道"}}),e._v(" "),a("el-option",{attrs:{label:"疏散指示",value:"疏散指示"}}),e._v(" "),a("el-option",{attrs:{label:"应急照明",value:"应急照明"}}),e._v(" "),a("el-option",{attrs:{label:"防火门/卷帘",value:"防火门/卷帘"}}),e._v(" "),a("el-option",{attrs:{label:"消防器材",value:"消防器材隐患"}}),e._v(" "),a("el-option",{attrs:{label:"重点部位",value:"重点部位"}}),e._v(" "),a("el-option",{attrs:{label:"电动车隐患",value:"电动车隐患"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),e._v(" "),a("el-table",{staticClass:"xf-table",staticStyle:{width:"100%"},attrs:{data:e.dataTable,height:"540"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"risksType",label:"隐患类型","show-overflow-tooltip":!0,width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reporter",label:"上报人员","show-overflow-tooltip":!0,width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reportTime",label:"上报时间","show-overflow-tooltip":!0,width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"area",label:"所属区域","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"详细地址","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"整改状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(e.getLabel(t.row.state)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"隐患级别",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(e.getLevelabel(t.row.level)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.handleViewDetailClick(t.row)}}},[e._v("查看")])]}}])})],1),e._v(" "),a("div",{staticClass:"text_c mar-t-18"},[0!==e.pager.total?a("customPagination",{attrs:{paginationData:e.pager},on:{getList:e.loadListData}}):e._e()],1)],1)},staticRenderFns:[]}},388:function(e,t,a){a(1654);var l=a(3)(a(1656),a(1657),null,null);e.exports=l.exports}});