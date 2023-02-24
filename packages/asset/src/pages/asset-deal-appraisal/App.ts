/**
 * @Description 鉴定申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-11-30 22:08:38
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page, NwIcon } from '@platform/main'
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
            // { field: 'dealApplyId', title: '处置申请单号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'code', title: '鉴定单号', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            { field: 'createUserName', title: '申请人', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            { field: 'sumAppraisalTotal', title: '申请数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            //{ field: 'auditSuccessTiem', title: '审批通过时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            //{ field: 'status', title: '鉴定状态', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'auditSuccessTiem', title: '审批完成时间', showHeaderOverflow: true, width: '160px', align: 'center', showOverflow: true },
            {
                field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, minWidth: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: auditStatusTypeArray[row.auditStatus], round: "round", class: "grid-ntag" } as {},
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
                slots: {
                    default: ({ row }) => {
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetAppraisalFormDel", params: [row] }
                        );
                        return row.auditStatus !== 0 ? [] : [del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetDealAppraisal/page',
        'post',
    )
)

const refresh = () => {
    reset({ dealApplyId: Page.getMenuData().id })
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        code: 'JD' + format(new Date(), "yyyyMMddHHmmss"), 
        dealApplyId: Page.getMenuData().id,
        applyTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        createUserParentDeptName: d.parentDeptName,
        createUserParentOrgName: d.parentOrgName,
        createUserName: d.userName
    }];
})
const gridSearchRef = ref();
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents
}