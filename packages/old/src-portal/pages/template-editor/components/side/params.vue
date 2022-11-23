<template>
  <n-config-provider abstract :theme-overrides="theme">
    <div class="attributes-sider">
      <div class="attributes-sider-header">
        <div class="title">属性</div>
        <div class="extra">
          <nw-icon
            name="icon-guanbichuangkou"
            color="#ccc"
            :size="12"
            @click="handleClose"
          />
        </div>
      </div>
      <n-form
        class="attributes-sider-form"
        v-if="attributesSiderMod"
        ref="formRef"
        size="small"
      >
        <n-form-item
          v-for="( item, key ) in attributesSiderMod.attributes.filter(d => d.key !== ':style')"
          :key="key"
          path="age"
          :label="item.key"
        >
          <n-input
            size="small"
            v-model:value="item.value"
          />
        </n-form-item>
      </n-form>
      <style-editor />
    </div>
  </n-config-provider>
</template>
<script lang="jsx">
  import { h, reactive, ref, watch, nextTick } from 'vue'
  import {
    NTree,
    NButton,
    NConfigProvider,
    NForm,
    NFormItem,
    NInput,
  } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import {
    attributesSiderMod,
    attributesSiderCollapsed
  } from '../../store'
  import ManageDialog from '../dialog/index.vue'
  import theme from '../dialog/theme.js'
  import { componentInstance } from '../../view/design/components/index.js'
  import StyleEditor from './style-editor/index.vue'
  console.log('partcomponents=', componentInstance)
  export default {
    props: {
    },
    components: {
      NConfigProvider,
      NForm,
      NFormItem,
      NInput,
      NwIcon,
      StyleEditor
    },
    setup () {

      watch(attributesSiderMod, () => {

        const conf = componentInstance[attributesSiderMod.tagName]
        console.log('===conf===', conf, attributesSiderMod)
      })
      return {
        theme,
        attributesSiderMod,
        componentInstance,
        handleClose () {
          attributesSiderCollapsed.value = true
          attributesSiderMod.value = null
        }
      }
    }
  }
</script>
<style lang='less'>
.attributes-sider {
  &-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #838383;
    padding: 3px;
    >.title {
      font-size: 14px;
      color: #ccc;
      font-weight: bold;
    }
  }
  &-form {
    margin: 5px;
  }
}
</style>