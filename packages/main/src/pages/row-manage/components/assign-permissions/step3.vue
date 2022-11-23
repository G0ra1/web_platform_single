<template>
    <n-layout style="height: 100%;">
        <n-layout-header>
            <div class="step3-header">
                <div class="step3-header-title">
                    <template v-if="CurrentSys">
                        <nw-icon
                            
                            :size="24"
                            :name="CurrentSys.data.icon"
                            style="margin-right: 3px;"
                        />
                        {{CurrentSys ? CurrentSys.data.menuName : ''}}
                        <n-button
                        size="small"
                        type="primary"
                        style="margin-left: 5px;"
                        @click="setAllRoleToCurrentSys(true)"
                        >全选</n-button>
                        <n-button
                        size="small"
                        type="warning"
                        style="margin-left: 5px;"
                        @click="setAllRoleToCurrentSys(false)"
                        >清空</n-button>
                    </template>
                </div>
                <div class="step3-header-legend">
                    <div class="legend-item">
                      <nw-icon name="icon-y-caidan" :size="18" />
                        菜单
                    </div>
                    <div class="legend-item">
                        <nw-icon
                            :size="18"
                            name="icon-y-xinyemian"
                            style="margin-right: 5px;"
                        />
                        页面
                    </div>
                    <div class="legend-item">
                        <nw-icon
                            :size="18"
                            name="icon-y-anniu"
                            style="margin-right: 5px;"
                        />
                        普通按钮
                    </div>
                    <div class="legend-item">
                        <nw-icon
                            :size="18"
                            name="icon-y-liucheng"
                            style="margin-right: 5px;"
                        />
                        流程按钮
                    </div>
                </div>
            </div>
        </n-layout-header>
        <n-layout-content  :native-scrollbar="false" style="height: calc(100% - 34px)">
        <vxe-grid
            class="nw-vxe-grid"
            :ref="d => TreeTableRef = d"
            v-bind="gridOption"
        >
            <template
                #top
            >
            </template>
        </vxe-grid>
        </n-layout-content>
    </n-layout>
</template>
<script lang="jsx">
    import { NwIcon } from '@platform/main'
    import { ref, defineComponent, reactive } from 'vue'
    import {
        CurrentSys,
        TreeTableData,
        TreeTableColumns,
        TreeTableRef,
        setAllRoleToCurrentSys,
        fields
    } from '../store/AssignPermissions.jsx'
    import {
        NSpace,
        NConfigProvider,
        NLayout,
        NLayoutHeader,
        NLayoutSider,
        NLayoutContent,
        NLayoutFooter,
        NButton
    } from "naive-ui";
    import XEUtils from 'xe-utils'

    export default defineComponent({
        components: {
            NLayout,
            NLayoutHeader,
            NLayoutSider,
            NLayoutContent,
            NLayoutFooter,
            NwIcon,
            NButton
        },
        setup () {
            const spanMethod = ({
                rowIndex,
                columnIndex,
                visibleData
            }) => {
                 // if (!c.data._span) {  // 查看该对象是否计算过合并值
            //     span = c.data._span = c.leaves().length
            // }
                const cell = visibleData[rowIndex][columnIndex]
                 if (cell ) {
                    return { rowspan: cell.span, colspan: 1 }
                } else {
                    return { rowspan: 1, colspan: 1 }
                }
            }

            const gridOption = ref({
                rowId: 'id',
                rowKey: false,
                // height: 'auto',
                size: 'mini',
                showOverflow: false,
                highlightHoverRow: true,
                border: true,
                showHeader: false,
                 resizable: true,
                spanMethod,
                // 
                tableMenu: {
                    
                },
                // TreeTableData, //
                data: TreeTableData, // demo1.tableData, // nodeAction
                columns: TreeTableColumns,
                // columns: [
                //     {
                //         title: '功能模块',
                //         field: 'name1',
                //         width: 80
                //     },
                //     {
                //         title: '功能模块',
                //         field: 'name2',
                //         width: 80
                //     },
                //     {
                //         title: '功能模块',
                //         field: 'name3',
                //         width: 80
                //     },
                //     {
                //         title: '功能模块',
                //         field: 'name4',
                //         width: 80
                //     },
                // ]
            })
            return {
                CurrentSys,
                TreeTableRef,
                spanMethod,
                gridOption,
                fields,
                setAllRoleToCurrentSys
            }
        }
      
    })
    
</script>

<style lang="less" scoped>
.step3-header {
    display:flex;
    height: 32px;
    border: 1px solid #e8eaec;
    justify-content: space-between;
    align-items: center;
    &-title {
        display:flex;
        padding-left: 10px;
        font-size: 14px;
        font-weight: bold;
    align-items: center;
    }
    &-legend {
        
        display:flex;
        padding-left: 10px;
        font-size: 12px;

        .legend-item {
            
            display:flex;
            margin-right: 10px;
        }
    }
}
</style>
