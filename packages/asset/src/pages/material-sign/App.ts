/**
 * @Description 资产签收
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:27
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
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
            { field: 'code', title: '编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'signType', title: '签收类型;派发签收、', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
         
            // { field: 'signUserName', title: '签收人姓名', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            // { field: 'signUserParentOrgName', title: '签收人父级机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
          
            // { field: 'signUserParentDeptName', title: '签收人父级部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'sumTotalNumber', title: '合计数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'signTime', title: '签收时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'auditSuccessTiem', title: '审批通过时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
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
                            { code: "assetMaterialSignFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialSignFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/materialSign/list',
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
        sourceId : Page.getMenuData().id,
        sourceCode : Page.getMenuData().code
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}