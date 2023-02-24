/**
 * @Description 实验管理-实验任务-查看任务详情
 * @author 云数网讯 lvchengming@netwisd.com@netwisd.com
 * @date 2023-01-09 12:09:27
 */

const FormSchema = {
    "type": {
        "type": "number",
        "description": "单据类型;1内部通知单2委托合同单"
    },
    "is history": {
        "type": "number",
        "description": "是否历史数据"
    },
    "status": {
        "type": "number",
        "description": "数据状态;1未完成2已完成"
    },
    "code": {
        "type": "string",
        "description": "单号"
    },
    "sampleType": {
        "type": "number",
        "description": "样品类型;1小样2大样3半大样"
    },
    "labReportDict": {
        "type": "string",
        "description": "化验报告单编码"
    },
    "labReportCode": {
        "type": "string",
        "description": "化验报告单编码"
    },
    "duiHao": {
        "type": "string",
        "description": "队号"
    },
    "taskSourceDict": {
        "type": "string",
        "description": "任务来源"
    },
    "taskSource": {
        "type": "string",
        "description": "任务来源"
    },
    "samplingUserid": {
        "type": "string",
        "description": "取样人"
    },
    "samplingUserName": {
        "type": "string",
        "description": "取样人"
    },
    "samplingSpot": {
        "type": "string",
        "description": "取样地点"
    },
    "samplingAshDate": {
        "type": "string",
        "description": "取样日期（灰）"
    },
    "waterSampleSource": {
        "type": "string",
        "description": "水样来源"
    },
    "waterSampleBarrelNumber": {
        "type": "string",
        "description": "水样桶号"
    },
    "samplingWaterDate": {
        "type": "string",
        "description": "取样日期（水）"
    },
    "structuralBlockDict": {
        "type": "string",
        "description": "构造区块"
    },
    "structuralBlock": {
        "type": "string",
        "description": "构造区块"
    },
    "wellsNumberDict": {
        "type": "string",
        "description": "井号"
    },
    "wellsNumber": {
        "type": "string",
        "description": "井号"
    },
    "finishDate": {
        "type": "string",
        "description": "完成日期"
    },
    "wellsDepth": {
        "type": "number",
        "description": "井深"
    },
    "verticalDepth": {
        "type": "number",
        "description": "垂深"
    },
    "casingSize": {
        "type": "number",
        "description": "套管尺寸"
    },
    "cementingModeDict": {
        "type": "string",
        "description": "固井方式"
    },
    "cementingMode": {
        "type": "string",
        "description": "固井方式"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "experimentUserid": {
        "type": "string",
        "description": "实验人员"
    },
    "experimentUserName": {
        "type": "string",
        "description": "实验人员"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
}

export {
    FormSchema
}