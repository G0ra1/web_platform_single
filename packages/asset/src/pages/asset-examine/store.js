import { ref, nextTick } from 'vue'
import { query, create, edit, del } from './api/index.js'

export const dataModel = ref({})
export const formRef = ref(null) // 表单实例
export const pageRef = ref(null)
export const tableRef = ref(null)
export const visible = ref(false)
export const action = ref('create')
export const vbind = {
    request: {
        XHR: query, // promise 请求函数
        params: {
        },
        pageMethod: (current, size) => ({
            page: {
                current,
                size,
            },
        })
    },
    response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => (total)
    }
}

export const handleShow = async (row) => {
    action.value = row ? 'edit' : 'create'
    visible.value = true
    await nextTick()
    // /html/forms/asset-examine-form.html
    await formRef.value.loadForm('/incloud-biz-asset/asset-examine-form')
    if (row) {
        dataModel.value = row
        formRef.value.setValue(row)
    }
}

export const handleSave = async () => {
    const data = await formRef.value.getValue()
    if (action.value === 'create') {
        create(data).then(res => {
            visible.value = false
            tableRef.value.commitQuery();
        })
    } else {
        edit(data).then(res => {
            visible.value = false
            tableRef.value.commitQuery();
        })
    }
    // (action.value === 'create' ? create : edit)(data).then(res => {
    //     visible.value = false
    //     tableRef.value.commitQuery();
    // })
}

export const handleCancel = () => {
    visible.value = false
}

export const handleDel = (id) => {
    del(id).then(() => {
        tableRef.value.commitQuery();
    });
}