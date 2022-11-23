<template>
  <n-config-provider abstract :theme-overrides="toThemeJson(props.theme)">
    <div class="theme-item">
      <div class="theme-item-demo">
        <div class="card1">
          <n-card class="portal-panel" :bordered="false" size="small">
              <template #header>
                标题
              </template>
              <n-list class="portal-panel-list">
                <n-list-item >
                  <div class="portal-panel-list-header">
                    <a class="portal-panel-list-title">内容......</a>
                    <div class="portal-panel-list-date">mm-dd</div>
                  </div>
                </n-list-item>
              </n-list>
            </n-card>
        </div>
        <div class="card2">
          <n-card class="portal-panel" :bordered="false" size="small">
              <template #header>
                标题
              </template>
              <n-list class="portal-panel-list">
                <n-list-item >
                  <div class="portal-panel-list-header">
                    <a class="portal-panel-list-title">内容......</a>
                    <div class="portal-panel-list-date">mm-dd</div>
                  </div>
                </n-list-item>
              </n-list>
            </n-card>
        </div>
        <div v-if="props.isUse" class="use-theme">
          <nw-icon 
            class="control-btn"
            name="icon-duigou"
            :size="32"
            color="#4caf50"
          />
        </div>
        <div class="control control-nhover">
          <nw-icon 
            class="control-btn"
            name="icon-cuowu"
            :size="32"
            color="#f44336"
            title="删除"
            @click="handleDel"
          />
          <nw-icon
            class="control-btn"
            name="icon-bianji4"
            :size="32"
            title="编辑"
            @click="handleEdit"
            color="#ff9800"
          />
          <nw-icon
            v-if="!props.isUse"
            class="control-btn"
            name="icon-yunxing2"
            :size="32"
            title="设定主题"
            @click="handleUse"
            color="#2196f3"
          />
        </div>
      </div>
      <div class="theme-item-title">
        {{ props.title || '&nbsp;' }}
      </div>
    </div>
  </n-config-provider>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NCard,
  NList,
  NListItem,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
  useDialog
} from "naive-ui";
import { edit, del, switchTheme } from "./api";
import Form from "./form.vue";
import NwIcon from '/@/components/nw-icon/index.vue'
import { defThemeJson, themeParamList } from './store.js'

export default defineComponent({
  emits: ['deleted', 'edit', 'switchTheme'],
  props: {
    id: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    theme: {
      default: '{}',
      type: String,
    },
    isUse: {
      default: 0,
      type: Number,
    }
  },
  components: {
    NConfigProvider,
    Form,
    NDrawer,
    NDrawerContent,
    NCard,
    NList,
    NListItem,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwIcon,
  },
  setup(props, context) {
    const message = useMessage()
    const dialog = useDialog()
    // const themeJson = reactive(defThemeJson)
    const themeJson = ref(JSON.parse(props.theme))
    const title = ref(props.title)
    const isUse = ref(props.isUse)
    return {
      props,
      toThemeJson (theme) {
        return JSON.parse(theme)
      },
      handleEdit () {
        context.emit('edit')
      },
      handleUse () {
        const d = dialog.warning({
          title: '变更主题',
          content: `是否将门户主题切换为‘ ${props.title} ’`,
          positiveText: '确认',
          onPositiveClick: () => {
            d.loading = true
            return switchTheme(props.id).then(res => {
              if (res) {
                message.success('切换主题成功')
                context.emit('switchTheme')
              }
            })
          }
        })
      },
      handleDel () {
        const d = dialog.warning({
          title: '删除提示',
          content: `是否删除该门户主题 ${props.title}`,
          positiveText: '确认',
          onPositiveClick: () => {
            d.loading = true
            return del(props.id).then(res => {
              if (res) {
                message.success('删除成功')
                context.emit('deleted')
              }
            })
          }
        })
      }
    };
  }
});
</script>