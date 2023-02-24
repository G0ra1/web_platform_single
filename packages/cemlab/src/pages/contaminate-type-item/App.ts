/**
 * @Description 污染实验配方-字典项
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 10:40:43
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
            { field: 'dictItemName', title: '字典项名称', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'dictItemCode', title: '字典项编码', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
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
                            { code: "dictItemFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "dictItemFormDel", params: [row] }
                        );
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/main/dictItem/page',
        'post'
    )
)

const refresh = () => {
    reset({ dictCode: 'CONTAMINATE_TYPE' })
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        dictCode: 'CONTAMINATE_TYPE'
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}