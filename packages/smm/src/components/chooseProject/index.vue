<template>
 <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 600px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-field" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        项目选择
       
      </div>
    </template>
  
   
    <div style="padding:10px;height: 500px">
        <vxe-grid
            class="nw-vxe-grid"
            ref="gridRef"
            v-bind="gridOption"
        />
    </div>
    

    <div style="text-align: right;padding: 10px">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
        @click="visible = false" >关闭</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSelect,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { format } from "date-fns";
import { request } from '@platform/main'
import { queryList } from './api/index'
export default defineComponent({
    components: {
        NLayout,
        NLayoutHeader,
        NLayoutSider,
        NLayoutContent,
        NLayoutFooter,
        NInputGroup,
        NInput,
        NSpin,
        NModal,
        NButton,
        NSelect,
        NwIcon,
    },
    props:{
        multiple: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: () => ([])
        }
    },
    emits: ["callback"],
    setup(props, context) {
        const gridRef = ref(null)
        const visible = ref(false)
        const gridOption = ref({
        rowId: 'id',
        rowKey: false,
        size: 'mini',
        height: 'auto',
        showOverflow: false,
        highlightHoverRow: true,
        // showHeader: false,
        border: true,
        tableMenu: {
            
        },
        pagerConfig: {
            pageSize: 20,
            pageSizes: [10, 20, 50]
        },
        proxyConfig: {
            props: {
            // list: 'list',
            total: 'total'
            },
            ajax: {
                query: ({ page }) => {
                    return queryList({
                        page:{
                            current: page.currentPage,
                            size: page.pageSize
                        }
                    }).then(async d => {
                        return ({
                            result: d.records,
                            total: d.total
                        })
                })},
            }
        },

        // data: gridData,
        columns: [
            {
                field: 'projectName',
                title: '项目名称',
            },
            {
            width: 65,
              slots: {
                default: ({ row }) => {
                let index = -1
                const us = props.value.find((d, i) => {
                    const f = d.projectCode === row.projectCode
                    if (f) index = i
                    return f
                })
                if (us) {
                    return [
                    <NButton
                        type="success"
                        size="small"
                        onClick={() => {
                            context.emit('callback', row.id,  row.projectName,row.projectCode, row)
                        }}
                    >{{
                        default: () => '已选择'
                    }}</NButton>
                    ]
                } else {
                    return [
                    <NButton
                        type="info"
                        size="small"
                        onClick={() => {
                            context.emit('callback',  row.id, row.projectName,row.projectCode, row)
                        }}
                    >{{
                        default: () => '选择'
                    }}</NButton>
                    ]
                }
                }
            }
            }
        ]
        })
        onMounted(() => {
           
        })

        return {
            gridRef,
            gridOption,
            visible,
            show (field) {
                visible.value = true

            }
        }
    }
})
</script>
<style lang="less" scoped>
#cnadarDayView {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    min-height: 870px;
    min-width: 600px;


    .header {
        height: 120px;
        box-sizing: border-box;
        padding: 0 80px;
        border-bottom: 3px solid #8f959e;
        display: flex;

        &-block {
            flex: 1;
            border: 1px solid #8f959e;

            p {
                margin: 0;
            }

            .days {
                display: flex;
                justify-content: space-between;
                border-bottom: #8f959e 1px solid;
                cursor: pointer;

                span {
                    flex: 1;
                    text-align: center;
                }
            }

            .daysActive {
                background-color: red;
                color: #fff;
            }

            .events {
                margin-top: 5px;
                padding-left: 15px;

                .circle {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: brown;
                    vertical-align: sub;
                    margin-right: 15px;
                }

                .e-contents {
                    display: inline-block;
                    height: 16px;

                }
            }


        }

    }

    .content {
        flex: 1;
        overflow: auto;
        box-sizing: border-box;
        border-bottom: 3px solid #8f959e;
        display: flex;
        padding: 0 80px 0 0;

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background-color: #99a9bf;
        }

        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            background-color: #d3dce6;
        }

        .time_c {
            width: 80px;
            display: flex;
            flex-direction: column;
            text-align: right;
            padding-top: 17.5px;
            border-right: 1px solid #ddd;
            padding-right: 5px;
            color: #8f959e;

            span {
                height: 35px;
                line-height: 35px;
            }
        }

        .column {
            flex: 1;
            position: relative;

            .cell {
                height: 35px;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;
            }

            .eventColumn {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                overflow: hidden;


                .eventItem {
                    flex: 1;
                    position: relative;
                    margin: 0 10px;
                    border-radius: 6px;
                    color: #fff;
                    padding: 12px;
                    font-size: 12px;
                    box-sizing: border-box;
                    transition: all 0.5s;
                }

                .eventItem:hover {
                    opacity: 0.8;
                    box-shadow: 3px 3px 10px 5px #eee;
                    cursor: pointer;
                }
            }
        }
    }

    .footer {
        display: flex;
        border-bottom: 3px solid #8f959e;
        height: 30px;
        line-height: 30px;
        padding: 0 80px;
        cursor: pointer;

        div {
            flex: 1;
            text-align: center;
        }

        div.active {
            background-color: red;
            color: #fff;
        }

    }

}
</style>