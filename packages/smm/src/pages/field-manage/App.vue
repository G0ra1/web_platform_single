<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5">
        <span></span>
      </n-space>
      <n-space :size="5" style="padding: 0 5px;position:absolute;">

        <!-- <n-form ref="formRef" inline label-placement="left" label-align="right" :label-width="120" :model="SearchForm"
          style="height: 30px;">
          <n-form-item label="大宗商品名称" path="commodityItemName">
            <n-input placeholder="大宗商品名称" v-model:value="commodityItemName" />
          </n-form-item>
          <n-form-item>
            <n-button type="info" attr-type="button" style="margin-right: 5px;" @click="() => {
              searchName()
            }">
              查询
            </n-button>
            <n-button type="warning" attr-type="button" @click="() => {
              pgtCustomName = ''
              tableRef.loadData(rightDatas)
            }">
              重置
            </n-button>
          </n-form-item>
        </n-form> -->

        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-button type="primary" @click="showAction([], 1)">
          <template #icon>
            <nw-icon name="icon-n-y-add" :size="14" />
          </template>
          修改
        </n-button>

      </n-space>
    </n-layout-header>

    <n-layout has-sider content-style="height: 100%">
      <!-- <n-layout-sider style="width:272px">
        <OrgTree @callback="sideTreeCallback" />
      </n-layout-sider> -->
      <n-layout-content>
        <vxe-grid v-bind="gridOptions" ref="tableRef" class="mytable-scrollbar">
        </vxe-grid>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <ModalAction ref="modalAction" @update:callback="() => {
    getRightData()
  
  }"></ModalAction>
  <ButtonAction ref="buttonlAction" @update:callback="() => {
    getRightData()
  
  }"></ButtonAction>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'

import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NForm,
  NFormItem,
  NSpin,
  NDrawerContent,
  NPopconfirm,
  useMessage,
  NLayoutSider
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, OrgTree } from '@platform/main'
import SideTree from './components/tree-grid/index.vue'
import { query, del } from './api/index.js'
import ModalAction from './components/action.vue'
import ButtonAction from './components/buttonAcction.vue'
import {
  hierarchy as d3Hierarchy,
  max as d3Max
} from 'd3'

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    SideTree,
    NForm,
    NFormItem,
    NSpin,
    NDrawerContent,
    ModalAction,
    NPopconfirm,
    ButtonAction,
    NLayoutSider,
    OrgTree
  },
  setup() {
    const rightDatas = ref([])
    const tableRef = ref()
    const modalAction = ref()
    const buttonlAction = ref()
    const appMessage = ref({})
    const message = useMessage();
    const pgtCustomName = ref('')
    const deptId = ref('0')
    const deptName = ref('root')
    const sideTreeCallback = (row) => {
      console.log(row, 'row.......')
      deptId.value = row.id
      deptName.value = row.orgName
      getRightData()
    }
    const handDel = (selected) => {
      let id = selected.id
      del(id).then(res => {
        message.success("删除成功");
        getRightData()

      })
    }
    const getRightData = () => {
      gridOptions.loading = true
      query({ deptId: deptId.value, searchName: searchName.value }).then((r) => {
        rightDatas.value = r.records
        tableRef.value.loadData(r.records)
        gridOptions.loading = false
      })
    }
    const searchName = () => {
      tableRef.value.commitProxy("query");
    }
    const showAction = (e = {}, n = 1) => {
      modalAction.value.sonFn(e, n);
    }
    const showButtonAction = (e = {}) => {
      buttonlAction.value.sonFn(e);
    }
    const resultMethod = (res) => {
      let m = [{}]
      res.map(d => {
        m[0][d.fieldId] = d.isShow == 1 ? '是' : '否'
      })
      return m
    }
    const queryData = ({ page }) => {
      //
      // 这里发起请求
      return new Promise((resolve) => {
        // 分页
        query({
          pgtCustomName: pgtCustomName.value,
          page: {
            current: page.currentPage,
            size: page.pageSize
          }
        })
          .then((res) => {
            // 结果
            resolve({
              total: res.total,
              result: resultMethod(res)
            });
          });
      });
    };
    const gridOptions = reactive({
      rowId: 'id',
      size: 'mini',
      border: true,
      height: 'auto',
      align: null,
      loading: false,
      columns: [
        {
          field: 'item_time',
          title: '年份',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'materials_type_name',
          title: '大类',
          showHeaderOverflow: true,
          minWidth: 100,
          fixed: 'left',
        },
        {
          field: 'project_name',
          title: '项目名称',
          showHeaderOverflow: true,
          minWidth: 100,
          fixed: 'left',
        },

        {
          field: 'finish_time',
          title: '要求完成时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'unit_name',
          title: '组长单位',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'procurement_method_name',
          title: '采购方式',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'float_range',
          title: '浮动范围',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'pricing_mechanism',
          title: '调价机制',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'result_public',
          title: '结果公告',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'explanation',
          title: '价格调整公告',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'postpone_public',
          title: '延期公告',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'others',
          title: '其他事项',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'project_name',
          title: '项目负责人',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'current_progress_name',
          title: '当前进展',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'one_platform_submit_time',
          title: '方案提交时间（一体化平台）',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'one_platform_finish_time',
          title: '方案审批完成时间（一体化平台）',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'invite_bids_submit_time',
          title: '方案提交时间（招标管理平台）',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'invite_bids_finish_time',
          title: '方案审批完成时间（招标管理平台）',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'invite_bids_confirm_time',
          title: '招标文件确认时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'invite_bids_public_time',
          title: '招标公告时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'tender_open_time',
          title: '开标时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'invite_bids_result_public_time',
          title: '招标结果公示时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'result_finish_time',
          title: '招标结果完成审批时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'assess_submit_time',
          title: '评审报告提交时间（一体化平台）',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'assess_finish_time',
          title: '评审报告审批完成时间（一体化平台）',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'result_public_time',
          title: '结果公告时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'catalog_upload_time',
          title: '目录上载时间',
          showHeaderOverflow: true,
          minWidth: 100
        },
        {
          field: 'explanation2',
          title: '备注',
          showHeaderOverflow: true,
          minWidth: 100
        },
      ],
      pagerConfig: {
        pageSize: 20,
      },
      columnConfig: {
        resizable: true,
      },
      proxyConfig: {
        form: true,
        seq: true,
        props: {
          result: "result",
          total: "total",
        },
        ajax: {
          query: queryData,
        },
      },


    })
    onMounted(() => {
      // getRightData()
    })

    return {
      sideTreeCallback,
      gridOptions,
      rightDatas,
      tableRef,
      appMessage,
      buttonlAction,
      modalAction,
      showAction,
      showButtonAction,
      getRightData,
      handDel,
      searchName,
      pgtCustomName,
      deptId,
      deptName
    }
  }
})

</script>
<style  lang='less' scoped>

</style>