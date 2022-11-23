<template>
    <n-modal
        v-model:show="visible"
        preset="dialog"
        style="width: 260px"
        :showIcon="false"
        :close-on-esc="false"
        :closable="true"
        class="init-modal"
    >
        <template #header>
            <div class="header" >
                <nw-icon :name="icon" :size="20" style="margin-right: 5px;" />
                {{title}}
            </div>
        </template>
        <div class="content">
            <div class="msg-item" v-for="item in messages" :key="item.code" >
                <div>
                    <nw-icon class="loading-rotate" v-if="item.state === 'loading'" name="icon-y-loading" :size="16" />
                    <nw-icon class="msg-item-error" style="color: red" v-else-if="item.state === 'error'" name="icon-n-n-error" :size="16" />
                    <nw-icon class="msg-item-warning" v-else-if="item.state === 'warning'" name="icon-n-n-warning" :size="16" />
                    <nw-icon class="msg-item-success" v-else-if="item.state === 'success'" name="icon-n-n-yes" :size="16" />
                </div>
                <div class="loading-item-text">{{item.text}}</div>
                <div v-if="item.mark" :title="item.mark" style="cursor: pointer" ><nw-icon style="margin-left: 5px;" color="#aaa" name="icon-n-n-mark" :size="16" /></div>
            </div>
        </div>
    </n-modal>
</template>

<script lang='tsx'>

import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
NDrawer,
NDrawerContent,
NLayout,
NLayoutHeader,
NLayoutSider,
NLayoutContent,
NLayoutFooter,
NThemeEditor,
NButton,
NInputGroup,
NInput,
NForm,
NFormItem,
NPopconfirm,
NModal,
NMessageProvider

} from "naive-ui";

import { NwIcon } from '@platform/main'

import {
    visible,
    messages,
    setMsg,
    startInit,
    completeInit,
    icon,
    title,
    enableClose
} from './store'
export default defineComponent({
components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NModal,
    NMessageProvider,
    NwIcon
},
setup(props,context) {
    return {
        visible,
        setMsg,
        messages,
        startInit,
        completeInit,
        icon,
        title,
        enableClose
    };
}
});
</script>
<style lang="less">
.init-modal.n-dialog {
    >.n-dialog__title {
        background: var(--modal-header);
        >.header {
        display: flex;
        font-size: 14px;
        align-items: center;
    }
    }
    .content {
        height: 140px;
        padding: 5px 10px;
        .msg-item {
            display: flex;
            padding: 2px;
            align-items: center;
            .icon {
                margin-right: 5px;
                flex: 0 0 16px;
            }
            &-success {
                color: var(--n-green3)
            }
            &-warning {
                color: var(--n-orange3)
            }
            &-error {
                color: var(--n-red2)
            }
        }
    }
}
@keyframes rotate
{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-rotate {
  animation:rotate .5s linear infinite;
}
</style>