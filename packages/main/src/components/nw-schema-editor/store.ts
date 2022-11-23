import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import type { Ref } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

// // schema 存储
// export const SchemaJson = ref<object>({})

// // 列表存储
// export const SchemaList = ref<object[]>([])


type PropertyType = 'string' | 'integer' | 'array' | 'array[]' | 'array[[]]' | 'object'

// 
type Property = {
    id?: string,
    description?: string,
    _fieldName?: string,
    type: PropertyType,
    items?: Property,
    properties?: Properties,
    itemType?: PropertyType
}

type Properties = {
    [a: string]: Property
}

interface SchemaEditorInstance {
    Bind: VxeGridProps
    Mode: Ref<'list' | 'editor'>
    List: Ref<object[]>
    Json: Ref<string>
    GridRef: Ref<VxeGridInstance | undefined> // vxe实例
    add: (a?: Property) => void
    addChild: (a?: Property) => void
    delById: (a: string) => void
    refresh: () => void
    transform: (a: boolean) => void
}



function getKey () {
    return new Date().getTime().toString(36)
}

// 数据转换
export const transformJsontoList = () => {

}

class Array {
    type = 'array'

}
// 

// 数据转换
export const transformListtoList = (list: Property[]) => {
    console.log('====list======', list)
    // const properties:Properties = {}

    const recursion = (list: Property[]) => {
        const properties:Properties = {}
        list.forEach((d: Property) => {
            if (!d._fieldName) return 
            const prop: Property  = {
                description: d.description,
                type: d.type,
            }
        
            if (d.type === 'object') {
                prop.properties = {

                }
            } else if (d.type === 'array[]') {
                prop.items = {
                    type: d.itemType!
                }
                
            } else if (d.type === 'array[[]]') {
                prop.items = {
                    type: 'array',
                    items: {
                        type: d.itemType!
                    }
                }
            }
            properties[d._fieldName]
        })
    }
    list.forEach((d: Property) => {
        // properties[d.description] = {
        //     description: d.description,
        //     type: d.type,
        // }
        const prop: Property  = {
            description: d.description,
            type: d.type,
        }
       
        if (d.type === 'object') {
            d.properties = {

            }
        } else if (d.type === 'array[]') {
            prop.items = {
                type: d.itemType!
            }
            
        } else if (d.type === 'array[[]]') {
            prop.items = {
                type: 'array',
                items: {
                    type: d.itemType!
                }
            }
        }
        // if (['array[]', 'array[[]]'].includes(d.type)) {
        //     // 判断数组项类型
        //     prop.items = {

        //     }
        // }
        // if (d.type === 'array') {
        //     // prop.items = {

        //     // }
        // } else if (d.type === 'object') {

        // }
    })
}

class SchemaEditor implements SchemaEditorInstance {
    static transformListtoJson (list: Property[]) {
        transformListtoList(list)
    }
    Bind
    Mode = ref<'list' | 'editor'>('list')
    List = ref<Property[]>([])
    Json = ref<string>('')
    GridRef = ref<VxeGridInstance>()
    refresh = () => {
        this.GridRef.value?.reloadData(this.List.value)
        this.GridRef.value?.setAllTreeExpand(true)
    }
    add = () => {
        this.List.value.push({
            id: getKey(),
            description: '',
            type: 'string'
        })
        this.refresh()
    }
    addChild = (row: any) => {
        row.children.push({
            id: getKey(),
            description: '',
            type: 'string'
          })
          
        this.refresh()
    }
    delById = () => {

    }
    // 转换
    transform = (f: boolean = true) => {
        if (f) {
            // true  list => schema
            SchemaEditor.transformListtoJson(this.List.value)
        } else {
            // schema => list
        }
    }
    constructor (bind: VxeGridProps, defaultJson: Ref) {
        this.Bind = bind
        this.Bind.data = this.List.value
        this.Json = defaultJson
    }
}

export {
    SchemaEditor
}