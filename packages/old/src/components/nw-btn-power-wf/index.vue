<template>
  <n-button
    v-for="btn in btns"
    :key="btn.id"
    size="small"
    type="info"
    @click="handle(btn)"
    class="my-info-button"
    :disabled="props.disabled[btn.resourceCode]"
    style="margin-right: 5px"
  >
    {{ btn.resourceName }}
  </n-button>
  <n-drawer v-model:show="active" width="100%" content-style="overflow:hidden">
    <iframe
      ref="iframeRef"
      :src="url"
      style="border: 0; width: 100%; height: 100%; overflow: hidden"
    />
  </n-drawer>
</template>
<script>
import { NBadge, NButton, NDrawer, NDrawerContent } from "naive-ui";
import { h, ref, reactive, defineComponent, watch, inject } from "vue";
import redirectPage from "/@/plugins/redirect-page";
// 获取功能 流程入口按钮
let wfPage = null;
export default defineComponent({
  components: {
    NButton,
    NDrawer,
    NDrawerContent,
  },
  props: {
    disabled: {
      type: Object,
      default: () => ({}),
    },
    getParams: {
      type: Function,
      default: () => () => {}, // 参数获取函数
    },
    isWfEntry: {
      type: Boolean,
      default: true,
    },
    isNewPage: {
      type: Boolean,
      default: true,
    },
    manualBtns: {
      type: [Array, null],
      default: () => null
    }
  },
  setup(props) {
    const iframeRef = ref(null);
    const url = ref("");
    const active = ref(false);
    // console.log('=====power=====', inject('workflow'))
    const pD = ref({});
    const wfPageLoaded = async (event) => {
      const {
        detail: { camundaProcdefKey, forms = [] },
      } = event;
      // 便利获取表单
      //
      // pD.value = props.getParams(btn.resourceCode)
      // 这里需要变为同步

      for (let i = 0; i < forms.length; i++) {
        pD.value[forms[i]] = await props.getParams(camundaProcdefKey, forms[i]);
      }
      // forms.forEach(fd => {
      //   pD.value[fd] = props.getParams(camundaProcdefKey, fd)
      // })
      // console.log('=======event===forms==', forms)

      // 判断
      if (props.isNewPage) {
        // 传值给新页面的流程表单
        wfPage &&
          wfPage.dispatchEvent(
            new CustomEvent("wfParams", { detail: pD.value })
          );
      } else {
        // 传值给父级·的流程表单
        iframeRef.value &&
          iframeRef.value.contentWindow.dispatchEvent(
            new CustomEvent("wfParams", { detail: pD.value })
          );
      }
      window.removeEventListener("wfPageLoaded", wfPageLoaded);
    };
    window.addEventListener("wfClose", () => {
      active.value = false;
    });
    return {
      props,
      iframeRef,
      url,
      active,
      pD,
      btns: (props.manualBtns && props.manualBtns.length ) ? props.manualBtns : inject("workflow"),
      handle(btn) {
        // console.log('=====btn=====', btn)
        window.addEventListener("wfPageLoaded", wfPageLoaded);
        //
        if (props.isNewPage) {
          // 这里需要请求
          // 这里需要区分展示方式
          wfPage = redirectPage(
            `${btn.resourceUrl}&isParamsChannel=${pD.value ? "1" : "0"}`,
            true,
            false
          );
        } else {
          // wfPage =
          active.value = true;
          url.value = `${btn.resourceUrl}&isParamsChannel=${
            pD.value ? "1" : "0"
          }`;
        }

        //
        // 设定传值 window.opener.dispatchEvent(new CustomEvent('wfParams', paramsData));
      },
    };
  },
});
</script>

<style lang='less'>
</style>