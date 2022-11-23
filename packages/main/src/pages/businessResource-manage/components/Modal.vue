<template>
  <n-drawer v-model:show="active" width="100%" :placement="'right'">
    <n-drawer-content>
      <template #header>
        <nw-icon style="margin-right: 5px;" :size="25" name="icon-n-y-newpage" />
        权限配置
      </template>
      <!-- 这里使用步骤 -->
      <n-form ref="formRef" label-width="auto" label-align="left" label-placement="left"
        style="width: 600px;padding:50px 0;margin: 0 auto">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="页面类型" path="inputValue">
            <div class="nw-tile-group">
              <div class="nw-tile active">
                <div class="nw-tile-icon">
                  <nw-icon name="icon-y-formpage" :size="25" />
                </div>
                <div class="nw-tile-text">
                  表单
                </div>
              </div>
              <div class="nw-tile">
                <div class="nw-tile-icon">
                  <nw-icon name="icon-y-formpage" :size="25" />
                </div>
                <div class="nw-tile-text">
                  一般页面
                </div>
              </div>
            </div>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="名称" path="inputValue">
            <n-input placeholder="输入名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="是否启用" path="inputValue">

            <n-switch />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="编码" path="inputValue">
            <n-input placeholder="输入编码" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="Url" path="inputValue">
            <n-input placeholder="输入Url" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="备注" path="inputValue">
            <n-input type="textarea" placeholder="输入备注" />
          </n-form-item-gi>
        </n-grid>

        <n-divider title-placement="left">
          表单配置
        </n-divider>
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24" label="新增接口" path="inputValue">
            <n-input placeholder="输入Url" style="margin-right: 5px;" />
            <n-button @click="active = false">
              &nbsp;选择&nbsp;
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="删除接口" path="inputValue">
            <n-input placeholder="输入Url" style="margin-right: 5px;" />
            <n-button @click="active = false">
              &nbsp;选择&nbsp;
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="编辑接口" path="inputValue">
            <n-input placeholder="输入Url" style="margin-right: 5px;" />
            <n-button @click="active = false">
              &nbsp;选择&nbsp;
            </n-button>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="查询接口" path="inputValue">
            <n-input placeholder="输入Url" style="margin-right: 5px;" />
            <n-button @click="active = false">
              &nbsp;选择&nbsp;
            </n-button>
          </n-form-item-gi>
        </n-grid>
        <!-- NwSchemaEditor -->
        <n-divider title-placement="left">
          参数配置
        </n-divider>
        <nw-schema-editor />
      </n-form>
      <template #footer>
        <n-button @click="active = false">
          &nbsp;取消&nbsp;
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import type { Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import type { SearchForm } from '../model.d'
import {
  NLayout,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NSelect,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NDivider,
  NSwitch
} from 'naive-ui'
import { query } from '../api'
import {
  NwIcon,
  NwSchemaEditor,
  RequestPaging,
  VxeHelper
} from '@platform/main'

export default defineComponent({
  components: {
    NLayout,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NSelect,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NDivider,
    NSwitch,
    NwSchemaEditor
  },
  setup() {
    const active = ref<boolean>(false)

    const show = () => {
      active.value = true
    }
    const cancel = () => {
      active.value = false
    }
    return {
      show,
      cancel,
      active,
    }
  }
})

</script>

<style lang="less" scoped>
.nw-tile {
  &-group {
    display: flex;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  width: 80px;
  cursor: pointer;
  padding: 5px;

  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px
  }

  &-text {
    font-size: 12px;
    text-align: center;
  }

  &.active {
    border: 2px solid #238551;
  }
}
</style>
