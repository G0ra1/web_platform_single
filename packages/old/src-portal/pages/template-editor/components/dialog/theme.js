export default {
  common: {
    // heightSmall: '26px'
    borderRadius: '0px',
  },
  Dialog: {
    color: '#2b2b2b',
    titleTextColor: '#ccc',
    titleFontSize: '14px',
    iconSize: '14px',
    padding: '2px 5px',
    closeSize: '14px',
    closeMargin: '5px',
    contentMargin: '5px 0 0 0',
    textColor: '#ccc'
  },
  Modal: {
    boxShadow: '1px 0px 7px 1px #000',
    textColor: '#ccc'
  },
  Form: {
    labelTextColor: '#ccc',
    labelHeightSmall: '24px',
    blankHeightSmall: '24px',
    labelFontSizeLeftSmall: '12px',
    feedbackHeightSmall: '16px',
    feedbackFontSizeSmall: '12px'
  },
  Input: {
    color: '#484848',
    colorFocus: '#484848',
    textColor: '#ccc',
    border: '1px solid #1e1e1e',
    fontSizeSmall: '12px',
    heightSmall: '24px',
    // 锁定
    colorDisabled: '#484848',
    borderDisabled: '1px solid #1e1e1e',
    textColorDisabled: '#a3a3a3',
    placeholderColorDisabled: '#a3a3a3',
  },
  Select: {
    peers: {
      InternalSelection: {
        heightSmall: '24px',
        color: '#484848',
        colorActive: '#484848',
        textColor: '#ccc',
        border: '1px solid #1e1e1e',
        fontSizeSmall: '12px',
        menuBoxShadow: '1px 0px 7px 1px #000',
        // 锁定
        colorDisabled: '#484848',
        borderDisabled: '1px solid #1e1e1e',
        textColorDisabled: '#a3a3a3',
        placeholderColorDisabled: '#a3a3a3',
      },
      InternalSelectMenu: {
        optionFontSizeSmall: '12px',
        optionHeightSmall: '14px',
        color: '#4e4e4e',
        optionTextColor: '#aaa',
        optionTextColorActive: '#ccc',
        optionColorPending: '#484848',
        peers: {
        }
      },
      
      Empty: {
        fontSizeSmall: '12px',
        iconSizeSmall: '20px',
        textColor: '#0f0'
      }
    }
  },
  Checkbox: {
    fontSizeSmall: '12px',
    textColor: '#ccc',
  },
  Button: {
    heightSmall: '24px',
    fontSizeSmall: '12px',
    // 蓝色按钮
    colorInfo: '#0E639C',
    borderInfo: '#0E639C',
    // 灰色默认
    textColor: '#b9b9b9',
    border: '#0000000',
    borderHover: '1px solid #0000000',
    textColorHover: '#ccc'
  },
  Radio: {
    radioSizeSmall: '12px',
    textColor: '#ccc',
    fontSizeSmall: '12px',
    color: '#484848',
    buttonColor: '#484848',
    boxShadow: 'inset 0 0 0 1px #484848',
    dotColorDisabled: '#ccc',
    colorDisabled: '#484848',
    boxShadowDisabled: 'inset 0 0 0 1px #484848',
  }
}