/*
 * @Author: zouliming 
 * @Date: 2022-10-15 10:56:17 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-15 10:56:39
 * @Description 验证规则的具体配置
 */

export default class TableEntityRuleDetail {
    required: boolean = true;
    message: string = '请输入';
    trigger: string | Array<string> = ['blur', 'input']

    constructor(message: string) {
        this.message += message;
    }
}