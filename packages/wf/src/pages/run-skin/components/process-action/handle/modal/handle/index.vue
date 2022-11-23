<template>
  <div class="wrapper">
    <div class="handle" style="">
      <div class="sider">
        <div class="card">
          <div class="header">目标节点</div>
          <div class="content">
            <div
            v-for="item in NodeList"
            :key="item.nextCamundaNodeId"
            :class="{
              'node-item': true,
              'active': item === ActiveNode
            }"
            @click="() => handleNode(item)"
            >
              <div class="node-item-label">
                <span :class="item.nodeType.icon"></span>
                <label>{{item.nextCamundaNodeName}}</label>
              </div>
              <nw-icon name="icon-n-n-yes" :size="24" color="green" />
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="card" style="height: 100%;">
          <div class="header">提交办理人</div>
          <div class="content">
            <vxe-grid
              v-bind="bind"
              ref="GridRef"
            >
            </vxe-grid>
          </div>
        </div>
      </div>
    </div>
    <div class="opinion">
      <div style="padding: 5px;">
        <n-input v-model:value="OpinionText" type="textarea" placeholder="输入意见" />
      </div>
    </div>
  </div>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSpace,
  NCheckbox,
  NRadioGroup,
  NRadio,
  NDivider,
  NDrawer,
} from "naive-ui";
import {
  NwIcon,
  request
} from "@platform/main";
import { NodeList, ActiveNode, OpinionText } from '../../store'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSpace,
    NCheckbox,
    NRadioGroup,
    NRadio,
    NDivider,
    NDrawer
  },
  props: {},
  emits: ["callback"],
  setup(props: any, context: any) {
    const GridRef = ref<any>(null)
    const visible = ref<boolean>(false);
    return {
      OpinionText,
      GridRef,
      ActiveNode,
      NodeList,
      visible,
      show() {
        visible.value = true;
      },
      bind: {
        rowId: 'id',
        size: 'mini',
        border: false,
        resizable: true,
        height: '264px',
        align: null,
        data: ActiveNode.value!.userList,
        columns: [
          {
            field: 'userNameCh',
            title: '用户名'
          },
          {
            field: 'parentOrgName',
            title: '机构'
          },
          {
            field: 'parentDeptName',
            title: '部门'
          },
          {
            title: '操作',
            showHeaderOverflow: true,
            width: '70px',
            slots: {
              default: ({row}: any) => {
                
                return [
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    type={row._isSelect ? 'success' : 'primary'}
                    onClick={() => {
                      row._isSelect = !row._isSelect
                    }}
                  >{{
                    default: () => row._isSelect ? '已选择' : '选择'
                  }}</NButton>
                ];
              },
            }
          }
        ]
      },
      handleNode (node: any) {
        ActiveNode.value = node
        GridRef.value!.reloadData(ActiveNode.value.userList)
      }
    };
  },
};
</script>

<style scoped lang="less">

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .handle {
    flex: 0 0 250px;
    display: flex;
    border-bottom: 1px solid #ccc;
    >.sider {
      flex: 0 0 250px;
      border-right: 1px solid #ccc;
    }
    >.container {
      display: block;
      flex: 1;
    }
  }
  .opinion {
    flex: 1;
  }
}
.card {
  .header {
    display: flex;
    align-items: center;
    height: 26px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    text-indent: 5px;
    line-height: 14px;
  }
  .content {
    .node-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 10px;
      padding: 0 10px;
      cursor: pointer;
      &-label {
        display: flex;
        align-items: center;
        >span {
          font-size: 28px;
          margin-right: 5px;
        }
        font-size: 14px;
      }
      .icon {
        visibility: hidden;
      }

      &.active {
        box-shadow: -2px 2px 5px 0px #ccc;
        .node-item-label {
        }
        .icon {
          visibility: visible;
        }
      }
    }
  }
}
</style>
