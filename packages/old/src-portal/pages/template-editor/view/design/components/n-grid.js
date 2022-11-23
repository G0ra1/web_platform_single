
// 组件
export default {
  tagName: 'n-grid',
  label: '栅格',
  attributes: {
    'x-gap': {
      text: '水平间隔(px)'
    },
    'y-gap': {
      text: '垂直间隔(px)'
    },
    'cols': {
      text: '分割列数',
      help: '整行平分的份数，栅格列组件会根据这个数值计算宽度占比'
    }
  }
}