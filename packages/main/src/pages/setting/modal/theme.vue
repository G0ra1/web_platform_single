<template>
  <n-modal v-model:show="isShow" :mask-closable="false">
    <n-card
      style="width: 600px"
      title="设置风格"
      :bordered="false"
      size="small"
    >
      <template #header-extra></template>
      <n-form
        :label-width="80"
        size="medium"
        ref="formRef"
        style="margin: 0 50px; width: 400px"
      >
        <n-form-item path="phone">
          <n-radio-group v-model:value="value">
            <n-radio
            v-for="item in Themes"
            :key="item.themeName"
            :value="item.themeName" 
            >
              {{ item.themeLabel }}
            </n-radio>
          </n-radio-group>
        </n-form-item>
      </n-form>
      <template #footer>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <div>
          </div>
          <div style="text-align: right">
            <n-button
              size="small"
              type="primary"
              style="margin-right: 5px"
              @click="verificationCodeFn"
              >修改</n-button
            >
            <n-button size="small" @click="isShow = false"
              >关闭</n-button
            >
          </div>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, computed, nextTick } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NAlert,
  NForm,
  NFormItem,
  NCard,
  NSpin,
  NInput,
  NInputGroup,
  NRadioGroup,
  NRadio,
  NButton,
  NList,
  NListItem,
  NSelect,
  NModal,

  useMessage
} from "naive-ui";
import { NwIcon, Db } from '@platform/main'
import { setTheme, Themes } from '../../../theme/index'

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NAlert,
    NForm,
    NFormItem,
    NCard,
    NSpin,
    NInput,
    NInputGroup,
    NRadioGroup,
    NRadio,
    NButton,
    NwIcon,
    NList,
    NListItem,
    NSelect,
    NModal,
  },
  emits: ['callback'],
  setup(props, context) {
    // 模态框 显示控制
    const isShow = ref(false);
    const value = ref('');
    return {
      Themes,
      isShow,
      value,
      show () {
        isShow.value = true
        value.value = window.localStorage.getItem('theme')
      },
      verificationCodeFn () {
        setTheme(value.value)
        isShow.value = false
        context.emit('callback')
      }
    }
  }
});
</script>
<style lang='less'>
.pwd-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  &-label {
  }
}
.pwd-level {
  &-text {
    font-size: 12px;
  }
  &-proc {
    position: relative;
    width: 100px;
    height: 5px;
    background: #fff;
    border: 1px solid #333;
    &-fill {
      position: absolute;
      left: 0px;
      width: 0px;
      height: 5px;
      background: #ffeb3b;
    }
  }
}
.yanzheng {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2ea4fa;
  cursor: pointer;
  position: relative;
  z-index: 99;
}
.yanzhengmadis {
  color: #ccc;
}
.yanzhengmatishi {
  text-align: right;
  margin-top: -30px;
  padding-right: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 48px;
}
</style>