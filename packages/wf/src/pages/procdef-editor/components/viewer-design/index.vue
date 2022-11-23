<template>
  <div ref="dom" class="design-viewer" style=""></div>
</template>
<script lang="jsx">
import { ref, nextTick } from "vue";
import {
  dom
} from "../../store/viewer-design"

export default {
  components: {},
  props: {},
  setup() {
    return {
      dom,
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
