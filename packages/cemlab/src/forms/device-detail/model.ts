/**
 * @Description 设备新增表单
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 13:44:09
 */

export default class CemlabDevice {
    //主键
    id!: string;
    //设备名称
    deviceName!: string;
    //设备编号
    deviceCode!: string;
    //规格型号
    specifications!: string;
    //生产厂家
    manufacturer!: string;
    //出厂编号
    factoryNumber!: string;
    //投产时间
    productionTime!: string;
    //所属单位
    orgId!: string;
    //所属单位
    orgName!: string;
    //校准日期
    approvalTime!: string;
    //保养日期
    maintainTime!: string;
    //设备状态;1在用2停用3报废
    deviceStatus!: number;
    //保养规则;1月保养2年保养
    maintainRules!: number;
    //保养状态;1待保养2已保养
    maintainStatus!: number;
    //设备使用次数
    deviceUseCount!: number;
    //是否删除
    isDel!: number;
}