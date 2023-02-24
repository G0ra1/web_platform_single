<template>

    <n-spin class="" style="height:100%" :show="loading">
        <div class="login-card">
            <div class="header">
                华北油田销售信息管理系统
            </div>
            <div class="content">
                <n-form ref="formRef" :model="model" :rules="rules" label-width="100" label-placement="top">
                    <n-form-item path="username" label="用户名">
                        <template #label>
                            <span class="login-label"><img src="/user.png" alt="">用户名</span>
                        </template>
                        <n-input placeholder="" v-model:value="model.username" @keydown.enter.prevent="handle" />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <template #label>
                            <span class="login-label"><img src="/password.png" alt="">密码</span>
                        </template>
                        <n-input placeholder="" v-model:value="model.password" type="password"
                            @keydown.enter.prevent="handle" />
                    </n-form-item>
                </n-form>
                <n-button class="login-btn" @click="handle">
                    登录
                </n-button>
            </div>
            <div class="footer">

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
    position: relative;
    width: 668px;
    height: 100vh;
    background: #fff;

    >.header {
        position: absolute;
        top: 207px;
        text-align: center;
        left: 0;
        right: 0;
        margin: 0 auto;
        font-family: "AliMedium";
        font-size: 34px;
        color: #D43030;
        font-weight: 900;
    }

    >.content {
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 360px;
        height: 224px;

        .login-label {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.94);
            font-weight: 600;

            img {
                display: inline;
                margin-right: 10px;
                width: 16px;
                vertical-align: top;
            }
        }

        .n-input-wrapper {
            padding: 0;
            padding-left: 16px;
            padding-right: 16px;
        }

        .n-input {
            height: 52px;
            border: none !important;
            background-color: rgba(248, 248, 248, 1);

            .n-input__input-el {
                height: 52px;
            }
        }

        >.login-btn {
            width: 100%;
            height: 52px;
            border-radius: 6px;
            background: linear-gradient(90deg, rgba(212, 49, 49, 1) 0%, rgba(255, 54, 54, 1) 100%);
            font-size: 16px;
            color: rgba(255, 255, 255, 0.94);
            border: none !important;
        }

    }

    >.footer {
        position: absolute;
        box-sizing: border-box;
        width: 360px;
        top: 580px;
        left: 0;
        right: 0;
        margin: 0 auto;


    }
}
</style>