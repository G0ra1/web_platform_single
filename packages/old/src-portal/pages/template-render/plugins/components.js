import NwTile from '/@/components/nw-tile/index.vue'
import NwIcon from '/@/components/nw-icon/index.vue'

export default {
  install (app) {
    // console.log('====install====', p)
    app.component('NwTile', NwTile)
    app.component('NwIcon', NwIcon)
  }
}