<template>
  <n-modal
    v-model:show="paramsModalShow"
    :mask-closable="false"
    preset="dialog"
    title="参数设置(会自动忽略不全的键值对)"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width: 500px; max-height: 800px"
  >
    <n-form class="my-form" label-placement="left" label-width="80">
      <n-grid x-gap="8" :cols="1">
        <template v-for="(item, i) in keyList" :key="i">
          <n-grid-item>
            <n-form-item
              :label="i == 0 ? 'key-val' : ' '"
              v-if="item !== 'add*'"
            >
              <n-input
                size="small"
                :placeholder="`请输入key值`"
                v-model:value="keyList[i]"
              />
              -
              <n-input
                size="small"
                :placeholder="`请输入val值`"
                v-model:value="valueList[i]"
              />
              <n-button
                size="small"
                @click="
                  () => {
                    delParams(i);
                  }
                "
                >-</n-button
              >
              <n-button
                size="small"
                @click="
                  () => {
                    addParams();
                  }
                "
                >+</n-button
              >
            </n-form-item>
          </n-grid-item>
        </template>
      </n-grid>
    </n-form>
    <template #action>
      <div style="padding: 0 5px 5px 0">
        <n-button
          size="small"
          type="default"
          style="margin-right: 5px"
          @click="paramsModalShow = false"
          >取消</n-button
        >
        <n-button
          size="small"
          type="info"
          style="margin-right: 5px"
          @click="paramsConfirm"
          >确定</n-button
        >
      </div>
    </template>
  </n-modal>
</template>
<script lang="jsx">
import {
    h,
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";
import NwIcon from "/@/components/nw-icon/index.vue";
import cookies from "/@/utils/cookies.js";

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
  NDataTable,
  NPagination,
  NGrid,
  NGridItem
} from "naive-ui";
import { list } from "../api";

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
    NDataTable,
    NPagination,
    NGrid,
    NGridItem
  },
  props: {},
  data() {
    return {};
  },
  setup(props, context) {
    const paramsModalShow = ref(false)
    const keyList = ref([])
    const valueList = ref([])
    const pType= ref("")
    const show = (pListString,type)=>{
        pType.value = type
        keyList.value = []
        valueList.value = []
        paramsModalShow.value = true
        if(pListString){
            let pList = JSON.parse(pListString)
            for (let key in pList){
                keyList.value.push(key)
                valueList.value.push(pList[key])
            }
        }else{
            keyList.value.push('')
            valueList.value.push('')
        }
    }
    const addParams = ()=>{
        keyList.value.push('')
        valueList.value.push('')
    }
    const delParams= (index)=>{
        keyList.value.splice(index,1)
        valueList.value.splice(index,1)
    }
    const paramsList  = ref([]);
    const paramsConfirm = ()=>{
        let params = {}
        keyList.value.forEach((e,index) => {
            if(e&&valueList.value[index]){
                params[e]=valueList.value[index]
            }  
        });
        context.emit('getParams',JSON.stringify(params),pType.value)
        paramsModalShow.value = false;

    }
    onMounted(async () => {
    });

    return {
        paramsModalShow,
        show,
        pType,
        paramsList,
        keyList,
        valueList,
        addParams,
        delParams,
        paramsConfirm
    };
  },
  created() {},
  methods: {},
});
</script>
<style lang="less">
.my-form {
  max-height: 500px;
  overflow-x: auto;
}
* {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #666;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
}
</style>