/**
 * @Description 实验单任务
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-30 10:05:17
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
            { type: "seq", title: '序号', width: 50, align: 'center', minWidth: 50 },
            {
                field: 'taskName', title: '任务名称', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [
                        h(
                            NwFunctionPredefine,
                            { code: "taskView", descr: "任务详细信息", params: [row] },
                            {
                                auth: (fn: any) => {
                                    return h(
                                        'a',
                                        { href: "javascript:void", style: 'text-decoration: none', onClick: fn },
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
                    default: ({ row }) => {
                        //实验过程录入
                        let normal = h(
                            NwFunctionPredefine,
                            { code: "cemlabExperimentTaskForm", params: [row] }
                        );
                        //污染实验过程录入
                        let contaminate = h(
                            NwFunctionPredefine,
                            { code: "cemlabContaminateExperimentTaskForm", params: [row] }
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
    reset({ experimentReceiptsId: Page.getMenuData().id, type: 2 })
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        createUserName: d.userName,
        experimentReceiptsId: Page.getMenuData().id
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}