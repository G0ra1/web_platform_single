/**
 * @Description 物资购置验收
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:04
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
            { field: 'code', title: '验收编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'applyCode', title: '购置申请编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },     
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

            { field: 'sumTotalNumber', title: '合计验收数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'status', title: '验收状态', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'storageNumber', title: '入库数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'notStorageNumber', title: '未入库数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'notStorageAmount', title: '未入库金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "assetPurchaseAcceptFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseAcceptFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/purchaseAccept/list',
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
        applyId: Page.getMenuData().id, 
        applyCode: Page.getMenuData().code,
        registerId: Page.getMenuData().id, 
        registerCode: Page.getMenuData().code 
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}