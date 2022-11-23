<template>
  <n-spin :show="spinShow">
    <n-modal
      v-model:show="showModal"
      style="width: 1200px; height: 800px"
      preset="dialog"
    >
      <template #header>
        <div>选择表</div>
      </template>
      <div>
        <n-form inline :label-width="80" label-placement="left">
          <n-form-item label="表名" path="tableName">
            <n-input
              placeholder="请输入表名"
              v-model:value="searchForm.tableName"
            />
          </n-form-item>
          <n-form-item label="中文名称" path="tableNameCh">
            <n-input
              placeholder="请输入中文名称"
              v-model:value="searchForm.tableNameCh"
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
            return row.tableName + ',' + row.tableNameCh + ',' + row.id;
          }
        "
        @update:checked-row-keys="handleCheck"
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
import { NwIcon } from '@platform/main'
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
import { tableInfoPage, entityPage } from "./api";

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
    const dsId = ref("");
    const searchForm = reactive({});
    const selected = ref([]);
    const APIMap = {
      tableInfoPage,
      entityPage,
    };
    const api = ref("");
    const getData = (current = 1, size = 10) => {
      APIMap[api.value](
        {
          ...searchForm,
          page: {
            current: current,
            size: size,
          },
        },
        dsId.value
      )
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
      api.value = s;
      spinShow.value = true;
      dsId.value = d;
      getData();
      showModal.value = true;
    };
    const confirm = () => {
      showModal.value = false;
      context.emit("callback", selected.value, api.value);
    };
    const columns = [
      {
        type: "selection",
        disabled(row, index) {
          return row.name === "Edward King 3";
        },
      },
      {
        title: "表名",
        key: "tableName",
      },
      {
        title: "中文名",
        key: "tableNameCh",
      },
    ];
    onMounted(async () => {});

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
      handleCheck(rowKeys) {
        selected.value = rowKeys;
      },
    };
  },
  created() {},
  methods: {},
});
</script>