/**
 * @Description 考勤审批主表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-29 18:09:49
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
    labourCompanyName!: string;
    contractWorkName!: string;
    contractWorkCode!: string;
    contractWorkId!: string;
    banName!: string;
    isAgree!: string;
    banId!: string;
    labourCompanyId!: string;
    labourAttendanceApproveDetailsList?: Array<any>;
    labourAttendanceMonthVo?: Array<any>;
}