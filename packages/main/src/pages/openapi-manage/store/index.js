import { ref, reactive, shallowReactive, nextTick, computed } from 'vue'
import { get } from 'lodash'

import { JsonRefs } from '../plugins/json-refs.js'

import { queryDetail } from '../api'

import DataTypeMap from './dataType.js'

export const dataModel = ref({
    meetingAddress: 'init',
    explainInfo: 'init',
})
export const formRef = ref(null) // 表单实例
export const pageRef = ref(null)

export const tableRef = ref(null)

export const data = ref([])

// ----左树相关-----------------

// 左树过滤条件
export const StaticFilter = ref({})

// 选择的左树项
export const activeType = ref(null)

// 设置左数
export const setActiveType = (d) => {
    activeType.value = d
    // 刷新列表
    queryGridData()
}

// 左数数据
export const treeData = ref([{
    id: 'root',
    name: 'Root',
    children: [{
        
        id: 'type1',
        name: 'type1',
    },{
        
        id: 'type2',
        name: 'type2',
    },{
        
        id: 'type3',
        name: 'type3',
    }]
}])

// ----右侧列表相关-----------------
export const SearchForm = ref({
    mthPath: '',
    mthMethod: '',
    mthDescription: ''
})

// 推荐查询
export const SearchHandle = () => {

}

// 重置
export const SearchReset = () => {

}

// ----当前接口详情----------------

// 加载中
export const InterfaceDetailIsLoading = ref(false)
// 总体存储
export const InterfaceDetail = shallowReactive({
    visible: false, // 抽屉展示
    active: null, // 当前活动对象
    jsonSchema: null, // 解析后json
})

// 接口基础参数存储
export const InterfaceDetailBasicInfo = shallowReactive({})

// 接口请求参数
export const InterfaceDetailRequestParamsDemo = ref('')

// 接口请求参数
export const InterfaceDetailRequestParamList = ref([])

// 接口响应参数
export const InterfaceDetailResponseParamsDemo = ref('')

// 接口响应参数
export const InterfaceDetailResponseParamList = ref([])

// 接口响应状态
export const InterfaceDetailResponseStatus = ref([])

// 查询接口详情
export const queryInterfaceDetail = async (id) => {
    InterfaceDetailIsLoading.value = true
    await queryDetail(id).then(r => {
        InterfaceDetail.active = r
    })
    // 查询数据
    // InterfaceDetail.active = {
    //     data: demoData
    // }

    // 初始化数据
    await initInterface()
    InterfaceDetailIsLoading.value = false
}

// 初始化接口相关数据
const initInterface = async () => {
    // 接口json
    const jsonData = JSON.parse(InterfaceDetail.active.content)

    // 解析schema
    await JsonRefs.resolveRefs(jsonData).then(r => {
        InterfaceDetail.jsonSchema = r
    })
    console.log('=====InterfaceDetail======', InterfaceDetail.jsonSchema)
    const jsonSchema = InterfaceDetail.jsonSchema.resolved
    // title
    InterfaceDetailBasicInfo.title = get(jsonSchema, 'info.title', '-')
    // method
    const [ url, pathJson ] = Object.entries(jsonSchema.paths)[0]
    InterfaceDetailBasicInfo.url = url // 赋值url
    const [ method, methodJson ] = Object.entries(pathJson)[0]
    InterfaceDetailBasicInfo.method = method // 赋值method
    InterfaceDetailBasicInfo.description = methodJson.description

    // 这里methodJson 需要根据不同method进行判断
    // if (method === 'get' || method === 'delete') {
        
    // } else if (method === 'post' || method === 'put') {

        
    // }

    // 响应数据类型
    // const textxx = methodJson.requestBody.content['application/json'].schema.properties
    // const {
    //     meetingAddress,
    //     meetingName,
    //     meetingContent,
    //     meetingNum,
    //     sumBudgetAmount,
    //     reason,
    //     testprocBudgetinfoList
    // } = textxx
    // console.log('=======methodJson======', textxx)
    // console.log('=======methodJson==jj====', JSON.stringify({
    //     meetingAddress,
    //     meetingName,
    //     meetingContent,
    //     meetingNum,
    //     sumBudgetAmount,
    //     reason,
    //     testprocBudgetinfoList
    // }))
    const [ responsesContentType, responsesContentSchema ] = Object.entries(get(methodJson, 'responses[\'200\'][\'content\']', {}))[0] || []
    InterfaceDetailBasicInfo.responsesContentType = responsesContentType
    // console.log('=======responsesContentSchema======', responsesContentSchema)
    const rcs = recursion(responsesContentSchema)
    // 响应参数列表
    InterfaceDetailResponseParamList.value = rcs[0].children

    // 这里生成 响应参数demo
    InterfaceDetailResponseParamsDemo.value = generateDemoJson(rcs[0])

    // 这里顺序处理
    const ParamList = []

    // 请求参数生成 query
    if (methodJson.parameters) {
        ParamList.push(...methodJson.parameters.map(d => ({
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
    if (methodJson.requestBody) {
        // 获取 application/json 请求数据类型
        const [ requestContentType, requestContentSchema ] = Object.entries(get(methodJson, 'requestBody.content', {}))[0] || []
        InterfaceDetailBasicInfo.requestContentType = requestContentType
        const x = recursion(requestContentSchema)
        // 请求参数列表
        ParamList.push(...x)
        // 这里生成请求参数demo
        InterfaceDetailRequestParamsDemo.value = generateDemoJson(x[0])

    } else {
        InterfaceDetailBasicInfo.requestContentType = 'application/x-www-form-urlencoded'
    }
    InterfaceDetailRequestParamList.value = ParamList


    // 获取返回参数
    InterfaceDetailResponseStatus.value = Object.entries(methodJson.responses).map(([ code, content ]) => {
        return {
            code,
            description: content.description,
            schema: get(content, 'content[\'*/*\'][\'schema\'][\'$ref\']', '-')
        }
    })
    // console.log('======params=======', InterfaceDetailResponseStatus.value)
}

// 生成Demo JSON
export function generateDemoJson (obj) {
    const space = '                                                       ';
    // const type = 
    const jsonString = obj.type === 'array' ? ['[{'] : ['{']
    let level = 0
    const recursionFun = (list) => {
        level++;
        list.forEach(d => {
            if (d.children) {
                // 这里判断数组和对象
                jsonString.push(`${space.substring(0,level * 4)}"${d.fieldName}": ${d.type === 'array' ? '[{' : '{'}${d.description && `        // ${d.description}`}`)
                recursionFun(d.children)
                jsonString.push(`${space.substring(0,level * 4)}${d.type === 'array' ? '}]' : '}'}`)
            } else {

                // 这里需要根据类型获取demo值
                const demoValue = get(DataTypeMap, `['${d.type}']['format']['${d.format || 'default'}']`, "\"\"") 
                jsonString.push(`${space.substring(0,level * 4)}"${d.fieldName}": ${demoValue},${d.description && `       // ${d.description}`}`)
            }
        })
        level--
    }
    recursionFun(obj.children)
    if (obj.type === 'array') { jsonString.push('}]') } else { jsonString.push('}') }
    return jsonString.join('\n')
}

// 处理层叠参数
export function recursion (
    obj
) {
    const objToList = (obj) => {
        return Object.entries(obj).map(([ key, content ]) => {
            const { properties, items, title = '', type, format = '', description = '' } = content
            const fieldName = key === 'schema' ? title : key
            if (type === 'object' && properties) { // 对象类型
                return {
                    fieldName,  // 字段名
                    title,  // 标题
                    description, // 字段描述
                    type, // 字段类型
                    format,
                    children: properties,
                    schema: title
                }
            } else if (type === 'array' && items) { // 数组类型
                return {
                    fieldName,  // 字段名
                    title,  // 标题
                    description, // 字段描述
                    type, // 字段类型
                    format,
                    children: items.properties,
                    schema: items.type
                }
            } else {
                return {
                    fieldName,  // 字段名
                    title,  // 标题
                    description, // 字段描述
                    type, // 字段类型
                    format
                }
            }
        })
    }

    const recursionFun = (obj) => {
        // obj 转数组
        
        const list = objToList(obj)
        
        list.forEach(d => {
            if (d.children) {
                d.children = recursionFun(d.children)
            }
        })

        return list
    }
    return recursionFun(obj)
}

// initInterface(InterfaceDetail.active.data)
// show
export const showInterfaceDetail = (id) => {
    InterfaceDetail.visible = true
    try {
        queryInterfaceDetail(id)
    } catch (error) {
        alert(1)
        console.error(error)
    }
}
// cancel
export const cancelInterfaceDetail = () => {
    InterfaceDetail.visible = false
}

// 设置当前活动接口
export const setActiveInterface = () => {

}



// 