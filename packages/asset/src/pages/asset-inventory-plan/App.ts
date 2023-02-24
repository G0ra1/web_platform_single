/**
 * @Description 物资盘点
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-11-28 18:34:31
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { auditStatusArray, auditStatusTypeArray} from '../../lib/constant/Constant';
import { format } from "date-fns";

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
            { field: 'code', title: '编号', showHeaderOverflow: true, width: '160px', align: 'center' ,
                slots: {
                    default: ({ row }) => {
                        return(
                            typeof(row.auditStatus) === 'undefined' 
                            || row.auditStatus === null
                            || row.auditStatus === '' 
                            || row.auditStatus !== 2 
                        )   
                        ?h("p",{style: 'text-decoration: none'},{ default: () => row.code }) 
                        :h(
                            "a",
                            {
                                href: 'javascript:void(0)',
                                style: 'text-decoration: none',
                                onClick: () => {
                                    Page.toLevel2Menu('id', row.id, 'code', row.code)
                                }
                            },
                            { default: () => row.code }
                        )
                    }
                }    
            },
            
            // { field: 'camundaTaskId', title: 'camunda流程任务ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'inventoryYear', title: '盘点年度', showHeaderOverflow: true, width: '160px', align: 'center' },
            
            { field: 'sumTotalNumber', title: '计划总数量', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'finishNumber', title: '已盘点数量', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'notFinishNumber', title: '未盘点数量', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'createUserName', title: '申请人', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'auditSuccessTiem', title: '审批通过时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '160px', align: 'center' ,
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: auditStatusTypeArray[row.auditStatus] } as {},
                        {
                            default: () => {
                                
                                return (typeof(row.auditStatus) === 'undefined' 
                                        || row.auditStatus === null
                                        || row.auditStatus === '' 
                                        || row.auditStatus === 0 
                                        ) ? '无' : auditStatusArray[row.auditStatus]
                        


                            }

                        }
                    )] as JSX.Element[]
                }
            },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        // let edit = h(
                        //     NwFunctionPredefine,
                        //     { code: "asset-inventory-plan-form_edit", params: [row] }
                        // );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetInventoryPlanFormDel", params: [row] }
                        );
                        // return row.camundaProcinsId !== "" ? '' : [ del]
                        return (
                                typeof(row.auditStatus) === 'undefined' 
                                || row.auditStatus === 0 
                                || row.auditStatus === null
                                || row.auditStatus === '' 
                                )? [del] : []
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/inventoryPlan/page',
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
    paramsArray.value = [{ 
        createUserId : d.id,
        createUserName: d.userName,
        createUserParentOrgId : d.parentOrgId,
        createUserParentOrgName : d.parentOrgName,
        createUserParentDeptId :d.parentDeptId,
        createUserParentDeptName :d.parentDeptName,
        applyTime : format(new Date(), "yyyy-MM-dd HH:mm:ss")
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}