/**
 * @Description 实验流程规范
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 09:49:36
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { docType, isFlashview } from '../../lib/constant/Constant';
let apiBaseURL = window.localStorage.getItem('apiBaseURL');
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
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
            { type: "seq", title: '序号', width: 50, align: 'center', minWidth: 50 },
            {
                field: 'title', title: '文档名称', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }) => {
                        let defaultColor = h(
                            "any",
                            { style: 'color:#C1050C' },
                            { default: () => row.title }
                        );
                        return defaultColor;
                    }
                }
            },
            {
                field: 'type', title: '文档类型', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }: any) => docType[row.type]
                }

            },
            {
                field: 'filesName', title: '附件', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }) => {
                        let defaultColor = h(
                            "any",
                            {
                                href: `${apiBaseURL}/main/fileinfo/stream?id=${row.filesId}`,
                                style: 'color:#3AA7EF;text-decoration: none'
                            },
                            { default: () => row.filesName }
                        );
                        return defaultColor;
                    }

                }

            },
            {
                field: 'isFlashview', title: '首页轮播', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }: any) => isFlashview[row.isFlashview]
                }
            },
            { field: 'createUserName', title: '创建人', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                field: 'createTime', title: '创建日期', showHeaderOverflow: true, minWidth: '120px', align: 'center', formatter: 'formatDate'
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
                            { code: "cemlabExperimentProcNormFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "cemlabExperimentProcNormFormDel", params: [row] }
                        );
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabExperimentProcNorm/page',
        'post'
    )
)
//规范类型查询
let normType = ref<number>();
const normTypeQuery = (e: number) => {
    normType.value = e;
    refresh();
}
const refresh = () => {
    reset({ type: normType })
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})
// 自定义全局的格式化处理函数
VXETable.formats.mixin({
    // 格式化日期，默认 yyyy-MM-dd
    formatDate({ cellValue }, format) {
        return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd')
    }
})
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, gridEvents, reset, paramsArray, gridSearchRef, initDialog, normTypeQuery
}