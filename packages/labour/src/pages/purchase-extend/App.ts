/**
 * @Description 采购合同拓展信息
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2022-11-21 11:21:01
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
 const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
     {
         columns: [
             { field: 'contractId', title: '采购合同ID', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'taxrateName', title: '税率', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'taxrate', title: '税率', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'invoiceTypeName', title: '发票类型', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'invoiceType', title: '发票类型', showHeaderOverflow: true, width: '160px', align: 'center' },
             { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, width: '160px', align: 'center' },
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
                 {
                 title: '操作',
                 showHeaderOverflow: true,
                 align: 'center',
                 slots: {
                     default: ({ row }) => {
                         let edit = h(
                             NwFunctionPredefine,
                             { code: "purchaseExtendForm_edit", params: [row] }
                         );
                         let del = h(
                             NwFunctionPredefine,
                             { code: "purchaseExtendForm_del", params: [row] }
                         );
                         //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                         return [edit, del]
                     }
                 },
             }
         ]
     }, new RequestPaging(
         '/labour/purchaseExtend/page',
         'post'
     )
 )
 
 const refresh = () => {
 reset({})
 }


 /**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{contractId: d.id }];
})

const gridSearchRef = ref()
 export {
     bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents
 }