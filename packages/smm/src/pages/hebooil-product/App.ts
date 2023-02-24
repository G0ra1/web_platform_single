/**
 * @Description 其它石油产品客户基础数据维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-14 11:00:33
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
            { field: 'productCode', title: '产品编码', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'productName', title: '产品名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'explanation', title: '备注', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "smmHebooilProductFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "smmHebooilProductFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/smm/smmHebooilProduct/page',
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