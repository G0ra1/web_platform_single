<template>
  <n-drawer v-model:show="formVisible" width="100%" height="100%" placement="right">
    <n-drawer-content :title="contentTitle" :header-style="{
      padding: '10px',
      'font-size': '18px',
      'background-color': 'rgb(48, 75, 255)',
      color: 'rgb(255, 255, 255)',
      position: 'fixed',
      width: '100%',
      top: 0,
      'z-index': 99,
    }" :footer-style="{
      padding: '10px',
      position: 'fixed',
      width: '100%',
      'box-sizing': 'border-box',
      bottom: 0,
      background: '#fff',
      'z-index': 99,
    }" :body-style="{
      'padding-bottom': '35px',
      'padding-top': '86px',
    }">
      <div class="headerRight" style="
          text-align: right;
          margin-bottom: 16px;
          position: fixed;
          width: 100%;
          z-index: 99;
          box-sizing: border-box;
          left: 0;
          padding: 0 10px;
          top: 38px;
          border-top: 16px #fff solid;
          background: #fff;
        ">
        <h5 style="float: left; font-size: 15px; margin: 0">{{ `数据源:${dsModel.dbSource}-----表名:${dsModel.tableNameCh}`
        }}</h5>
        <n-button type="info" size="small" style="margin-right: 10px" @click="addList">新建属性</n-button>
        <n-button size="small" @click="getExecSqlFn(0)" style="margin-right: 10px">sql预览</n-button>
        <n-button size="small" @click="synchronous">同步</n-button>
      </div>
      <vxe-table :data="filedList" :scroll-y="{enabled: false}" resizable border
        :edit-config="{ trigger: 'click', mode: 'cell' }" style="width: 100%" ref="filedListTable"
        :edit-rules="validRules" :height="tableHeight" show-overflow row-key highlight-hover-row
        @edit-actived="entityInfosActive" @resizable-change="resizableChange">
        <vxe-column width="60" min-width="60">
          <template #default>
            <span class="drag-btn">
              <i class="vxe-icon--menu"></i>
            </span>
          </template>
          <template #header>
            <vxe-tooltip v-model="showHelpTip" content="按住后可以上下拖动排序！" enterable>
              <i class="vxe-icon--question" @click="showHelpTip = showHelpTip"></i>
            </vxe-tooltip>
          </template>
        </vxe-column>
        <vxe-table-column field="name" title="编码" width="120" min-width="120"
          :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-table-column>
        <vxe-table-column field="nameCh" title="名称" width="120" min-width="120"
          :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-table-column>
        <vxe-table-column field="dbType" width="120" min-width="120" title="类型" :edit-render="{}">
          <template v-slot:edit="row">
            <vxe-select v-model="row.row.dbType" placeholder="请选择下拉" transfer>
              <vxe-option v-for="item in bdtypeList" :value="item.dictItemCode" :label="item.dictItemName"
                :key="item.id" />
            </vxe-select>
          </template>
          <template v-slot="{ row }">
            <span>{{ row.dbType }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="length" title="长度" width="120" min-width="120"
          :edit-render="{ name: 'input', attrs: { type: 'number', min: 0 } }"></vxe-table-column>
        <vxe-table-column field="precision" title="精度" width="120" min-width="120"
          :edit-render="{ name: 'input', attrs: { type: 'number', min: 0 } }"></vxe-table-column>
        <vxe-table-column field="isNotNull" title="是否必填" width="120" min-width="120" :edit-render="{
          name: '$select',
          options: [
            { value: 1, label: 'Y' },
            { value: 0, label: 'N' },
          ],
          props: { clearable: true },
        }"></vxe-table-column>
        <vxe-table-column field="isKey" title="是否主键" width="120" min-width="120" :edit-render="{
          name: '$select',
          options: [
            { value: 1, label: 'Y' },
            { value: 0, label: 'N' },
          ],
          props: { clearable: true },
          events: { change: isKeyEvent },
        }"></vxe-table-column>
        <vxe-table-column field="defaultValue" title="默认值" width="120" min-width="120"
          :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-table-column>
        <vxe-table-column field="fkTableName" title="关联表" width="400" min-width="400" :edit-render="{}">
          <template #edit="{ row, _rowIndex }">
            <span>{{ row.fkTableName }}</span>
            <n-button style="z-index:1000;margin-left:5px;" size="small" @click="handelSelectTable1(row, _rowIndex)">+
            </n-button>
            <n-button size="small" style="z-index:1000" @click="
              () => {
                filedList[_rowIndex].fkTableName = '';
                filedList[_rowIndex].fkTableNameCh = '';
                filedList[_rowIndex].fkTableId = '';
                filedList[_rowIndex].fkFieldName = '';
                filedList[_rowIndex].fkFieldId = '';
                filedListTable.loadData(filedList);
              }
            ">-</n-button>
          </template>
          <template #default="{ row }">
            <span>{{ row.fkTableName }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="fkFieldName" title="关联外键" width="200" min-width="200"
          :edit-render="{ name: 'input', attrs: { type: 'text' } }">
          <template #edit="{ row, _rowIndex }">
            <span>{{ row.fkFieldName }}</span>
            <n-button style="z-index:1000;margin-left:5px;" size="small"
              @click="handelSelectfkFieldName(row, _rowIndex)">+</n-button>
            <n-button style="z-index:1000" size="small" @click="
              () => {
                filedList[_rowIndex].fkFieldName = '';
                filedList[_rowIndex].fkFieldId = '';
                filedListTable.loadData(filedList);
              }
            ">-</n-button>
          </template>
          <template #default="{ row }">
            <span>{{ row.fkFieldName }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="sysParamsVal" title="操作" fixed="right" min-width="200" width="200">
          <template #default="{ row, _rowIndex }">
            <n-button size="small" type="text" style="margin-right: 5px; color: #2d8cf0" @click="
              () => {
                copyList(row, _rowIndex);
              }
            ">复制</n-button>
            <n-button size="small" type="text" style="margin-right: 5px; color: red" @click="
              () => {
                delList(row, _rowIndex);
              }
            ">删除</n-button>
            <NDropdown @select="(key) => handleOptionsSelect(key, row, _rowIndex)" :options="handleOptions">
              <NButton type="text" style="color: #2d8cf0; cursor: pointer">...</NButton>
            </NDropdown>
          </template>
        </vxe-table-column>
      </vxe-table>

      <template #footer>
        <n-button size="small" style="margin-right: 10px" @click="formVisible = false">取消</n-button>

        <n-button type="info" size="small" style="margin-right: 10px" @click="getExecSqlFn(1)">提交</n-button>
        <!-- <n-button type="info" size="small" @click="handleSave"
          >提交生成代码</n-button
        >-->
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-modal v-model:show="showModal" preset="dialog" :on-after-leave="modelClose">
    <template #header>
      <div>新建数据源选项</div>
    </template>
    <n-form :rules="rules" ref="dsModelRef" :model="dsModel" label-placement="left" :label-width="80">
      <n-form-item label="数据源" path="dbSourceId">
        <n-select v-model:value="dsModel.dbSourceId" placeholder="请选择数据源" :options="dbSourceOptions" :fallback-option="
          (value) => ({ label: '' + model.dbSource, value })
        " :on-update:value="dbSourceSelect" />
      </n-form-item>
      <!-- <n-form-item label="创建类型" path="createType">
          <n-select
            v-model:value="dsModel.createType"
            placeholder="请选择创建类型"
            :options="[
              { label: '新创建表', value: 1 },
              { label: '选择现有表', value: 2 },
            ]"
            :on-update:value="createTypeSelect"
          />
      </n-form-item>-->
      <n-form-item label="创建类型" path="createType">
        <n-radio-group v-model:value="dsModel.createType" name="radiogroup2">
          <n-radio :value="1">新创建表</n-radio>
          <n-radio :value="2">选择现有表</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="选择表" path="description" v-if="dsModel.createType == 2">
        <n-input placeholder="请选择表" v-model:value="dsModel.tableName" />
        <n-button @click="handelSelectTable">+</n-button>
      </n-form-item>
      <n-form-item label="新建表名" path="tableName" v-if="dsModel.createType !== 2">
        <n-input placeholder="请输入表名" v-model:value="dsModel.tableName" />
      </n-form-item>
      <n-form-item label="中文名称" path="tableNameCh">
        <n-input placeholder="请输入中文名称" v-model:value="dsModel.tableNameCh" />
      </n-form-item>
      <n-form-item label="前缀" path="tablePrefix">
        <n-input placeholder="请输入前缀" v-model:value="dsModel.tablePrefix" />
      </n-form-item>
      <n-form-item label="包名" path="packageName">
        <n-input placeholder="请输入包名" v-model:value="dsModel.packageName" />
      </n-form-item>

      <n-form-item label="模块名" path="moduleName">
        <n-input placeholder="请输入模块名" v-model:value="dsModel.moduleName" />
      </n-form-item>
      <n-form-item label="作者" path="author">
        <n-input placeholder="请输入作者" v-model:value="dsModel.author" />
      </n-form-item>
      <n-form-item label="是否启用" path="status">
        <n-radio-group v-model:value="dsModel.status" name="status">
          <n-radio :value="1">启用</n-radio>
          <n-radio :value="0">停用</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <template #action>
      <n-button size="small" @click="
        () => {
          showModal = false;
          formVisible = false;
        }
      ">取消</n-button>
      <n-button type="info" size="small" @click="next">下一步</n-button>
    </template>
  </n-modal>
  <n-modal v-model:show="showModalSql" style="width: 1200px; height: 800px" preset="dialog" title="SQL预览">
    <highlightjs style="height: 700px; overflow: auto" autodetect :code="previewSQL" />
  </n-modal>
  <selectTable ref="selectTable" @callback="selectedCallback"></selectTable>
  <selectField ref="selectField" @callback="selectFieldCallback"></selectField>
  <n-modal v-model:show="showModalHint" :mask-closable="true">
    <n-card style="width: 600px" title="正在提交..." size="huge" :bordered="false">
      <template v-for="(d, i) in hintList" :key="i">
        <n-tag :bordered="false" :type="d.t">{{ d.c }}</n-tag>
        <br />
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showAffirmModal" :mask-closable="false" preset="dialog" title="确认" :content="affirmContent"
    positive-text="确认" @positive-click="onPositiveClick" @negative-click="onNegativeClick" negative-text="取消" />
</template>
<script lang="jsx">
import NwIcon from "/@/components/nw-icon/index.vue";
import selectTable from "./selectTable.vue";
import selectField from "./selectField.vue";
import { format } from "sql-formatter";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { cloneDeep } from 'lodash'
import Sortable from 'sortablejs'
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  watch,
  onUnmounted,
  nextTick
} from "vue";
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
  NTag
} from "naive-ui";
import Setting from "/setting";
import { dbdsCurrentDs } from "../dbds/api";
import {
  columnInfoTableName,
  getExecSql,
  create,
  execSql,
  edit,
  fieldList,
  dictItemLists
} from "./api";
export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
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
    selectField,
    NTag
  },
  props: {},
  data() {
    return {};
  },
  setup(props, context) {
    const contentTitle = ref('实体新建')
    const formVisible = ref(false);
    const filedList = ref([]);
    const filedListTable = ref();
    const showModal = ref(false);
    const dsModel = reactive({});
    const dbSourceOptions = ref([]);
    const selectTable = ref([]);
    const selectField = ref([]);
    const dsModelRef = ref();
    const msg = useMessage();
    const isNext = ref(false);
    const sql = ref("");
    const description = ref("请稍后");
    const editIndex = ref(0);
    const tableHeight = ref(0);
    const showModalHint = ref(false)
    const hintList = ref([

    ])
    const showHelpTip = ref(false)
    const deledList = ref([])

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
      contentTitle.value = "实体新建"
      formVisible.value = true;
      showModal.value = true;
      isNext.value = false;
      showModalSql.value = false;
      clearDsModel();
      dsModel.modelTypeId = modelTypeId;
      dsModel.modelTypeCode = modelTypeCode;
      dsModel.modelTypeName = modelTypeName;
      dsModel.status = 1;
      dsModel.createType = 1;
      sql.value = "";
      filedList.value = [];
      hintList.value = [];
      deledList.value = [];
      showModalHint.value = false
    };
    const sonFnEdit = (data) => {
      contentTitle.value = "实体编辑"
      dsModel.status = 1;
      formVisible.value = true;
      showModal.value = true;
      isNext.value = false;
      showModalSql.value = false;
      sql.value = "";
      filedList.value = data.filedList;
      hintList.value = [];
      deledList.value = [];
      for (let key in data) {
        dsModel[key] = data[key];
      }
      showModalHint.value = false

    };
    const previewSQL = ref("");
    const showModalSql = ref(false);
    const bdtypeList = ref([]);
    const modelClose = () => {
      if (isNext.value) return;
      formVisible.value = false;
    };
    // 拖动放置
    let sortable1

    const rowDrop = () => {
      const $table = filedListTable.value
      if (!$table) {
        setTimeout(() => {
          rowDrop()
        }, 1000)
        return
      }
      sortable1 = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
        handle: '.drag-btn',
        onEnd: (sortableEvent) => {
          const newIndex = sortableEvent.newIndex
          const oldIndex = sortableEvent.oldIndex
          const currRow = filedList.value.splice(oldIndex, 1)[0]
          filedList.value.splice(newIndex, 0, currRow)
          console.log(filedList.value, 'filedList.valuefiledList.valuefiledList.value')
        }
      })
    }
    let initTime
    nextTick(() => {
      // 加载完成之后在绑定拖动事件
      initTime = setTimeout(() => {
        rowDrop()
      }, 1000)
    })
    onUnmounted(() => {
      clearTimeout(initTime)
      if (sortable1) {
        sortable1.destroy()
      }
    })
    //拖动功能
    const handleOptions = ref([
      // {
      //   label: "删除",
      //   key: "del",
      // },
      // {
      //   label: "上移",
      //   key: "up",
      // },
      // {
      //   label: "下移",
      //   key: "down",
      // },
    ]);
    const clearDsModel = () => {
      Object.keys(dsModel).map((key) => {
        delete dsModel[key];
      });
    };
    const insertEvent = (row, data) => {
      const $table = filedListTable.value
      const record = {
        ...data
      }
      $table.insertAt(record, row).then(({ row }) => {
        $table.setActiveRow(row)
        console.log(filedList.value)
      })
    }
    const dbSourceSelect = (v) => {
      dsModel.dbSourceId = v;
      dsModel.dbSource = dbSourceOptions.value.filter(
        (d) => d.value == v
      )[0].label;
      dsModel.sysCode = dbSourceOptions.value.filter(
        (d) => d.value == v
      )[0].sysCode;
      dsModel.sysName = dbSourceOptions.value.filter(
        (d) => d.value == v
      )[0].sysName;
    };
    const createTypeSelect = (v) => {
      dsModel.createType = v;
    };

    const next = () => {
      dsModelRef.value.validate((errors) => {
        if (dsModel.id) {
          isNext.value = true;
          showModal.value = false;
          return;
        }
        if (!errors) {
          isNext.value = true;
          showModal.value = false;
          if (dsModel.createType == 2) {
            // 选择表
            columnInfoTableName(dsModel.dbSource, dsModel.tableName).then(
              (res) => {
                filedList.value = res;
              }
            );
          } else {
            // 新建表
            filedList.value = [
              {
                name: "id",
                nameCh: "主键",
                dbType: "bigint",
                length: 20,
                isNotNull: 1,
                isKey: 1,
                operateType: 'add'
              },
              {
                name: "create_time",
                nameCh: "创建时间",
                dbType: "datetime",
                length: 0,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "update_time",
                nameCh: "修改日期",
                dbType: "datetime",
                length: 0,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_id",
                nameCh: "创建人ID",
                dbType: "bigint",
                length: 20,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_name",
                nameCh: "创建人名称",
                dbType: "varchar",
                length: 255,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_parent_org_id",
                nameCh: "父级机构ID",
                dbType: "bigint",
                length: 20,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_parent_org_name",
                nameCh: "父级机构名称",
                dbType: "varchar",
                length: 255,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_parent_dept_id",
                nameCh: "父级部门ID",
                dbType: "bigint",
                length: 20,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_parent_dept_name",
                nameCh: "父级部门名称",
                dbType: "varchar",
                length: 255,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },
              {
                name: "create_user_org_full_id",
                nameCh: "父级组织全路径ID",
                dbType: "varchar",
                length: 2000,
                isNotNull: 0,
                isKey: 0,
                operateType: 'add'
              },

            ];
          }
        } else {
          msg.error("请完善表单数据");
        }
      });
    };

    const handelSelectTable = () => {
      if (!dsModel.dbSourceId) {
        msg.error("请选择数据源");
        return;
      }
      selectTable.value.show(dsModel.dbSource, "tableInfoPage");
    };
    const handelSelectTable1 = (row, _index) => {
      editIndex.value = _index;
      selectTable.value.show(dsModel.dbSource, "entityPage");
    };
    const handelSelectfkFieldName = (row, _index) => {
      editIndex.value = _index;
      selectField.value.show(filedList.value[_index].fkTableId);
    };
    const selectFieldCallback = (selected) => {
      filedList.value[editIndex.value].fkFieldName = selected[0].split(",")[0];
      filedList.value[editIndex.value].fkFieldId = selected[0].split(",")[1];
      filedListTable.value.loadData(filedList.value);
    };
    const selectedCallback = (selected, t) => {
      console.log(selected[0], t, "selected");
      let selectedValue = selected[0]
      if (t == "tableInfoPage") {
        if (selectedValue) {
          let tableName = selectedValue.split(",")[0]
          dsModel.tableName = tableName;
          dsModel.tableNameCh = selectedValue.split(",")[1];
          dsModel.tablePrefix = `${tableName.split("_")[0]}_${tableName.split("_")[1]}_`
          dsModel.packageName = `com.netwisd.${tableName.split("_")[1]}`
          dsModel.moduleName = tableName.split("_")[2]
          dsModel.author = 'netwisd'
        }
      }
      if ((t == "entityPage")) {
        filedList.value[editIndex.value].fkTableName =
          selectedValue.split(",")[0];
        filedList.value[editIndex.value].fkTableId = selected[0].split(",")[2];
        filedListTable.value.loadData(filedList.value);
      }
    };
    const copyList = (row, _rowIndex) => {
      filedList.value.splice(_rowIndex, 0, { ...row, id: null, operateType: 'add' });
      filedListTable.value.loadData(filedList.value);
    };
    const addList = () => {
      // 
      insertEvent(-1, { isKey: 0, isNotNull: 0, operateType: 'add' })
      filedList.value.push({ isKey: 0, isNotNull: 0, operateType: 'add' });
      filedListTable.value.loadData(filedList.value);
    };
    const delList = (row, _rowIndex) => {
      console.log(_rowIndex)
      filedList.value[_rowIndex].operateType = "del";
      deledList.value.push(cloneDeep(filedList.value[_rowIndex]))
      filedList.value.splice(_rowIndex, 1);
      filedListTable.value.loadData(filedList.value);
    };
    const upList = (row, _rowIndex) => {
      let _row = cloneDeep(filedList.value[_rowIndex - 1]);
      filedList.value[_rowIndex - 1] = cloneDeep(row);
      filedList.value[_rowIndex] = _row;
      filedListTable.value.loadData(filedList.value);
    };
    const downList = (row, _rowIndex) => {
      let _row = cloneDeep(filedList.value[_rowIndex + 1]);
      filedList.value[_rowIndex + 1] = cloneDeep(row);
      filedList.value[_rowIndex] = _row;
      filedListTable.value.loadData(filedList.value);
    };
    const getRemoveEvent = () => {
      return filedListTable.value.getRemoveRecords()
    }
    const isKeyEvent = ({ row, rowIndex }) => {
      if (row.isKey == 1) {
        filedList.value[rowIndex].isNotNull = 1
      }
      filedListTable.value.loadData(filedList.value);
    }
    const getExecSqlFn = (exec) => {
      validEvent().then(r => {
        getExecSql({ ...dsModel, filedList: [...filedList.value, ...deledList.value] }, dsModel.dbSource)
          .then((res) => {
            showModalSql.value = true;
            previewSQL.value = format(res);
            sql.value = res;
            if (exec) {
              showAffirmModal.value = true;
              affirmContent.value = "您正在执行提交操作，提交后数据库将生成相应数据，请谨慎！"
            }
            // previewSQL.value = "var x = 5;";
          })
          .catch((e) => {
            console.log(e, '11111111')
          });
      }).catch(e => {
        msg.error("请完善表单！");
        return;
      })


    };
    const execSqlFn = () => {
      showModalHint.value = true;
      hintList.value = []
      hintList.value.push({ t: 'info', c: '正在执行SQL...' })
      execSql({ sql: sql.value }, dsModel.dbSource)
        .then((res) => {
          hintList.value.push({ t: 'success', c: '执行SQL成功' })
          setTimeout(() => {
            hintList.value.push({ t: 'info', c: '实体维护执行中...' })
          }, 500);
          setTimeout(() => {
            handleSave();
          }, 1000);
        })
        .catch((e) => {
        });
    };
    const handleSave = () => {
      let fn = dsModel.id ? edit : create;
      fn({ ...dsModel, filedList: [...filedList.value, ...deledList.value] }, dsModel.dbSource)
        .then((res) => {
          formVisible.value = false;
          showModalSql.value = false;
          showModalHint.value = false;
          hintList.value.push({ t: 'success', c: '执行完成，保存成功' })
          msg.success("执行完成，保存成功");
          context.emit("callback");
        })
        .catch((e) => {
          hintList.value.push({ t: 'error', c: 'Sql语句执行成功，实体维护执行失败' })
          msg.error("Sql语句执行成功，实体维护执行失败");
        });
    };
    const handleOptionsSelect = (key, row, _rowIndex) => {
      console.log(_rowIndex)
      console.log(filedList.value)
      switch (key) {
        case "down":
          if (_rowIndex == filedList.value.length - 1) {
            msg.info("我已经在最下边了");
            return;
          }
          downList(row, _rowIndex);
          break;
        case "up":
          if (_rowIndex == 0) {
            msg.info("我已经在最上边了");
            return;
          }
          upList(row, _rowIndex);
          break;
        case "del":
          delList(row, _rowIndex);
          break;
        default:
          break;
      }
    };
    const synchronous = () => {
      if (dsModel.createType == 1 && !dsModel.id) {
        msg.info("新建表没有什么可同步的");
        return
      }
      showAffirmModal.value = true;
      affirmContent.value = "您正在执行同步操作，将可能覆盖您的编辑操作！"

    };
    const entityInfosActive = ({ $rowIndex }) => {
      if (!filedList.value[$rowIndex].operateType) filedList.value[$rowIndex].operateType = "update";
      filedListTable.value.loadData(filedList.value);
    }
    const resizableChange = (p) => {
      console.log(p, 'pppppppppppp')
    }
    const affirmContent = ref('')
    const showAffirmModal = ref(false)
    const onNegativeClick = () => {
      showAffirmModal.value = false
      showModalSql.value = false;
    }
    const onPositiveClick = () => {
      showAffirmModal.value = false
      if (affirmContent.value == "您正在执行同步操作，将可能覆盖您的编辑操作！") {
        // 同步
        columnInfoTableName(dsModel.dbSource, dsModel.tableName).then((res) => {
          if (res.length == 0) {
            filedList.value = [
              {
                name: "id",
                nameCh: "主键",
                dbType: "int",
                length: 32,
                isNotNull: 1,
                isKey: 1,
              },
            ];
          } else {
            filedList.value = res;
          }
        });
        msg.success("同步成功！");
      }
      if (affirmContent.value == "您正在执行提交操作，提交后数据库将生成相应数据，请谨慎！") {
        execSqlFn();
      }
    }
    onMounted(async () => {
      console.log(document.documentElement.clientHeight);
      tableHeight.value = document.documentElement.clientHeight - 155;
      window.onresize = () => {
        tableHeight.value = document.documentElement.clientHeight - 155;
      };
      dbdsCurrentDs().then((res) => {
        console.log(res, "数据源....");
        dbSourceOptions.value = res.map((d) => {
          return {
            value: d.id,
            label: d.poolName,
            sysCode: d.sysCode,
            sysName: d.sysName,
          };
        });
      });
      dictItemLists({ code: "MODEL_DB_TYPE" }).then((res) => {
        console.log(res, "数据类型");
        bdtypeList.value = res;
      });
    });

    return {
      showAffirmModal,
      contentTitle,
      rowDrop,
      showHelpTip,
      onNegativeClick,
      onPositiveClick,
      affirmContent,
      formVisible,
      filedList,
      showModal,
      dsModel,
      dbSourceOptions,
      sonFn,
      modelClose,
      dbSourceSelect,
      next,
      createTypeSelect,
      selectTable,
      handelSelectTable,
      selectedCallback,
      getExecSqlFn,
      showModalSql,
      previewSQL,
      bdtypeList,
      handelSelectTable1,
      handelSelectfkFieldName,
      copyList,
      filedListTable,
      addList,
      delList,
      downList,
      upList,
      handleOptionsSelect,
      handleOptions,
      handleSave,
      clearDsModel,
      isNext,
      dsModelRef,
      sql,
      execSqlFn,
      description,
      sonFnEdit,
      editIndex,
      selectField,
      selectFieldCallback,
      tableHeight,
      synchronous,
      validRules,
      validEvent,
      showModalHint,
      hintList,
      entityInfosActive,
      resizableChange,
      getRemoveEvent,
      deledList,
      isKeyEvent,
      insertEvent,
      rules: {
        dbSourceId: {
          required: true,
          message: "请选择数据源",
          trigger: "blur",
        },
        createType: {
          required: true,
          message: "请选择创建类型",
          type: "number",
          trigger: "blur",
        },
        tableName: {
          required: true,
          message: "请输入表名或选择表",
          trigger: "blur",
        },
        tableNameCh: {
          required: true,
          message: "请输入中文表名或选择表",
          trigger: "blur",
        },
        packageName: {
          required: true,
          message: "请输入包名",
          trigger: "blur",
        },
        tablePrefix: {
          required: true,
          message: "请输入前缀",
          trigger: "blur",
        },
        moduleName: {
          required: true,
          message: "请输入实体",
          trigger: "blur",
        },
        author: {
          required: true,
          message: "请输入作者",
          trigger: "blur",
        },
      },
    };
  },
  created() { },
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