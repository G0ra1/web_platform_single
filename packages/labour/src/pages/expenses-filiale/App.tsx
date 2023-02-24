/**
 * @Description 费用填报-分公司
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2022-12-04 16:23:48
 */
import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db,Page,NwIcon } from '@platform/main'
import { NTag } from 'naive-ui'

/**a
 * 初始化弹出框组件
 */
//审批状态
const _statusArray = ["草稿", "审批中", "审批通过", "审批未通过"];

 let dialogLocal: any;
 function initDialog(dialog: any) {
     dialogLocal = dialog;
 }
const { bind, gridRef, filterData, query, reset ,gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { 
                field: 'filialecode', title: '填报编号', showHeaderOverflow: true, showOverflow:true, width: '180px', align: 'center',
                slots:{
                    default: ({row}) => {
                        return h(
                            NwFunctionPredefine,
                            {code: "expensesFilialeDetail", params:[row] },
                            {unauth :()=>{return row.filialecode},auth:(fn:any)=>{
                                return [
                                    h(
                                        'a',
                                        {
                                            href: 'javascript:void(0)',
                                            style: 'text-decoration: none',
                                            onClick: () => {
                                                fn()
                                            }
                                        },
                                        { default: () => row.filialecode }
                                    )
                                ]
                            }}
                        )
                    }
                }
            },
            { field: 'contractWorkCode', title: '承包合同编号', showHeaderOverflow: true, showOverflow:true,width: '160px', align: 'center' },
            { field: 'contractWorkName', title: '承包合同名称', showHeaderOverflow: true,showOverflow:true, width: '350px', align: 'center' },
            { field: 'virtualPurchaseCode', title: '虚拟订单编号', showHeaderOverflow: true, showOverflow:true, align: 'center' },
            { field: 'virtualPurchaseName', title: '虚拟订单名称', showHeaderOverflow: true, showOverflow:true, align: 'center' },
            { field: 'fillDateTime', title: '填报时间', showHeaderOverflow: true,  showOverflow:true, width: '160px', align: 'center' },
            { field: 'overhaulCode', title: '大修编码', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
            { field: 'overhaulName', title: '大修名称', showHeaderOverflow: true,showOverflow:true, width: '160px', align: 'center' },
            { 
                field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '160px', align: 'center',
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
            //     {
            //     title: '操作',
            //     showHeaderOverflow: true,
            //     align: 'center',
            //     slots: {
            //         default: ({ row }) => {
            //             let edit = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourExpensesFilialeForm_edit", params: [row] }
            //             );
            //             let del = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourExpensesFilialeForm_del", params: [row] }
            //             );
            //             //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
            //             return [edit, del]
            //         }
            //     },
            // }
        ]
    }, new RequestPaging(
        '/labour/labourExpensesFiliale/page',
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
   
    paramsArray.value = [{ createUserName: d.userName }, Page.getMenuData()];
})

const gridSearchRef = ref()

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents
}