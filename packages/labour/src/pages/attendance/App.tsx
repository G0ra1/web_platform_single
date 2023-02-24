/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 14:17:30
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
import { NTag, NPopover } from 'naive-ui'

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
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
    {
        editConfig: {
            trigger: "manual",
            mode: 'row',
            autoClear: false
        },
        columns: [
            // { field: 'suppUserId', title: '劳务人员id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { type: 'checkbox', width: '50px', },
            {
                field: 'suppUserName',
                title: '申请人',
                showHeaderOverflow: true,
                width: '160px',
                align: 'center',
                // slots: {
                //     default: ({ row }) => {
                //         return [
                //             <NwFunctionPredefine
                //                 pid={row.id}
                //                 code="COLUMN_CONTROL_1"
                //                 descr="操作列按钮1"
                //                 params={[row]}
                //             >
                //                 {{
                //                     auth: (fn: any) => < a href="javascript:void()" onClick={fn}>{row.suppUserName}</ a>,
                //                     unauth: (fn: any) => < a href="javascript:void()" onClick={fn}>{row.suppUserName}</ a>
                //                 }}
                //             </NwFunctionPredefine>,
                //         ]
                //     }
                // }



            },
            { field: 'attendanceYearMonth', title: '考勤月份', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'banId', title: '所在班组id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'labourCompanyName', title: '所在劳务公司', showHeaderOverflow: true, showOverflow: true, align: 'center' },
            { field: 'banName', title: '所在班组', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'grooupAttendanceStateName', title: '审批状态', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        {
                            size: "small", type: ["error", "success", "info", "warning", ''][row.grooupAttendanceState], round: "round", class: "grid-ntag"
                        } as {},
                        {
                            default: () => row.grooupAttendanceStateName,
                            icon: () => h(
                                NwIcon,
                                {
                                    name: ["icon-n-n-error", "icon-n-n-check_fill", "icon-n-n-mark", "icon-n-n-warning", "icon-n-n-mark"][row.grooupAttendanceState]
                                }
                            )

                        }
                    )] as JSX.Element[]
                }
            },
            {
                title: '审批记录',
                field: 'labourAttendanceForm_approve_detail',
                showHeaderOverflow: true,
                width: '160px',
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        return [
                            <NwFunctionPredefine
                                pid={row.id}
                                code="labourAttendanceForm_approve_detail"
                                descr="审批记录查看"
                                params={[row]}
                            >
                                {{
                                    auth: (fn: any) => < a class="vxe-grid-active" href="javascript:void()" onClick={fn}>{'查看'}</ a>,
                                    unauth: (fn: any) => < a class="vxe-grid-active" href="javascript:void()" onClick={fn}>{'查看'}</ a>
                                }}
                            </NwFunctionPredefine>,
                        ]
                    }
                }

            },
            {
                title: '操作',
                field: 'action',
                fixed: 'right',
                showHeaderOverflow: true,
                width: "180px",
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "labourAttendanceForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourAttendanceForm_del", params: [row] }
                        );
                        let attendance_approve = h(
                            NwFunctionPredefine,
                            {
                                code: "labourAttendanceForm_approve",
                                pid: row.md5Id,
                                text: true
                            }
                        );
                        let Ellipsis =
                            <NPopover
                                placement="bottom"
                                trigger="hover"
                            >
                                {{
                                    trigger: () => {
                                        return <NwIcon name="icon-n-y-ellipsis" />
                                    },
                                    default: () => {
                                        return attendance_approve
                                    }
                                }}
                            </NPopover >
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del, attendance_approve]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourAttendance/approvePage',
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
        createUserName: d.userName,
        suppUserId: d.id,
        suppUserName: d.userNameCh,
        banName: d.parentDeptName,
        banId: d.parentDeptId,
        labourCompanyId: d.parentOrgId,
        labourCompanyName: d.parentOrgName,
        attendanceYearMonth: '2023-02'
    }];
})
const checkBoxUser = ref<any>([]);
//选中事件(组装修改的参数信息)
const checkboxChangeEvent = () => {
    console.log("选中的值》》》》》》》》》》》")
    checkBoxUser.value = gridRef.value?.getCheckboxRecords().map((attendance: any) => {
        const { attendanceYearMonth, suppUserId, suppUserName, banId, banName, labourCompanyId, labourCompanyName } = attendance;
        return { attendanceYearMonth: `${attendanceYearMonth}-01`, suppUserId, suppUserName, banId, banName, labourCompanyId, labourCompanyName };
    })
    console.log(checkBoxUser.value)


}

const gridSearchRef = ref()
const gridSearchOptions = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents, checkboxChangeEvent, checkBoxUser
}