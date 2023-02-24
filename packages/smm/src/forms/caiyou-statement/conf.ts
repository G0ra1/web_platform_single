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
    "beizhu": {
        "name": "beizhu",
        "type": "string",
        "description": "备注",
        "example": "",
        "exampleSetFlag": true
    },
    "changjiList": {
        "name": "changjiList",
        "type": "array",
        "description": "changjiList",
        "items": {
            "name": "厂际交接 Dto",
            "title": "厂际交接 Dto",
            "type": "object",
            "properties": {
                "jiaojiedian_code": {
                    "name": "jiaojiedian_code",
                    "type": "string",
                    "description": "场际交接点(编码)"
                },
                "jiaojiedian_name": {
                    "name": "jiaojiedian_name",
                    "type": "string",
                    "description": "场际交接点(名称)"
                },
                "banci_code": {
                    "name": "banci_code",
                    "type": "string",
                    "description": "班次(编码)"
                },
                "banci_name": {
                    "name": "banci_name",
                    "type": "string",
                    "description": "班次(名称)"
                },
                "guanshuliang": {
                    "name": "guanshuliang",
                    "type": "number",
                    "description": "管输量"
                },
                "hanshuilv": {
                    "name": "hanshuilv",
                    "type": "number",
                    "description": "含水率"
                }
            }
        }
    },
    "waixiaoList": {
        "name": "waixiaoList",
        "type": "array",
        "description": "waixiaoList",
        "items": {
            "name": "外销交接 Dto",
            "title": "外销交接 Dto",
            "type": "object",
            "properties": {
                "jiaojiedian_code": {
                    "name": "jiaojiedian_code",
                    "type": "string",
                    "description": "场际交接点(编码)"
                },
                "jiaojiedian_name": {
                    "name": "jiaojiedian_name",
                    "type": "string",
                    "description": "场际交接点(名称)"
                },
                "banci_code": {
                    "name": "banci_code",
                    "type": "string",
                    "description": "班次(编码)"
                },
                "banci_name": {
                    "name": "banci_name",
                    "type": "string",
                    "description": "班次(名称)"
                },
                "guanshuliang": {
                    "name": "guanshuliang",
                    "type": "number",
                    "description": "管输量"
                },
                "hanshuilv": {
                    "name": "hanshuilv",
                    "type": "number",
                    "description": "含水率"
                }
            }
        }
    }
}

type FormType = {
    tianbaochangbie?: string,
    tianbaochangbieId?: String,
    tianbaoshijian?: any,
    tianbaoren?: string,
    tianbaorenId?: string,
    tianbaorendanwei?: string,
    tianbaorendanweiId?: string,

    changjiList?: Array<{
        id?: string,
        jiaojiedian_code?: string,
        jiaojiedian_name?: string,
        banci_code?: string,
        banci_name?: string,
        guanshuliang?: number,
        hanshuilv?: number
    }>,
    waixiaoList?: Array<{
        id?: string,
        jiaojiedian_code?: string,
        jiaojiedian_name?: string,
        banci_code?: string,
        banci_name?: string,
        guanshuliang?: number,
        hanshuilv?: number
    }> // 报销
}

export type {
    FormType
}

export {
    FormSchema
}