<template>
  <div class="dialog-items">
    <div>1</div>
    <div class="item left">
      <n-avatar class="avatar" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <div class="info">
        <div class="user">test</div>
        <div class="bubble">
          <div class="arrow"></div>
          <!-- <div class="title">标题</div> -->
          <div class="content">内容</div>
        </div>
      </div>
    </div>
    <div class="item right">
      <div class="info">
        <div class="user">test</div>
        <div class="bubble">
          <div class="arrow"></div>
          <!-- <div class="title">标题</div> -->
          <div class="content">内容11111111111111111111111111111111111111111111111111111111</div>
        </div>
      </div>
      <n-avatar class="avatar" size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      
    </div>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
  NCollapse,
  NCollapseItem,
  NAvatar
} from 'naive-ui'
import { NwIcon, NwDic, NwIconPick } from '@platform/main';

export default defineComponent({
  components: {
    NCollapse,
    NCollapseItem,
    NAvatar
  },
  // props: {
      
  // },

  setup (props,context) {

    
    // document.body.style.setProperty
  
    return {
    }
  }
})
</script>
<style lang="less">
  .dialog-items {
    height: 100%;
    padding: 0 15px;
    background: var(--light-gray5);
    >.item {
      padding-top: 25px;
    }
    >.left {
      display: flex;
      justify-content: start;
      >.avatar {
        margin: 10px 10px 10px 0;
      }
      >.info {
        position: relative;
        max-width: 60%;
        >.user {
          color: var(--gray3)
        }
        >.bubble {
          position: relative;
          padding: 5px 10px;
          box-shadow: 1px 1px 3px 0px var(--gray5);
          background: #fff;
          >.arrow {
            position: absolute;
            top: 5px;
            left: -10px;
            width: 0;
            height: 0;
            /* background: red; */
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 10px solid #fff;
            transform: rotate(270deg);
          }
          >.title {
            font-weight: bold;
            color: var(--gray1)
          }
          >.content {
            font-size: 14px;
            color: var(--gray1)
          }
        }
      }
    }
    
    >.right {
      display: flex;
      justify-content: end;
      >.avatar {
        margin: 10px 0 10px 10px;
      }
      >.info {
        position: relative;
        max-width: 60%;
        >.user {
          text-align: right;
          color: var(--gray3)
        }
        >.bubble {
          position: relative;
          padding: 5px 10px;
          box-shadow: 1px 1px 3px 0px var(--gray5);
          background: #95ec69;
          >.arrow {
            position: absolute;
            top: 5px;
            right: -10px;
            width: 0;
            height: 0;
            /* background: red; */
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 10px solid #95ec69;
            transform: rotate(90deg);
          }
          >.title {
            font-weight: bold;
            color: var(--gray1)
          }
          >.content {
            font-size: 14px;
            color: var(--gray1);
          }
        }
      }
    }
  }
</style>