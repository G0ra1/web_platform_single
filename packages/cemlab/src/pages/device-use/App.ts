/**
 * @Description 设备使用
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:48:35
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
            { type: "seq", title: '序号', width: 50, align: 'center', minWidth: 50 },
            { field: 'deviceNames', title: '设备名称', showHeaderOverflow: true, minWidth: '300px', align: 'left' },
            { field: 'createUserParentOrgName', title: '所属单位', showHeaderOverflow: true, width: '100px', align: 'center' },
            { field: 'createUserName', title: '创建人', showHeaderOverflow: true, width: '100px', align: 'center' },
            { field: 'createTime', title: '创建日期', showHeaderOverflow: true, width: '150px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                width: '180px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let detail = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceUseFormDetail", params: [row] }
                        );
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceUseFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceUseFormDel", params: [row] }
                        );
                        return [detail, edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabDeviceUse/page',
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
        createUserName: d.userName


    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}