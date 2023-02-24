/**
 * @Description 资产退还
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-28 15:39:16
 */

import { ref, h } from 'vue';
import { RequestPaging, Page, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main';
import { NTag } from 'naive-ui';
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
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            {
                field: 'code', title: '编号', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots: {
                    default: ({ row }) => {
                        let a = h(
                            "a",
                            {
                                href: 'javascript:void(0)',
                                style: 'text-decoration: none',
                                onClick: () => {
                                    Page.toLevel2Menu('id', row.id, 'code', row.code)
                                }
                            },
                            { default: () => row.code }
                        );
                        let b = h(
                            "any",
                            {},
                            { default: () => row.code }
                        );
                        return row.auditStatus !== 2 ? [b] : [a]
                    }
                }



            },
            // { field: 'applyUserName', title: '申请人', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserDeptName', title: '申请人部门', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalAmount', title: '合计金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'auditSuccessTiem', title: '审批完成时间', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            {
                field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, minWidth: '100px', align: 'center',
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
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialRefundFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetMaterialRefundFormDel", params: [row] }
                        );
                        return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetMaterialRefund/page',
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
        applyUserId: d.id,
        applyUserName: d.userName,
        applyUserOrgId: d.parentOrgId,
        applyUserOrgName: d.parentOrgName,
        applyUserDeptId: d.parentDeptId,
        applyUserDeptName: d.parentDeptName,
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