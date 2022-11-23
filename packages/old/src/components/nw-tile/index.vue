<template>
  <div :class="{ 'nw-tile': true, 'nw-tile-icon-right': position == 'right' }">
    <div class="nw-tile-icon">
      <n-badge
        :value="props.badgeCount"
        :max="props.badgeCountMax"
        :showZero="props.showzero"
        :class="{hoverShadowBadge:props.isHoverShadow}"
      >
        <nw-icon v-if="props.icon" :name="props.icon" :size="props.size" color="#fff" />
        <!-- 这里加入图片 -->
        <img
          v-if="!icon && props.imageSrc"
          :src="props.imageSrc"
          :class="{hoverShadow:props.isHoverShadow}"
          :style="{
            width: `${props.size}px`,
            height: `${props.size}px`,
          }"
        />
      </n-badge>
    </div>
    <div class="nw-tile-label" :style="props.labelStyle" :alt="props.label">{{ props.label }}</div>
  </div>
</template>
<script>
import { NBadge } from "naive-ui";
import { h, ref, reactive, defineComponent, watch } from "vue";
import NwIcon from "../nw-icon/index.vue";

export default defineComponent({
  components: {
    NBadge,
    NwIcon
  },
  props: {
    // 接口请求
    icon: {
      type: String,
      default: ""
    },
    "image-src": {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    opacity: {
      type: Number,
      default: 1
    },
    showzero: {
      type: Boolean,
      default: false
    },
    "label-style": {
      type: Object,
      default: () => ({})
    },
    "badge-count": {
      type: Number,
      default: 0
    },
    "badge-count-max": {
      type: Number,
      default: 99
    },
    position: {
      type: String,
      default: "bottom"
    },
    "is-hover-shadow": {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      props,
      icon: props.icon,
      imageSrc: props.imageSrc,
      size: props.size,
      label: props.label,
      labelStyle: props.labelStyle,
      position: props.position
    };
  }
});
</script>

<style lang='less'>
.nw-tile {
  display: flex;
  justify-content: center;
  flex-direction: column;
  &-icon {
    display: flex;
    margin: 0 auto;
    .hoverShadowBadge:hover {
      // box-shadow: 10px 10px 20px rgba(0, 26, 200, 0.4);
    }
    img.hoverShadow {
      transition: all 0.5s;
    }
    img.hoverShadow:hover {
      //
      transform: scale(1.2);
    }
  }
  &-label {
    margin: 0 auto;
    margin-top: 6px;
    line-height: 12px;
  }
}
.nw-tile-icon-right {
  flex-direction: inherit;
  align-items: center;
  text-align: left;
  .nw-tile-icon {
    margin: 0;
  }
  .nw-tile-label {
    max-width: 60px;
    overflow: hidden;
    font-weight: lighter;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>