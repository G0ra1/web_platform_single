const FormSchema = {
    
    "tianbaoshijian": {
        "name": "tianbaoshijian",
        "type": "string",
        "description": "填报时间",
        "example": "",
        "exampleSetFlag": true
    },
    "tianbaoren": {
        "name": "tianbaoren",
        "type": "string",
        "description": "填报人",
        "example": "",
        "exampleSetFlag": true
    },
    "tianbaorenId": {
        "name": "tianbaorenId",
        "type": "string",
        "description": "填报人Id",
        "example": "",
        "exampleSetFlag": true
    },
    "kaijingshu": {
        "name": "kaijingshu",
        "type": "number",
        "description": "开井数",
        "example": "",
        "exampleSetFlag": true
    },
    "xiedonglai": {
        "name": "xiedonglai",
        "type": "number",
        "description": "卸东来库",
        "example": "",
        "exampleSetFlag": true
    },
    "zonghehanshui": {
        "name": "zonghehanshui",
        "type": "number",
        "description": "综合含水",
        "example": "",
        "exampleSetFlag": true
    },
    "richanliang": {
        "name": "richanliang",
        "type": "number",
        "description": "日产量",
        "example": "",
        "exampleSetFlag": true
    },
    "hanyanliang": {
        "name": "hanyanliang",
        "type": "number",
        "description": "含盐量",
        "example": "",
        "exampleSetFlag": true
    },
    "beizhu": {
        "name": "beizhu",
        "type": "string",
        "description": "备注",
        "example": "",
        "exampleSetFlag": true
    },
}

type FormType = {
   
    tianbaoshijian?: any,
    tianbaoren?: string,
    tianbaorenId?: string,
    beizhu?: string,
    kaijingshu?: number,  
    xiedonglai?: number, 
    zonghehanshui?: number, 
    richanliang?: number, 
    hanyanliang?: number, 
}

export type {
    FormType
}

export {
    FormSchema
}