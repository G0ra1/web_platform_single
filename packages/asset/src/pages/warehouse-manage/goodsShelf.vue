<template>
  <h5 v-if="isForms">
    仓库货架<n-button @click="addTableData" style="height:16px;width:16px;padding:0;margin-left: 5px;line-height: 16px;" type="info">+</n-button>
  </h5>
  <h5 v-if="isReadOnly" style="
      margin: 30px 0;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      border-left: #1d7ced 2px solid;
      padding-left: 8px;
    ">
    货架信息
  </h5>

  <n-button v-if="!isForms && !isReadOnly" style="position: absolute; top: 10px; right: 10px" type="info"
    @click="addTableData" size="small">新增</n-button>

  <vxe-table ref="shelfTable" border show-overflow :data="tableData2" :column-config="{ resizable: true }" :edit-config="{
    trigger: 'click',
    mode: 'row',
    enabled: !isReadOnly,
    showIcon: !isReadOnly,
  }">
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column field="shelfName" title="货架号" :edit-render="{}">
      <template #edit="{ row }">
        <vxe-input v-model="row.shelfName" type="text"></vxe-input>
      </template>
    </vxe-column>
    <vxe-column field="warehouseName" title="所属仓库" :edit-render="{}">
      <template #edit="{ row }">
        <vxe-input :disabled="warehouseName" v-model="row.warehouseName" type="text"></vxe-input>
      </template>
    </vxe-column>
    <!-- <vxe-column field="sex" title="责任法人" :edit-render="{}">
      <template #edit="{ row }">
        <vxe-input v-model="row.name" type="text"></vxe-input>
      </template>
    </vxe-column>
    <vxe-column field="num1" title="责任部门" :edit-render="{}">
      <template #edit="{ row }">
        <vxe-input
          v-model="row.num1"
          type="text"
          placeholder="请输入数值"
        ></vxe-input>
      </template>
    </vxe-column> -->
    <vxe-column v-if="!isReadOnly" title="操作" width="100" show-overflow>
      <template #default="{ row }">
        <NwIcon name="icon-del" :size="18" @click="
          () => {
            tableData2 = tableData2.filter(
              (d) => d.shelfName !== row.shelfName
            );
          }
        "></NwIcon>
      </template>
    </vxe-column>
  </vxe-table>
</template>
<script lang="jsx">
import { defineComponent, ref, onMounted, watch } from "vue";
import { NwIcon } from '@platform/main'
import {
  NButton,
} from "naive-ui";
export default defineComponent({
  components: {
    NwIcon,
    NButton
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
      default: null,
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
    const setTableData = (data) => {
      tableData2.value = data;
      shelfTable.value.reloadData(tableData2.value)
    }
    const addTableData = () => {
      tableData2.value.push({ warehouseName: props.warehouseName, warehouseId: props.warehouseId });
      shelfTable.value.reloadData(tableData2.value)
    }
    const getTableData = () => {
      return shelfTable.value.getTableData().fullData
    }
    return {
      tableData2,
      addTableData,
      shelfTable,
      getTableData,
      setTableData
    }
  }
})
</script>
<style lang="less">
h5 {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}
</style>