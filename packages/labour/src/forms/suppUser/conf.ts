/**
 * @Description 用户
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 16:06:21
 */

const FormSchema = {
    "parentOrgId": {
        "type": "string",
        "description": "父级机构ID"
    },
    "parentOrgName": {
        "type": "string",
        "description": "父级机构名称"
    },
    "sort": {
        "type": "number",
        "description": "排序字段"
    },
    "userNameCh": {
        "type": "string",
        "description": "用户中文姓名"
    },
    "nationality": {
        "type": "string",
        "description": "国籍"
    },
    "cardType": {
        "type": "number",
        "description": "证件类型"
    },
    "sex": {
        "type": "number",
        "description": "性别 1 男   2女"
    },
    "idCard": {
        "type": "string",
        "description": "证件号;0居民身份证；1港澳居民来往内地通信证；2港澳居民居住证；3台湾居民来往大陆通行证；4台湾居民居住证；5外国护照；6外国人永久居留身份证；7外国人居留证；"
    },
    "birthday": {
        "type": "string",
        "description": "生日"
    },
    "nativePlace": {
        "type": "string",
        "description": "籍贯"
    },
    "nation": {
        "type": "string",
        "description": "民族"
    },
    "marriageStatus": {
        "type": "string",
        "description": "婚姻状况"
    },
    "phoneNum": {
        "type": "string",
        "description": "手机号"
    },
    "officePhone": {
        "type": "string",
        "description": "办公电话"
    },
    "email": {
        "type": "string",
        "description": "邮箱"
    },
    "qq": {
        "type": "string",
        "description": "QQ"
    },
    "wechat": {
        "type": "string",
        "description": "微信"
    },
    "addr": {
        "type": "string",
        "description": "家庭住址"
    },
    "nowAddr": {
        "type": "string",
        "description": "现居地址"
    },
    "status": {
        "type": "number",
        "description": "状态;0停用；1启用；"
    },
    "statusReason": {
        "type": "string",
        "description": "状态原因"
    },
    "birthAddr": {
        "type": "string",
        "description": "户口所在地"
    },
    "birthPlace": {
        "type": "string",
        "description": "出生地"
    },
    "school": {
        "type": "string",
        "description": "毕业院校"
    },
    "photoFileId": {
        "type": "string",
        "description": "用户头像-上传的文件id"
    },
    "userCode": {
        "type": "string",
        "description": "用户Code"
    },
    "unitName": {
        "type": "string",
        "description": "所在单位"
    },
    "unitId": {
        "type": "string",
        "description": "所在单位id"
    },
    "suite": {
        "type": "string",
        "description": "员工序列"
    },
    "shape": {
        "type": "string",
        "description": "用工形式"
    },
    "jobDate": {
        "type": "string",
        "description": "工作时间"
    },
    "inDate": {
        "type": "string",
        "description": "入职时间"
    },
    "isAdmin": {
        "type": "number",
        "description": "是否管理员(0：否 1：是)"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "banId": {
        "type": "string",
        "description": "所属班id"
    },
    "banName": {
        "type": "string",
        "description": "所属班名称"
    },
    "createIp": {
        "type": "string",
        "description": "创建人ip"
    },
    "contractFileId": {
        "type": "string",
        "description": "合同附件id"
    },
    "lastOverunitId": {
        "type": "string",
        "description": "最近一次参加大修单位ID"
    },
    "lastOverunitName": {
        "type": "string",
        "description": "最近一次参加大修单位名称"
    },
    "insureFileId": {
        "type": "string",
        "description": "员工意外伤害险附件ID"
    },
    "insuresTartTime": {
        "type": "string",
        "description": "员工意外伤害险开始时间"
    },
    "insureEndTime": {
        "type": "string",
        "description": "员工意外伤害险结束时间"
    },
    "examFileId": {
        "type": "string",
        "description": "员工体检附件ID"
    },
    "examStartTime": {
        "type": "string",
        "description": "员工体检开始时间"
    },
    "examEndTime": {
        "type": "string",
        "description": "员工体检结束时间"
    },
    "idCardFileId": {
        "type": "string",
        "description": "身份证附件ID"
    },
    "isBlackList": {
        "type": "number",
        "description": "是否管理员(0：否 1：是)"
    },
    "username": {
        "type": "string",
        "description": "用户名"
    },
    "password": {
        "type": "string",
        "description": "用户密码"
    },
    "educationId": {
        "type": "string",
        "description": "最高学历字典id"
    },
    "educationName": {
        "type": "string",
        "description": "最高学历字典名称"
    },
    "partName": {
        "type": "string",
        "description": "所在单位部门名称"
    },
    "partId": {
        "type": "string",
        "description": "所在单位部门id"
    },
    "postRankId": {
        "type": "string",
        "description": "岗位字典id"
    },
    "postRankName": {
        "type": "string",
        "description": "岗位字典名称"
    },
    "outerDisciplineId": {
        "type": "string",
        "description": "从事专业"
    },
    "outerDisciplineName": {
        "type": "string",
        "description": "从事专业"
    },
    "source": {
        "type": "number",
        "description": "来源;1同步2自建"
    },
    "contractFileName": {
        "type": "string",
        "description": "合同附件名称"
    },
    "insureFileName": {
        "type": "string",
        "description": "员工意外伤害险附件名称"
    },
    "examFileName": {
        "type": "string",
        "description": "员工体检附件名称"
    },
    "idCardFileName": {
        "type": "string",
        "description": "身份证附件名称"
    },
}

export {
    FormSchema
}