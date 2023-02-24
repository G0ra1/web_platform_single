// 字段描述
const FormSchema = {
  "hourSalary": {
      "type": "number",
      "description": "工时结算时薪10.5"
  },
  "workHour": {
      "type": "number",
      "description": "每日工作时长8"
  },
  "coefficient": {
      "type": "number",
      "description": "加班系数2"
  },
  "remark": {
      "type": "string",
      "description": "说明"
  },
}

export {
  FormSchema
}