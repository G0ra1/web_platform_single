<template>
  <n-modal
    v-model:show="formVisible"
    preset="dialog"
    title="Dialog"
    style="width: 1200px; "
  >
    <template #header>
      <div>人员信息</div>
    </template>
    <n-spin :show="spinShow">
      <n-form label-placement="left" >
        <!-- <n-divider title-placement="left" dashed ref="basic"><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>基本信息</n-divider> -->
        <n-grid :cols="3" x-gap="12"  y-gap="25" style="width:90%;margin:0 auto">
          
          <n-gi>
            <n-form-item label="姓名:" path="userNameCh">
              <span >{{ model.data.userNameCh }}</span>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="证件类型:" path="cardType">
              <span >{{(model.data.cardType || model.data.cardType == 0) ? cardTypes.filter(d=>d.value==model.data.cardType)[0].label : ''}}</span>
            </n-form-item>
          </n-gi>
            <n-gi>
            <n-form-item label="证件号:" path="idCard">
              <span>{{model.data.idCard}}</span>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="手机号:" path="phoneNum">
              <span >{{ model.data.phoneNum }}</span>
            </n-form-item>
          </n-gi>
         
          <n-gi>
            <n-form-item label="性别:" path="sex">
              <span>{{model.data.sex ? sexList.filter(d=>d.value==model.data.sex)[0].label : ''}}</span>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="单位名称:" path="unitName">
              <span>{{model.data.unitName}}</span>
            </n-form-item>
          </n-gi>
           <n-gi>
            <n-form-item label="人员情况:" path="userConditionName">
              <span>{{model.data.userConditionName}}</span>
            </n-form-item>
          </n-gi>
           <n-gi>
            <n-form-item label="用户类型:" path="userType">
              <span >{{[
                          { label: '讲师', value: "1"},
                          { label: '学员', value: "2"}
                        ].filter(d=>( model.data.userType.split(',')).indexOf(d.value) > -1).map(item=>item.label).join(',') }}</span>
            </n-form-item>
          </n-gi>
           <n-gi>
            <n-form-item label="申请时间:" path="createTime">
              <span>{{model.data.createTime}}</span>
            </n-form-item>
          </n-gi>
           <n-gi>
            <n-form-item label="服务单位:" path="parentOrgName">
              <span>{{model.data.parentOrgName}}</span>
            </n-form-item>
          </n-gi>
           <n-gi  v-if="model.data.userStatus != 0">
            <n-form-item label="服务部门:" path="parentDeptName">
              <span>{{model.data.parentDeptName}}</span>
            </n-form-item>
          </n-gi>
          <n-gi v-if="model.data.userStatus == 0">
            <n-form-item label="服务部门:" path="parentDeptId" >
             <n-tree-select 
                             
                    @update:value="(p)=>{
                      model.data.parentDeptId=p
                      model.data.parentDeptName=filterTableMater(p,treeList).orgName
                      model.data.orgFullId=filterTableMater(p,treeList).orgFullId
                      model.data.orgFullName=filterTableMater(p,treeList).orgFullName
                      model.data.parentDeptFullName=filterTableMater(p,treeList).parentDeptFullName 
                    }"
                    
                    filterable
                    clearable
                    :options="treeList" 
                    v-model="model.parentDeptId" 
                  />
            </n-form-item>
          </n-gi>
          <n-gi :span="24">
            <n-form-item label="描述:" path="description">
              <span >{{ model.data.description }}</span>
            </n-form-item>
          </n-gi>
          <n-gi :span="24" style="text-align:center;margin-top:10px">
             
          </n-gi>
        </n-grid>
      </n-form>
     
   </n-spin>
   <template #action>
      <n-button size="small" @click="formVisible = false" v-if="model.data.userStatus != 0">关闭</n-button>
       <n-button
        v-if="model.data.userStatus == 0"
        type="info"
        @click="passClick"
      >通过</n-button>
      <n-button
        v-if="model.data.userStatus == 0"
        type="error"
        style="margin-left:5px"
        @click="rejectClick"
      >驳回</n-button>
    </template>
  </n-modal>
</template>

<script>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { NwIcon } from '@platform/main'

import { h, defineComponent, ref, reactive, getCurrentInstance, onMounted } from "vue";
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
  NTreeSelect
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";

import { rightList, updateYesEmp  } from "./api";
export default defineComponent({
  components: {
    NDrawer,
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
    NTreeSelect,
    NModal,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props, context) {
    const nwTable = ref(null);
    const formVisible = ref(false)
    const { proxy } = getCurrentInstance();
    const model = reactive({data:{}});
    const message = useMessage();
    const spinShow = ref(false);
    const basicInfoEdit = ref(false); // 判断基本信息编辑或取消
    const linkmanMessageEdit = ref(false);// 判断联系人信息编辑或取消
    const registeredEdit = ref(false);// 判断户口信息编辑或取消
   
    const basic = ref(null);
    const registered = ref(null);
    const dictionaries = reactive({
      AE:[], //民族
      AD:[], //国籍
    })
    const userTypes = ref([
      { label: '管理员', value: 0},
        { label: '讲师', value: 1},
        { label: '学员', value: 2}
    ])
    const showOrgName = ref(true)
    const orgName = reactive('')
    const cardTypes = reactive([
      { label: '居民身份证', value: 0 },
      { label: '港澳居民来往内地通信证', value: 1 },
      { label: '港澳居民居住证', value: 2 },
      { label: '台湾居民来往大陆通行证', value: 3 },
      { label: '台湾居民居住证', value: 4 },
      { label: '外国护照', value: 5 },
      { label: '外国人永久居留身份证', value: 6 },
      { label: '外国人居留证', value: 7 },
    ])
    const sexList = ref([
        { label: '男', value: 1},
        { label: '女', value: 2}
    ])
    const userClassS = ref([
        { label: '外部人员', value: 3},
        { label: '主数据', value: 2}
    ])
  
    const treeList = ref([])
    const sonFn = (e) => {
      formVisible.value = true
      model.data ={...e}
      console.log(e)
      rightList({ status: 1, parentId: e.parentOrgId, isDefault: 0, orgType:2  }).then(
        (res) => {
          const getStr = (list)=>{
              list.forEach((row)=>{
                row.level = row.level +1
                  if(row.kids.length>0){
                      row.label = row.orgName
                      row.key = row.id 
                      row.children = row.kids
                      getStr(row.kids)
                  }else {
                      row.label = row.orgName
                      row.key = row.id
                  }
              })
            }
            getStr(res)
            treeList.value = res
        }
      );
    }
    const getTime=(e)=>{
        // var date = e ? new Date(e):null;
        return  e ? new Date(e).getTime() : null
    }
    
    onMounted(async () => {
    
    
    })
    return {
      dictionaries,
      formVisible, //模态框控制
      sonFn,
      userTypes,
      userClassS,
      sexList,
      cardTypes,
      model,
      getTime,
      message,
      treeList,
      spinShow,
      orgName,
      basic,
      basicInfoEdit,
      linkmanMessageEdit,
      registeredEdit,
      registered,
      showOrgName,
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
      passClick() {
       
        updateYesEmp([{...model.data,userStatus:1}]).then((res)=>{
           formVisible.value = false
            context.emit('update:callback');
        })
      },
      rejectClick() {
       
        updateYesEmp([{...model.data,userStatus:2}]).then((res)=>{
          formVisible.value = false
           context.emit('update:callback');
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
    };
  },
  created() {
    
  },
  methods: {
 
 
    menuSelect(key, item) {
      let top = this[item.value].$el.offsetTop - 24;
      this.$refs.content.scrollTo({ top, behavior: "smooth" });
    },
  },
});
</script>