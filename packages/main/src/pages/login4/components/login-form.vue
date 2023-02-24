<template>

    <n-spin class="" :show="loading">
        <div class="login-card">
            <div class="header">
                登录系统
            </div>
            <div class="content">
                <n-form ref="formRef" :model="model" :rules="rules" label-width="100" label-placement="top">
                    <n-form-item path="username" label="用户名">
                        <n-input placeholder="" v-model:value="model.username" @keydown.enter.prevent="handle" />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input placeholder="" v-model:value="model.password" type="password"
                            @keydown.enter.prevent="handle" />
                    </n-form-item>
                </n-form>
            </div>
            <div class="footer">
                <n-button class="login-btn" @click="handle">
                    登录
                </n-button>
            </div>
        </div>
    </n-spin>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'

import { login } from '../api'
import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NSpin,
    FormInst,
    FormItemInst,
    FormItemRule,
    useMessage,
    FormRules
} from 'naive-ui'

interface ModelType {
    username: string | null
    password: string | null
}

export default defineComponent({

    components: {
        NForm,
        NFormItem,
        NInput,
        NButton,
        NSpin,
    },
    emits: ['callback'],
    setup(props, context) {
        const formRef = ref<FormInst | null>(null)
        const loading = ref<boolean>(false)
        const message = useMessage()
        const modelRef = ref<ModelType>({
            // username: 'admin',
            // password: 'zyj@951@ad'
            username: '',
            password: ''
        })


        const rules: FormRules = {

        }
        const handle = () => {
            loading.value = true
            login('userlogin', modelRef.value).then(d => {
                // console.log(d)
                window.location.href = '/web-main/pages/layout2.html'
            }).catch((error) => {
                console.error(error)
                message.error(error.message)
                // 信息提示
            }).finally(() => {

                loading.value = false
            })
        }
        document.onkeydown = function (e) {
            if (e.keyCode == 13) {
                handle()
            }
        }
        return {
            loading,
            formRef,
            model: modelRef,
            rules,
            handle,
            handleValidateButtonClick(e: MouseEvent) {
                e.preventDefault()
                formRef.value?.validate((errors) => {
                    if (!errors) {
                        message.success('验证成功')
                    } else {
                        console.log(errors)
                        message.error('验证失败')
                    }
                })
            }
        }
    }
})
</script>

<style lang="less">
.login-card {
    width: 320px;
    background: #fcfcfc;

    >.header {
        font-size: 16px;
        font-weight: bold;
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }

    >.content {
        height: 180px;
        padding: 20px;
    }

    border: 1px solid #ccc;

    >.footer {
        padding: 5px;

        >.login-btn {
            width: 100%;
        }
    }
}
</style>