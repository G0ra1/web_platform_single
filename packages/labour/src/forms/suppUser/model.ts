/**
 * @Description 用户
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 16:06:21
 */

export default class LabourSuppUser {
    //主键
    id!: string;
    //父级机构ID
    parentOrgId!: string;
    //父级机构名称
    parentOrgName!: string;
    //排序字段
    sort!: number;
    //用户中文姓名
    userNameCh!: string;
    //国籍
    nationality!: string;
    //证件类型
    cardType!: number;
    //性别 0 男   1女
    sex!: number;
    //证件号;0居民身份证；1港澳居民来往内地通信证；2港澳居民居住证；3台湾居民来往大陆通行证；4台湾居民居住证；5外国护照；6外国人永久居留身份证；7外国人居留证；
    idCard!: string;
    //生日
    birthday!: string;
    //籍贯
    nativePlace!: string;
    //民族
    nation!: string;
    //婚姻状况
    marriageStatus!: string;
    //手机号
    phoneNum!: string;
    //办公电话
    officePhone!: string;
    //邮箱
    email!: string;
    //QQ
    qq!: string;
    //微信
    wechat!: string;
    //家庭住址
    addr!: string;
    //现居地址
    nowAddr!: string;
    //状态;0停用；1启用；
    status!: number;
    //状态原因
    statusReason!: string;
    //户口所在地
    birthAddr!: string;
    //出生地
    birthPlace!: string;
    //毕业院校
    school!: string;
    //用户头像-上传的文件id
    photoFileId!: string;
    //用户Code
    userCode!: string;
    //所在单位
    unitName!: string;
    //所在单位id
    unitId!: string;
    //员工序列
    suite!: string;
    //用工形式
    shape!: string;
    //工作时间
    jobDate!: string;
    //入职时间
    inDate!: string;
    //是否管理员(0：否 1：是)
    isAdmin!: number;
    //备注
    remark!: string;
    //所属班id
    banId!: number;
    //所属班名称
    banName!: string;
    //创建人ip
    createIp!: string;
    //合同附件id
    contractFileId!: string;
    //最近一次参加大修单位ID
    lastOverunitId!: string;
    //最近一次参加大修单位名称
    lastOverunitName!: string;
    //员工意外伤害险附件ID
    insureFileId!: string;
    //员工意外伤害险开始时间
    insuresTartTime!: string;
    //员工意外伤害险结束时间
    insureEndTime!: string;
    //员工体检附件ID
    examFileId!: string;
    //员工体检开始时间
    examStartTime!: string;
    //员工体检结束时间
    examEndTime!: string;
    //身份证附件ID
    idCardFileId!: string;
    //是否管理员(0：否 1：是)
    isBlackList!: number;
    //用户名
    username!: string;
    //用户密码
    password!: string;
    //最高学历字典id
    educationId!: string;
    //最高学历字典名称
    educationName!: string;
    //所在单位部门名称
    partName!: string;
    //所在单位部门id
    partId!: string;
    //岗位字典id
    postRankId!: string;
    //岗位字典名称
    postRankName!: string;
    //从事专业
    outerDisciplineId!: string;
    //从事专业
    outerDisciplineName!: string;
    //来源;1同步2自建
    source: string = "self_build";
    //合同附件名称
    contractFileName!: string;
    //员工意外伤害险附件名称
    insureFileName!: string;
    //员工体检附件名称
    examFileName!: string;
    //身份证附件名称
    idCardFileName!: string;
}