export default {
  common: {
    // heightSmall: '26px'
    borderRadius: '0px',
  },
  Tag: {
    heightSmall: '14px'
  },
  Tabs: {
    tabFontSizeSmall: '12px',
    tabPaddingSmallCard: '2px 4px 0px 4px',
    tabBorderColor: '#a9a9a9'
  },
  Input: {
    // color: '#484848',
    // colorFocus: '#484848',
    // textColor: '#ccc',
    // border: '1px solid #1e1e1e',
    fontSizeSmall: '12px',
    heightSmall: '24px',
    // 锁定
    // colorDisabled: '#484848',
    // borderDisabled: '1px solid #1e1e1e',
    textColorDisabled: '#4d4d4d',
    // placeholderColorDisabled: '#a3a3a3',
  },
  Form: {
    labelFontSizeTopSmall: '12px',
    labelPaddingVertical: '0 0 4px 2px',
    // labelTextColor: '#ccc',
    labelHeightSmall: '24px',
    blankHeightSmall: '24px',
    labelFontSizeLeftSmall: '12px',
    feedbackHeightSmall: '16px',
    feedbackFontSizeSmall: '12px'
  },
  
  Button: {
    heightSmall: '20px',
    fontSizeSmall: '12px',
    iconSizeSmall: '14px',
    iconMarginSmall: '2px'
    // 蓝色按钮
    // colorInfo: '#0E639C',
    // borderInfo: '#0E639C',
    // // 灰色默认
    // textColor: '#b9b9b9',
    // textColorText: '#b9b9b9',
    // border: '#0000000',
    // borderHover: '1px solid #0000000',
    // textColorHover: '#ccc',
  },
    Dialog: {
    // color: '#2b2b2b',
    // titleTextColor: '#ccc',
    iconMargin: '0 3px 0 0',
    titleFontSize: '14px',
    titleFontWeight: 'bold',
    titleTextColor: '#5e5e5e',
    iconSize: '14px',
    padding: '2px 5px',
    closeSize: '14px',
    closeMargin: '5px',
    contentMargin: '0',
    // textColor: '#ccc'
  },
  Modal: {
    boxShadow: '1px 0px 7px 1px #00000060',
    // textColor: '#ccc'
  },
  TreeSelect: {
    peers: {
      InternalSelection: {
        heightSmall: '24px',
        // color: '#484848',
        // colorActive: '#484848',
        // textColor: '#ccc',
        // border: '1px solid #1e1e1e',
        fontSizeSmall: '12px',
        menuBoxShadow: '1px 0px 7px 1px #000',
        // 锁定
        // colorDisabled: '#484848',
        // borderDisabled: '1px solid #1e1e1e',
        // textColorDisabled: '#a3a3a3',
        // placeholderColorDisabled: '#a3a3a3',
      },
      InternalSelectMenu: {
        optionFontSizeSmall: '12px',
        optionHeightSmall: '14px',
        // color: '#4e4e4e',
        // optionTextColor: '#aaa',
        // optionTextColorActive: '#ccc',
        // optionColorPending: '#484848',
        peers: {
        }
      },
      
      Empty: {
        fontSizeSmall: '12px',
        iconSizeSmall: '20px',
        // textColor: '#0f0'
      }
    }
  },
  Select: {
    peers: {
      InternalSelection: {
        heightSmall: '24px',
        // color: '#484848',
        // colorActive: '#484848',
        // textColor: '#ccc',
        // border: '1px solid #1e1e1e',
        fontSizeSmall: '12px',
        menuBoxShadow: '1px 0px 7px 1px #000',
        // 锁定
        // colorDisabled: '#484848',
        // borderDisabled: '1px solid #1e1e1e',
        // textColorDisabled: '#a3a3a3',
        // placeholderColorDisabled: '#a3a3a3',
      },
      InternalSelectMenu: {
        optionFontSizeSmall: '12px',
        optionHeightSmall: '12px',
        
        // color: '#4e4e4e',
        // optionTextColor: '#aaa',
        // optionTextColorActive: '#ccc',
        // optionColorPending: '#484848',
        peers: {
        }
      },
      
      Empty: {
        fontSizeSmall: '12px',
        iconSizeSmall: '20px',
        // textColor: '#0f0'
      }
    }
  },
  Slider: {
    fontSize: '12px',
    dotWidth: '8px',
    dotHeight: '8px',
    handleSize: '10px'
  }
  // Dialog: {
  //   color: '#2b2b2b',
  //   titleTextColor: '#ccc',
  //   titleFontSize: '14px',
  //   iconSize: '14px',
  //   padding: '2px 5px',
  //   closeSize: '14px',
  //   closeMargin: '5px',
  //   contentMargin: '5px 0 0 0',
  //   textColor: '#ccc'
  // },
  // Modal: {
  //   boxShadow: '1px 0px 7px 1px #000',
  //   textColor: '#ccc'
  // },
  // Form: {
  //   labelTextColor: '#ccc',
  //   labelHeightSmall: '24px',
  //   blankHeightSmall: '24px',
  //   labelFontSizeLeftSmall: '12px',
  //   feedbackHeightSmall: '16px',
  //   feedbackFontSizeSmall: '12px'
  // },
  // Input: {
  //   color: '#484848',
  //   colorFocus: '#484848',
  //   textColor: '#ccc',
  //   border: '1px solid #1e1e1e',
  //   fontSizeSmall: '12px',
  //   heightSmall: '24px',
  //   // 锁定
  //   colorDisabled: '#484848',
  //   borderDisabled: '1px solid #1e1e1e',
  //   textColorDisabled: '#a3a3a3',
  //   placeholderColorDisabled: '#a3a3a3',
  // },
  // TreeSelect: {
  //   actionDividerColor: 'red',
  //   actionTextColor: 'blue',
  //   peers: {
  //     Tree: {
  //       // nodeColorHover: 'red',
  //       // nodeColorActive: 'green'
  //     },
  //     InternalSelection: {
  //       heightSmall: '24px',
  //       color: '#484848',
  //       colorActive: '#484848',
  //       textColor: '#ccc',
  //       border: '1px solid #1e1e1e',
  //       fontSizeSmall: '12px',
  //       menuBoxShadow: '1px 0px 7px 1px #000',
  //       // 锁定
  //       colorDisabled: '#484848',
  //       borderDisabled: '1px solid #1e1e1e',
  //       textColorDisabled: '#a3a3a3',
  //       placeholderColorDisabled: '#a3a3a3',
  //     },
      
  //     Empty: {
  //       fontSizeSmall: '12px',
  //       iconSizeSmall: '20px',
  //       textColor: '#0f0'
  //     }
  //   }
  // },
  // Select: {
  //   peers: {
  //     InternalSelection: {
  //       heightSmall: '24px',
  //       color: '#484848',
  //       colorActive: '#484848',
  //       textColor: '#ccc',
  //       border: '1px solid #1e1e1e',
  //       fontSizeSmall: '12px',
  //       menuBoxShadow: '1px 0px 7px 1px #000',
  //       // 锁定
  //       colorDisabled: '#484848',
  //       borderDisabled: '1px solid #1e1e1e',
  //       textColorDisabled: '#a3a3a3',
  //       placeholderColorDisabled: '#a3a3a3',
  //     },
  //     InternalSelectMenu: {
  //       optionFontSizeSmall: '12px',
  //       optionHeightSmall: '14px',
  //       color: '#4e4e4e',
  //       optionTextColor: '#aaa',
  //       optionTextColorActive: '#ccc',
  //       optionColorPending: '#484848',
  //       peers: {
  //       }
  //     },
      
  //     Empty: {
  //       fontSizeSmall: '12px',
  //       iconSizeSmall: '20px',
  //       textColor: '#0f0'
  //     }
  //   }
  // },
  // Checkbox: {
  //   fontSizeSmall: '12px',
  //   textColor: '#ccc',
  // },
  // Button: {
  //   heightSmall: '24px',
  //   fontSizeSmall: '12px',
  //   // 蓝色按钮
  //   colorInfo: '#0E639C',
  //   borderInfo: '#0E639C',
  //   // 灰色默认
  //   textColor: '#b9b9b9',
  //   textColorText: '#b9b9b9',
  //   border: '#0000000',
  //   borderHover: '1px solid #0000000',
  //   textColorHover: '#ccc',
  // },
  // Radio: {
  //   radioSizeSmall: '12px',
  //   textColor: '#ccc',
  //   fontSizeSmall: '12px',
  //   color: '#484848',
  //   buttonColor: '#484848',
  //   boxShadow: 'inset 0 0 0 1px #484848',
  //   dotColorDisabled: '#ccc',
  //   colorDisabled: '#484848',
  //   boxShadowDisabled: 'inset 0 0 0 1px #484848',
  // },
  // Steps: {
  //   indicatorIconSizeSmall: '12px',
  //   indicatorSizeSmall: '18px',
  //   stepHeaderFontSizeSmall: '14px',

  //   headerTextColorFinish: '#888', // 完成的样式
  //   indicatorBorderColorFinish: '#00000000',
  //   descriptionTextColorFinish: '#888',

  //   headerTextColorProcess: '#ccc', // 正在执行
  //   indicatorBorderColorProcess: '#00000000',
  //   descriptionTextColorProcess: '#ccc',

  //   headerTextColorWait: '#888', // 等待
  //   indicatorBorderColorWait: '#00000000',
  //   descriptionTextColorWait: '#888',

  //   headerTextColorError: '#0ff', // 错误
  //   indicatorBorderColorError: '#00000000',
  // }
}