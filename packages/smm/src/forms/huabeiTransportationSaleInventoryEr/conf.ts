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
    // "kucunCode": {
    //     "name": "kucunCode",
    //     "type": "string",
    //     "description": "地区code",
    //     "example": "",
    //     "exampleSetFlag": true
    // },
    // "kucunName": {
    //     "name": "kucunName",
    //     "type": "string",
    //     "description": "地区名称",
    //     "example": "",
    //     "exampleSetFlag": true
    // },
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
                "chuyoudanwei_code": {
                    "name": "chuyoudanwei_code",
                    "type": "string",
                    "description": "储油(编码)"
                },
                "chuyoudanwei_name": {
                    "name": "chuyoudanwei_name",
                    "type": "string",
                    "description": "储油(名称)"
                },
                "chuyoudizhi_name": {
                    "name": "chuyoudizhi_name",
                    "type": "string",
                    "description": "储油地址"
                },
                "chuyoudizhi_code": {
                    "name": "chuyoudizhi_code",
                    "type": "string",
                    "description": "储油地址"
                },
                
                "anquankucun_name": {
                    "name": "anquankucun_name",
                    "type": "string",
                    "description": "安全库存(名称)"
                },
                "kucun_name": {
                    "name": "kucun_name",
                    "type": "string",
                    "description": "库存"
                },
                "keyongkucun_name": {
                    "name": "keyongkucun_name",
                    "type": "string",
                    "description": "可用库存"
                },
                
            }
        }
    }
}

type FormType = {
   
    tianbaoshijian?: any,
    tianbaoren?: string,
    tianbaorenId?: string,
    // kucunCode?: string,
    // kucunName?: string,
    beizhu?: string,
    detailList?: Array<{
        id?: string,
    
        chuyoudanwei_code?: string,
        chuyoudanwei_name?:string,
        chuyoudizhi_name?: string,
        chuyoudizhi_code?:string,
        
        anquankucun_name?: number,  
        kucun_name?: number,  
        keyongkucun_name?: number,  
    }> // 报销
}

export type {
    FormType
}

export {
    FormSchema
}