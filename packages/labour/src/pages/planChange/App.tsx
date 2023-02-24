/**
 * @Description 需求计划信息变更
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-24 16:37:10
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db,NwIcon } from '@platform/main'
import { NTag } from 'naive-ui'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//审批状态
const _statusArray = [ "草稿" , "审批中","审批通过","审批未通过"];

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
            //{ field: 'sourceId', title: '源ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planName', title: '需求计划名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planNo', title: '需求计划编号', showHeaderOverflow: true, width: '160px', align: 'center' },
            //{ field: 'planOrgId', title: '所属机构id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planOrgName', title: '所属机构名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            //{ field: 'planDeptId', title: '所属部门id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planDeptName', title: '所属部门名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planType', title: '需求类别', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'overhaulId', title: '大修轮次', showHeaderOverflow: true, width: '160px', align: 'center' },
            {   
                field: 'auditStatus', 
                title: '审批状态', 
                showHeaderOverflow: true, 
                width: '160px', 
                align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        {
                            size: "small", type: ["error", "info", "success", "warning", ''][row.auditStatus], round: "round", class: "grid-ntag"
                        } as {},
                        {
                            default: () =>_statusArray[row.auditStatus] ,
                            icon: () => h(
                                NwIcon,
                                {
                                    name: ["icon-n-n-error", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-warning", "icon-n-n-mark"][row.auditStatus]
                                }
                            )

                        }
                    )] as JSX.Element[]
                }
            },
            { field: 'estimateAmount', title: '预估金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'budgetAmount', title: '预算金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planStartTime', title: '计划开始时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planEndTime', title: '计划结束时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            //{ field: 'isGenOrder', title: '是否生成订单；0否；1是；', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'pushOffTime', title: '推送截止时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            //{ field: 'isFrameSupp', title: '是否框架协议供应商；0否；1是；', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, width: '160px', align: 'center' },
                {
                title: '操作',
                fixed:  'right',
                width: '150px',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "labourPlanChangeForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourPlanChangeForm_del", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourPlanChange/page',
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
    paramsArray.value = [{ createUserName: d.userName }];
})
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents
}