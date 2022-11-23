import { ref, nextTick } from 'vue'
import { query,del, showIndex , isEnable, studySpecialDetail, studySpecialAdjDetail, studySpecialHisDetail } from './api/index.js'
export const dataModel = ref({})
export const formRef = ref(null) // 表单实例
export const pageRef = ref(null)
export const tableRef = ref(null)
export const visible = ref(false)
export const visibleHis = ref(false)
export const visibleAdj = ref(false)
export const action = ref('create')
export const params = ref({isEnable:''})
export const vbind = {
    request: {
        XHR: query, // promise 请求函数
        params:params.value,
        pageMethod: (current, size) => ({
            page: {
                current,
                size,
            },
        })
    },
    response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
    }
}
export const handleShow = (row) => {
    visible.value = true
    if (row) {
        studySpecialDetail(row.id).then((r)=>{
            formRef.value.setValue(r)
        })
        
    }
}
export const isEnableChange = (v) => {
  
    params.value.isEnable = v
    tableRef.value.commitQuery();
    tableRef.value.clearSelected()
   
 }
export const studySpecialAdjDetailShow = (row) => {
    visibleAdj.value = true
    if (row) {
        studySpecialAdjDetail(row.id).then((r)=>{
            formRef.value.setValue(r)
        })
       
    }
}
export const studySpecialHisDetailShow = (row) => {
    visibleHis.value = true
    if (row) {
        studySpecialHisDetail(row.id).then((r)=>{
            formRef.value.setValue(r)
        })
    }
}
export const isShowIndex = (data) => {
    showIndex(data.id).then(() => {
        tableRef.value.commitQuery();
        tableRef.value.clearSelected()
    });
}

export const isOrEnable = (data) => {
    isEnable(data.id).then(() => {
        tableRef.value.commitQuery();
        tableRef.value.clearSelected()
    });
}

export const handDel = (data) => {
    del(data.id).then(() => {
        tableRef.value.commitQuery();
        tableRef.value.clearSelected()
    });
}