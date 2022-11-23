import { ref, nextTick } from 'vue'
import { query, create, edit, del } from './api/index.js'
export const exportData = ref([])
export const dataModel = ref({})
export const formRef = ref(null) // 表单实例
export const pageRef = ref(null)
export const tableRef = ref(null)
export const dTable = ref()
export const visible = ref(false)
export const action = ref('create')
export const databaseId = ref('')
export const databaseName = ref('')

export const vbind = {
    request: {
        XHR:query, // promise 请求函数
        params: {databaseId:'0' },
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
export const info = (e) =>{
    vbind.request.params.databaseId = e
    tableRef.value.commitQuery();
}
export const handleShow = (row) => {
    action.value = row.isImpot ? 'eportEdit' : (row.id ? 'edit' : 'create')
    visible.value = true
    if (row) {
        dataModel.value = row
        nextTick().then(() => {
            formRef.value.setValue(row)
        })
    }
}
// 批量导题
export const exportHandleFinish = () =>{
    let { code, data, msg } = JSON.parse(event.target.response);
    if (code == 200) {
      exportData.value = data.map((d)=>{
        d.databaseId = databaseId.value
        d.databaseName = databaseName.value
        return d
      })
      // this.gridOptions.data.push(data)
     dTable.value.loadData(exportData.value)
      // this.model = {
      //   ...this.model,
      //   icon: data.fileUrl,
      // };
    } else {
    }

}
export const handleSave = async (e) => {
    const data = await formRef.value.getValue()

    if (action.value === 'create') {
        create(data).then(res => {
            visible.value = false
            tableRef.value.commitQuery();
        })
    } else if(action.value === 'edit'){
        edit(data).then(res => {
            visible.value = false
            tableRef.value.commitQuery();
        })
    } else {
        exportData.value = dTable.value.getTableData().tableData
        exportData.value[data.index] = {...data}
        visible.value = false
      dTable.value.loadData( exportData.value)

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