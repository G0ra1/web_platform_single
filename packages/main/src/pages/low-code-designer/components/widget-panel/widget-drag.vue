<template>
  <draggable
    class="widget-group"
    tag="div"
    :list="props.value"
    item-key="key"
    :group="{ name: 'dragGroup', pull: 'clone', put: false }"
    :clone="handleWidgetClone"
    ghost-class="ghost"
    :sort="false"
    :move="checkMove"
    @end="() => {}"
  >
    <template #item="{ element: ctn }">
      <div class="widget-item">
        <NwIcon :name="ctn.icon" :size="26" />
        <div class="text">{{ ctn.label }}</div>
      </div>
    </template>
  </draggable>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import { NScrollbar, useMessage } from "naive-ui";
import { NwIcon, RequestPaging, VxeHelper, request, NwTable } from "@platform/main";
import { cloneDeep } from "lodash";
import type { WidgetNS } from "../../model/widget.d";
export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    NScrollbar,
    NwIcon,
  },
  setup(props, context) {
    const recursion = (d: WidgetNS.Config) => {
      // 赋值key
      d.key = `${d.key}_${new Date().getTime().toString(36)}X${Math.floor(
        Math.random() * 10000
      ).toString(36)}`;
      if (d.slots) {
        Object.values(d.slots).forEach((d) => {
          d.forEach((n) => {
            recursion(n);
          });
        });
      }
    };
    return {
      props,
      handleWidgetClone(p: WidgetNS.Config) {
        console.log('======handleWidgetClone====', p)
        // 这里检测数据

        // 这里克隆数据
        const newWidget:WidgetNS.Config = cloneDeep(p);

        let GridWidget: WidgetNS.Config
        if (['field', 'data'].includes(newWidget.category!)) {
          GridWidget = {
            key: "n-grid",
            type: "n-grid",
            tagName: "n-grid",
            category: "field",
            icon: "icon-n-y-grid",
            label: "栅格",
            internal: true,
            slots: {
              default: [
                {
                  key: 'n-gi',
                  type: 'n-gi',
                  tagName: 'n-gi',
                  category: 'container',
                  icon: 'icon-n-y-grid',
                  label: '栅格列',
                  internal: true,
                  slots: {
                      default: [
                        {
                          key: "n-form-item_1x",
                          type: "n-form-item",
                          tagName: "n-form-item",
                          category: "container",
                          icon: "icon-n-y-form",
                          label: "表单字段",
                          internal: true,
                          slots: {
                            default: [
                              newWidget
                            ],
                          },
                          options: {
                            label: {
                              type: "string",
                              value: "字段",
                            },
                            path: {
                              type: "string",
                              value: "field",
                            },
                          },
                        }
                      ]
                  },
                  options: {
                    span: {
                      type: "number",
                      value: 24,
                    },
                  }
                }
              ],
            },
            options: {
              cols: {
                type: "number",
                value: 24,
              },
              layoutShiftDisabled: {
                type: "boolean",
                value: false,
              },
              xGap: {
                type: "number",
                value: 0,
              },
              yGap: {
                type: "number",
                value: 0,
              },
            },
          };
          
        } else {
          GridWidget = newWidget
        }
        // 判断类型是否套用grid

        // 这里可加入grid包裹
        recursion(GridWidget);
        // newWidget.key = `${newWidget.key}_${new Date().getTime()}X${Math.floor(Math.random()*10000)}`
        // console.log('handleWidgetClone===', newWidget)
        // 这里递归生成key

        return GridWidget;
      },
      checkMove(p: any) {
        console.log("checkMove==", p);
      },
    };
  },
});
</script>

<style lang="less" scoped>
.widget-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  > .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    flex: 0 1 32px;
    align-items: center;
    > .title {
      font-size: 14px;
      font-weight: bold;
      text-indent: 10px;
    }
  }

  > .content {
    flex: 1;
    .widget-group {
      display: flex;
      padding: 0 6px;
      flex-wrap: wrap;
    }
  }
}
.widget-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 60px;
  cursor: pointer;
  margin-top: 10px;
  // background-color: red;
  > .text {
  }
  &:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
</style>
