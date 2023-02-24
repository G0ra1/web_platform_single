/**
 * @Description 加班表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-12-01 09:19:09
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
import { NTag } from 'naive-ui'
import { VxeTablePropTypes } from 'vxe-table'
import { getSuppUserContractWork } from './api/api'
import { da } from 'date-fns/locale'

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
        editConfig: {
            trigger: "manual",
            mode: 'row',
            autoClear: false
        },
        columns: [
            { type: 'checkbox', width: '50px', },
            // { field: 'suppUserId', title: '劳务人员id', showHeaderOverflow: false, width: '160px', align: 'center' },
            { field: 'suppUserName', title: '劳务人员名称', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
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
                showOverflow: true,
                showHeaderOverflow: true,
                minWidth: '160px',
                align: 'center'
            },
            // { field: 'banId', title: '所在班组id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'banName', title: '所在班组名称', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'labourCompanyId', title: '所在劳务公司id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'labourCompanyName', title: '所在劳务公司名称', width: "200px", showOverflow: true, showHeaderOverflow: true, align: 'center' },
            { field: 'overtimeDate', title: '加班日期', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'overtimeStateName', title: '审批状态', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: ["error", "info", "success", "warning", ''][row.overtimeState], round: "round", class: "grid-ntag" } as {},
                        {
                            default: () => row.overtimeStateName,
                            icon: () => h(
                                NwIcon,
                                {
                                    name: ["icon-n-n-error", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-warning", "icon-n-n-mark"][row.overtimeState]
                                }
                            )
                        }
                    )] as JSX.Element[]
                }
            },
            { field: 'amStartEnd_M_H', title: '上午', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'pmStartEnd_M_H', title: '下午', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'nightStartEnd_M_H', title: '晚上', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'amStartH', title: '上午开始-时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'amStartM', title: '上午开始-分', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'amEndH', title: '上午结束-时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'amEndM', title: '上午结束分', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'pmStartH', title: '下午开始-时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'pmStartM', title: '下午开始-分', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'pmEndH', title: '下午结束-时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'pmEndM', title: '下午结束分', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'nightStartH', title: '晚上开始-时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'nightStartM', title: '晚上开始-分', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'nightEndH', title: '晚上结束-时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'nightEndM', title: '晚上结束分', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'overLength', title: '加班时长', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'remark', title: '备注', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'overtimeState', title: '状态：1未办理、2已同意、3已拒绝', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'monitorRemark', title: '班组长备注', showOverflow: true, showHeaderOverflow: true, width: '160px', align: 'center' },
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
            // {
            //     title: '操作',
            //     showHeaderOverflow: true,
            //     align: 'center',
            //     slots: {
            //         default: ({ row }) => {
            //             let edit = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourAttendanceOvertimeForm_edit", params: [row] }
            //             );
            //             let del = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourAttendanceOvertimeForm_del", params: [row] }
            //             );
            //             //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
            //             return [edit, del]
            //         }
            //     },
            // }
        ]
    }, new RequestPaging(
        '/labour/labourAttendanceOvertime/page',
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
//是否可以勾选
const checkboxConfig = {
    checkField: 'checked',
    trigger: 'row',
    checkMethod: ({ row }) => row.overtimeStateName === '未办理'
} as VxeTablePropTypes.CheckboxConfig
let approveParamsArry = ref([{}])
let notApproveParamsArry = ref([{}])
//选中事件(组装修改的参数信息)
const checkboxChangeEvent = () => {
    approveParamsArry.value = [
        {
            approveOvertimeList: gridRef.value?.getCheckboxRecords(),
            // approveOvertimeIds: gridRef.value?.getCheckboxRecords().map((row) => row.id).join(),
            approveState: "1"
        }
    ],
        notApproveParamsArry.value = [
            {
                approveOvertimeList: gridRef.value?.getCheckboxRecords(),
                // approveOvertimeIds: gridRef.value?.getCheckboxRecords().map((row) => row.id).join(),
                approveState: "2"
            }
        ]
    // console.log(approveParamsArry)
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
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, approveParamsArry, notApproveParamsArry, checkboxChangeEvent, checkboxConfig, updataC, editEvent, isLoading, contractworkArry
}