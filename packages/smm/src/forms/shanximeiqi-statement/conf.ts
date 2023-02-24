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
    "gongqiliang": {
        "name": "gongqiliang",
        "type": "number",
        "description": "供气量",
        "example": "",
        "exampleSetFlag": true
    },
    "H25": {
        "name": "H25",
        "type": "number",
        "description": "H25",
        "example": "",
        "exampleSetFlag": true
    },
    "shuiludian": {
        "name": "shuiludian",
        "type": "number",
        "description": "水露点",
        "example": "",
        "exampleSetFlag": true
    },
    "CO2": {
        "name": "CO2",
        "type": "number",
        "description": "CO2",
        "example": "",
        "exampleSetFlag": true
    },
    "gaoweifareliang": {
        "name": "gaoweifareliang",
        "type": "number",
        "description": "高位发热量",
        "example": "",
        "exampleSetFlag": true
    },
    "zongliu": {
        "name": "zongliu",
        "type": "number",
        "description": "总硫",
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
    beizhu?: string,
    gongqiliang?: number,
    H25?: number,
    shuiludian?: number,
    CO2?: number,
    gaoweifareliang?: number,
    zongliu?: number,
}

export type {
    FormType
}

export {
    FormSchema
}