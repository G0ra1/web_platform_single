import type { VxeGridProps } from 'vxe-table'
import type { Ref } from 'vue'
interface VxeHelperInstance {

}

interface VxeGridNormalInstance {
    bind: VxeGridProps
    gridRef: Ref<VxeGridInstance> // 表格组件实例
}

interface VxeGridPagingInstance<T> {
    readonly bind: VxeGridProps
    gridRef: Ref<VxeGridInstance> // 表格组件实例
    filterData: Ref<T> // 查询数据对象
    query: (d?: T) => void // 查询函数
    reset: (d?: T) => void // 重置
}