import { ref, reactive, nextTick, h } from 'vue'

// 展示
export const previewVisible = ref(false)

// 预览数据参数
export const previewEditParam = ref('')
export const previewDelParam = ref('')

// ref
export const previewFunctionViewRef = ref()

export const openPreview = async (r: any, params = {}) => {
    // console.log('=======rrr=======', r)
    // console.log('=======JSON.parse(r.script)=======', JSON.parse(r.script))
    const functionConfig: any = {}
    functionConfig.basic = {
        fullName: r.fullName,
        shortName: r.shortName,
        width: r.width,
        height: r.height,
        viewMode: r.viewMode,
        icon: r.icon,
    }
    functionConfig.script = JSON.parse(r.script)
    functionConfig.content = {
        type: r.type,
        formId: r.formId,
        formUrl: r.formUrl,
        formName: r.formName,
        formNameCh: r.formNameCh,
    }
    functionConfig.buttons = JSON.parse(r.buttons)
    // nextTick().then(() => {
    //     console.log('=======functionConfig=======', functionConfig)    
    //     previewFunctionViewRef.value.init(functionConfig, {
    //         ...params
    //     }).then(() => {
    //         previewVisible.value = true
    //     })
    // })
    // previewFunctionViewRef.value.show(functionConfig, {
    //     ...params
    // })
    // previewFunctionViewRef.value.show()
    previewFunctionViewRef.value.show(r, [{
        ...params
    }])
    // nextTick().then(() => {
    //     previewFunctionViewRef.value.show()
    // })
    // nextTick().then(() => {
    //     console.log('=======functionConfig=======', functionConfig)    
    //     previewFunctionViewRef.value.init(functionConfig, {
    //         ...params
    //     }).then(() => {
    //         previewVisible.value = true
    //     })
    // })
}

// 功能完成触发
export const onPreviewComplete = () => {
    previewVisible.value = false
}

// 点击取消
export const onPreviewCancel = () => {
    previewVisible.value = false
}

// 重置preview
export const resetPreview = () => {
    previewVisible.value = false
    previewEditParam.value = ''
    previewDelParam.value = ''
}