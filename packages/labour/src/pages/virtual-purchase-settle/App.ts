/**
 * @Description 虚拟订单-结算单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-12-08 09:49:08
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
const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'planId', title: '需求计划id', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'planName', title: '需求计划名称', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'contractPurchaseName', title: '关联采购合同名称', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'contractPurchaseCode', title: '关联采购合同code', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'contractPurchaseId', title: '关联采购合同id', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'virtualPurchaseId', title: '虚拟采购订单Id', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'finalType', title: 'stage阶段性结算;final最终结算;', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'cutOffTime', title: '结算截止时间', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'settleCode', title: '结算书编号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'amountNowSettle', title: '本次结算金额', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'amountNowSettleUpper', title: '本次结算金额(大写)', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'amountSettle', title: '已结算金额', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'amountSettleUpper', title: '已结算金额(大写)', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'purchaseFrameId', title: '关联采购 框架合同名称', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'purchaseFrameCode', title: '关联采购 框架合同code', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'purchaseFrameName', title: '关联采购 框架合同id', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
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
                            { code: "labourVirtualPurchaseSettleForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourVirtualPurchaseSettleForm_del", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourVirtualPurchaseSettle/page',
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
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridEvents
}