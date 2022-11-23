<template>
  <slot v-if="flag" ></slot>
</template>
<script>
import { NBadge } from "naive-ui";
import { h, ref, reactive, computed, inject } from "vue";


export default {
  components: {
    NBadge
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    // isAsync: {
    //   type: Boolean,
    //   default: ''
    // }
  },
  setup(props) {
    return {
      flag: computed(() => {
        console.log('=======inject[]====', inject('btnPower'))
        return !!inject('btnPower')[props.code]
      })
    };
  }
}
</script>

<style lang='less'>

</style>