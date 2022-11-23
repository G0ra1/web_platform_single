<template>
  <n-spin :show="spinShow">
    <n-modal
      v-model:show="showModal"
      style="width: 1200px; height: 800px"
      preset="dialog"
    >
      <template #header>
        <div>选择消息模板</div>
      </template>
      <div>
        <n-form inline :label-width="80" label-placement="left">
          <n-form-item label="模板名称" path="tmpName">
            <n-input
              placeholder="请输入模板名称"
              v-model:value="searchForm.tmpName"
            />
          </n-form-item>
          <n-form-item label="模板标题" path="tmpTitle">
            <n-input
              placeholder="请输入模板标题"
              v-model:value="searchForm.tmpTitle"
            />
          </n-form-item>
          <n-button
            type="info"
            size="small"
            @click="
              () => {
                getData();
              }
            "
            >查询</n-button
          >
        </n-form>
      </div>
      <n-data-table
        ref="table"
        :columns="columns"
        :max-height="600"
        style="height: 600px"
        flex-height
        :data="data"
        :row-key="
          (row) => {
            return row.tmpName + ',' + row.tmpTitle + ',' + row.id;
          }
        "
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

      <template #action>
        <n-button
          size="small"
          @click="
            () => {
              showModal = false;
            }
          "
          >取消</n-button
        >
        <n-button
          type="info"
          :disabled="selected.length != 1"
          size="small"
          @click="confirm"
          >确定</n-button
        >
      </template>
    </n-modal>
  </n-spin>
</template>
<script>
import { h } from "vue";
import NwIcon from "/@/components/nw-icon/index.vue";
import cookies from "/@/utils/cookies.js";
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
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
import { tmpList } from "../api/consumer";

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
  props: {},
  data() {
    return {};
  },
  setup(props, context) {
    const showModal = ref(false);
    const spinShow = ref(false);
    const page = ref(1);
    const pageCount = ref(0);
    const data = ref([]);
    const searchForm = reactive({});
    const selected = ref([]);
    const getData = (current = 1, size = 10) => {
      tmpList({
        ...searchForm,
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
          data.value = res.records;
        })
        .catch((e) => {
          spinShow.value = false;
        });
    };
    const show = (d, s) => {
      spinShow.value = true;
      getData();
      showModal.value = true;
    };
    const selectRow = (row) => {
      console.log(row);
      selected.value = [row];
    };
    const confirm = () => {
      showModal.value = false;
      context.emit("callback", selected.value);
    };
    const columns = [
      {
        title: "模板名称",
        key: "tmpName",
      },
      {
        title: "模板标题",
        key: "tmpTitle",
      },
      {
        title: "模板编码",
        key: "tmpCode",
      },
      {
        title: "操作",
        key: "actions",
        render(row) {
          return h(
            NButton,
            {
              size: "small",
              onClick: () => {
                selectRow(row);
              },
            },
            {
              default: () => {
                return selected.value.map((d) => d.id).indexOf(row.id) >= 0
                  ? "已选择"
                  : "选择";
              },
            }
          );
        },
      },
    ];
    onMounted(async () => {});

    return {
      showModal,
      spinShow,
      columns,
      data,
      page,
      pageCount,
      searchForm,
      show,
      getData,
      selected,
      confirm,
    };
  },
  created() {},
  methods: {},
});
</script>