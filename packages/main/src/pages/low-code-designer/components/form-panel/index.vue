<template>
  <div class="form-panel" >
    <div class="header">
      
    </div>
    <div class="content"
      
    >
      <n-scrollbar class="page" @click="handleForm">
        <div style="padding: 0 12px">
          <!-- 这里直接写入n-form 根 -->
          <n-form
            :label-width="RootOptions.labelWidth"
            :size="RootOptions.size"
            :label-placement="RootOptions.labelPlacement"
            :label-align="RootOptions.labelAlgin"
          >
            <template v-if="RootInternalOptions.isTabs">
              <n-tabs type="line" animated>
                <n-tab-pane v-for="pane in TabsSlots.default" :key="pane.options.name" :name="pane.options.name" :tab="pane.options.tab">
                  <!-- <n-card
                    size="small"
                    title="卡片分段示例"
                    :segmented="{
                      content: true
                    }"
                  >
                    <n-grid :cols="4" :x-gap="24">
                      <n-form-item-gi :span="2" label="姓名" path="user.name">
                        <n-input placeholder="输入姓名" />
                      </n-form-item-gi>
                      <n-gi :cols="4" >
                        123
                      </n-gi>
                      <n-form-item-gi :span="2" label="年龄" path="user.age">
                        <n-input placeholder="输入年龄" />
                      </n-form-item-gi>
                      <n-form-item-gi :span="2" label="电话号码" path="phone">
                        <n-input placeholder="电话号码" />
                      </n-form-item-gi>
                      <n-form-item-gi :span="2" label="电话号码" path="phone">
                        <n-input placeholder="电话号码" />
                      </n-form-item-gi>
                      <n-form-item-gi :span="2" label="电话号码" path="phone">
                        <n-input placeholder="电话号码" />
                      </n-form-item-gi>
                      <n-form-item-gi :span="2" label="电话号码" path="phone">
                        <n-input placeholder="电话号码" />
                      </n-form-item-gi>
                    </n-grid>
                  </n-card> -->
                  <!-- 这里加入拖拽 -->
                  <draggable
                      class="widget-group"
                      tag="div"
                      :list="pane.slots.default"
                      item-key="key"
                      :group="{name: 'dragGroup', put: false}"
                      ghost-class="ghost"
                      :sort="true"
                      :move="() => {}"
                      @end="() => {}"
                  
                  >
                      <template #item="{ element: item }">
                          <div class="widget-item">
                            <n-grid v-bind="item.options">
                              <template v-for="gi, key in item.slots.default" :key="gi.key">
                                <n-gi :span="gi.options.span">
                                  <!-- 最小单元控制 -->
                                  <div class="form-item" @click="handleField">
                                    <template v-if="gi.slots.default[0].tagName === 'n-form-item'">
                                      <n-form-item
                                        :label="gi.slots.default[0].options.label"
                                        :path="gi.slots.default[0].options.path"
                                      >
                                        <component :is="gi.slots.default[0].slots.default[0].tagName"  >
                                        </component>
                                      </n-form-item>
                                    </template>
                                    <template v-else>
                                      <component :is="`${item.tagName}`"  >
                                      </component>
                                    </template>
                                  </div>
                                </n-gi>
                              </template>

                            </n-grid>
                            
                          </div>
                      </template>
                  </draggable>
                  <!-- <template v-for="item in pane.slots.default" :key="item.key">
                    <n-grid :cols="item.options.cols">
                      <template v-for="gi in item.slots.default" :key="gi.key">
                        <n-gi :span="gi.options.span">
                          <div style="outline: 1px solid #ccc">
                            <template v-if="gi.slots.default[0].tagName === 'n-form-item'">
                            
                            </template>
                            <template v-else>
                              <component :is="`${item.tagName}`"  >
                              </component>
                            </template>
                          </div>
                        </n-gi>
                      </template>

                    </n-grid>
                  </template> -->
                  <!-- <n-grid :cols="4" :x-gap="24">
                    <n-form-item-gi :span="2" label="姓名" path="user.name">
                      <n-input placeholder="输入姓名" />
                    </n-form-item-gi>
                    <n-gi :cols="4" >
                      123
                    </n-gi>
                    <n-form-item-gi :span="2" label="年龄" path="user.age">
                      <n-input placeholder="输入年龄" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="2" label="电话号码" path="phone">
                      <n-input placeholder="电话号码" />
                    </n-form-item-gi>
                  </n-grid> -->
                </n-tab-pane>
              </n-tabs>
            </template>
            <template v-else>
              <n-grid :cols="4" :x-gap="24">
                <n-form-item-gi :span="2" label="姓名" path="user.name">
                  <n-input placeholder="输入姓名" />
                </n-form-item-gi>
                <n-gi :cols="4" >
                  123
                </n-gi>
                <n-form-item-gi :span="2" label="年龄" path="user.age">
                  <n-input placeholder="输入年龄" />
                </n-form-item-gi>
                <n-form-item-gi :span="2" label="电话号码" path="phone">
                  <n-input placeholder="电话号码" />
                </n-form-item-gi>
              </n-grid>
              <n-grid :cols="4" :x-gap="24">
                <n-form-item-gi :span="2" label="姓名1" path="user.name">
                  <n-input placeholder="输入姓名" />
                </n-form-item-gi>
                <n-form-item-gi :span="2" label="年龄1" path="user.age">
                  <n-input placeholder="输入年龄" />
                </n-form-item-gi>
                <n-form-item-gi :span="2" label="电话号码1" path="phone">
                  <n-input placeholder="电话号码" />
                </n-form-item-gi>
              </n-grid>
            </template>
            
           
          </n-form>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, provide } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import {
  NwIcon, RequestPaging, VxeHelper, request,
} from '@platform/main'

import { designer } from '../../store/index'
import { compileConfig } from '../../utils/index'

export default defineComponent({
  components: {
    NwIcon
  },
  setup(props, context) {
    const {
      SourceWidget,
      RootWidget,
      handleActiveWidget,
      ActiveWidget
    } = designer
    const {
      config: RootConfig,
      internalOptions: RootInternalOptions,
      options: RootOptions,
      slots: RootSlots,
      isActive: RootIsActive
    } = RootWidget
    
    let setup = {
      ActiveWidget,
      RootIsActive,
      RootOptions,
      RootInternalOptions,
      test () {
        RootConfig.value.options.size.value = 'large'
      },
      handleForm () {
        handleActiveWidget(RootWidget)
      },
      handleField () {

      }
    }
    // 这里根据isTabs判断
    if (RootInternalOptions.value.isTabs) {
      // 页签模式
      const {
        config: TabsConfig,
        internalOptions: TabsInternalOptions,
        options: TabsOptions,
        slots: TabsSlots
      } = RootSlots.default.value[0]
      console.log('===', TabsSlots)
      setup = {
        ...setup,
        TabsConfig,
        TabsInternalOptions,
        TabsOptions,
        TabsSlots,
      }
    } else {
      // 没有页签的情况

      setup = {
        ...setup,
        slotDefault: RootSlots.default,
      }
    }

    return setup
  }
})

</script>

<style  lang='less'>

.form-panel {
  
  box-sizing: border-box;
  height: 100%;
  >.header {
    height: 32px;
    box-sizing: border-box;
    border-bottom: var(--border);
  }
  >.content {
    height: calc(~'100% - 32px');
    padding: 20px;
    box-sizing: border-box;
    background: var(--light-gray5);
    >.page {
      height: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 6px rgba(0,0,0,.3);
      box-sizing: border-box;
      // background: #fff;
      // background-image: linear-gradient(90deg, rgba(60, 10, 30, .08) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .08) 3%, transparent 0);
      // background-size: 20px 20px;
      // background-position: 40%;
      background-repeat: repeat;
      background-color: #fff;
      // padding: 10px;
    }
  }
}
.form-item {
  padding: 5px;
  cursor: move;
  >div {
    pointer-events: none;
  }
  &:hover {
    background: #f4f4f4;
    border-radius: 4px;
  }
}
</style>
