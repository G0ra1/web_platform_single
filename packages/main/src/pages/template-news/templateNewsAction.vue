<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="消息模板管理" content="你确认"
    positive-text="确认" negative-text="取消" style="width:650px;">
    <!-- @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"-->
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" :rules="rules">
        <n-grid x-gap="8" :cols="2">
          <n-grid-item>
            <n-form-item label="模板名称" path="tmpName">
              <n-input size="small" placeholder="请输入" v-model:value="model.tmpName" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="模板标题" path="tmpTitle">
              <n-input size="small" placeholder="请输入" v-model:value="model.tmpTitle" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="模板编码" path="tmpCode">
              <n-input size="small" placeholder="请输入" v-model:value="model.tmpCode" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item :span="2" style="position: relative;">
            <n-form-item label="模板内容" path="tmpContent">
              <n-input size="small" placeholder="请输入123" type="textarea" :rows="5" v-model:value="model.tmpContent"
                style="height: 300px;" />
              <n-button size="small" type="text"
                style="position: absolute;top:-32px;left:60px;color:#4098fc;background:none;border:none"
                @click="insertModal = true">插入变量</n-button>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button size="small" type="default" style="margin-right: 5px" @click="showModal = false">取消</n-button>
        <n-button size="small" type="info" @click="onPositiveClick">保存</n-button>
      </div>
    </template>
    <n-modal v-model:show="insertModal" :mask-closable="false" preset="dialog" title="插入变量名" content="你确认"
      positive-text="确认" negative-text="取消" style="width:500px;">
      <n-form-item label="变量名称" path="tmpName">
        <n-input size="small" placeholder="请输入变量名" v-model:value="variable_c" />
      </n-form-item>
      <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default" style="margin-right: 5px" @click="insertModal = false">取消</n-button>
          <n-button size="small" type="info" style="margin-right: 5px" @click="() => insertContent(0)">插入内容开始</n-button>
          <n-button size="small" type="info" @click="() => insertContent(-1)">插入内容末尾</n-button>
        </div>
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
  NButton,
  NSpin,
  useMessage
} from "naive-ui";
import { creatTmp, editTmp } from "./api";
import { cloneDeep } from "lodash";

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
    NSpin
  },
  props: {
    model: {
      default: {},
      type: Object
    }
  },

  setup(props, context) {
    const msg = useMessage();
    const showModalRef = ref(false);
    const model = ref({});
    const isLoading = ref(false);
    const formRef = ref(null);
    const sonFn = (e = {}) => {
      showModalRef.value = true;
      model.value = cloneDeep(e);
    };
    const variable_c = ref("");
    const insertModal = ref(false);
    const insertContent = index => {
      if (!variable_c.value) {
        msg.warning("变量名不能为空");
        return;
      }
      if (index == -1) {
        model.value.tmpContent =
          model.value.tmpContent + "${" + variable_c.value + "}";
      } else {
        model.value.tmpContent =
          "${" + variable_c.value + "}" + model.value.tmpContent;
      }
      insertModal.value = false;
    };
    onMounted(async () => { });
    return {
      sonFn,
      model, // 表单数据
      showModal: showModalRef,
      isLoading,
      formRef,
      rules: {
        tmpName: [
          {
            required: true,
            message: "请输入模板名称",
            trigger: ["input", "blur"]
          }
        ],
        tmpTitle: [
          {
            required: true,
            message: "请输入模板标题",
            trigger: ["input", "blur"]
          }
        ],
        tmpCode: [
          {
            required: true,
            message: "请输入模板编码",
            trigger: ["input", "blur"]
          }
        ],
        msgSource: [
          {
            required: true,
            message: "请输入消息来源",
            trigger: ["input", "blur"]
          }
        ]
      },
      insertModal,
      variable_c,
      insertContent,

      onPositiveClick() {
        const fn = !model.value.id ? creatTmp : editTmp;
        formRef.value.validate(errors => {
          if (!errors) {
            isLoading.value = true;
            fn(model.value)
              .then(res => {
                if (res) {
                  context.emit("update:callback");
                  showModalRef.value = false;
                }
              })
              .finally(r => {
                isLoading.value = false;
              });
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