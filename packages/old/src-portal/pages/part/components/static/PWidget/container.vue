<template>
  <div :class="`p-widget-item ${props.size}`">
    <div class="p-widget-border">
      <div v-show="!props.isDrag" class="tools">
        <!-- 尺寸控制 -->
        <!-- <div class="set-size">
          <span :class="`size-btn ${props.size === 'large' ? 'selected' : ''}`" @click="() => setSize('large')">大</span>
          <span :class="`size-btn ${props.size === 'normal' ? 'selected' : ''}`" @click="() => setSize('normal')">中</span>
          <span :class="`size-btn ${props.size === 'small' ? 'selected' : ''}`" @click="() => setSize('small')">小</span>
        </div>
        <div title="删除" class="remove">
          <nw-icon name="icon-lajitong" :size="16" @click="remove" color="#CD4246" />
        </div> -->
        <!-- 这里改为点点点 -->
        <n-dropdown
          placement="bottom-end"
          trigger="click"
          size="small"
          :options="options"
          @select="selectMenu"
          :render-icon="renderIcon"
        >
          <div>
            <nw-icon name="icon-qita" :size="20" color="#CD4246" />
          </div>
        </n-dropdown>
      </div>
      <div :class="{
        mask: true, 
        active: props.isDrag
        
      }">
        <!-- 遮罩 用于触发拖拽 -->
        <div class="move-btn">
          <nw-icon name="icon-ziduanshezhi-yidong" :size="36" @click="remove" color="#CD4246" />
        </div>
      </div>
      <div class="content">
        <!-- 遮罩 用于触发拖拽 -->
        <iframe
          :src="props.url"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, onMounted } from "vue";
import { request, NwIcon } from "@platform/main";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NSpace,
  NGrid,
  NGridItem,
  NDropdown,
  useMessage,
} from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import cookies from "/@/utils/cookies.js";

export default defineComponent({
  props: {
    url: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "normal"
    },
    isDrag: {
      type: Boolean,
      default: false
    }
  },
  emits: ['remove'],
  components: {
    NSpace,
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NDropdown,
    NwIcon
  },
  setup(props, context) {
    return {
      props,
      options: [
        // {
        //   key: 'header',
        //   type: 'render',
        //   render: () => {
        //     return <div>Test</div>
        //   }
        // },
        {
          label: '大',
          key: 'large'
        },
        {
          label: '中',
          key: 'normal'
        },
        {
          label: '小',
          key: 'small'
        },
        {
          type: 'divider',
          key: 'd1'
        },
        {
          label: '删除',
          key: 'del'
        }
      ],
      setSize (size) {
        context.emit('update:size', size)
      },
      remove () {
        context.emit('remove')
      },
      renderIcon (d) {
        if (props.size === d.key) {
          return <NwIcon name="icon-n-y-check" size={16} color="#CD4246" />
        } else {
          return ''
        }
        
      },
      selectMenu (p) {
        if (p === 'del') {
          context.emit('remove')
        } else {
          context.emit('update:size', p)
        }
      }
    };
  },
});
</script>
<style lang="less" scoped>
.p-widget-item {
  float: left;
  // display: inline-block;
  padding: 5px;
  box-sizing: border-box;
  
  > .p-widget-border {
    position: relative;
    box-shadow: 2px 2px 5px 0px #ccc;
    // background: red;
    // border: 1px solid #ccc;
    // border-radius: 10px;
    height: 100%;
    >.tools {
      display: flex;
      height: 24px;
      padding: 0 5px;
      box-sizing: border-box;
      width: 100%;
      justify-content: end;
      align-items: center;
      // visibility: hidden;
      position: absolute;
      left: 0;
      top: 0;
      // background: #ffffff;
      // box-shadow: 2px 2px 5px 0px #ccc;
      >.set-size {
        >.size-btn {
          display: inline-block;
          // margin: 0 2px;
          // border: 1px solid #2D72D2;
          cursor: pointer;
          width: 18px;
          height: 18px;
          text-align: center;
          &.selected {
            background: #2D72D2;
            color: #fff;
            font-weight: bold;
            // border: 1px solid #000;
          }
        }
      }
      >.remove {
        display: flex;
        align-items: center;
      }
    }
    // &:hover {
    //   >.tools {
    //     visibility: visible;
    //   }
    // }
    >.mask {
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      // background: blue;
      &.active {
        display:flex;
      }
      background: #ffffff80;
      .move-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 2px 5px 0px #555;
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 25px;
        cursor: pointer;
      }
    }
    >.content {
      >iframe {
        display: block;
        border: none;
        width: 100%;
        height: 100%;
      }
    }
  }
  &.small {
    width: 50%;
    height: var(--widget-half-height);
  }
  &.normal {
    width: 50%;
    height: var(--widget-full-height);
  }
  &.large {
    width: 100%;
    height: var(--widget-full-height);
  }
}
</style>
