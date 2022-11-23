/*
 * @Author: zouliming 
 * @Date: 2022-11-12 11:53:21 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-12 22:38:29
 * @Description: 供应商组织vo
 */

export default interface OrgVo {
    //主键
    id: string;
    //组织代码
    orgCode: string;
    //组织名称
    orgName: string;
    //组织简称
    orgShortName: string;
    //组织类型
    orgType: number;
    //父级ID
    parentId: string;
    //父级名称
    parentName: string;
    //层级
    level: number;
    //排序字段
    sort: number;
    //是否有子集
    hasKids: number;
    //状态标识
    status: number;
    //机构有效开始时间
    validStartTime: string;
    //机构有效结束时间
    validEndTime: string;
    //机构地址
    orgAddr: string;
    //邮编code
    zipCode: string;
    //关联的供应商用户信息
    linkUserId: string;
    //管理员账号
    username: string;
    //管理员密码
    password: string;
    //WEBURL
    webUrl: string;
    //地区
    area: string;
    //备注
    remark: string;
    //子节点
    kids: Array<OrgVo>;
}