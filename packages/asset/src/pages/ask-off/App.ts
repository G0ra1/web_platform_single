/**
 * @Description 请假申请单
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-14 23:31:14
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
            { field: 'applyUserId', title: '申请人id', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'applyType', title: '请假类型', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'applyDay', title: '请假天数', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'applyReason', title: '请假原因', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'applyStartDate', title: '请假开始时间', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'applyEndDate', title: '请假结束时间', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
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
                            { code: "platformAskOffForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "platformAskOffForm_del", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/platform/platformAskOff/page',
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