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
const sampleTypeArray = ["", "小样", "大样", "半大样"];
const receiptsTypeArray = ["", "内部通知单", "委托合同单"];
const statusArray = ["", "未完成", "已完成"];

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { type: 'seq', minWidth: '50px' },
            {
                field: 'code',
                title: '单号',
                showHeaderOverflow: true,
                minWidth: '160px',
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let insideInfo = h(
                            NwFunctionPredefine,
                            { code: "insideTaskDetailView", descr: "查看", params: [row] },
                            {
                                auth: (fn: any) => {
                                    return h(
                                        'a',
                                        { href: "javascript:void", style: 'text-decoration: none', onClick: fn },
                                        row.code
                                    )
                                },
                                unauth: () => row.code
                            }
                        )
                        let entrustInfo = h(
                            NwFunctionPredefine,
                            { code: "entrustTaskDetailView", descr: "查看", params: [row] },
                            {
                                auth: (fn: any) => {
                                    return h(
                                        'a',
                                        { href: "javascript:void", style: 'text-decoration: none', onClick: fn },
                                        row.code
                                    )
                                },
                                unauth: () => row.code
                            }
                        )
                        return row.type === 1 ? insideInfo : row.type === 2 ? entrustInfo : [];
                    }

                }
            },
            { field: 'createUserParentOrgName', title: '所属单位', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'wellsNumber', title: '井号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'casingSize', title: '套管尺寸', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'cementingMode', title: '固井方式', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                field: 'sampleType', title: '样品类型', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots: {
                    default: ({ row }: any) => {
                        return h("span", {}, sampleTypeArray[row.sampleType])
                    }
                },
            },
            {
                field: 'type', title: '任务类型', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots: {
                    default: ({ row }: any) => {
                        return h("span", {}, receiptsTypeArray[row.type])
                    }
                }
            },
            { field: 'experimentUserName', title: '实验人员', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'finishDate', title: '完成日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                field: 'status', title: '状态', showHeaderOverflow: true, minWidth: '160px', align: 'center',
                slots: {
                    default: ({ row }: any) => {
                        return h("span", {}, statusArray[row.status])
                    }
                }
            },
            { field: 'createUserName', title: '创建人', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'createTime', title: '创建日期', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }: any) => {
                        let experiment = h(
                            "a",
                            {
                                href: 'javascript:void(0)',
                                style: 'text-decoration: none',
                                onClick: () => {
                                    Page.toLevel2Menu('id', row.id, 'code', row.code, "", row, (m, r) => {
                                        if (r.type == 2 && m.key === "experiment-task-in") {
                                            return false;
                                        } else if (r.type == 1 && m.key === "experiment-task-out") {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    })
                                }
                            },
                            { default: () => '实验' }
                        );
                        return [experiment]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabExperimentReceipts/page',
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
    paramsArray.value = [{ createUserName: d.userName }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}