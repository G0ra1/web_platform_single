/**
 * @Description 二级物资集中采购项目进度情况表
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-13 16:10:03
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
            { field: 'itemTime', title: '年份', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'materialsTypeName', title: '大类名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'projectName', title: '项目名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'finishTime', title: '要求完成时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'unitName', title: '组长单位名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'floatRange', title: '浮动范围', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'pricingMechanism', title: '调价机制', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'resultPublic', title: '结果公告', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'priceAdjustment', title: '价格调整公示', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'postponePublic', title: '延期公告', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'others', title: '其他事项', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'explanation', title: '备注', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'procurementMethodName', title: '采购方式', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'taskStatus', title: '完成状态', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

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
                            { code: "suppPurchaseProgressForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "suppPurchaseProgressForm_del", params: [row] }
                        );
                        let edit2 = h(
                            NwFunctionPredefine,
                            { code: "suppPurchaseProgressForm_edit2", params: [{ ...row},2] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, edit2, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/supp/purchaseProgress/page',
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