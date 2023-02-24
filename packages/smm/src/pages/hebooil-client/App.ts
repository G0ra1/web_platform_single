/**
 * @Description 原油项目客户维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-08 13:45:28
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { format } from "date-fns";

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
            { field: 'projectCode', title: '项目编码', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'projectName', title: '项目名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
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
                            { code: "smmHebooilClientFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "smmHebooilClientFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/smm/smmHebooilClient/page',
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
        createUserId: d.id,
        createUserName: d.userName,
        createUserParentOrgId: d.parentOrgId,
        createUserParentOrgName: d.parentOrgName,
        createUserParentDeptId: d.parentDeptId,
        createUserParentDeptName: d.parentDeptName,
        applyTime: format(new Date(), "yyyy-MM-dd HH:mm:ss")
        
    
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}