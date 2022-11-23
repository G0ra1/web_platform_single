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
  defineExpose,
  nextTick,
  defineEmits,
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
  },
  emits: ["update:value"],
  setup (props, context) {
    console.log('context', context)
    const VxeGrid: any = getCurrentInstance()!.appContext.components.VxeGrid

    const gridRef = ref<VxeGridInstance>()

    const gridOption = ref<VxeGridProps>({})

    watch(props, () => {
      // gridRef.value?.reloadData(props.value)
      refreshGrid()
    },
    {deep: true})
    // 
    const getColumn = () => {
      props.columns?.forEach((d: any) => {
        d.visible = props.dataPermits[d.field] !== 'hide'
        if (!d.editRender) d.editRender = { }
        // console.log('props.dataPermits', props.dataPermits)
        d.editRender.enabled = props.dataPermits[d.field] !== 'readonly'
      })
      return [
          ...props.columns as any,
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
                          props.value.splice(rowIndex, 1)
                          context.emit('update:value', props.value);
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
            size: "mini",
            showOverflow: false,
            highlightHoverRow: true,
            border: true,
            data: props.value, //computed<any>(() => props.value) as any,
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
                    onClick={() => {
                        context.emit('update:value', [ ...cloneDeep(props.value), cloneDeep(props.defaultValue) ]);
                        nextTick(() => {
                            $grid.reloadData(props.value);
                        })
                    }}
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
    return () => (<VxeGrid
        ref={(d: any) => gridRef.value = d}
        {
            ...gridOption.value
        }
    >
        {{
            ...useSlots()
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
</style>
