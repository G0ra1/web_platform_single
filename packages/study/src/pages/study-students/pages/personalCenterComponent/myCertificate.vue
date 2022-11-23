<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>证书列表</h1>
    </n-layout-header>
    <n-layout-content>
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
        <template #header-right>
          <vxe-input   class="my-search" placeholder="输入名称查询"
            @input="(value)=>{
                request.params.certificateName = value;
                $refs.nwTable.commitQuery();
            }"
          ></vxe-input>
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <PreviewModal ref="previewModal" ></PreviewModal>

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
  useMessage,
} from "naive-ui"
import {
  default as NwTable,
  NwTableFun,
} from "../../../../components/nw-table/index.vue";
import { NwIcon } from '@platform/main'
import { certificate, exportTemplate  } from '../../../study-students/api'
import PreviewModal from '../../../certificate/previewModal.vue'

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
    NwIcon,
    PreviewModal
  },
  setup(props,context) {
    const nwTable = ref(null);
    const message = useMessage();
    const previewModal = ref()
   
  
    return {
      message,
      formValue: {},
      previewModal,
      request: {
        XHR: certificate, // promise 请求函数
        params: {certificateName:''},
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
        { field: "certificateName", title: "证书名称",
            slots: {
              default: ({row}) => {
                return [
                  <div>
                    <a style="color:#2d8cf0;cursor: pointer;" >{row.certificateName}</a>
                   
                  </div>
                  
                ];
              },
            }
        },
        { field: "certificateCode", title: "证书编号" },
        { field: "issuer", title: "发证机构" },
        { field: "issueDate", title: "发证日期" },

         { field: "validity", title: "有效期",
            slots: {
              default: ({row}) => {
                return [
                  <div>
                    <span style="color:#2d8cf0;cursor: pointer;" >
                            {row.validity ==0 ? '长期' : row.validity +'年'}
                    </span>
                  </div>
                ];
              },
            }
         },
         { field: "specialName", title: "专题名称" },
         { field: "examPaperName", title: "试卷" },
         { field: "examScore", title: "得分" },

        { field: "", title: "操作", showOverflow: true, slots: {
              default: ({row}) => {
                return [
                  <div>
                    <span style="color:#2d8cf0;cursor: pointer;"  onClick={(e)=>{
                        previewModal.value.sonFn({...row,id:row.certificateTemplateId})
                      }}>
                      证书预览
                    </span>
                    <span style="color:#2d8cf0;cursor: pointer;margin-left:5px"  onClick={(e)=>{
                       exportTemplate(row)
                      }}>
                      下载
                    </span>
                  </div>
                ];
              },
        }},
    
          
      ]),
    };
  },
  methods: {
   
    
    
    
  },
});
</script>
<style lang="less" scoped>
/deep/ .nw-table-content{
    height: calc(~"100vh - 365px"); 
}
</style>