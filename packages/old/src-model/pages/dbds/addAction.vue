<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="数据源维护"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width: 1000px"
  >
    <n-spin :show="isLoading">
      <div style="width: 80%; padding-top: 10px; margin: auto; height: 40px">
        <n-space vertical justify="center">
          <n-steps size="small" :current="current">
            <n-step title="数据源类型" />
            <n-step title="数据源信息" />
          </n-steps>
        </n-space>
      </div>
      <div class="dbs-form">
        <n-radio-group
          v-model:value="model.type"
          class="radio-group"
          name="type"
          v-show="current == 1"
        >
          <n-grid x-gap="9" :cols="1" v-if="current == 1">
            <n-grid-item>
              <n-form-item path="type">
                <template #label>
                  <span>关系存储</span>
                </template>

                <n-radio-button
                  v-for="song in rdbms"
                  :key="song.value"
                  :value="song.value"
                >
                  <img :src="song.label" alt />
                </n-radio-button>
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item path="type">
                <template #label>
                  <span>文件存储</span>
                </template>
                <n-radio-button
                  v-for="song in filedbms"
                  :key="song.value"
                  :value="song.value"
                >
                  <img :src="song.label" alt />
                </n-radio-button>
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item path="type">
                <template #label>
                  <span>消息队列</span>
                </template>
                <n-radio-button
                  v-for="song in msgdbms"
                  :key="song.value"
                  :value="song.value"
                >
                  <img :src="song.label" alt />
                </n-radio-button>
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-radio-group>
        <div class="form-box" v-if="current == 2">
          <mysqlForm
            ref="formRef"
            v-if="
              model.type == 'mysql' ||
              model.type == 'oracle' ||
              model.type == 'sqlserver'
            "
            @callBack="callBack"
            :model="model"
          />
          <fileds
            ref="formRef"
            v-if="model.type == 'MINIO' || model.type == 'LOCAL'"
            @callBack="callBack"
            :model="model"
          />
          <consumer
            ref="formRef"
            v-if="model.type == 'rocketmqxf' || model.type == 'rabbitmqxf'"
            @callBack="callBack"
            :model="model"
          />
          <producer
            ref="formRef"
            v-if="model.type == 'rocketmqsc' || model.type == 'rabbitmqsc'"
            @callBack="callBack"
            :model="model"
          />
        </div>
      </div>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0">
        <n-button
          type="primary"
          size="small"
          style="margin-right: 5px"
          v-if="current !== 1 && !model.id"
          @click="current = --current"
          :loading="isLoading"
          >上一步</n-button
        >
        <n-button
          type="primary"
          size="small"
          style="margin-right: 5px"
          v-if="current < 2 && model.type"
          :loading="isLoading"
          @click="
            () => {
              current = ++current;
            }
          "
          >下一步</n-button
        >
        <n-button
          size="small"
          type="default"
          style="margin-right: 5px"
          @click="showModal = false"
          :loading="isLoading"
          >取消</n-button
        >
        <n-button
          type="primary"
          size="small"
          style="margin-right: 5px"
          :loading="isLoading"
          v-if="
            current == 2 &&
            model.type != 'rocketmqxf' &&
            model.type != 'rabbitmqxf' &&
            model.type != 'rocketmqsc' &&
            model.type != 'rabbitmqsc'
          "
          @click="testConnect"
          >测试连接</n-button
        >
        <n-button
          size="small"
          type="info"
          @click="onPositiveClick"
          :loading="isLoading"
          v-if="current == 2"
          >保存</n-button
        >
      </div>
    </template>
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
  NSteps,
  NCard,
  NStep,
  NRadioButton,
  NRadioGroup,
  NTag,
  useMessage,
  NSpace,
} from "naive-ui";
import { add, edit, dictItemLists } from "./api";
import { cloneDeep } from "lodash";
import aes from "/@/utils/aes.js";
import mysqlForm from "./form/mysql.vue";
import fileds from "./form/fileds.vue";
import consumer from "./form/consumer.vue";
import producer from "./form/producer.vue";

import { VXETable } from "vxe-table";

export default defineComponent({
  components: {
    mysqlForm,
    fileds,
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
    NSteps,
    NStep,
    NCard,
    NRadioButton,
    NRadioGroup,
    NTag,
    NSpace,
    consumer,
    producer,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const modelRef = ref({});
    const arrData = reactive({ procdefTypes: [] });
    const message = useMessage();
    const currentRef = ref(1);
    const xTable = ref();
    const isLoading = ref(false);
    const formRef = ref(null);
    const sonFn = (e = {}) => {
      // isLoading.value = true
      if (e.id) {
        currentRef.value = 2;
        modelRef.value = e;
        if (modelRef.value.consumerGroup) {
          modelRef.value.mq == "rabbit"
            ? (modelRef.value.type = "rabbitmqxf")
            : (modelRef.value.type = "rocketmqxf");
        } else if (modelRef.value.producerGroup) {
          modelRef.value.mq == "rabbit"
            ? (modelRef.value.type = "rabbitmqsc")
            : (modelRef.value.type = "rocketmqsc");
        }
      } else {
        currentRef.value = 1;
        modelRef.value = {};
      }

      showModalRef.value = true;
    };

    onMounted(async () => {});
    return {
      sonFn,
      xTable,
      arrData,
      showModal: showModalRef,
      model: modelRef, // 表单数据
      isLoading,
      current: currentRef,
      formRef,
      rdbms: reactive([
        {
          value: "mysql",
          label: "/web-old/assets/image/mysql.jpg",
          type: "1",
        },
        {
          value: "oracle",
          label: "/web-old/assets/image/oracle.jpg",
          type: "2",
        },
        {
          value: "sqlserver",
          label: "/web-old/assets/image/sqlserver.jpg",
          type: "3",
        },
      ]),
      filedbms: reactive([
        {
          value: "MINIO",
          label: "/web-old/assets/image/minio.jpg",
          type: "4",
        },
        {
          value: "LOCAL",
          label: "/web-old/assets/image/folder.jpg",
          type: "5",
        },
      ]),
      msgdbms: reactive([
        {
          value: "rocketmqsc",
          label: "/web-old/assets/image/rocketmqshengchan.jpg",
          type: "6",
        },
        {
          value: "rocketmqxf",
          label: "/web-old/assets/image/rocketmqxiaofei.jpg",
          type: "7",
        },
        {
          value: "rabbitmqsc",
          label: "/web-old/assets/image/rabbitmqshengchan.jpg",
          type: "8",
        },
        {
          value: "rabbitmqxf",
          label: "/web-old/assets/image/rabbitmqxiaofei.jpg",
          type: "9",
        },
      ]),
      status: reactive([
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ]),

      rules: {
        procdefTypeName: [
          {
            required: true,
            message: "请输入流程分类名称",
            trigger: ["input", "blur"],
          },
        ],
      },
      callBack(type) {
        if (type) {
          if (modelRef.value.id) {
            message.success("编辑成功");
          } else {
            message.success("保存成功");
          }
          showModalRef.value = false;
          context.emit("callBck");
        }
        isLoading.value = false;
      },
      onPositiveClick() {
        isLoading.value = true;
        formRef.value.saveForm();
      },
      onNegativeClick() {
        showModalRef.value = false;
      },
      testConnect() {
        formRef.value.handTest();
      },
    };
  },
  created() {
    this.dictItemLists();
  },
  methods: {
    dictItemLists() {
      dictItemLists({ code: "APP_NAME" }).then((res) => {
        console.log(res);
        this.sysList = res.map((d) => {
          return {
            label: d.dictItemName,
            value: d.dictItemCodedictItemCode,
          };
        });
      });
    },
  },
});
</script>
<style lang='less'>
.n-radio-group__splitor {
  height: 0 !important;
}
.dbs-form {
  height: auto;
  .radio-group {
    .n-form-item-label {
      span {
        padding-bottom: 10px;
        display: inline-block;
        width: 1200px;
        border-bottom: 1px solid #ccc;
        font-weight: 600;
        margin-bottom: 2px;
      }
    }
  }

  .n-radio-group .n-radio-button {
    border: 1px solid #ccc;
    margin-left: 15px;
    height: 93px;
    padding: 0;
    position: relative;
    span {
      --label-height: 0px !important;
      --label-padding: 0 0 0px 0px !important;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .n-radio-group .n-radio-button.n-radio-button--checked {
    box-shadow: 3px 3px 25px;
  }
}
</style>