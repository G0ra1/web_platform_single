<template>
  <n-form>
    <n-form-item label="子系统" path="bizSysCodes">
      <nw-dic :request="{ XHR: dictItemLists, params: 'APP_NAME' }" v-model:value="state.model.bizSysCodes"
        @update:value="
          (value) => {
            state.model.bizSysCodes = value;
          }
        " multiple :response="{
          dataMethod: (res) =>
            res.map(({ dictItemCode: value, dictItemName: label }) => ({
              label,
              value,
            })),
        }" />
    </n-form-item>
    <n-form-item label="并发执行" path="concurrent">
      <n-select v-model:value="state.model.concurrent" :options="[
        { label: '允许', value: 0 },
        { label: '禁止', value: 1 },
      ]" />
    </n-form-item>
    <n-form-item label="执行表达式" path="cronExpression">
      <n-input placeholder="请输入执行表达式" v-model:value="state.model.cronExpression" />
      <n-button @click="testCron">验证cron表达式</n-button>
      <n-button @click="tenTimes">近十次执行时间</n-button>
    </n-form-item>
    <n-form-item label="调用目标字符串" path="invokeTarget">
      <n-input placeholder="请输入调用目标字符串" v-model:value="state.model.invokeTarget" />
    </n-form-item>
    <n-form-item label="任务组名" path="jobGroup">
      <n-select v-model:value="state.model.jobGroup" :options="[
        { label: '默认', value: 'DEFAULT' },
        { label: '系统', value: 'SYSTEM' },
      ]" />
    </n-form-item>
    <n-form-item label="任务名称" path="jobName">
      <n-input placeholder="请输入任务名称" v-model:value="state.model.jobName" />
    </n-form-item>
    <n-form-item label="补偿策略" path="misfirePolicy">
      <n-select v-model:value="state.model.misfirePolicy" :options="[
        { label: '立即触发执行', value: 0 },
        { label: '触发一次执行', value: 1 },
        { label: '不触发立即执行', value: 2 },
      ]" />
    </n-form-item>
    <n-form-item label="任务状态" path="status">
      <n-select v-model:value="state.model.status" :options="[
        { label: '正常', value: 0 },
        { label: '暂停', value: 1 },
      ]" />
    </n-form-item>
    <n-form-item label="备注" path="remark">
      <n-input placeholder="请输入备注" v-model:value="state.model.remark" />
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, ref, reactive, h } from "vue";
import {
  NwDic,
} from '@platform/main'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  useMessage,
  useDialog,
} from "naive-ui";
import {
  dictItemLists,
  checkCronExpressionIsValid,
  queryCronExpression,
} from "./api";
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
    NwDic,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props) {
    const msg = useMessage();
    const dialog = useDialog();
    const state = reactive({
      model: props.model.id
        ? { ...props.model, bizSysCodes: props.model.bizSysCodes.split(",") }
        : { status: 1, concurrent: 1, misfirePolicy: 1, jobGroup: "DEFAULT" },
    });
    const changeCron = (val) => {
      if (typeof val !== "string") return false;
      console.log(val);
    };
    const testCron = () => {
      checkCronExpressionIsValid(state.model.cronExpression).then((res) => {
        if (res) {
          msg.success("验证成功");
        } else {
          msg.warning("表达式不可用");
        }
      });
    };
    const tenTimes = () => {
      queryCronExpression(state.model.cronExpression).then((res) => {
        dialog.success({
          title: "成功",
          content: () => {
            return h(
              "div",
              {
                style: {
                  paddingLeft: "50px",
                },
              },
              res.map((d) => {
                return h("p", {}, d);
              })
            );
          },
        });
      });
    };
    return {
      state,
      changeCron,
      dictItemLists,
      testCron,
      tenTimes,
      editorConfig: {},
      msg,
      dialog,
    };
  },
  created() { },
  methods: {
    getModel() {
      return this.state.model;
    },
  },
});
</script>