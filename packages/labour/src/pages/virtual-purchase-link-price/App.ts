/**
 * @Description 采购合同单价管理
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
            { field: 'purchaseLinkId', title: '虚拟订单id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractName', title: '合同名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractCode', title: '合同code', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'outerDisciplineId', title: '专业(规格型号);字典编码outer_discipline', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'outerDisciplineName', title: '专业名称(规格型号)', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'restMode', title: '休息方式;1单休2双休3不休', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'unit', title: '单位;1人/天2人/月', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'number', title: '数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'price', title: '价格', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'priceNotax', title: '价格不含税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'totalAmount', title: '总价含税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'totalAmountNotax', title: '总价不含税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "labourVirtualPurchaseLinkPriceFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourVirtualPurchaseLinkPriceFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourVirtualPurchaseLinkPrice/page',
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