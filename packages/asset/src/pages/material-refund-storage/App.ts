/**
 * @Description 物资调拨入库
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-22 15:30:24
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { format } from "date-fns";
import { auditStatusArray,auditStatusTypeArray } from "../../lib/constant/Constant";



/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'code', title: '申请编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            /* { field: 'sumTotalAmount', title: '合计金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalUntaxedAmount', title: '合计金额-未税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalTaxAmount', title: '合计金额-税额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalNumber', title: '合计申请数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' }, */
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

            { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
/*             { field: 'fileIds', title: '附件ids', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
 */                {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetRefundStorageFormEdit", params: [row] }
                        ); 
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetRefundStorageFormDel", params: [row] }
                        );
                        return row.auditStatus !== 0 ? [] : [del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetMaterialRefundStorage/page',
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
    paramsArray.value = [{   applyUserId : d.id,
        applyUserName: d.userNameCh,
        applyUserOrgId : d.parentOrgId,
        applyUserOrgName : d.parentOrgName,
        applyUserDeptId :d.parentDeptId,
        applyUserDeptName :d.parentDeptName,
        createUserId : d.id,
        createUserName: d.userName,
        createUserParentOrgId : d.parentOrgId,
        createUserParentOrgName : d.parentOrgName,
        createUserParentDeptId :d.parentDeptId,
        createUserParentDeptName: d.parentDeptName,
        deployId:Page.getMenuData().id,
        applyTime : format(new Date(), "yyyy-MM-dd HH:mm:ss") }];
})      

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}