/**
 * @Description 设备使用管理 使用记录详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:48:35
 */

export default class CemlabDeviceUse {
    //主键
    id!: string;
    //设备名称
    deviceNames!: string;
    //设备使用时间
    useTime!: string;
    //是否删除
    isDel!: number;
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