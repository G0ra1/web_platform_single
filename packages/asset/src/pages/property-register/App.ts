/**
 * @Description 知识产权登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2023-01-10 17:30:06
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
            { field: 'code', title: '知识产权编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'name', title: '知识产权名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'typeName', title: '类别', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyDate', title: '申请日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'inventUserName', title: '发明人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'propertyUserName', title: '产权人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUnitName', title: '编制单位', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyDate', title: '申请日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'authDate', title: '授权日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'validPeriod', title: '有效期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "assetPropertyRegisterFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetPropertyRegisterFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetPropertyRegister/page',
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