<template>
    <n-form
      ref="formRef"
      inline
      label-placement="left"
      :label-width="80"
      :model="SearchForm"
      style="height: 30px;"
    >
      <n-form-item label="Url" path="mthPath">
        <n-input v-model:value="SearchForm.mthPath" placeholder="Url" />
      </n-form-item>
      <n-form-item label="Method" path="mthMethod">
        <!-- <n-input v-model:value="SearchForm.mthMethod" placeholder="Method" /> -->
        <n-select
          style="width: 120px"
          v-model:value="SearchForm.mthMethod"
          :options="[{
            label: '全部',
            value: ''
          },{
            label: 'GET',
            value: 'get'
          },{
            label: 'POST',
            value: 'post'
          },{
            label: 'PUT',
            value: 'put'
          },{
            label: 'DELETE',
            value: 'delete'
          },]"
        />
      </n-form-item>
      <n-form-item label="描述" path="mthDescription">
        <n-input v-model:value="SearchForm.mthDescription" placeholder="描述" />
      </n-form-item>
      <n-form-item>
        <n-button
          type="info"
          attr-type="button"
          style="margin-right: 5px;"
          @click="handleSearch"
        >
          查询
        </n-button>
        <n-button
          type="warning"
          attr-type="button"
          @click="handleReset"
        >
          重置
        </n-button>
      </n-form-item>
    </n-form>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NForm,
  NFormItem,
  NInputGroup,
  NInput,
  NButton,
  NSelect,
  NSpin,
  NModal,
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import {
  SearchForm,
  tableRef
} from '../../store'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NSelect,
    NwIcon
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    return {
      SearchForm,
      handleSearch () {
        tableRef.value.commitProxy("query");
      },
      handleReset () {
        SearchForm.value = {
          mthPath: '',
          mthMethod: '',
          mthDescription: ''
        }
        tableRef.value.commitProxy("query");
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>