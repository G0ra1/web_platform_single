<template>
  <n-drawer
    v-model:show="formVisible"
    width="100%"
    height="100%"
    placement="right"
  >
    <n-drawer-content
      title="模型维护"
      :header-style="{
        padding: '1px',
        'font-size': '18px',
        'background-color': 'rgb(48, 75, 255)',
        color: 'rgb(255, 255, 255)',
        position: 'fixed',
        width: '100%',
        top: 0,
        'z-index': 99,
      }"
      :footer-style="{
        padding: '10px',
        position: 'fixed',
        width: '100%',
        'box-sizing': 'border-box',
        bottom: 0,
        background: '#fff',
        'z-index': 99,
      }"
      :body-style="{
        'padding-bottom': '35px',
        'padding-top': '86px',
      }"
    >
      <n-layout
        position="absolute"
        bordered
        has-sider
        style="top: 36px"
        ref="page"
      >
        <n-layout-sider
          collapse-mode="width"
          :collapsed-width="350"
          :width="350"
          bordered
        >
          <n-space vertical :size="12">
            <!-- <n-input v-model:value="pattern" placeholder="搜索" /> -->
            <n-spin :show="spinShow">
              <n-tree
                block-line
                :default-expand-all="true"
                :data="treeData"
                @update:selected-keys="
                  (e) => {
                    selectedKeys(e);
                  }
                "
              />
            </n-spin>
          </n-space>
        </n-layout-sider>
        <n-layout-content>
          <div
            class="headerRight"
            style="
              text-align: right;
              margin-bottom: 16px;
              width: 100%;
              box-sizing: border-box;
              padding: 0 10px;
              border-top: 16px #fff solid;
              background: #fff;
            "
          >
            <n-button size="small" style="margin-right: 10px" @click="addItem"
              >添加属性</n-button
            >
            <n-button size="small" style="margin-right: 10px" @click="selectAll"
              >全选</n-button
            >
            <n-button
              size="small"
              style="margin-right: 10px"
              @click="deselectAll"
              >反选</n-button
            >

            <n-button
              size="small"
              @click="
                () => {
                  formVisible = false;
                }
              "
              style="margin-right: 10px"
              >关闭</n-button
            >
          </div>
          <n-spin :show="spinShow">
            <vxe-table
              border="inner"
              :data="filedList"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
              style="width: 100%"
              ref="filedListTable"
              :edit-rules="validRules"
              :height="tableHeight"
              show-overflow
              highlight-hover-row
            >
              <vxe-table-column
                field="name"
                title="字段编码"
                :edit-render="{ name: 'input', attrs: { type: 'text' } }"
              >
              </vxe-table-column>
              <vxe-table-column
                field="javaName"
                title="字段定义"
                :edit-render="{ name: 'input', attrs: { type: 'text' } }"
              >
              </vxe-table-column>
              <vxe-table-column
                field="nameCh"
                title="字段名称"
                :edit-render="{ name: 'input', attrs: { type: 'text' } }"
              >
              </vxe-table-column>
              <vxe-table-column
                field="isNotNull"
                title="是否必填"
                :edit-render="{
                  name: '$select',
                  options: [
                    { value: 1, label: 'Y' },
                    { value: 0, label: 'N' },
                  ],
                  props: { clearable: true },
                }"
              >
              </vxe-table-column>
              <vxe-table-column
                field="dbType"
                title="数据类型"
                :edit-render="{}"
              >
                <template v-slot:edit="row">
                  <vxe-select
                    v-model="row.row.dbType"
                    placeholder="请选择下拉"
                    transfer
                  >
                    <vxe-option
                      v-for="item in bdtypeList"
                      :value="item.dictItemCode"
                      :label="item.dictItemName"
                      :key="item.id"
                    />
                  </vxe-select>
                </template>
                <template v-slot="{ row }">
                  <span>{{ row.dbType }}</span>
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="length"
                title="长度"
                :edit-render="{
                  name: 'input',
                  attrs: { type: 'number', min: 0 },
                }"
              >
              </vxe-table-column>
              <vxe-table-column
                field="precision"
                title="精度"
                :edit-render="{
                  name: 'input',
                  attrs: { type: 'number', min: 0 },
                }"
              >
              </vxe-table-column>

              <vxe-table-column
                field="sysParamsVal"
                title="操作"
                fixed="right"
                width="200"
              >
                <template #default="{ row, _rowIndex }">
                  <n-button
                    size="small"
                    type="info"
                    v-show="!row.isSelect"
                    style="margin-right: 5px"
                    @click="
                      () => {
                        selectEntity(row, _rowIndex);
                      }
                    "
                    >选择</n-button
                  >
                  <n-button
                    size="small"
                    type="primary"
                    v-show="row.isSelect"
                    style="margin-right: 5px"
                    @click="
                      () => {
                        selectEntity(row, _rowIndex);
                      }
                    "
                    >已选择</n-button
                  >
                  <NPopconfirm
                    @positive-click="
                      () => {
                        delSelectfiled(_rowIndex);
                      }
                    "
                  >
                    <template #trigger>
                      <n-button size="small" type="error">删除</n-button>
                    </template>
                    是否删除当前实体
                  </NPopconfirm>
                </template>
              </vxe-table-column>
            </vxe-table>
          </n-spin>
        </n-layout-content>
      </n-layout>
      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 10px"
          @click="() => confirm()"
          >提交</n-button
        >
        <!-- <n-button
          size="small"
          @click="
            () => {
              confirmAndDCode();
            }
          "
          style="margin-right: 10px"
          >提交生成代码</n-button
        > -->
        <n-popselect v-model:value="value" :options="[]" trigger="click">
          <n-button>{{ "提交生成代码" }}</n-button>
          <template #empty>
            <n-button
              @click="
                () => {
                  confirmAndDCode('df');
                }
              "
              >{{ "生成业务代码" }}</n-button
            ><n-button
              @click="
                () => {
                  confirmAndDCode('wf');
                }
              "
              style="margin-left: 15px"
              >{{ "生成工作流代码" }}</n-button
            ></template
          >
        </n-popselect>
      </template>
    </n-drawer-content>
    <selectTable ref="selectTable" @callback="selectedCallback"> </selectTable>
  </n-drawer>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :on-after-leave="modelClose"
  >
    <template #header>
      <div>模型选项</div>
    </template>
    <n-form
      :rules="rules"
      ref="dsModelRef"
      :model="dsModel"
      label-placement="left"
      :label-width="80"
    >
      <n-form-item label="模型编码" path="modelName">
        <n-input
          placeholder="请输入模型编码"
          v-model:value="dsModel.modelName"
        />
      </n-form-item>
      <n-form-item label="模型名称" path="modelNameCh">
        <n-input
          placeholder="请输入模型名称"
          v-model:value="dsModel.modelNameCh"
        />
      </n-form-item>
      <n-form-item label="选择实体" path="entityNameCh">
        <n-input
          placeholder="请选择实体"
          disabled
          v-model:value="dsModel.entityNameCh"
        />
        <n-button @click="handelSelectTable">+</n-button>
      </n-form-item>
      <n-form-item label="模型特性" path="modelProperty">
        <n-radio-group
          v-model:value="dsModel.modelProperty"
          name="modelProperty"
        >
          <n-radio :value="1">单体</n-radio>
          <n-radio :value="2">主从</n-radio>
          <n-radio :value="3">关联</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <template #action>
      <n-button
        size="small"
        @click="
          () => {
            showModal = false;
            formVisible = false;
          }
        "
        >取消</n-button
      >
      <n-button type="info" size="small" @click="next">下一步</n-button>
    </template>
  </n-modal>
</template>
<script lang="jsx">
import NwIcon from "/@/components/nw-icon/index.vue";
import selectTable from "./selectTable.vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { cloneDeep } from 'lodash'
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  watch,
  h
} from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NCard,
  NModal,
  NSpace,
  NRadioGroup,
  NDropdown,
  NTag,
  NTree,
  NPopconfirm,
  NPopselect
} from "naive-ui";
import Setting from "/setting";
import cookies from "/@/utils/cookies.js";
import { dbdsCurrentDs } from "../dbds/api";
import { dictItemLists } from "../entity/api";

import {
  columnInfoTableName,
  getExecSql,
  create,
  edit,
  fieldList,
  entityTree,
  modelingEntityFieldList,
  downloadCode
} from "./api";
export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    NInputGroup,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NCard,
    NModal,
    NSpace,
    NRadioGroup,
    selectTable,
    highlightjs: hljsVuePlugin.component,
    NDropdown,
    NTag,
    NTree,
    NPopconfirm,
    NPopselect
  },
  props: {},
  data() {
    return {};
  },
  setup(props,context) {
    const formVisible = ref(false);
    const filedList = ref([]);
    const filedListTable =  ref();
    const showModal = ref(false);
    const dsModel = reactive({});
    const selectTable = ref([]);
    const dsModelRef = ref();
    const msg = useMessage();
    const isNext = ref(false);
    const tableHeight = ref(0);
    const treeData = ref([])
    const treeMap = reactive({})
    const spinShow = ref(false)
    const activeSelect = ref('')
    const bdtypeList = ref([]);
    const treeSelected = (row)=>{
      row.isSelect = !row.isSelect
       if(row.isSelect){
        // 选子带父
           treeSelectChild(row)
            let t = cloneDeep(treeData.value)
            treeData.value = []
            treeData.value = loadTree(t)
      }else{
        // 取消父带子
        treeDeselectParent(row)
        let t = cloneDeep(treeData.value)
        treeData.value = []
        treeData.value = loadTree(t)
        
      }
    }
    const treeDeselectParent = (row)=>{
      let fn1 = (t)=>{
        console.log(t)
        t.forEach(e => {
          console.log(e.entityId)
          console.log(row.entityId)
          if(e.entityId == row.entityId){
            let f = (r)=>{
              if(r.children){
                r.children.forEach(s => {
                  s.isSelect = false
                  f(s)
                });
              }
            }
            f(e)
          }else{
            fn1(e.children)
          }
        });
      }
      fn1(treeData.value)
      
    }
    const treeSelectChild = (row)=>{
      let f = (r)=>{
        r.forEach(e => {
          if(e.entityId == row.parentEntityId){
            e.isSelect = true;
            treeSelectChild(e)
          }else{
            if(e.children){f(e.children)}
          }
        }); 
      }
      f(treeData.value)
      
    }
    const loadTree = (t)=>{
      const getStr = (list)=>{
          list.forEach((row)=>{
              if(row.modelingEntityList.length>0){
                  row.label = row.tableNameCh
                  row.key = row.entityId+','+row.tableName+','+row.tableNameCh
                  row.children = row.modelingEntityList
                  row.suffix= ()=> h(
                    NButton,
                    { text: true, type: row.isSelect?'primary':'info',onClick:()=>{treeSelected(row)} },
                    { default: () => { return row.isSelect?'已选择':'选择'} }
                  )
                  treeMap[row.entityId] = row.modelingFieldList
                  getStr(row.modelingEntityList)
              }else {
                  row.label = row.tableNameCh
                  row.key = row.entityId+','+row.tableName+','+row.tableNameCh
                  row.suffix= ()=> h(
                    NButton,
                    { text: true, type: row.isSelect?'primary':'info' ,onClick:()=>{treeSelected(row)} },
                    { default: () => { return row.isSelect?'已选择':'选择'} }
                  )
                  treeMap[row.entityId] = row.modelingFieldList
              }
          })
      }
      getStr(t)
      return t
    }
    const selectEntity = (row,index)=>{
      row.isSelect = !row.isSelect
    }
    const selectedKeys = (e)=>{
      console.log(e,'11111111111111111111')
      if(!e[0]) return
      filedList.value = treeMap[e[0].split(',')[0]].map(d=>{d.id = null; return d })
      activeSelect.value = e[0].split(',')[0]
    }
    const selectAll = ()=>{
      filedList.value = filedList.value.map(d=>{d.isSelect = true; return d})
    }
    const deselectAll = ()=>{
      filedList.value = filedList.value.map(d=>{d.isSelect = !d.isSelect; return d})
    }
    const addItem = ()=>{
      treeMap[activeSelect.value].push({
        name:'entity',
        isSelect:true
      })
      filedList.value = treeMap[activeSelect.value]
      filedListTable.value.loadData(filedList.value);
    }
    const delSelectfiled = (index)=>{
       treeMap[activeSelect.value].splice(index,1)
       filedList.value = treeMap[activeSelect.value]
       filedListTable.value.loadData(filedList.value);
    }
    const confirm = (isDownCode)=>{
      let dataList = []
      let treeToList = (t)=>{
        t.forEach(d => {
          if(d.isSelect) {
            let modelingFieldList = d.modelingFieldList.filter(e=>e.isSelect)
            let item = {...d,modelingEntityList:[],children:[],modelingFieldList}
            dataList.push(item)
          }
          if(d.modelingEntityList){
            treeToList(d.modelingEntityList)
          }
        });
      }
      treeToList(treeData.value)
      let fn = dsModel.id?edit:create
      spinShow.value = true
      fn({...dsModel,modelingEntityList:dataList}).then(res=>{
        msg.success("执行完成，保存成功");
        context.emit("callback");
        if(isDownCode){
          downloadCodeFn(res)
        }else{
          spinShow.value = false
          formVisible.value = false
        }
      }).catch(e=>{
          spinShow.value = false
      })
    }
    const codeType = ref("")
    const confirmAndDCode = (code)=>{
      codeType.value = code
      confirm(1)
    }
    const downloadCodeFn = (row)=>{
      //   downloadCode(row.id).then(res=>{
      //     var a = document.createElement("a");
      //     a.style.display = "none";
      //     var url = URL.createObjectURL(
      //       new Blob([res], {
      //         type: "application/zip;charset=UTF-8",
      //       })
      //     );
      //     a.href = url;
      //     a.download = "generator.zip";
      //     document.body.appendChild(a);
      //     a.click();
      //     window.URL.revokeObjectURL(url); // 释放掉blob对象
      //     document.body.removeChild(a); // 下载完成移除元素
      //     setTimeout(() => {
      //       msg.success("下载成功");
      //       spinShow.value = false
      //       formVisible.value = false
      //     }, 1000);
      //   }).catch(e=>{
      //     spinShow.value = false
      // })
      const token = cookies.get("token");
      const tokenType = cookies.get("tokenType");
      fetch(
      `${ Setting.apiBaseURL}/main/modeling/downloadCode?modelingId=${row.id}&codeType=${codeType.value}`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `${tokenType} ${token}`
          }),
          responseType: "blob"
        }
      )
        .then(response => response.arrayBuffer())
        .then(res => {
          var a = document.createElement("a");
          a.style.display = "none";
          var url = URL.createObjectURL(
            new Blob([res], {
              type:
                "application/zip;charset=UTF-8"
            })
          );
          a.href = url;
          a.download = "generator.zip";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // 释放掉blob对象
          document.body.removeChild(a); // 下载完成移除元素
          setTimeout(() => {
            msg.success("下载成功");
            spinShow.value = false
            formVisible.value = false
          }, 1000);
        }).catch(e=>{
           spinShow.value = false
       })

      }

    
    const validRules = {
      name: [{ required: true, message: "编码必须填写" }],
      dbType: [{ required: true, message: "类型必须选择" }],
    };
    const validEvent = async () => {
      const $table = filedListTable.value;
      const errMap = await $table.validate(true)
        return !errMap
      if (errMap) {
        
      } else {
        msg.success("校验成功！");
      }
    };
    const sonFn = (e, modelTypeId, modelTypeCode, modelTypeName) => {
      formVisible.value = true;
      showModal.value = true;
      isNext.value = false;
      clearDsModel();
      dsModel.modelTypeId = modelTypeId;
      dsModel.modelTypeCode = modelTypeCode;
      dsModel.modelTypeName = modelTypeName;
      dsModel.status = 1;
      filedList.value = [];
    };
    const sonFnEdit = (data) => {
      dsModel.status = 1;
      formVisible.value = true;
      showModal.value = true;
      isNext.value = false;
      filedList.value = data.filedList;
      for (let key in data) {
        dsModel[key] = data[key];
      }

    };
    const getEntityTree = ()=>{
      entityTree({modelProperty:dsModel.modelProperty,modelingId:dsModel.id},dsModel.entityId).then((res) => {
            treeData.value = loadTree(res)
            let row = res[0]
            selectedKeys([row.entityId+','+row.tableName+','+row.tableNameCh])
      });
    }
    const modelClose = () => {
      if (isNext.value) return;
      formVisible.value = false;
    };
    const clearDsModel = () => {
      Object.keys(dsModel).map((key) => {
        delete dsModel[key];
      });
    };
    

    const next = () => {
      dsModelRef.value.validate((errors) => {
        if (!errors) {
          isNext.value = true;
          showModal.value = false;
          getEntityTree()
        } else {
          msg.error("请完善表单数据");
        }
      });
    };

    const handelSelectTable = () => {
      console.log(selectTable.value)
      selectTable.value.show();
    };
    const selectedCallback = (selected, t) => {
          dsModel.entityId = selected[0].split(",")[2];
          dsModel.entityName = selected[0].split(",")[0];
          dsModel.entityNameCh = selected[0].split(",")[1];
    };

    const isKeyEvent = ({row,rowIndex})=>{
      if(row.isKey == 1){
        filedList.value[rowIndex].isNotNull = 1
      }
      
      filedListTable.value.loadData(filedList.value);
    }
    onMounted(async () => {
      tableHeight.value = document.documentElement.clientHeight - 155;
      window.onresize = () => {
        tableHeight.value = document.documentElement.clientHeight - 155;
      };
      dictItemLists({ code: "MODEL_DB_TYPE" }).then((res) => {
        console.log(res, "数据类型");
        bdtypeList.value = res;
      });
    });

    return {
      formVisible,
      filedList,
      showModal,
      dsModel,
      sonFn,
      modelClose,
      next,
      selectTable,
      handelSelectTable,
      selectedCallback,
      filedListTable,
      clearDsModel,
      isNext,
      dsModelRef,
      sonFnEdit,
      tableHeight,
      validRules,
      validEvent,
      isKeyEvent,
      getEntityTree,
      treeData,
      treeSelected,
      selectEntity,
      treeSelectChild,
      selectedKeys,
      confirm,
      loadTree,
      confirmAndDCode,
      downloadCodeFn,
      spinShow,
      selectAll,
      deselectAll,
      addItem,
      delSelectfiled,
      bdtypeList,
      codeType,
      rules: {
        modelNameCh: {
          required: true,
          message: "请选择模型名称",
          trigger: "blur",
        },
        modelName: {
          required: true,
          message: "请输入模型编码",
          trigger: "blur",
        },
        entityNameCh: {
          required: true,
          message: "请选择实体",
          trigger: "blur",
        },
        modelProperty: {
          required: true,
          message: "请选择特性",
          trigger: "blur",
          type:'number'
        },
      },
    };
  },
  created() {},
  methods: {
    isOutLinkChange(e, v, i) {
      this.filesSons[i].isOutLink = e.target.value * 1;
    },
   
  },
});
</script>
<style lang="less">
.vxe-header--row {
  background-color: #eee;
}
</style>