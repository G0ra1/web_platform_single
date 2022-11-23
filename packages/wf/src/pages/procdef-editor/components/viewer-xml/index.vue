<template>
  <!-- <div ref="dom" class="design-viewer"></div> -->
  <div style="overflow: scroll; height: 100%;width: 100%">
    <n-code
      language="xml"
      :code="code"
      :hljs="hljs"
    />
  </div>
</template>
<script lang="jsx">
import { ref, nextTick } from "vue";
import hljs from 'highlight.js/lib/core'
hljs.configure({useBR: true})
import { init } from "../../store/index"
import { getXML } from "../../store/bpmn"
import {
  NCode
} from "naive-ui";
export default {
  components: {
    NCode
  },
  props: {},
  setup(props) {
    const code = ref('');
    getXML().then(res => {
      code.value = res.xml
    })
    return {
      code,
      hljs
    };
  },
};
</script>

<style lang="less">
.design-viewer {
  height: 100%
}
@import "../../style/bpmn-viewer.less";
</style>
