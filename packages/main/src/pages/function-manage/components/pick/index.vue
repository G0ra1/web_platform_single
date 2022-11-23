<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <!-- <div style="padding: 5px;height: calc(100% - 10px)">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;align-items:center">
      <n-input
        size="small"
        :value="props.fullName"
        disabled
        placeholder=""
      />
      <n-button type="info" size="small" style="margin-left: 5px;" @click="handleModalShow" >选择</n-button>
    </div>
  </div> -->
  <div>
    <div style="display: flex;justify-content: space-between;padding: 5px 0;align-items:center">
      <n-input
        size="small"
        :value="props.fullName"
        disabled
        placeholder=""
      />
    <n-button type="info" size="small" style="margin-left: 5px;" @click="handleModalShow" >选择</n-button>
    </div>
  </div>
  <!-- 模态 -->  
  <n-config-provider
    abstract
    :theme-overrides="theme"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择功能
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-layout class="nw-modal-layout" >
      
      <n-layout-content>
        <vxe-grid
          class="nw-vxe-grid"
          ref="gridRef"
          v-bind="gridOption"
        />
      </n-layout-content>
    </n-layout>
    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div>
  </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NConfigProvider,
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
} from 'naive-ui'
import { NwIcon, request } from '@platform/main'

export default {
  components: {
    NConfigProvider,
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
    NwIcon
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [ 'callback', 'update:value', 'update:formId', 'update:fullName', 'update:shortName' ],
  setup(props, context){
    // 模态展示
    const visible = ref(false)

    const gridRef = ref(null)


    // 所有备选表单
    const formsData = ref([])
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')

    // 模态已选择的缓存
    const selectedForms = ref([])

    const cptsHash = ref({})
    const queryFormList = () => {
      selectedForms.value = []
      formsData.value = []
      request({
        url: `/main/mdmCpts/lists`,
        method: 'post',
        data: {}
      }).then(res => {
        console.log('====res====', res)
        const formHash = {}
        res.forEach((d) => {
          cptsHash.value[d.id] = d
          if(!formHash[d.formId]) {
            formHash[d.formId] = {
              formId: d.formId,
              formName: d.formName,
              formNameCh: d.formNameCh,
              formUrl: d.formUrl,
              cpts: []
            }
          }
          formHash[d.formId].cpts.push(d)
        })
        // formsData.value.
        // 初始化复制默认勾选
        formsData.value = Object.values(formHash)
        console.log('===formsData.value===', formsData.value)
      })
    }
    // 主备选表
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      expandConfig: {
        expandAll: true
      },
      data: formsData,
      columns: [
        {
          title: '表单名称',
          showOverflow: 'title',
          minWidth: 200,
          type: 'expand',
          slots: {
            default: ({row}) => {
              return  `${row.formNameCh}`
            },
            content: ({row}) => {


              return <div class="cpts-list">
                {row.cpts.length ? row.cpts.map(d => (
                <div class={{
                  'cpt-item': true,
                  'active': props.value === row.id
                }}
                  onClick={() => {
                    handleModalComplete(d)
                  }}
                >
                  
                  <div class="cpt-item-icon">
                    <NwIcon size={60} name={d.icon} />
                  </div>
                  <div class="cpt-item-text">
                    {d.shortName}
                  </div>
                </div>
                )) : <div>
                  没有其他版本
                </div>}
              </div>
            }
          }
        }
      ]
    })

    // 模态
    const handleModalShow = () => {
      visible.value = true
      //selectedForms 
      // selectedForms.value = 
      queryFormList()
    }
    // 选择完成，赋值到xml
    const handleModalComplete = (row) => {
      console.log(row)
      context.emit('update:value', row.id)
      context.emit('update:formId', row.formId)
      context.emit('update:fullName', row.fullName)
      context.emit('update:shortName', row.shortName)
      //callback
      context.emit('callback', row)
      visible.value = false
    }
    return {
      props,
      gridRef,
      gridOption,
      visible,
      handleModalShow,
      handleModalComplete,
      
      theme: {
                  
        Button: {
          heightSmall: '20px',
          fontSizeSmall: '12px',
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        },
        Dialog: {
          // color: '#2b2b2b',
          // titleTextColor: '#ccc',
          iconMargin: '0 3px 0 0',
          titleFontSize: '14px',
          titleFontWeight: 'bold',
          titleTextColor: '#5e5e5e',
          iconSize: '14px',
          padding: '2px 5px',
          closeSize: '14px',
          closeMargin: '5px',
          contentMargin: '0',
          // textColor: '#ccc'
        },
        Modal: {
          boxShadow: '1px 0px 7px 1px #00000060',
          // textColor: '#ccc'
        }
      }
    }
  }
}
</script>

<style lang='less' >
.cpts-list {
  display: flex;
  justify-content: start;
  .cpt-item {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: center;
    width: 100px;
    box-shadow: 2px 2px 0px 0px #607d8b;
    overflow: hidden;
    cursor: pointer;
    &-icon {
      // display: flex;
      // justify-content: center;
      // margin-right: 10px;
      position: absolute;
      top: -10px;
      left: 0px;
      opacity: .2;
    }
    &-text {
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      word-wrap: break-word;
    }
    &:hover {
      box-shadow: 0px 0px 3px 3px #607d8b;
    }
    &.active {
      box-shadow: inset 2px 2px 0px 0px #607d8b;
    }
  }
}
</style>