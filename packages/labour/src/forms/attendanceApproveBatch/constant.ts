import { NDatePicker, NTag, NInputNumber, NInput } from "naive-ui"

const  ApproveDetailsColumn = [
    { field: 'name', title: '序号', type: 'seq',align: 'center', },
    { field: 'suppUserName', title: '姓名', editRender: { enabled: false },align: 'center', },
    { field: 'attendanceApplyDateTime', title: '申请时间', editRender: { enabled: false },align: 'center', },
    { field: 'attendanceDate', title: '考勤日期', editRender: { enabled: false },align: 'center', },
    { field: 'attendanceInfo', title: '出勤情况', editRender: { enabled: false }, slots: { default: 'attendanceInfo_default' },align: 'center', },
    { field: 'remark', title: '备注', editRender: { enabled: false }, },
    {
        field: 'leaveEarly', title: '早退情况',
        align: 'center',
        editRender: { enabled: true },
        slots: { edit: 'leaveEarly_edit' },
    },
    {
        field: 'late', title: '迟到情况',
        align: 'center',
        editRender: { enabled: true },
        slots: { edit: 'late_edit' },
    },
    {
        field: 'approveState', title: '意见',
        align: 'center',
        editRender: { enabled: true },
        slots: { edit: 'approveState_edit', default: 'approveState_default' },
    },
    {
        field: 'monitorRemark', title: '班组长备注',
        align: 'center',
        editRender: { enabled: true },
        slots: { edit: 'monitorRemark_edit' },
    },
]


export { ApproveDetailsColumn }