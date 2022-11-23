<template>
  <n-spin :show="isLoading">
    <n-layout class="nw-page data-nw-page">
      <n-layout-header>
        <h1>数据源维护</h1>
        <div class="nw-page-header-right">
          <NwTableFun :table="nwTable"></NwTableFun>
        </div>
      </n-layout-header>
      <n-layout-content>
        <n-tabs
          default-value="relational"
          @update:value="handleUpdateValue"
          size="large"
        >
          <n-tab-pane name="relational" tab="关系数据源">
            <NwTable
              ref="nwTable"
              :columns="columns"
              :data="null"
              :request="request"
              :response="response"
              :searchFormFields="[
                {
                  field: 'roleName',
                  title: 'name',
                  valueFormat: (d) => d,
                },
              ]"
            >
              <template v-slot:header-left="{ selected }">
                <n-button
                  type="info"
                  size="small"
                  style="margin-right: 5px"
                  @click="
                    () => {
                      addAction.sonFn();
                      contentTile = '新建数据源';
                    }
                  "
                  >添加</n-button
                >
                <n-button
                  :disabled="selected.length !== 1"
                  size="small"
                  style="margin-right: 5px"
                  @click="handEdit(selected)"
                  >修改</n-button
                >
                <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="handDel(selected)"
            >删除</n-button
              >-->
                <n-popconfirm
                  style="margin-right: 5px"
                  @positive-click="handDel(selected)"
                  positive-text="确定"
                  negative-text="取消"
                >
                  <template #trigger>
                    <n-button :disabled="selected.length !== 1" size="small"
                      >删除</n-button
                    >
                  </template>
                  {{ `是否确定删除此${selected.length}条数据` }}
                </n-popconfirm>
              </template>
              <template #header-right>
                <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
              <n-button type="info" size="small">其他</n-button>-->
              </template>
              <template v-slot:search-form="{ searchFormData }">
                <n-form :model="searchFormData">
                  <n-form-item label="数据源名称" path="poolName">
                    <n-input
                      placeholder="请输入数据源名称"
                      v-model:value="searchFormData.poolName"
                    />
                  </n-form-item>
                </n-form>
              </template>
            </NwTable>
          </n-tab-pane>
          <n-tab-pane name="fileStore" tab="文件数据源">
            <NwTable
              ref="nwTable"
              :columns="fileColumns"
              :data="null"
              :request="dsListRequest"
              :response="response"
              :searchFormFields="[
                {
                  field: 'roleName',
                  title: 'name',
                  valueFormat: (d) => d,
                },
              ]"
            >
              <template v-slot:header-left="{ selected }">
                <n-button
                  type="info"
                  size="small"
                  style="margin-right: 5px"
                  @click="
                    () => {
                      addAction.sonFn();
                      contentTile = '新建数据源';
                    }
                  "
                  >添加</n-button
                >
                <n-button
                  :disabled="selected.length !== 1"
                  size="small"
                  style="margin-right: 5px"
                  @click="handEdit(selected)"
                  >修改</n-button
                >
                <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="handDel(selected)"
            >删除</n-button
              >-->
                <n-popconfirm
                  style="margin-right: 5px"
                  @positive-click="handDel(selected)"
                  positive-text="确定"
                  negative-text="取消"
                >
                  <template #trigger>
                    <n-button :disabled="selected.length !== 1" size="small"
                      >删除</n-button
                    >
                  </template>
                  {{ `是否确定删除此${selected.length}条数据` }}
                </n-popconfirm>
              </template>
              <template #header-right>
                <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
              <n-button type="info" size="small">其他</n-button>-->
              </template>
              <template v-slot:search-form="{ searchFormData }">
                <n-form :model="searchFormData">
                  <n-form-item label="数据源名称" path="poolName">
                    <n-input
                      placeholder="请输入数据源名称"
                      v-model:value="searchFormData.poolName"
                    />
                  </n-form-item>
                </n-form>
              </template>
            </NwTable>
          </n-tab-pane>
          <n-tab-pane name="msgConsumer" tab="MQ消费端">
            <NwTable
              ref="nwTable"
              :columns="msgConsumerColumns"
              :data="null"
              :request="msgConsumerRequest"
              :response="response"
              :searchFormFields="[
                {
                  field: 'roleName',
                  title: 'name',
                  valueFormat: (d) => d,
                },
              ]"
            >
              <template v-slot:header-left="{ selected }">
                <n-button
                  type="info"
                  size="small"
                  style="margin-right: 5px"
                  @click="
                    () => {
                      addAction.sonFn();
                      contentTile = '新建数据源';
                    }
                  "
                  >添加</n-button
                >
                <n-button
                  :disabled="selected.length !== 1"
                  size="small"
                  style="margin-right: 5px"
                  @click="handEdit(selected)"
                  >修改</n-button
                >
                <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="handDel(selected)"
            >删除</n-button
              >-->
                <n-popconfirm
                  style="margin-right: 5px"
                  @positive-click="handDel(selected)"
                  positive-text="确定"
                  negative-text="取消"
                >
                  <template #trigger>
                    <n-button :disabled="selected.length !== 1" size="small"
                      >删除</n-button
                    >
                  </template>
                  {{ `是否确定删除此${selected.length}条数据` }}
                </n-popconfirm>
              </template>
              <template #header-right>
                <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
              <n-button type="info" size="small">其他</n-button>-->
              </template>
              <template v-slot:search-form="{ searchFormData }">
                <n-form :model="searchFormData">
                  <n-form-item label="数据源名称" path="poolName">
                    <n-input
                      placeholder="请输入数据源名称"
                      v-model:value="searchFormData.poolName"
                    />
                  </n-form-item>
                </n-form>
              </template>
            </NwTable>
          </n-tab-pane>
          <n-tab-pane name="msgProducer" tab="MQ生产端">
            <NwTable
              ref="nwTable"
              :columns="msgProducerColumns"
              :data="null"
              :request="msgProducerRequest"
              :response="response"
              :searchFormFields="[
                {
                  field: 'roleName',
                  title: 'name',
                  valueFormat: (d) => d,
                },
              ]"
            >
              <template v-slot:header-left="{ selected }">
                <n-button
                  type="info"
                  size="small"
                  style="margin-right: 5px"
                  @click="
                    () => {
                      addAction.sonFn();
                      contentTile = '新建数据源';
                    }
                  "
                  >添加</n-button
                >
                <n-button
                  :disabled="selected.length !== 1"
                  size="small"
                  style="margin-right: 5px"
                  @click="handEdit(selected)"
                  >修改</n-button
                >
                <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="handDel(selected)"
            >删除</n-button
              >-->
                <n-popconfirm
                  style="margin-right: 5px"
                  @positive-click="handDel(selected)"
                  positive-text="确定"
                  negative-text="取消"
                >
                  <template #trigger>
                    <n-button :disabled="selected.length !== 1" size="small"
                      >删除</n-button
                    >
                  </template>
                  {{ `是否确定删除此${selected.length}条数据` }}
                </n-popconfirm>
              </template>
              <template #header-right>
                <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
              <n-button type="info" size="small">其他</n-button>-->
              </template>
              <template v-slot:search-form="{ searchFormData }">
                <n-form :model="searchFormData">
                  <n-form-item label="数据源名称" path="poolName">
                    <n-input
                      placeholder="请输入数据源名称"
                      v-model:value="searchFormData.poolName"
                    />
                  </n-form-item>
                </n-form>
              </template>
            </NwTable>
          </n-tab-pane>
        </n-tabs>
      </n-layout-content>
      <AddAction ref="addAction" @callBck="callBck"></AddAction>
      <n-modal
        v-model:show="msgParamsModal"
        :mask-closable="false"
        preset="dialog"
        title="参数设置"
        content="你确认"
        positive-text="确认"
        negative-text="取消"
        style="width: 500px"
      >
        <n-form :model="model" label-placement="left" label-width="40">
          <n-form-item
            v-for="(item, i) in paramsList"
            :key="i"
            :label="item"
            :path="item"
          >
            <n-input
              size="small"
              :placeholder="`请输入${item}`"
              v-model:value="params[item]"
            />
          </n-form-item>
        </n-form>
        <template #action>
          <div style="padding: 0 5px 5px 0">
            <n-button
              size="small"
              type="default"
              style="margin-right: 5px"
              @click="msgParamsModal = false"
              >取消</n-button
            >
            <n-button
              size="small"
              type="info"
              style="margin-right: 5px"
              @click="msgParamsConfirm"
              >确定</n-button
            >
          </div>
        </template>
      </n-modal>
    </n-layout>
  </n-spin>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  NSelect,
  useMessage,
  NTabs,
  NTabPane,
  NSpin,
  NModal

} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { list, add, edit, del, details, check, fileDsList, fileDsDetails  } from "./api";
import {setDefault,fileDsdel} from './api/fileDs.js'
import {consumerdel, changeConsumerStatus,consumerPage,consumerDetails} from './api/consumer.js'
import {producerdel, changeProducerStatus,producerPage,producerDetails,producerSend} from './api/producer.js'

import {cloneDeep}  from 'lodash'
import AddAction from "./addAction.vue";

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwTable,
    NSelect,
    NwTableFun,
    AddAction,
    NTabs,
    NTabPane,
    NSpin,
    NModal
  },
  setup() {
    const nwTable = ref(null);
    const message = useMessage();
    const formVisible= ref(false);
    const model = reactive({})
    const addAction = ref()
    const Form = ref(null)
    const contentTile = ref('新建数据源')
    const portalOptions = ref([]);
    const partOptions = ref([]);
    const tabVlue = ref('relational');
    const handEdit  = (selected)=>{
      if(tabVlue.value == 'relational'){
        details(selected[0].id).then(res=>{
          addAction.value.sonFn(res)
        })   
      }else if(tabVlue.value == 'fileStore'){
        fileDsDetails(selected[0].id).then(res=>{
          addAction.value.sonFn(res)
        })   
      }else if(tabVlue.value == 'msgConsumer'){
        consumerDetails(selected[0].id).then(res=>{
          addAction.value.sonFn(res)
        })   
      }else if(tabVlue.value == 'msgProducer'){
        producerDetails(selected[0].id).then(res=>{
          addAction.value.sonFn(res)
        })   
      }    
    }
    const handDel = (selected)=>{
      let id = selected[0].id
      if(tabVlue.value == 'relational'){
        del(id).then(res=>{
          message.success("删除成功");
          nwTable.value.commitQuery()
          nwTable.value.clearSelected()
        }) 
      }else if(tabVlue.value == 'fileStore'){
        fileDsdel(id).then(res=>{
          message.success("删除成功");
          nwTable.value.commitQuery()
          nwTable.value.clearSelected()
        })
      }else if(tabVlue.value == 'msgConsumer'){
          consumerdel(id).then(res=>{
            message.success("删除成功");
            nwTable.value.commitQuery()
            nwTable.value.clearSelected() 
          })
      }else if(tabVlue.value == 'msgProducer'){
        producerdel(id).then(res=>{
          message.success("删除成功");
          nwTable.value.commitQuery()
          nwTable.value.clearSelected() 
        })     
      }    
        
    }
    const setDefaultFn = (row)=>{
      isLoading.value = true
      setDefault(row.id).then((r)=>{
        isLoading.value = false
        message.success("设置成功");
        nwTable.value.commitQuery()
      }).finally(()=>{
        isLoading.value = false
      })
    }
    const setMqStatus = (row)=>{
      isLoading.value = true
      let fn  = row.consumerGroup?changeConsumerStatus:changeProducerStatus
      fn(row.id).then((r)=>{
        isLoading.value = false
        message.success("设置成功");
        nwTable.value.commitQuery()
      }).finally(()=>{
        isLoading.value = false
      })
    }
    const isLoading = ref(false)
    const msgParamsModal = ref(false)
    const paramsList = ref([])
    const msgRow = ref([])
    const params = ref({})
    const msgParamsConfirm = ()=>{
      isLoading.value = true
      producerSend({...msgRow.value,tmpParams:JSON.stringify(params.value)}).then(res=>{ 
        message.success("发送成功");
        isLoading.value = false
        msgParamsModal.value =false
      }).finally(() => {
        isLoading.value = false
      });
    }
    const sendMsg = (row)=>{
      msgRow.value = row
      paramsList.value = []
      if(row.msgSource == "msgtmp"){
        if (row.mqSourceContent.indexOf("$") == -1) {
          paramsList.value = [];
        } else {
          paramsList.value = row.mqSourceContent
            .split("${")
            .map(d => d.split("}")[0])
            .filter(d => d != "");
        }
      }
      if(paramsList.value.length>=1){
        msgParamsModal.value = true
        return 
      }
      isLoading.value = true
      producerSend(row).then(res=>{
        message.success("发送成功");
        isLoading.value = false
      }).finally(() => {
        isLoading.value = false
      });
    }
    return {
      paramsList,
      addAction,
      partOptions,
      portalOptions,
      message,
      contentTile,
      formVisible,
      formValue: {},
      Form,
      model,
      handEdit,
      handDel,
      tabVlue,
      setDefaultFn,
      setMqStatus,
      isLoading,
      sendMsg,
      msgRow,
      params,
      msgParamsModal,
      msgParamsConfirm,
      handleUpdateValue: (value) => {
        tabVlue.value = value
      },
      request: {
        XHR: list, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size
          }
        }),
      },
      dsListRequest: {
        XHR: fileDsList, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size
          }
        }),
      },
      msgConsumerRequest: {
        XHR: consumerPage, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size
          }
        }),
      },
      msgProducerRequest: {
        XHR: producerPage, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size
          }
        }),
      },
      // 接口相应
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
      },
      nwTable,
      columns: reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "poolName", title: "数据源名称", showHeaderOverflow: true },
        { field: "type", title: "数据源类型", showOverflow: true},
        { field: "username", title: "用户名", showOverflow: true },
        { field: "sysName", title: "所属子系统名称", showOverflow: true },
        { field: "url", title: "url", showOverflow: true },
        { field: "isEnable", title: "状态", showOverflow: true,slots: {
            default: ({ row }) => {
              return [
                <span>{row.isEnable == 0 ? "禁用" : "启用"}</span>,
              ];
            }
          } 
        },
      ]),
      fileColumns:reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "poolName", title: "数据源名称", showHeaderOverflow: true },
        { field: "type", title: "数据源类型", showOverflow: true},
        { field: "localFilePath", title: "本地存储路径", showOverflow: true,
          slots: {
              default: ({ row }) => {
                return [
                  <span>{row.localFilePath ? row.localFilePath : "-"}</span>,
                ];
              }
            } 
          },
          { field: "localFilePrefix", title: "本地存储前缀", showOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.localFilePrefix ? row.localFilePrefix : "-"}</span>,
                ];
              }
            } 
          },
          { field: "minioUrl", title: "minio地址", showOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.minioUrl ? row.minioUrl : "-"}</span>,
                ];
              }
            } 
          },
          { field: "minioBucketName", title: "minio库名称", showOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.minioBucketName ? row.minioBucketName : "-"}</span>,
                ];
              }
            } 
          },
          { field: "minioAccessKey", title: "minio账号", showOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.minioAccessKey ? row.minioAccessKey : "-"}</span>,
                ];
              }
            } 
          },
        { field: "auditStatus", title: "是否默认", showOverflow: true,slots: {
            default: ({ row }) => {
              let t = !row.isDefault?<NButton size="small" onClick={()=>setDefaultFn(row)}>设置默认</NButton>:<span style="color:green">是</span>;
              return [
                t
              ];
            },
          } 
        },
      ]),
      msgConsumerColumns:reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "producerGroup", title: "组名", showHeaderOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.producerGroup ? row.producerGroup : row.consumerGroup}</span>,
                ];
              }
            } },
        { field: "host", title: "主机名", showOverflow: true},
        { field: "port", title: "端口", showOverflow: true},
        { field: "mq", title: "mq类型", showOverflow: true},
        { field: "msgSource", title: "消息来源", showOverflow: true},
        { field: "isEnable", title: "状态", showOverflow: true, slots:{
            default:({ row }) => {
              return <span>{row.isEnable?'启用':'暂停'}</span>
            },
          }
        },
        { field: "", title: "操作", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                      <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{setMqStatus(row)}}>{row.isEnable?'暂停':'开启'}</a>
                      
              ]
            },
          } 
        },
      ]),
      msgProducerColumns:reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "producerGroup", title: "组名", showHeaderOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.producerGroup ? row.producerGroup : row.consumerGroup}</span>,
                ];
              }
            } },
        { field: "host", title: "主机名", showOverflow: true},
        { field: "port", title: "端口", showOverflow: true},
        { field: "mq", title: "mq类型", showOverflow: true},
        { field: "msgSource", title: "消息来源", showOverflow: true},
        { field: "mqSourceContent", title: "消息源内容", showOverflow: true},
        { field: "isEnable", title: "状态", showOverflow: true, slots:{
            default:({ row }) => {
              return <span>{row.isEnable?'启用':'暂停'}</span>
            },
          }
        },
        { field: "", title: "操作", showOverflow: true, slots: {
            default: ({ row }) => {
              return  [
                      <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{setMqStatus(row)}}>{row.isEnable?'暂停':'开启'}</a>,
                      <a style="color:#2d8cf0;cursor: pointer;margin-left:15px;" onClick={(e)=>{sendMsg(row)}}>{'发送消息'}</a>
              ]
            },
          } 
        },
      ]),
      callBck:()=>{
        nwTable.value.commitQuery()
        nwTable.value.clearSelected()
      }
    };
  },
  created() {
  },
  methods: {
    show() {
      this.$refs.nwTable.toggleSearchForm();
    },
    handTest(){
      let formData = cloneDeep(this.Form.getModel())
      this.Form.setLoading(true)
      check(formData).then((res) => {
        if (res) {
            this.message.success("连接成功");
          }
      }).catch(e=>{
        this.Form.setLoading(false)
      }).finally(()=>{
        this.Form.setLoading(false)
      })
    },
    
   
    test() {
      this.message.success("保存成功");
    },
  },
});
</script>
<style lang="less">
.data-nw-page {
  .n-tabs.n-tabs--line-type .n-tabs-tab.n-tabs-tab--active .n-tabs-tab__label,
  .n-tabs.n-tabs--bar-type .n-tabs-tab.n-tabs-tab--active .n-tabs-tab__label,
  .n-tabs.n-tabs--bar-type .n-tabs-tab .n-tabs-tab__label:hover {
    color: #4098fc !important;
  }
  .n-tabs .n-tabs-nav {
    --bar-color: #2080f0;
  }
  .n-tabs .n-tab-pane {
    height: calc(100vh - 140px);
    padding: 5px;
  }
}
</style>