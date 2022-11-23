
import { ref, Ref, reactive } from 'vue'
import type { VxeGridProps, VxeGridInstance, SizeType, VxeGridPropTypes } from 'vxe-table'
import { AxiosRequestPaging } from '../request/index.d'
import { VxeGridPagingInstance, VxeGridNormalInstance } from './index.d'
import { cloneDeep } from 'lodash'
// VxeGridPropTypes.ProxyAjaxQueryParams
const demoBind: VxeGridProps = {

}
const demoPagingBind: VxeGridProps = {
    rowId: 'id',
    size: 'mini',
    border: false,
    resizable: true,
    height: 'auto',
    align: null,
    // toolbarConfig: {
    //   slots: {
    //     buttons: 'bar-left',
    //     tools: 'bar-right'
    //   }
    // },
    columns: [],
    pagerConfig: {
        pageSize: 20,
        pageSizes: [10, 20, 50]
    },
    // proxyConfig: {
    //     autoLoad: false,
    //     props: {
    //         // list: 'list',
    //         total: 'total'
    //     },
    //     ajax: {}
    // }
}
// 一般数据列表
class VxeGrid<T> implements VxeGridNormalInstance {
    readonly bind = reactive<VxeGridProps<T>>(cloneDeep(demoPagingBind))
    gridRef = ref<VxeGridInstance>() // vxe实例
    constructor (bind: VxeGridProps) {
        Object.assign(this.bind, bind)
    }
}

// 分页配置
class VxeGridPaging<T> implements VxeGridPagingInstance<T> {
    readonly bind: VxeGridProps<T> = cloneDeep(demoPagingBind)
    gridRef = ref<VxeGridInstance>() // vxe实例
    t1 = ref<object>({a: 1, b:2}) // vxe实例
    filterData: Ref
    // 查询
    query = (d: T = {} as T) => {
        this.gridRef.value?.commitProxy('query', {
            ...this.filterData.value,
            ...d
        })
    }
    // 重置
    reset = (d?: T) => {
        this.filterData.value = d || {} as T
        this.query()
    }
    //
    constructor (bind: VxeGridProps, request?: AxiosRequestPaging, shaping?: any) {
        this.filterData = ref<T>({} as T)
        // this.bind = cloneDeep(demoPagingBind) // 赋值默认
        if (request) this.bind.proxyConfig = {
            autoLoad: false,
            props: {
                // list: 'list',
                total: 'total'
            },
            ajax: {
                query: ({ page }, search) => {
                    return request.send({
                        // formNameCh: '物资',
                        ...this.filterData.value,
                        ...search,
                        page: {
                            current: page.currentPage,
                            size: page.pageSize
                        }
                    }).then(r => {
                        if (shaping) {
                            return shaping(r)
                        } else {
                            return r
                        }
                    })
                }
            }
        }
        // if (request) this.bind.proxyConfig!.ajax!.query = ({ page }, search) => {
        //     return request.send({
        //     // formNameCh: '物资',
        //     ...search,
        //     page: {
        //         current: page.currentPage,
        //         size: page.pageSize
        //     }
        // })}
        Object.assign(this.bind, bind)
    }

}

export const VxeHelper = {
    VxeGridPaging,
    VxeGrid
}