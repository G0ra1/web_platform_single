const FormSchema = {
    "tianbaochangbie": {
        "name": "tianbaochangbie",
        "type": "string",
        "description": "填报厂别",
        "example": "",
        "exampleSetFlag": true
    },
    "tianbaochangbieId": {
        "name": "tianbaochangbieId",
        "type": "string",
        "description": "填报厂别Id",
        "example": "",
        "exampleSetFlag": true
    },
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
    "tianbaorendanwei": {
        "name": "tianbaorendanwei",
        "type": "string",
        "description": "填报人单位",
        "example": "",
        "exampleSetFlag": true
    },
    "tianbaorendanweiId": {
        "name": "tianbaorendanweiId",
        "type": "string",
        "description": "填报人Id",
        "example": "",
        "exampleSetFlag": true
    },
    "songjiandanwei": {
        "name": "songjiandanwei",
        "type": "string",
        "description": "送检单位",
        "example": "",
        "exampleSetFlag": true
    },
    "jiancedanwei": {
        "name": "jiancedanwei",
        "type": "string",
        "description": "检测单位",
        "example": "",
        "exampleSetFlag": true
    },
    "quyangdidian": {
        "name": "quyangdidian",
        "type": "string",
        "description": "取样地点",
        "example": "",
        "exampleSetFlag": true
    },
    "quyangshijian": {
        "name": "quyangshijian",
        "type": "string",
        "description": "取样时间",
        "example": "",
        "exampleSetFlag": true
    },
    "tupianId": {
        "name": "tupianId",
        "type": "string",
        "description": "取样时间",
        "example": "",
        "exampleSetFlag": true
    },
    "tupianUrl": {
        "name": "tupianUrl",
        "type": "string",
        "description": "取样时间",
        "example": "",
        "exampleSetFlag": true
    },
    "shuihanliang": {
        "name": "shuihanliang",
        "type": "string",
        "description": "水含量",
        "example": "",
        "exampleSetFlag": true
    },
    "jjwdxKpa": {
        "name": "jjwdxKpa",
        "type": "string",
        "description": "交换温度下蒸气压(kpa)",
        "example": "",
        "exampleSetFlag": true
    },
    "density": {
        "name": "density",
        "type": "string",
        "description": "密度20°c(kg/m3)",
        "example": "",
        "exampleSetFlag": true
    },
    "machineryImpurityLevel": {
        "name": "machineryImpurityLevel",
        "type": "string",
        "description": "machineryImpurityLevel",
        "example": "",
        "exampleSetFlag": true
    },
    "yjlLevel": {
        "name": "yjlLevel",
        "type": "string",
        "description": "201°c前馏分有机氯含量",
        "example": "",
        "exampleSetFlag": true
    },
    "saltContent": {
        "name": "saltContent",
        "type": "string",
        "description": "盐含量",
        "example": "",
        "exampleSetFlag": true
    },
    "liuhanliang": {
        "name": "liuhanliang",
        "type": "string",
        "description": "硫含量(%)",
        "example": "",
        "exampleSetFlag": true
    },
    "suanzhi": {
        "name": "suanzhi",
        "type": "string",
        "description": "酸值",
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
    tianbaochangbie?: string,
    tianbaochangbieId?: String,
    tianbaoshijian?: any,
    tianbaoren?: string,
    tianbaorenId?: string,
    tianbaorendanwei?: string,
    tianbaorendanweiId?: string,
    songjiandanwei?: string,
    jiancedanwei?: string,
    tupianUrl?: string,
    tupianId?: string,
    quyangdidian?: string,
    quyangshijian?: string,
    beizhu?: string,
    shuihanliang?: number,
    jjwdxKpa?: number,
    density?: number,
    machineryImpurityLevel?: number,
    yjlLevel?: number,
    saltContent?: number,
    liuhanliang?: number,
    suanzhi?: number,
}

export type {
    FormType
}

export {
    FormSchema
}