<template>
  <n-card ref="cardRef" class="portal-panel p-widget" :bordered="false" title="" size="small">
    <!-- <n-grid :cols="2">
      <n-grid-item style="background: red;height: 300px;">
        1
      </n-grid-item>
      <n-grid-item style="background: green;height: 150px;">
        2
      </n-grid-item>
      <n-grid-item style="background: green;height: 150px;">
        2
      </n-grid-item>
    </n-grid> -->
      <!-- <container /> -->
      <div class="tools">
        <div class="save" title="保存">
          <nw-icon v-if="IsChange" class="save-dot" name="icon-n-n-warning" :size="10" color="#CD4246" />
          <nw-icon name="icon-save" :size="18" color="#C87619" style="margin-right: 5px;" @click="handleSaveWidget" />
        </div>
        <nw-icon :name="isDrag ? 'icon-n-y-ungrap' : 'icon-n-y-grap'" :size="18" color="#2D72D2" style="margin-right: 5px;" @click="isDrag = !isDrag" />
        <nw-icon name="icon-jia" :size="18" color="#2D72D2" @click="handleMarket" />
      </div>
      <n-spin :show="IsLoading" style="height: 100%;">
        <div ref="dragDomRef" class="p-widget-drag">
          <container
            v-for="item in ViewWidgetData"
            :key="item.id"
            :size="item.size"
            :url="item.url"
            :isDrag="isDrag"
            @update:size="d => item.size = d"
            @remove="handleRemoveWidget(item.id)"
          />
          <!-- <div class="p-widget-item normal" style="background: blue;">
          
          </div>
          <div class="p-widget-item small" style="background: green">
          
          </div>
          <div class="p-widget-item small" style="background: red;">
          
          </div>
          <div class="p-widget-item small" style="background: yellow;">
          
          </div>
          <div class="p-widget-item large" style="background: orange;">
          
          </div>
          <div class="p-widget-item normal" style="background: black;">
          
          </div> -->
        </div>
      </n-spin>
  </n-card>
  <market ref="MarketRef" :WidgetInst="WidgetInst" :parentDom="cardRef && cardRef.$el" />
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, onMounted, nextTick } from 'vue'
import { request, NwIcon } from '@platform/main'
import {
  NSpin,
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
  NBadge,
  useMessage
} from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import cookies from "/@/utils/cookies.js";
import Container from './container.vue'
import Sortable from 'sortablejs'
import Market from './market.vue'

import {
  // WidgetCardRef,
  // ViewWidgetData,
  // removeWidget,
  saveWidget,
  Widget
} from './store.js'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: 'widget-def'
    }
  },
  components: {
    NSpin,
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
    NBadge,
    Container,
    NwIcon,
    Market
  },
  setup(props) {
    // 拖拽容器
    const dragDomRef = ref(null)
    // 顶级容器
    const cardRef = ref(null)
    
    // 微件商城
    const MarketRef = ref(null)

    // 开启拖拽
    const isDrag = ref(false)

    const WidgetInst = new Widget(props.code)
    const {
      WidgetCardRef,
      ViewWidgetData,
      removeWidget,
      IsLoading,
      IsChange
    } = WidgetInst


    // 
    nextTick().then(() => {
      const sortable = Sortable.create(dragDomRef.value, 
        {
          animation: 300,
          handle: '.move-btn',
          onEnd: (sortableEvent) => {
            // console.log('-=old-=', JSON.stringify(ViewWidgetData.value))
            const newIndex = sortableEvent.newIndex
            const oldIndex = sortableEvent.oldIndex
            const currRow = ViewWidgetData.value.splice(oldIndex, 1)[0]
            ViewWidgetData.value.splice(newIndex, 0, currRow)
            // console.log('-=new-=', JSON.stringify(ViewWidgetData.value))
            IsChange.value = true
          }
        }
      )
      console.log('=====cardRef=====', cardRef)
    })
    return {
      IsLoading,
      IsChange,
      isDrag,
      props,
      WidgetInst,
      ViewWidgetData,
      MarketRef,
      dragDomRef,
      cardRef,
      handleMarket () {
        MarketRef.value.show()
      },
      handleRemoveWidget (d) {
        WidgetInst.removeWidget(d)
      },
      handleSaveWidget () {
        IsLoading.value = true
        saveWidget({
          partCode: props.code,
          widgetContent: JSON.stringify(ViewWidgetData.value)
        }).then(res => {
          console.log('res', res)
          IsChange.value = false
        }).finally(r => {
          IsLoading.value = false
        })
      }
    }
  }
})
</script>
<style lang='less'>

.p-widget.n-card {
  > .n-card__content {
  }
  .tools {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 4px;
    top: 4px;
    >.save {
      position: relative;
      >.save-dot {
        position: absolute;
        left: -5px;
        top: -3px;
      }
    }
    .icon {
      cursor: pointer;
    }
  }
}
.p-widget-drag {
  display: block;
  width: 100%;
  // display: flex;
  // flex-direction: row;
  --widget-full-height: 300px;
  --widget-half-height: 150px;
}
</style>