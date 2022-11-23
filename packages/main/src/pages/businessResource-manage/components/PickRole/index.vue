<template>
  <n-button @click="show">
    选择
  </n-button>
  <n-modal class="nw-modal" v-model:show="visible" preset="dialog" style="width: 800px; padding: 0" :show-icon="true"
    :mask-closable="true" :closable="true">
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择页面
      </div>
    </template>

    <n-layout has-sider class="nw-layout-full">
      <n-layout-sider width="250">
        <NwAppTreeGrid rootName="全部" @callback="selectApp" />
      </n-layout-sider>
      <n-layout>
        <n-layout-header>
          <n-space :size="5" style="padding: 0 5px">

          </n-space>
          <n-space :size="5" style="padding: 0 5px">
            <n-input-group>
              <n-input :value="filterData.formNameCh || ''" @update:value="(d: string) => filterData.formNameCh = d"
                placeholder="输入查询文本" :style="{ width: '150px' }" />
              <n-button type="primary" @click="query()">
                搜索
              </n-button>
            </n-input-group>
            <n-button title="重置" type="warning" @click="reset()">
              <template #icon>
                <nw-icon name="icon-n-y-refresh" />
              </template>
            </n-button>
          </n-space>
        </n-layout-header>
        <n-layout-content>
          <vxe-grid v-bind="bind" ref="gridRef">
          </vxe-grid>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <template #action>
      <div style="padding: 5px">
        <n-button size="small" @click="visible = false">取消</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'

import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  NModal
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import NwAppTreeGrid from '../../../menu-manage/components/tree-grid/index.vue'

export default defineComponent({
  props: {
    // 表单或者页面
    type: {
      type: String,
      default: '1'
    }
  },
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NModal,
    NwAppTreeGrid
  },
  setup(props, context) {
    const appInfo = ref({
      appCode: ''
    })
    const visible = ref<boolean>(false)
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      height: '400px',
      columns: [
        { field: 'roleName', title: '名称', showHeaderOverflow: true, width: '180px' },
        { field: 'roleCode', title: '编码', showHeaderOverflow: true, width: '210px' },
        {
          title: '操作',
          showHeaderOverflow: true,
          width: '50px',
          slots: {
            default: ({ row }) => {
              return [
                <NButton
                  size="tiny"
                  type="primary"
                  onClick={() => {
                    context.emit('update:value', row.id, row)
                    context.emit('update:roleCode', row.roleCode)
                    context.emit('update:roleName', row.roleName)
                    visible.value = false
                  }}
                >{{
                  default: () => '选择'
                }}</NButton>
              ];
            },
          }
        }
      ]
    }, new RequestPaging(
      '/main/mdmRole/list',
      'post'
    )
    )

    nextTick().then(() => {

    })
    const refresh = () => {
      reset({
        pageType: '2',
        appCode: appInfo.value.appCode
      })
    }
    return {
      visible,
      bind,
      gridRef,
      filterData,
      query,
      reset,
      show() {
        visible.value = true

        nextTick().then(() => {
          refresh()
        })
      },

      selectApp(d: any) {
        console.log(d)
        if (d.appType === 2) {
          appInfo.value = d
        } else if (d.appType === 0) {
          // root
          appInfo.value = { appCode: '' }
        }
        refresh()
      },
    }
  }
})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
