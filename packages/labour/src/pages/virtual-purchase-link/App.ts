/**
 * @Description 虚拟订单
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
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
            { field: 'planId', title: '需求计划id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'planName', title: '需求计划名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'virtualPurchaseName', title: '虚拟订单名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'virtualPurchaseCode', title: '虚拟订单code', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'virtualPurchaseId', title: '虚拟订单id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractPurchaseId', title: '关联采购合同id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractPurchaseCode', title: '采购合同code', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractPurchaseName', title: '采购合同name', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "labourVirtualPurchaseLinkFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourVirtualPurchaseLinkFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourVirtualPurchaseLink/page',
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

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}