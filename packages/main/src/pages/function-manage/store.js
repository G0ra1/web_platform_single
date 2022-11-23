import { ref, nextTick } from 'vue'
import { query } from './api/index.js'

export const dataModel = ref({
    meetingAddress: 'init',
    explainInfo: 'init',
})
export const formRef = ref(null) // 表单实例
export const pageRef = ref(null)
export const tableRef = ref(null)
export const visible = ref(false)
export const action = ref('create')
export const vbind = {
    request: {
        XHR: query, // promise 请求函数
        pageMethod: (current, size) => ({
            page: {
            current,
            size,
            },
        })
    },
    response: {
        dataMethod: (res) => res.records,
        pageMethod: () => {}
    }
}
