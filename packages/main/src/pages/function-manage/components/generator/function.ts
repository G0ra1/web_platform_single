import { ref, reactive, nextTick, h } from 'vue'

import { create } from '../../api/index'
// 生成哪些功能枚举
export const FunEm = ref({
    add: true,
    addState: 1,
    edit: true,
    editState: 1,
    del: true,
    delState: 1
})

// 
export const visible = ref(false)

export const formData = ref<any>({})

export const FunAdd = ref<any>({})
export const FunEdit = ref<any>({})
export const FunDel = ref<any>({})

// 脚本
type ScriptType = {
    key: string,
    isAsync: boolean,
    code: string
}
// ButtonType
type ButtonType = {
    align: "left" | "right",
    disabled: boolean,
    text: string,
    type: "info" | "primary" | "warning" | "error",
    id: string,
    script: string
}

class FunctionAdd {
    scripts: Array<ScriptType>
    buttons: Array<ButtonType>
    constructor () {
        this.scripts = []
        this.buttons = []
    }
}

// 获取按钮
const getFunButtons = (name: string = '保存', type: string = 'info') => `
    [
        {
            "align": "right",
            "disabled": false,
            "text": "${name}",
            "type": "${type}",
            "id": "btn1",
            "script": "saveScript"
        }
    ]
`
//获取新建脚本
const getFunAdd = (data: any) => {
    const init = {
        key: 'init',
        isAsync: true,
        // 这里加入初始化
        code: `// ----
        Utils.SetFormValue(Utils.GetParams() || {}) 
        await Utils.RunScript()
    return {}`
    }
    const saveScript = getSaveScript(data._requestUrl, 'add')

    const formData = {
        fullName: `${data.formName}添加`,
        shortName: '添加',
        code: `${data.formName}_add`, // 功能code
        icon: "icon-n-y-add",
        remarks: `${data.formName}添加`,
        type: "form",
        viewMode: "drawer",
        width: "100%",
        height: "",
        formUrl: data.formUrl,
        formId: data.formId,
        formNameCh: data.formNameCh,
        formName: data.formName,
        buttons: getFunButtons(),
        script: JSON.stringify([init, saveScript])
    }

    return formData
}

// 获取编辑脚本
const getFunEdit = (data: any) => {
    const init = {
        key: 'init',
        isAsync: true,
        code: `Utils.SetSpin(true)
    const r = await Request({
        url: '${data._requestUrl}/' + Utils.GetParams().id, //
        method: 'get'
    })
    .then(r => r)
    .catch(error => false)
    Utils.SetSpin(false)
    Utils.SetFormValue(r)
    await Utils.RunScript()
    Utils.DispatchEvent()
    return r`
    }

    const saveScript = getSaveScript(data._requestUrl, 'edit')

    const formData = {
        fullName: `${data.formName}编辑`,
        shortName: '编辑',
        code: `${data.formName}_edit`,
        icon: "icon-n-y-editpage",
        remarks: `${data.formName}编辑`,
        type: "form",
        viewMode: "drawer",
        width: "100%",
        height: "",
        formUrl: data.formUrl,
        formId: data.formId,
        formNameCh: data.formNameCh,
        formName: data.formName,
        buttons: getFunButtons(),
        script: JSON.stringify([init, saveScript])
    }
    return formData
}

// 获取删除脚本
const getFunDel = (data: any) => {
    const init = {
        key: 'init',
        isAsync: true,
        code: `// ----
    Utils.SetDialogText('是否删除该数据？')
    return {}`
    }

    const saveScript = getSaveScript(data._requestUrl, 'del')

    const formData = {
        fullName: `${data.formName}删除`,
        shortName: '删除',
        code: `${data.formName}_del`,
        icon: "icon-n-y-thinclose",
        remarks: `${data.formName}编辑`,
        type: "dialog",
        viewMode: "modal",
        width: "300px",
        height: "100px",
        formUrl: data.formUrl,
        formId: data.formId,
        formNameCh: data.formNameCh,
        formName: data.formName,
        buttons: getFunButtons('确定删除', 'error'),
        script: JSON.stringify([init, saveScript])
    }
    return formData
}

// {
//     "key": "init",
//     "isAsync": true,
//     "code": "Utils.SetDialogText('测试321')\n// ----\nreturn {}\n        "
// }
// 保存脚本
const getSaveScript = (url: string, type: 'add' | 'edit' | 'del') => {
    let _url
    let method = ''
    let text = '' // 提示
    let reqData = ''
    switch (type) {
        case 'add':
            _url = `'${url}'` 
            method = 'post'
            text = '添加'
            reqData = 'data: await Utils.GetFormValue()'
            break;
        case 'edit':
            _url = `'${url}'` 
            method = 'put'
            text = '编辑'
            reqData = `data: {
                ...(await Utils.GetFormValue()),
                id: Utils.GetParams().id
            }`
            break;
        case 'del':
            // _url = `${url}/\${Utils.GetParams().id}` 
            _url = `'${url}/' + Utils.GetParams().id`
            // '${data._requestUrl}/' + Utils.GetParams().id
            // '/main/mdmSys/' + Utils.GetParams().id, //
            method = 'delete'
            text = '删除'
            break;
    }
    return {
        key: 'saveScript',
        isAsync: true,
        code:`
${type !== 'del' ?
`const error = await Utils.ValidateForm()
if (error.length) {
    Utils.Message.warning('请完善表单数据')
    return false
}` : ''
}
Utils.SetSpin(true)
const r = await Request({
    url: ${_url},
    method: '${method}',
    ${reqData}
})
.then(r => {
    Utils.Message.success('${text}成功')
    return true
})
.catch(error => {
    
    Utils.Message.error('${text}失败')
    return false
})
Utils.SetSpin(false)
Utils.DispatchEvent('complete')
return r
    `}
    }

// 选择表单后调用
export const handleFormComplete = () => {
    FunAdd.value = getFunAdd(formData.value)
    FunEdit.value = getFunEdit(formData.value)
    FunDel.value = getFunDel(formData.value)
    console.log(FunAdd.value)
}

// 重置缓存

export const resetFunCache = () => {
    formData.value = {}
    FunAdd.value = {}
    FunEdit.value = {}
    FunDel.value = {}

    FunEm.value = {
        add: true,
        addState: 1,
        edit: true,
        editState: 1,
        del: true,
        delState: 1
    }
}

// 发起请求

export const sendCreate = async (appInfo: any) => {
    if (FunEm.value.add) {
        // 添加
        FunEm.value.addState = 2
        await create({
            ...FunAdd.value,
            appCode: appInfo.appCode,
            appName: appInfo.appName
        }).then(r => {
            FunEm.value.addState = 3
        }).catch(() => {
            FunEm.value.addState = 4
        })
    }
    if (FunEm.value.edit) {
        // 编辑
        FunEm.value.editState = 2
        await create({
            ...FunEdit.value,
            appCode: appInfo.appCode,
            appName: appInfo.appName
        }).then(r => {
            FunEm.value.editState = 3
        }).catch(() => {
            FunEm.value.editState = 4
        })
    }
    if (FunEm.value.del) {
        // 删除
        FunEm.value.delState = 2
        await create({
            ...FunDel.value,
            appCode: appInfo.appCode,
            appName: appInfo.appName
        }).then(r => {
            FunEm.value.delState = 3
        }).catch(() => {
            FunEm.value.delState = 4
        })
    }
    completeAll()
}

export const completeAll = () => {
    if (
        (FunEm.value.add ? (FunEm.value.addState === 3) : 1 ) &&
        (FunEm.value.edit ? (FunEm.value.editState === 3) : 1 ) &&
        (FunEm.value.del ? (FunEm.value.delState === 3) : 1 )
    ) {
        visible.value = false
    }
}