<template>
  <n-config-provider :theme-overrides="modeTheme">
    <!-- 新建页面 -->
    <n-modal v-model:show="modalVisible.createPage" preset="dialog" style="width: 300px" >
      <template #icon >
        <nw-icon name="icon-page" />
      </template>
      <template #header>
        <div>新建页面</div>
      </template>
      <div>
        <n-form
          :model="createPageModel"
          :rules="createPageRules"
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
              v-model:value="createPageModel.key" 
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
              v-model:value="createPageModel.type"
            />
          </n-form-item>
          <n-form-item label=" " path="generateRoute">
            <n-checkbox v-model:checked="createPageModel.generateRoute">是否自动生成路由<br>(文件名作为Path,添加到'/'下)</n-checkbox>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="info" @click="handleCreatePage" >确定</n-button>
          <n-button size="small" type="default" @click="modalVisible.createPage = false" >取消</n-button>
        </div>
      </template>
    </n-modal>
    <!-- 模板名和所属门户信息模态 -->
    <n-modal v-model:show="modalVisible.templateBasic" preset="dialog" style="width: 350px" >
      <template #icon >
        <nw-icon name="icon-moban" />
      </template>
      <template #header>
        <div>基本信息设置</div>
      </template>
      <div>
        <n-form
          :model="templateBasicModel"
          :rules="templateBasicRules"
          ref="templateBasicFormRef"
          label-placement="left"
          :label-width="80"
          size="small"
          :style="{
            maxWidth: '240px'
          }"
        >
          <n-form-item label="模板名称" path="templateName">
            <n-input
              :disabled="editorAction !== 'create' && editorAction !== 'edit'"
              size="small"
              placeholder="输入模板名称"
              v-model:value="templateBasicModel.templateName" 
              style="width: 230px"
            />
          </n-form-item>
          <n-form-item label="模板编码" path="templateCode">
            <n-input
              :disabled="editorAction !== 'create' && editorAction !== 'edit'"
              size="small"
              placeholder="输入模板编码"
              v-model:value="templateBasicModel.templateCode" 
              style="width: 230px"
            />
          </n-form-item>
          <n-form-item label="所属门户" path="portalId">
            <nw-dic
              :disabled="editorAction !== 'create' && editorAction !== 'edit'"
              style="width: 230px"
              v-model:value="templateBasicModel.portalId"
              v-model:label="templateBasicModel.portalName"
              :request="{
                XHR: requestPortalList,
                params: {}
              }"
              :response="{
                dataMethod: res => res.records.map(({ id: value, portalName: label }) => ({ value, label }))
              }"
              placeholder="请选择门户"
              size="small"
            />
          </n-form-item>
          <n-form-item
            v-if="editorAction === 'create' || editorAction === 'edit'"
            label="是否启用"
            path="startEnable"
          >
            <n-radio-group
              size="small"
              v-model:value="templateBasicModel.startEnable"
              name="radiogroup"
              :disabled="editorAction === 'createBy'"
            >
              <n-radio size="small" :value="1">
                启用
              </n-radio>
              <n-radio size="small" :value="0">
                停用
              </n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="终端" path="startEnable">
            <n-radio-group size="small" disabled v-model:value="templateBasicModel.terminal" name="radiogroup">
              <n-radio size="small" :value="0">
                Pc端
              </n-radio>
              <n-radio size="small" :value="1">
                移动端
              </n-radio>
            </n-radio-group>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="info" @click="handleTemplateBasic" >确定</n-button>
          <n-button size="small" type="default" @click="modalVisible.templateBasic = false" >取消</n-button>
        </div>
      </template>
    </n-modal>
    <!-- 保存 -->
    <n-modal
      v-model:show="modalVisible.templateSave"
      preset="dialog"
      style="width: 300px; padding: 0 5px 5px 5px"
      :show-icon="true"
    >
      <template #icon >
        <nw-icon name="icon-request" color="rgb(103, 194, 58)" />
      </template>
      <template #header>
        <div>模板保存</div>
      </template>
      <n-spin :show="modalVisible.templateSaveLoading" :rotate="false" >
        <template #icon>
          <div><n-spin :show="true" />Test</div>
        </template>
        <div style="padding-bottom: 10px">
          
        </div>
        <n-form
          label-placement="left"
          :label-width="80"
          size="small"
          :style="{
            maxWidth: '240px'
          }"
        >
          <n-grid :cols="12">
            <n-form-item-gi :span="12" label="模板名称:">
              {{templateBasic.templateName || '未命名'}}
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="模板编码:">
              {{templateBasic.templateCode || '未输入'}}
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="所属门户:">
              {{templateBasic.portalName || '未选择'}}
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="是否启用:">
              {{templateBasic.startEnable ? '是' : '否'}}
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="终端:">
              {{templateBasic.terminal ? '移动端' : 'Pc端'}}
            </n-form-item-gi>
            <n-form-item-gi :span="6"  label="页面数量:">
              {{website.pages.length}}
            </n-form-item-gi>
            <!-- <n-form-item-gi :span="6"  label="页面总大小:" path="startEnable">
              {{website.pages.length}}
            </n-form-item-gi> -->
          </n-grid>
        </n-form>
        <div style="padding: 0 5px 5px 0;text-align:right">
          <n-button size="small" type="info" @click="handleTemplateSave" >提交</n-button>
          <n-button size="small" type="default" @click="modalVisible.templateSave = false" >取消</n-button>
        </div>
      </n-spin>
      <template #action>
      </template>
    </n-modal>
<!-- 
    <n-modal v-model:show="createPageModalVisible" preset="dialog" style="width: 300px" >
      <template #icon >
        <nw-icon name="icon-page" />
      </template>
      <template #header>
        <div>新建路由</div>
      </template>
      <div>
        <n-form
          :model="createPageModel"
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
              v-model:value="createPageModel.key" 
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
              v-model:value="createPageModel.type"
            />
          </n-form-item>
          <n-form-item label=" " path="generateRoute">
            <n-checkbox v-model:checked="createPageModel.generateRoute">是否自动生成路由<br>(文件名作为Path,添加到'/'下)</n-checkbox>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="info" @click="handleCreatePage" >保存</n-button>
          <n-button size="small" type="default" @click="createPageModalVisible = false" >取消</n-button>
        </div>
      </template>
    </n-modal> -->
    <!-- 新建页面 -->
  </n-config-provider>
</template>
<script lang="jsx">
  import { h, reactive, ref, watch } from 'vue'
  import { portalPortalList as requestPortalList } from '/src-portal/pages/portal-manage/api'
  import {
    NGrid,
    NTree,
    NButton,
    NConfigProvider,
    NModal,
    NForm,
    NFormItem,
    NFormItemGi,
    NInput,
    NSelect,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NSpin
  } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import NwDic from '/@/components/nw-dictionary/index.vue'
  import modeTheme from './theme.js'
  import {
    editorAction,
    website,
    openingPages,
    openPage,
    openPageByKey,
    saveToWebSite,
    createPage,
    createRoute,
    modalVisible, // 模态框状态
    templateBasic,
    // ---------请求
    sendSave,
    requestCreate,
    requestParts
  } from '../../store'

  export default {
    props: {
    },
    components: {
      NGrid,
      NTree,
      NButton,
      NwIcon,
      NConfigProvider,
      NModal,
      NInput,
      NSelect,
      NForm,
      NFormItem,
      NFormItemGi,
      NCheckbox,
      NRadio,
      NRadioGroup,
      NwDic,
      NSpin
    },
    setup () {
      // 新建页面
      const createPageFormRef = ref(null)
      const createPageModel = reactive({
        type: 'page',
        generateRoute: true
      })
      const createPageRules = {

      }
      const handleCreatePage = () => {
        // 创建页面代码
        const flag = createPage(createPageModel.key, createPageModel.type)
        if (!flag) {
          // 添加失败
          return
        }
        // 打开页面
        openPageByKey(createPageModel.key)
        // 创建路由
        if (createPageModel.generateRoute) {
          createRoute(createPageModel.key, createPageModel.key, createPageModel.key)
        }
        modalVisible.createPage = false
      }
      // 基本信息设置--------------
      const templateBasicFormRef = ref(null)
      const templateBasicModel = reactive({
        startEnable: 1,
        terminal: 0
      })
      const templateBasicRules = {}
      // 保存模板基本信息
      const handleTemplateBasic = () => {
        templateBasic.templateName = templateBasicModel.templateName
        templateBasic.templateCode = templateBasicModel.templateCode
        templateBasic.portalId = templateBasicModel.portalId
        templateBasic.portalName = templateBasicModel.portalName
        templateBasic.startEnable = templateBasicModel.startEnable
        templateBasic.terminal = templateBasicModel.terminal
        modalVisible.templateBasic = false
        // 这里请求栏目
        requestParts(templateBasic.portalId)
      }
      // 模板保存 --------
      const handleTemplateSave = () => {
        sendSave().then(() => {
          // 这里提示是否回到列表页面
        })
      }
      // 监听模态展示变化
      watch(modalVisible, () => {
        // 开启时给表单赋值
        if (modalVisible.templateBasic) {
          templateBasicModel.templateName = templateBasic.templateName
          templateBasicModel.templateCode = templateBasic.templateCode
          templateBasicModel.portalId = templateBasic.portalId
          templateBasicModel.portalName = templateBasic.portalName
          templateBasicModel.startEnable = templateBasic.startEnable === undefined ? 1 : templateBasic.startEnable
          templateBasicModel.terminal =templateBasic.terminal === undefined ? 0 : templateBasic.terminal
        }
      })
      return {
        editorAction,
        website,
        modalVisible,
        // 创建页面
        createPageFormRef,
        createPageRules,
        createPageModel,
        handleCreatePage,
        // 基本信息
        templateBasic,
        templateBasicFormRef,
        templateBasicRules,
        templateBasicModel,
        handleTemplateBasic,
        requestPortalList,
        // --保存
        handleTemplateSave,
        // ---重写主题
        modeTheme
      }
    }
  }
</script>
<style lang='less'>

</style>