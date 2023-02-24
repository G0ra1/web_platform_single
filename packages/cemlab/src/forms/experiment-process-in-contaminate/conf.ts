/**
 * @Description 实验过程
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-30 15:18:07
 */

const FormSchema = {
    "experimentReceiptsId": {
        "type": "string",
        "description": "实验单ID"
    },
    "experimentConditionId": {
        "type": "string",
        "description": "实验条件ID"
    },
    "experimentSlurryDemandId": {
        "type": "string",
        "description": "实验水泥浆性能要求ID"
    },
    "experimentSpecimenId": {
        "type": "string",
        "description": "实验样品ID"
    },
    "experimentTaskId": {
        "type": "string",
        "description": "实验单任务ID"
    },
    "experimentType": {
        "type": "number",
        "description": "实验类型;1实验2污染实验"
    },
    "experimentName": {
        "type": "string",
        "description": "实验名称"
    },
    "slurryType": {
        "type": "number",
        "description": "浆体类型;1领浆2中间浆3尾浆"
    },
    "contaminateFormula": {
        "type": "string",
        "description": "污染实验配方"
    },
    "contaminateQuantity": {
        "type": "number",
        "description": "污染实验配方加量"
    },
    "experimentDate": {
        "type": "string",
        "description": "实验时间"
    },
    "experimentResult": {
        "type": "string",
        "description": "实验结果"
    },
    "experimentPhenomena": {
        "type": "string",
        "description": "实验现象"
    },
    "actualExperimentTemperature": {
        "type": "string",
        "description": "实际实验温度"
    },
    "actualExperimentPressure": {
        "type": "string",
        "description": "实际实验压力"
    },
    "actualHeatingTime": {
        "type": "string",
        "description": "实际升温时间"
    },
    "cementSlurrySpeed3": {
        "type": "number",
        "description": "水泥浆平均转速（3）"
    },
    "cementSlurrySpeed6": {
        "type": "number",
        "description": "水泥浆平均转速（6）"
    },
    "cementSlurrySpeed100": {
        "type": "number",
        "description": "水泥浆平均转速（100）"
    },
    "cementSlurrySpeed200": {
        "type": "number",
        "description": "水泥浆平均转速（200）"
    },
    "cementSlurrySpeed300": {
        "type": "number",
        "description": "水泥浆平均转速（300）"
    },
    "cementSlurrySpeed600": {
        "type": "number",
        "description": "水泥浆平均转速（600）"
    },
    "cementSlurryPlasticViscosity": {
        "type": "number",
        "description": "水泥浆塑形粘度"
    },
    "cementSlurryYieldVal": {
        "type": "number",
        "description": "水泥浆动切力"
    },
    "cementSlurryLiquidity": {
        "type": "number",
        "description": "水泥浆流性指数"
    },
    "cementSlurryConsistencyCoefficient": {
        "type": "number",
        "description": "水泥浆稠度系数"
    },
    "slurrySpeed3": {
        "type": "number",
        "description": "泥浆平均转速（3）"
    },
    "slurrySpeed6": {
        "type": "number",
        "description": "泥浆平均转速（6）"
    },
    "slurrySpeed100": {
        "type": "number",
        "description": "泥浆平均转速（100）"
    },
    "slurrySpeed200": {
        "type": "number",
        "description": "泥浆平均转速（200）"
    },
    "slurrySpeed300": {
        "type": "number",
        "description": "泥浆平均转速（300）"
    },
    "slurrySpeed600": {
        "type": "number",
        "description": "泥浆平均转速（600）"
    },
    "slurryPlasticViscosity": {
        "type": "number",
        "description": "泥浆塑形粘度"
    },
    "slurryYieldVal": {
        "type": "number",
        "description": "泥浆动切力"
    },
    "slurryLiquidity": {
        "type": "number",
        "description": "泥浆流性指数"
    },
    "slurryConsistencyCoefficient": {
        "type": "number",
        "description": "泥浆稠度系数"
    },
    "prepadSpeed3": {
        "type": "number",
        "description": "前置液平均转速（3）"
    },
    "prepadSpeed6": {
        "type": "number",
        "description": "前置液平均转速（6）"
    },
    "prepadSpeed100": {
        "type": "number",
        "description": "前置液平均转速（100）"
    },
    "prepadSpeed200": {
        "type": "number",
        "description": "前置液平均转速（200）"
    },
    "prepadSpeed300": {
        "type": "number",
        "description": "前置液平均转速（300）"
    },
    "prepadSpeed600": {
        "type": "number",
        "description": "前置液平均转速（600）"
    },
    "prepadPlasticViscosity": {
        "type": "number",
        "description": "前置液塑形粘度"
    },
    "prepadYieldVal": {
        "type": "number",
        "description": "前置液动切力"
    },
    "prepadLiquidity": {
        "type": "number",
        "description": "前置液流性指数"
    },
    "prepadConsistencyCoefficient": {
        "type": "number",
        "description": "前置液稠度系数"
    },
    "deviceId": {
        "type": "string",
        "description": "设备ID"
    },
    "deviceName": {
        "type": "string",
        "description": "设备名称"
    },
    "deviceCode": {
        "type": "string",
        "description": "设备编号"
    },
    "futi": {
        "type": "number",
        "description": "釜体;1左釜2右釜"
    },
    "dataStartTime": {
        "type": "string",
        "description": "数据获取时间开始"
    },
    "dataEndTime": {
        "type": "string",
        "description": "数据获取时间结束"
    },
    "chartName": {
        "type": "string",
        "description": "图表名称"
    },
    "deviceChartId": {
        "type": "string",
        "description": "图表附件ID"
    },
    "compileUserid": {
        "type": "string",
        "description": "编制人"
    },
    "compileUserName": {
        "type": "string",
        "description": "编制人"
    },
    "auditorUserid": {
        "type": "string",
        "description": "审核人"
    },
    "auditorUserName": {
        "type": "string",
        "description": "审核人"
    },
    "approverUserid": {
        "type": "string",
        "description": "批准人"
    },
    "approverUserName": {
        "type": "string",
        "description": "批准人"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
}

export {
    FormSchema
}