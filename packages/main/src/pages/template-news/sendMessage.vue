<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="信息发送"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:500px;"
  >
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="1">
          <n-grid-item>
            <n-form-item label="模板标题" path="tmpTitle">
              <n-input size="small" placeholder="请输入" v-model:value="model.tmpTitle" disabled />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="消息内容" path="tmpContent">
              <n-input size="small" placeholder="请输入" v-model:value="model.tmpContent" disabled />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="消息来源" path="msgSource">
              <n-input size="small" placeholder="请输入" v-model:value="model.msgSource" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item style="position: relative;">
            <n-form-item label="内容参数(json格式)" path="msgParams">
              <n-input
                size="small"
                placeholder="请输入"
                type="textarea"
                v-model:value="model.msgParams"
              />
              <n-button
                size="small"
                type="text"
                style="position: absolute;top:-32px;left:130px;color:#4098fc;background:none;border:none"
                @click="msgParamsModal = true"
              >设置参数</n-button>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="选择人员" path="receiverUserList">
              <n-input
                class="my-search"
                size="small"
                placeholder
                disabled
                :value="model.receiverUserList.length ?model.receiverUserList.map(d=>d.receiverUserName).join(','):'' "
              >
                <template #suffix>
                  <n-button size="small" type="info" @Click="(e)=>{employeePickModal.sonFn()}">选择</n-button>
                </template>
              </n-input>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button
          size="small"
          type="default"
          style="margin-right: 5px"
          @click="showModal = false"
        >取消</n-button>
        <n-button size="small" type="info" @click="onPositiveClick">保存</n-button>
      </div>
    </template>
    <n-modal
      v-model:show="msgParamsModal"
      :mask-closable="false"
      preset="dialog"
      title="参数设置"
      content="你确认"
      positive-text="确认"
      negative-text="取消"
      style="width:500px;"
    >
      <n-form :model="model" label-placement="left" label-width="40" >
        <n-form-item v-for="(item,i) in paramsList" :key="i" :label="item" :path="item">
          <n-input size="small" :placeholder="`请输入${item}`" v-model:value="params[item]" />
        </n-form-item>
      </n-form>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button
            size="small"
            type="default"
            style="margin-right: 5px"
            @click="msgParamsModal = false"
          >取消</n-button>
          <n-button size="small" type="info" style="margin-right: 5px" @click="msgParamsConfirm">确定</n-button>
        </div>
      </template>
    </n-modal>
  </n-modal>
  <EmployeePickModal
    ref="employeePickModal"
    :showSide="true"
    :multiple="true"
    @update:callback="
      (e) => {
          model.receiverUserList = []
          e.map(d=>{
            model.receiverUserList.push({
                receiverUserId:d.empId,
                receiverUserName:d.userNameCh
            })
          })
         
      }
    "
  ></EmployeePickModal>
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
  NButton,
  NSpin
} from "naive-ui";
import { sendMessage } from "./api";
import { cloneDeep } from "lodash";
import { EmployeePickModal } from '@platform/main'
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
    NButton,
    NSpin,
    EmployeePickModal
  },
  props: {
    model: {
      default: {},
      type: Object
    }
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const model = ref({});
    const isLoading = ref(false);
    const formRef = ref(null);
    const employeePickModal = ref();

    const paramsList = ref([]);
    const msgParamsModal = ref(false);
    const params = ref({});
    const msgParamsConfirm = () => {
      model.value.msgParams = JSON.stringify(params.value);
      msgParamsModal.value = false;
    };

    const sonFn = (e = {}) => {
      showModalRef.value = true;
      e.receiverUserList = [];
      model.value = cloneDeep(e);
      if (model.value.tmpContent.indexOf("$") == -1) {
        paramsList.value = [];
      } else {
        paramsList.value = model.value.tmpContent
          .split("${")
          .map(d => d.split("}")[0])
          .filter(d => d != "");
      }
      console.log(model.value.tmpContent.split("${").map(d => d.split("}")[0]));
    };
    const isJSON = str => {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log("error：" + str + "!!!" + e);
          return false;
        }
      }
    };
    onMounted(async () => {});
    return {
      employeePickModal,
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      isLoading,
      formRef,
      isJSON,
      msgParamsModal,
      params,
      msgParamsConfirm,
      paramsList,
      rules: {
        receiverUserList: {
          type: "array",
          required: true,
          trigger: ["blur", "change"],
          message: "请选择人员"
        }
      },

      onPositiveClick() {
        formRef.value.validate(errors => {
          if (!errors) {
            console.log(isJSON(model.value.msgParams), "-=-===");
            if (isJSON(model.value.msgParams) || !model.value.msgParams) {
              isLoading.value = true;
              sendMessage(model.value)
                .then(res => {
                  if (res) {
                    context.emit("update:callback");
                    showModalRef.value = false;
                  }
                })
                .finally(r => {
                  isLoading.value = false;
                });
            } else {
              window.$message.error("请输入正确的json格式");
            }
          }
        });
      },
      onNegativeClick() {
        showModalRef.value = false;
      }
    };
  },
  methods: {}
});
</script>