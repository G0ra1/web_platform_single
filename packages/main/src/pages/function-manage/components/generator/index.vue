<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 900px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        生成基础功能
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-layout class="nw-modal-layout" >
      
      <n-layout-content>
        <n-form
          :model="formData"
          ref="formRef"
          label-placement="top"
          :label-width="60"
          style="padding: 5px 10px"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="选择表单" >
              <n-input
                style="margin-right: 5px;width: 400px"
                :value="formData.formNameCh"
                placeholder="选择表单"
                disabled
              />
              <nw-pick-form
                @update:value="(d: string, o: any) => updateForm(d, o)"
                @update:pageUrl="(d: string) => formData.formUrl = d"
                @update:pageCode="(d: string) => formData.formName = d"
                @update:pageName="(d: string) => formData.formNameCh = d"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="选择生成功能" >
              <n-space item-style="display: flex;" align="center">
                <n-checkbox v-model:checked="FunEm.add" size="large" label="新增" />
                <n-checkbox v-model:checked="FunEm.edit" size="large" label="编辑" />
                <n-checkbox v-model:checked="FunEm.del" size="large" label="删除" />
                
              </n-space>
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="App应用" >
              {{appInfo.appName}} ({{appInfo.appCode}})
            </n-form-item-gi>
          </n-grid>
            
          <div class="fun-items">
              <div class="fun-empty" v-if="!FunEm.add && !FunEm.edit && !FunEm.del">
                没有选择任何功能
              </div>
              <div v-if="FunEm.add" class="fun-item">
                <n-spin :show="FunEm.addState !== 1" :rotate="false">
                  <template #icon>
                    <img
                      v-if="FunEm.addState === 2"
                      style="width: 32px;height: 32px;"
                      src="/loading.svg"
                    />
                    <nw-icon
                      v-if="FunEm.addState === 3"
                      name="icon-n-n-yes"
                    />
                  </template>
                  <template #description>
                    <div v-if="FunEm.addState === 2">正在创建功能...</div>
                    <div v-if="FunEm.addState === 3">创建成功</div>
                    <div v-if="FunEm.addState === 4">创建失败</div>
                  </template>
                  <div class="fun-item-header">
                    新增
                  </div>
                  <div class="fun-item-content">
                    <div class="fun-item-content-field">
                      <label>功能名称</label>
                      <n-input
                        size="small"
                        v-model:value="FunAdd.fullName"
                      />
                    </div>
                    <div class="fun-item-content-field">
                      <label>功能简称</label>
                      <n-input size="small" v-model:value="FunAdd.shortName" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>功能编码</label>
                      <n-input size="small" v-model:value="FunAdd.code" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>功能图标</label>
                      <NwIconPick v-model:value="FunAdd.icon" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>展示方式</label>
                      <n-radio-group v-model:value="FunAdd.viewMode" >
                        <n-space>
                          <n-radio value="drawer">
                            抽屉
                          </n-radio>
                          <n-radio value="modal">
                            模态框
                          </n-radio>
                          <n-radio value="view">
                            直接显示
                          </n-radio>
                        </n-space>
                      </n-radio-group>
                    </div>
                    <div :style="{ visibility: FunAdd.viewMode === 'view' ? 'hidden' : 'visible' }" class="fun-item-content-field split">
                      <div class="split-item">
                        <label>宽度</label>
                        <n-input placeholder="%或px" size="tiny" v-model:value="FunAdd.width" />
                      </div>
                      <div v-if="FunAdd.viewMode === 'modal'" class="split-item">
                        <label>高度</label>
                        <n-input placeholder="px" size="tiny" v-model:value="FunAdd.height" />
                      </div>
                    </div>
                  </div>
                  <div class="fun-item-footer">
                    <n-button
                    type="info"
                    size="tiny"
                    style="margin-right: 5px"
                    @click="handleAddPreview"
                    >预览</n-button>
                  </div>
                </n-spin>
              </div>
              <div v-if="FunEm.edit" class="fun-item">
                <n-spin :show="FunEm.editState !== 1" :rotate="false">
                  <template #icon>
                    <img
                      v-if="FunEm.editState === 2"
                      style="width: 32px;height: 32px;"
                      src="/loading.svg"
                    />
                    <nw-icon
                      v-if="FunEm.editState === 3"
                      name="icon-n-n-yes"
                    />
                  </template>
                  <template #description>
                    <div v-if="FunEm.editState === 2">正在创建功能...</div>
                    <div v-if="FunEm.editState === 3">创建成功</div>
                    <div v-if="FunEm.editState === 4">创建失败</div>
                  </template>
                <div class="fun-item-header">
                  编辑
                </div>
                <div class="fun-item-content">
                  <div class="fun-item-content-field">
                    <label>功能名称</label>
                    <n-input size="small" v-model:value="FunEdit.fullName" />
                  </div>
                  <div class="fun-item-content-field">
                    <label>功能简称</label>
                    <n-input size="small" v-model:value="FunEdit.shortName" />
                  </div>
                  <div class="fun-item-content-field">
                    <label>功能编码</label>
                    <n-input size="small" v-model:value="FunEdit.code" />
                  </div>
                  <div class="fun-item-content-field">
                    <label>功能图标</label>
                    <NwIconPick v-model:value="FunEdit.icon" />
                  </div>
                  <div class="fun-item-content-field">
                    <label>展示方式</label>
                    <n-radio-group v-model:value="FunEdit.viewMode" >
                      <n-space>
                        <n-radio value="drawer">
                          抽屉
                        </n-radio>
                        <n-radio value="modal">
                          模态框
                        </n-radio>
                        <n-radio value="view">
                          直接显示
                        </n-radio>
                      </n-space>
                    </n-radio-group>
                  </div>
                  <div :style="{ visibility: FunEdit.viewMode === 'view' ? 'hidden' : 'visible' }" class="fun-item-content-field split">
                    <div class="split-item">
                      <label>宽度</label>
                      <n-input placeholder="%或px" size="tiny" v-model:value="FunEdit.width" />
                    </div>
                    <div v-if="FunAdd.viewMode === 'modal'" class="split-item">
                      <label>高度</label>
                      <n-input placeholder="px" size="tiny" v-model:value="FunEdit.height" />
                    </div>
                  </div>
                </div>
                <div class="fun-item-footer">
                  <n-input
                    placeholder="模拟参数"
                    size="tiny"
                    style="width: 120px"
                    v-model:value="previewEditParam"
                  />
                  <n-button
                  type="info"
                  size="tiny"
                  style="margin: 0 5px"
                  @click="handleEditPreview"
                  >预览</n-button>
                </div>
                </n-spin>
              </div>
              <div v-if="FunEm.del" class="fun-item" style="margin-right: 0px;">
                <n-spin :show="FunEm.delState !== 1" :rotate="false">
                  <template #icon>
                    <img
                      v-if="FunEm.delState === 2"
                      style="width: 32px;height: 32px;"
                      src="/loading.svg"
                    />
                    <nw-icon
                      v-if="FunEm.delState === 3"
                      name="icon-n-n-yes"
                    />
                  </template>
                  <template #description>
                    <div v-if="FunEm.delState === 2">正在创建功能...</div>
                    <div v-if="FunEm.delState === 3">创建成功</div>
                    <div v-if="FunEm.delState === 4">创建失败</div>
                  </template>
                  <div class="fun-item-header">
                    删除
                  </div>
                  <div class="fun-item-content">
                    <div class="fun-item-content-field">
                      <label>功能名称</label>
                      <n-input size="small" v-model:value="FunDel.fullName" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>功能简称</label>
                      <n-input size="small" v-model:value="FunDel.shortName" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>功能编码</label>
                      <n-input size="small" v-model:value="FunDel.code" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>功能图标</label>
                      <NwIconPick v-model:value="FunDel.icon" />
                    </div>
                    <div class="fun-item-content-field">
                      <label>展示方式</label>
                      <n-radio-group v-model:value="FunDel.viewMode" >
                        <n-space>
                          <n-radio value="drawer">
                            抽屉
                          </n-radio>
                          <n-radio value="modal">
                            模态框
                          </n-radio>
                          <n-radio value="view">
                            直接显示
                          </n-radio>
                        </n-space>
                      </n-radio-group>
                    </div>
                    <div :style="{ visibility: FunDel.viewMode === 'view' ? 'hidden' : 'visible' }" class="fun-item-content-field split">
                      <div class="split-item">
                        <label>宽度</label>
                        <n-input placeholder="%或px" size="tiny" v-model:value="FunDel.width" />
                      </div>
                      <div class="split-item">
                        <label>高度</label>
                        <n-input placeholder="px" size="tiny" v-model:value="FunDel.height" />
                      </div>
                    </div>
                  </div>
                  <div class="fun-item-footer">
                    <n-input
                      placeholder="模拟参数"
                      size="tiny"
                      style="width: 120px"
                      v-model:value="previewDelParam"
                    />
                    <n-button
                    type="info"
                    size="tiny"
                    style="margin: 0 5px"
                    @click="handleDelPreview"
                    >预览</n-button>
                  </div>
                </n-spin>
              </div>
              <!-- FunAdd,
      FunEdit,
      FunDel, -->
            </div>
        </n-form>
      </n-layout-content>
    </n-layout>
    
    <template #action>
        
      <div style="padding: 5px;">
        <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="send"
        >
        提交生成功能
        </n-button>
        <n-button  size="small"
        @click="visible = false" >取消</n-button>
      </div>
    </template>
  </n-modal>
  
  <!-- <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
  </n-modal> -->
  <!-- <n-drawer v-model:show="previewVisible" width="100%">
    
  </n-drawer> -->
  <nw-function-viewer
    ref="previewFunctionViewRef"
    @cancel="onPreviewCancel"
    @complete="onPreviewComplete"
  />
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h } from 'vue'
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
  FormInst
} from 'naive-ui'
import { NwIcon, request, NwIconPick, NwPickForm, NwFunctionViewer } from '@platform/main'

import {
  FunEm,
  formData,
  handleFormComplete,
  FunAdd,
  FunEdit,
  FunDel,
  resetFunCache,
  sendCreate,
  visible
} from './function'

import {
  previewVisible,
  previewFunctionViewRef,
  openPreview,
  previewEditParam,
  previewDelParam,
  onPreviewComplete,
  onPreviewCancel,
  resetPreview

} from './preview'

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
    NwPickForm,
    NSpace,
    NCheckbox,
    NRadioGroup,
    NRadio,
    NDivider,
    NDrawer,
    NwIconPick,
    NwFunctionViewer 
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [ 'callback' ],
  setup (props: any, context: any) {
    const formRef = ref<FormInst>()
    const appInfo = ref<any>({})
    return {
      appInfo,
      FunAdd,
      FunEdit,
      FunDel,
      FunEm,
      formData,
      formRef,
      visible,
      show (d: any = {}) {
        appInfo.value = d
        resetFunCache()
        resetPreview()
        visible.value = true
      },
      handleFormComplete,
      updateForm (d: any, o: any) {
        console.log('=====oo======', o)
        formData.value.formId = d
        formData.value._requestUrl = o.formSaveUrl
        formData.value.appCode = o.appCode
        formData.value.appName = o.appName
        nextTick().then(() => {
          handleFormComplete()
        })
      },
      handleAddPreview () {
        openPreview(FunAdd.value, {})
      },
      handleEditPreview () {
        openPreview(FunEdit.value, {
          id: previewEditParam
        })
      },
      handleDelPreview () {
        openPreview(FunDel.value, {
          id: previewDelParam
        })
      },
      // handlePreview (d: any, p: any) {
      //   openPreview(d, p)
      // },
      // ----预览--------------
      previewVisible,
      previewFunctionViewRef,
      onPreviewComplete,
      onPreviewCancel,
      previewEditParam,
      previewDelParam,
      send () {
        sendCreate(appInfo.value).then(r => {
          context.emit('callback')
        })
      }
    }
  }
}
</script>

<style lang='less' >
  .fun-items {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    height: 400px;
    border: 1px dashed #ccc;
    padding: 10px 0 10px 10px;
    align-items: center;
    >.fun-empty {
      font-size: 16px;
      font-weight: bold;
      margin: 0 auto;
    }
    .fun-item {
      display: flex;
      flex-direction: column;
      width: 272px;
      margin-right:15px;
      border: 1px solid #ccc;
      box-shadow: 1px 1px 3px 0px #607d8b;;
      &-header {
        font-weight: bold;
        text-indent: 5px;
        border-bottom: 1px solid #ccc;
      }
      &-content {
        flex: 1;
        padding: 5px;
        &-field {
          margin-bottom: 10px;

          &.split {
            display: flex;
            flex-direction: row;
            >.split-item {
              flex:1;
              display: flex;
              flex-direction: row;
              padding-right: 10px;
              align-items: center;
              label {
                width: 60px;
              }
            }
          }
        }
      }
      &-footer {
        display: flex;
        justify-content: end;
        padding-bottom: 5px;
      }
      &.active {

      }
    }
  }
</style>