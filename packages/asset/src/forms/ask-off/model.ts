/**
 * @Description 请假申请单
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-14 23:31:14
 */

export default class PlatformAskOff {
    //主键
    id!: string;
    //申请人id
    applyUserId!: string;
    //申请人名称
    applyUserName!: string;
    //请假类型
    applyType!: number;
    //请假天数
    applyDay!: number;
    //请假原因
    applyReason!: string;
    //请假开始时间
    applyStartDate!: string;
    //请假结束时间
    applyEndDate!: string;
}