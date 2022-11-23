<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div style="padding: 5px;height: calc(100% - 10px)">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;">
      <NwPickCpts :fullName="cptName" @callback="cptsCallback"/>
      <!-- <n-button type="info" size="small" @click="handleModalShow" >选择</n-button>
      <n-button type="error" size="small" @click="handleClearForm" >清除所有</n-button> -->
    </div>
    <div style="height: calc(100% - 46px);border-bottom: 1px solid #ccc;overflow: hidden">
      <vxe-grid
        class="nw-vxe-grid"
        ref="gridSelectedRef"
        v-bind="gridSelectedOption"
        style="
          border: 1px solid #ccc;
          moz-user-select: -moz-none;
          -moz-user-select: none;
          -o-user-select:none;
          -khtml-user-select:none;
          -webkit-user-select:none;
          -ms-user-select:none;
          user-select:none;
        "
      />
    </div>
  </div>
  <!-- 模态 -->
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    :on-after-enter="updateShow"
  >
    <template #icon>
      <nw-icon name="icon-y-form" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择表单
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-layout has-sider class="nw-modal-layout" style="height: 500px" >
      <n-layout-sider bordered :width="170"  class="nw-modal-layout-sider" >
        <!-- <div class="nw-modal-layout-sider-title">
          表单分类
        </div>
        <vxe-grid
          class="nw-vxe-grid-tree"
          ref="gridFormGroupRef"
          v-bind="gridFormGroupOption"
        /> -->
      </n-layout-sider>
      <n-layout-content>
        <vxe-grid
          class="nw-vxe-grid"
          ref="gridFormRef"
          v-bind="gridOption"
        />
      </n-layout-content>
    </n-layout>
    <div class="nw-modal-action">
      <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button>
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed, getCurrentInstance } from 'vue'
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
} from 'naive-ui'
import { NwIcon, NwPickCpts } from '@platform/main'
import { queryProcdeftype } from '../../../api/index'
import { queryFormById } from '../../../api/index'

import {
  getExtensionRootEl,
  createElement,
  updateProperties
} from '../../../util/index'

import {
  getRootElement,
  actionElBusinessObject,
  getElements
} from "../../../store/bpmn"

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
    NwPickCpts
  },
  props:{
  },
  setup(props){
    // 模态展示
    const visible = ref(false)

    // 表格dom
    const gridSelectedRef = ref(null)
    const gridFormGroupRef = ref(null)
    const gridFormRef = ref(null)
    
    // 表单字段信息
    const formFields = ref([])

    // 数据模型分类
    const modelGroup = ref([])

    // 所有备选表单
    const formsData = ref([])
 
    // 查询条件
    const searchForm = ref({})
    const modelTypeId = ref('')
    // 获取bpmn元素数据
    const netwisdForms = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form')
    if (!netwisdForms.values) netwisdForms.values = []
    const netwisdFormsProxy = ref(netwisdForms.values)
    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms').values

    console.log('netwisdForms==', netwisdForms)
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')

    // 模态已选择的缓存
    const selectedForms = ref([])
    const queryModelType = () => {
      
      request({
        url: `/main/dictTree/childList/MODEL_CLASSIFY`,
        method: 'get',
      }).then(res => {
        modelGroup.value = [
          {
            dictName: '所有',
            kids: res
          }
        ]
        // 展开所有setAllTreeExpand
        nextTick().then(() => {
          gridFormGroupRef.value.setAllTreeExpand(true)
        })
      })
    }
    const queryFormList = () => {
      selectedForms.value = []
      formsData.value = []
      request({
        url: `/main/form/page`,
        method: 'post',
        data: {
          // 这里加入查询条件
          // ...searchForm.value,
          page: {
            current: 1,
            size: 999
          }
        }
      }).then(res => {
        formsData.value = res.records
        // 初始化复制默认勾选

        selectedForms.value = formsData.value.filter(d => netwisdForms.values.find(n => n.id === d.id))
        
      })
    }
    // queryFormList()
    // 表单分类
     const gridFormGroupOption = ref({
      rowId: 'key',
      rowKey: false,
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: true,
      cellCalssName: '',
      treeConfig: {
        // children: 'children',
        indent: 15,
        accordion: false, // 是否手风琴
        line: true, // 是否展示线
        expandAll: true, // 是否展开所有
        // expandRowKeys: ['/', '//src'],
        // lazy: true, // 是否懒加载
        children: 'kids',
        // hasChild: 'hasChild',
      },
      data: modelGroup,
      columns: [
        {
          // field: 'dictName',
          treeNode: true,
          slots: {
            default: ({ row }) => {
              return [
                <div
                style="display:flex;justify-content: space-between;cursor: pointer"
                
                onClick={() => {
                  // modelTypeId: 0,
                  if (row.id) {
                    searchForm.value = {
                      modelTypeId: row.id
                    }
                  } else {
                    searchForm.value = {}
                  }
                  // queryFormList()
                  modelTypeId.value = row.id || ''
                }}
                
                class={{
                  groupFormActive: modelTypeId.value === (row.id || '')
                }}

                >
                  <span>{row.dictName}</span>
                  <div style="display:none">
                  <NButton text size="small" type="error">
                  {{
                  default: () => <NwIcon name="icon-guanbichuangkou" size={8} color="rgb(103, 194, 58)" />,
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
                    
                  </NButton>
                  <NButton text size="small" type="error">
                    
                  {{
                    default: () => <NwIcon name="icon-guanbichuangkou" size={8} color="rgb(103, 194, 58)" />,
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                  </NButton>
                  </div>
                </div>
              ]
            }
          }
        }
      ]
    })
    // 主备选表
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '100%',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: computed(() => {
        if (modelTypeId.value) {
          return formsData.value.filter(d => d.modelTypeId === modelTypeId.value)
        } else {
          return formsData.value
        }
        
      }),
      columns: [
        {
          title: '表单名称',
          field: 'formNameCh',
          width: 130
        },
        {
          title: '表单CODE',
          field: 'formName'
        },
        {
          title: '模型分类',
          field: 'modelTypeName'
        },
        // {
        //   title: '预览',
        //   width: 50,
        //   field: 'modelingId',
        //   fixed: 'right',
        //   slots: {
        //     default: ({row}) => {
        //       return [<NButton
        //         text
        //         color="#1890ff"
        //         onClick={() => {
        //           // 编辑模板
        //           redirectPage(`/main/vue-runtime.html?formId=${row.id}`, true)
        //         }}
        //         style="margin-right: 5px;"
        //       >
        //         {{
        //           default: () => '预览',
        //           // icon: () => <NwIcon name="icon-jigou" />
        //         }}
        //       </NButton>]
        //     }
        //   }
        // },
        {
          field: 'startEnable',
          title: '操作',
          width: 70,
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({row}) => {
              const index = selectedForms.value.indexOf(row)
              if (index >= 0) {
                return [
                  <NButton
                    text
                    type="success"
                    onClick={() => {
                      selectedForms.value.splice(index, 1)
                    }}
                    style="margin-right: 5px;"
                  >
                    {{
                      default: () => '已选择',
                      // icon: () => <NwIcon name="icon-jigou" />
                    }}
                  </NButton>
                ]
              }
              return [
              <NButton
                text
                color="#1890ff"
                onClick={() => {
                  selectedForms.value.push(row)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '选择',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>]
            }
          }
        }
      ]
    })
    // 回显表
    const gridSelectedOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      //data: netwisdFormsProxy,
      data: netwisdForms.values,
      columns: [
        {
          title: '表单字段',
          field: 'formNameCh',
          slots: {
            default: ({row}) => {
              return [
                <div style="display: flex;justify-content: space-between;">
                  <div>
                    {row.nameCh} ({row.nameCh})
                  </div>
                  <div>
                  </div>
                </div>
              ]
            }
          }
        }
      ]
    })

    // 模态
    const handleModalShow = () => {
      visible.value = true
      queryModelType()
      searchForm.value = {}
      //selectedForms 
      // selectedForms.value = 
      queryFormList()
    }
    // 选择完成，赋值到xml
    const handleModalComplete = () => {
      console.log('selectedFor===', selectedForms.value)
      // 选中缓存写入到xml
      actionElBusinessObject.value.extensionElements
      netwisdForms.values.splice(0)
      // createElement
      netwisdForms.values.push(...selectedForms.value.map(d => createElement('netwisd:Form', {
        id: d.id,
        formName: d.formName,
        formNameCh: d.formNameCh,
        pageUrl: (d.formType === 3 || d.formType === 4) ? d.pageUrl : `/html/model/vue-runtime.html?formId=${d.id}`
      })))
      // 清除其他节点
      clearRelationForm(netwisdForms.values)
      // alert(1)
      // gridSelectedRef.value.reloadData(netwisdForms.values)
      visible.value = false
    }
    // 删除xml form
    const handleDelForm = (el) => {
      const index = netwisdForms.values.indexOf(el)
      if (index >= 0) netwisdForms.values.splice(index, 1)
      // 这里关联删除
      clearRelationForm(netwisdForms.values)
      gridSelectedRef.value.reloadData(netwisdForms.values)
    }
    // 清除所有
    const handleClearForm = () => {
      netwisdForms.values.splice(0)
      // 这里关联删除
      clearRelationForm(netwisdForms.values)
      gridSelectedRef.value.reloadData(netwisdForms.values)
    }
    const clearRelationForm = (forms,p) => {
      // forms 中不含有的清除
      getElements(['bpmn:UserTask']).forEach(el => {
        // 获取
        // 需要检测的forms
        const elForms = getExtensionRootEl(el, 'netwisd:Form')
        // 设定新的表单信息
        elForms.id=p.formId
        elForms.formName=p.formName
        elForms.formNameCh=p.formNameCh
        elForms.pageUrl=p.formUrl
        elForms.cptId=p.id
        elForms.cptFullName=p.fullName
        // 清除字段配置
        if (elForms.values) elForms.values.splice(0)
      })
    }

    //递归处理field 转化数据
    const handleFiles =(formFields,pros,mkey) =>{
      if(pros) {
        for(var key in pros) {
          var newKey = mkey + "." + key;
          let field = {
            name: newKey,
            nameCh: pros[key].description,
            javaType: pros[key].type
          }
          formFields.value.push(field)
          //判断类型是arry 则递归
          if(pros[key].type === "array") {
            if(pros[key].items) {
              handleFiles(formFields,pros[key].items.properties,newKey)
            }
          }
          //判断是boject 则递归
          if(pros[key].type === "object") {
            if(pros[key].properties) {
              handleFiles(formFields,pros[key].properties,newKey)
            }
          }
        }

      }
    }
    //转换数据
    const queryFormInfo = async (id) => {
      await queryFormById(id).then(res => {
        let schemaJson = JSON.parse(res.isTransform === 1 ? res.interfaceJsonSchema : res.jsonSchema)
        console.log(schemaJson);
        formFields.value = []
        for(var key in schemaJson)
        {
          //组装XML 数组
          let field = {
            name: key, //schemaJson[key].name,
            nameCh: schemaJson[key].description,
            javaType: schemaJson[key].type
          }
          formFields.value.push(field)
          //判断类型是arry 则递归
          if(schemaJson[key].type === "array") {
            let _key = schemaJson[key].name
            if(schemaJson[_key].items) {
              if(schemaJson[_key].items.properties) {
                handleFiles(formFields,schemaJson[_key].items.properties,key)
              }
            }
          }
          //判断是boject 则递归
          if(schemaJson[key].type === "object") {
            let _key = schemaJson[key].name
            if(schemaJson[_key].properties) {
              handleFiles(formFields,schemaJson[_key].properties,key)
            }
          }
        }
        console.log(formFields);
        console.log(formFields.value);
        // const _netwisdForm = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form')
        netwisdForms.values.splice(0)
        for( var i in formFields.value) {
            var _e = createElement('netwisd:Field', {
                modelFieldId: 1,
                nameCh: formFields.value[i].nameCh,
                javaName: formFields.value[i].name,
                javaType: formFields.value[i].javaType,
                isOrm: "1"
            })
            netwisdForms.values.push(_e)

        }
      })
    }

    const cptName = ref(netwisdForms.formName)
    const setCptName = () => {
      cptName.value = getExtensionRootEl(getRootElement(), 'netwisd:Form').cptFullName;
    };
    return {
      cptName,
      setCptName,
      async cptsCallback(p) {
        // 清除所有字段
        netwisdForms.values.splice(0)
        // 赋值
        netwisdForms.id=p.formId
        netwisdForms.formName=p.formName
        netwisdForms.formNameCh=p.formNameCh
        netwisdForms.pageUrl=p.formUrl
        netwisdForms.cptId=p.id
        netwisdForms.cptFullName=p.fullName
        clearRelationForm(netwisdForms,p)
        await queryFormInfo(p.formId);
        // netwisdForms.values = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form')
        gridSelectedRef.value.reloadData(netwisdForms.values)
        //cptName.value = p.formName//todo 改成取bpmn 方式
        setCptName()
      },
      props,
      gridSelectedRef,
      gridFormGroupRef,
      gridFormRef,
      gridOption,
      gridFormGroupOption,
      gridSelectedOption,
      visible,
      handleModalShow,
      handleModalComplete,
      handleClearForm,
      updateShow (a) {

      }
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
.groupFormActive {
  color: red;
  font-weight: bold;
}
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
}
</style>