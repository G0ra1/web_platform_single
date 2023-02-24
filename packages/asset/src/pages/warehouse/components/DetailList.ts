import { NwIcon } from '@platform/main';
/**
 * @Description 仓库
 * @author 云数网讯 @netwisd.com
 * @date 2022-12-22 17:38:24
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { MdmOrgVo } from '@platform/mdm'
import { Tag } from 'tdesign-vue-next';
import { houseType } from "../../../lib/constant/Constant";
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
                field: 'warehouseName', title: '仓库名称', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true,
                slots: {
                    default: ({ row }) => [h(
                        NwFunctionPredefine,
                        { code: "warehouseDetailView", descr: "仓库名称", params: [row] },
                        {
                            auth: (fn: any) => {
                                return h(
                                    'a',
                                    { href: "javascript:void", textDecoration: 'none', onClick: fn, style: "color:#1d7ced;cursor: pointer;" },
                                    row.warehouseName
                                )
                            },
                            unauth: () => row.warehouseName
                        }


                    )]
                }

            },
            { field: 'orgName', title: '责任主体', minWidth: '120px', align: 'center', showOverflow: true },
            { field: 'deptName', title: '责任部门', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'respondUserName', title: '责任人', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                field: 'houseType', title: '仓库类型', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }: any) => row.houseType == '1' ? '仓库' : row.houseType == '3' ? '位置信息' : '虚拟仓库'
                }
            },
            { field: 'address', title: '地点', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'remark', title: '备注', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '150px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let info = h(
                            NwFunctionPredefine,
                            { name: "icon-n-y-editpage", code: "assetWarehouseFormInfo", params: [row], style: "cursor: pointer;margin-left:5px;", size: 18 }
                        );
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetWarehouseFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetWarehouseFormDel", params: [row] }
                        );
                        // return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                        return row.houseType == 1 ? [info, edit, del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/warehouse/list',
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
    } else {
        if (value.orgType === 1) {
            filterData.value.orgId = value.id;
        } else {
            filterData.value.deptId = value.id;
        }
    }
    refresh(filterData.value);
}


export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, handleClick
}