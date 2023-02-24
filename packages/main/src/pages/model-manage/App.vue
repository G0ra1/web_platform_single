<script lang="ts" setup>
import { NwIcon, NwAppTreeGrid } from '@platform/main'
import ModelContent from './components/ModelContent.vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NButton, NSpace, NInput, NInputGroup, useDialog, useMessage } from 'naive-ui'
import { bind, gridRef, filterData, query, refresh, appInfo, modelContentRef, handleTree, initDialog, configShow, modelEntityId } from "./App.ts"
import { provide } from "vue"
import ModelMenuTree from './components/ModelMenuTree.vue';

//因为使用了inject，所以只能在setup请求中使用，所以里传递一下；
initDialog(useDialog(), useMessage());
provide("appInfo", appInfo);
</script>
<template>
  <n-layout has-sider class="nw-layout-full">
    <!-- 左树 start -->
    <n-layout-sider bordered width="225" content-style="padding: 5px;" style="margin-right: -1px">
      <nw-app-tree-grid rootName="全部" @callback="handleTree" />
    </n-layout-sider>
    <!-- 左树 end -->
    <!-- 右侧内容区 start -->
    <n-layout class="nw-layout-full">
      <!-- 内容区头部 start -->
      <n-layout-header class="nw-layout-header">
        <n-space :size="5" style="padding: 0 5px">
          <n-button :disabled="!appInfo.appCode" type="primary"
            @click="modelContentRef?.show(appInfo.resourceId, undefined)">
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新建模型
          </n-button>
        </n-space>
        <n-space :size="5" style="padding: 0 5px">
          <n-input-group>
            <n-input :value="filterData.tableName || ''" @update:value="(d: string) => filterData.tableName = d"
              placeholder="查询表名" :style="{ width: '150px' }" style="margin-right: 10px" />
            <n-input :value="filterData.tableNameCh || ''" @update:value="(d: string) => filterData.tableNameCh = d"
              placeholder="查询表中文名" :style="{ width: '150px' }" />
            <n-button type="primary" @click="query()">
              搜索
            </n-button>
          </n-input-group>
          <n-button title="重置" type="warning" @click="refresh()">
            <template #icon>
              <nw-icon name="icon-n-y-refresh" />
            </template>
          </n-button>
          <n-button title="导入">
            <template #icon>
              <nw-icon name="icon-n-y-import" />
            </template>
          </n-button>
          <n-button title="导出">
            <template #icon>
              <nw-icon name="icon-n-y-export" />
            </template>
          </n-button>
          <n-button title="打印" @click="gridRef?.print()">
            <template #icon>
              <nw-icon name="icon-n-y-print" />
            </template>
          </n-button>
          <n-button>
            <template #icon>
              <nw-icon name="icon-n-y-column" />
            </template>
          </n-button>
        </n-space>
      </n-layout-header>
      <!-- 内容区头部 end -->
      <!-- 内容区列表 start -->
      <n-layout-content>
        <vxe-grid v-bind="bind" ref="gridRef">
        </vxe-grid>
      </n-layout-content>
      <!-- 内容区列表 end -->
    </n-layout>
    <!-- 右侧内容区 end -->
  </n-layout>
  <model-content ref="modelContentRef" />
  <model-menu-tree v-model:show="configShow" :model-entity-id="modelEntityId" />
</template>