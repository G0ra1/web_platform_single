import { ref, nextTick } from 'vue'
import { query, create, edit, del, mdmOrgList, getWarehouse } from './api/index.js'
export const dataModel = ref({})
export const formRef = ref(null) // 表单实例
export const pageRef = ref(null)
export const tableRef = ref(null)
export const visible = ref(false)
export const action = ref('create')
export const orgTree = ref([])
export const searchOrgName = ref('')
export const treeSelectId = ref('')
export const orgModal = ref(false)
export const saveParentId = ref('')
export const treeSpinShow = ref(false)
export const selectedOrgType = ref(0)
export const orgSearch = () => {
    mdmOrgListFn()
}
export const mdmOrgListFn = () => {
    treeSpinShow.value = true
    mdmOrgList({ isDefault: 0, status: 1, }).then(res => {
        let fun = (list) => {
            list.forEach(e => {
                e.kids.length == 0 ? e.kids = null : fun(e.kids)
            });
        }
        fun(res)
        orgTree.value = res
    }).finally(() => {
        treeSpinShow.value = false
    })
}
export const menuSelected = ([key], [options]) => {
    console.log(key, options)


    selectedOrgType.value = options.orgType
    let deptId = ""
    let orgId = ""
    if (options.orgType == 2) {
        dataModel.value.orgName = options.parentOrgName
        dataModel.value.orgId = options.parentOrgId
        dataModel.value.deptName = options.orgName
        dataModel.value.deptId = options.id
        dataModel.value.orgFullId = options.orgFullId
        dataModel.value.orgFullName = options.orgFullName

        deptId = options.id
        orgId = null
    } else {
        orgId = options.id
        deptId = null

    }

    tableRef.value.searchFormCache.value = {
        deptId,
        orgId
    }
    tableRef.value.commitQuery();

}
export const vbind = {
    request: {
        XHR: query, // promise 请求函数
        params: {},
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
    // 
    await formRef.value.loadForm('/incloud-biz-asset/asset-warehouse-manage-form')
    if (row) {
        formRef.value.setValue(row)
    } else {
        formRef.value.setValue(dataModel.value)
    }


}
export const pOptions = ref([]);


export const handleSave = async () => {
    let data = {}
    data = await formRef.value.getValue()
    if (action.value === 'create') {
        create(data).then(res => {
            visible.value = false
            tableRef.value.commitQuery();
            mdmOrgListFn()
            orgModal.value = false
        })
    } else {
        edit(data).then(res => {
            visible.value = false
            tableRef.value.commitQuery();
            mdmOrgListFn()
            orgModal.value = false
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
        // mdmOrgListFn()
    });
}