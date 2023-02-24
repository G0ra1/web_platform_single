/**
 * @Description 采购合同扩展信息
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
            { field: 'purchaseLinkId', title: '关联虚拟订单id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'taxrateName', title: '税率', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'taxrate', title: '税率', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'invoiceTypeName', title: '发票类型', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'invoiceType', title: '发票类型', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'workHourAmount', title: '工时时薪', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'overtimeHourAmount', title: '加班时薪', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'workdayOvertimeCoefficient', title: '工作日加班倍数', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'dayOffOvertimeCoefficient', title: '休息日加班倍数', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'legalDayOffOvertimeCoefficient', title: '法定休假日加班倍数', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractname', title: '合同名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractcode', title: '合同code', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'partaname', title: '甲方单位', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'planId', title: '需求计划id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "labourVirtualPurchaseLinkExtendFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourVirtualPurchaseLinkExtendFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourVirtualPurchaseLinkExtend/page',
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