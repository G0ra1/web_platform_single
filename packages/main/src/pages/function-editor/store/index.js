
import { ref, reactive } from 'vue'

import { Utils } from '@platform/main'
const parseQuery = Utils.parseQuery

import { create, edit, queryById } from '../api/index'

import testData from './test'
// 脚本储存
export const script = ref([
    {
        key: 'init',
        isAsync: true,
        code: `
// ----
return {}
        `
    },
    {
        key: 'saveScript',
        isAsync: true,
        code: `
Utils.SetSpin(true)
const r = await Request({
    url: '/main/mdmSys',
    method: 'post',
    data: await Utils.GetFormValue()
})
.then(r => {
    Utils.Message.error('添加成功')
    return true
})
.catch(error => {
    
    Utils.Message.error('添加失败')
    return false
})
Utils.SetSpin(false)
Utils.DispatchEvent('complete')
return r
        `
    }
])

// 类型
export const actionType = ref('')

// 按钮
export const buttons = ref([{
    align: 'right', // 左显示或右显示
    disabled: false,
    text: '保存',   // 按钮文字
    type: 'info',   // 按钮类型
    id: 'btn1',     // 按钮唯一Code
    script: 'saveScript' // 按钮对应的脚本
}])

// 内容
export const content = ref({
    type: 'form',
    formUrl: '/smm/demoForm',
    formId: '1563005192632078338',
    formNameCh: 'demo',
    formName: 'demoForm',
})

// 基本信息
export const basic = ref({})

// action
export const actionInit = () => {
    const urlParams = parseQuery(window.location.search.substring(1))
    actionType.value = urlParams.action

    switch (urlParams.action) {
        // 新建
        case 'create':
            init({
                ...testData,
                appCode: window.decodeURI(urlParams.appCode),
                appName: window.decodeURI(urlParams.appName),
            })
            break;
        // 编辑
        case 'edit':
            queryById(urlParams.id).then(r => {
                init(r)
            })
            break;
    }
}
// 初始化
export const init = (data) => {
    basic.value = {
        id: data.id,
        code: data.code,
        appCode: data.appCode,
        appName: data.appName,
        fullName: data.fullName,
        shortName: data.shortName,
        viewMode: data.viewMode || 'drawer',
        icon: data.icon,
        remarks: data.remarks,
        width: data.width,
        height: data.height,
    }
    content.value = {
        type: data.type,
        formId: data.formId,
        formUrl: data.formUrl,
        formNameCh: data.formNameCh,
    }
    buttons.value = JSON.parse(data.buttons)
    
    script.value = JSON.parse(data.script)

}

// 保存
export const saveFun = () => {

    const data = {
        ...basic.value,
        ...content.value,
        buttons: JSON.stringify(buttons.value),
        script: JSON.stringify(script.value),
    }
    // console.log('-=-===', JSON.stringify({
    //     ...basic.value,
    //     ...content.value
    // }, null ,4))
    // console.log('-=-buttons===', JSON.stringify(buttons.value, null ,4))
    // console.log('-=-script===', JSON.stringify(script.value, null ,4))
    // console.log('-=-data===', data)
    // return
    // 判断
    if (actionType.value === 'create') {
        
        create(data).then(res => {
            window.location.href = `/main/pages/function-manage.html#/`

        })

    } else if (actionType.value === 'edit') {

        edit(data).then(res => {
            window.location.href = `/main/pages/function-manage.html#/`
        })
    }
}