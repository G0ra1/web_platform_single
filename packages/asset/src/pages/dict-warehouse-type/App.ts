/**
 * @Description 仓库类型字典
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-21 16:25:32
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, Page, NwFunctionPredefine, Db } from '@platform/main'
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
            { field: 'dictItemName', title: '字典名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'dictItemCode', title: '字典编码', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                minWidth: '100px',
                align: 'center',
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
const isShow = ref(false)
// let resultDetail: DictItem;
// //根据类型字典type查找当前字典的id

// const detailCodeFn = async () => {
//     isShow.value = true;
//     resultDetail = await getByType('asset_warehouse');
// }
// //调用
// detailCodeFn();
const refresh = () => {
    reset({ dictCode: "asset_warehouse" })
}

/**
 * dictId  字典id
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    isShow.value = false
    paramsArray.value = [{
        dictCode: "asset_warehouse"
    }];

})
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, isShow
}