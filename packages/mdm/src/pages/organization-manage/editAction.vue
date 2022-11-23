<template>
  <n-modal
    v-model:show="formVisible"
    preset="dialog"
    title="Dialog"
    style="width: 1400px"
  >
    <template #header>
      <div>组织信息</div>
    </template>
    <n-spin :show="spinShow">
      <n-layout style="min-height: 700px">
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
            <h3 style="width: 100%">
              <span
                style="width: 80%; display: inline-block"
                v-show="showOrgName"
                >{{ orgName }}</span
              >
              <nw-icon
                name="icon-bianji1"
                style="cursor: pointer"
                v-if="showOrgName"
                @click="editOrgName"
              />
              <input
                type="text"
                size="small"
                v-if="!showOrgName"
                v-model="orgName"
              />
            </h3>
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
              :model="model.data"
              ref="formRef"
              :rules="rules"
              style="padding-right: 15px; margin-bottom: 50px"
            >
              <n-divider title-placement="left" dashed ref="basic"
                ><span style="color: #3f8fff; font-weight: bolder">|&nbsp</span
                >基本信息
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
              <n-grid :cols="3" x-gap="12" style="width: 90%; margin: 0 auto">
                <n-gi>
                  <n-form-item label="机构类型" path="orgType">
                    <span>{{
                      model.data.orgType == 1 ? "一级机构" : "一级部门"
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="主管机构" path="parentName">
                    <span>{{ model.data.parentName }}</span>
                  </n-form-item>
                </n-gi>
               <!-- <n-gi>
                <n-form-item label="NC组织名称" path="ncOrgName">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入NC组织名称"
                    v-model:value="model.data.ncOrgName"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.ncOrgName }}</span>
                </n-form-item>
              </n-gi> 
               <n-gi>
                <n-form-item label="NC组织编码" path="ncOrgCode">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入NC组织编码"
                    v-model:value="model.data.ncOrgCode"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.ncOrgCode }}</span>
                </n-form-item>
              </n-gi>  -->
                <!-- <n-gi>
                <n-form-item label="采机构名称" path="gepsJcOrgName">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入采机构名称"
                    v-model:value="model.data.gepsJcOrgName"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.gepsJcOrgName }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="采机构Id" path="gepsJcOrgId">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入采机构Id"
                    v-model:value="model.data.gepsJcOrgId"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.gepsJcOrgId }}</span>
                </n-form-item>
              </n-gi> -->
                <n-gi>
                  <n-form-item label="GEPS级别类型" path="lvType">
                     <n-select
                        
                        v-if="basicInfoEdit"
                        v-model:value="model.data.lvType"
                        placeholder="请选择级别类型"
                        :options="lvTypes"
                        :disabled='model.data.lvType==1'
                        
                      />
                      <span v-if="!basicInfoEdit">{{ model.data.lvType==1 ? '建设公司':(model.data.lvType ? lvTypes.filter(d=>d.value==model.data.lvType)[0].label : '') }}</span>

                  </n-form-item>
              </n-gi>
              <n-gi>
                  <n-form-item label="OA级别类型" path="oaLvType">
                     <n-select
                        
                        v-if="basicInfoEdit"
                        v-model:value="model.data.oaLvType"
                        placeholder="请选择级别类型"
                        :options="oaLvTypes"
                      />
                      <span v-if="!basicInfoEdit">{{ model.data.oaLvType ? oaLvTypes.filter(d=>d.value==model.data.oaLvType)[0].label : '' }}</span>

                  </n-form-item>
              </n-gi>
                <n-gi>
                  <n-form-item label="筹建批准文号" path="leadApproveCode">
                    <n-input
                      v-if="basicInfoEdit"
                      placeholder="请输入筹建批准文号"
                      v-model:value="model.data.leadApproveCode"
                    />
                    <span v-if="!basicInfoEdit">{{
                      model.data.leadApproveCode
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="筹建时间" path="leadTime">
                    <n-date-picker
                      v-if="basicInfoEdit"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="getTime(model.data.leadTime)"
                      size="small"
                      @update:value="
                        (p) => {
                          model.data.leadTime = formatDate(p);
                        }
                      "
                    />
                    <span v-if="!basicInfoEdit">{{ model.data.leadTime }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="成立时间" path="setupTime">
                    <n-date-picker
                      v-if="basicInfoEdit"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="getTime(model.data.setupTime)"
                      size="small"
                      @update:value="
                        (p) => {
                          model.data.setupTime = formatDate(p);
                        }
                      "
                    />
                    <span v-if="!basicInfoEdit">{{
                      model.data.setupTime
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="成立批准文号" path="setupAppoveCode">
                    <n-input
                      v-if="basicInfoEdit"
                      placeholder="请输入成立批准文号"
                      v-model:value="model.data.setupAppoveCode"
                    />
                    <span v-if="!basicInfoEdit">{{
                      model.data.setupAppoveCode
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="集采机构名称" path="gepsJcOrgName">
                    <n-input
                      v-if="basicInfoEdit"
                      placeholder="请输入集采机构名称"
                      v-model:value="model.data.gepsJcOrgName"
                    />
                    <span v-if="!basicInfoEdit">{{
                      model.data.gepsJcOrgName
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="集采机构id" path="gepsJcOrgId">
                    <n-input
                      v-if="basicInfoEdit"
                      placeholder="请输入集采机构id"
                      v-model:value="model.data.gepsJcOrgId"
                    />
                    <span v-if="!basicInfoEdit">{{
                      model.data.gepsJcOrgId
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi :span="24">
                  <n-form-item label="机构职责" path="orgDuty">
                    <n-input
                      type="textarea"
                      v-if="basicInfoEdit"
                      size="small"
                      :autosize="{
                        minRows: 3,
                        maxRows: 5,
                      }"
                      placeholder="请输入"
                      v-model:value="model.data.orgDuty"
                    />
                    <span v-if="!basicInfoEdit">{{ model.data.orgDuty }}</span>
                  </n-form-item>
                </n-gi>
              </n-grid>

              <n-divider title-placement="left" dashed ref="linkmanMessage"
                ><span style="color: #3f8fff; font-weight: bolder">|&nbsp</span
                >联系人信息
                <n-button
                  text
                  type="info"
                  style="position: absolute; right: 0px; background: #fff"
                  @click="linkmanMessageEdit = !linkmanMessageEdit"
                >
                  <template #icon>
                    <nw-icon name="icon-bianji" :size="20" />
                  </template>
                  {{ !linkmanMessageEdit ? "编辑" : "取消" }}
                </n-button></n-divider
              >
              <n-grid :cols="3" x-gap="12" style="width: 90%; margin: 0 auto">
                <n-gi>
                  <n-form-item label="机构地址" path="orgAddr">
                    <n-input
                      v-if="linkmanMessageEdit"
                      placeholder="请输入机构地址"
                      v-model:value="model.data.orgAddr"
                    />
                    <span v-if="!linkmanMessageEdit">{{
                      model.data.orgAddr
                    }}</span>
                  </n-form-item>
                </n-gi>

                <n-gi>
                  <n-form-item label="所在地区" path="registerBizAddr">
                    <n-input
                      v-if="linkmanMessageEdit"
                      placeholder="请输入所在地区"
                      v-model:value="model.data.registerBizAddr"
                    />
                    <span v-if="!linkmanMessageEdit">{{
                      model.data.registerBizAddr
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="邮政编码" path="orgPost">
                    <n-input
                      v-if="linkmanMessageEdit"
                      placeholder="请输入邮政编码"
                      v-model:value="model.data.orgPost"
                    />
                    <span v-if="!linkmanMessageEdit">{{
                      model.data.orgPost
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="电话号码" path="orgPhone">
                    <n-input
                      v-if="linkmanMessageEdit"
                      placeholder="请输入电话号码"
                      v-model:value="model.data.orgPhone"
                    />
                    <span v-if="!linkmanMessageEdit">{{
                      model.data.orgPhone
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="传真号码" path="orgFax">
                    <n-input
                      v-if="linkmanMessageEdit"
                      placeholder="请输入传真号码"
                      v-model:value="model.data.orgFax"
                    />
                    <span v-if="!linkmanMessageEdit">{{
                      model.data.orgFax
                    }}</span>
                  </n-form-item>
                </n-gi>
              </n-grid>

              <n-divider title-placement="left" dashed ref="principallian">
                <span style="color: #3f8fff; font-weight: bolder">|&nbsp</span
                >负责人信息
                <n-button
                  text
                  type="info"
                  style="position: absolute; right: 0px; background: #fff"
                  @click="principallianEdit = !principallianEdit"
                >
                  <template #icon>
                    <nw-icon name="icon-bianji" :size="20" />
                  </template>
                  {{ !principallianEdit ? "编辑" : "取消" }}
                </n-button>
              </n-divider>
              <n-grid :cols="3" x-gap="12" style="width: 90%; margin: 0 auto">
                <n-gi>
                  <n-form-item label="负责人" path="satrapName">
                    <n-input
                      v-if="linkmanMessageEdit"
                      placeholder=""
                      v-model:value="model.data.satrapName"
                      disabled
                    />
                  </n-form-item>
                </n-gi>
              </n-grid>

              <n-divider title-placement="left" dashed ref="businessLicense"
                ><span style="color: #3f8fff; font-weight: bolder">|&nbsp</span
                >营业执照信息
                <n-button
                  text
                  type="info"
                  style="position: absolute; right: 0px; background: #fff"
                  @click="businessLicenseEdit = !businessLicenseEdit"
                >
                  <template #icon>
                    <nw-icon name="icon-bianji" :size="20" />
                  </template>
                  {{ !businessLicenseEdit ? "编辑" : "取消" }}
                </n-button></n-divider
              >

              <n-grid :cols="3" x-gap="12" style="width: 90%; margin: 0 auto">
                <n-gi>
                  <n-form-item label="注册名称" path="registerName">
                    <n-input
                      v-if="businessLicenseEdit"
                      placeholder="请输入注册名称"
                      v-model:value="model.data.registerName"
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.registerName
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="资金数额" path="registerCapital">
                    <n-input
                      v-if="businessLicenseEdit"
                      placeholder="请输入资金数额"
                      v-model:value="model.data.registerCapital"
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.registerCapital
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="经营性质" path="orgProperty">
                    <n-input
                      v-if="businessLicenseEdit"
                      placeholder="请输入经营性质"
                      v-model:value="model.data.orgProperty"
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.orgProperty
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="经营范围" path="registerBizScope">
                    <n-input
                      v-if="businessLicenseEdit"
                      placeholder="请输入经营范围"
                      v-model:value="model.data.registerBizScope"
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.registerBizScope
                    }}</span>
                  </n-form-item>
                </n-gi>

                <n-gi>
                  <n-form-item label="营业期限" path="registerBizTime">
                    <n-date-picker
                      v-if="businessLicenseEdit"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="getTime(model.data.registerBizTime)"
                      size="small"
                      @update:value="
                        (p) => {
                          model.data.registerBizTime = formatDate(p);
                        }
                      "
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.registerBizTime
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="注册地址" path="licenseAddr">
                    <n-input
                      v-if="businessLicenseEdit"
                      placeholder="请输入注册地址"
                      v-model:value="model.data.licenseAddr"
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.licenseAddr
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="登记机关" path="registerRegisterOrg">
                    <n-input
                      v-if="businessLicenseEdit"
                      placeholder="请输入登记机关"
                      v-model:value="model.data.registerRegisterOrg"
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.registerRegisterOrg
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="发证日期" path="licenseCertificateTime">
                    <n-date-picker
                      v-if="businessLicenseEdit"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="getTime(model.data.licenseCertificateTime)"
                      size="small"
                      @update:value="
                        (p) => {
                          model.data.licenseCertificateTime = formatDate(p);
                        }
                      "
                    />
                    <span v-if="!businessLicenseEdit">{{
                      model.data.licenseCertificateTime
                    }}</span>
                  </n-form-item>
                </n-gi>
              </n-grid>

              <n-divider title-placement="left" dashed ref="runLicencejing"
                ><span style="color: #3f8fff; font-weight: bolder">|&nbsp</span
                >经营许可证信息
                <n-button
                  text
                  type="info"
                  style="position: absolute; right: 0px; background: #fff"
                  @click="runLicencejingEdit = !runLicencejingEdit"
                >
                  <template #icon>
                    <nw-icon name="icon-bianji" :size="20" />
                  </template>
                  {{ !runLicencejingEdit ? "编辑" : "取消" }}
                </n-button></n-divider
              >
              <n-grid :cols="3" x-gap="12" style="width: 90%; margin: 0 auto">
                <n-gi>
                  <n-form-item label="许可证编码" path="licenseCode">
                    <n-input
                      v-if="runLicencejingEdit"
                      placeholder="许可证编码"
                      v-model:value="model.data.licenseCode"
                    />
                    <span v-if="!runLicencejingEdit">{{
                      model.data.licenseCode
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="注册时间" path="licenseTime">
                    <n-date-picker
                      v-if="runLicencejingEdit"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="getTime(model.data.licenseTime)"
                      size="small"
                      @update:value="
                        (p) => {
                          model.data.licenseTime = formatDate(p);
                        }
                      "
                    />
                    <span v-if="!runLicencejingEdit">{{
                      model.data.licenseTime
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="注册地址" path="licenseScanFileUrl">
                    <n-input
                      v-if="runLicencejingEdit"
                      placeholder="请输入注册地址"
                      v-model:value="model.data.licenseScanFileUrl"
                    />
                    <span v-if="!runLicencejingEdit">{{
                      model.data.licenseScanFileUrl
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="发证机关" path="licenseCertificateOrg">
                    <n-input
                      v-if="runLicencejingEdit"
                      placeholder="请输入发证机关"
                      v-model:value="model.data.licenseCertificateOrg"
                    />
                    <span v-if="!runLicencejingEdit">{{
                      model.data.licenseCertificateOrg
                    }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="发证时间" path="licenseCertificateTime">
                    <n-date-picker
                      v-if="runLicencejingEdit"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="getTime(model.data.licenseCertificateTime)"
                      size="small"
                      @update:value="
                        (p) => {
                          model.data.licenseCertificateTime = formatDate(p);
                        }
                      "
                    />
                    <span v-if="!runLicencejingEdit">{{
                      model.data.licenseCertificateTime
                    }}</span>
                  </n-form-item>
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
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { NwIcon } from '@platform/main'
import { h, defineComponent, ref, reactive, getCurrentInstance } from "vue";
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
  useDialog,
} from "naive-ui";
import { updateOrgName, editOrg } from './api'
export default defineComponent({
  components: {
    NDrawer,
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
    const principallianEdit = ref(false);// 判断负责人信息编辑或取消
    const businessLicenseEdit = ref(false);// 判断营业执照信息编辑或取消
    const runLicencejingEdit = ref(false);// 判断经营许可信息编辑或取消
    const basic = ref(null);
    const linkmanMessage = ref(null);
    const principallian = ref(null);
    const businessLicense = ref(null);
    const runLicencejing = ref(null);
    const showOrgName = ref(true)
    const orgName = ref('')
    const dialog = useDialog()
    const sonFn = (e) => {
      formVisible.value = true
      model.data = e 
      orgName.value=model.data.orgName
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
      { label: "联系信息", key: 2, value: "linkmanMessage" },
      { label: "负责人信息", key: 3, value: "principallian" },
      { label: "营业执照信息", key: 4, value: "businessLicense" },
      { label: "金融许可证信息", key: 5, value: "runLicencejing" },
    ];
    const lvTypes = reactive([
      // { label: '建设公司', value: 1 },
      { label: '分公司', value: 2 },
      { label: '项目部', value: 3 },
      { label: '部门', value: 4 },
     
    ])
     const oaLvTypes = reactive([
        { label: 'OA机构', value: 1 },
        { label: 'OA部门', value: 2 },
    ])
    return {
      formVisible, //模态框控制
      lvTypes,
      oaLvTypes,
      sonFn,
      dialog,
      model,
      formatDate,
      getTime,
      message,
      spinShow,
      orgName,
      menuOptions,
      basic,
      linkmanMessage,
      principallian,
      businessLicense,
      runLicencejing,
      basicInfoEdit,
      linkmanMessageEdit,
      principallianEdit,
      businessLicenseEdit,
      runLicencejingEdit,
      showOrgName,
      rules: {
        parentId: [
            {
                required: true,
                message: '请选择主管机构',
                trigger: ['input', 'blur']
            }
        ],
        orgName: [
            {
                required: true,
                message: '请输入机构名称',
                trigger: ['input', 'blur']
            }
        ],
        orgCode: [
            {
                required: true,
                message: '请输入机构code',
                trigger: ['input', 'blur']
            }
        ],
         lvType: [
            {
                required: true,
                type:'number',
                message: '请选择级别类型',
                trigger: ['input', 'blur']
            }
        ],
           
      },
    };
  },
  created() {
    
  },
  methods: {
    handleSave() {
      this.$refs.formRef.validate((errors) => {
        if (!errors) {
          this.dialog.success({
            title: '是否确定修改当前数据?',
            content: '',
            positiveText: '确定',
            negativeText: '取消',
            maskClosable: false,
           
            onPositiveClick : async () => {
              // await this.inputBlur()
               this.spinShow = true
                editOrg(this.model.data).then((res) => {
                  if (res === true) {
                    this.message.success("操作成功");
                    this.spinShow = false
                    this.formVisible = false;
                    this.$emit('update:callback');
                  }
                }).catch(e=>{
                  this.message.error(e);
                  
                })
                .finally(r => {
                    this.spinShow = false;
                })
            }
          })
          // this.spinShow = true
          
        }
      })
      
    },
 
    editOrgName(){
        this.showOrgName = false
        this.orgName=this.model.data.orgName
    },
    async inputBlur(){
        this.showOrgName = true
       await updateOrgName({...this.model.data,orgName:this.orgName}).then((res)=>{
          if(res){
             this.model.data.orgName = this.orgName
             return true
          } else{
            return true
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