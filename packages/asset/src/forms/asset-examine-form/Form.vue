<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="120"
    size="small"
    :style="{ paddingRight: '84px', paddingLeft: '84px', paddingTop: '10px' }"
  >
    <n-grid :cols="12" :x-gap="24">
      <n-form-item-gi :span="6" label="业务类别" path="businessType">
        <NwDic
          dictCode="asset_viewer_business"
          v-model:value="dataModel.businessType"
          v-model:label="dataModel.businessTypeName"
        ></NwDic>
      </n-form-item-gi>
      <n-form-item-gi :span="6" label="查看者" path="parentId">
        <n-input-group @click="selectUser('viewer')">
          <n-input
            v-model:value="dataModel.userNameChs"
            class="selectedInput"
            disabled
          />
          <n-button ghost v-if="!dataModel.id">
            <NwIcon
              name="icon-sousuo1"
              size="15"
              style="color: #828282; cursor: pointer"
            />
          </n-button>
        </n-input-group>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="查看范围"
        path="parentId"
        v-if="dataModel.taskLevel != 1"
      >
        <n-button @click="selectDept()" type="info"> 添加机构组织 </n-button>
        <n-button @click="selectUser()" type="info" style="margin-left: 15px">
          添加人员
        </n-button>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="范围内容"
        path="parentId"
        v-if="dataModel.taskLevel != 1"
      >
        <vxe-table
          border="inner"
          :data="detailList"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          style="width: 100%"
          ref="visibleRangeTable"
          show-overflow
        >
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column field="visibleType" title="可见类型">
            <template #default="{ row }">
              <span>
                {{
                  row.visibleType == "1"
                    ? "人员"
                    : row.visibleType == "2"
                    ? "部门"
                    : "机构"
                }}
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="rangeName" title="名称"> </vxe-table-column>
          <vxe-table-column field="#" title="操作">
            <template #default="{ _rowIndex }">
              <n-button
                type="error"
                size="small"
                style="margin-right: 5px"
                @click="
                  () => {
                    detailList.splice(_rowIndex, 1);
                    $refs.visibleRangeTable.loadData(detailList);
                  }
                "
                >删除</n-button
              >
            </template>
          </vxe-table-column>
        </vxe-table>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <employeePick
    ref="employeePickRef"
    @update:callback="getUsers"
    :multiple="true"
  ></employeePick>
  <chooseDept ref="chooseDeptRef" @update:callback="getDept"></chooseDept>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { cloneDeep } from "lodash";
import { NwIcon, NwDic } from '@platform/main'

import {
  useMessage,
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInputGroup,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NInputGroupLabel,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NRate,
  NButton,
} from "naive-ui";
import {
  dataModel,
  detailList,
  visiRanUsers,
  visiRanDept,
} from "./store.js";
import employeePick from "../../components/employeePick/index.vue";
import chooseDept from "../../components/chooseDept/index.vue";

export default defineComponent({
  components: {
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInputGroup,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NInputGroupLabel,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NRate,
    employeePick,
    chooseDept,
    NButton,
    NwDic,
    NwIcon,
  },
  setup() {
    const formRef = ref(null);
    const pOptions = ref([]);
    const visibleRangeTable = ref(null);
    const employeePickRef = ref(null);
    const userType = ref(null);
    const selectUser = (type) => {
      if (type == "viewer") {
        let user = [];
        if (dataModel.value.userNameChs) {
          console.log(
            dataModel.value,
            "(dataModel.value(dataModel.value(dataModel.value"
          );
          console.log(dataModel.value.userIds, "dataModel.value.userNameChs");
          let userNameChs = dataModel.value.userNameChs.split(",");
          let userNames = dataModel.value.userNames.split(",");
          let userIds = dataModel.value.userIds.split(",");

          for (let index = 0; index < userNameChs.length; index++) {
            user.push({
              userNameCh: userNameChs[index],
              userName: userNames[index],
              id: userIds[index],
            });
          }
        }
        employeePickRef.value.sonFn(user);
      } else {
        employeePickRef.value.sonFn(visiRanUsers.value);
      }
      userType.value = type;
    };
    const getUsers = (user) => {
      if (userType.value == "viewer") {
        dataModel.value.userNameChs = user.map((d) => d.userNameCh).join(",");
        dataModel.value.userNames = user.map((d) => d.userName).join(",");
        dataModel.value.userIds = user.map((d) => d.id).join(",");
      } else {
        visiRanUsers.value = cloneDeep(
          user.map((d) => {
            let m = {};
            m.visibleType = 1;
            m.rangeName = d.userNameCh;
            m.rangeId = d.id;
            return m;
          })
        );
      }
    };
    const chooseDeptRef = ref(null);
    const selectDept = () => {
      chooseDeptRef.value.sonFn(visiRanDept.value);
    };

    const getDept = (dept) => {
      let d = cloneDeep(
        dept.map((d) => {
          let m = {};
          m.visibleType = d.orgType == 1 ? 3 : 2;
          m.rangeName = d.orgName;
          m.rangeId = d.id;
          m.orgId = d.id;
          return m;
        })
      );
      visiRanDept.value = d;
    };
    watch(
      [() => visiRanDept.value, () => visiRanUsers.value],
      ([nDept, nUser]) => {
        console.log("部门", nDept);
        console.log("人员", nUser);
        detailList.value = [...nDept, ...nUser];
      }
    );
    onMounted(() => {
      console.log(dataModel);
    });
    return {
      dataModel,
      pOptions,
      formRef,
      rules: {},
      selectUser,
      userType,
      getUsers,
      employeePickRef,
      chooseDeptRef,
      selectDept,
      getDept,
      detailList,
      visibleRangeTable,
      visiRanDept,
      visiRanUsers,
    };
  },
});
</script>
<style>
.selectedInput.n-input.n-input--disabled .n-input__input-el {
  cursor: pointer;
}
</style>
