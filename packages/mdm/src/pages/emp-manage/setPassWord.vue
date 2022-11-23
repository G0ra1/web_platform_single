<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="'设置密码'"
    content="你确认"
    positive-text="确认"
    @positive-click="handleValidateButtonClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width:500px;"
  >
    <n-form :model="model" ref="formRef" :rules="rules" style="height:600px">
        <n-grid x-gap="8" :cols="1" >
             <n-grid-item>
                 <h5>人员---{{ model.userNameCh}}</h5>
                 <h5 >单位---{{ model.parentOrgName}}</h5>
                 <h5>部门---{{ model.parentDeptName}}</h5>
                 <h5>岗位---{{ model.postName}}</h5>
                 <h5>职位---{{ model.dutyName}}</h5>
             </n-grid-item>
             <div style="height:30px"></div>
            <n-grid-item>
                <n-form-item path="passWord" label="密码">
                    <n-input
                        v-model:value="model.passWord"
                        @input="handlePasswordInput"
                        type="password"
                        @keydown.enter.prevent
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item>
                <n-form-item
                first
                path="reenteredPassword"
                label="重复密码"
                ref="rPasswordFormItemRef"
                >
                <n-input
                    :disabled="!model.passWord"
                    v-model:value="model.reenteredPassword"
                    type="password"
                    @keydown.enter.prevent
                />
                </n-form-item>
            </n-grid-item>
        </n-grid>
  </n-form>
  </n-modal>
</template>

<script>
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect ,
    NDatePicker
} from 'naive-ui'
import { editEmp } from './api'
import { Aes } from '@platform/main'

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
        NDatePicker
    },
    props: {
       
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({
        passWord: null,
        reenteredPassword: null
    })
    const sonFn = (e) => {
      showModalRef.value = true
      modelRef.value = {...e,...modelRef,passWord:''}
     }
    const formRef = ref(null)
    const rPasswordFormItemRef = ref(null)
        
    function validatePasswordStartWith (rule, value) {
        return (
            modelRef.value.passWord &&
            modelRef.value.passWord.startsWith(value) &&
            modelRef.value.passWord.length >= value.length
        )
    }
    function validatePasswordSame (rule, value) {
        return value === modelRef.value.passWord
    }
    onMounted(async () => {
     
    })
    return {
      sonFn,
      model:modelRef, // 表单数据
      showModal: showModalRef,
      formRef,
      rPasswordFormItemRef,
        rules: {
            passWord: [
                {
                    required: true,
                    message: '请输入密码'
                }
            ],
            reenteredPassword: [
                {
                    required: true,
                    message: '请再次输入密码',
                    trigger: ['input', 'blur']
                },
                {
                    validator: validatePasswordStartWith,
                    message: '两次密码输入不一致',
                    trigger: 'input'
                },
                {
                    validator: validatePasswordSame,
                    message: '两次密码输入不一致',
                    trigger: ['blur', 'password-input']
                }
            ]
      },
      handlePasswordInput () {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
        }
      },
      handleValidateButtonClick (e) {
        formRef.value.validate((errors) => {
          if (!errors) {
              modelRef.value.passWord = Aes.encrypt(modelRef.value.passWord )
              modelRef.value.reenteredPassword = Aes.encrypt(modelRef.value.reenteredPassword )
            editEmp(modelRef.value).then((res)=>{
                context.emit('update:callback');
                showModalRef.value = false
            })
          } else {
            console.log(errors)
            
          }
        })
        },
     
    }
  },
  methods:{
      
  },
   
})
</script>