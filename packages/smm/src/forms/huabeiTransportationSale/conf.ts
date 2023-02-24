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
    // "diquCode": {
    //     "name": "diquCode",
    //     "type": "string",
    //     "description": "地区code",
    //     "example": "",
    //     "exampleSetFlag": true
    // },
    // "diquName": {
    //     "name": "diquName",
    //     "type": "string",
    //     "description": "地区名称",
    //     "example": "",
    //     "exampleSetFlag": true
    // },
    "shichanliang": {
        "name": "shichanliang",
        "type": "string",
        "description": "实产量",
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
    "detailList": {
        "name": "detailList",
        "type": "array",
        "description": "detailList",
        "items": {
            "name": "日报信息 Dto",
            "title": "日报信息 Dto",
            "type": "object",
            "properties": {
                "yunshufangshi_code": {
                    "name": "yunshufangshi_code",
                    "type": "string",
                    "description": "运输形式(编码)"
                },
                "yunshufangshi_name": {
                    "name": "yunshufangshi_name",
                    "type": "string",
                    "description": "运输形式(名称)"
                },
                "kehu_code": {
                    "name": "kehu_code",
                    "type": "string",
                    "description": "客户(编码)"
                },
                "kehu_name": {
                    "name": "kehu_name",
                    "type": "string",
                    "description": "客户(名称)"
                },
                
                "rixiaoliang_name": {
                    "name": "yonghu_name",
                    "type": "string",
                    "description": "日销量(名称)"
                },
                "yueleiji_name": {
                    "name": "yueleiji_name",
                    "type": "string",
                    "description": "日销量(名称)"
                },
            }
        }
    }
}

type FormType = {
    shichanliang?: number,
    tianbaoshijian?: any,
    tianbaoren?: string,
    tianbaorenId?: string,
    // diquCode?: string,
    // diquName?: string,
    beizhu?: string,
    detailList?: Array<{
        id?: string,
        yunshufangshi_code?: string,
        yunshufangshi_name?: string,
       
        kehu_code?: string,
        kehu_name?: string,
        rixiaoliang_name?: number,
        yueleiji_name?: number,
    }> // 报销
}

export type {
    FormType
}

export {
    FormSchema
}