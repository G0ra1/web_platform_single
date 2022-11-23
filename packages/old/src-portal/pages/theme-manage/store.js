import { reactive, ref, nextTick } from "vue";

export const defThemeJson = {
  Tabs: {
    tabPaddingSmallCard: '5px'
  },
  // 卡片
  Card: {
    paddingSmall: '5px',
    titleFontSizeSmall: '14px',
    titleFontWeight: '700',
    titleTextColor: '#1277d1',
    fontSizeSmall: '12px',
    color: '#fbfbfa'
    // #fbfbfa
  },
  List: {
    fontSize: '16px',
    borderColor: '#fff',
    color: 'red',
    borderColorModal: 'red'
    // #f1f0eb
  }
}

export const themeParamList = [
    {
        label: '标题内边距',
        vtype: 'b-number-px',
        paramUri: 'Card.paddingSmall'
    },
    {
        label: '标题文字尺寸',
        vtype: 'b-number-px',
        paramUri: 'Card.titleFontSizeSmall'
    },
    {
        label: '标题文字粗细',
        vtype: 'b-number',
        paramUri: 'Card.titleFontWeight'
    },
    {
        label: '标题文字颜色',
        vtype: 'c-color',
        paramUri: 'Card.titleTextColor'
    },
    {
        label: '内容文字尺寸',
        vtype: 'b-number-px',
        paramUri: 'Card.fontSizeSmall'
    },
    {
        label: '内容区域颜色',
        vtype: 'c-color',
        paramUri: 'Card.color'
    },
]