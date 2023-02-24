/**
 * @Description 请假表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 15:43:03
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
import { NTag } from 'naive-ui'
import { VxeTablePropTypes } from 'vxe-table'
import { getSuppUserContractWork } from './api/api'

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
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
    {
        editConfig: {
            trigger: "manual",
            mode: 'row',
            autoClear: false
        },
        columns: [
            { type: 'checkbox', width: '50px', },
            // { field: 'suppUserId', title: '劳务人员id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'suppUserName', title: '申请人', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'banId', title: '所在班组id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'banName', title: '班组', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'labourCompanyId', title: '所在劳务公司id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'labourCompanyName', title: '劳务公司', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'contractWorkId',
                title: '承包合同',
                editRender: { enabled: true },
                slots: {
                    edit: 'approveState_edit',
                    default: 'contractWorkId_default',
                    header: ({ }) => {
                        return <div><span style="color:red; vertical-align: middle;">* </span>承包合同</div>
                    }
                },
                width: "200px",
                showOverflow: true,
                showHeaderOverflow: true,
                align: 'center'
            },
            // { field: 'vacateType', title: '请假类型：1病假、2事假、3年假（计成本）', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'vacateApplyDate', title: '请假申请日期', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'vacateTypeName', title: '请假类型', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'vacateDateStart', title: '请假开始日期', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'vacateDateEnd', title: '请假结束日期', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'vacateLenth', title: '请假总时长（天）', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'vacateStateName', title: '审批状态', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: ["error", "info", "success", "warning", ''][row.vacateState], round: "round", class: "grid-ntag" } as {},
                        {
                            default: () => row.vacateStateName,
                            icon: () => h(
                                NwIcon,
                                {
                                    name: ["icon-n-n-error", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-warning", "icon-n-n-mark"][row.vacateState]
                                }
                            )
                        }
                    )] as JSX.Element[]
                }
            },
            //  { field: 'vacateState', title: '审批状态' ,showHeaderOverflow: true, width: '160px', align: 'center',
            // slots: {
            //     default: ({ row }) => [h(
            //       NTag,
            //       { size: "small", type: "success", round: "round" } as {},
            //       { default: () => approveStateArray[row.vacateState] }
            //     )] as JSX.Element[]
            //   }                
            // },
            { field: 'remark', title: '备注', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'monitorRemark', title: '班组长备注', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
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
            // { field: 'vacateApplyDateTime', title: '请假申请时间', showHeaderOverflow: true, width: '160px', align: 'center' },
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
            //     {
            //     title: '操作',
            //     showHeaderOverflow: true,
            //     align: 'center',
            //     slots: {
            //         default: ({ row }) => {
            //             let edit = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourAttendanceVacateForm_edit", params: [row] }
            //             );
            //             let del = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourAttendanceVacateForm_del", params: [row] }
            //             );
            //             //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
            //             return [edit, del]
            //         }
            //     },
            // }
        ]
    }, new RequestPaging(
        '/labour/labourAttendanceVacate/page',
        'post'
    )
)

const refresh = () => {
    reset({})
}
//审批状态
const approveStateArray = ["", "未办理", "已同意", "已拒绝"];

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})
//是否可以勾选
const checkboxConfig = {
    checkField: 'checked',
    trigger: 'row',
    checkMethod: ({ row }) => row.vacateStateName === '未办理'
} as VxeTablePropTypes.CheckboxConfig
let approveParamsArry = ref([{}])
let notApproveParamsArry = ref([{}])

//选中事件(组装修改的参数信息)
const checkboxChangeEvent = () => {
    approveParamsArry.value = [
        {
            approveVacateList: gridRef.value?.getCheckboxRecords(),
            // approveVacateIds: gridRef.value?.getCheckboxRecords().map((row) => row.id).join(),
            approveState: "1"
        }
    ],
        notApproveParamsArry.value = [
            {
                approveVacateList: gridRef.value?.getCheckboxRecords(),
                //   approveVacateIds: gridRef.value?.getCheckboxRecords().map((row) => row.id).join(),
                approveState: "2"
            }
        ]
    console.log(approveParamsArry)
}


const isLoading = ref<boolean>(false)
const updataC = (v: string, o: any, row: any) => {
    row.contractWorkId = v
    row.contractWorkName = o.workContractName
    row.contractWorkCode = o.workContractCode

}

const contractworkArry = ref<Array<any>>([])
const editEvent = async (row: any) => {
    isLoading.value = true
    gridRef.value?.setEditRow(row)
    getSuppUserContractWork(row.suppUserId).then((data) => {
        contractworkArry.value = data
    }).catch((err) => {
        console.log("请求失败！", err)
    });
    isLoading.value = false

}
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, checkboxConfig, checkboxChangeEvent, approveParamsArry, notApproveParamsArry, updataC, editEvent, isLoading, contractworkArry, gridSearchRef, gridEvents
}