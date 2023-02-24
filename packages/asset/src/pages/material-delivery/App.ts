/**
 * @Description 资产出库管理
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-06 13:43:55
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui';
import { format } from "date-fns";
import { auditStatusArray,auditStatusTypeArray } from "../../lib/constant/Constant";



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
            { type: "seq", width: 50, align: 'center', minWidth: 50 },
            { field: 'code', title: '申请编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, width: '160px', align: 'center' },
/*             { field: 'deliveryNumber', title: '出库数量', showHeaderOverflow: true, width: '120px', align: 'center' },
 */           /*  { field: 'notDeliveryNumber', title: '未出库数量', showHeaderOverflow: true, width: '120px', align: 'center' }, */
            { field: 'explanation', title: '说明', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                  default: ({ row }) => [h(
                    NTag,
                    { size: "small", type: auditStatusTypeArray[row.auditStatus] } as {},
                    { default: () => auditStatusArray[row.auditStatus] }
                  )] as JSX.Element[]
                }
              },
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
                width: '130px',
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialDeployFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialDeployFormDel", params: [row] }
                        );
                          return row.auditStatus !== 0 ? [] : [del]
                        //return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/materialDelivery/list',
        'post'
    )
)

const refresh = () => {
reset({deployId:Page.getMenuData().id})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        applyUserName: d.userNameCh,
        applyUserDeptName: d.parentDeptName,
        applyUserId: d.id,
        applyUserDeptId: d.parentDeptId,
        applyUserOrgId:d.parentOrgId,
       applyUserOrgName: d.parentOrgName, applyTime:format(new Date(), "yyyy-MM-dd HH:mm:ss"),deployId:Page.getMenuData().id }];
    })

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}