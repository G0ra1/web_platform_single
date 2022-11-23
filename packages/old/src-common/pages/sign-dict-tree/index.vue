<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>{{ dictName }}</h1>
      <div class="nw-page-header-right">
        <ONwTableFun v-if="!formVisible" :table="nwTable"></ONwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <ONwTable
        ref="nwTable"
        v-if="tableShow"
        :columns="columns"
        :data="null"
        :request="request"
        :response="response"
        :isNotPager="true"
        :lazy="false"
        :searchFormFields="[
          {
            field: 'dictName',
            title: '分类名称',
            valueFormat: (d) => d,
          },
        ]"
      >
        <template #header-left>
          <NButton
            type="info"
            size="small"
            @click="show()"
            style="margin-right: 5px"
            >新建</NButton
          >
          <!--  <NButton size="small">修改</NButton>
                      <NButton size="small">删除</NButton>-->
        </template>
        <template #header-right>
          <!-- <NButton type="info" size="small" style="margin-right: 5px;">其他</NButton>
                      <NButton type="info" size="small">其他</NButton> -->
        </template>
        <template v-slot:search-form="{ searchFormData }">
          <n-form :model="searchFormData">
            <n-form-item path="dictName" label="字典名称">
              <n-input
                v-model:value="searchFormData.dictName"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
          <!-- <NButton type="info" size="small" style="margin-right: 5px;">其他</NButton>
                      <NButton type="info" size="small">其他</NButton> -->
        </template>
      </ONwTable>
    </n-layout-content>
    <addCategory
      ref="addCategory"
      :dictName="dictName"
      :dictId="dictId"
      @update:callback="
        () => {
          nwTable.commitQuery();
          nwTable.gridComponent.setAllCheckboxRow();
        }
      "
    ></addCategory>
  </n-layout>
</template>

<script lang='jsx'>
import { defineComponent, reactive, ref,h } from "vue";
 import { default as ONwTable, ONwTableFun } from '../../components/nw-table/index.vue'
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { dictTreeList,detailCode,del  } from "./api";
import addCategory from "./addCategory.vue";


import { parseQuery } from '/@/utils/index.js'
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
  useMessage,
} from "naive-ui";
export default defineComponent({
  components: {
    NwTable,
    NwTableFun,
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
    addCategory,
    ONwTable,
    ONwTableFun,
  },
  setup() {
    const urlParams = parseQuery(window.location.search.substr(1))

    const nwTable = ref();
    const addCategory = ref()
    const message = useMessage();
    const dictId = ref('');
    const dictName = ref('');
    const tableShow = ref(false)
    const detailCodeFn = ()=>{
      return detailCode(urlParams.key)
    }
    const columns =  reactive([
         { field: '', title: '字典名称',showHeaderOverflow: true,  treeNode:true,
             slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       show(row)
                      }
                    }>{row.dictName}</a>
                  </span>,
                ];
              },
            }
           },
          { field: 'dictCode', title: '字典编码', showHeaderOverflow: true,  },
          {
            field: '',
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                return [
                   <div>
                    <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={(e)=>{show(row)}}>{"编辑"}</a>
                    <NPopconfirm
                      onPositive-click={(e)=>{handDel(row.id)}}
                      positive-text="确定"
                      negative-text="取消"
                     
                    >
                      {{
                        trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                        default:()=> '是否删除当前选项?'
                      }}
                     
                    </NPopconfirm>
                   </div>
                 
                ];
              },
            }
          },
      ])
    const showDeployDict = (e={}) => {
        addCategory.value.sonFn({...e,dictId:dictId.value});  
    }
    const removeEvent = (row) => {
          del(row.id).then(res=>{
                message.success("删除成功")
                nwTable.value.commitQuery()
                console.log(nwTable)
              })
      }
      // detailCode(route.query.key).then(res=>{
      //   dictId.value = res.id
      //   dictName.value = res.dictName
      // })
      const c = async ()=>{ 
        let res = await detailCodeFn()
        dictId.value = res.id
        columns[0].title = res.dictNameAlias||'字典名称'
        columns[1].title = res.dictCodeAlias||'字典编码'
        tableShow.value = true
        dictName.value = res.dictName
      }
    c()
      const show = (data={}) => {
        let d = {parentId:dictId.value,...data}
        addCategory.value.sonFn(d);      
      };
      const handDel = (id)=>{
        del(id).then(res=>{
          message.success("删除成功")
          nwTable.value.commitQuery()
        })
      }
    return {
      nwTable,
      addCategory,
      dictId,
      dictName,
      showDeployDict,
      show,
      handDel,
      tableShow,
      request: {
          XHR: dictTreeList, // promise 请求函数
          params: { dictCode: urlParams.key },
          pageMethod: (current, size) => ({ // 分页
            page: {
              current,
              size
            }
          }),
        },
      response: {
        dataMethod: (res) => res,
        pageMethod: () => {},
      },
      columns
    };
  },
});
</script>