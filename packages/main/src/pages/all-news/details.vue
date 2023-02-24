<template>
  <n-modal v-model:show="formVisible" preset="dialog" title="Dialog" style="width: 1400px; ">
    <template #header>
      <div>{{ model.msgTitle }}</div>
    </template>
    <n-spin :show="spinShow">
      <n-layout style="height: 800px">
        <n-layout-header>
          <h3>
            发送人：
            <span style="font-size:16px">{{ model.sendUserName }}</span>
          </h3>
          <h3>
            接收人：
            <span style="font-size:16px">{{ model.receiverUserName }}</span>
          </h3>
          <h3>
            接收时间：
            <span style="font-size:16px">{{ model.sendTime }}</span>
          </h3>
          <h3>
            消息来源：
            <span style="font-size:16px; cursor:pointer" @click="() => wOpen(model.msgPcUrl)">{{ model.msgSource
}}</span>
          </h3>
        </n-layout-header>
        <n-layout-content ref="content" :native-scrollbar="false" style="padding:10px 0px;border-top:1px solid gray">{{
    model.msgContent
}}</n-layout-content>
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
  NModal
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

    NModal
  },
  props: {},
  setup(props) {
    const formVisible = ref(false);
    const model = ref({});
    const spinShow = ref(false);
    const sonFn = e => {
      formVisible.value = true;
      spinShow.value = true;
      detail(e.id)
        .then(res => {
          model.value = cloneDeep(res);
        })
        .finally(r => {
          spinShow.value = false;
        });
    };
    const wOpen = url => {
      const token = Cookies.get("token");
      const tokenType = Cookies.get("tokenType");
      if (url) {
        window.open(`${url}&token=${tokenType} ${token}`, "newwindow");
      }
    };
    onMounted(async () => { });
    return {
      formVisible, //模态框控制
      model,
      spinShow,
      sonFn,
      wOpen
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