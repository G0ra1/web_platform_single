<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="课程标签维护"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width: 500px"
  >
    <n-form>
      <n-grid x-gap="8" :cols="1">
        <n-grid-item>
          <n-form-item :label="dictItemNameTitle" path="dictItemName">
            <n-input
              size="small"
              placeholder="请输入"
              v-model:value="model.dictItemName"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item :label="dictItemCodeTile" path="dictItemCode">
            <n-input
              size="small"
              placeholder="请输入"
              v-model:value="model.dictItemCode"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="排序" path="sort">
            <n-input-number
              size="small"
              :min='0'
              style="width:100%"
              placeholder="请输入"
              v-model:value="model.sort"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="备注" path="remark">
            <n-input
              size="small"
              placeholder="请输入"
              v-model:value="model.remark"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-form>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  NModal,
  NInput,
  NInputNumber,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  useMessage,
} from "naive-ui";
import { creatDictItem, editDictItem } from "./api";
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
    NInputNumber
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const model = ref({});
    const message = useMessage();
    const dictItemNameTitle = ref("字典项");
    const dictItemCodeTile = ref("字典编码");
    const sonFn = (e = {}, nt, ct) => {
      dictItemNameTitle.value = nt||'字典项';
      dictItemCodeTile.value = ct||'字典编码';
      showModalRef.value = true;
      model.value = cloneDeep(e);
    };

    onMounted(async () => {});
    return {
      sonFn,
      dictItemNameTitle,
      dictItemCodeTile,
      model, // 表单数据
      showModal: showModalRef,
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
      onPositiveClick() {
        const fn = !model.value.id ? creatDictItem : editDictItem;
        fn({...model.value,dictCode:'STUDY_COURSE_TYPE'}).then((res) => {
          if (res) {
            context.emit("update:callback");
            message.success("操作成功");
            showModalRef.value = false;
          }
        });
      },
      onNegativeClick() {
        showModalRef.value = false;
      },
    };
  },
  methods: {},
});
</script>