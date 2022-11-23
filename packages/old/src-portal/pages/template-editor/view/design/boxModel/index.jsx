
import { defineComponent, ref, reactive, nextTick, watch, h } from 'vue'

import './css.less'
import InnerBoxRoll from './InnerBoxRoll.vue'


// const InnerBoxRoll = defineComponent({
//   components: {
//     InnerBox
    
//   },
//   props:{
//     value: {
//       type: Array,
//       default: () => []
//     }
//   },
//   setup () {
//     // return (props) => {
//     //   console.log('===', props.$slots)
//     //   return (<InnerBox class="box-model" >
//     // </InnerBox>)}
//     return (props) => {
//       return (<div class="box-model" >
//         {{
//           default: () => <InnerBox value={props.value.children} />
//         }}
//     </div>)}
//   }
// }) 
export default defineComponent({
  components: {
    InnerBoxRoll
  },
  props:{
    value: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    return (props) => {
      // 这里获取到的是template 数组对象
      const elTemp = props.value[0]
      if (elTemp && elTemp.type === 'element' && elTemp.tagName === 'template') {
        return elTemp.children.filter(d => d.type === 'element').map(d => <InnerBoxRoll
          value={d}
          p-value={props.value[0]}
        ></InnerBoxRoll>) 
      } else {
        return <div>非法</div>
      }
      
    }
  }
})