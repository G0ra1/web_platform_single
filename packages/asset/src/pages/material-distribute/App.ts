/**
 * @Description 资产派发
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:22
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'

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
            { field: 'code', title: '编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'sumTotalAmount', title: '合计金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'sumTotalUntaxedAmount', title: '合计金额-未税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'sumTotalTaxAmount', title: '合计金额-税额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'type', title: '业务类型', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'distributeType', title: '派发类型', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'sourceCode', title: '', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalNumber', title: '合计申请数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'signNumber', title: '签收数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'notSignNumber', title: '未签收数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'auditSuccessTiem', title: '审批通过时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
                {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialDistributeFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialDistributeFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/materialDistribute/list',
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
        sourceId : Page.getMenuData().id,
        sourceCode : Page.getMenuData().code
     }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}