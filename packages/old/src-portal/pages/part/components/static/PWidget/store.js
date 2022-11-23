
import { h, defineComponent, ref, reactive, onMounted } from "vue";

import { request } from '@platform/main'
import { textSpanEnd } from "typescript";

// 商城微件存储
// export const WidgetList = ref([])

// 获取商城微件
export const queryWidgetMall = async () => {
    // 读取公共
    if (Widget.WidgetList.value.length === 0) {
        await request({
            url: '/portal/portalWidgetsStore/list',
            method: 'post',
            data: {}
        }).then(res => {
            // 对微件进行分类 widgetTypeCode
            const WidgetTypes = []
            res.forEach(d => {
                const WidgetType = WidgetTypes.find(g => g.widgetTypeCode)
                if (!WidgetType) {
                    WidgetTypes.push({
                        widgetTypeCode: d.widgetTypeCode,
                        widgetTypeName: d.widgetTypeName,
                    })
                }
            })
            
            Widget.WidgetList.value = res
            Widget.WidgetTypes.value = WidgetTypes
        })
    }
}

export const saveWidget = async (data) => {
    return await request({
        url: '/portal/portalWidgetsUserRel',
        method: 'post',
        data
    }).then(res => {
        return res
    })
}

export const queryWidget = async (partCode) => {
    return await request({
        url: `/portal/portalWidgetsUserRel/getByCustomToMe`,
        method: 'post',
        data: {
            partCode
        }
    })
}

export class Widget {
    static WidgetList = ref([])
    static WidgetTypes = ref([])
    // 微件整体容器
    WidgetCardRef = ref(null)

    // 可视微件存储
    ViewWidgetData = ref([])

    // loading
    IsLoading = ref(false)

    // 是否修改
    IsChange = ref(false)
    constructor (code) {
        this.IsLoading.value = true
        queryWidget(code).then(res => {
            if (res) {
                this.ViewWidgetData.value = JSON.parse(res.widgetContent)
            }
        }).finally(r => {
            this.IsLoading.value = false
        })
    }
    // 查找视图微件
    findWidget (widgetId) {
        return this.ViewWidgetData.value.find(d => d.id === widgetId)
    }

    // 查找微件角标
    findWidgetIndex (widgetId) {
        if (!this.ViewWidgetData) { return -2 }
        return this.ViewWidgetData.value ? this.ViewWidgetData.value.findIndex(d => d.id === widgetId) : -1
    }
    
    // 添加到视图微件
    addWidget ({
        id,
        widgetUrl
    }) {
        // unshift
        this.ViewWidgetData.value.push({
            size: 'normal',
            id,
            url: widgetUrl
        })
        this.IsChange.value = true
    }

    // 删除视图中的微件
    removeWidget (widgetId) {
        const index = this.findWidgetIndex(widgetId)
        if (index >= 0) {
            this.ViewWidgetData.value.splice(index, 1)
        }
        this.IsChange.value = true
    }

}