/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-12-05 15:14:28
 */

 import { ref, h } from 'vue'
 import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
 import { NTag } from 'naive-ui'
 
 
 /**
  * 初始化弹出框组件
  */
 let dialogLocal: any;
 function initDialog(dialog: any) {
     dialogLocal = dialog;
 }
 
 //-- 例子看完删除它
 //const typeArray = ["primary", "info"];
 //const statusArray = [ "启用" , "停用"];
 /*const statusOptions = ref([
     { label: '请选择', value: '' },
     { label: '启用', value: 1 },
     { label: '停用', value: 3 },
 ])*/
 /**
  * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
  */
 const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
     {
         columns: [
             // { field: 'suppUserId', title: '劳务人员id', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'suppUserName', title: '申请人', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'banId', title: '所在班组id', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'banName', title: '班组名称', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'labourCompanyId', title: '所在劳务公司id', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'labourCompanyName', title: '劳务公司名称', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'attendanceType', title: '考勤类型', showHeaderOverflow: true, width: '160px', align: 'center',
                 slots: {
                     default: ({ row }) => [h(
                     NTag,
                     { size: "small", type: "success", round: "round" } as {},
                     { default: () => attendanceTypeArray[row.attendanceType] }
                     )] as JSX.Element[]
                 }
             },
             { field: 'attendanceDate', title: '考勤日期', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'attendanceInfo', title: '出勤情况', showHeaderOverflow: true, width: '160px', align: 'center',
                 slots: {
                     default: ({ row }) => [h(
                     NTag,
                     { size: "small", type: "success", round: "round" } as {},
                     { default: () => attendanceInfoArray[row.attendanceInfo] }
                     )] as JSX.Element[]
                 }
              },
             // { field: 'attendanceRatio', title: '出勤时长比例：1/0.5', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'remark', title: '备注', showHeaderOverflow: true, width: '160px', align: 'center' },
             { 
                field: 'attendanceStateName', 
                title: '审批状态', 
                showHeaderOverflow: true, 
                width: '160px', 
                align: 'center' ,
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: "success", round: "round" } as {},
                        { default: () => row.attendanceStateName }
                    )] as JSX.Element[]
                }
            },
             { field: 'contractWorkCode', title: '承包合同编号', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'late', title: '迟到', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'leaveEarly', title: '早退', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'monitorRemark', title: '班长备注', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'contractWorkId', title: '承包合同id', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'contractWorkCode', title: '承包合同编号', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'contractWorkName', title: '承包合同名称', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'estimatesettlementamount', title: '承包合同预计成本', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'estimateinitamountnotax', title: '承包合同实际成本', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'virtualPurchaseId', title: '虚拟订单id', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'virtualPurchaseCode', title: '虚拟订单编号', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'virtualPurchaseName', title: '虚拟订单名称', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'estimateexecamount', title: '采购合同预计履约金额', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'actualexecamount', title: '采购合同实际履约金额', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'settlementState', title: '结算状态-1未结算-2结算中-3已结算', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'settlementDate', title: '结算时间', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'statementId', title: '结算单id', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'statementName', title: '结算单名称', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'attendanceApplyDateTime', title: '考勤申请时间', showHeaderOverflow: true, width: '160px', align: 'center' },
             // { field: 'attendanceYearMonth', title: '年-月', showHeaderOverflow: true, width: '160px', align: 'center' },
             /*例子看完删除它{
                 title: '是否启用', showHeaderOverflow: true, width: '100px', align: 'center',
                 slots: {
                     default: ({ row }) => [h(
                         NTag,
                         { size: "small", type: typeArray[row.status] } as {},
                         { default: () => statusArray[row.status] }
                     )] as JSX.Element[]
                 }
             },*/

         ]
     }, new RequestPaging(
         '/labour/labourAttendance/suppUserMonthpage',
         'post'
     )
 )
 

 //考勤类型
 const attendanceTypeArray = ["", "出勤", "培训"];
 //考勤类型
 const attendanceInfoArray = ["", "全天", "上午","下午"];
 /**
  * 传递用户参数例子
  */
 let paramsArray = ref([{}]);
 Db.get('userInfo').then((d: any) => {
     paramsArray.value = [{ createUserName: d.userName }];
 })
 
 export {
     bind, gridRef, filterData, query , reset, paramsArray, initDialog
 }