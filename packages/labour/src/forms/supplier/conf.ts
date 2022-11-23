// 字段描述
const FormSchema = {
    "orgCode": {
        "type": "string",
        "description": "组织代码",
        "exampleSetFlag": true
    },
    "orgName": {
        "type": "string",
        "description": "组织名称",
        "exampleSetFlag": true
    },
    "orgShortName": {
        "type": "number",
        "description": "组织简称",
        "exampleSetFlag": true
    },
    "source": {
        "type": "number",
        "description": "来源;1同步2自建"
    },
    "sort": {
        "type": "number",
        "description": "排序",
        "exampleSetFlag": true
    },
    "status": {
        "type": "string",
        "description": "是否启用",
        "exampleSetFlag": true
    },
    "phoneNum": {
        "type": "string",
        "description": "管理员手机",
        "exampleSetFlag": true
    },
    "userNameCh": {
        "type": "string",
        "description": "管理员",
        "exampleSetFlag": true
    },
    "email": {
        "type": "string",
        "description": "管理员邮箱",
        "exampleSetFlag": true
    },
    "createUserName": {
        "type": "string",
        "description": "创建人",
        "exampleSetFlag": true
    },
    "createUserParentOrgName": {
        "type": "string",
        "description": "创建人机构",
        "exampleSetFlag": true
    },
}

export {
    FormSchema
}