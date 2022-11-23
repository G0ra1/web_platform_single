<template>
  <vxe-grid
    v-bind="gridOptions"
    style="width: 280px"
    ref="columnCtrl"
    class="mycolumnCtrl mytable-scrollbar"
    v-on="gridEvent"
  >
  </vxe-grid>
</template>
<script lang='jsx'>
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NModal,
  NButton,
  NSwitch,
  NSpace,
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NDropdown,
} from "naive-ui";
import { h, ref, reactive, defineComponent, nextTick, onUnmounted } from "vue";
import { NwIcon } from '@platform/main'
import { cloneDeep } from "lodash";
import Sortable from 'sortablejs'
import XEUtils from 'xe-utils'
export default defineComponent({
  props: {
    // 列
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
    NModal,
    NButton,
    NSwitch,
    NSpace,
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NDropdown,
    NwIcon,
  },
  setup(props, context) {
		const columnCtrl = ref(null)
    const columns = reactive([
      { width: 32,
        slots: { default: ({ row }) => {
            return (
                <NwIcon name="icon-ziduanshezhi-yidong" class="iconbtn drag-btn" size="18" />
            );
          }, 
        } 
      },
      { 
        field: "title",
        title: "标题",
      },
      {
        field: "",
        title: "",
        width: 32,
        align:"center",
        slots: {
          default: ({ row }) => {
						return (
              <NwIcon name={row._visible?"icon-yanjing-xianshi":"icon-yanjing-yincang"} onClick={()=>{row._visible=!row._visible;	context.emit("callback",'columnVisible',tableData.value)}} class="iconbtn" size="18" />
            );
          },
        },
      },
      {
        field: "",
        title: "",
        width: 32,
        align:"center",
        slots: {
          default: ({ row,rowIndex }) => {
            return (
                <NwIcon name="icon-zhiding" onClick={()=>{context.emit("callback",'fixedLeft',rowIndex)}} class="iconbtn" size="18" />
            );
          },
        },
      },
      {
        field: "",
        title: "",
        width: 32,
        align:"center",
        slots: {
          default: ({ row,rowIndex  }) => {
            return (
                <NwIcon name="icon-zhiding" onClick={()=>{context.emit("callback",'fixedRight',rowIndex)}} style="transform:rotate(180deg);" class="iconbtn" size="18" />
            );
          },
        },
      },
    ]);
    const tableData = ref(cloneDeep(props.data).filter((d) => !(d.type||d.title=="操作")).map((d,i)=>{d.id =i;d._visible=true ;return d }));
    console.log(tableData, "................");
    // 表格配置
    const gridOptions = reactive({
      rowId: "id",
      size: "mini",
      border: "none",
      resizable: true,
      height: "500",
      align: null,
      columns: columns,
      data: tableData,
      showHeader: false,
    });
    // 事件注册
    const gridEvent = reactive({
      pageChange: (...p) => {
        console.log("pageChange...", p);
      },
      radioChange: ({ row }) => {
        console.log("radioChange...", p);
        // 这里改为
        selected.value = [row];
      },
      checkboxChange: ({ row, checked }) => {
        if (checked) {
          selected.value.push(cloneDeep(row));
        } else {
          selected.value = selected.value.filter(
            (d) => d[props.rowKey] !== row[props.rowKey]
          );
          // selected.value.splice(selected.value.indexOf(row), 1)
        }
        console.log("checkboxChange...", cloneDeep(row), selected.value);
      },
    });
    // 表格重载
    const loadColumn = () => {
      gridComponent.value.loadColumn(gridOptions.columns);
    };
		// 拖动放置
    let sortable1

    const rowDrop = () => {
      const $table = columnCtrl.value
      if(!$table){
        setTimeout(() => {
          rowDrop()
        }, 1000)
        return 
      }
      sortable1 = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
        handle: '.drag-btn',
        onEnd: (sortableEvent) => {
          const newIndex = sortableEvent.newIndex
          const oldIndex = sortableEvent.oldIndex
          const currRow = tableData.value.splice(oldIndex, 1)[0]
          tableData.value.splice(newIndex, 0, currRow)
					context.emit("callback",'sort',tableData.value)
        }
      })
    }
    let initTime
    nextTick(() => {
      // 加载完成之后在绑定拖动事件
      initTime = setTimeout(() => {
        rowDrop()
      }, 1000)
    })
    onUnmounted(() => {
      clearTimeout(initTime)
      if (sortable1) {
        sortable1.destroy()
      }
    })
    //拖动功能
    return {
      tableData,
      columns,
      gridOptions,
      gridEvent,
      loadColumn,
			sortable1,
			columnCtrl,
			rowDrop
    };
  },
});
</script>
<style lang='less'>
.mycolumnCtrl {
  .iconbtn {
    cursor: pointer;
  }
  .iconbtn:hover {
    color: #3f8fff;
  }
  .drag-btn {
    cursor: move;
    font-size: 12px;
  }
  .sortable-tree-demo .vxe-body--row.sortable-ghost,
  .sortable-tree-demo .vxe-body--row.sortable-chosen {
    background-color: #dfecfb;
  }
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 18px;
  height: 18px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
.mytable {
  .vxe-table--render-default.size--mini {
    font-size: 14px;
  }
  .vxe-table--render-default.size--mini .vxe-body--column.col--ellipsis {
    height: 38px;
  }
  .vxe-table--render-default.size--small {
    font-size: 16px;
  }
  .vxe-table--render-default.size--small .vxe-body--column.col--ellipsis {
    height: 48px;
  }
  .vxe-table--render-default.size--medium {
    font-size: 18px;
  }
  .vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis {
    height: 58px;
  }
}
</style>