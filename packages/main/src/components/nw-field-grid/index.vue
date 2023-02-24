<script lang="tsx">
import {
  NButton,
  NModal,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInputGroup,
  NInput,
} from "naive-ui";
import {
  h,
  ref,
  reactive,
  computed,
  defineComponent,
  watch,
  nextTick,
  renderSlot,
  useSlots,
  getCurrentInstance,
} from "vue";
import {
  NwIcon,
  RequestPaging,
  VxeHelper,
  request,
  NwAppTreeGrid,
  Page,
} from "@platform/main";
import type { VxeGridInstance, VxeGridProps, VxeGridPropTypes, VxeTablePropTypes } from 'vxe-table'
import { cloneDeep } from "lodash";
export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    isReadonly: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    dataPermits: {
      type: Object,
      default: () => ({})
    },
    columns: Array,
    defaultValue: {
      type: Object,
      default: () => ({})
    },
    editEnabled: {
      type: Boolean,
      default: true
    },
    searchOptions: {
      type: Object,
      default: () => ({})
    },
    defaultAddBtnOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:value", 'checkboxChange'],
  setup(props, context) {
    // 查询
    const searchFun = (searchStr: string | number , fieldStr: string | number , c: boolean) => {
      if (c) {
        return `${fieldStr}`.indexOf(`${searchStr}`) >= 0
      } else {
        return searchStr === fieldStr
      }
    }
    const mergeSearchFn = (field: any) => {
      if (!Object.entries(SearchForm.value).length) {
        return 1
      }
      return Object.entries(SearchForm.value).every(([k, v]: any) => {
        if (!v) {
          return 1
        } else {
          return searchFun(v, field[k], !!props.searchOptions[k])
        }
      })
    }
    const SearchForm = ref<any>({})

    // console.log('context', context)
    const VxeGrid: any = getCurrentInstance()!.appContext.components.VxeGrid

    const gridRef = ref<VxeGridInstance>()

    const gridOption = ref<VxeGridProps>({})

    watch(props, () => {
      // gridRef.value?.reloadData(props.value)
      refreshGrid()
    },
      { deep: true })
    // 
    const getColumn = () => {
      props.columns?.forEach((d: any) => {
        d.visible = props.dataPermits[d.field] !== 'hide'
        if (d.editRender?.enabled !== undefined) return
        if (!d.editRender) d.editRender = {}
        // console.log('props.dataPermits', props.dataPermits)
        d.editRender.enabled = props.dataPermits[d.field] !== 'readonly'
      })
      return [
        ...(props.columns || []) as any,
        {
          visible: !props.isReadonly,
          title: "操作",
          width: 70,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <NButton
                  size="small"
                  type="error"
                  text
                  onClick={() => {
                    const deleteed = props.value.splice(rowIndex, 1)
                    context.emit('update:value', props.value, deleteed);
                    $table.reloadData(props.value);
                  }}
                >
                  {{
                    default: () => "删除",
                  }}
                </NButton>,
              ];
            },
          }
        },
      ]
    }
    const checkboxChangeEvent = (e: any) => {
      context.emit('checkboxChange', e)
    }

    const validRules = ref<VxeTablePropTypes.EditRules>({
      detailName: [
        { required: true, message: 'app.body.valid.rName' },
      ],
      detailType: [
        { required: true, message: 'app.body.valid.rName' },
      ],
    })
    // 刷新表格整体
    const refreshGrid = () => {

      gridOption.value = {
        rowKey: false,
        keepSource: false,
        // height: '500px',
        size: "small",
        showOverflow: false,
        highlightHoverRow: true,
        border: true,
        // data: props.value, //computed<any>(() => props.value) as any, 这里加入分页
        data: computed<any>(() => {
          if (props.value) {
            return props.value.filter(d => {
              return mergeSearchFn(d)
            })
          } else {
            return []
          }
        }) as any,
        columns: getColumn(),
        editConfig: {
          enabled: props.editEnabled,
          trigger: "click",
          mode: "row",
          showStatus: true,
          autoClear: false,
        },
        editRules: props.rules,//validRules.value,
        toolbarConfig: {
          enabled: !props.isReadonly, // 控制新增  
          slots: {
            buttons: context.slots.buttons ? 'buttons' : ({ $grid }: any) => {
              return [
                <NButton
                  type="primary"
                  class="pickAnyC"
                  onClick={() => {
                    context.emit('update:value', [...cloneDeep(props.value), cloneDeep(props.defaultValue)]);
                    nextTick(() => {
                      $grid.reloadData(props.value);
                    })
                  }}
                  {...props.defaultAddBtnOptions}
                >
                  {{
                    default: () => "新增",
                  }}
                </NButton>,
              ];
            },
            // buttons: ({ $grid }: any) => {
            // return [
            //     <NButton
            //     type="primary"
            //     onClick={() => {
            //         context.emit('update:value', [ ...cloneDeep(props.value), cloneDeep(props.defaultValue) ]);
            //         nextTick(() => {
            //             $grid.reloadData(props.value);
            //         })
            //     }}
            //     >
            //     {{
            //         default: () => "新增",
            //     }}
            //     </NButton>,
            // ];
            // },
          },
        },
      }
    }
    refreshGrid()
    // fullValidate
    context.expose({
      validate: async () => {
        return await gridRef.value!.validate(true).then((res) => {

          if (!res) {
            return res
          } else {
            // console.log('===res=fullValidate=', Object.values(res)[0][0].rule.content)
            return Object.values(res)[0][0].rule.content
          }
        })

      }
    })
    const search: any = {}
    if (context.slots.search) {
      search.top = () => {
          return <div style="padding: 5px;display:flex;justify-content: space-between;">
            <div>
              {{
                default: () => {
                  return context.slots.search!(SearchForm)
                }
              }}
            </div>
            <div>
            <NButton
              size="small"
              onClick={() => {
                SearchForm.value = {}
              }}
            >重置</NButton>
            
            </div>
          </div>
        }
    }
    // 这里判断
    return () => (<VxeGrid
      class="field-grid"
      ref={(d: any) => gridRef.value = d}
      {
      ...gridOption.value
      }
      onCheckboxChange={checkboxChangeEvent}
      onCheckboxAll={checkboxChangeEvent}
    >
      {{
        ...useSlots(),
        ...search
      }}
    </VxeGrid>)
  }
})
</script>

<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.vxe-grid.field-grid {
  >.vxe-grid--toolbar-wrapper {
    >.vxe-toolbar.size--mini {
      padding: 5px 0;
      height: auto;
    }
  }

  >.vxe-grid--pager-wrapper {
    >.vxe-pager.size--mini {
      height: 22px;
    }
  }

  .vxe-table--render-default .vxe-body--column {
    line-height: 22px;
    font-size: 14px;
  }

  .vxe-table--render-default .vxe-header--column {
    line-height: 22px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.64);
    font-weight: 500;

  }

  .vxe-table--render-default .vxe-table--header {
    height: 22px;
  }
}
</style>
