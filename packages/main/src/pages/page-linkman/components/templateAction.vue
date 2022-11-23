<template>
  <n-modal 
     v-model:show="showModal" 
    :mask-closable="false" 
    class="employee" preset="dialog" 
    title="选择模板" 
    content="你确认"
    positive-text="确认" 
    negative-text="取消" 
    style="width: 1200px"
  >
       <div style="height:40px;width:100%;line-height:40px">
            <n-space :size="5">
                <n-button
                    type="info"
                    attr-type="button"
                    style="margin-right: 5px;"
                    @click="()=>{
                     actionModal = true
                    }"
                >
                  新建
                </n-button>
            </n-space>
            <n-space :size="5" style="padding: 0 5px;position:absolute;right:0">
                <n-form
                    ref="formRef"
                    inline
                    label-placement="left"
                    :label-width="80"
                    :model="SearchForm"
                    style="height: 30px;"
                >
                    <n-form-item label="标题" path="tempTitle">
                        <n-input placeholder="标题"  v-model:value="SearchForm.tempTitle"/>
                    </n-form-item>
                    <n-form-item>
                        <n-button
                            type="info"
                            attr-type="button"
                            style="margin-right: 5px;"
                            @click="()=>{
                             getList()
                            }"
                        >
                        查询
                        </n-button>
                        <n-button
                            type="warning"
                            attr-type="button"
                            @click="()=>{
                              SearchForm = {}
                              getList()
                            }"
                        >
                        重置
                        </n-button>
                    </n-form-item>
                </n-form>
            
            </n-space>
       
       </div>
       <vxe-table 
            resizable 
            highlight-current-row 
            ref="xTable" 
            row-id="id"
            height="500px"
            :data="tempLists">
            <vxe-table-column field="tempTitle" title="标题"></vxe-table-column>
             <vxe-table-column field="tempContent" title="内容">
                <template v-slot="{ row }">
                   <n-ellipsis :line-clamp="1" style="max-width: 100%">
                     {{row.tempContent}}
                    </n-ellipsis>
                </template>
             </vxe-table-column>
            <vxe-table-column field title="操作">
                <template v-slot="{ row }">
                     <vxe-button type="text" @click="()=>{
                          formData = {...row}
                          actionModal = true
                        }" 
                        status="info">编辑</vxe-button>
                   
                     <vxe-button type="text" @click="del(row.id)" 
                        status="danger">删除
                        </vxe-button>
                    <vxe-button type="text" @click="currentChangeEvent(row)" 
                        status="primary">选择
                    </vxe-button>
                    
                </template>
            </vxe-table-column>
        </vxe-table>
    <template #action>
      <n-button type="warning" size="small" @click="showModal = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="onPositiveClick">保存</n-button>
    </template>
     <n-modal v-model:show="actionModal"  preset="dialog"  title="模板管理">
        <n-form style="padding:0 10px"> 
            <n-form-item label="标题">
                <n-input
                    v-model:value="formData.tempTitle"
                    placeholder=""
                />
            </n-form-item>
            <n-form-item label="内容">
                <n-input
                    v-model:value="formData.tempContent"
                    type="textarea"
                    placeholder=""
                />
            </n-form-item>
        </n-form>
        <template #action  style="padding:0 10px">
        <n-button type="default" size="small" @click="actionModal = false"
            >取消</n-button
        >
        <n-button
            type="error"
            size="small"
            style="margin-right: 5px"
            @click="formBtn"
            >保存</n-button
        >
        </template>
    </n-modal>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  NModal,
  NInput,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  NTree,
  NSpin,
  NButton,
  NEllipsis 
} from "naive-ui";
import { tempList, tempAdd, tempEdit, tempDel} from "../api";

export default defineComponent({
  components: {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NTree,
    NSpin,
    NButton,
    NEllipsis
  },
  props: {
   
   
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const actionModal = ref(false)
    const formData = ref({})
    const spinShow = ref(false);
    const xTable = ref();
    const alreadyList = ref([])
    const tempLists = ref([])
    const SearchForm = ref({})
    const sonFn = (e = {}) => {
      showModalRef.value = true;
      getList()
    }
    const del = (id) =>{
        tempDel(id).then((r)=>{
          getList()
        })
    }
    const getList = () =>{
        spinShow.value = true
        tempList({...SearchForm.value}).then((r)=>{
           tempLists.value = r
           spinShow.value = false
        })
    }
    const isAddedByEmpId = (empId) => {
      return alreadyList.map((d) => d.id).includes(empId);
    };
    // 单机选择
    const currentChangeEvent = (row) => {
        showModalRef.value = false
     context.emit('update:callback',row);
    };
    const formBtn = () =>{
      const fn = formData.value.id ? tempEdit  :tempAdd
      fn({
        ...formData.value
      }).then((r)=>{
        getList()
        actionModal.value = false
      })
    }
    return {
      sonFn,
      showModal:showModalRef,
      spinShow,
      xTable,
      formData,
      tempLists,
      del,
      isAddedByEmpId,
      actionModal,
      formBtn,
      currentChangeEvent,
      getList,
      SearchForm,
    };
  },
  methods: {
  
  },
});
</script>
<style lang="less">
.employeePickModal {
  .ivu-modal-body {
    padding: 0;
  }
}
.employee.n-dialog {
  .sider {
    padding: 5px;
    padding-top: 10px;
  }
  .n-dialog__action {
    padding: 14px 24px;
  }
}

.employeePick {
  height: 34px;

  .viewEmployeeColumnDel {
    padding: 2px;

    .ivu-table-cell {
      padding: 0 0 0 10px;
    }
  }

  .table-title {
    font-size: 14px;
    font-weight: bold;
    text-indent: 10px;

    .table-title-btn {
      float: right;
      margin: 10px;
    }
  }

  .employeePickInput {
    .ivu-input {
      background-color: #fff;
      color: #333;
      cursor: help;
    }
  }

  .ivu-poptip {
    .ivu-poptip-rel {
      width: 100%;
      vertical-align: middle;
    }

    .ivu-poptip-body {
      padding: 0;
    }
  }

  .table-left {
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
  }

  .table-right {
    border: 0;
  }

  .ivu-modal-body {
    padding: 0;
  }

  .ivu-modal-footer {
    border-top: 0;
  }

  .ivu-poptip-popper {
    padding: 0;
  }
}
</style>
