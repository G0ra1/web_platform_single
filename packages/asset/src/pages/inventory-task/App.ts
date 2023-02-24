/**
 * @Description 盘点任务
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-06 17:59:32
 */

import { ref, h } from 'vue';
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main';
import { NTag } from 'naive-ui';
import { format } from "date-fns";
import { auditStatusArray, auditStatusTypeArray} from '../../lib/constant/Constant';

const taskStatusArray = ['未盘点','盘点中','已盘点'];

const inventoryPlanId = Page.getMenuData().id;
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
            { field: 'code', title: '编号', showHeaderOverflow: true,  align: 'center' ,
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
            { field: 'sumTotalNumber', title: '计划总数量', showHeaderOverflow: true, align: 'center' },
            { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, align: 'center' },
            // { field: 'finishNumber', title: '完成数量', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'notFinishNumber', title: '未完成数量', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'createUserParentOrgId', title: '申请机构', showHeaderOverflow: true, align: 'center' },
            { field: 'createUserParentDeptName', title: '申请部门', showHeaderOverflow: true, align: 'center' },
            { field: 'createUserName', title: '申请人', showHeaderOverflow: true, align: 'center' },
            { field: 'createTime', title: '创建时间', showHeaderOverflow: true, align: 'center' },
            { field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, align: 'center' ,
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
                                        ) ? '未盘点' : taskStatusArray[row.auditStatus]
                            }

                        }
                    )] as JSX.Element[]
                }
            },
            { title: '操作', showHeaderOverflow: true, align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetInventoryTaskFormEdit", params: [row] }
                        );
                        
                        // let del = h(
                        //     NwFunctionPredefine,
                        //     { code: "assetInventoryTaskFormDel", params: [row] }
                        // );
                        return [edit] 
                        // return (
                        //     typeof(row.auditStatus) === 'undefined' 
                        //     || row.auditStatus === 0 
                        //     || row.auditStatus === null
                        //     || row.auditStatus === '' 
                        //     )? [del] : []
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetInventoryTask/page',
        'post'
    )
)

const refresh = () => {
    reset({inventoryPlanId : inventoryPlanId})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ 
        createUserName: d.userName,
        createUserParentOrgId : d.parentOrgId,
        createUserParentOrgName : d.parentOrgName,
        createUserParentDeptId :d.parentDeptId,
        createUserParentDeptName :d.parentDeptName,
        applyTime : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        inventoryPlanId : inventoryPlanId
     }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,inventoryPlanId
}