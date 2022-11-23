<template>
  <svg class="icon" aria-hidden="true" :style="{
    ...getSize(props.size),
    color: props.color
  }" :title="props.title">
    <use :xlink:href="`#${props.name}`"></use>
  </svg>
</template>
<script>
import {
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch } from 'vue'

export default defineComponent({
  props: {
    // 接口请求
    'name': {
      type: String,
      default: ''
    },
    'size': {
      type: [String, Number],
      default: '1em'
    },
    'color': {
      type: String,
      default: 'none'
    },
    'title': {
      type: String,
      default: ''
    }
  },
  components: {
  },
  setup (props) {
    return {
      props,
      getSize (psize) {
        let size = "1em"
        if (typeof psize === 'number') {
          size = `${psize}px`
        } else {
          switch (psize) {
            case 'small':
              size = '28px'
              break;
            case 'medium':
              size = '34px'
              break;
            case 'large':
              size = '40px'
              break;
          }
        }
        return {
          width: size,
          height: size
        }
      }
    }
  }
})
</script>

<style lang='less'>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>