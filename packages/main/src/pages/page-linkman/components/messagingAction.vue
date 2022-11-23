<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="群发消息" content="你确认" positive-text="确认"
    negative-text="取消" style="width:800px;" ref="xmodal">
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" style="padding:0 10px" :rules="rules">

        <n-grid x-gap="8" :cols="1">
          <n-grid-item>
            <n-form-item label="接收人" path="receiverUserNames">
              <EmployeePickModal :showSide="true" :multiple="true" :isShowSearch="true"
                :userName="model.receiverUserNames" :value="model.receiverUserIds" @update:callback="
                (e) => {
                    model.receiverUserNames = e.map(d=>d.userNameCh).join(',')
                    model.receiverUserIds = e.map(d=>d.id).join(',')
                   
                }
                "></EmployeePickModal>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="接收部门" path="receiverDeptNames">
              <ChooseDept :isShowSearch="true" :orgUserName="model.receiverDeptNames" :value="model.receiverDeptIds"
                @update:callback="
                  (e) => {
                    model.receiverDeptIds= e.map(d=>d.id).join(',')
                    model.receiverDeptNames= e.map(d=>d.orgName).join(',')
                  }
                "></ChooseDept>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="提醒方式" path="smsMsgType">
              <n-checkbox-group v-model:value="model.smsMsgType" name="checkgroup">

                <n-checkbox value="sms">
                  <span style="color:#1060c9;font-weight:bolder">短信</span>
                </n-checkbox>
                <n-checkbox value="qywechat">
                  <span style="color:#1060c9;font-weight:bolder">企业微信</span>
                </n-checkbox>
                <n-checkbox value="mail">
                  <span style="color:#1060c9;font-weight:bolder">邮箱</span>
                </n-checkbox>
              </n-checkbox-group>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="标题" path="msgTitle">
              <n-input v-model:value="model.msgTitle" placeholder="" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="内容" path="msgContent">
              <template #label>
                <span>内容</span>
                <nw-icon style="margin-left:5px;height: 20px;" name="icon-n-y-add" :size="14"
                  @click="$refs.templateAction.sonFn()" />
              </template>
              <n-input v-model:value="model.msgContent" path="msgContent" type="textarea" show-count
                :maxlength="(model.smsMsgType ? model.smsMsgType : []).join(',').includes('sms') ? '250' : '9999'"
                placeholder="">
                <!-- <template #count="{ value }">
                        {{(model.smsMsgType ? model.smsMsgType : []).join(',').includes('sms') ? '2' : value.length }}
                      </template> -->
              </n-input>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button size="small" type="default" style="margin-right: 5px" @click="showModal = false">取消</n-button>
        <n-button size="small" type="error" @click="onPositiveClick" :disabled="btloading">保存</n-button>
      </div>
    </template>

  </n-modal>
  <TemplateAction ref="templateAction" @update:callback="(row) => {
         model.msgContent = row.tempContent

  }">
  </TemplateAction>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { cloneDeep } from 'lodash'
import {
  NModal,
  NInput,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  NButton,
  NSpin,
  NTag,
  useMessage,
  NImage,
  NText,
  NP,
  NCheckboxGroup,
  NCheckbox
} from 'naive-ui'
import { ctsFsend } from '../api'
import { NwIcon, NwDic, NwIconPick, EmployeePickModal, ChooseDept } from '@platform/main';
import TemplateAction from './templateAction.vue'

export default defineComponent({
  components: {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NTag,
    NImage,
    NText,
    NP,
    NwDic,
    NwIcon,
    NwIconPick,
    EmployeePickModal,
    ChooseDept,
    NCheckboxGroup,
    NCheckbox,
    TemplateAction
  },
  props: {

  },

  setup(props, context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const formRef = ref()
    const isLoading = ref(false)
    const platformDictCodes = ref([])
    const templateAction = ref()
    const message = useMessage();

    const sonFn = (e = {}) => {
      showModalRef.value = true
      modelRef.value = { ...e }

    };
    const rules = ref({

      receiverUserNames: {
        required: true,
        message: '请选择接收人',
        trigger: ['blur', 'input'],
      },
      receiverDeptNames: {
        required: true,
        message: '请选择接收部门',
        trigger: ['blur', 'input'],
      },
      smsMsgType: {
        required: true,
        message: '请选择提醒方式',
        trigger: ['blur', 'input'],
        type: 'array'
      },
      msgTitle: {
        required: true,
        message: '请输入标题',
        trigger: ['blur', 'input'],
      },
      msgContent: {
        required: true,
        message: '请输入内容',
        trigger: ['blur', 'input'],
      },
    })
    onMounted(() => {

    })
    watch(() => modelRef.value.receiverUserNames, (d) => {
      if (d) {
        rules.value.receiverDeptNames.required = false
        formRef.value.validate()
      }
    })
    watch(() => modelRef.value.receiverDeptNames, (d) => {
      if (d) {
        rules.value.receiverUserNames.required = false
        formRef.value.validate()
      }
    })

    return {
      showModal: showModalRef,
      message,
      templateAction,
      model: modelRef,
      formRef,
      isLoading,
      sonFn,
      platformDictCodes,
      rules,
      onPositiveClick() {
        formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            let modelData = cloneDeep(modelRef.value)
            modelData.smsMsgType = modelData.smsMsgType ? modelData.smsMsgType.join(',') : ''
            ctsFsend(modelData).then((res) => {
              if (res) {
                context.emit('update:callback');
                showModalRef.value = false
              }
            }).finally(r => {
              isLoading.value = false
            })
          }
        })

      },
      onNegativeClick() {

        showModalRef.value = false
      },

    }
  },
  methods: {
  }
})
</script>
<style scoped lang="less">

</style>