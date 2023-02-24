/**
 * @Description 物资验收入库
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:11
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
            { field: 'code', title: '申请编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

            { field: 'assetSourceName', title: '物项来源', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots:{
                    default : ({ row }) => [h(
                        NTag,
                        { size: "small", type: "primary" } as {},
                        { default: () => row.assetSourceName }
                    )] as JSX.Element[]
                }
            },
            { field: 'sumTotalAmount', title: '合计金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalUntaxedAmount', title: '合计金额-未税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalTaxAmount', title: '合计金额-税额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalNumber', title: '入库数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

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
                            { code: "assetPurchaseStorageFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseStorageFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    },
                },
            }
        ]
    }, new RequestPaging(
        '/asset/purchaseStorage/list',
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
    console.log(Page.getMenuData().assetSource);
    paramsArray.value = [{
        
        applyId: Page.getMenuData().id,
        applyCode: Page.getMenuData().code,
        // acceptanceId: Page.getMenuData().id,
        // acceptanceCode: Page.getMenuData().code,
        
        assetSource: Page.getMenuData().assetSource ? Page.getMenuData().assetSource:1,
        assetSourceName : Page.getMenuData().assetSource ? Page.getMenuData().assetSource:'采购'
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}