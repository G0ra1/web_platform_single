<template>
  <n-spin :show="spinShow">
    <n-modal
      v-model:show="showModal"
      style="width: 1200px; height: 800px"
      preset="dialog"
    >
      <template #header>
        <div>选择键名</div>
      </template>
      <n-card>
        <n-data-table
          ref="table"
          :columns="columns"
          :data="data"
          :max-height="600"
          style="height: 600px"
          flex-height
          :row-key="
            (row) => {
              return row.name + ',' + row.id;
            }
          "
          @update:checked-row-keys="handleCheck"
        />
      </n-card>

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
import { fieldList } from "./api";

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
    const tableId = ref("");
    const searchForm = reactive({});
    const selected = ref([]);
    const getData = (current = 1, size = 10) => {
      fieldList(tableId.value)
        .then((res) => {
          console.log(res, "112221212");
          spinShow.value = false;
          // page.value = res.current;
          // pageCount.value = res.pages;
          data.value = res;
        })
        .catch((e) => {
          spinShow.value = false;
        });
    };
    const show = (d, s) => {
      spinShow.value = true;
      tableId.value = d;
      getData();
      showModal.value = true;
    };
    const confirm = () => {
      showModal.value = false;
      context.emit("callback", selected.value);
    };
    const columns = [
      {
        type: "selection",
      },
      {
        title: "名称",
        key: "nameCh",
      },
      {
        title: "编码",
        key: "name",
      },
      {
        title: "类型",
        key: "dbType",
      },
      {
        title: "默认值",
        key: "defaultValue",
      },
    ];
    onMounted(async () => {});

    return {
      showModal,
      spinShow,
      columns,
      tableId,
      data,
      page,
      pageCount,
      searchForm,
      show,
      getData,
      selected,
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