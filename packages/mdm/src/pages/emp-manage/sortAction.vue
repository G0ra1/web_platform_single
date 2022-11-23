<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="`全员排序`"
    content="你确认"
    positive-text="确认"
   
    style="width:900px;"
  >
    <n-spin :show="isLoading" >
        
        <n-grid > 
            <n-grid-item span="24" >
               
                <vxe-toolbar>
                    <template #buttons>
                         <n-grid > 
                             <n-grid-item span="8" style="padding-top:10px">
                                <vxe-input v-model="filterName1" type="search" placeholder="全表搜索" @keyup="searchEvent1"></vxe-input>
                             </n-grid-item>
                             <n-grid-item span="8" >
                                <h4 style="color:#2080f0">源目标:  {{model.userNameCh}}</h4>
                             </n-grid-item>
                             <n-grid-item span="8" >
                                <h4 style="color:red">终目标:  {{ target.targetName}}</h4>
                             </n-grid-item>
                         </n-grid>
                    </template>
                </vxe-toolbar>
                 <vxe-table
                        resizable
                        highlight-current-row
                        ref="xTable"
                        row-id="id"
                        :height="'560px'"
                        :data="emp.empList"
                    >
                        <vxe-table-column field="userNameCh" title="人员名称"></vxe-table-column>
                        <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
                        <vxe-table-column field="" title="操作">
                            <template v-slot="{ row }">
                                <vxe-button type="text" 
                                    @click="()=>{
                                     model.id = row.id
                                     model.userNameCh = row.userNameCh
                                    }" 
                                    
                                    status="primary"
                                >源目标</vxe-button>
                                <vxe-button type="text" 
                                  :disabled="model.id==row.id"
                                  @click="()=>{
                                    target.targetName = row.userNameCh
                                     target.targetId = row.id
                                  }" 
                                    status="warning">终目标</vxe-button>

                            </template>
                        </vxe-table-column>
                        <template #empty>
                        <span style="color: red;">
                            <p>没有更多数据了！</p>
                        </span>
                    </template>
                    </vxe-table>
            </n-grid-item>
        </n-grid>
    </n-spin>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
            
          </div>
      </template>
   
  </n-modal>
</template>

<script lang='jsx'>
import { defineComponent, ref,reactive,onMounted,h   } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NTree,
    NSpace,
   
} from 'naive-ui'
import {  globalEmpSort, empLists } from './api'
import { NwIcon } from '@platform/main'
import XEUtils from 'xe-utils'

export default defineComponent({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect,
        NButton,
        NSpin,
        NwIcon,
        NTree,
        NSpace,
  },
  props: [ 'defaultKeys' ],
  setup (props,context) {
    const showModalRef = ref(false)
    const isLoading = ref(false)
    const model = reactive({})
    const target = reactive({})
    const emp = reactive({empList:[],empData:[]})
    const pattern = ref('')
    const sonFn = (e) => {
      showModalRef.value = true
      model.value = e
      isLoading.value = true
      const fn = empLists({
          parentOrgId:0
      })
      fn.then((res)=>{
            emp.empList = res
            emp.empData = res
            isLoading.value = false
        }).finally(r => {
             
            isLoading.value = false
      })
    };
    const filterName1 = ref('')
    const renderPrefix = ({ option }) => {
        return h(
            NwIcon,
            { name:option.orgType ==1 ? "icon-zuzhijigou2" : "icon-bumen1" },
            
        )
    }
    const onPositiveClick =()=>{
        isLoading.value = true
       globalEmpSort({
           sourceId:model.id,
           targetId:target.targetId,
       }).then((res)=>{
           showModalRef.value = false
           target.targetName = ''
           target.targetId = ''
           context.emit('update:callback');
       }).finally(r => {
             
            isLoading.value = false
      })
        
    }
    const searchEvent1 =() =>{
        const filterName = XEUtils.toValueString(filterName1.value).trim().toLowerCase()
        if (filterName) {
            const filterRE = new RegExp(filterName, 'gi')
            const searchProps = ['userNameCh', 'parentDeptName',]
            const rest = emp.empData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
            emp.empList = rest.map(row => {
                const item = Object.assign({}, row)
                searchProps.forEach(key => {
                item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `${match}`)
                })
                return item
            })
        } else {
             emp.empList = emp.empData
        }
    }
    
    const filterTableMater = (id, arr) => {
        for (const item of arr) {
            if (item.id === id) return item
            if (item.kids && item.kids.length) {
                const _item = filterTableMater(id, item.kids)
                if (_item) return _item
            }
        }
    }
    onMounted(async () => {
     
    })
    return {
      filterTableMater,
      filterName1,
      searchEvent1,
      renderPrefix,
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      emp,
      pattern,
      target,
      isLoading,
      onPositiveClick,
      onNegativeClick () {
        showModalRef.value = false
      },
    }
  },
  methods: {

     
   }
})
</script>