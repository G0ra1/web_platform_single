<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="大宗原材料维护" content="你确认" positive-text="确认"
    negative-text="取消" style="width:800px;" ref="xmodal">
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" :rules="rules">

        <n-grid x-gap="8" :cols="1">
          <n-grid-item>
            <n-form-item label="大宗商品名称" path="commodityItemName">
              <n-input size="small" placeholder="请输入" v-model:value="model.commodityItemName" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="商品计量单位" path="commodityItemUnit">
              <n-input size="small" placeholder="请输入" v-model:value="model.commodityItemUnit" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="序号" path="sn">
              <n-input-number size="small" style="width:100%" placeholder="请输入排序" v-model:value="model.sn" />
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
      commodityItemName: {
        required: true,
        trigger: ['focus', 'input'],
        message: '请输入大宗商品名称'
      },
      commodityItemUnit: {
        required: true,
        trigger: ['focus', 'input'],
        message: '请输入商品计量单位'
      },
      sn: {
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