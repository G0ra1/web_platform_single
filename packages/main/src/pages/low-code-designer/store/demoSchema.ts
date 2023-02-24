
export default {
    "applyTime": {
        "name": "applyTime",
        "type": "string",
        "description": "申请日期",
        "format": "date-time",
        "exampleSetFlag": true
    },
    "auditStatus": {
        "name": "auditStatus",
        "type": "integer",
        "description": "审批状态",
        "format": "int32",
        "exampleSetFlag": true
    },
    "bizKey": {
        "name": "bizKey",
        "type": "string",
        "description": "工作流——业务key",
        "example": "",
        "exampleSetFlag": true
    },
    "bizPriority": {
        "name": "bizPriority",
        "type": "string",
        "description": "优先级",
        "example": "",
        "exampleSetFlag": true
    },
    "callType": {
        "name": "callType",
        "type": "string",
        "description": "工作流调用业务的类型",
        "example": "",
        "exampleSetFlag": true
    },
    "camundaProcdefId": {
        "name": "camundaProcdefId",
        "type": "string",
        "description": "工作流——流程定义id",
        "example": "",
        "exampleSetFlag": true
    },
    "camundaProcdefKey": {
        "name": "camundaProcdefKey",
        "type": "string",
        "description": "工作流——流程定义key",
        "example": "",
        "exampleSetFlag": true
    },
    "camundaProcinsId": {
        "name": "camundaProcinsId",
        "type": "string",
        "description": "工作流——流程实例id",
        "example": "",
        "exampleSetFlag": true
    },
    "camundaTaskId": {
        "name": "camundaTaskId",
        "type": "string",
        "description": "工作流——流程任务ID",
        "example": "",
        "exampleSetFlag": true
    },
    "contractPurchaseCode": {
        "name": "contractPurchaseCode",
        "type": "string",
        "description": "采购合同编号",
        "example": "",
        "exampleSetFlag": true
    },
    "contractPurchaseId": {
        "name": "contractPurchaseId",
        "type": "integer",
        "description": "采购合同ID",
        "format": "int64",
        "exampleSetFlag": true
    },
    "contractPurchaseName": {
        "name": "contractPurchaseName",
        "type": "string",
        "description": "采购合同名称",
        "example": "",
        "exampleSetFlag": true
    },
    "contractWorkCode": {
        "name": "contractWorkCode",
        "type": "string",
        "description": "承包合同编号",
        "example": "",
        "exampleSetFlag": true
    },
    "contractWorkId": {
        "name": "contractWorkId",
        "type": "integer",
        "description": "承包合同id",
        "format": "int64",
        "exampleSetFlag": true
    },
    "contractWorkName": {
        "name": "contractWorkName",
        "type": "string",
        "description": "承包合同名称",
        "example": "",
        "exampleSetFlag": true
    },
    "examinationList": {
        "name": "examinationList",
        "type": "array",
        "description": "供应商费用填报体检费",
        "example": "",
        "exampleSetFlag": true,
        "items": {
            "name": "供应商费用填报体检费 Dto",
            "title": "供应商费用填报体检费 Dto",
            "type": "object",
            "properties": {
                "actualExecAmount": {
                    "name": "actualExecAmount",
                    "type": "number",
                    "description": "实际履约金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "actualSettlementAmount": {
                    "name": "actualSettlementAmount",
                    "type": "number",
                    "description": "实际成本金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "attachment": {
                    "name": "attachment",
                    "type": "string",
                    "description": "附件信息",
                    "example": "",
                    "exampleSetFlag": true
                },
                "attachmentids": {
                    "name": "attachmentids",
                    "type": "string",
                    "description": "附件信息",
                    "example": "",
                    "exampleSetFlag": true
                },
                "banId": {
                    "name": "banId",
                    "type": "integer",
                    "description": "班组ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "banName": {
                    "name": "banName",
                    "type": "string",
                    "description": "班组名称",
                    "example": "",
                    "exampleSetFlag": true
                },
                "estimateExecAmount": {
                    "name": "estimateExecAmount",
                    "type": "number",
                    "description": "预计履约金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "estimateSettlementAmount": {
                    "name": "estimateSettlementAmount",
                    "type": "number",
                    "description": "预计成本金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "examinationCost": {
                    "name": "examinationCost",
                    "type": "number",
                    "description": "体检费用",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "expensesSuppId": {
                    "name": "expensesSuppId",
                    "type": "integer",
                    "description": "供应商费用填报ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "fillDateTime": {
                    "name": "fillDateTime",
                    "type": "string",
                    "description": "填报时间",
                    "format": "date-time",
                    "exampleSetFlag": true
                },
                "id": {
                    "name": "id",
                    "type": "integer",
                    "description": "主键",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "idCard": {
                    "name": "idCard",
                    "type": "string",
                    "description": "身份证号码",
                    "example": "",
                    "exampleSetFlag": true
                },
                "personMobilizationId": {
                    "name": "personMobilizationId",
                    "type": "integer",
                    "description": "人力动员ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "remark": {
                    "name": "remark",
                    "type": "string",
                    "description": "备注",
                    "example": "",
                    "exampleSetFlag": true
                },
                "settlementDateTime": {
                    "name": "settlementDateTime",
                    "type": "string",
                    "description": "结算时间",
                    "example": "",
                    "exampleSetFlag": true
                },
                "settlementState": {
                    "name": "settlementState",
                    "type": "integer",
                    "description": "结算状态;1未结算-2阶段性结算-3已结算",
                    "format": "int32",
                    "exampleSetFlag": true
                },
                "sex": {
                    "name": "sex",
                    "type": "integer",
                    "description": "性别;1男2女",
                    "format": "int32",
                    "exampleSetFlag": true
                },
                "statementId": {
                    "name": "statementId",
                    "type": "integer",
                    "description": "结算单ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppOrgCode": {
                    "name": "suppOrgCode",
                    "type": "string",
                    "description": "供应商组织code",
                    "example": "",
                    "exampleSetFlag": true
                },
                "suppOrgId": {
                    "name": "suppOrgId",
                    "type": "integer",
                    "description": "供应商组织id",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppOrgName": {
                    "name": "suppOrgName",
                    "type": "string",
                    "description": "供应商名称",
                    "example": "",
                    "exampleSetFlag": true
                },
                "suppUserId": {
                    "name": "suppUserId",
                    "type": "integer",
                    "description": "人员ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppUserName": {
                    "name": "suppUserName",
                    "type": "string",
                    "description": "人员姓名",
                    "example": "",
                    "exampleSetFlag": true
                }
            },
            "exampleSetFlag": false
        }
    },
    "fillDateTime": {
        "name": "fillDateTime",
        "type": "string",
        "description": "填报时间",
        "format": "date-time",
        "exampleSetFlag": true
    },
    "id": {
        "name": "id",
        "type": "integer",
        "description": "主键",
        "format": "int64",
        "exampleSetFlag": true
    },
    "invoiceType": {
        "name": "invoiceType",
        "type": "string",
        "description": "发票类型",
        "example": "",
        "exampleSetFlag": true
    },
    "invoiceTypeName": {
        "name": "invoiceTypeName",
        "type": "string",
        "description": "发票类型",
        "example": "",
        "exampleSetFlag": true
    },
    "isChange": {
        "name": "isChange",
        "type": "boolean",
        "description": "工作流——业务数据是否改变标识，用户标识工作流是否需要调用业务接口",
        "example": false,
        "exampleSetFlag": true
    },
    "nucleicacidList": {
        "name": "nucleicacidList",
        "type": "array",
        "description": "供应商费用填报核酸检测费",
        "example": "",
        "exampleSetFlag": true,
        "items": {
            "name": "供应商费用填报核酸检测费 Dto",
            "title": "供应商费用填报核酸检测费 Dto",
            "type": "object",
            "properties": {
                "actualExecAmount": {
                    "name": "actualExecAmount",
                    "type": "number",
                    "description": "实际履约金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "actualSettlementAmount": {
                    "name": "actualSettlementAmount",
                    "type": "number",
                    "description": "实际成本金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "attachment": {
                    "name": "attachment",
                    "type": "string",
                    "description": "附件信息",
                    "example": "",
                    "exampleSetFlag": true
                },
                "attachmentids": {
                    "name": "attachmentids",
                    "type": "string",
                    "description": "附件信息",
                    "example": "",
                    "exampleSetFlag": true
                },
                "banId": {
                    "name": "banId",
                    "type": "integer",
                    "description": "班组ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "banName": {
                    "name": "banName",
                    "type": "string",
                    "description": "班组名称",
                    "example": "",
                    "exampleSetFlag": true
                },
                "estimateExecAmount": {
                    "name": "estimateExecAmount",
                    "type": "number",
                    "description": "预计履约金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "estimateSettlementAmount": {
                    "name": "estimateSettlementAmount",
                    "type": "number",
                    "description": "预计成本金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "expensesSuppId": {
                    "name": "expensesSuppId",
                    "type": "integer",
                    "description": "供应商费用填报ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "fillDateTime": {
                    "name": "fillDateTime",
                    "type": "string",
                    "description": "填报时间",
                    "format": "date-time",
                    "exampleSetFlag": true
                },
                "id": {
                    "name": "id",
                    "type": "integer",
                    "description": "主键",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "idCard": {
                    "name": "idCard",
                    "type": "string",
                    "description": "身份证号码",
                    "example": "",
                    "exampleSetFlag": true
                },
                "nucleicAcidBackCost": {
                    "name": "nucleicAcidBackCost",
                    "type": "number",
                    "description": "返程核酸检测费",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "nucleicAcidReachCost": {
                    "name": "nucleicAcidReachCost",
                    "type": "number",
                    "description": "到场核酸检测费",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "nucleicAcidTotalCost": {
                    "name": "nucleicAcidTotalCost",
                    "type": "number",
                    "description": "合计核酸检测费",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "personMobilizationId": {
                    "name": "personMobilizationId",
                    "type": "integer",
                    "description": "人力动员ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "remark": {
                    "name": "remark",
                    "type": "string",
                    "description": "备注",
                    "example": "",
                    "exampleSetFlag": true
                },
                "settlementDateTime": {
                    "name": "settlementDateTime",
                    "type": "string",
                    "description": "结算时间",
                    "example": "",
                    "exampleSetFlag": true
                },
                "settlementState": {
                    "name": "settlementState",
                    "type": "integer",
                    "description": "结算状态;1未结算-2阶段性结算-3已结算",
                    "format": "int32",
                    "exampleSetFlag": true
                },
                "sex": {
                    "name": "sex",
                    "type": "integer",
                    "description": "性别;1男2女",
                    "format": "int32",
                    "exampleSetFlag": true
                },
                "statementId": {
                    "name": "statementId",
                    "type": "integer",
                    "description": "结算单ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppOrgCode": {
                    "name": "suppOrgCode",
                    "type": "string",
                    "description": "供应商组织code",
                    "example": "",
                    "exampleSetFlag": true
                },
                "suppOrgId": {
                    "name": "suppOrgId",
                    "type": "integer",
                    "description": "供应商组织id",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppOrgName": {
                    "name": "suppOrgName",
                    "type": "string",
                    "description": "供应商名称",
                    "example": "",
                    "exampleSetFlag": true
                },
                "suppUserId": {
                    "name": "suppUserId",
                    "type": "integer",
                    "description": "人员ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppUserName": {
                    "name": "suppUserName",
                    "type": "string",
                    "description": "人员姓名",
                    "example": "",
                    "exampleSetFlag": true
                }
            },
            "exampleSetFlag": false
        }
    },
    "overhaulCode": {
        "name": "overhaulCode",
        "type": "string",
        "description": "大修计划编号",
        "example": "",
        "exampleSetFlag": true
    },
    "overhaulId": {
        "name": "overhaulId",
        "type": "string",
        "description": "大修计划",
        "example": "",
        "exampleSetFlag": true
    },
    "overhaulName": {
        "name": "overhaulName",
        "type": "string",
        "description": "大修计划名称",
        "example": "",
        "exampleSetFlag": true
    },
    "planCode": {
        "name": "planCode",
        "type": "string",
        "description": "需求计划编号",
        "example": "",
        "exampleSetFlag": true
    },
    "planId": {
        "name": "planId",
        "type": "integer",
        "description": "需求计划",
        "format": "int64",
        "exampleSetFlag": true
    },
    "planName": {
        "name": "planName",
        "type": "string",
        "description": "需求计划名称",
        "example": "",
        "exampleSetFlag": true
    },
    "planOrgId": {
        "name": "planOrgId",
        "type": "integer",
        "description": "需求单位ID",
        "format": "int64",
        "exampleSetFlag": true
    },
    "planOrgName": {
        "name": "planOrgName",
        "type": "string",
        "description": "需求单位",
        "example": "",
        "exampleSetFlag": true
    },
    "planType": {
        "name": "planType",
        "type": "integer",
        "description": "需求类别;大修、日常、专项",
        "format": "int32",
        "exampleSetFlag": true
    },
    "procdefName": {
        "name": "procdefName",
        "type": "string",
        "description": "工作流——流程定义名称",
        "example": "",
        "exampleSetFlag": true
    },
    "procdefTypeId": {
        "name": "procdefTypeId",
        "type": "integer",
        "description": "工作流——流程分类ID",
        "format": "int64",
        "exampleSetFlag": true
    },
    "procdefTypeName": {
        "name": "procdefTypeName",
        "type": "string",
        "description": "工作流——流程分类名称",
        "example": "",
        "exampleSetFlag": true
    },
    "procdefVersion": {
        "name": "procdefVersion",
        "type": "integer",
        "description": "工作流——流程版本",
        "format": "int32",
        "exampleSetFlag": true
    },
    "processName": {
        "name": "processName",
        "type": "string",
        "description": "工作流——流程实例标题",
        "example": "",
        "exampleSetFlag": true
    },
    "reason": {
        "name": "reason",
        "type": "string",
        "description": "工作流——申请原因",
        "example": "",
        "exampleSetFlag": true
    },
    "suppOrgCode": {
        "name": "suppOrgCode",
        "type": "string",
        "description": "供应商组织code",
        "example": "",
        "exampleSetFlag": true
    },
    "suppOrgId": {
        "name": "suppOrgId",
        "type": "integer",
        "description": "供应商组织id",
        "format": "int64",
        "exampleSetFlag": true
    },
    "suppOrgName": {
        "name": "suppOrgName",
        "type": "string",
        "description": "供应商名称",
        "example": "",
        "exampleSetFlag": true
    },
    "taxrate": {
        "name": "taxrate",
        "type": "string",
        "description": "税率",
        "example": "",
        "exampleSetFlag": true
    },
    "taxrateName": {
        "name": "taxrateName",
        "type": "string",
        "description": "税率",
        "example": "",
        "exampleSetFlag": true
    },
    "travelList": {
        "name": "travelList",
        "type": "array",
        "description": "供应商费用差旅费",
        "example": "",
        "exampleSetFlag": true,
        "items": {
            "name": "供应商费用填报差旅费 Dto",
            "title": "供应商费用填报差旅费 Dto",
            "type": "object",
            "properties": {
                "accommodationAmount": {
                    "name": "accommodationAmount",
                    "type": "number",
                    "description": "住宿费",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "actualExecAmount": {
                    "name": "actualExecAmount",
                    "type": "number",
                    "description": "实际履约金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "actualSettlementAmount": {
                    "name": "actualSettlementAmount",
                    "type": "number",
                    "description": "实际成本金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "arriveCity": {
                    "name": "arriveCity",
                    "type": "string",
                    "description": "到达地点",
                    "example": "",
                    "exampleSetFlag": true
                },
                "arriveDate": {
                    "name": "arriveDate",
                    "type": "string",
                    "description": "到达时间",
                    "format": "date-time",
                    "exampleSetFlag": true
                },
                "attachment": {
                    "name": "attachment",
                    "type": "string",
                    "description": "附件信息",
                    "example": "",
                    "exampleSetFlag": true
                },
                "attachmentids": {
                    "name": "attachmentids",
                    "type": "string",
                    "description": "附件信息",
                    "example": "",
                    "exampleSetFlag": true
                },
                "banId": {
                    "name": "banId",
                    "type": "integer",
                    "description": "班组ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "banName": {
                    "name": "banName",
                    "type": "string",
                    "description": "班组名称",
                    "example": "",
                    "exampleSetFlag": true
                },
                "estimateExecAmount": {
                    "name": "estimateExecAmount",
                    "type": "number",
                    "description": "预计履约金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "estimateSettlementAmount": {
                    "name": "estimateSettlementAmount",
                    "type": "number",
                    "description": "预计成本金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "expensesSuppId": {
                    "name": "expensesSuppId",
                    "type": "integer",
                    "description": "供应商费用填报ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "fillDateTime": {
                    "name": "fillDateTime",
                    "type": "string",
                    "description": "填报时间",
                    "format": "date-time",
                    "exampleSetFlag": true
                },
                "id": {
                    "name": "id",
                    "type": "integer",
                    "description": "主键",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "idCard": {
                    "name": "idCard",
                    "type": "string",
                    "description": "身份证号码",
                    "example": "",
                    "exampleSetFlag": true
                },
                "personMobilizationId": {
                    "name": "personMobilizationId",
                    "type": "integer",
                    "description": "人力动员ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "remark": {
                    "name": "remark",
                    "type": "string",
                    "description": "备注",
                    "example": "",
                    "exampleSetFlag": true
                },
                "settlementDateTime": {
                    "name": "settlementDateTime",
                    "type": "string",
                    "description": "结算时间",
                    "example": "",
                    "exampleSetFlag": true
                },
                "settlementState": {
                    "name": "settlementState",
                    "type": "integer",
                    "description": "结算状态;1未结算-2阶段性结算-3已结算",
                    "format": "int32",
                    "exampleSetFlag": true
                },
                "sex": {
                    "name": "sex",
                    "type": "integer",
                    "description": "性别;1男2女",
                    "format": "int32",
                    "exampleSetFlag": true
                },
                "startingCity": {
                    "name": "startingCity",
                    "type": "string",
                    "description": "出发地点",
                    "example": "",
                    "exampleSetFlag": true
                },
                "startingDate": {
                    "name": "startingDate",
                    "type": "string",
                    "description": "出发时间",
                    "format": "date-time",
                    "exampleSetFlag": true
                },
                "statementId": {
                    "name": "statementId",
                    "type": "integer",
                    "description": "结算单ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppOrgCode": {
                    "name": "suppOrgCode",
                    "type": "string",
                    "description": "供应商组织code",
                    "example": "",
                    "exampleSetFlag": true
                },
                "suppOrgId": {
                    "name": "suppOrgId",
                    "type": "integer",
                    "description": "供应商组织id",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppOrgName": {
                    "name": "suppOrgName",
                    "type": "string",
                    "description": "供应商名称",
                    "example": "",
                    "exampleSetFlag": true
                },
                "suppUserId": {
                    "name": "suppUserId",
                    "type": "integer",
                    "description": "人员ID",
                    "format": "int64",
                    "exampleSetFlag": true
                },
                "suppUserName": {
                    "name": "suppUserName",
                    "type": "string",
                    "description": "人员姓名",
                    "example": "",
                    "exampleSetFlag": true
                },
                "ticketAmount": {
                    "name": "ticketAmount",
                    "type": "number",
                    "description": "票据金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "totalAmount": {
                    "name": "totalAmount",
                    "type": "number",
                    "description": "合计金额",
                    "format": "bigdecimal",
                    "exampleSetFlag": true
                },
                "vehicle": {
                    "name": "vehicle",
                    "type": "string",
                    "description": "交通工具",
                    "example": "",
                    "exampleSetFlag": true
                }
            },
            "exampleSetFlag": false
        }
    },
    "virtualPurchaseCode": {
        "name": "virtualPurchaseCode",
        "type": "string",
        "description": "虚拟订单编号",
        "example": "",
        "exampleSetFlag": true
    },
    "virtualPurchaseId": {
        "name": "virtualPurchaseId",
        "type": "integer",
        "description": "虚拟订单id",
        "format": "int64",
        "exampleSetFlag": true
    },
    "virtualPurchaseName": {
        "name": "virtualPurchaseName",
        "type": "string",
        "description": "虚拟订单名称",
        "example": "",
        "exampleSetFlag": true
    }
}