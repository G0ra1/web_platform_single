<template>
  <n-config-provider :theme-overrides="modeTheme">
    <!-- 新建页面 -->
    <n-modal v-model:show="createPageModalVisible" preset="dialog" style="width: 300px" >
      <template #icon >
        <nw-icon name="icon-page" />
      </template>
      <template #header>
        <div>新建页面</div>
      </template>
      <div>
        <n-form
          :model="pageModel"
          :rules="pageRules"
          ref="createPageFormRef"
          label-placement="left"
          :label-width="80"
          size="small"
          :style="{
            maxWidth: '240px'
          }"
        >
          <n-form-item label="文件名" path="key">
            <n-input
              size="small"
              placeholder="只能输入英文"
              v-model:value="pageModel.key" 
            />
          </n-form-item>
          <n-form-item label="页面类型" path="type">
            <n-select
              size="small"
              placeholder="Select"
              :options="[{
                value: 'layout',
                label: '框架'
              },{
                value: 'page',
                label: '页面'
              }]"
              v-model:value="pageModel.type"
            />
          </n-form-item>
          <n-form-item label=" " path="generateRoute">
            <n-checkbox v-model:checked="pageModel.generateRoute">是否自动生成路由<br>(文件名作为Path,添加到'/'下)</n-checkbox>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="info" @click="handleCreatePage" >保存</n-button>
          <n-button size="small" type="default" @click="createPageModalVisible = false" >取消</n-button>
        </div>
      </template>
    </n-modal>
    <!-- 新建页面 -->
  </n-config-provider>
</template>
<script lang="jsx">
  import { h, reactive, ref } from 'vue'
  import { NTree, NButton, NConfigProvider, NModal, NForm, NFormItem, NInput, NSelect, NCheckbox } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import modeTheme from './theme.js'
  import {
    website,
    openingPages,
    openPage,
    saveToWebSite,
    createPage,
    createRoute,
  } from '../../store'

  export default {
    props: {
    },
    components: {
      NTree,
      NButton,
      NwIcon,
      NConfigProvider,
      NModal,
      NInput,
      NSelect,
      NForm,
      NFormItem,
      NCheckbox
    },
    setup () {
      // 新建页面
      const createPageModalVisible = ref(false)
      const createPageFormRef = ref(null)
      const pageModel = reactive({
        type: 'page',
        generateRoute: true
      })
      const pageRules = {

      }
      const showCreatePageModal = () => {
        createPageModalVisible.value = true
      }
      const handleCreatePage = () => {
        // 创建页面代码
        const flag = createPage(pageModel.key, pageModel.type)
        if (!flag) {
          // 添加失败
          return
        }
        // 创建路由
        if (pageModel.generateRoute) {
          createRoute(pageModel.key, pageModel.key)
        }
      }
      //
      return {
        createPageModalVisible,
        createPageFormRef,
        pageRules,
        pageModel,
        showCreatePageModal,
        handleCreatePage,
        // ---重写主题
        modeTheme
    }
  }
</script>
<style lang='less'>

</style>