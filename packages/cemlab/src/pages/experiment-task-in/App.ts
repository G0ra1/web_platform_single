/**
 * @Description 实验单
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-09 12:09:27
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
            { type: 'seq', minWidth: '20px', title: '序号', align: 'center' },
            {
                field: 'taskName',
                title: '实验任务',
                showHeaderOverflow: true,
                minWidth: '160px',
                align: 'center',
                slots: {
                    default: ({ row }) => [
                        h(
                            NwFunctionPredefine,
                            { code: "experiment-task-inside-detail", descr: "任务详细信息", params: [row] },
                            {
                                auth: (fn: any) => {
                                    return h(
                                        'a',
                                        { href: "javascript:void", textDecoration: 'none', onClick: fn },
                                        row.taskName
                                    )
                                },
                                unauth: () => row.taskName
                            }
                        )
                    ]
                }
            },
            { field: 'experimentUserName', title: '实验人员', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'finishDate', title: '完成日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'createUserName', title: '创建人', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'createTime', title: '创建日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '220px',
                fixed: 'right',
                slots: {
                    default: ({ row }: any) => {
                        let normal = h(
                            NwFunctionPredefine,
                            { code: "experiment-process-in-normal", params: [row] }
                        );
                        let contaminate = h(
                            NwFunctionPredefine,
                            { code: "experiment-process-in-contaminate", params: [row] }
                        );
                        return [normal, contaminate]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabExperimentTask/page',
        'post'
    )
)

const refresh = () => {
    reset({ experimentReceiptsId: Page.getMenuData().id, type: 1 })
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