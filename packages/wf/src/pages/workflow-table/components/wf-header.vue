<template>
  <n-layout-header>
    <n-space>
      <!-- <n-radio-group default-value="all" :on-update:value="radioChange" name="radiobuttongroup">
        <n-radio-button
          v-for="objectType in objectTypes"
          :key="objectType.value"
          :value="objectType.value"
        >{{ objectType.label }}</n-radio-button>
      </n-radio-group> -->
      <!-- <span class="tootle-record"
        >共<span class="tootle-record-number">{{ count }}</span
        >条记录</span
      >-->
    </n-space>
    <n-space>
      <!-- <n-button
        v-if="type != 'draft'"
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="creatPerusal"
      >
        <template #icon>
          <nw-icon name="icon-add-bold" :size="18" />
        </template>新增传阅
      </n-button> -->
      <!-- <n-button
        size="small"
        class="icon-btn"
        style="margin-right: 5px; padding: 0 5px"
        @click="refresh"
      >
        <template #icon>
          <nw-icon name="icon-shuaxin2" :size="18" />
        </template>
      </n-button>
      <n-button
        size="small"
        class="icon-btn"
        style="margin-right: 5px; padding: 0 5px"
        @click="tableExport"
      >
        <template #icon>
          <nw-icon name="icon-daochu1" :size="18" />
        </template>
      </n-button>
      <n-button
        size="small"
        class="icon-btn"
        style="margin-right: 5px; padding: 0 5px"
        @click="tablePrint"
      >
        <template #icon>
          <nw-icon name="icon-dayin" :size="18" />
        </template>
      </n-button> -->
    </n-space>
  </n-layout-header>
  <n-form
    inline
    :model="searchFormData"
    label-placement="left"
    :label-width="80"
    style="height: 40px; padding-top: 6px; position: relitive"
    id="myheader"
  >
    <n-form-item label="标题" path="reason">
      <n-input
        placeholder="请输入标题"
        v-model:value="searchFormData.reason"
        size="small"
        style="width: 150px"
      />
    </n-form-item>
    <n-form-item label="申请人" path="createUserName">
      <n-input
        placeholder="请输入申请人"
        v-model:value="searchFormData.createUserName"
        size="small"
        style="width: 150px"
      />
    </n-form-item>
    <n-form-item>
      <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="search"
        >查询</n-button
      >
      <n-button size="small" type style="margin-right: 5px" @click="reset"
        >重置</n-button
      >
      <n-button
        ghost
        style="background: #fff; color: #000"
        size="small"
        @click="
          () => {
            searchFormVisible = true;
          }
        "
      >
        <template #icon>
          <nw-icon name="icon-gaojichaxuntubiao" :size="18" /> </template
        >高级搜索
      </n-button>
      <!-- <n-button
        ghost
        style="background: #fff; color: #000; margin-left: 5px"
        size="small"
        @click="
          () => {
            searchFormVisible = true;
          }
        "
      >
        <template #icon>
          <nw-icon name="icon-changyongtiaojiantubiao" :size="18" />
        </template>
        常用条件
        <nw-icon name="icon-changyongtiaojianxiala" :size="18" />
      </n-button> -->
    </n-form-item>
  </n-form>
  <n-drawer
    :show="searchFormVisible"
    width="100%"
    height="280"
    placement="top"
    style="background: #f8f8fc"
    to="#myheader"
  >
    <n-drawer-content
      title="高级搜索"
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <!-- <slot name="search-form" :searchFormData="searchFormCache"></slot> -->
      <n-form
        :model="searchFormData"
        label-placement="left"
        :label-width="80"
        size="small"
      >
        <n-grid :cols="17" :x-gap="24">
          <n-form-item-gi :span="4" label="标题" path="reason">
            <n-input
              placeholder="请输入标题"
              v-model:value="searchFormData.reason"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="4" label="编码" path="bizKey">
            <n-input
              placeholder="请输入编码"
              v-model:value="searchFormData.bizKey"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="4" label="业务" path="procdefTypeName">
            <n-input
              placeholder="请输入业务"
              v-model:value="searchFormData.procdefTypeName"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="4" label="申请时间" path="remark">
            <n-date-picker v-model:value="range" type="daterange" clearable />
          </n-form-item-gi>
          <n-form-item-gi :span="4" label="流程状态" path="state">
            <n-select
              v-model:value="searchFormData.state"
              style="text-align: left"
              placeholder="请选择流程状态"
              clearable
              :options="[
                {
                  label: '运行中',
                  value: 1,
                },
                {
                  label: '完成',
                  value: 2,
                },
                {
                  label: '挂起',
                  value: 3,
                },
                {
                  label: '终止',
                  value: 4,
                },
                {
                  label: '知会',
                  value: 5,
                },
              ]"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="search"
          >查询</n-button
        >
        <n-button
          type="warning"
          size="small"
          style="margin-right: 5px"
          @click="reset"
          >重置</n-button
        >
        <n-button size="small" @click="handleCancel">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h, defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { NwIcon } from '@platform/main';
import {format } from "date-fns";
import { draftList } from "../api/index"
import {
  NForm, NFormItem, NGrid, NGi, NButton, NInput, NRadioGroup, NRadioButton, NSpace, NPagination, NLayout,
  NLayoutContent, NLayoutHeader, NLayoutFooter, NCard,NDrawer,NDrawerContent,NFormItemGi, NSelect,
    NDatePicker
} from 'naive-ui'

export default defineComponent({
  components: {
    NSpace,
    NRadioGroup,
    NRadioButton,
    NPagination,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NForm, NFormItem, NButton, NInput, NGrid, NGi,
    NCard,
    NwIcon,
    NDrawer,
    NDrawerContent,
    NFormItemGi,
    NSelect,
    NDatePicker
  },
  props: {
    count: Number, // 查询结果总条数
    type: String
  },
  emits: {
    "radioChange": null,// 业务改变
    "search": null,// 快捷搜索
    "reset": null,// 重置搜索
    "creatPerusal": null, // 新建传阅
    "refresh": null, // 刷新页面
    "tableExport": null, // 导出
    "tablePrint": null, // 打印
  },
  setup(props, context) {
    const range = ref([Date.now(), Date.now()])
    watch(()=>range.value,(v)=>{
      if(v[0]&&v[1]){
        searchFormData.value.startTime = format(v[0], 'yyyy-MM-dd')+ " " + "00:00:00";
        searchFormData.value.endTime = format(v[1], 'yyyy-MM-dd')+ " " + "23:59:59";
      }
    })
    const radioValue = ref(null)
    const searchFormData = ref({})
    const objectTypes = [
      {
        value: "all",
        label: "所有"
      },
      // {
      //   value: "hx",
      //   label: "核销"
      // },
      // {
      //   value: "ht",
      //   label: "合同"
      // },
      // {
      //   value: "xm",
      //   label: "项目"
      // },
    ]
    const radioChange = (v) => {
      context.emit("radioChange", v)
    }
    const creatPerusal = () => {
      context.emit("creatPerusal")
    }
    const refresh = () => {
      context.emit('refresh')
    }
    const tableExport = () => {
      context.emit("tableExport")
    }
    const tablePrint = () => {
      context.emit("tablePrint")
    }
    const search = () => {
      searchFormVisible.value = false;
      console.log(searchFormData.value,'searchFormData.valuesearchFormData.valuesearchFormData.value')
      context.emit("search", searchFormData.value)
    }
    const reset = () => {
      searchFormData.value.bizKey = ""
      searchFormData.value.reason = ""
      searchFormVisible.value = false;
      context.emit("reset", {})
    }
    const searchFormCache = ref({})
    const searchFormVisible = ref(false)
    const handleCancel = ()=>{
      searchFormVisible.value = false
    }
    onMounted(() => {
    })
    return {
      reset,
      radioValue,
      objectTypes,
      radioChange,
      searchFormData,
      creatPerusal,
      refresh,
      search,
      tablePrint,
      tableExport,
      searchFormVisible,
      searchFormCache,
      handleCancel,
      range
    };
  }
});
</script>