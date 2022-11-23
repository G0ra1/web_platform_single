/*
 * @Author: zouliming
 * @Date: 2022-11-08 18:00:55
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-08 19:57:03
 * @Description: 表单数据类型
 */

export default class AskOff {
    applyUserId!: string;
    applyUserName!: string;
    applyType!: number;
    applyDay!: number;
    applyReason!: string;
    applyStartDate!: string;
    applyEndDate!: string;

    constructor() {
    }

    //日期改变后的一个验证，可以不用写到这个类里当成一个方法
    changeDate(value: number[], formattedValue: string[]) {
        console.log("AskOff this:", this)
        this.applyStartDate = formattedValue[0];
        this.applyEndDate = formattedValue[1];
        this.applyDay = (value[1] - value[0]) / (1000 * 3600 * 24);
        this.applyReason = `请${this.applyType === 0 ? '事假' : '病假'}${this.applyDay}天`
    }
}