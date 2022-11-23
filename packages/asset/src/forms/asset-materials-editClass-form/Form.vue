<template>
  <n-spin :show="classTree.length == 0">
    <n-form :model="dataModel" label-placement="left" :label-width="90"
      :style="{ paddingRight: '20px', paddingLeft: '10px' }" size="small">
      <n-grid :cols="12" :x-gap="24">
        <n-form-item-gi :span="12" label="上级分类" path="parenName">

          <n-tree-select v-if="classTree.length > 0" :options="classTree" key-field="classifyCode"
            label-field="classifyName" :default-value="dataModel.parentCode" children-field="kids"
            @update:value="handleUpdateValue" />

        </n-form-item-gi>
        <n-form-item-gi :span="12" label="物资编码" path="classifyCode">
          <nw-code-generate formName="wuzifenlei" formField="classifyCode" v-model:value="dataModel.classifyCode"
            :formValue="dataModel" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="分类名称" path="classifyName">
          <n-input placeholder="请输入分类名称" v-model:value="dataModel.classifyName" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="状态" path="state">
          <n-switch v-model:value="dataModel.state" checked-value="正常" unchecked-value="停用">
            <template #checked>
              正常
            </template>
            <template #unchecked>
              停用
            </template>
          </n-switch>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="描述" path="description">
          <n-input placeholder="请输入描述" v-model:value="dataModel.description" />
        </n-form-item-gi>
        <n-form-item-gi :span="12">
          <h5 class="skutitle">
            <p>
              SKU属性<n-button @click="addSkuList"
                style="height:16px;width:16px;padding:0;margin-left: 5px;line-height: 16px;" type="info">+</n-button>
            </p>
          </h5>
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <div style="padding-left: 30px;margin-top:-15px;">
      <vxe-table ref="skuListTable" :seq-config="tableSeq" :show-header="false" show-overflow :data="itemSkuList"
        :column-config="{ resizable: true }" :edit-config="{
          trigger: 'click',
          mode: 'row',
          enabled: true,
          showIcon: true,
        }">
        <vxe-column type="seq" title="序号" :width="80"></vxe-column>
        <vxe-column field="skuName" title="skuName" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input :disabled="skuName" v-model="row.skuName" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column v-if="true" title="操作" width="50" show-overflow>
          <template #default="{ row }">
            <NwIcon name="icon-del" :size="18" @click="
              () => {
                itemSkuList = itemSkuList.filter(
                  (d) => {
                    return d.skuName !== row.skuName
                  }
                );
              }
            "></NwIcon>
          </template>
        </vxe-column>
      </vxe-table>
    </div>

  </n-spin>
</template>
<script lang="jsx">
import { defineComponent, ref, onMounted, watch } from "vue";
// import NwCodeGenerate from "../../components/nw-code-generate/index.vue";
import { dataModel, classTree, itemClassifyListFn, treeLoading, itemSkuList } from './store'
import { NwIcon } from '@platform/main'
import {
  NButton,
  NForm,
  NGrid,
  NFormItemGi,
  NSelect,
  NInput,
  NTreeSelect,
  NSwitch,
  NSpin
} from "naive-ui";
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
    // NwCodeGenerate,
    NSpin
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
    const skuListTable = ref(null)

    const setTableData = (data) => {
      dataModel.value = data;
      skuListTable.value.reloadData(itemSkuList.value)
    }
    const addSkuList = () => {
      itemSkuList.value.push({ skuKey: '字段' + (itemSkuList.value.length + 1) });
      skuListTable.value.reloadData(itemSkuList.value)
    }
    const getTableData = () => {
      return dataModel.value
    }
    const handleUpdateValue = (value, option) => {
      console.log(value, option);
      dataModel.value.parenName = option.classifyName
      dataModel.value.parentCode = option.classifyCode
    }
    const tableSeq = ref({
      seqMethod({ rowIndex }) {
        return `字段${rowIndex + 1}`
      },
    })
    itemClassifyListFn()
    return {
      itemSkuList,
      addSkuList,
      skuListTable,
      getTableData,
      setTableData,
      dataModel,
      classTree,
      handleUpdateValue,
      itemClassifyListFn,
      treeLoading,
      tableSeq
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
  padding-top: 15px;

  p {
    height: 15px;
    line-height: 15px;
    border-left: 2px solid #2080f0;
    padding-left: 5px;
  }
}
</style>