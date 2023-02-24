<template>
  <n-modal
    v-model:show="visible"
    :mask-closable="false"
    preset="dialog"
    class="chat-modal"
    style="width: 550px;"
  >
    
  <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        {{ formModel.id ? '编辑' : '添加' }} 业务入口
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
                :model="formModel"
                ref="formRef"
                :rules="rules"
                label-placement="left"
                :label-width="100"
                style="padding: 25px 30px 0 10px;height: 380px"
            >
                <n-form-item :span="8" label="菜单名称" path="name">
                    <n-input
                        style="margin-right: 5px;width: 400px"
                        v-model:value="formModel.name"
                        placeholder="输入菜单名称"
                    />
                </n-form-item>
                <n-form-item :span="8" label="菜单编码" path="code">
                    <n-input
                        style="margin-right: 5px;width: 400px"
                        v-model:value="formModel.code"
                        placeholder="输入菜单编码"
                    />
                </n-form-item>
                <n-form-item :span="8" label="图标" path="icon">
                    <NwIconPick
                        v-model:value="formModel.icon"
                        placeholder="图标"
                    />
                </n-form-item>
                <n-form-item :span="8" label="排序" path="sort">
                  <n-input-number
                      type="textarea"
                      v-model:value="formModel.sort"
                      placeholder="输入排序"
                  />
                </n-form-item>
                <n-form-item :span="8" label="类型" path="type">
                    <n-radio-group v-model:value="formModel.type" >
                      <n-radio value="group">组</n-radio>
                      <n-radio value="iframe-inner">内嵌Frame</n-radio>
                      <n-radio value="iframe-modal">模态Frame</n-radio>
                      <n-radio value="new-window">新页面</n-radio>
                    </n-radio-group>
                </n-form-item>
                <n-form-item v-if="formModel.type !== 'group'" :span="8" label="URL" path="url">
                  <n-input
                      type="textarea"
                      v-model:value="formModel.url"
                      placeholder="输入地址"
                      style="height: 60px;"
                  />
                </n-form-item>
            </n-form>
      </n-layout-content>
    </n-layout>
    
    <template #action>
        
      <div style="padding: 5px;">
        <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="handSave"
        >
        保存
        </n-button>
        <n-button  size="small"
        @click="visible = false" >取消</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script lang="tsx">
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  NModal,
  NLayout,
  NLayoutContent,
  NInput,
  NInputNumber,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  NButton,
  NSpin,
  NRadioGroup,
  NRadio,
  useMessage
} from "naive-ui";
import { NwIcon, NwDic, NwIconPick } from "@platform/main";

import { create, edit } from './api'

export default defineComponent({
  components: {
        
    NModal,
    NLayout,
    NLayoutContent,
    NInput,
    NInputNumber,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NwIconPick,
    NRadioGroup,
    NRadio,
    useMessage
  },
  // props: {

  // },
    emits: ['callback'],
  setup(props, context) {
    //
    const visible = ref<boolean>(false)
    const formRef = ref<any>()
        
    //
    const formModel = ref<any>({

    })
    return {
        formRef,
        visible,
        formModel,
        show (row: any) {
            visible.value = true
            if (row) {
                formModel.value = row
            } else {
                formModel.value = {
                  type: 'group'
                }
            }
        },
        handSave () {
            console.log(formModel.value)
            formRef.value.validate((errors: Array<any>) => {
                if (errors) return
                    // create, edit
                if (formModel.value.id) {
                    edit(formModel.value).then(r => {
                        context.emit('callback')
                    }).finally(() => {
                        
                        visible.value = false
                    })
                } else {
                    create(formModel.value).then(r => {
                        context.emit('callback')
                    }).finally(() => {
                        
                        visible.value = false
                    })
                }
            })
        },
        rules: {
            name: {
                required: true,
                trigger: ['blur', 'input'],
                message: '请输入业务入口名称'
            },
            code: {
                required: true,
                trigger: ['blur', 'input'],
                message: '请输入业务入口编码'
            },
            icon: {
                required: true,
                trigger: ['blur', 'input'],
                message: '请选择图标'
            },
        }
    };
  },
});
</script>
<style lang="less">
</style>
