import { ref, nextTick } from 'vue'
import { query, studyExamPaperDetail,  isEnable,studyExamPaperAdjDetail, studyExamPaperHisDetail,del } from './api/index.js'

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
        studyExamPaperDetail(row.id).then((r)=>{
            formRef.value.setValue(r)
        })
        
    }
  
}
export const isEnableChange = (v) => {
  
    params.value.isEnable = v
    tableRef.value.commitQuery();
    tableRef.value.clearSelected()
   
 }
export const studyExamPaperAdjDetailShow = (row) => {
    visibleAdj.value = true
    if (row) {
        studyExamPaperAdjDetail(row.id).then((r)=>{
            formRef.value.setValue(r)
        })
       
    }
}
export const studyExamPaperHisDetailShow = (row) => {
    visibleHis.value = true
    if (row) {
        studyExamPaperHisDetail(row.id).then((r)=>{
            formRef.value.setValue(r)
        })
    }
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