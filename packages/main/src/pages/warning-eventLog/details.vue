<template>
  <n-modal v-model:show="formVisible" preset="dialog" title="Dialog" style="width: 1400px; ">
    <template #header>
      <div>告警日志详情</div>
    </template>
    <n-spin :show="spinShow">
      <n-layout style="height: 800px" class="details-layout">
        <n-form ref="formRef" label-placement="left" label-align="left" :label-width="140" size="small"
          :style="{ padding: '10px 28px', width: '100%', margin: '0 auto', 'boxSizing': 'border-box' }">
          <n-grid :cols="12" :x-gap="24">
            <n-form-item-gi :span="12" label="">
              <h5 class="card-title">基本信息</h5>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="事件Id" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.eventId
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="事件等级" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.eventLevel ? eventLevelList[model.eventLevel
                  - 1] : ''
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="系统名称" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.sysName
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="系统编码" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.sysCode
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="使用组织的名称" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.orgName
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="使用组织的编码" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.orgCode
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="使用用户的姓名" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.usernameCh
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="使用用户的账号" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.username
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="告警区域" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.area
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="告警设备" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.device
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="告警开始时间" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.startTime
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="告警结束时间" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.endTime
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="消息发送时间" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.pushTime
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="消息拉取时间" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.pullTime
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="事件内容" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.content
              }}</span>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="">
              <h5 class="card-title">自定义业务数据</h5>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="" path="code">
              <span style="line-height:36px;display: inline-block;">{{
                model.customerDetails
              }}</span>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-layout>
    </n-spin>
    <template #action>
      <n-button size="small" @click="handleSave">关闭</n-button>
    </template>
  </n-modal>
</template>

<script>
import { NwIcon, NwTable, Cookies } from "@platform/main"
import {
  h,
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted
} from "vue";
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
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NRadioGroup,
  NSpace,
  NDatePicker,
  NMenu,
  NGi,
  NDivider,
  NLayoutSider,
  NModal,
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
} from "naive-ui";
import { cloneDeep } from "lodash";
import { detail, editRead } from "./api";
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
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NRadioGroup,
    NSpace,
    NDatePicker,
    NMenu,
    NGi,
    NDivider,
    NLayoutSider,
    NModal,
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
  },
  props: {},
  setup(props) {
    const formVisible = ref(false);
    const model = ref({});
    const spinShow = ref(false);
    const sonFn = e => {
      formVisible.value = true;
      // spinShow.value = true;
      model.value = e
      // detail(e.id)
      //   .then(res => {
      //     model.value = cloneDeep(res);
      //   })
      //   .finally(r => {
      //     spinShow.value = false;
      //   });
    };
    const wOpen = url => {
      const token = Cookies.get("token");
      const tokenType = Cookies.get("tokenType");
      if (url) {
        window.open(`${url}&token=${tokenType} ${token}`, "newwindow");
      }
    };
    const eventLevelList = ['一级', '二级', '三级', '四级',]
    onMounted(async () => { });
    return {
      formVisible, //模态框控制
      model,
      spinShow,
      sonFn,
      wOpen,
      eventLevelList
    };
  },
  created() { },
  methods: {
    handleSave() {
      if (this.model.isRead == 0) {
        this.spinShow = true;
        editRead(this.model.id)
          .then(res => {
            this.formVisible = false;
            this.$emit("update:callback");
          })
          .finally(r => {
            this.spinShow = false;
          });
      } else {
        this.formVisible = false;
      }
    }
  }
});
</script>
<style lang="less" >
.details-layout {
  .n-form-item.n-form-item--left-labelled .n-form-item-label {
    color: #a1a1a1;
  }
}
</style>