// style通用变量配置
const StaticVars = {
  '--dark-gray1': '#1C2127',
  '--dark-gray2': '#252A31',
  '--dark-gray3': '#2F343C',
  '--dark-gray4': '#383E47',
  '--dark-gray5': '#404854',

  '--gray1': '#5F6B7C',
  '--gray2': '#738091',
  '--gray3': '#8F99A8',
  '--gray4': '#ABB3BF',
  '--gray5': '#C5CBD3',

  '--light-gray1': '#D3D8DE',
  '--light-gray2': '#DCE0E5',
  '--light-gray3': '#E5E8EB',
  '--light-gray4': '#EDEFF2',
  '--light-gray5': '#F6F7F9',

  '--n-blue1': '#184A90',
  '--n-blue2': '#215DB0',
  '--n-blue3': '#2D72D2',
  '--n-blue4': '#4C90F0',
  '--n-blue5': '#8ABBFF',

  '--n-green1': '#165A36',
  '--n-green2': '#1C6E42',
  '--n-green3': '#238551',
  '--n-green4': '#32A467',
  '--n-green5': '#72CA9B',

  '--n-orange1': '#77450D',
  '--n-orange2': '#935610',
  '--n-orange3': '#C87619',
  '--n-orange4': '#EC9A3C',
  '--n-orange5': '#FBB360',


  '--n-red1': '#8E292C',
  '--n-red2': '#AC2F33',
  '--n-red3': '#CD4246',
  '--n-red4': '#E76A6E',
  '--n-red5': '#FA999C',

  '--n-red6': '#C91019',

  '--lv1': '#C91019',
  '--lv2': '#F08301',
  '--lv3': '#FFDE44',
  '--lv4': '#7AB1FF',
  '--lv5': '#7AFF8B',


  // 
}

// 风格配置
const ThemeVars = {

  // 框架侧栏
  '--layout-sider': StaticVars['--n-red6'],

  // 模态头部
  '--layout-header-menu-border-top-color': StaticVars['--n-red3'],

  // 模态头部
  '--modal-header': StaticVars['--light-gray1'],
  

  // primary配色
  '--primary-color': StaticVars['--lv1'],
  '--primary-color-hover': StaticVars['--n-red2'],
  '--primary-color-pressed': StaticVars['--n-red1'],
  '--primary-color-suppl': StaticVars['--n-red2'],

  // info配色
  '--info-color': StaticVars['--n-blue3'],
  '--info-color-hover': StaticVars['--n-blue2'],
  '--info-color-pressed': StaticVars['--n-blue1'],
  '--info-color-suppl': StaticVars['--n-blue2'],

  
  // success配色
  '--success-color': StaticVars['--n-green3'],
  '--success-color-hover': StaticVars['--n-green2'],
  '--success-color-pressed': StaticVars['--n-green1'],
  '--success-color-suppl': StaticVars['--n-green2'],
  
  
  // warning配色
  '--warning-color': StaticVars['--n-orange3'],
  '--warning-color-hover': StaticVars['--n-orange2'],
  '--warning-color-pressed': StaticVars['--n-orange1'],
  '--warning-color-suppl': StaticVars['--n-orange2'],
  
  // error配色
  '--error-color': StaticVars['--n-red3'],
  '--error-color-hover': StaticVars['--n-red2'],
  '--error-color-pressed': StaticVars['--n-red1'],
  '--error-color-suppl': StaticVars['--n-red2'],

  // 所有组件圆角
  '--border-radius': '2px',

  // 所有输入组件颜色
  '--input-color-disabled': '#d3d8de80',
  '--text-color-disabled': '#5f6b7c99',
  '--placeholder-color-disabled': '#5f6b7c01'
}

export const StyleVars = {
  ...StaticVars,
  ...ThemeVars
}

export const getCssText = () => Object.entries(StyleVars).map(([ k, v]) => `${k}: ${v};`).join('\n')

export const getStyleElement = () => {
  const styleEl = document.createElement('style')
  // styleEl.type = 'text/css'
  styleEl.appendChild(document.createTextNode(`body { ${getCssText()} }`))
  return styleEl
}
// naive 通用配置
export default {
  // heightSmall: '26px'
  borderRadius: ThemeVars['--border-radius'],

  primaryColor: ThemeVars['--primary-color'], //'#C91019', 
  primaryColorHover: ThemeVars['--primary-color-hover'],
  primaryColorPressed: ThemeVars['--primary-color-pressed'],
  primaryColorSuppl: ThemeVars['--primary-color-suppl'],

  // primaryColor: '#2D72D2',
  // primaryColorHover: '#215DB0',
  // primaryColorPressed: '#184A90',
  // primaryColorSuppl: '#215DB0',
  
  infoColor: ThemeVars['--info-color'],
  infoColorHover: ThemeVars['--info-color-hover'],
  infoColorPressed: ThemeVars['--info-color-pressed'],
  infoColorSuppl: ThemeVars['--info-color-suppl'],

  successColor: ThemeVars['--success-color'],
  successColorHover: ThemeVars['--success-color-hover'],
  successColorPressed: ThemeVars['--success-color-pressed'],
  successColorSuppl: ThemeVars['--success-color-suppl'],

  warningColor: ThemeVars['--warning-color'],
  warningColorHover: ThemeVars['--warning-color-hover'],
  warningColorPressed: ThemeVars['--warning-color-pressed'],
  warningColorSuppl: ThemeVars['--warning-color-suppl'],

  errorColor: ThemeVars['--error-color'],
  errorColorHover: ThemeVars['--error-color-hover'],
  errorColorPressed: ThemeVars['--error-color-pressed'],
  errorColorSuppl: ThemeVars['--error-color-suppl'],

  inputColorDisabled: ThemeVars['--input-color-disabled'],
  textColorDisabled: ThemeVars['--text-color-disabled'],
  placeholderColorDisabled: ThemeVars['--placeholder-color-disabled'],
}