import { values } from 'lodash';
/**
 * @Description 物资税率
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-21 16:25:32
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, Page, NwFunctionPredefine, Db } from '@platform/main'
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
            { field: 'dictItemName', title: '字典名称', showHeaderOverflow: true, minWidth: '160px', align: 'center', },
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
//根据类型字典type查找当前字典的id
const isShow = ref(false);
const refresh = () => {
    reset({
        dictCode: "ASSETS_TAX_RATE",
    })
}

/**
 * dictCode  字典code
 */


let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    isShow.value = false;
    paramsArray.value = [{
        //初始化添加参数
        dictCode: "ASSETS_TAX_RATE"
    }];

})


export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, isShow
}