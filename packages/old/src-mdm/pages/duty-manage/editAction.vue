<template>
  <n-modal
    v-model:show="formVisible"
    preset="dialog"
    title="Dialog"
    style="width: 1400px; "
  >
    <template #header>
      <div>职务信息</div>
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
                <n-form-item label="职务名称" path="dutyName">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入职务名称"
                    size='small'
                    v-model:value="model.data.dutyName"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.dutyName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="职务编号" path="dutyCode">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入职务编号"
                    size='small'
                    v-model:value="model.data.dutyCode"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.dutyCode }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="上级部门" path="dutyUpParentId">
                   <n-tree-select 
                       v-if="basicInfoEdit"
                       :value='model.data.dutyUpParentId'
                      @update:value="(p)=>{
                       
                        model.data.dutyUpParentId=p
                        model.data.dutyUpParentName=filterTableMater(p,treeList).orgName
                        dutyUpParentChange(p)
                        
                      }"
                       :options="treeList" 
                       size="small" 
                       v-model="model.data.dutyUpParentId" 
                       default-expand-all  
                  />
                      
                  <span v-if="!basicInfoEdit">{{ model.data.dutyUpParentName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="上级职务" path="dutyUpId">
                
                   <n-input v-if="basicInfoEdit" size='small' class="my-search" placeholder="" disabled :value="model.data.dutyUpName ?model.data.dutyUpName:'' ">
                        <template #suffix>
                            <n-button type="info"   @Click="(e)=>{
                              if(model.data.dutyUpParentId){
                                 showPostPickModal({parentDeptId:model.data.dutyUpParentId,isUp:true})
                              } else {
                                  message.error('请先选择上级部门')
                              }
                             
                            }">选择</n-button>
                        </template>
                    </n-input>
                  <span v-if="!basicInfoEdit">{{ model.data.dutyUpName }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="下级部门" path="dutyLowParentId">
                   <n-tree-select 
                       v-if="basicInfoEdit"
                       :value='model.data.dutyLowParentId'
                      @update:value="(p)=>{
                       
                        model.data.dutyLowParentId=p
                        model.data.dutyLowParentName=filterTableMater(p,treeList).orgName
                        dutyUpParentChange(p)
                        
                      }"
                       :options="treeList" 
                       size="small" 
                       v-model="model.data.dutyLowParentId" 
                       default-expand-all  
                  />
                      
                  <span v-if="!basicInfoEdit">{{ model.data.dutyLowParentName }}</span>
                </n-form-item>
              </n-gi>
         
              <n-gi>
                <n-form-item label="下级职务" path="dutyLowName">
                   <!-- <n-input
                    v-if="basicInfoEdit"
                    disabled
                    size='small'
                    v-model:value="model.data.dutyLowName"
                  /> -->
                  <n-input v-if="basicInfoEdit" size='small' class="my-search" placeholder="" disabled :value="model.data.dutyLowName ?model.data.dutyLowName:'' ">
                        <template #suffix>
                            <n-button type="info"   @Click="(e)=>{
                              if(model.data.dutyLowParentId){
                                 showPostPickModal({parentDeptId:model.data.dutyLowParentId,isUp:false})
                              } else {
                                  message.error('请先选择下级部门')
                              }
                             
                            }">选择</n-button>
                        </template>
                    </n-input>
                  <span v-if="!basicInfoEdit">{{ model.data.dutyLowName }}</span>
                </n-form-item>
              </n-gi>
             <n-gi>
                <n-form-item label="职务序列" path="dutySequId">
                  <n-select
                    v-if="basicInfoEdit"
                    size='small'
                    @update:value="dutySequIdChange(p)"
                    v-model:value="model.data.dutySequId"
                    placeholder="请选择职务序列"
                    :options="dictionaries.mdmPostSequDictList"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.dutySequName }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="职务职等" path="dutyGradeId">
                  <n-select
                    v-if="basicInfoEdit"
                     size='small'
                      @update:value="dutyGradeIdChange(p)"
                    v-model:value="model.data.dutyGradeId"
                    placeholder="请选择职务职等"
                    :options="dictionaries.mdmPostGradeDictList"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.dutyGradeName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="职务标识" path="dutyTagId">
                   <n-select
                      v-if="basicInfoEdit"
                      size='small'
                       @update:value="dutyTagIdChange(p)"
                      v-model:value="model.data.dutyTagId"
                      placeholder="请选择上级职务"
                      :options="dictionaries.mdmPostTagDictList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.dutyTagName}}</span>
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
                <n-form-item label="职务职责" path="dutyDuty">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.dutyDuty" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.dutyDuty}}</span>
                </n-form-item>
              </n-gi>
              <n-gi :span='24'>
                <n-form-item label="胜任能力" path="dutyAbility">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.dutyAbility" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.dutyAbility}}</span>
                </n-form-item>
              </n-gi>
              <n-gi :span='24'>
                <n-form-item label="工作内容" path="dutyContent">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.dutyContent" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.dutyContent}}</span>
                </n-form-item>
              </n-gi>
              <n-gi :span='24'>
                <n-form-item label="考核指标" path="dutyCheck">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      type="textarea"
                      placeholder="请输入" 
                      v-model:value="model.data.dutyCheck" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.dutyCheck}}</span>
                </n-form-item>
              </n-gi>

            </n-grid>
            <n-divider title-placement="left" dashed ref="dutyMessage"><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>人员信息</n-divider>
            <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi span="24">
                <vxe-table
                  
                  :data="duty.table"
                  style="width: 100%"
                  ref="dutyTable"
                  show-overflow
                >
              
                  <vxe-table-column
                    field="userNameCh"
                    title="人员名称"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="orgFullDutyName"
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
  <DutyPickModal ref="dutyPickModal"
    :showSide="false"
    :multiple="false"
    @update:callback="
      (e) => {
        if(e.isUp){
           model.data.dutyUpId = e.dutyId
          model.data.dutyUpName = e.dutyName
        } else {
          model.data.dutyLowId = e.dutyId
          model.data.dutyLowName = e.dutyName
        }
        
        //$refs.nwTable.commitQuery();
      }
    "
  ></DutyPickModal>
</template>
 
<script>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);

import { NwIcon } from '@platform/main'

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
import { editPost, mdmPostSequDictList, mdmPostGradeDictList,mdmPostTagDictList, orgPost,getUserByUserId } from './api'
import DutyPickModal from '../../components/dutyPickModal/dutyPickModal.vue'

export default defineComponent({
  components: {
    NDrawer,
     NTreeSelect,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
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
    DutyPickModal,
    NModal,
  },
  props: {
    treeList:{
         default:()=>[],
         type:Array
      }
  },
  setup(props) {
    const formVisible = ref(false)
    const { proxy } = getCurrentInstance();
    const model = reactive({data:{}});
    const message = useMessage();
    const spinShow = ref(false);
    const basicInfoEdit = ref(false); // 判断基本信息编辑或取消
    const dutyPickModal  = ref()
    const showPostPickModal = (row) =>{
        dutyPickModal.value.sonFn(row);
    }
    const basic = ref(null);
    const dutyMessage = ref(null);
    const duty = reactive({table:[],dutyUpIds:[]})
    const dictionaries = reactive({
        mdmPostSequDictList:[], //职务序列
        mdmPostGradeDictList:[], //职务职等
        mdmPostTagDictList:[], //职务标识
    })
    
    const whetherList = reactive([
        { label: '是', value: 1},
        { label: '否', value: 0}
    ])
  const dutyUpParentChange=(p)=>{
        orgPost({id:p}).then((res)=>{
          duty.dutyUpIds = res.map((d)=>{
                  d.label = d.dutyName
                  d.value=d.id
                  return d
                })
        })
      }
    const sonFn = (e) => {
      formVisible.value = true
      model.data = e 
      // if(e.dutyUpParentId) {
      //   dutyUpParentChange(e.dutyUpParentId)
      // }
      if(e.dutySequId){
        mdmPostGradeDictList({
              dutySequId:e.dutySequId,
              dutySequName:e.dutySequName
            }).then((res)=>{
              dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
                d.label = d.dutyGradeName
                d.value=d.id
                return d
              })
            })
      }
      
      getUserByUserId({id:e.id}).then((res)=>{
            if(res){
              duty.table = res
              
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
     
      { label: "人员信息", key: 4, value: "dutyMessage" },
    ];
    onMounted(async () => {
       mdmPostSequDictList({}).then((res)=>{
           dictionaries.mdmPostSequDictList = res.records.map((d)=>{
            d.label = d.dutySequName
            d.value=d.id
            return d
          })
        })
        // //职务职等
        // mdmPostGradeDictList({}).then((res)=>{
        //    dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
        //     d.label = d.dutyTypeName
        //     d.value=d.id
        //     return d
        //   })
        // })
        //职务标识
        mdmPostTagDictList({}).then((res)=>{
           dictionaries.mdmPostTagDictList = res.records.map((d)=>{
            d.label = d.dutyTagName
            d.value=d.id
            return d
          })
        })
    })
    return {
      formVisible, //模态框控制
      sonFn,
      whetherList,
      dutyUpParentChange,
      model,
      formatDate,
      getTime,
      message,
      spinShow,
      menuOptions,
      basic,
     dictionaries,
      dutyMessage,
      duty,
      basicInfoEdit,
      dutyPickModal,
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
    dutySequIdChange(v){
        this.dictionaries.mdmPostSequDictList.map((d)=>{
          if(d.id == v) {
              this.model.data.dutySequName =d.dutySequName
          }
        })//职务职等
        mdmPostGradeDictList({
              dutySequId:v,
              dutySequName:this.model.data.dutySequName
            }).then((res)=>{
              this.dictionaries.mdmPostGradeDictList = res.records.map((d)=>{
                d.label = d.dutyGradeName
                d.value=d.id
                return d
              })
            })
    },
    dutyTagIdChange(p){
        
        this.dictionaries.mdmPostTagDictList.map((d)=>{
          if(d.id == p) {
              this.model.data.dutyTagName =d.label
          }
        })
      },
    dutyGradeIdChange(p){
       
        this.dictionaries.mdmPostGradeDictList.map((d)=>{
          if(d.id == p) {
              this.model.data.dutyGradeName =d.label
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