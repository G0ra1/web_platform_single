<template>
   <n-input  class="my-search" placeholder="" size='small' disabled :title="props.orgUserName"  :value="props.orgUserName || '未选择用户'" v-if="isShowSearch">
        <template #suffix>
            <n-button type="info"   @Click="(e)=>{sonFn()}">选择</n-button>
        </template>
  </n-input>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="选择组织"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width:500px;"
  >
     <n-grid > 
        <n-grid-item span="24" style="height: 800px;" v-if="showSide">
            <div class="sider">
                <n-input v-model:value="pattern" placeholder="搜索" />
                <n-spin :show="spinShow" >
                    <n-tree   size="small" 
                        placeholder="请选择"  
                        :data="tree.treeList"
                        style='height:750px;padding:5px 0'
                        block-line 
                        virtual-scroll
                        checkable
                        :default-checked-keys="defaultCheckedKeys"
                        :default-expanded-keys="defaultExpandedKeys"
                        @update:checked-keys="checkedKeys" 
                    />
                </n-spin>
            </div>
        </n-grid-item>        
      </n-grid >
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
    NSelect,
    NTree,
    NSpin
} from 'naive-ui'
import { rightList,  } from './api'

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
        NTree,
        NSpin
    },
    props: {
         model: {
          default: ()=>{},
          type: Object,
        },
        multiple: {
            type: Boolean,
            default: true
        },
        propTreeList:{
           type: Object,
            default: ()=>null
        },
        showSide: {
            type: Boolean,
            default: true
        },
         isShowSearch: {
            type: Boolean,
            default: false
        },
        value:{
           type: Array,
            default: ()=>[]
        },
        orgUserName: {
            type: String,
            default: () => "",
        },
        isDisabled: {
             type: Array,
            default: ()=>[]
        }
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const leftSpinShow = ref(false)
    const spinShow = ref(false);
    const xTable = ref()
    const model = ref({})
    const defaultKey = ref()
    const tree = reactive({
        treeList:[], //原始数据
       
    })
    const alreadyDept = ref([])
    const orgId = ref('')
    const selectRow = ref({})
    const pattern = ref('')
    const defaultCheckedKeys = ref([])
    const defaultExpandedKeys = ref([])
    const sonFn = (arr) => {
      showModalRef.value = true
      spinShow.value = true
     
      rightList({isDefault:0,status:1,}).then((res) => {
               
                const getStr = (list)=>{
                    list.forEach((row)=>{
                        if(row.kids.length>0){
                            row.label = row.orgName
                            row.key = row.id 
                            row.children = row.kids
                            row.disabled = props.isDisabled.length>0 ? !props.isDisabled.includes(row.id ) : false
                            getStr(row.kids)
                    }else {
                        row.label = row.orgName
                        row.key = row.id
                        row.disabled = props.isDisabled.length>0 ? !props.isDisabled.includes(row.id ) : false
                    }
                })
            }
                getStr(res)
                leftSpinShow.value = false
                tree.treeList = res
                if(props.isShowSearch) {
                    defaultCheckedKeys.value = props.value.map(d=>d.orgId ? d.orgId :d.rangeId )
                } else {
                    defaultCheckedKeys.value = arr.map(d=>d.orgId ? d.orgId :d.rangeId )
                }
                 defaultExpandedKeys.value = res.filter(d=>d.level == 1).map(f=>f.id)
                  spinShow.value = false
            }).finally(() => {
                spinShow.value = false
            });
       
    };

    const checkedKeys = (arr,e) =>{
      alreadyDept.value = []
      alreadyDept.value = e.map(d=>{
          d.orgId = d.id
          d.orgType = d.orgType
          d.orgName = d.label
          return d
      })
    }
    const onPositiveClick =(row) =>{
        spinShow.value = true
        if(!props.multiple){
            context.emit('update:callback',{});
           spinShow.value = false
        } else {
            // post.alreadyPostList.map((d)=>{
            //     d.userName = model.value.userName
            //     d.userId = model.value.userId
            //      d.userNameCh = model.value.userNameCh
            //     //  d.postId = d.id
            // })
            context.emit('update:callback',alreadyDept.value);
            spinShow.value = false
        }
    }
    onMounted(async () => {
        
    })
    return {
      sonFn,
      checkedKeys,
      spinShow,
      leftSpinShow,
      orgId,
      defaultCheckedKeys,
      defaultExpandedKeys,
      defaultKey,
      xTable,
      model, // 表单数据
      showModal: showModalRef,
      tree,
      pattern,
      selectRow,
      props,
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
<style lang="less">
.employeePickModal {
    .ivu-modal-body {
        padding: 0;
    }
}
.employeePick {
    height: 34px;
    .viewEmployeeColumnDel {
        padding: 2px;
        .ivu-table-cell {
            padding: 0 0 0 10px
        }
    }
    .table-title {
        font-size: 14px;
        font-weight: bold;
        text-indent: 10px;
        .table-title-btn {
            float: right;
            margin: 10px;
        }
    }
    .employeePickInput {
        .ivu-input {
            background-color: #fff;
            color: #333;
            cursor: help;
        }
    }
    .ivu-poptip {
        .ivu-poptip-rel {
          width: 100%;
          vertical-align: middle;
        }
        .ivu-poptip-body {
            padding: 0
        }
    }
    .table-left {
        border-top: 0;
        border-bottom: 0;
        border-right: 0;
    }
    .table-right {
        border: 0;
    }
    .ivu-modal-body {
        padding: 0;
    }
    .ivu-modal-footer {
        border-top: 0;
    }
    .sider {
        padding: 5px;
        border-bottom: 1px solid #dcdee2;
        height: 500px;
       
    }
    .ivu-poptip-popper{
        padding: 0
    }
}
</style>
