import { ref } from 'vue'

import type { WidgetNS } from '../../model/widget.d'

import { getWidget } from '../../widget-source/index'

// 组件待选
export class WidgetPanel {
    CategoryContainer = ref<Array<WidgetNS.Config>>([])
    CategoryData = ref<Array<WidgetNS.Config>>([])
    CategoryField = ref<Array<WidgetNS.Config>>([])
    CategoryService = ref<Array<WidgetNS.Config>>([])
    CategoryWf = ref<Array<WidgetNS.Config>>([])
    isLoading = ref<boolean>(false)
    async init () {
        this.isLoading.value = true
        // 加载
        const r = getWidget()
        r.forEach(d => {
            d.key = d.type
        })
        // 容器组件
        this.CategoryContainer.value = r.filter(d => d.category === 'container')
        // 数据组件
        this.CategoryData.value = r.filter(d => d.category === 'data')
        // 字段组件
        this.CategoryField.value = r.filter(d => d.category === 'field')
        // 业务组件
        this.CategoryService.value = r.filter(d => d.category === 'service')
        // 工作流组件
        this.CategoryWf.value = r.filter(d => d.category === 'wf')

    }
}