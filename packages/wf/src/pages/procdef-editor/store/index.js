import { ref } from 'vue'

import { Utils } from '@platform/main'

const parseQuery = Utils.parseQuery

import {
    queryDefXml,
    detailProcdef,
    queryXmlByCamundaProcdefId,
    createProcdef,
    bindCpt
} from '../api/index'

import {
    getExtensionRootEl,
} from '../util/index'

import {
    importXML,
    init as initBpmn,
    getXML,
    getRootElement
} from './bpmn'
import { loadEvents, writeDefaultEvents } from './cache-events'

// 注释主数据直接使用bpmn moddle对象代理
// export const domViewer = ref(null) getExtensionRootEl(getRootElement(), 'netwisd:Form')

// 类型
export const actionType = ref('')

const actionInit = async () => {
    const urlParams = parseQuery(window.location.search.substr(1))
    actionType.value = urlParams.action
    // 这里需要判断是否含有旧的数据
    let xml = ''
    let camundaProcdefId = ''
    window.__BPMN_XML_INITED = false // 流程xml是否加载完毕
    window.__BPMN_XML_INIT_OF_DEFEVENT = false // 是否对xml进行默认事件初始化
    switch (urlParams.action) {
        // 新建
        case 'create':
            window.__BPMN_XML_INIT_OF_DEFEVENT = true
            xml = await queryDefXml().then(res => res);
            await importXML(xml)
            // 这里补充加载process默认事件
            writeDefaultEvents(getRootElement())
            break;
        // 创建新版本
        case 'createVersion':
            camundaProcdefId = urlParams.camundaProcdefId
            xml = await queryXmlByCamundaProcdefId(urlParams.camundaProcdefId).then(res => res)
            await importXML(xml)
            break;
        // 流程克隆
        case 'clone':
            camundaProcdefId = urlParams.camundaProcdefId
            xml = await queryXmlByCamundaProcdefId(urlParams.camundaProcdefId).then(res => res)
            await importXML(xml)
            break;
        // 编辑
        case 'edit':
            // 查询流程camundaProcdefId
            camundaProcdefId = urlParams.camundaProcdefId
            xml = await detailProcdef(camundaProcdefId).then(res => res)
            await importXML(xml)
            break;
    }
    console.log('====importXML over=====')
    window.__BPMN_XML_INITED = true
}

// 保存提示
export const SndSaveVisible = ref(false)
export const SndSaveMsg = ref([])
// 保存触发
export const sendSave = async (isCurrentVer = 0) => {
    SndSaveVisible.value = true
    
    let xml = await getXML()
    .then(r => {
        SndSaveMsg.value.push({
            type: 'success',
            text: '获取XML数据成功'
        })
        return r.xml
    })
    .catch(e => {
        SndSaveMsg.value.push({
            type: 'error',
            text: '获取XML数据失败'
        })
    })
    const sendData = {
        data: xml
    }
    switch (actionType.value) {
        case 'edit':
            const urlParams = parseQuery(window.location.search.substr(1))
            sendData.procDefId = urlParams.procDefId
            break;
        case 'createVersion':
            sendData.isNewVer = 1
            sendData.isCurrentVer = isCurrentVer
            break;
    }
    
    SndSaveMsg.value.push({
        type: 'warning',
        text: '开始保存流程'
    })
    let res = await createProcdef(sendData)
    .then(r => {
        SndSaveMsg.value.push({
            type: 'success',
            text: '流程保存成功'
        })

        // 这里绑定功能
        return r
    })
    .catch(e => {
        SndSaveMsg.value.push({
            type: 'error',
            text: '流程保存失败'
        })
        return e
    })
    if (!res) {
        await SndSaveMsg.value.push({
            type: 'warning',
            text: '开始关联功能'
        })

        const root = getRootElement()
        bindCpt(
            getExtensionRootEl(root, 'netwisd:Form').cptId, // 功能ID
            root.id // 流程定义key
        ).then(res => {
            SndSaveMsg.value.push({
                type: 'success',
                text: '关联功能成功'
            })
            return true
        }).catch(error => {
            SndSaveMsg.value.push({
                type: 'error',
                text: '关联功能失败'
            })
            return false
        })
    }
    // bindCpt
    return res

}
// 初始化
export const init = async () => {
    // 初始化 bpmn组件
    await initBpmn()
    await loadEvents()
    // 必须在bpmn moddle初始化后执行
    await actionInit()
}