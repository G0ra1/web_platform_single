/**
 * @Description 设备管理  设备使用详情  查看详情页面
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:48:35
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
    isDel!: number;;
    cemlabDeviceUseRecordList: Array<cemlabDeviceUseRecord> = new Array();
}
class cemlabDeviceUseRecord {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
            this.deviceUseId = data.id;
            this.id = "";
        }
    }
    //主键
    id!: string;
    //设备使用ID
    deviceUseId!: string;
    //设备名称
    deviceName!: string;
    //设备编号
    deviceCode!: string;
    //设备ID
    deviceId!: string;
    //使用时间
    useTime!: string;
    //使用时间
    useStartHours!: string;
    //使用时间
    useEndHours!: string;
    //使用前状态;1正常2异常
    useBeforeStatus!: number;
    //使用后状态;1正常2异常
    useAfterStatus!: number;
    //备注
    rearks!: string;
    //使用人
    useUserid!: string;
    //使用人
    useUserName!: string;
    //是否删除
    isDel!: number;
}