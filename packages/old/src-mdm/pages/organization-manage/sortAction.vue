<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="`排序`"
    content="你确认"
    positive-text="确认"
   
    style="width:500px;"
  >
    <n-spin :show="isLoading" >
        
        <n-grid > 
            <n-grid-item span="24" >
                <div  >
                    <h4 style="color:#2080f0">源目标:  {{model.value.orgName}}</h4>
                    <h4 style="color:red">终目标:  {{ target.targetName}}</h4>
                </div>
                <n-input v-model:value="pattern" placeholder="搜索" />
                <n-space vertical :size="12" style="height:600px;">
                    <n-tree 
                        :data="getStr(tree.treeData)" 
                        block-line 
                        :pattern="pattern"
                        :render-prefix="renderPrefix"
                        virtual-scroll
                        class="treeH"
                        style="height: 600px;"
                        :default-expanded-keys="defaultKeys"
                        @update:selected-keys="(e)=>{
                            if(e[0]) {
                              target.targetId = e[0]
                              target.targetName = filterTableMater(e[0],tree.treeData).orgName
                            }
                            
                        }"
                    />
                </n-space>
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
import { organList, rightList, orgSort } from './api'
import NwIcon from '/@/components/nw-icon/index.vue'

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
    const tree = reactive({treeData:[],})
    const pattern = ref('')
    const sonFn = (e) => {
      showModalRef.value = true 
      model.value = e
      isLoading.value = true
      const fn = organList({id:e.parentId}) 
      fn.then((res)=>{
          const _arr = []
           const getStr = (list)=>{
                list.forEach((row)=>{
                    
                        row.label = row.orgName
                        row.key = row.id
                        _arr.push(row)
                    
                })
            }
            getStr(res)
            tree.treeData = res
            isLoading.value = false
        }).finally(r => {
             
            isLoading.value = false
      })
    };
    const renderPrefix = ({ option }) => {
        return h(
            NwIcon,
            { name:option.orgType ==1 ? "icon-zuzhijigou2" : "icon-bumen1" },
            
        )
    }
    const onPositiveClick =()=>{
        isLoading.value = true
       orgSort({
           sourceId:model.value.id,
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
      renderPrefix,
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      tree,
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
    getStr(list){
        list.forEach((row)=>{
           
                if(row.parentId == '0') {
                     row.disabled = true
                }
                if(this.model.value.id==row.id ){
                    row.disabled = true
                }
            
        })
        return list
    }
     
   }
})
</script>
