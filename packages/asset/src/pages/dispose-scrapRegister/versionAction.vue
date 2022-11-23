<template>
  <!-- <n-input-group>
    <n-input v-model:value="inputValue" />
    <n-button ghost @click="show">
      <NwIcon name="icon-sousuo1" size="15" style="color: #828282; cursor: pointer" />
    </n-button>
  </n-input-group> -->

  <n-modal v-model:show="showModal" style="width: 1200px; height: 800px" preset="dialog">
    <template #header>
      <div>任务管理历史</div>
    </template>
    <n-spin :show="spinShow">
      <div>
        <n-form inline :label-width="80" label-placement="left">
          <n-form-item label="任务名称" path="taskName">
            <n-input placeholder="请输入任务名称" v-model:value="searchForm.taskName" />
          </n-form-item>
          <n-button
            type="info"
            size="small"
            @click="
              () => {
                getData();
              }
            "
          >查询</n-button>
        </n-form>
      </div>
      <n-data-table
        ref="table"
        :columns="columns"
        :max-height="600"
        style="height: 600px"
        flex-height
        :data="data"
      />
      <div style="display: flex; flex-direction: row-reverse; margin-top: 5px">
        <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          :on-update:page="
            (p) => {
              getData(p);
            }
          "
        />
      </div>
    </n-spin>
    <!-- <template #action>
      <n-button
        size="small"
        @click="
          () => {
            showModal = false;
          }
        "
      >取消</n-button>
      <n-button type="info" :disabled="!selected.id" size="small" @click="confirm">确定</n-button>
    </template>-->
  </n-modal>
</template>
<script>
import { NwIcon } from '@platform/main'

import { historyList, recover } from "./api"
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  h
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
  },
  props: ['value', 'keyWord'],
  emits: ['onUpdate'],
  data() {
    return {};
  },
  setup(props, context) {
    const message = useMessage()
    const showModal = ref(false);
    const spinShow = ref(false);
    const page = ref(1);
    const pageCount = ref(0);
    const data = ref([]);
    const dsId = ref("");
    const searchForm = reactive({});
    const selected = ref([]);
    const api = ref("");
    const inputValue = ref("")
    const proId = ref()
    inputValue.value = props.value
    const getData = (current = 1, size = 10) => {
      historyList(
        {
          ...searchForm,
          taskId: proId.value,
          page: {
            current: current,
            size: size,
          },
        },
      )
        .then((res) => {
          spinShow.value = false;
          page.value = res.current;
          pageCount.value = res.pages;
          data.value = res.records;
        })
        .catch((e) => {
          spinShow.value = false;
        });
    };
    const show = (data) => {
      spinShow.value = true;
      proId.value = data.id
      getData();
      showModal.value = true;
    };
    const confirm = () => {
      showModal.value = false;
      // inputValue.value = selected.value[props.keyWord]
      // context.emit('onUpdate', selected.value)
    };
    const columns = [
      {
        title: "一级任务",
        key: "oneTaskName",
      },
      {
        title: "二级任务",
        key: "twoTaskName",
      },
      {
        title: "任务名称",
        key: "taskName",
      },
      {
        title: "工作代码",
        key: "taskCode",
      },
      {
        title: "评价方式",
        key: "evaluationMethod",
      },
      {
        title: "任务工时",
        key: "taskWorkHour",
      },
      {
        title: '操作',
        key: 'actions',
        width: 120,
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              onClick: () => recoverFn(row)
            },
            { default: () => '恢复' }
          )
        }
      }
    ];
    const recoverFn = (row) => {
      selected.value = row;
      recover(row).then(res => {
        message.success('操作成功')
        confirm()
        context.emit("update:callback")
      })
    }
    onMounted(async () => { });

    return {
      showModal,
      spinShow,
      columns,
      dsId,
      data,
      page,
      pageCount,
      searchForm,
      show,
      getData,
      selected,
      api,
      confirm,
      inputValue,
      recoverFn,
      message,
      proId
    };
  },
  created() { },
  methods: {},
});
</script>