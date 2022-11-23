<template>
    <div class="attributes-sider">
      <div class="attributes-sider-header">
        <div class="title">样式</div>
        <div class="extra">
          
        </div>
      </div>
      <n-form
        class="attributes-sider-form"
        ref="formRef"
        size="small"
      >
        <template v-for="( [ key ] ) in items" :key="key">
          <n-form-item
            v-if="conf[key]"
            :label="`${conf[key].label}${conf[key].unit ? ` (${conf[key].unit})` : ''}`"
          >
            <n-input
              size="small"
              :value="conf[key].get(style[key])"
              @update:value="d => style[key] = conf[key].set(d)"
            />
          </n-form-item>
          <n-form-item
            v-else
            :label="conf[key].label"
          >
            <n-input
              size="small"
              v-model:value="style[key]"
            />
          </n-form-item>
        </template>
        
      </n-form>
    </div>
</template>
<script lang="jsx">
  import { h, reactive, ref, watch, nextTick, computed } from 'vue'
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
    attributesSiderMod
  } from '../../../store'
  import conf from './conf.js'

  export default {
    props: {
        value:{
            type: Object,
            default: () => ({})
        }
    },
    components: {
      NConfigProvider,
      NForm,
      NFormItem,
      NInput,
      NwIcon
    },
    setup (props) {
      const style = ref({})
      let styleAttr
      watch(attributesSiderMod, () => {
        if (!attributesSiderMod.value) return
        console.log('===attributesSiderMod===', attributesSiderMod.value)
        styleAttr = attributesSiderMod.value.attributes.find(d => d.key === ':style')
        if (styleAttr) {
          style.value = new Function(`return ${styleAttr.value}` )()
        }
        console.log('===style===', style)
      })
      watch(style, () => {
        console.log('======stylestyle========', style)
        styleAttr.value = JSON.stringify(style.value)
      }, {
        deep: true
      })
      return {
        conf,
        style,
        items: computed(() => Object.entries(style.value))
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