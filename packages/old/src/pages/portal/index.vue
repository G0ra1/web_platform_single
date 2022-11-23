<template>
  <div class="portal-view">
  <iframe v-if="portalState" class="portal-view-iframe" :src="portalUrl"></iframe>
  <div  v-if="!portalState">
    <nw-tile
      icon="icon-kongkongde"
      :size="64"
      label="没有设置门户首页"
    />

  </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import db from '/@/utils/db.js'
  import NwTile from '/@/components/nw-tile/index.vue'

  export default defineComponent({
    components: {
      NwTile
    },
    setup () {
      // '/html/portal/template-render.html?portalid=1447746677640269825#/index'
      const portalUrl = ref('')
      const portalState = ref(false)
      db.get('defaultUrl').then(r => {
        if (r === 'unset') {
          portalState.value = false
        } else {
          portalState.value = true
          portalUrl.value = `/html/${r}`
        }
        
      })
      return {
        portalUrl,
        portalState
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