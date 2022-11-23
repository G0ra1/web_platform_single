
import { h } from 'vue'
import "./css.less";

export default {
  name: "InnerBoxRoll",
  components: {
  },
  props:{
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(){
    // 这里判断类型
    return (props) => {
      return <div class="box-model" >
      {
        props.value.children &&
        props.value.children.length && 
        props.value.children.map((d, i) => (<InnerBoxRoll
        key={i}
        value={d}
        />))
      }
    </div>
    }
  }
}
