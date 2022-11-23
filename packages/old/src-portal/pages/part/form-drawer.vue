<template>
  <n-drawer
    v-model:show="drawerVisible"
    width="600px"
    :height="200"
    placement="right"
  >
    <n-drawer-content
      title="新建栏目"
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <n-spin :show="spinShow">
        <n-form inline :model="model" :rules="[]" ref="formRef">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="所属门户" path="portalId">
              <!-- <n-select
                v-model:value="model.portalId"
                placeholder="请选择门户"
                :options="portalOptions"
                :fallback-option="
                  (value) => ({ label: '' + model.portalName, value })
                "
                :on-update:value="portalSelect"
              /> -->
              <nw-dic
                v-model:value="model.portalId"
                v-model:label="model.portalName"
                :request="{
                  XHR: requestPortalList,
                  params: {},
                }"
                :response="{
                  dataMethod: (res) =>
                    res.records.map(({ id: value, portalName: label }) => ({
                      value,
                      label,
                    })),
                }"
                placeholder="请选择门户"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="栏目类型" path="partTypeId">
              <nw-dic
                v-model:value="model.partTypeId"
                v-model:label="model.partTypeName"
                v-model:partTypeCode="model.partTypeCode"
                :request="{
                  XHR: requestPartType,
                  params: {},
                }"
                :response="{
                  dataMethod: (res) =>
                    res.map(({ id: value, partTypeName: label, ...p }) => ({
                      value,
                      label,
                      ...p,
                    })),
                }"
                placeholder="请选择门户"
                :reflect="['partTypeCode']"
              />
              <!-- <n-select
                v-model:value="model.partTypeId"
                placeholder="请选择栏目类型"
                :options="partTypeOptions"
                :fallback-option="
                  (value) => ({ label: '' + model.partTypeName, value })
                "
                :on-update:value="partTypeSelect"
              /> -->
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="栏目名称" path="partName">
              <n-input
                placeholder="请输入栏目名称"
                v-model:value="model.partName"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="栏目编码" path="partCode">
              <n-input
                placeholder="请输入栏目编码"
                v-model:value="model.partCode"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="是否启用" path="isEnable">
              <n-radio-group
                size="small"
                v-model:value="model.isEnable"
                name="radiogroup"
              >
                <n-radio size="small" :value="1"> 启用 </n-radio>
                <n-radio size="small" :value="0"> 停用 </n-radio>
              </n-radio-group>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="数据源类型" path="title">
              <n-radio-group
                name="radiogroup"
                :value="model.isDs"
                @update:value="
                  (d) => {
                    model.isDs = d;
                    if (d) {
                      model.portalPartDsDto = {};
                    } else {
                      delete model.portalPartDsDto;
                    }
                  }
                "
              >
                <n-space>
                  <n-radio :value="0"> 默认数据源 </n-radio>
                  <n-radio :value="1"> 自选数据源 </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item-gi>
            <!-- <n-form-item-gi :span="12" label="数据源类型" path="title">
              <n-radio-group
              name="radiogroup"
              :value="+!!model.portalPartDsDto"
              @update:value="d => {
                model.portalPartDsDto = d ? {} : null
              }"
              >
                <n-space>
                  <n-radio :value="0">
                    默认数据源
                  </n-radio>
                  <n-radio :value="1">
                    自选数据源
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item-gi> -->
            <template v-if="!!model.portalPartDsDto">
              <n-form-item-gi :span="24" label="选择数据源" path="title">
                <nw-dic
                  :value="model.portalPartDsDto.dsCode"
                  @update:value="onUpdateDataSource"
                  :request="{
                    XHR: requestDataSourceLists,
                    params: {},
                  }"
                  :response="{
                    dataMethod: (res) =>
                      res.map((p) => ({
                        value: p.dsCode,
                        label: p.dsName,
                        ...p,
                      })),
                  }"
                  placeholder="请选择数据源"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="12"
                label="数据源名称"
                path="portalPartDsDto.dsName"
              >
                <n-input
                  placeholder="数据源名称"
                  v-model:value="model.portalPartDsDto.dsName"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="12"
                label="数据源Code"
                path="portalPartDsDto.dsCode"
              >
                <n-input
                  placeholder="数据源Code"
                  v-model:value="model.portalPartDsDto.dsCode"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="12"
                label="请求方式"
                path="portalPartDsDto.dsReq"
              >
                <n-select
                  v-model:value="model.portalPartDsDto.dsReq"
                  placeholder="请选择请求方式"
                  :options="dsReqOptions"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="12" label="URL" path="title">
                <n-input
                  placeholder="URL"
                  v-model:value="model.portalPartDsDto.dsUrl"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="24" label="请求参数(JSON)" path="title">
                <n-input
                  type="textarea"
                  placeholder="请输入JSON格式参数"
                  v-model:value="model.portalPartDsDto.dsParamsVal"
                />
              </n-form-item-gi>
            </template>
          </n-grid>
        </n-form>
      </n-spin>
      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="handleSave"
          >保存</n-button
        >
        <n-button size="small" @click="drawerVisible = false">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import NwIcon from "/@/components/nw-icon/index.vue";
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import {
  NSpace,
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
  NRadioGroup,
  NGrid,
  NFormItemGi,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import Setting from "/setting";
import { create, edit } from "./api";
import { portalPortalList as requestPortalList } from "/src-portal/pages/portal-manage/api";
import { portalDsLists as requestDataSourceLists } from "/src-portal/pages/dataSource-manage/api";
import { portalPartTypeLists as requestPartType } from "./api";
import NwDic from "/@/components/nw-dictionary/index.vue";
import { partInstance } from "./components/content";

export default defineComponent({
  components: {
    NSpace,
    NDrawer,
    NDrawerContent,
    NwTable,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NwTableFun,
    NForm,
    NFormItem,
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NRadioGroup,
    NGrid,
    NFormItemGi,
    NwDic,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props, context) {
    const message = useMessage();
    const drawerVisible = ref(false);
    const spinShow = ref(false);
    const model = ref({
      portalId: null,
      partTypeId: null,
      isEnable: 1,
      isDs: 0,
    });
    return {
      model,
      requestPortalList,
      requestPartType,
      requestDataSourceLists,
      drawerVisible,
      show(row) {
        if (row) {
          // 编辑
          model.value = row;
        } else {
          // 新建
          model.value = {
            portalId: null,
            partTypeId: null,
            isEnable: 1,
            isDs: 0,
          };
        }
        drawerVisible.value = true;
      },
      spinShow,
      dsReqOptions: [
        {
          label: "get",
          value: 0,
        },
        {
          label: "post",
          value: 1,
        },
      ],
      onUpdateDataSource: (v, o) => {
        model.value.portalPartDsDto = o;
        model.value.portalPartDsDto.dsId = o.id;
        console.log(
          "====model.portalPartDsDto=====",
          model.value.portalPartDsDto
        );
      },
      handleSave: () => {
        // 这里需要生成代码
        console.log("==partInstance====", partInstance);
        try {
          model.value.frontData = partInstance[model.value.partTypeCode](
            model.value
          );
        } catch (error) {}

        console.log("=======handleSave=======", model.value);
        // return
        // 判断
        let fn = model.value.id ? edit : create;
        // 这里判断dsId

        fn(model.value)
          .then((res) => {
            if (res) {
              let t = model.value.id ? "修改" : "创建";
              message.success(`${t}栏目成功`);
            } else {
              message.error(`${t}栏目成功`);
            }
          })
          .catch((error) => {
            message.error(`栏目失败${error}`);
          })
          .finally(() => {
            context.emit("created");
            // drawerVisible.value = false;
          });
      },
    };
  },
});
</script>