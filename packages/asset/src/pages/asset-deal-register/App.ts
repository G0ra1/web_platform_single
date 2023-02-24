/**
 * @Description 处置登记申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-13 18:02:08
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
            { field: 'code', title: '编号', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            { field: 'createUserName', title: '申请人', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            //{ field: 'dealApplyId', title: '处置申请id', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            //{ field: 'auditSuccessTime', title: '审批通过时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'registerNumber', title: '登记数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center', showOverflow: true },
            { field: 'auditSuccessTime', title: '审批完成时间', showHeaderOverflow: true, width: '160px', align: 'center', showOverflow: true },
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
                            }, icon: () => h(
                                NwIcon,
                                {
                                    name: nwIconArray[row.auditStatus]
                                }
                            )

                        }
                    )] as JSX.Element[]
                }
            },

            // { field: 'camundaTaskId', title: 'camunda流程任务ID', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'status', title: '登记状态', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'planYear', title: '计划年度', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'fileIds', title: '附件ids', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'fileNames', title: '附件names', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            // { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {

                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetDealRegisterFormDel", params: [row] }
                        );
                        return row.auditStatus !== 0 ? [] : [del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetDealRegister/page',
        'post'
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
        code: 'DJ' + format(new Date(), "yyyyMMddHHmmss"),
        dealApplyId: Page.getMenuData().id,
        applyTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        createUserParentDeptName: d.parentDeptName,
        createUserParentOrgName: d.parentOrgName,
        createUserName: d.userName
    }];
})
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents
}