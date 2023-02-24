/**
 * @Description 考勤审批主表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-29 18:09:49
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//-- 例子看完删除它
//const typeArray = ["primary", "info"];
//const statusArray = [ "启用" , "停用"];
/*const statusOptions = ref([
    { label: '请选择', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])*/
/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'attendanceApplyDate', title: '申请时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'attendanceDate', title: '考勤日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'attendanceInfo', title: '出勤情况：1全天、2上午、3下午', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'remark', title: '备注', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'late', title: '迟到', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'leaveEarly', title: '早退', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'monitorRemark', title: '班长备注', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'applyTime', title: '申请日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            /*例子看完删除它{
                title: '是否启用', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.status] } as {},
                        { default: () => statusArray[row.status] }
                    )] as JSX.Element[]
                }
            },*/
                {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "labourAttendanceApproveForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourAttendanceApproveForm_del", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourAttendanceApprove/page',
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