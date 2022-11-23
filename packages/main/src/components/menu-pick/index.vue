<template>

  <n-config-provider abstract  >
      <n-input :value="props.parentFullName" placeholder="请选择" disabled size="small" style="margin-right: 5px;" />
      <n-button type="info" size="small" @click="showMenuPick" >选择</n-button>
      <!-- 选择父级菜单-->
    <n-modal
        class="nw-modal"
        v-model:show="visible"
        preset="dialog"
        style="width: 400px;padding: 0"
        :show-icon="true"
        :mask-closable="true"
        :closable="true"
    >
        <template #icon>
        <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
        </template>
        <template #header>
            <div>
                选择父级菜单
            </div>
        </template>
        <!-- <div class="nw-modal-control">
        <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
        <n-button  size="small" >取消</n-button>
        </div> -->
        <!-- 菜单 -->

        <!-- 这里是内容选择 -->
        <n-spin :show="isLoading">
          <n-layout has-sider >
              <n-layout-content :native-scrollbar="false" style="height: 400px">
                  <vxe-grid
                      class="nw-vxe-grid-tree"
                      ref="gridRef"
                      v-bind="gridOption"
                      v-on="gridEvent"
                  />
              </n-layout-content>
          </n-layout>
        </n-spin>
        <div class="nw-modal-action">
       
        <n-button  size="small"
        @click="visible = false" >取消</n-button>
        </div>
    </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, computed, h } from 'vue'
import {
    NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NInputNumber,
  NSelect,
  NButton,
  NRadio,
  NRadioGroup,
  NSwitch,
  NSpin,
  NModal,
  NGrid,
  NForm,
  NFormItemGi,
  NFormItem,
} from 'naive-ui'
import * as d3 from 'd3'
import { NwIcon, NwDic, NwIconPick,  } from '@platform/main';
// import {
//   nodeList,
//   nodeAction,
//   visable,
//   loading,
//   selectUsers,
//   sendData,
//   sendHandleSubmit
// } from '../../../store/index'
import { query } from '../../pages/menu-manage/api/index.js'
export default {
  components: {
      NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NInputNumber,
    NSelect,
    NRadio,
    NRadioGroup,
    NSwitch,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NwIconPick,
    NGrid,
    NForm,
    NFormItemGi,
    NFormItem,
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    parentFullName: {
      type: String,
      default: ''
    },
    bizMenuCode: {
      type: String,
      default: ''
    },
  },
  setup(props, context){
    const visible = ref(false)
    const isLoading = ref(false)
    const gridRef = ref(null)
    
    const data = ref([])
    // 用户列表
    const gridOption = ref({
    //   height: '400px',
      rowId: 'key',
      rowKey: false,
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: false,
      cellCalssName: '',
      treeConfig: {
        // children: 'children',
        indent: 15,
        accordion: false, // 是否手风琴
        line: true, // 是否展示线
        expandAll: true, // 是否展开所有
        // expandRowKeys: ['/', '//src'],
        // lazy: true, // 是否懒加载
        children: 'kids',
        // hasChild: 'hasChild',
      },
    //   filterConfig: {
    //       filterMethod: () => {
    //           console.log('====过滤==')
    //           return 1
    //       }
    //   },
    rowStyle: {
      cursor: 'pointer'
    },
        // rowStyle: ({ row }) => {
        //     if ( row.data.openWay === '1') {
        //         return {}
        //     }
        //     // console.log('=======', row.descendants())
        //     return {
        //         display: 'none'
        //     }
        // },
      data: data,
      columns: [
        //   { field: 'menuName', title: '名称',showHeaderOverflow: true, width: 200, treeNode:true,
        {
          // field: 'menuName',
          treeNode: true,
          slots: {
            default: ({ row }) => {
                // 
                return [
                  <div
                  style="display:flex;justify-content: space-between;"
                  onClick={() => {
                    row.parentFullId = (!row.parentFullId  ? '0'  : row.parentFullId + '/' + row.id)
                    row.parentFullName = (!row.parentFullName  ? 'root'  : row.parentFullName + '/' + row.menuName)
                    context.emit('update:value', row.id)
                    context.emit('update:name', row.menuName)
                    context.emit('update:parentFullId',  row.parentFullId)
                    context.emit('update:parentFullName',row.parentFullName)
                    visible.value = false
                  }}
                  >
                    <span>{row.menuName}</span>
                  </div>
                ]
              
            }
          }
        }
      ]
    })
    const queryTree = () => {

    }
    return {
      props,
      isLoading,
      visible,
      gridRef,
      gridOption,
      showMenuPick () {
        visible.value = true
        isLoading.value = true
        query({includeSth:'1',bizMenuCode:props.bizMenuCode}).then(r => {
          
          data.value = [{
            id: '0',
            menuName: 'root',
            parentFullId:'',
            parentFullName:'',
            kids: r,
            level: 0
          }]
          // const root = d3.hierarchy(r);
          // // 设置根元素初始节点
          // root.x0 = 0;
          // root.y0 = 0;
          // // 遍历所有节点缓存一个children
          // root.descendants().forEach((d, i) => {
          //   d.id = i;
          //   d._children = d.children;
          //   // 这里隐藏了部分
          //   // if (d.depth && d.data.name.length !== 7) d.children = null;
          // });
          // console.log(r,'-==-=sda')
          nextTick().then(() => {
            gridRef.value.setAllTreeExpand(true)
          })
        }).finally(() => {
          isLoading.value = false
        })
      },
      gridEvent: {
        cellClick: ({ row }) => {
          // console.log('========row====', row)
          // context.emit('update:value', row.id)
          // context.emit('update:name', row.menuName)
          // visible.value = false
        },
      }
    }
  }
}
</script>

<style lang='less'>

.side-tree {
    &-header {
        display: flex;
        padding: 5px;
        font-size: 12px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
        justify-content: space-between;
        align-items: center;
    }
    &-content {

    }
}

.openways {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    padding: 40px 0;
    .openway {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 60px;
        cursor: pointer;
        &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            border-radius: 15px;
            text-align: center;
            border: 4px solid #dfdfdf;
        }
        &-text {
            padding-top: 5px;
            // height: 24px;
            text-align: center;
        }
    }
    .openway:hover {
        >.openway-icon {
            border: 4px solid #42bb32;
        }
    }
}
</style>