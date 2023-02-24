<script lang="ts" setup>
import { NwIcon, NwFunctionPredefine } from "@platform/main";
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NInput, NSelect, NInputGroup, useDialog, NButton, SelectOption } from "naive-ui";
import { bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, selectData, selectDataUpdate, selectSunDataUpdate, updatefilterDataValue, experimentTypeEnum, gridSearchRef, outSelectData, addFilter, delFilter } from "./App";
import { ref, nextTick, inject } from "vue";
initDialog(useDialog());
//只能放在setup中的回调函数，用于页面中的功能操作后的回调刷新
(inject("Emitter") as any).on("function-complete", () => {
  reset({});
});

//页面加载完成后，调用的重置方法
nextTick().then(() => {
  reset({});
});

const visible = ref<boolean>(false)
function toggle() {
  visible.value = !visible.value
}

</script>
<template>
  <n-layout has-sider class="nw-layout-full">
    <!-- 右侧内容区 start -->
    <n-layout class="nw-layout-full">
      <!-- 内容区头部 start -->
      <n-layout-header class="nw-layout-header">
        <n-space :size="5" style="padding: 0 10px;">
          <!--查询条件 start-->
          <n-input-group>
            <n-input autosize placeholder="实验温度" :value="filterData.experimentTemperature || ''"
              @update:value="(d: string) => filterData.experimentTemperature = d" :style="{ width: '180px' }">
              <template #prefix>实验温度:</template>
            </n-input>
          </n-input-group>

          <n-input-group>
            <n-input autosize :value="filterData.experimentPressure || ''"
              @update:value="(d: string) => filterData.experimentPressure = d" placeholder="实验压力"
              :style="{ width: '180px' }">
              <template #prefix>实验压力:</template>
            </n-input>
          </n-input-group>

          <n-input-group>
            <n-input autosize :value="filterData.heatingTime || ''"
              @update:value="(d: string) => filterData.heatingTime = d" placeholder="升温时间" :style="{ width: '180px' }">
              <template #prefix>升温时间:</template>
            </n-input>
          </n-input-group>

          <n-input-group>
            <n-input autosize :value="filterData.cementDensity || ''"
              @update:value="(d: string) => filterData.cementDensity = d" placeholder="水泥浆密度" :style="{ width: '180px' }">
              <template #prefix>水泥浆密度:</template>
            </n-input>
          </n-input-group>

          <n-input-group>
            <n-input autosize :value="filterData.staticTemperature || ''"
              @update:value="(d: string) => filterData.staticTemperature = d" placeholder="静止温度"
              :style="{ width: '180px' }">
              <template #prefix>静止温度:</template>
            </n-input>
          </n-input-group>

          <n-input-group>
            <n-input autosize :value="filterData.waterCementRatio || ''"
              @update:value="(d: string) => filterData.waterCementRatio = d" placeholder="水灰比"
              :style="{ width: '180px' }">
              <template #prefix>水灰比:</template>
            </n-input>
          </n-input-group>
          <!--查询条件 end-->
          <NwFunctionPredefine code="cemlabStatisticsAnalysisFormAdd" :params="paramsArray" />
        </n-space>
        <n-space :size="5" style="padding: 0 10px;">
          <n-button title="筛选" @click="toggle()">
            <template #icon>
              <nw-icon name="icon-n-y-shaixuan" />
            </template>
          </n-button>
          <n-button type="primary" @click="query()"> 搜索 </n-button>
          <n-button title="重置" type="warning" @click="refresh()">
            <template #icon>
              <nw-icon name="icon-n-y-refresh" />
            </template>
          </n-button>
        </n-space>
      </n-layout-header>
      <!-- 内容区头部 end -->
      <!--筛选条件 start-->
      <n-layout-header class="grid-search" :style="{
        maxHeight: visible ? '150px' : '0px'
      }">
        <div class="search-box" style="height: 150px;">
          <div style="overflow: auto;height: 200px; padding-bottom: 35px;box-sizing: border-box;">
            <n-space :size="5" style="padding: 0 10px;">
              <n-input-group>
                <n-button text @click="() => addFilter()">
                  <NwIcon name="icon-n-n-add" :size="14"></NwIcon>
                </n-button>
              </n-input-group>
              <n-input-group>
                <n-select placeholder="任务类型" :options="experimentTypeEnum"
                  @update:value="(d: string) => filterData.type = d" :style="{ width: '180px' }">
                </n-select>
              </n-input-group>
            </n-space>
            <n-space v-for="(search, index) in gridSearchRef" :key="index" :size="5" style="padding: 0 10px;">

              <n-input-group>
                <n-button text @click="() => delFilter(index)">
                  <NwIcon name="icon-n-n-cut" :size="14"></NwIcon>
                </n-button>
              </n-input-group>

              <n-input-group>
                <n-select placeholder="请选择一级查询条件" v-model:value="outSelectData[index].fieldOne" :options="selectData"
                  children-field="children-field" value-field="field"
                  @update:value="(value: string, option: SelectOption) => { selectDataUpdate(value, option, index) }"
                  :style="{ width: '180px' }">
                </n-select>
              </n-input-group>

              <n-input-group>
                <n-select placeholder="请选择二级查询条件" v-model:value="outSelectData[index].fieldTwo"
                  :options="search.searchTwo" children-field="children-field" value-field="field"
                  @update:value="selectSunDataUpdate" :style="{ width: '180px' }">
                </n-select>
              </n-input-group>

              <n-input-group>
                <n-select placeholder="查询连接符" v-model:value="outSelectData[index].operationType"
                  :options="[{ label: '等于', value: 'eq' }]" :style="{ width: '180px' }">
                </n-select>
              </n-input-group>

              <n-input-group>
                <n-input autosize placeholder="请输入查询条件" v-model:value="outSelectData[index].value"
                  @update:value="(value: string) => { updatefilterDataValue(value, index) }"
                  :style="{ width: '180px' }" />
              </n-input-group>
            </n-space>
          </div>
        </div>
      </n-layout-header>
      <!--筛选条件 end-->
      <!-- 内容区列表 start -->
      <n-layout-content>
        <vxe-grid v-bind="bind" :ref="(d: any) => gridRef = d"> </vxe-grid>
      </n-layout-content>
      <!-- 内容区列表 end -->
    </n-layout>
    <!-- 右侧内容区 end -->
  </n-layout>
</template>

<style lang="less">
.nw-layout-full.n-layout .n-layout-header.grid-search {
  transition: .3s;
  background-color: #fff;
  height: auto;
  display: block;
  position: relative;

  .search-box {
    position: relative;
  }
}
</style>