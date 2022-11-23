
const FormSchema = {
    "sort": {
        "type": "number",
        "description": "排序字段",
        "format": "int32",
        "exampleSetFlag": true
    },
    "status": {
        "type": "number",
        "description": "状态标识",
        "format": "int32",
        "exampleSetFlag": true
    },
    "sysCode": {
        "type": "string",
        "description": "系统code",
        "exampleSetFlag": true
    },
    "sysIcon": {
        "type": "string",
        "description": "图标",
        "exampleSetFlag": true
    },
    "sysName": {
        "type": "string",
        "description": "系统名称",
        "exampleSetFlag": true
    }
}

type FormType = {
    sort?: number, // 
    status?: number,  // 
    sysCode?: string,  // 
    sysIcon?: string,
    sysName?: string
}

export type {
    FormType
}

export {
    FormSchema
}