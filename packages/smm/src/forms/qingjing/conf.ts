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
    "kehuList": {
        "name": "kehuList",
        "type": "array",
        "description": "kehuList",
        "items": {
            "name": "客户 Dto",
            "title": "客户 Dto",
            "type": "object",
            "properties": {
                "kehuCode": {
                    "name": "kehuCode",
                    "type": "string",
                    "description": "客户(编码)"
                },
                "kehuName": {
                    "name": "kehuName",
                    "type": "string",
                    "description": "客户(名称)"
                },
                "shangpinliang": {
                    "name": "shangpinliang",
                    "type": "number",
                    "description": "商品量"
                },
                "beizhu": {
                    "name": "beizhu",
                    "type": "string",
                    "description": "备注"
                },
                "projectName": {
                    "name": "projectName",
                    "type": "string",
                    "description": "chanpincode"
                },
                "projectCode": {
                    "name": "projectCode",
                    "type": "string",
                    "description": "projectCode"
                },
            }
        }
    },
    "kucunList": {
        "name": "kucunList",
        "type": "array",
        "description": "kucunList",
        "items": {
            "name": "库存 Dto",
            "title": "库存 Dto",
            "type": "object",
            "properties": {
                "qichuKucun": {
                    "name": "qichuKucun",
                    "type": "number",
                    "description": "期初库存"
                },
                "qimoKucun": {
                    "name": "qimoKucun",
                    "type": "number",
                    "description": "期末库存"
                },
                "kucunZengliang": {
                    "name": "kucunZengliang",
                    "type": "number",
                    "description": "库存增量"
                },
                "ziyongliang": {
                    "name": "ziyongliang",
                    "type": "number",
                    "description": "自用量"
                },
                "yingbochengben": {
                    "name": "yingbochengben",
                    "type": "number",
                    "description": "应拨成本"
                },
                "projectName": {
                    "name": "projectName",
                    "type": "string",
                    "description": "chanpincode"
                },
                "projectCode": {
                    "name": "projectCode",
                    "type": "string",
                    "description": "projectCode"
                },
                
            }
        }
    },
    "productList":{
        "name": "productList",
        "type": "array",
        "description": "productList",
        "items": {
            "name": "项目Dto",
            "title": "项目Dto Dto",
            "type": "object",
            "properties": {
                "id": {
                    "name": "id",
                    "type": "string",
                    "description": "id"
                },
                "name": {
                    "name": "name",
                    "type": "string",
                    "description": "name"
                },
                "code": {
                    "name": "code",
                    "type": "string",
                    "description": "code"
                },
               
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
    beizhu?: string,
    kehuList?: Array<{
        id?: string,
        kehuCode?: string,
        kehuName?: string,
        shangpinliang?: number,
        beizhu?: string,
        projectName?: string,
        projectCode?: string,
        
    }>,
    productList?: Array<{
        id?: string,
        name?: string,
        code?: string,
    }>,
    kucunList?: Array<{
        id?: string,
      
        qichuKucun?: number,  // 报销名称
        qimoKucun?: number,
        kucunZengliang?: number,
        ziyongliang?: number,
        yingbochengben?: number,
        projectName?: string,
        projectCode?: string,
       
    }> // 报销
}

export type {
    FormType
}

export {
    FormSchema
}