<template>
  <n-layout class="fw-table">
    <WfHeader
      :count="pageCount"
      type="draft"
      @radioChange="radioChange"
      @search="search"
      @reset="reset"
      @creatPerusal="creatPerusal"
      @refresh="refresh"
      @tableExport="tableExport"
      @tablePrint="tablePrint"
    >
      <template v-slot:search-form="{}">
        <!-- <n-form
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
        </n-form> -->
      </template>
    </WfHeader>
    <n-layout-content>
      <n-spin :show="spinShow">
        <div class="fw-box">
          <n-card hoverable v-for="item in dataList" :key="item.id">
            <div :class="{ 'top-right': true, spState: item.state > 2 }">
              <span :class="{ state: true }">{{ getWfState(item.state) }}</span>
            </div>
            <div class="right-bottom">
              <n-button
                size="small"
                type="info"
                style="margin-right: 5px"
                @click="delHandel(item)"
                ghost
                >删除</n-button
              >
              <!-- <n-button type="info" size="small" style="margin-right: 5px" @click="() => { }">撤销</n-button> -->
            </div>
            <n-grid x-gap="12" :cols="18">
              <n-gi span="5">
                <div class="n-g-item">
                  <span class="title" @click="handle(item.id)">{{
                    item.reason
                  }}</span>
                  <span>{{ item.bizKey }}</span>
                </div>
              </n-gi>
              <n-gi span="1">
                <div class="n-g-item">
                  <span>类型：</span>
                  <span>{{ item.procdefName }}</span>
                </div>
              </n-gi>
              <n-gi span="2">
                <div class="n-g-item">
                  <span>业务：</span>
                  <span>{{ item.procdefTypeName }}</span>
                </div>
              </n-gi>
              <n-gi span="1">
                <div class="n-g-item">
                  <span>优先级：</span>
                  <span>{{ item.bizPriority || "暂无" }}</span>
                </div>
              </n-gi>
              <n-gi span="1">
                <div class="n-g-item">
                  <span>申请人：</span>
                  <span>{{ item.starterName }}</span>
                </div>
              </n-gi>
              <n-gi span="2">
                <div class="n-g-item">
                  <span>申请时间：</span>
                  <span>{{ item.applyTime }}</span>
                </div>
              </n-gi>
              <n-gi span="2">
                <div class="n-g-item">
                  <span>申请部门：</span>
                  <span>
                    {{ item.starterOrgName || item.starterDeptName }}
                  </span>
                </div>
              </n-gi>
              <n-gi span="3">
                <div class="n-g-item">
                  <span>申请机构：</span>
                  <span>
                    {{
                      item.starterOrgNameStd ||
                      item.starterDeptNameStd ||
                      item.starterOrgName
                    }}
                  </span>
                </div>
              </n-gi>
              <!-- <n-gi span="2">
              <div class="n-g-item">
                <span>当前办理人：</span><span>{{ item.reason }}</span>
              </div>
              </n-gi>-->
            </n-grid>
          </n-card>
          <n-empty
            style="margin-top: 250px"
            v-if="NEmptyShow"
            description="没有数据"
          ></n-empty>
        </div>
      </n-spin>
    </n-layout-content>
    <n-layout-footer style="display: flex; justify-content: center">
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :page-count="pageCount"
        show-size-picker
        :page-sizes="pageSizes"
        :on-update:page="updatePage"
      >
        <template #suffix="{ itemCount }">共 {{ total }} 条记录</template>
      </n-pagination>
    </n-layout-footer>
  </n-layout>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    title="确认"
    content="请确认删除此记录"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h, defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { NwIcon } from '@platform/main';
import { draftList,del } from "../api/index"
import {
  NForm, NFormItem, NGrid, NGi, NButton, NInput, NRadioGroup, NRadioButton, NSpace, NPagination, NLayout,
  NLayoutContent, NLayoutHeader, NLayoutFooter, NCard, NSpin, NEmpty,NFormItemGi,NSelect,NDatePicker ,useMessage,NModal
} from 'naive-ui'
import WfHeader from "../components/wf-header.vue"
import { openDrawer } from '../store/index.js'

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
    WfHeader,
    NSpin,
    NEmpty,
    NFormItemGi,
    NSelect,
    NDatePicker,
    NModal
  },
  setup(props, context) {
    window.addEventListener('wfComplete', () => {
      getData();
    })
    const message = useMessage();
    const pageSizes = [{
      label: "5条/页",
      value: 5
    }]
    const range = ref([Date.now(), Date.now()])
    watch(()=>range.value,(v)=>{
      if(v[0]&&v[1]){
        searchFormData.value.startTime = format(v[0], 'yyyy-MM-dd')+ " " + "00:00:00";
        searchFormData.value.endTime = format(v[1], 'yyyy-MM-dd')+ " " + "23:59:59";
      }
    })
    const dataList = ref([])
    const pageSize = ref(5)
    const page = ref(1)
    const total = ref(0)
    const pageCount = ref(0)
    const radioValue = ref(null)
    const spinShow = ref(false)
    const NEmptyShow = ref(true)
    const objectTypes = [
      // 流程分类
      {
        value: "all",
        label: "所有"
      },
      {
        value: "hx",
        label: "核销"
      },
      {
        value: "ht",
        label: "合同"
      },
      {
        value: "xm",
        label: "项目"
      },
    ]
    const radioChange = (v) => {
      console.log(v, 'vvvvvvvvvvvvvv')

    }
    const creatPerusal = (d) => {
      console.log('新增传阅')
    }
    const refresh = () => {
      console.log("刷新")
    }
    const tableExport = () => {
      console.log("导出")
    }
    const tablePrint = () => {
      console.log('打印')
    }
    const search = (sData) => {
      console.log(sData, 'sData')
      searchFormData.value = {...searchFormData.value,...sData}
      getData();
    }
    const reset = () => {
      searchFormData.value = {}
      search()
    }
    const getData = () => {
      spinShow.value = true
      draftList({ ...searchFormData.value,page: { current: page.value, size: pageSize.value } }).then(res => {
        pageCount.value = res.pages
        dataList.value = res.records
        total.value = res.total
        NEmptyShow.value = res.records.length == 0

      }).finally(() => {
        spinShow.value = false
      })
    }
    const getWfState = (state) => {
      let text = "";
      switch (state) {
        case 1:
          text = "运行中";
          break;
        case 2:
          text = "完成";
          break;
        case 3:
          text = "挂起";
          break;
        case 4:
          text = "终止";
          break;
        case 5:
          text = "知会";
          break;
      }
      return text
    }
    const updatePage = (p) => {
      page.value = p
      getData()
    }
    const searchFormData = ref({})
    const camundaProcinsId = ref('')
    const camundaProcdefId = ref('')
    const showDelModal = ref(false)
    const delHandel = (row)=>{
      showDelModal.value  = true
      camundaProcinsId.value = row.camundaProcinsId
      camundaProcdefId.value = row.camundaProcdefId
    }
    const onPositiveClick = ()=>{
      del({camundaProcinsId:camundaProcinsId.value,camundaProcdefId:camundaProcdefId.value}).then(res=>{
          message.success("删除成功")
          getData()
      })
    }
    const onNegativeClick = ()=>{

    }
    onMounted(() => {
      getData()
    })
    return {
      camundaProcinsId,
      camundaProcdefId,
      showDelModal,
      onPositiveClick,
      onNegativeClick,
      delHandel,
      pageSizes,
      pageSize,
      pageCount,
      page,
      reset,
      search,
      radioValue,
      updatePage,
      objectTypes,
      radioChange,
      getWfState,
      getData,
      dataList,
      searchFormData,
      creatPerusal,
      refresh,
      tableExport,
      tablePrint,
      total,
      spinShow,
      NEmptyShow,
      range,
      handle(id) {
        // redirectPage(`/wf/run-skin.html?Action=draft&id=${id}`, true)
        openDrawer(`/html/wf/run-skin.html?Action=draft&id=${id}`)
      }
    };
  }
});
</script>
<style lang="less" >
</style>