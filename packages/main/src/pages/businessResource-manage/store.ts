import { ref } from 'vue'

import { cloneDeep, get } from 'lodash'


import { JsonRefs } from '../openapi-manage/plugins/json-refs'
import { recursion } from '../openapi-manage/store/index'

import { o } from './model.d'

export const paramList = ref<Array<o>>([])


export const getParamList = (content: string) => {


    JsonRefs.resolveRefs(JSON.parse(content)).then((r: any) => {
        console.log(r, 'JsonRefs')
        const jsonSchema = r.resolved
        const title = get(jsonSchema, 'info.title', '-')
        console.log('==================title')
        console.log(title)
        let url: string;
        let pathJson: any;
        [url, pathJson] = Object.entries(jsonSchema.paths)[0]
        console.log('==================url, pathJson')
        console.log(url, pathJson)
        const [method, methodJson] = Object.entries(pathJson)[0]
        console.log('==================method, methodJson')
        console.log(method, methodJson)
        const ParamList = []
        // 请求参数生成 query
        if (methodJson) {
            if ((methodJson as any).parameters) {
                ParamList.push(...(methodJson as any).parameters.map((d: any) => ({
                    fieldName: d.name,  // 字段名
                    title: d.name,  // 标题
                    description: d.description, // 字段描述
                    type: d.schema.type, // 字段类型
                    format: d.schema.format,
                    required: d.required,
                    requestType: d.in,
                    schema: ''
                })))
            }

            // 请求参数Body方式
            if ((methodJson as any).requestBody) {
                // 获取 application/json 请求数据类型
                const [requestContentType, requestContentSchema] = Object.entries(get(methodJson, 'requestBody.content', {}))[0] || []
                const x = recursion(requestContentSchema)
                // 请求参数列表
                ParamList.push(...x)
                // 这里生成请求参数demo

            } else {
            }
        }
        console.log('==================ParamList')
        console.log(ParamList)


        paramList.value = ParamList[0].children

        console.log('==================paramList.value')
        console.log(paramList.value)
    })
}

