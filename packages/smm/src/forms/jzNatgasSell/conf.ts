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
    "sourceList": {
        "name": "sourceList",
        "type": "array",
        "description": "sourceList",
        "items": {
            "name": "日报来源 Dto",
            "title": "日报来源 Dto",
            "type": "object",
            "properties": {
                "laiyuan_code": {
                    "name": "laiyuan_code",
                    "type": "string",
                    "description": "来源(编码)"
                },
                "laiyuan_name": {
                    "name": "laiyuan_name",
                    "type": "string",
                    "description": "来源(名称)"
                },
                "yunxiaoliang": {
                    "name": "yunxiaoliang",
                    "type": "number",
                    "description": "运销量"
                },
                "beizhu": {
                    "name": "beizhu",
                    "type": "string",
                    "description": "备注"
                }
            }
        }
    },
    "detailList": {
        "name": "detailList",
        "type": "array",
        "description": "detailList",
        "items": {
            "name": "日报信息 Dto",
            "title": "日报信息 Dto",
            "type": "object",
            "properties": {
                "changzhan_quyu_code": {
                    "name": "changzhan_quyu_code",
                    "type": "string",
                    "description": "场站/区域(编码)"
                },
                "changzhan_quyu_name": {
                    "name": "changzhan_quyu_name",
                    "type": "string",
                    "description": "场站/区域(名称)"
                },
                "tianranqileixing_code": {
                    "name": "tianranqileixing_code",
                    "type": "string",
                    "description": "天然气类型(编码)"
                },
                "tianranqileixing_name": {
                    "name": "tianranqileixing_name",
                    "type": "string",
                    "description": "天然气类型(名称)"
                },
                "yonghu_code": {
                    "name": "yonghu_code",
                    "type": "string",
                    "description": "用户(编码)"
                },
                "yonghu_name": {
                    "name": "yonghu_name",
                    "type": "string",
                    "description": "用户(名称)"
                },
                "yunxiaoliang": {
                    "name": "yonghu",
                    "type": "number",
                    "description": "运销量"
                },
                "beizhu": {
                    "name": "beizhu",
                    "type": "string",
                    "description": "备注"
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

    sourceList?: Array<{
        id?: string,
        laiyuan_code?: string,
        laiyuan_name?: string,
        yunxiaoliang?: number,
        beizhu?: string
    }>,
    detailList?: Array<{
        id?: string,
        changzhan_quyu_code?: string,
        changzhan_quyu_name?: string,
        tianranqileixing_code?: string,
        tianranqileixing_name?: string,
        yonghu_code?: string,
        yonghu_name?: string,
        yunxiaoliang?: number,  // 报销名称
        beizhu?: string    // 预算数
    }> // 报销
}

export type {
    FormType
}

export {
    FormSchema
}