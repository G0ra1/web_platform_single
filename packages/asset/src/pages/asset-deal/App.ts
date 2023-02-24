/**
 * @Description 处置申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-11-28 23:25:32
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, Page, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
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
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { type: "seq", width: 50, align: 'center', minWidth: 50 },
            {
                field: 'code', title: '编号', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true,
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
            { field: 'createUserName', title: '申请人', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            { field: 'createUserParentOrgName', title: '申请人部门', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            { field: 'sumTotalNumber', title: '申请数量', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'notAppraisalNum', title: '未鉴定数量', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'totalAppraisalNum', title: '已鉴定数量', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'notRegisterNum', title: '未登记数量', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'totalRegisterNum', title: '已登记数量', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
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
                minWidth: '100px',
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        // let edit = h(
                        //     NwFunctionPredefine,
                        //     { code: "assetDealFormEdit", params: [row] }
                        // );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetDealFormDel", params: [row] }
                        );
                        return row.auditStatus !== 0 ? [] : [del]
                        //return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetDeal/page',
        'post',
    )
)

const refresh = () => {
    reset({})
}
/**
 * 传递用户参数例子
 * assetOrgId  申请人的组织id选择当前组织下的物资
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        code: 'CZ' + format(new Date(), "yyyyMMddHHmmss"),
        applyTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        createUserParentDeptName: d.parentDeptName,
        createUserParentOrgName: d.parentOrgName,
        createUserName: d.userName,
        createUserParentOrgId: d.parentOrgId,
    }];
})
const gridSearchRef = ref()

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents
}