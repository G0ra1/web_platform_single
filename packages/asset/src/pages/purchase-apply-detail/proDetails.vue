<template>
  <!-- <n-input-group>
    <n-input v-model:value="inputValue" />
    <n-button ghost @click="show">
      <NwIcon name="icon-sousuo1" size="15" style="color: #828282; cursor: pointer" />
    </n-button>
  </n-input-group>-->

  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="任务详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>一级任务名称</h2>
            <span>{{ dataModel.oneTaskName }}</span>
          </div>
          <div>
            <h2>二级任务名称</h2>
            <span>{{ dataModel.twoTaskName }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>任务详细信息</h3>
          <div>
            <span>工作代码</span><span>{{ dataModel.taskCode }}</span>
            <span>评价方式</span><span>{{ dataModel.evaluationMethod }}</span>
            <span>任务类型</span><span>{{dataModel.taskType==1?'日常任务':'设计任务'}}</span>
          </div>
          <div>
            <span>编</span
            ><span>{{
              dataModel.compileWorkScale
                ? dataModel.compileWorkScale + "%"
                : "-"
            }}</span>
            <span>校</span
            ><span>{{
              dataModel.checkWorkScale ? dataModel.checkWorkScale + "%" : "-"
            }}</span>
            <span>审</span
            ><span>{{
              dataModel.auditWorkScale ? dataModel.auditWorkScale + "%" : "-"
            }}</span>
          </div>
          <div>
            <span>创建人</span
            ><span style="width: auto">{{ dataModel.createUserName }}</span>
            <span>创建时间</span
            ><span style="width: auto">{{ dataModel.createTime }}</span>
          </div>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NwIcon } from '@platform/main'
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  h,
} from "vue";
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
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NCard,
  NModal,
  NSpace,
  NRadioGroup,
  NDataTable,
  NPagination,
  NGrid,
  NGi,
  NFormItemGi,
  NRate,
} from "naive-ui";
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
    NCard,
    NModal,
    NSpace,
    NRadioGroup,
    NDataTable,
    NPagination,
    NGrid,
    NFormItemGi,
    NRate,
    NGi,
  },
  props: ["value", "keyWord"],
  emits: ["onUpdate"],
  data() {
    return {};
  },
  setup(props, context) {
    const message = useMessage();
    const dataModel = ref({});
    const showModal = ref(false);
    const spinShow = ref(false);
    const page = ref(1);
    const pageCount = ref(0);
    const ntData = ref([]);
    const dsId = ref("");
    const searchForm = reactive({});
    const selected = ref([]);
    const api = ref("");
    const inputValue = ref("");
    const proId = ref();
    inputValue.value = props.value;
    const getData = (current = 1, size = 10) => {
      historyList({
        ...searchForm,
        proId: proId.value,
        page: {
          current: current,
          size: size,
        },
      })
        .then((res) => {
          console.log(res, "112221212");
          spinShow.value = false;
          page.value = res.current;
          pageCount.value = res.pages;
          ntData.value = res.records;
        })
        .catch((e) => {
          spinShow.value = false;
        });
    };
    const show = (row) => {
      showModal.value = true;
      dataModel.value = row;
    };
    const confirm = () => {
      showModal.value = false;
      // inputValue.value = selected.value[props.keyWord]
      // context.emit('onUpdate', selected.value)
    };
    const columns = [
      {
        title: "",
        key: "title",
      },
      {
        title: "编",
        key: "compileWorkHour",
      },
      {
        title: "校",
        key: "checkWorkHour",
      },
      {
        title: "审",
        key: "reviewerWorkHour",
      },
      {
        title: "合计",
        key: "totalWorkHour",
      },
    ];
    onMounted(async () => {});

    return {
      showModal,
      spinShow,
      columns,
      dsId,
      ntData,
      page,
      pageCount,
      searchForm,
      show,
      getData,
      selected,
      api,
      confirm,
      inputValue,
      message,
      proId,
      dataModel,
    };
  },
  created() {},
  methods: {},
});
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.n-drawer-header {
  background: #f1f1f6;
  .n-drawer-header__main {
    padding-left: 60px;
    color: #010101;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
  }
}
.manhour-details {
  padding-left: 60px;
  color: #010101;

  .title {
    display: flex;
    h1 {
      color: #010101;
      font-size: 16px;
      font-weight: 400;
    }
    span {
      margin-left: 16px;
      font-size: 12px;
      padding-top: 10px;
    }
  }
  .taskShow {
    margin-top: 30px;
    display: flex;
    div {
      margin-right: 80px;
      h2 {
        color: #010101;
        font-size: 14px;
        font-weight: 400;
      }
      span {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 0px;
        color: #999999;
      }
    }
  }
  .manhour {
    margin-top: 30px;
    h3 {
      padding-left: 8px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #010101;
      border-left: #1d7ced 2px solid;
    }
    div {
      margin-top: 30px;
      span {
        display: inline-block;
        width: 80px;
        margin-right: 30px;
        text-align: left;
      }
      span:nth-child(2n) {
        margin-right: 30px;
      }
    }
  }
  .audit {
    margin-top: 30px;
    h3 {
      padding-left: 8px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #010101;
      border-left: #1d7ced 2px solid;
    }
    div.content {
      margin-top: 30px;
      background: #fff;
      .content-p {
        height: 92px;
        width: 792px;
        margin-bottom: 16px;
        box-sizing: border-box;
        background: #f8f8fc;
        opacity: 1;
        border-radius: 2px;
        padding: 16px 24px;
        span {
          margin-right: 24px;
        }
        a {
          margin-left: 5px;
          color: #1d7ced;
        }
        .n-rate {
          position: relative;
          top: 3px;
        }
        p {
          margin-top: 10px;
          span {
            margin-left: 42px;
          }
        }
      }
    }
  }
}
</style>