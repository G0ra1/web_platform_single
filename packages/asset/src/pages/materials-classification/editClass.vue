<template>
  <n-form :model="dataModel" label-placement="left" :label-width="90"
    :style="{ paddingRight: '20px', paddingLeft: '10px' }" size="small">
    <n-grid :cols="12" :x-gap="24">
      <n-form-item-gi :span="12" label="上级分类" path="parenName">
        <n-tree-select :options="orgTree" key-field="id" label-field="classifyName" children-field="kids"
          @update:value="handleUpdateValue" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="物资编码" path="classifyCode">
        <!-- <nw-code-generate formName="wuzifenlei" formField="classifyCode" v-model:value="dataModel.classifyCode"
          :formValue="dataModel" /> -->
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="分类名称" path="classifyName">
        <n-input placeholder="请输入分类名称" v-model:value="dataModel.classifyName" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="状态" path="state">
        <n-switch v-model:value="dataModel.state" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="描述" path="description">
        <n-input placeholder="请输入描述" v-model:value="dataModel.description" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="" path="taskName">
        <h5 class="skutitle">
          <p>
            SKU属性 <n-button></n-button>
          </p>
        </h5>
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="分类名称" path="taskName">
        <n-input placeholder="请输入分类名称" v-model:value="dataModel.taskName" />
        <NwIcon name="icon-lajitong" onClick={} size={16}></NwIcon>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="分类名称" path="taskName">
        <n-input placeholder="请输入分类名称" v-model:value="dataModel.taskName" />
        <NwIcon name="icon-lajitong" onClick={} size={16}></NwIcon>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
<script lang="jsx">
import { defineComponent, ref, onMounted, watch } from "vue";
import { NwIcon } from '@platform/main'
// import NwCodeGenerate from "../../components/nw-code-generate/index.vue";
import {
  NButton,
  NForm,
  NGrid,
  NFormItemGi,
  NSelect,
  NInput,
  NTreeSelect,
  NSwitch
} from "naive-ui";
import {
  orgTree,
} from "./store.js";
export default defineComponent({
  components: {
    NwIcon,
    NButton,
    NForm,
    NGrid,
    NFormItemGi,
    NSelect,
    NInput,
    NTreeSelect,
    NSwitch,
    // NwCodeGenerate
  },
  props: {
    shelfList: {
      default: [],
      type: Object,
    },
    warehouseName: {
      default: '',
      type: String,
    },
    warehouseId: {
      default: '',
      type: String,
    },
    isForms: {
      default: true,
      type: Boolean,
    },
    isReadOnly: {
      default: false,
      type: Boolean,
    }

  },
  setup(props) {
    const shelfTable = ref(null)
    const tableData2 = ref([])
    const dataModel = ref({})
    const setTableData = (data) => {
      dataModel.value = data;
      // shelfTable.value.reloadData(tableData2.value)
    }
    const addTableData = () => {
      tableData2.value.push({ warehouseName: props.warehouseName, warehouseId: props.warehouseId });
      shelfTable.value.reloadData(tableData2.value)
    }
    const getTableData = () => {
      return dataModel.value
    }
    const handleUpdateValue = (value, option) => {
      console.log(value, option);
      dataModel.value.parenName = option.classifyName
      dataModel.value.parentCode = option.classifyCode
    }
    return {
      tableData2,
      addTableData,
      shelfTable,
      getTableData,
      setTableData,
      dataModel,
      orgTree,
      handleUpdateValue

    }
  }
})
</script>
<style lang="less">
h5.skutitle {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  margin-left: 20px;
  border-top: 1px dashed;
  width: 100%;
  padding-top: 20px;

  p {
    height: 14px;
    line-height: 14px;
    border-left: 2px solid #2080f0;
    padding-left: 5px;
  }
}
</style>