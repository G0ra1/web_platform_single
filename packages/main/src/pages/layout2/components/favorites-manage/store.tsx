import { typeCreate, typeEdit, typeDetails, typeDel, typeList, create, edit, details, del } from './api/index'
import { ref, h } from 'vue'
import type { FormModel } from './model'
import { NwIcon } from '@platform/main'
import { TreeOption } from 'naive-ui'

export const model = ref<FormModel>({})
export const modelType = ref<number>(1) // 1新增类型 2新增链接
export const options = ref<any>([])
export const treeData = ref<any>([])
export const message = ref<any>({})
export const sContext = ref<any>({})

export const getTypeList = () => {
    treeData.value = []
    typeList({}).then(res => {
        res.forEach((d: any) => {
            d.label = d.typeName
            d.key = d.id
            d.prefix = () => {
                return <NwIcon size={26} name="icon-y-wenjianjia" > </NwIcon>
            }
            if (d.portalFavoritesContentVos.length > 0) {
                d.portalFavoritesContentVos.forEach((e: any) => {
                    e.label = e.articleName
                    e.key = e.id
                    e.prefix = () => {
                        return <NwIcon size={14} name="icon-y-lianjie" > </NwIcon>
                    }
                });
                d.children = d.portalFavoritesContentVos
            }
        })
        treeData.value = res

        options.value = res.map((d: any) => {
            return {
                label: d.typeName,
                value: d.id
            }
        })
        console.log(options.value, 'options.value')
    })
}
export const treeSelect = (keys: Array<string | number>, option: Array<any>) => {
    console.log(option, 'optionoption')
    modelType.value = option[0]?.typeId ? 2 : 1
    model.value = { ...option[0] }
}
export const save = () => {
    console.log(sContext)
    let fn = modelType.value === 1 ? model.value.id ? typeEdit : typeCreate : model.value.id ? edit : create;
    fn(model.value).then(res => {
        message.value.success('保存成功')
        getTypeList()
        sContext.value.emit('callback')
    })
}
export const delHandle = (id: string) => {
    let fn = modelType.value === 1 ? typeDel : del
    if (!id) return
    fn(id).then(res => {
        message.value.success('删除成功')
        getTypeList()
        model.value = {}
        sContext.value.emit('callback')
    })
}