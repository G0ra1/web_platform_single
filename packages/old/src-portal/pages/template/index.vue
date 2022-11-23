<template>
  <n-layout class="nw-page" ref="pageRef">
    <n-layout-header>
      <div class="nw-page-header-right">
        <!-- <n-input-group v-if="!($refs.nwTable ? $refs.nwTable.searchFormActive : false)" style="width: 240px">
          <n-input placeholder="输入搜索内容" size="small" :style="{ width: '190px' }" />
          <n-button  size="small" type="primary" ghost>搜索</n-button>
        </n-input-group>
        <n-button
        ghost
        style="background: #fff;color: #000" size="small"
        @click="show()"
        >高级搜索</n-button>-->
        <NwTableFun :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <NwTable
        ref="nwTable"
        :columns="columns"
        :data="null"
        :request="request"
        :response="response"
        :searchFormFields="[{
          field: 'roleName',
          title: 'name',
          valueFormat: d => d
        }]"
      >
        <template v-slot:header-left="{ selected }">
          <n-button type="info" size="small" style="margin-right: 5px;" @click="handleCreate">新建模板</n-button>
          <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            style="margin-right: 5px;"
          >修改</n-button>-->
          <n-button
            :disabled="selected.length === 0"
            size="small"
            @click="deleteTemplate(selected)"
          >删除</n-button>
          <!-- <n-button size="small" @click="dicParams.x = 100">test</n-button> -->
          <!-- <nw-dictionary
              :request-xhr="dicReq"
              :request-params="dicParams"
              :response-method="res => res.records.map(({id: value, templateName: label}) => ({label, value}))"
          />-->
        </template>
        <template #header-right>
          <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
          <n-button type="info" size="small">其他</n-button>-->
        </template>
        <template v-slot:search-form="{ searchFormData }">
          <n-form :model="searchFormData">
            <n-form-item path="roleName" label="name">
              <n-input v-model:value="searchFormData.roleName" @keydown.enter.prevent />
            </n-form-item>
          </n-form>
          <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
          <n-button type="info" size="small">其他</n-button>-->
        </template>
      </NwTable>
      <VersionList :to="pageRef && pageRef.$el" ref="versionListRef" />
    </n-layout-content>
  </n-layout>
</template>

<script lang="jsx">
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  // console.log('===ej2btn===', GridComponent);
  import { h, defineComponent, ref, reactive } from 'vue'
  import {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NSpace,
    useMessage,
    useDialog
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '/@/components/nw-table/index.vue'
  import {
    query,
    create,
    edit,
    //del,
    deleteTemplate
  } from './api'
  import redirectPage from '/@/plugins/redirect-page'
  import NwDictionary from '/@/components/nw-dictionary/index.vue'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import db from '/@/utils/db.js'
  import VersionList from './versionList.vue'
  // import {
  //   stratify as d3Stratify
  // } from 'd3'
  // console.log('d3Stratify', d3Stratify);
  export default defineComponent({
    components: {
      NSpace,
      NwDictionary,
      NDrawer,
      NDrawerContent,
      NwTable,
      NButton,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NInputGroup,
      NInput,
      NwTableFun,
      NForm,
      NFormItem,
      NwIcon,
      VersionList
    },
    setup () {
      
      const pageRef = ref(null)
      const message = useMessage()
      const dialog = useDialog()
      const nwTable = ref(null)
      const dicParams = reactive({})
      const versionListRef = ref(null)

      const sendDeleteTemplate = (row) => {
        // 这里加入确认

        // del(selected.map(d => d.id).join(',')).then(r => {
        //   message.success('删除成功')
        // }).catch(err => {
        //   message.error('删除失败')
        //   console.log('err===', err)
        // })
        const {
          portalId,
          templateCode,
          terminal
        } = row
        const delDialog = dialog.warning({
        title: '删除警告',
        content: () => '您即将删除整个门户模板，可能包含多个子版本',
        positiveText: '确认',
        onPositiveClick: () => {
          delDialog.loading = true
          return new Promise((resolve) => {
            deleteTemplate({
              portalId,
              templateCode,
              terminal
            }).then(res => {
              console.log('====res==', res)
              if (res) {
                message.success('删除成功')
              } else {
                message.error('删除失败')
              }
            }).catch(err => {
              message.error('删除失败')
            }).finally(() => {
              delDialog.loading = false
              nwTable.value.commitProxy('query')
              resolve()
            })
          })
        }
      })
      }
      // 判断是否存在缓存
      return {
        pageRef,
        formVisible: ref(false),
        // dicReq: query,
        dicParams,
        sendDeleteTemplate,
        request: {
          XHR: query, // promise 请求函数
          params: {},
          pageMethod: (current, size) => ({ // 分页
          page:{
            current,
            size
          }
           
          }),
        },
        // 接口相应
        response: {
          dataMethod: res => res.records,
          pageMethod: ({ total }) => (total)
        },
        nwTable,
        versionListRef,
        columns: reactive([
          // { type: 'radio', width: 35 },
          { type: 'checkbox', width: 35 },
          // { type: 'seq', width: 40 },
          { field: 'templateName', title: '模板名称', width: 250  },
          { field: 'templateCode', title: '模板编码', width: 250  },
          { field: 'portalName', title: '所属门户', width: 250  },
          { field: 'templateVersion', title: '当前版本', showHeaderOverflow: true, width: 80 },
          {
            field: 'terminal',
            title: '终端',
            showHeaderOverflow: true,
            width: 50,
            slots: {
              default: ({row}) => {
                return row.terminal ? '移动' : 'PC'
              }
            }
          },
          { field: 'createUserName', title: '创建人', showHeaderOverflow: true, width: 100 },
          { field: 'createTime', title: '创建时间', showHeaderOverflow: true, width: 150 },
          {
            field: 'startEnable',
            title: '启用',
            showHeaderOverflow: true,
            width: 50,
            slots: {
              default: ({row}) => {
                return row.startEnable ? '启用' : '停用'
              }
            }
          },
          {
            field: 'startEnable',
            title: '操作',
            showHeaderOverflow: true,
            width: 150,
            fixed: 'right',
            slots: {
              default: ({row}) => {
                return [<NButton
                  text
                  color="#1890ff"
                  onClick={() => {
                    // 编辑模板
                    redirectPage(`portal/template-render.html?templateId=${row.id}#/index`, true)
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => '预览',
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>,
                <NButton
                  text
                  color="#1890ff"
                  onClick={() => {
                    // 编辑模板
                    redirectPage(`portal/template-editor.html?action=edit&id=${row.id}`)
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => '编辑',
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>,
                <NButton
                  text
                  color="#1890ff"
                  onClick={() => {
                    versionListRef.value.show(row)
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => '版本',
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>,
                <NButton
                  text
                  color="#1890ff"
                  onClick={() => {
                    sendDeleteTemplate(row)
                  }}
                >
                  {{
                    default: () => '删除',
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>]
              }
            }
          }
        ]),
        handleCreate () {
          // 缓存
          // 清除缓存
          // db.remove('PROTAL_TEMPLATE_CACHE')
          // //
          // db.set('PROTAL_TEMPLATE_CACHE', {
          //   time: new Date().getTime(), // 
          //   actionCode: 'create'
          // })
          redirectPage(`portal/template-editor.html?action=create`)
          // 跳转到编辑器
          // create({
          //   portalId: 123456,
          //   portalName: "门户1",
          //   remark: "portalTest1",
          //   startEnable: 1,
          //   templateCode: "portalTest1",
          //   templateData: JSON.stringify({ test: 1 }),
          //   templateName: '测试1',
          //   // templateVersion: 0,
          //   terminal: 0,
          // }).then(res => {
          //   console.log('res', res);
          // })
          // 
        }
      }
    }
  })
</script>