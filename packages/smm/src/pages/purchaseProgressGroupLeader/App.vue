<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5">
        <span></span>
      </n-space>
      <n-space :size="5" style="padding: 0 5px;position:absolute;">

        <n-form ref="formRef" inline label-placement="left" label-align="right" :label-width="120" :model="SearchForm"
          style="height: 30px;">
          <n-form-item label="大宗商品名称" path="commodityItemName">
            <n-input placeholder="大宗商品名称" v-model:value="commodityItemName" />
          </n-form-item>
          <n-form-item>
            <n-button type="info" attr-type="button" style="margin-right: 5px;" @click="()=>{
              searchName()
            }">
              查询
            </n-button>
            <n-button type="warning" attr-type="button" @click="()=>{
              pgtCustomName = ''
              tableRef.loadData(rightDatas)
            }">
              重置
            </n-button>
          </n-form-item>
        </n-form>

        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <!-- <n-button type="primary" @click="showAction([])">
          <template #icon>
            <nw-icon name="icon-n-y-add" :size="14" />
          </template>
          新建
        </n-button> -->

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
    const showAction = (e = {}) => {
      modalAction.value.sonFn(e);

    }
    const showButtonAction = (e = {}) => {
      buttonlAction.value.sonFn(e);
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
              result: res.records,
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
        { type: "seq", width: 50, minWidth: 50, fixed: 'left', },
        {
          field: 'materialsTypeName',
          title: '大类',
          showHeaderOverflow: true,
          minWidth: 200,
          fixed: 'left',
        },
        {
          field: 'projectName',
          title: '名称',
          showHeaderOverflow: true,
          minWidth: 200,
          fixed: 'left',
        },
        {
          field: 'itemTime',
          title: '年份',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'finishTime',
          title: '要求完成时间',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'unitName',
          title: '组长单位',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'procurementMethodName',
          title: '采购方式',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'floatRange',
          title: '浮动范围',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'pricingMechanism',
          title: '调价机制',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'resultPublic',
          title: '结果公告',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'explanation',
          title: '价格调整公告',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'postponePublic',
          title: '延期公告',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'others',
          title: '其他事项',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: 'currentProgressName',
          title: '当前进展',
          showHeaderOverflow: true,
          minWidth: 200
        },
        {
          field: '',
          title: '操作',
          fixed: 'right',
          showHeaderOverflow: true,
          minWidth: 200,
          width: '100px',
          slots: {
            default: ({ row }) => {
              return [
                <div>
                  <a onClick={() => row.menuType == 2 ? showButtonAction(row) : showAction({ ...row })} style="color:#4098fc;cursor: pointer;display:inline-block;">{"编辑"}</a>

                  <NPopconfirm
                    onPositive-click={(e) => { handDel(row) }}
                    positive-text="确定"
                    negative-text="取消"
                  >
                    {{
                      trigger: () => <a style="color:#C91019;cursor: pointer;display:inline-block;margin-left:8px">{"删除"}</a>,
                      default: () => `是否删除大宗商品${row.commodityItemName}？`
                    }}

                  </NPopconfirm>

                  <a onClick={() => showButtonAction({
                    menuType: 2, ...appMessage.value,
                    parentFullName: row.parentFullName + '/' + row.menuName,
                    parentName: row.menuName,
                    parentFullId: row.parentFullId + '/' + row.id,
                    parentId: row.id,

                  })} style={`${row.menuType == 1 ? 'display:inline-block' : 'display:none'};color:#4098fc;cursor: pointer;margin-left:15px`}>{"关联功能"}</a>

                </div>
              ];
            },
          }
        }
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