import { id } from 'date-fns/locale';
import { values } from 'lodash';
/**
 * @Description 物资分类
 * @author 云数网讯 @netwisd.com
 * @date 2022-12-22 17:38:24
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { MdmOrgVo } from '@platform/mdm'
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
            { type: "seq", width: 50, align: 'center', minWidth: 50 },
            {
                field: 'itemName', title: '物资名称', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true,
                slots: {
                    default: ({ row }) => [h(
                        NwFunctionPredefine,
                        { code: "assetDetailView", descr: "物资详情", params: [row] },
                        {
                            auth: (fn: any) => {
                                return h(
                                    'a',
                                    { href: "javascript:void", textDecoration: 'none', onClick: fn, style: "color:#1d7ced;cursor: pointer;" },
                                    row.itemName
                                )
                            },
                            unauth: () => row.itemName
                        }


                    )]
                }
            },
            { field: 'itemCode', title: '物资编码', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true },
            { field: 'descshort', title: '短描述', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            { field: 'desclong', title: '长描述', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            { field: 'unitName', title: '物资单位', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true },
            { field: 'state', title: '状态', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: 120,
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "mdmItemFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "mdmItemFormDel", params: [row] }
                        );
                        //return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        'mdm/item/list',
        'post',
    )
)

const refresh = (params: object) => {

    reset(params)
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})




const handleClick = (value: string | MdmOrgVo) => {
    filterData.value = {};
    if (typeof value === "string") {
        filterData.value.classifyId = value;
        filterData.value.isDefault = 1;
    } else {
        if (value.orgType === 1) {
            filterData.value.assetOrgId = value.id;
        } else {
            filterData.value.assetDeptId = value.id;
        }
    }
    refresh(filterData.value);
}

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, handleClick
}