/**
 * @Description 请假子表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 15:43:03
 */

export default class LabourAttendanceVacateDetails {
    //唯一标识
    id!: string;
    //请假表id
    vacateId!: string;
    //请假日期
    vacateDate!: string;
    //请假时长：1全天、2上午、3下午
    vacateLenth!: number;
}