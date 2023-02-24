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
                "zhan_code": {
                    "name": "zhan_code",
                    "type": "string",
                    "description": "储油库(编码)"
                },
                "zhan_name": {
                    "name": "zhan_name",
                    "type": "string",
                    "description": "储油库(名称)"
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
        zhan_code?: string,
        zhan_name?: string,
       
       
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