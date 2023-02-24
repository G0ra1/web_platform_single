<template>
  <n-form ref="formRef" size="small" :model="{}" :rules="{}" label-placement="top">
    <n-form-item label="尺寸">
      <n-radio-group size="small" v-model:value="TableConfig.options.size.value" >
        <n-radio
            value="small"
            label="大"
        />
        <n-radio
            value="medium"
            label="中"
        />
        <n-radio
            value="mini"
            label="小"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否显示表头">
      <n-radio-group size="small" v-model:value="TableConfig.options.showHeader.value" >
        <n-radio
            :value="true"
            label="显示"
        />
        <n-radio
            :value="false"
            label="隐藏"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="表头对齐方式">
      <n-radio-group size="small" v-model:value="TableConfig.options.headerAlign.value" >
        <n-radio
            value="left"
            label="左"
        />
        <n-radio
            value="center"
            label="居中"
        />
        <n-radio
            value="right"
            label="右"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="列对齐方式">
      <n-radio-group size="small" v-model:value="TableConfig.options.align.value" >
        <n-radio
            value="left"
            label="左"
        />
        <n-radio
            value="center"
            label="居中"
        />
        <n-radio
            value="right"
            label="右"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label-style="width: 100%;">
      <template #label>
        <n-space style="width: 100%" align="center" justify="space-between">
          列配置
          <n-button type="primary" size="tiny" @click="createColumn">新建列</n-button>
        </n-space>
      </template>
      <!-- 这里修改为拖拽 -->
      <draggable
        class="grid-columns"
        tag="div"
        :list="TableColumns"
        item-key="key"
        :group="{ name: 'sort', put: false }"
        handle=".handle"
        ghost-class="ghost"
        :sort="true"
        :move="() => {}"
        @end="moveEnd"
        :animation="200"
      >
        <template #item="{ element: item, index }">
          <div class="grid-column">
            <div class="label">
              {{ item.title }}
              <!-- &lt;{{item.field}}&gt; -->
            </div>

            <n-space
              align="center"
              :size="[5, 0]"
              item-style="display: flex;align-items: center;"
              class="extra"
            >
              <n-button text>
                <nw-icon
                  style="cursor: pointer"
                  :size="16"
                  name="icon-n-y-edit"
                  @click="
                    () => {
                      handleColumnEdit(index);
                    }
                  "
                />
              </n-button>
              <n-button text class="handle">
                <nw-icon
                  style="cursor: move"
                  :size="18"
                  name="icon-yidong"
                  @click="() => {}"
                />
              </n-button>
              <n-button text>
                <nw-icon
                  style="cursor: pointer"
                  :size="12"
                  name="icon-n-y-thinclose"
                  @click="
                    () => {
                      deleteColumn(index);
                    }
                  "
                />
              </n-button>
            </n-space>
          </div>
        </template>
      </draggable>
      <!-- <vxe-grid ref="gridRef" style="width: 100%" v-bind="gridOption"> </vxe-grid> -->
    </n-form-item>
  </n-form>
  <n-drawer
    v-model:show="drawerActive"
    :close-on-esc="false"
    :mask-closable="false"
    width="100%"
    :show-mask="false"
    :to="AttrContentRef && AttrContentRef.$el"
    class="grid-column-drawer"
    style="padding: 0"
  >
    <n-drawer-content
      body-content-style="padding: 0px;"
      header-style="box-sizing: border-box;height:32px;width: 100%;"
      :native-scrollbar="false"
    >
      <!-- <template #header>
            <div style="display:flex;justify-content: space-between;font-size: 14px;font-weight: bold;width: 100%;">     
                <n-tabs size="small">
                  <n-tab name="编辑列">
                    列配置
                  </n-tab>
                  <n-tab name="编辑列">
                    列内容
                  </n-tab>
                  <n-tab name="编辑列">
                    列编辑
                  </n-tab>
                </n-tabs>
                <nw-icon name="icon-n-y-back" @click="drawerActive = false" style="transform:rotateY(180deg);cursor:pointer" />
            </div>
        </template> -->

      <div style="height: 100%;background: #fff;">
        <n-tabs
          type="line"
          size="small"
          animated
          :tabs-padding="10"
          :theme-overrides="{
            tabGapSmallBar: '15px',
            tabGapSmallLine: '15px',
            tabFontWeight: 'bold'
          }"
        >
          <n-tab-pane name="column" tab="列配置">
            <n-form
              ref="columnRef"
              size="small"
              :model="{}"
              :rules="{}"
              label-placement="top"
              style="padding: 10px"
            >
              <n-form-item label="列名">
                <n-input
                  :value="ActiveColumn.title"
                  @update:value="(d: any) => updateColumnParam('title', d)"
                />
              </n-form-item>
              <n-form-item label="字段名">
                <n-input
                  :value="ActiveColumn.field"
                  @update:value="(d: any) => updateColumnParam('field', d)"
                />
              </n-form-item>
              <n-form-item label="宽度">
                <n-input
                  :value="ActiveColumn.width"
                  @update:value="(d: any) => updateColumnParam('width', d)"
                />
              </n-form-item>
              <n-form-item label="固定列">
                <n-radio-group size="small"
                  :value="ActiveColumn.fixed"
                  @update:value="(d: any) => updateColumnParam('fixed', d)"
                >
                  <n-radio
                      value="left"
                      label="左侧"
                  />
                  <n-radio
                      :value="null"
                      label="无"
                  />
                  <n-radio
                      value="right"
                      label="右侧"
                  />
                </n-radio-group>
              </n-form-item>
              <n-form-item label="表头对齐">
                <n-radio-group size="small"
                  :value="ActiveColumn.headerAlign"
                  @update:value="(d: any) => updateColumnParam('headerAlign', d)"
                >
                  <n-radio
                      value="left"
                      label="左"
                  />
                  <n-radio
                      :value="null"
                      label="继承配置"
                  />
                  <n-radio
                      value="right"
                      label="右"
                  />
                </n-radio-group>
              </n-form-item>
              <n-form-item label="列对齐">
                <n-radio-group size="small"
                  :value="ActiveColumn.align"
                  @update:value="(d: any) => updateColumnParam('align', d)"
                >
                  <n-radio
                      value="left"
                      label="左"
                  />
                  <n-radio
                      :value="null"
                      label="继承配置"
                  />
                  <n-radio
                      value="right"
                      label="右"
                  />
                </n-radio-group>
              </n-form-item>

              <!-- <n-form-item label="内容">
              </n-form-item>

              <n-form-item label="编辑">
                
              </n-form-item> -->
              <!-- <n-form-item label="编辑组件"> </n-form-item> -->
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="content" tab="列内容">
            <div
              style="padding: 10px;box-sizing:border-box"
            >
              <PickFieldComp :value="ColumnContentTagName || ''" @update:value="handleColumnContentSlot" />
              <n-divider title-placement="left">
                组件配置
              </n-divider>
              <!-- <PickFieldComp /> -->
              <component :value="ColumnContentConfig" :is="`dw-attr-${ColumnContentTagName}`"></component>
            </div>
          </n-tab-pane>
          <n-tab-pane name="edit" tab="列编辑">
            <div
              style="padding: 10px;box-sizing:border-box"
            >
              <!-- <PickFieldComp /> -->
              <PickFieldComp :value="ColumnEditTagName || ''" @update:value="handleColumnEditSlot" />
              <n-divider title-placement="left">
                组件配置
              </n-divider>
              <component :value="ColumnEditConfig" :is="`dw-attr-${ColumnEditTagName}`"></component>
            </div>
          </n-tab-pane>
        </n-tabs>
        <nw-icon
          name="icon-n-y-back"
          @click="drawerActive = false"
          style="position: absolute;right: 5px;top: 8px;transform: rotateY(180deg); cursor: pointer"
        />
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h, toRaw, watch } from "vue";

import { NButton, NSpace } from "naive-ui";

import { NwIcon } from "@platform/main";

import WidgetAttribute from "../../../components/widget-attribute/index.vue";

import { designer } from "../../../store/index";

import { compileValue } from "../../../utils/index";

import PickFieldComp from "../../../components/pick-field-comp/index.vue";
import { cloneDeep } from "lodash";

import { WidgetNS } from '../../../model/widget.d'

const props = defineProps<{
    value: WidgetNS.Config,
}>()

const { AttrContentRef } = designer;

const waRef = ref<any>();
// nextTick().then(() => {
//   console.log("====waRef=====", waRef);
// });

// 栅格列

const TableConfig = computed(
  () => props.value
);

// 抽屉
const drawerActive = ref<boolean>(false);
// 列表列配置
const TableColumns = computed<any>(() => {
  return compileValue(TableConfig.value.options.columns);
});

// 添加列
const createColumn = () => {
  const columns: any = compileValue(TableConfig.value.options.columns);
  // 列插槽处理
  const field = `field${columns.length}`;
  const defaultSlotName = `default_${field}`;
  const editSlotName = `edit_${field}`;
  columns.push({
    field,
    title: `列${columns.length}`,
    slots: {
      default: defaultSlotName,
      edit: editSlotName,
    },
  });
  // console.log('====  TableConfig.value===',TableConfig.value)
  // 生成插槽
  TableConfig.value.slots![defaultSlotName] = [
    {
      key: "nw-field-render",
      type: "nw-field-render",
      tagName: 'nw-field-render',
      isCustomDesigner: false,
      category: "field",
      icon: "icon-n-y-input",
      label: "自定义",
      options: {
        render: {
          type: "function",
          value: `(dm, sp, h) => {
                  return sp.row.${field}
              }`,
        },
      },
    },
  ];
  TableConfig.value.slots![editSlotName] = [
    {
      key: "n-input",
      type: "n-input",
      tagName: 'n-input',
      isCustomDesigner: false,
      category: "field",
      icon: "icon-n-y-input",
      label: "输入框",
      options: {
        disabled: {
          type: "boolean",
          value: false,
        },
        clearable: {
          type: "boolean",
          value: false,
        },
        type: {
          type: "string",
          value: "text",
        },
      },
    },
  ];

  // 20221129 这里需要修改 改为可转换fun函数
  TableConfig.value.options.columns.value = JSON.stringify(columns);
};
// 删除列
const deleteColumn = (index: number) => {

  const columns: any = compileValue(TableConfig.value.options.columns);
  const column = columns[index]
  // 删除对应的插槽
  if (column.slots) {
    // if (column.slots[`default_${}`]) {

    // }
    for (let sn in column.slots) {
      delete TableConfig.value.slots![column.slots[sn]]
    }
  }
  // 删除列配置
  columns.splice(index, 1);
  TableConfig.value.options.columns.value = JSON.stringify(columns);
  
};

// 编辑列
const handleColumnEdit = (index: number) => {
  ActiveColumnIndex.value = index;

  // ActiveColumn.value = column
  console.log("ActiveColumn", ActiveColumn);
  drawerActive.value = true;
};
// 取消编辑列
const handleColumnBack = () => {
  drawerActive.value = false;
};

// 更新列字段
const updateColumnParam = (fieldName: any, d: any) => {
  const columns: any = compileValue(TableConfig.value.options.columns);
  columns[ActiveColumnIndex.value][fieldName] = d;
  TableConfig.value.options.columns.value = JSON.stringify(columns);
};

// 列缓存
const ActiveColumn = computed(() => {
  return TableColumns.value[ActiveColumnIndex.value];
});

// 编辑列角标
const ActiveColumnIndex = ref<number>(-1);

// 列插槽

// 列排序 这里是错误的不能交换，要插入
const moveEnd = (p: any) => {
  console.log(p.oldIndex, p.newIndex);
  const columns: any = compileValue(TableConfig.value.options.columns);
  // c]插入到新角标
  // if (p.newIndex > p.oldIndex) {
  //   columns.splice(p.newIndex + 1, 0, columns[p.oldIndex])
  //   columns.splice(p.oldIndex, 1) //  + (p.oldIndex > p.newIndex)
  // } else {
  //   columns.splice(p.newIndex, 0, columns[p.oldIndex])
  //   columns.splice(p.oldIndex + 1, 1) //  + (p.oldIndex > p.newIndex)
  // }

  columns.splice(p.newIndex + (p.newIndex > p.oldIndex), 0, columns[p.oldIndex]);
  columns.splice(p.oldIndex + (p.newIndex < p.oldIndex), 1); //  + (p.oldIndex > p.newIndex)
  // const newColumn = columns[p.newIndex]
  // columns[p.newIndex] = columns[p.oldIndex]
  // columns[p.oldIndex] = newColumn
  // // columns[ActiveColumnIndex.value][fieldName] = d
  TableConfig.value.options.columns.value = JSON.stringify(columns);
};

// 列内容组件选取
const handleColumnContentSlot = (tagName: string, module: any) => {
  // ActiveColumn
  const defaultSlot = ActiveColumn.value.slots.default
  TableConfig.value.slots![defaultSlot] = [cloneDeep(module)]
}
// 列内容tagName
const ColumnContentTagName = computed(() => {
  return TableConfig.value.slots![ActiveColumn.value.slots.default][0].tagName
})
// 列内容config
const ColumnContentConfig = computed(() => {
  return TableConfig.value.slots![ActiveColumn.value.slots.default][0]
})

// 列编辑组件选取
const handleColumnEditSlot = (tagName: string, module: any) => {
  // ActiveColumn
  const editSlot = ActiveColumn.value.slots.edit
  TableConfig.value.slots![editSlot] = [cloneDeep(module)]
}// 列内容tagName
const ColumnEditTagName = computed(() => {
  return TableConfig.value.slots![ActiveColumn.value.slots.edit][0].tagName
})
const ColumnEditConfig = computed(() => {
  return TableConfig.value.slots![ActiveColumn.value.slots.edit][0]
})
</script>

<style lang="less">
.grid-columns {
  width: 100%;
}
.grid-column {
  margin: 5px 0;
  padding: 3px 8px;
  box-shadow: 1px 1px 2px 0px #ccc;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  > .extra {
    // display: flex;
    // align-items: center;
    visibility: hidden;
  }
  &:hover {
    > .extra {
      visibility: visible;
    }
  }
}
.grid-column-drawer {
  .n-drawer-header {
    > .n-drawer-header__main {
      width: 100%;
    }
  }
}
</style>
