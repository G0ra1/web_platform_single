<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="机构划转"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width:500px;"
  >
    <n-form label-placement="left">
        <n-grid x-gap="2" :cols="1" >
             <n-grid-item>
                <n-form-item label="划转机构" path="orgName">
                   <span>{{model.value.orgName}}</span>
                </n-form-item>
            </n-grid-item>
             <n-grid-item>
                <n-form-item label="原主管机构" path="parentOrgFullName">
                    <span>{{model.value.parentOrgFullName}}</span>
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="主管机构" path="parentId">
                    <n-tree-select  
                      :options="tree.treeData" 
                      size="small" placeholder="请选择" 
                      v-model:value="model.value.parentId"  
                       filterable
                      clearable
                      @update:value="getParentName" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="变更时间" path="modifyTime">
                    <n-input size="small" placeholder="请输入" v-model:value="model.value.modifyTime" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item label="变更原因" path="modifyReason">
                    <n-input size="small" placeholder="请输入" v-model:value="model.value.modifyReason " />
                </n-form-item>
            </n-grid-item>
        </n-grid>
    </n-form>
  </n-modal>
</template>

<script>
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect 
} from 'naive-ui'
  import {  rightList, creatOrg ,updateParent} from './api'

export default defineComponent({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect
    },
    props: {
       
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const model = reactive({})
    const tree = reactive({treeData:[],treeList:[]})
    const sonFn = (e) => {
      showModalRef.value = true
      model.value = e
      rightList({status:1,isDefault:0}).then((res)=>{
        const _arr = []
        tree.treeList = res
        console.log(model,'-=-=--=-=')
          const getStr = (list)=>{

              list.forEach((row)=>{
                  if(row.kids.length>0){
                      row.label = row.orgName
                      row.key = row.id 
                      row.disabled=row.id==model.id 
                      row.children = row.kids
                      getStr(row.kids)
                  }else {
                      row.label = row.orgName
                      row.key = row.id
                      row.disabled=row.id==model.id 
                      _arr.push(row)
                  }
              })
          }
          getStr(res)
          tree.treeData = res
          // tree.treeList = reactive(_arr)
      })
    };
    const onPositiveClick =()=>{
        updateParent(model.value).then((res)=>{
          if(res){
            
            context.emit('update:callback');
            showModalRef.value = false
          }

        })
        
    }
    onMounted(async () => {
        
    })
    return {
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      tree,
      onPositiveClick,
      getParentName(e){
        const  filterTableMater=(id, arr) =>{
              for (const item of arr) {
                if (item.id === id) return item
                if (item.kids && item.kids.length) {
                  const _item = filterTableMater(id, item.kids)
                  if (_item) return _item
                }
              }
            }
            model.value.parentName = filterTableMater(e,tree.treeList).orgName
            
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  }
})
</script>