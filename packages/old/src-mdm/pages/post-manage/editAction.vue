<template>
  <n-modal
    v-model:show="formVisible"
    preset="dialog"
    title="Dialog"
    style="width: 1400px; "
  >
    <template #header>
      <div>岗位信息</div>
    </template>
  <n-spin :show="spinShow">
    <n-layout style="height: 800px">
      <n-layout
        has-sider
        position="absolute"
        style="
          top: 0px;
          bottom: 0px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.09);
        "
      >
        <n-layout-sider
          ref="sider"
          bordered
          collapse-mode="width"
          :width="305"
          style="
            margin-right: 10px;
            border-right: 1px solid rgba(0, 0, 0, 0.09);
          "
        >
          <n-menu
            :collapsed-width="70"
            :collapsed-icon-size="22"
            :default-value="1"
            :options="menuOptions"
            :on-update:value="menuSelect"
            style="width: 300px"
          />
        </n-layout-sider>
        <n-layout-content ref="content" :native-scrollbar="false">
          <n-form
            label-placement="left"
            style="padding-right: 15px; margin-bottom: 50px"
          >
            <n-divider title-placement="left" dashed ref="basic"><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>基本信息
              <n-button
                text
                type="info"
                style="position: absolute; right: 0px; background: #fff"
                @click="basicInfoEdit = !basicInfoEdit"
              >
                <template #icon>
                  <nw-icon name="icon-bianji" :size="20" />
                </template>
                {{ !basicInfoEdit ? "编辑" : "取消" }}
              </n-button></n-divider
            >
            <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
             
              <n-gi>
                <n-form-item label="岗位名称" path="postName">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入岗位名称"
                    size='small'
                    v-model:value="model.data.postName"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.postName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="岗位编号" path="postCode">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入岗位编号"
                    size='small'
                    v-model:value="model.data.postCode"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.postCode }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="上级部门" path="postUpParentId">
                   <n-tree-select 
                       v-if="basicInfoEdit"
                       :value='model.data.postUpParentId'
                      @update:value="(p)=>{
                       
                        model.data.postUpParentId=p
                        model.data.postUpParentName=filterTableMater(p,treeList).orgName
                        postUpParentChange(p)
                        
                      }"
                       :options="treeList" 
                       size="small" 
                       v-model="model.data.postUpParentId" 
                       default-expand-all  
                  />
                      
                  <span v-if="!basicInfoEdit">{{ model.data.postUpParentName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="上级岗位" path="postUpId">
                  <!-- <n-select
                    v-if="basicInfoEdit"
                     size='small'
                     @update:value="(p)=>{
                        model.data.postUpName = post.postUpIds.filter(d=>d.id==p)[0].label
                      }"
                    v-model:value="model.data.postUpId"
                    placeholder="请选择上级岗位"
                    :options="post.postUpIds"
                  /> -->
                   <n-input v-if="basicInfoEdit" size='small' class="my-search" placeholder="" disabled :value="model.data.postUpName ?model.data.postUpName:'' ">
                        <template #suffix>
                            <n-button type="info"   @Click="(e)=>{
                              if(model.data.postUpParentId){
                                 showPostPickModal({parentDeptId:model.data.postUpParentId,isUp:true})
                              } else {
                                  message.error('请先选择上级部门')
                              }
                             
                            }">选择</n-button>
                        </template>
                    </n-input>
                  <span v-if="!basicInfoEdit">{{ model.data.postUpName }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="下级部门" path="postLowParentId">
                   <n-tree-select 
                       v-if="basicInfoEdit"
                       :value='model.data.postLowParentId'
                      @update:value="(p)=>{
                       
                        model.data.postLowParentId=p
                        model.data.postLowParentName=filterTableMater(p,treeList).orgName
                        postUpParentChange(p)
                        
                      }"
                       :options="treeList" 
                       size="small" 
                       v-model="model.data.postLowParentId" 
                       default-expand-all  
                  />
                      
                  <span v-if="!basicInfoEdit">{{ model.data.postLowParentName }}</span>
                </n-form-item>
              </n-gi>
         
              <n-gi>
                <n-form-item label="下级岗位" path="postLowName">
                   <!-- <n-input
                    v-if="basicInfoEdit"
                    disabled
                    size='small'
                    v-model:value="model.data.postLowName"
                  /> -->
                  <n-input v-if="basicInfoEdit" size='small' class="my-search" placeholder="" disabled :value="model.data.postLowName ?model.data.postLowName:'' ">
                        <template #suffix>
                            <n-button type="info"   @Click="(e)=>{
                              if(model.data.postLowParentId){
                                 showPostPickModal({parentDeptId:model.data.postLowParentId,isUp:false})
                              } else {
                                  message.error('请先选择下级部门')
                              }
                             
                            }">选择</n-button>
                        </template>
                    </n-input>
                  <span v-if="!basicInfoEdit">{{ model.data.postLowName }}</span>
                </n-form-item>
              </n-gi>
             <n-gi>
                <n-form-item label="岗位序列" path="postSequId">
                  <n-select
                    v-if="basicInfoEdit"
                    size='small'
                    @update:value="postSequIdChange(p)"
                    v-model:value="model.data.postSequId"
                    placeholder="请选择岗位序列"
                    :options="dictionaries.mdmPostSequDictList"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.postSequName }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="岗位职等" path="postGradeId">
                  <n-select
                    v-if="basicInfoEdit"
                     size='small'
                      @update:value="postGradeIdChange(p)"
                    v-model:value="model.data.postGradeId"
                    placeholder="请选择岗位职等"
                    :options="dictionaries.mdmPostGradeDictList"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.postGradeName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="岗位标识" path="postTagId">
                   <n-select
                      v-if="basicInfoEdit"
                      size='small'
                       @update:value="postTagIdChange(p)"
                      v-model:value="model.data.postTagId"
                      placeholder="请选择上级岗位"
                      :options="dictionaries.mdmPostTagDictList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.postTagName}}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-grid-item>
                  <n-form-item label="是否启用" path="status">
                    <n-select
                        v-if="basicInfoEdit"
                          v-model:value="model.data.status"
                          size="small"
                          placeholder="请选择是否启用"
                          :options="status"
                      />
                  <span v-if="!basicInfoEdit">{{model.data.status==1?'启用':'停用'}}</span>

                  </n-form-item>
              </n-grid-item>
            </n-gi>
              <n-gi :span='24'>
                <n-form-item label="岗位职责" path="postDuty">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.postDuty" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.postDuty}}</span>
                </n-form-item>
              </n-gi>
              <n-gi :span='24'>
                <n-form-item label="胜任能力" path="postAbility">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.postAbility" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.postAbility}}</span>
                </n-form-item>
              </n-gi>
              <n-gi :span='24'>
                <n-form-item label="工作内容" path="postContent">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.postContent" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.postContent}}</span>
                </n-form-item>
              </n-gi>
              <n-gi :span='24'>
                <n-form-item label="考核指标" path="postCheck">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.postCheck" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.postCheck}}</span>
                </n-form-item>
              </n-gi>

            </n-grid>
            <n-divider title-placement="left" dashed ref="postMessage"><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>人员信息</n-divider>
            <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi span="24">
                <vxe-table
                  
                  :data="post.table"
                  style="width: 100%"
                  ref="postTable"
                  show-overflow
                >
              
                  <vxe-table-column
                    field="userNameCh"
                    title="人员名称"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="orgFullPostName"
                    title="所属单位"
                  >
                  </vxe-table-column>
                
                </vxe-table>
              </n-gi>
            </n-grid>
          </n-form>
        </n-layout-content>
      </n-layout>
    </n-layout>
   </n-spin>
   <template #action>
      <n-button size="small" @click="formVisible = false">取消</n-button>
      <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="handleSave"
        >保存</n-button
      >
    </template>
  </n-modal>
  <PostPickModal ref="postPickModal"
    :showSide="false"
    :multiple="false"
    @update:callback="
      (e) => {
        if(e.isUp){
           model.data.postUpId = e.id
          model.data.postUpName = e.postName
        } else {
          model.data.postLowId = e.id
          model.data.postLowName = e.postName
        }
        
        //$refs.nwTable.commitQuery();
      }
    "
  ></PostPickModal>
</template>
 
<script>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { NwIcon } from '@platform/main';
import { h, defineComponent, ref, reactive, getCurrentInstance, onMounted  } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NRadioGroup,
  NSpace,
  NDatePicker,
  NMenu,
  NGrid,
  NGi,
  NDivider,
  NLayoutSider,
  NModal,
   NTreeSelect,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { editPost, mdmPostSequDictList, mdmPostGradeDictList,mdmPostTagDictList, orgPost,getUserByUserId } from './api'
import PostPickModal from '../../components/postPickModal/postPickModal.vue'

export default defineComponent({
  components: {
    NDrawer,
     NTreeSelect,
    NDrawerContent,
    NwTable,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NwTableFun,
    NForm,
    NFormItem,
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NRadioGroup,
    NSpace,
    NDatePicker,
    NMenu,
    NGrid,
    NGi,
    NDivider,
    NLayoutSider,
    PostPickModal,
    NModal,
  },
  props: {
    treeList:{
         default:()=>[],
         type:Array
      }
  },
  setup(props) {
    const nwTable = ref(null);
    const formVisible = ref(false)
    const { proxy } = getCurrentInstance();
    const model = reactive({data:{}});
    const message = useMessage();
    const spinShow = ref(false);
    const basicInfoEdit = ref(false); // 判断基本信息编辑或取消
    const postPickModal  = ref()
    const showPostPickModal = (row) =>{
        postPickModal.value.sonFn(row);
    }
    const basic = ref(null);
    const postMessage = ref(null);
    const post = reactive({table:[],postUpIds:[]})
    const dictionaries = reactive({
        mdmPostSequDictList:[], //岗位序列
        mdmPostGradeDictList:[], //岗位职等
        mdmPostTagDictList:[], //岗位标识
    })
    
    const whetherList = reactive([
        { label: '是', value: 1},
        { label: '否', value: 0}
    ])
  const postUpParentChange=(p)=>{
        orgPost({id:p}).then((res)=>{
          post.postUpIds = res.map((d)=>{
                  d.label = d.postName
                  d.value=d.id
                  return d
                })
        })
      }
    const sonFn = (e) => {
      formVisible.value = true
      model.data = e 
      // if(e.postUpParentId) {
      //   postUpParentChange(e.postUpParentId)
      // }
      if(e.postSequId){
        mdmPostGradeDictList({
              postSequId:e.postSequId,
              postSequName:e.postSequName
            }).then((res)=>{
              dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
                d.label = d.postGradeName
                d.value=d.id
                return d
              })
            })
      }
      
      getUserByUserId({id:e.id}).then((res)=>{
            if(res){
              post.table = res
              
            }
      })
    }
  
    const  formatDate =(date) =>{
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;//
      }
      const getTime=(e)=>{
        // var date = e ? new Date(e):null;
        return  e ? new Date(e).getTime() : null
      }
    
    const menuOptions = [
      { label: "基本信息", key: 1, value: "basic" },
     
      { label: "人员信息", key: 4, value: "postMessage" },
    ];
    onMounted(async () => {
       mdmPostSequDictList({}).then((res)=>{
           dictionaries.mdmPostSequDictList = res.records.map((d)=>{
            d.label = d.postSequName
            d.value=d.id
            return d
          })
        })
        // //岗位职等
        // mdmPostGradeDictList({}).then((res)=>{
        //    dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
        //     d.label = d.dutyTypeName
        //     d.value=d.id
        //     return d
        //   })
        // })
        //岗位标识
        mdmPostTagDictList({}).then((res)=>{
           dictionaries.mdmPostTagDictList = res.records.map((d)=>{
            d.label = d.postTagName
            d.value=d.id
            return d
          })
        })
    })
    return {
      formVisible, //模态框控制
      sonFn,
      whetherList,
      postUpParentChange,
      model,
      formatDate,
      getTime,
      message,
      spinShow,
      menuOptions,
      basic,
     dictionaries,
      postMessage,
      post,
      basicInfoEdit,
      postPickModal,
      showPostPickModal,
      status: reactive([
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ]),
   
    };
  },
  created() {
    
  },
  methods: {
    handleSave() {
      this.spinShow = true
      
      editPost(this.model.data).then((res) => {
        if (res === true) {
          this.message.success("操作成功");
          this.spinShow = false
          this.formVisible = false;
          this.$emit('update:callback');
        }
      }).catch(e=>{
       
        
      }).finally(r => {
             
            this.spinShow = false
      })
    },
    filterTableMater(id, arr) {
      for (const item of arr) {
        if (item.id === id) return item
        if (item.kids && item.kids.length) {
          const _item = this.filterTableMater(id, item.kids)
          if (_item) return _item
        }
      }
    },
    postSequIdChange(v){
        this.dictionaries.mdmPostSequDictList.map((d)=>{
          if(d.id == v) {
              this.model.data.postSequName =d.postSequName
          }
        })//岗位职等
        mdmPostGradeDictList({
              postSequId:v,
              postSequName:this.model.data.postSequName
            }).then((res)=>{
              this.dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
                d.label = d.postGradeName
                d.value=d.id
                return d
              })
            })
    },
    postTagIdChange(p){
        
        this.dictionaries.mdmPostTagDictList.map((d)=>{
          if(d.id == p) {
              this.model.data.postTagName =d.label
          }
        })
      },
    postGradeIdChange(p){
       
        this.dictionaries.mdmPostGradeDictList.map((d)=>{
          if(d.id == p) {
              this.model.data.postGradeName =d.label
          }
        })
    },
    menuSelect(key, item) {
      let top = this[item.value].$el.offsetTop - 24;
      this.$refs.content.scrollTo({ top, behavior: "smooth" });
    },
  },
});
</script>