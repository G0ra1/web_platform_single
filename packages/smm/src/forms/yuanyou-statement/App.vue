<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="180"
    size="small"
    class="LForm"
  >
    <n-grid :cols="2" :x-gap="12" class="LFormNg">
      <n-form-item-gi :span="24" label="" path="">
        <h5 class="card-title">基本信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="填报日期" path="tianbaoshijian">
        <n-date-picker
          style="width: 100%"
          v-model:formatted-value="dataModel.tianbaoshijian"
          value-format="yyyy-MM-dd"
          type="date"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="填报人" path="tianbaoren">
        <n-input
          placeholder="填报人"
          disabled
          v-model:value="dataModel.tianbaoren"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="送检单位" path="songjiandanwei">
        <n-input
          placeholder="送检单位"
          v-model:value="dataModel.songjiandanwei"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="检测单位" path="jiancedanwei">
        <n-input
          placeholder="检测单位"
          v-model:value="dataModel.jiancedanwei"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="取样地点" path="quyangdidian">
        <n-input placeholder="填报人" v-model:value="dataModel.quyangdidian" />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="取样时间" path="quyangshijian">
        <n-date-picker
          style="width: 100%"
          v-model:formatted-value="dataModel.quyangshijian"
          value-format="yyyy-MM-dd"
          type="date"
        />
      </n-form-item-gi>
      <n-form-item-gi label="水含量(%)" path="shuihanliang">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.shuihanliang"
        />
      </n-form-item-gi>
      <n-form-item-gi label="交接温度下蒸气压(kpa)" path="jjwdxKpa">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.jjwdxKpa"
        />
      </n-form-item-gi>
      <n-form-item-gi label="机械杂质含量(%)" path="machineryImpurityLevel">
        <n-input
          placeholder="machineryImpurityLevel"
          style="width: 100%"
          v-model:value="dataModel.machineryImpurityLevel"
        />
      </n-form-item-gi>
      <n-form-item-gi label="204°c前馏分有机氯含量" path="yjlLevel">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.yjlLevel"
        />
      </n-form-item-gi>
      <n-form-item-gi label="盐含量(%)" path="saltContent">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.saltContent"
        />
      </n-form-item-gi>
      <n-form-item-gi label="密度20°c(kg/m3)" path="density">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.density"
        />
      </n-form-item-gi>
      <n-form-item-gi label="硫含量(%)" path="liuhanliang">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.liuhanliang"
        />
      </n-form-item-gi>
      <n-form-item-gi label="酸值(mg/g)" path="suanzhi">
        <n-input
          placeholder=""
          style="width: 100%"
          v-model:value="dataModel.suanzhi"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="图片" path="tupianId">
        <n-upload
          :action="uploadUrl"
          accept="image/png, image/jpeg, image/bmp"
          :show-file-list="false"
          v-if="!dataModel.tupianId"
          :headers="{
            Authorization: `${tokenType} ${token}`,
          }"
          :data="{
            fileSource: 'smm',
            poolName: 'localStudy',
          }"
          @finish="handleFinish"
        >
          <n-upload-dragger> 建议上传jpg、png图片 </n-upload-dragger>
        </n-upload>
        <div v-if="dataModel.tupianId">
          <n-image
            :src="dataModel.tupianUrl"
            height="50"
            width="50"
            style="padding-left: 15px"
          />
          <nw-icon
            @click="
              () => {
                (dataModel.tupianUrl = ''), (dataModel.tupianId = '');
              }
            "
            name="icon-lajitong"
            style="
              cursor: pointer;
              position: absolute;
              left: 70px;
              top: 35px;
              color: red;
            "
            size="{15}"
          />
        </div>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="备注" path="beizhu">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.beizhu"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="tsx">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  h,
  watch,
  onMounted,
} from "vue";
import type { ComponentPublicInstance, Ref, ReactiveEffect } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import { Db } from "@platform/main";
import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { dictItemLists } from "../../api/index.js";
import {
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NCard,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NSelect,
  NLayout,
  NMenu,
  NUpload,
  NDivider,
  NLayoutSider,
  NLayoutContent,
  NTreeSelect,
  TreeSelectOption,
  NUploadDragger,
  NImage,
  useMessage,
} from "naive-ui";
import { request, NwIcon, NwDic } from "@platform/main";
import { FormModal } from "./store";

export default defineComponent({
  components: {
    NForm,
    NUploadDragger,
    NFormItem,
    NGrid,
    NGridItem,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NCard,
    NDatePicker,
    NSelect,
    NTreeSelect,
    NwIcon,
    NwDic,
    NLayout,
    NUpload,
    NMenu,
    NDivider,
    NLayoutSider,
    NLayoutContent,
    NImage,
  },
  setup() {
    const {
      formRef,
      dataModel,
      rules,
      brules,
      setValue,
      getValue,
      validate,
      setRules,
      token,
      tokenType,
    } = new FormModal();
    const sumNum = (list: Array<any>, field: string) => {
      if (list && list.length <= 0) return 0;
      let count: number = 0;
      list.forEach((item: any) => {
        if (item[field]) {
          count += Number(item[field]);
        }
      });
      return count;
    };
    const message = useMessage();

    onMounted(() => {
      Db.get("userInfo").then((res: any) => {
        if (!dataModel.value.tianbaochangbie) {
          dataModel.value.tianbaochangbie = res.parentDeptName;
          dataModel.value.tianbaochangbieId = res.parentDeptId;
          dataModel.value.tianbaorendanwei = res.orgFullName;
          dataModel.value.tianbaorendanweiId = res.orgFullId;
          dataModel.value.tianbaoren = res.userNameCh;
          dataModel.value.tianbaorenId = res.id;
        }
        if (!dataModel.value.tianbaoshijian) {
          dataModel.value.tianbaoshijian = format(new Date(), "yyyy-MM-dd");
        }
      });
    });

    return {
      uploadUrl: `${window.apiBaseURL}/main/aliyunFile`,
      formRef,
      dataModel,
      rules,
      brules,
      validate,
      sumNum,
      token,
      tokenType,
      message,
      async beforeUpload() {
        return;
      },
      handleFinish(e?: any) {
        let { code, data, msg } = JSON.parse(e.event.target.response);
        if (code == 200) {
          message.success("上传成功");

          dataModel.value = {
            ...dataModel.value,
            tupianUrl: data.fileUrl,
            tupianId: data.id,
          };
        } else {
          message.error(msg);
        }
        return undefined;
      },
    };
  },
});
</script>

<style scoped>
/* .heji {
  font-weight: 600;
  margin-right: 15px;

}

.heji .label {
  margin-right: 8px;
} */

.card-title {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  border-left: 2px solid #C91019;
  margin: 0;
  height: 19px;
  line-height: 19px;
  padding-left: 16px;
  margin-top: 20px;
}
</style>
