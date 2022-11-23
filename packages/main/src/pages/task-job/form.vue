<template>
  <n-form label-placement="left" :label-width="160">
    <n-form-item label="选择应用" path="bizSysCodes" v-if="state.model.invokeTargetType !== 'mqproducer'">

      <n-tree-select multiple :options="appOptions" default-expand-all children-field="subTrees" key-field="appCode"
        label-field="appName" :default-value="state.model.bizSysCodes" @update:value="handleUpdateValue" />
      <!-- <nw-dic :request="{ XHR: dictItemLists, params: 'APP_NAME' }" v-model:value="state.model.bizSysCodes"
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
}" /> -->
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
    <n-form-item label="生产者组名" v-if="state.model.invokeTargetType == 'mqproducer'" path="producerGroupName">
      <n-input placeholder="点击选择生产者组名" v-model:value="state.model.producerGroupName" disabled @click="
        () => {
          chooseMsgTmpRef.show();
        }
      " />
    </n-form-item>
    <n-form-item label="消息内容参数" v-if="
      state.model.invokeTargetType == 'mqproducer' &&
      state.model.msgSource == 'msgtmp'
    " path="msgParams">
      <n-input placeholder="点击输入消息内容参数" v-model:value="state.model.msgParams" disabled @click="
        () => {
          setMsgParams(state.model.mqSourceContent);
        }
      " />
    </n-form-item>
    <span v-if="state.model.invokeTargetType == 'springbean'"
      style="display: inline-block; color: red; padding-left: 160px">Bean调用示例：taks.params('netwisd')<br />参数说明：支持字符串，布尔类型，长整型，浮点型，
      整型 '字符串' true 200L 3.14159256D 100
    </span>
    <span v-if="state.model.invokeTargetType == 'class'"
      style="display: inline-block; color: red; padding-left: 160px">Class类调用示例：com.netwisd.base.task.Task.params('netwisd')<br />参数说明：支持字符串，布尔类型，长整型，浮点型，
      整型 '字符串' true 200L 3.14159256D 100
    </span>
    <n-form-item label="任务类" path="invokeTarget" v-if="state.model.invokeTargetType !== 'mqproducer'">
      <n-input placeholder="请输入任务类" v-model:value="state.model.invokeTarget" />
    </n-form-item>

    <n-form-item label="执行表达式" path="cronExpression">
      <n-popover :show="showPopover" placement="bottom" trigger="manual" @update:show="handleUpdateShow">
        <template #trigger>
          <n-input @click="showPopover = !showPopover" placeholder="请输入执行表达式"
            v-model:value="state.model.cronExpression" />
        </template>
        <Vue3CronCore i18n="cn" maxHeight="350px" @change="changeCron" v-model:value="state.model.cronExpression" />
      </n-popover>
      <n-button @click="testCron">验证cron表达式</n-button>
      <n-button @click="tenTimes">近十次执行时间</n-button>
    </n-form-item>
    <n-form-item label="恢复调度处理规则" path="misfirePolicy">
      <n-select v-model:value="state.model.misfirePolicy" :options="[
        {
          label:
            '以错过的第一个频率时间立刻开始执行，重做错过的所有频率周期',
          value: -1,
        },
        {
          label:
            '以当前时间为触发频率立刻触发一次执行，然后按照Cron频率依次执行',
          value: 1,
        },
        {
          label:
            '不触发立即执行，等待下次Cron触发频率到达时刻开始按照Cron频率依次执行',
          value: 2,
        },
      ]" />
    </n-form-item>
    <!-- <n-form-item label="并发执行" path="concurrent">
      <n-select
        v-model:value="state.model.concurrent"
        :options="[
          { label: '允许', value: 0 },
          { label: '禁止', value: 1 },
        ]"
      />
    </n-form-item> -->
    <n-form-item label="任务开始时间" path="status">
      <n-date-picker v-model:value="range" :value="timeParse(state.model.startTime)" @update:value="
        (p) => {
          if (p) {
            state.model.startTime = timeFormat(p);
          } else {
            state.model.startTime = null;
          }
        }
      " size="small" type="datetime" clearable style="margin-right: 5px" />
    </n-form-item>
    <n-form-item label="任务结束时间" path="status">
      <n-date-picker v-model:value="range2" :value="timeParse(state.model.endTime)" @update:value="
        (p) => {
          if (p) {
            state.model.endTime = timeFormat(p);
          } else {
            state.model.endTime = null;
          }
        }
      " size="small" type="datetime" clearable style="margin-right: 5px" />
    </n-form-item>
    <n-form-item label="调度过期保留天数" path="jobExpiredDayClean">
      <n-input-number placeholder="调度过期保留天数" v-model:value="state.model.jobExpiredDayClean" :min="0" /><span
        style="color: red">0表示永久保留</span>
    </n-form-item>
    <n-form-item label="调度日志记录保留天数" path="jobLogExpiredDayClean">
      <n-input-number placeholder="调度日志记录保留天数" v-model:value="state.model.jobLogExpiredDayClean" :min="0" /><span
        style="color: red">0表示永久保留</span>
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

  <chooseProducer ref="chooseMsgTmpRef" @callback="selectedProducer"></chooseProducer>
  <n-modal v-model:show="msgParamsModal" :mask-closable="false" preset="dialog" title="参数设置" content="你确认"
    positive-text="确认" negative-text="取消" style="width: 500px">
    <n-form :model="model" label-placement="left" label-width="40">
      <n-form-item v-for="(item, i) in paramsList" :key="i" :label="item" :path="item">
        <n-input size="small" :placeholder="`请输入${item}`" v-model:value="params[item]" />
      </n-form-item>
    </n-form>
    <template #action>
      <div style="padding: 0 5px 5px 0">
        <n-button size="small" type="default" style="margin-right: 5px" @click="msgParamsModal = false">取消</n-button>
        <n-button size="small" type="info" style="margin-right: 5px" @click="msgParamsConfirm">确定</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script>
import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3";
const timeFormatStr = "%Y-%m-%d %H:%M:%S";
const timeFormat = d3TimeFormat(timeFormatStr);
const timeParse = d3TimeParse(timeFormatStr);
import { defineComponent, ref, reactive, h, onMounted } from "vue";
import Vue3CronCore from "./components/vue3-cron-core/Index.vue";
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
  NPopover,
  NDatePicker,
  NInputNumber,
  NModal,
  NSpin,
  NTreeSelect
} from "naive-ui";
import {
  dictItemLists,
  checkCronExpressionIsValid,
  queryCronExpression,
  producerDetails,
  queryApp
} from "./api";
import chooseProducer from "./chooseProducer.vue";
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
    NPopover,
    Vue3CronCore,
    NDatePicker,
    NInputNumber,
    chooseProducer,
    NModal,
    NSpin,
    NwDic,
    NTreeSelect
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
    const showPopover = ref(false);
    const state = reactive({
      model: props.model.id
        ? { ...props.model, bizSysCodes: props.model.bizSysCodes.split(",") }
        : {
          status: 1,
          concurrent: 1,
          misfirePolicy: 1,
          jobGroup: "DEFAULT",
          jobExpiredDayClean: 0,
          jobLogExpiredDayClean: 0,
          ...props.model,
        },
    });
    console.log(state,'statestatestate')
    const sonFn = () => {

    }
    const changeCron = (val) => {
      if (typeof val !== "string") return false;
      state.model.cronExpression = val;
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
    const range = ref(
      state.model.startTime ? new Date(state.model.startTime) : null
    );
    const range2 = ref(
      state.model.endTime ? new Date(state.model.endTime) : null
    );

    const chooseMsgTmpRef = ref(null);
    const selectedProducer = (v) => {
      state.model.msgParams = "";
      state.model.producerGroupName = v[0].producerGroup;
      state.model.producerId = v[0].id;
      state.model.mqSourceContent = v[0].mqSourceContent;
      state.model.msgSource = v[0].msgSource;
    };
    const msgParamsModal = ref(false);
    const setMsgParams = (mqSourceContent) => {
      paramsList.value = [];
      if (mqSourceContent.indexOf("$") == -1) {
        paramsList.value = [];
      } else {
        paramsList.value = mqSourceContent
          .split("${")
          .map((d) => d.split("}")[0])
          .filter((d) => d != "");
      }
      if (paramsList.value.length >= 1) {
        msgParamsModal.value = true;
        return;
      } else {
        msg.success("此生产者无需设置参数");
      }
    };
    const msgParamsConfirm = () => {
      state.model.msgParams = JSON.stringify(params.value);
      msgParamsModal.value = false;
    };
    const params = ref({});
    const paramsList = ref([]);
    const appOptions = ref([])
    const handleUpdateValue = (value, option) => {
      console.log(value, option)
      state.model.bizSysCodes = option.map(d => {
        if (d) { return d.appCode }
        else {
          return ''
        }
      })

    }
    onMounted(async () => {
      setTimeout(() => {
        if (props.model.id) {
          producerDetails(props.model.producerId).then((res) => {
            state.model.mqSourceContent = res.mqSourceContent;
            state.model.msgSource = res.msgSource;
          });
        }
      }, 500);


      queryApp({}).then(res => {
        appOptions.value = res.subTrees.map(d => {
          d.disabled = d.appType == 1
          return d
        })
        console.log(res, 'queryAppqueryAppqueryApp')
      })
    });


    return {
      state,
      changeCron,
      showPopover,
      dictItemLists,
      testCron,
      tenTimes,
      editorConfig: {},
      msg,
      dialog,
      range,
      range2,
      timeFormat,
      selectedProducer,
      chooseMsgTmpRef,
      msgParamsModal,
      setMsgParams,
      params,
      paramsList,
      msgParamsConfirm,
      sonFn,
      appOptions,
      handleUpdateValue
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