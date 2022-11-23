<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="资源维护" content="你确认" positive-text="确认"
    negative-text="取消" style="width:800px;" ref="xmodal">
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" :rules="rules">

        <n-grid x-gap="8" :cols="2">
          <n-grid-item>
            <n-form-item label="来源名称" path="pgtCustomName">
              <n-input size="small" placeholder="请输入" v-model:value="model.pgtCustomName" />
            </n-form-item>
          </n-grid-item>
          <!-- <n-grid-item>
            <n-form-item label="场站/区域编码" path="pgtCustomCode">
              <n-input size="small" placeholder="请输入" v-model:value="model.pgtCustomCode" />
            </n-form-item>
          </n-grid-item> -->
          <n-grid-item>
            <n-form-item label="厂别" path="deptName">
              <n-input size="small" disabled placeholder="请输入" v-model:value="model.deptName" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="排序" path="sort">
              <n-input-number size="small" style="width:100%" placeholder="请输入" v-model:value="model.sort" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item :span='24'>
            <n-form-item label="描述" path="description">
              <n-input size="small" placeholder="请输入" type="textarea" v-model:value="model.description" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button size="small" type="default" style="margin-right: 5px" @click="showModal = false">取消</n-button>
        <n-button size="small" type="info" @click="onPositiveClick" :disabled="btloading">保存</n-button>
      </div>
    </template>

  </n-modal>
</template>
<script lang='jsx'>
import { defineComponent, ref, reactive, onMounted } from 'vue'
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
  NSwitch,
  NInputNumber
} from 'naive-ui'
import { creatApp, editApp, } from '../api/index.js'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage, Db } from '@platform/main';


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
    MenuPick,
    NwPickPage,
    NSwitch,
    NInputNumber
  },
  props: {

  },
  setup(props, context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const formRef = ref()
    const isLoading = ref(false)
    const platformDictCodes = ref([])
    const message = useMessage();
    const sonFn = (e = {}) => {
      showModalRef.value = true
      modelRef.value = { ...e }
      Db.get('userInfo').then(res => {
        if (!modelRef.value.deptName) {
          console.log(res, '用户信息')
          modelRef.value.deptName = res.parentDeptName
          modelRef.value.deptNameId = res.parentDeptId
        }
      })

    }

    onMounted(() => {
    })
    const rules = ref({
      pgtCustomName: {
        required: true,
        trigger: ['focus', 'input'],
        message: '请输入场站/区域名称'
      },
      sort: {
        required: true,
        trigger: ['focus', 'input'],
        type: 'number',
        message: '请输入排序'
      }
    })
    return {
      showModal: showModalRef,
      message,
      model: modelRef,
      formRef,
      isLoading,
      rules,
      sonFn,
      getFormMessage(d, n) {
        modelRef.value.formId = n.id
        modelRef.value.formUrl = n.pageUrl
        modelRef.value.formTargetUrl = n.targetUrl
      },
      platformDictCodes,
      onPositiveClick() {
        const fn = !modelRef.value.id ? creatApp : editApp
        formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            fn(modelRef.value).then((res) => {
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