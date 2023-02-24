/**
 * @Description 物资调拨入库
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-22 15:30:24
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db,Page,NwIcon } from '@platform/main'
import { NTag } from 'naive-ui'
import { format } from "date-fns";
import { auditStatusArray, auditStatusTypeArray, nwIconArray } from "../../lib/constant/Constant";



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
const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'code', title: '申请编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserDeptName', title: '申请人部门名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        {
                            size: "small", type: auditStatusTypeArray[row.auditStatus]
                            , round: "round", class: "grid-ntag"
                        } as {},
                        {
                            default: () => {
                                if (row.auditStatus || row.auditStatus === 0) {
                                    return auditStatusArray[row.auditStatus]
                                }
                                if (row.auditStatus === null) {
                                    return '无';
                                }
                            },
                            icon: () => h(
                                NwIcon,
                                {
                                    name: nwIconArray[row.auditStatus]
                                }
                            )

                        }
                    )] as JSX.Element[]
                }
            },
                {
                title: '操作',
                field: 'action',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                width: "180px",
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialStorageFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialStorageFormDel", params: [row] }
                        );
                        return row.auditStatus !== 0 ? [] : [del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/materialDeployStorage/page',
        'post'
    )
)

const refresh = () => {
    reset({deployId:Page.getMenuData().id})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);

Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        applyUserName: d.userNameCh,
        applyUserDeptName: d.parentDeptName,
        applyUserId: d.id,
        applyUserDeptId: d.parentDeptId,
        applyUserOrgId:d.parentOrgId,
       applyUserOrgName: d.parentOrgName, applyTime:format(new Date(), "yyyy-MM-dd HH:mm:ss"),deployId:Page.getMenuData().id }];
    })
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents
}