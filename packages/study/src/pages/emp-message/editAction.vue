<template>
  <n-modal
    v-model:show="formVisible"
    preset="dialog"
    title="Dialog"
    style="width: 1400px; "
  >
    <template #header>
      <div>学员信息</div>
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
        <n-layout-content ref="content" >
          <n-form
            label-placement="left"
            style="padding-right: 15px; margin-bottom: 50px"
          >
            <n-divider title-placement="left" dashed ref="basic"><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>基本信息</n-divider>
            <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
             
              <n-gi>
                <n-form-item label="账号" path="userName">
                  <span >{{ model.data.userName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="姓名" path="userNameCh">
                  <span >{{ model.data.userNameCh }}</span>
                </n-form-item>
              </n-gi>
           
              
              <n-gi>
                <n-form-item label="证件类型" path="cardType">
                 
                  <span >{{(model.data.cardType || model.data.cardType == 0) ? cardTypes.filter(d=>d.value==model.data.cardType)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="证件号" path="idCard">
                  
                  <span>{{model.data.idCard}}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="用户类型" path="userType">
                 
                  <span >{{(model.data.userType || model.data.userType == 0) ? userTypes.filter(d=>d.value==model.data.userType)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="手机号" path="phoneNum">
                  <span >{{ model.data.phoneNum }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="来源" path="email">
                  <span >{{(model.data.userClass || model.data.userClass == 0) ? userClassS.filter(d=>d.value==model.data.userClass)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="性别" path="sex">
                  
                  <span>{{model.data.sex ? sexList.filter(d=>d.value==model.data.sex)[0].label : ''}}</span>
                  
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-grid-item>
                  <n-form-item label="是否启用" path="status">
                   
                    <span >{{model.data.status==1?'启用':'停用'}}</span>

                  </n-form-item>
              </n-grid-item>
             </n-gi>
              <n-gi>
                <n-grid-item>
                  <n-form-item label="所属部门" path="parentDeptName">
                   
                    <span >{{model.data.parentDeptName}}</span>

                  </n-form-item>
              </n-grid-item>
             </n-gi>
            </n-grid>

          </n-form>
        </n-layout-content>
      </n-layout>
    </n-layout>
   </n-spin>
   <template #action>
      <n-button size="small" @click="formVisible = false">关闭</n-button>
     
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
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";

import {  studyUserDetail} from './api'
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
    
    NModal,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props) {
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
    const employmentTypes = ref([
        { label: '合同制(正式员工)', value: 0},
        { label: '派遣制', value: 1},
        { label: '外包制(外协员工)', value: 2},
        { label: '临时工', value: 3},
        { label: '实习生', value: 4}
    ])
    const whetherList = reactive([
        { label: '是', value: 1},
        { label: '否', value: 0}
    ])
    const marriageStatusL = reactive([
        { label: '无', value: 2},
        { label: '已婚', value: 1},
        { label: '未婚', value: 0}
    ])
    const religionList = reactive([
      { label: '无信仰', value: 0 },
      { label: '佛教', value: 1 },
      { label: '喇嘛教', value: 2 },
      { label: '道教', value: 3 },
      { label: '天主教', value: 4 },
      { label: '基督教', value: 5 },
      { label: '东正教', value: 6 },
      { label: '伊斯兰教', value: 7 },
      { label: '其他', value: 8 },
    ])
    const sonFn = (e) => {
      
      formVisible.value = true
      studyUserDetail(e.id).then((res)=>{
         model.data ={...res}
      })
     
    
    }
     const politicsList = reactive([
         { label: '中共党员', value: 0 },
         { label: '中共预备役党员', value: 1 },
         { label: '共青团员', value: 2 },
         { label: '民革会员', value: 3 },
         { label: '民盟盟员', value: 4 },
      ])
    const  healthConditionList = reactive([
         { label: '健康或良好', value: 0 },
         { label: '一般或较弱', value: 1 },
         { label: '有慢性病', value: 2 },
         { label: '残疾', value: 3 },
      ])
   
  
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
      politicsList,
      whetherList,
      marriageStatusL,
      healthConditionList,
      religionList,
      sexList,
      cardTypes,
      model,
      getTime,
      message,
      spinShow,
      orgName,
      basic,
      basicInfoEdit,
      linkmanMessageEdit,
      registeredEdit,
      registered,
      employmentTypes,
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
    };
  },
  created() {
    
  },
  methods: {
    handleSave() {
      this.spinShow = true
      
      editEmp(this.model.data).then((res) => {
        if (res === true) {
          this.message.success("操作成功");
          this.spinShow = false
          this.formVisible = false;
          this.$emit('update:callback');
        }
      }).catch(e=>{
        this.message.error(e);
        
      })
    },
 
    menuSelect(key, item) {
      let top = this[item.value].$el.offsetTop - 24;
      this.$refs.content.scrollTo({ top, behavior: "smooth" });
    },
  },
});
</script>