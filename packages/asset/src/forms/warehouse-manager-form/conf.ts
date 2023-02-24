/**
 * @Description 仓库 仓库管理 编辑页面
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-22 15:05:10
 */

const FormSchema = {
    "warehouseName": {
        "type": "string",
        "description": "仓库名称"
    },
    "orgId": {
        "type": "string",
        "description": "所属机构"
    },
    "orgName": {
        "type": "string",
        "description": "所属机构"
    },
    "orgFullId": {
        "type": "string",
        "description": "父级组织全路径ID"
    },
    "orgFullName": {
        "type": "string",
        "description": "父级组织全路径名称"
    },
    "deptId": {
        "type": "string",
        "description": "所属部门"
    },
    "deptName": {
        "type": "string",
        "description": "所属部门"
    },
    "address": {
        "type": "string",
        "description": "仓库地点"
    },
    "respondUserId": {
        "type": "string",
        "description": "责任人"
    },
    "respondUserName": {
        "type": "string",
        "description": "责任人"
    },
    "delFlag": {
        "type": "string",
        "description": "删除标识"
    },
    "houseType": {
        "type": "string",
        "description": "类型"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
}

export {
    FormSchema
}