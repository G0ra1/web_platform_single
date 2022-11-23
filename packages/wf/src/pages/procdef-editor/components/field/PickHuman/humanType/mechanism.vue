<template>
  <mechanism-grid
    :value="selected"
    @callback="callback"
  />
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSelect,
  NSwitch
} from 'naive-ui'

import {
  Grid as VxeGrid
} from 'vxe-table'

import { NwIcon } from '@platform/main'
import { queryOrg } from '../../../../api/index'

import {
  getExtensionRootEl,
  createElement
} from '../../../../util/index'

import {
  actionElBusinessObject,
  getRootElement
} from '../../../../store/bpmn'
import { get } from 'lodash'

import {
  MechanismCache
} from '../../../../store/cache-human'

import MechanismGrid from '../components/mdmGrid/mechanism.vue'

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSwitch,
    MechanismGrid
  },
  props:{
  },
  emits: ["callback"],
  setup(props, context){
    const selected = computed(() => {
      return MechanismCache.value.bizId.split(',').filter(d => d)
    })
    const callback = (f, id, name) => {
      // alert(`${f}${id}${name}`)
      const ids = MechanismCache.value.bizId.split(',').filter(d => d)
      const names = MechanismCache.value.bizText.split(',').filter(d => d)
      const index = ids.indexOf(id)
      if (f) {
        // 加入
        if (index < 0) {
          ids.push(id)
          names.push(name)
        }
      } else {
        // 消除
        if (index >= 0) {
          ids.splice(index, 1)
          names.splice(index, 1)
        }
      }
      MechanismCache.value.bizId = ids.join(',')
      MechanismCache.value.bizText = names.join(',')
      
      MechanismCache.value.expreName = `机构(${ids.length})`
    }
    return {
      selected,
      callback
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../style/vxe-table-tree.less";
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}
:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}
</style>