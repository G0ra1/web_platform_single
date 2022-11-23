/*
 * @Author: zouliming
 * @Date: 2022-11-08 18:00:55
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-08 19:57:03
 * @Description: 表单数据类型
 */

export default class Supplier {
    //主键
    id!: string;
    //组织代码
    orgCode!: string;
    //组织名称
    orgName!: string;
    //组织简称
    orgShortName!: string;
    //组织类型
    orgType: number = 1;
    //父级ID
    parentId: string = '70';
    //父级名称
    parentName: string = '外协公司';
    //层级
    level!: number;
    //排序字段
    sort: number = 1;
    //是否有子集
    hasKids!: number;
    //状态标识
    status: number = 1;
    //机构有效开始时间
    validStartTime!: string;
    //机构有效结束时间
    validEndTime!: string;
    //机构地址
    orgAddr!: string;
    //邮编code
    zipCode!: string;
    //关联的供应商用户信息
    linkUserId!: string;
    //管理员账号
    username!: string;
    //管理员密码
    password!: string;
    //管理员
    userNameCh!: string;
    //WEBURL
    webUrl!: string;
    //地区
    area!: string;
    //备注
    remark!: string;
    //管理员手机号
    phoneNum!: string;
    //管理员邮箱
    email!: string;
    //来源;1同步2自建
    source: string = "self_build";
    createUserName!: string;
    createUserParentOrgName!: string;
}