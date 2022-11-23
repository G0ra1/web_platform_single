<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>课件管理</h1>
     
    </n-layout-header>
    <n-layout position="absolute"  has-sider style="top: 36px; " ref="page">
     <n-layout-sider
        collapse-mode="width"
        :collapsed-width="400"
        default-collapsed
        :width="400"
        bordered
      >
        <n-space vertical :size="12">
          <div class="questionHeader">
              <n-input placeholder="搜索" style="textInput" v-model:value="pattern"/>
          </div>
          <n-spin :show="tIsLoading" >
            <n-tree 
              :data="coursewareS" 
              :render-prefix="renderPrefix"  
              block-line 
              :pattern="pattern"
              virtual-scroll
              class="treeH"
               @update:selected-keys="
                (e) => {
                  if (e[0]) {
                    labelCode=e[0]
                    labelName = filterTableMater(e[0],coursewareS).label
                    request.params.labelCode = e[0];
                    $refs.nwTable.commitQuery();
                  }
                }
              "
            />
          </n-spin>
        </n-space>
    </n-layout-sider>
    <n-layout-content>
      <NwTable1
        ref="nwTable"
        :columns="columns"
        :data="null"
        :request="request"
        :response="response"
        defaultKey="couName"

      >
        <template v-slot:header-right="{ selected }">
          <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="show({labelCode,labelName})"
            >添加</n-button
          >
          <!-- <n-button
            :disabled="selected.length !== 1"
            size="small"
            @click="show(selected[0])"
            >修改</n-button
          > -->
        </template>
        <template #header-left>
         
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form :model="searchFormData">
            <n-grid :cols="2" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi>
                <n-form-item path="couName" label="课件名称">
                  <n-input
                    v-model:value="searchFormData.couName"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item path="couType" label="课件类型">
                  <n-select
                      placeholder="请选择"
                       v-model:value="searchFormData.couType"
                      :options="sourceCodes"
                  />
                </n-form-item>
              </n-gi>
             
            </n-grid>
          </n-form>
          
        </template>
      </NwTable1>
    </n-layout-content>
   </n-layout>

  </n-layout>
 <CoursewareAction ref="coursewareAction"   
    :coursewareS="coursewareS"
    @update:callback="() => {
                $refs.nwTable.commitQuery()
                 $refs.nwTable.clearSelected()

  }"></CoursewareAction>
  <PreviewModal ref="previewModal" ></PreviewModal>

</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance,onMounted   } from "vue";
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
  NSelect,
  NGrid,
  NGridItem,
  NTree,
  NSpin,
  NSpace,
  NLayoutSider
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index3.vue";
import { studyClassCouDefList, del, dictItemLists,classifys  } from "./api";
import CoursewareAction from './coursewareAction.vue'
import { NwIcon } from '@platform/main'
import PreviewModal from './previewModal.vue'

export default defineComponent({
  components: {
    CoursewareAction,
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
    NwTable1: NwTable,
    NwTableFun1: NwTableFun,
    NSelect,
    NGrid,
    NGridItem,
    NTree,
    NSpin,
    NSpace,
    NwIcon,
    NLayoutSider,
    PreviewModal
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const model = {}
    const coursewareAction = ref()
    const coursewareS = ref([])
    const pattern = ref('') //题库搜索
    const tIsLoading = ref(false)
    const previewModal = ref()
    const show = (e={}) => {
      coursewareAction.value.sonFn(e);  
      
    }
    const handDel =(selected) =>{
      let id = selected.map(d=>d.id).join(',')
      del(id).then(res=>{
        message.success("删除成功");
        nwTable.value.commitQuery()
        nwTable.value.clearSelected()
      })
    }
    const renderPrefix = ({ option }) => {
      return h(
        <NwIcon name="icon-bumen1" style="margin-right:5px;" size={15} 
        />
      )
    }
    const getCoursewareS = () =>{
       tIsLoading.value = true
        classifys('study_cou_type').then((res)=>{
           const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.dictName
                        row.key = row.dictCode 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.dictName
                        row.key = row.dictCode
                    }
                })
          }
          getStr(res)
          coursewareS.value = res
           tIsLoading.value = false
        })
    }
    const  filterTableMater=(dictCode, arr) =>{
      for (const item of arr) {
        if (item.dictCode === dictCode) return item
        if (item.kids && item.kids.length) {
          const _item = filterTableMater(dictCode, item.kids)
          if (_item) return _item
        }
      }
    }
    onMounted(() => {
     getCoursewareS()
    })
    return {
      message,
      formValue: {},
      filterTableMater,
      labelCode:ref(''),
      labelName:ref(''),
      renderPrefix,
      pattern,
      tIsLoading,
      coursewareS,
      previewModal,
      sourceCodes:reactive([
        {label:'音频',value:1},
        {label:'视频',value:2},
      ]),
      model,
      show,
      handDel,
      coursewareAction,
      request: {
        XHR: studyClassCouDefList, // promise 请求函数
        params: {labelCode:''},
        pageMethod: (current, size) => ({
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
        { field: "couName", title: "课件名称" },
        { field: "labelName", title: "课件分类" },
        { field: "", title: "课件类型",
          slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { row.couType? [
                         
                          {label:'音频',value:1},
                          {label:'视频',value:2},
                          {label:'文档',value:3},

                        ].filter(d=>d.value == row.couType)[0].label : ''
                      }
                    </span>,
                  ];
                },
              }
        },
        { field: "fileSizeView", title: "文件大小", showHeaderOverflow: true,
        },
        { field: "createTime", title: "创建时间", showOverflow: true,},
        { field: "createUserName", title: "创建人", showOverflow: true,},
         {
            field: '',
            width: 200,
            title: '操作',
            showHeaderOverflow: true,
             slots: {
              default: ({row}) => {
                return [
                  <div>
                    <a onClick={()=>previewModal.value.sonFn(row)} style="color:#4098fc;cursor: pointer;display:inline-block;">{"预览"}</a>

                   <a onClick={()=>show(row)} style="color:#4098fc;cursor: pointer;display:inline-block;margin-left:15px">{"修改"}</a>
                    <NPopconfirm
                      onPositive-click={(e)=>{handDel([row])}}
                      positive-text="确定"
                      negative-text="取消"
                    >
                      {{
                        trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:8px">{"删除"}</a>,
                        default:()=> '是否删除当前选项?'
                      }}
                     
                    </NPopconfirm>
                  </div>
                  
                ];
              },
            }
          },
          
      ]),
    };
  },
  methods: {
   
  
    
  },
});
</script>
<style lang='less' scoped>
 /deep/ .n-tree .n-tree-node-wrapper{
    padding:6px 0
  }
  /deep/ .n-drawer-header .n-drawer-header__main{
    padding-left:0px
  }
   .questionHeader{
    display: flex;
    width:100%;
    padding:8px 0 5px 0;
   .btn {
     width: 50px;
     margin:0 5px ;
   }
   .textInput{
     flex: 1;
   }
  }
  
</style>
