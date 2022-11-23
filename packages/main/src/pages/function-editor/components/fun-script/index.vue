<template>
  <div class="fun-script-content" >
    <div class="left">
      <div
        v-for="(item, i) in script"
        :key="item.key"
        :class="{
          'script-name': true,
          'action': actionScript === item
        }"
        @click="handleScript(item)"
      >
        {{item.key}}
        <nw-icon
          v-if="item.key !== 'init'"
          name="icon-guanbichuangkou"
          :size="10"
          @click="e => handleDel(e, item, i)"
          class="script-del"
          
        />
      </div>
      <div class="script-add">
        <div class="script-add-btn" @click="handleAddScript">
          <nw-icon name="icon-n-y-add" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="script-params" v-if="actionScript">
        脚本Key:
        <n-input
          size="small"
          style="width: 120px;"
          v-model:value="actionScript.key"
        />
        &nbsp;
        是否异步:
        <n-checkbox
          v-model:checked="actionScript.isAsync"
        />
      </div>
      <div class="code" v-if="actionScript">
        <NwCodeMirror
          v-model:value="actionScript.code"
          :disabled="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

import {

  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NTag,
  NTabs,
  NTabPane,
  NSteps,
  NStep,
  NGrid,
  NTree,
  NButton,
  NConfigProvider,
  NModal,
  NForm,
  NFormItem,
  NFormItemGi,
  NInput,
  NSelect,
  NTreeSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
  NDivider
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { script } from '../../store/index'

import { NwIconPick, NwPickForm, NwCodeMirror } from '@platform/main'

export default defineComponent({
  name: "Basic",
  components: {
      
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NTag,
    NTabs,
    NTabPane,
    NSteps,
    NStep,
    NGrid,
    NTree,
    NButton,
    NConfigProvider,
    NModal,
    NForm,
    NFormItem,
    NFormItemGi,
    NInput,
    NSelect,
    NTreeSelect,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NSpin,
    NDivider,
    NwIcon,
    NwIconPick,
    NwPickForm,
    NwCodeMirror
  },
  setup() {
    const actionScript = ref({})
    actionScript.value = script.value.find(d => d.key === 'init')
    return {
      script,
      actionScript,
      handleScript (r) {
        actionScript.value = r
      },
      handleAddScript () {
        //`script_${scriptList.value.length}`
        const s = {
          key: `script_${script.value.length}`,
          isAsync: false,
          code: ''
        }
        script.value.push(s)
        actionScript.value = s
      },
      handleDel (e, item, i) {
        e.stopPropagation();
        if (actionScript.value === item) {
          actionScript.value = false
        }
        script.value.splice(i,1)
      }
    }
  },
})
</script>

<style lang="less" scoped>
.fun-script-content {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: visible;
  height: 400px;
  border-top: 1px solid #ccc;
  .left {
    width: 160px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .script-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      padding: 3px;
      text-indent: 5px;
      font-weight: bold;
      box-shadow: 2px 2px 4px 0px #333;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .script-del {
      margin-right: 5px;
      color: #ccc;
    }
    .script-del:hover {
      color: #f44336;
    }
    .script-name:hover,.script-name.action {
      box-shadow: inset 2px 2px 4px 0px #333;
    }
    .script-add {
      display: flex;
      justify-content: center;
      &-btn {
        display: flex;
        border: 2px solid #ccc;
        width: 24px;
        height: 24px;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        border-radius: 24px;
        cursor: pointer;
      }
      &-btn:hover {
        box-shadow: inset 2px 2px 4px 0px #333;
      }
    }
  }
  .right {
    flex: 1;
    border-left: 1px solid #ccc;
    .script-params {
      padding: 5px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
