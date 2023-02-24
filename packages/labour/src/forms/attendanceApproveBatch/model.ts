/**
 * @Description 考勤批量审批
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2023-2-2 
 */

export default class LabourAttendanceApprove {
    //唯一标识
    id!: string;
    //申请时间
    attendanceApplyDate!: string;
    //考勤日期
    attendanceDate!: string;
    //出勤情况：1全天、2上午、3下午
    attendanceInfo!: number;
    //备注
    remark!: string;
    //迟到
    late!: string;
    //早退
    leaveEarly!: string;
    //班长备注
    monitorRemark!: string;
    //申请日期
    applyTime!: string;
    suppUserName!: string;
    suppUserId!: string;
    attendanceYearMonth!: string;
    labourCompanyId!: string;
    labourCompanyName!: string;
    contractWorkName!: string;
    contractWorkCode!: string;
    contractWorkId!: string;
    banName!: string;
    banId!:string;
    labourAttendanceApproveDetailsList?: Array<any>
}