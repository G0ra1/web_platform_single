<template>
  <iframe class="portal-view-iframe" :src="url"></iframe>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    components: {
    },
    setup () {
      const router = useRouter()
      const route = useRoute()
      const url = ref(window.atob(route.params.frameUrl))
      watch(route, () => {
        route.params.frameUrl && (url.value = window.atob(route.params.frameUrl))
      })
      return {
        url
      }
    }
  })
</script>
<style lang='less'>
.portal-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &-iframe {
    border: none;
    width: 100%;
    height: calc(~"100% - 6px");
  }
}
</style>