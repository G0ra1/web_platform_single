// static var 20221220 问题： options

export const staticVar = {
  // 变量
  variable: [{
    name: 'dataModel',
    desc: '表单数据',


  }],
  // 计算属性
  computed: [{
    name: 'sum1',
    desc: '总额',
    script: `return this.dataModel.value.test1 + this.dataModel.value.test2`
  }]
}
// template
export default {
  "key": "n-form_1",
  "type": "n-form",
  "tagName": "n-form",
  "isCustomDesigner": false,
  "category": "container",
  "icon": "icon-n-y-form",
  "label": "表单",
  "slots": {
    "default": [
      {
        "key": "n-scrollbar_1",
        "type": "n-scrollbar",
        "tagName": "n-scrollbar",
        "isCustomDesigner": false,
        "category": "container",
        "icon": "icon-n-y-scrollbar",
        "label": "滚动",
        "internal": true,
        "slots": {
          "default": [
            {
              "key": "n-grid_1",
              "type": "n-grid",
              "tagName": "n-grid",
              "isCustomDesigner": false,
              "category": "container",
              "icon": "icon-n-y-grid",
              "label": "栅格",
              "internal": true,
              "slots": {
                "default": [
                  {
                    "key": "n-gi_1",
                    "type": "n-gi",
                    "tagName": "n-gi",
                    "isCustomDesigner": false,
                    "category": "container",
                    "icon": "icon-n-y-grid",
                    "label": "栅格列",
                    "internal": true,
                    "slots": {
                      "default": [
                        {
                          "key": "n-form-item_1x",
                          "type": "n-form-item",
                          "tagName": "n-form-item",
                          "isCustomDesigner": false,
                          "category": "container",
                          "icon": "icon-n-y-form",
                          "label": "表单字段",
                          "internal": true,
                          "slots": {
                            "default": [
                              {
                                "key": "n-input_1x",
                                "type": "n-input",
                                "tagName": "n-input",
                                "isCustomDesigner": false,
                                "category": "field",
                                "icon": "icon-n-y-input",
                                "label": "输入框",
                                "vModel": {
                                  "value": {
                                    "type": "DataForm",
                                    "field": "test"
                                  }
                                },
                                // "vModelValue": "test",
                                // "directives": {
                                //   "v-model": {
                                //     "value": {
                                      
                                //     }
                                //   },
                                //   "v-if": {
                                //     "type": "script",
                                //     "value": "() => {}"
                                //   },
                                // },
                                // "event": {
                                //   "update:value": {
                                //     "script": "() => {}"
                                //   }
                                // },
                                "options": {
                                  "disabled": {
                                    "type": "boolean",
                                    "value": false
                                  },
                                  "clearable": {
                                    "type": "boolean",
                                    "value": false
                                  },
                                  "type": {
                                    "type": "string",
                                    "value": "text"
                                  }
                                }
                              }
                            ]
                          },
                          "options": {
                            "label": {
                              "type": "string",
                              "value": "字段1"
                            },
                            "path": {
                              "type": "string",
                              "value": "field"
                            }
                          }
                        }
                      ]
                    },
                    "options": {
                      "span": {
                        "type": "number",
                        "value": 12
                      }
                    }
                  },
                  {
                    "key": "n-gi_2",
                    "type": "n-gi",
                    "tagName": "n-gi",
                    "isCustomDesigner": false,
                    "category": "container",
                    "icon": "icon-n-y-grid",
                    "label": "栅格列",
                    "internal": true,
                    "slots": {
                      "default": [
                        {
                          "key": "n-form-item_2x",
                          "type": "n-form-item",
                          "tagName": "n-form-item",
                          "isCustomDesigner": false,
                          "category": "container",
                          "icon": "icon-n-y-form",
                          "label": "表单字段",
                          "internal": true,
                          "slots": {
                            "default": [
                              {
                                "key": "n-input_2x",
                                "type": "n-input",
                                "tagName": "n-input",
                                "isCustomDesigner": false,
                                "category": "field",
                                "icon": "icon-n-y-input",
                                "label": "输入框",
                                "vModel": {
                                  "value": {
                                    "type": "DataForm",
                                    "field": "test1"
                                  }
                                },
                                "options": {
                                  "disabled": {
                                    "type": "boolean",
                                    "value": false
                                  },
                                  "clearable": {
                                    "type": "boolean",
                                    "value": false
                                  },
                                  "type": {
                                    "type": "string",
                                    "value": "text"
                                  }
                                }
                              }
                            ]
                          },
                          "options": {
                            "label": {
                              "type": "string",
                              "value": "字段2"
                            },
                            "path": {
                              "type": "string",
                              "value": "field"
                            }
                          }
                        }
                      ]
                    },
                    "options": {
                      "span": {
                        "type": "number",
                        "value": 12
                      }
                    }
                  },
                  {
                    "key": "n-gi_4",
                    "type": "n-gi",
                    "tagName": "n-gi",
                    "isCustomDesigner": false,
                    "category": "container",
                    "icon": "icon-n-y-grid",
                    "label": "栅格列",
                    "internal": true,
                    "slots": {
                      "default": [
                        {
                          "key": "n-form-item_4x",
                          "type": "n-form-item",
                          "tagName": "n-form-item",
                          "isCustomDesigner": false,
                          "category": "container",
                          "icon": "icon-n-y-form",
                          "label": "表单字段",
                          "internal": true,
                          "slots": {
                            "default": [
                              {
                                "key": "n-input_2x",
                                "type": "n-input",
                                "tagName": "n-input",
                                "isCustomDesigner": false,
                                "category": "field",
                                "icon": "icon-n-y-input",
                                "label": "输入框",
                                "dataFormField": "test1",
                                "options": {
                                  "disabled": {
                                    "type": "boolean",
                                    "value": true
                                  },
                                  "clearable": {
                                    "type": "boolean",
                                    "value": false
                                  },
                                  "type": {
                                    "type": "string",
                                    "value": "text"
                                  }
                                }
                              }
                            ]
                          },
                          "options": {
                            "label": {
                              "type": "string",
                              "value": "字段2"
                            },
                            "path": {
                              "type": "string",
                              "value": "field"
                            }
                          }
                        }
                      ]
                    },
                    "options": {
                      "span": {
                        "type": "number",
                        "value": 12
                      }
                    }
                  }
                ]
              },
              "options": {
                "cols": {
                  "type": "number",
                  "value": 24
                },
                "layoutShiftDisabled": {
                  "type": "boolean",
                  "value": false
                },
                "xGap": {
                  "type": "number",
                  "value": 0
                },
                "yGap": {
                  "type": "number",
                  "value": 0
                }
              }
            },
            // {
            //   "key": "n-grid_lbuefk0xX403",
            //   "type": "n-grid",
            //   "tagName": "n-grid",
            //   "category": "field",
            //   "icon": "icon-n-y-grid",
            //   "label": "栅格",
            //   "internal": true,
            //   "slots": {
            //     "default": [
            //       {
            //         "key": "n-gi_lbuefk0xX6rg",
            //         "type": "n-gi",
            //         "tagName": "n-gi",
            //         "category": "container",
            //         "icon": "icon-n-y-grid",
            //         "label": "栅格列",
            //         "internal": true,
            //         "slots": {
            //           "default": [
            //             {
            //               "key": "n-form-item_1x_lbuefk0xX3ow",
            //               "type": "n-form-item",
            //               "tagName": "n-form-item",
            //               "category": "container",
            //               "icon": "icon-n-y-form",
            //               "label": "表单字段",
            //               "internal": true,
            //               "slots": {
            //                 "default": [
            //                   {
            //                     "key": "n-date-picker_lbuefk0xX2ba",
            //                     "type": "n-date-picker",
            //                     "category": "field",
            //                     "icon": "icon-n-y-input",
            //                     "isCustomDesigner": false,
            //                     "tagName": "n-date-picker",
            //                     "label": "日期",
            //                     "options": {
            //                       "disabled": {
            //                         "type": "boolean",
            //                         "value": false
            //                       },
            //                       "style": {
            //                         "type": "object",
            //                         "value": "{width:'100%'}"
            //                       },
            //                       "clearable": {
            //                         "type": "boolean",
            //                         "value": false
            //                       },
            //                       "type": {
            //                         "type": "string",
            //                         "value": "date"
            //                       },
            //                       "format": {
            //                         "type": "string",
            //                         "value": "yyyy-MM-dd"
            //                       }
            //                     }
            //                   }
            //                 ]
            //               },
            //               "options": {
            //                 "label": {
            //                   "type": "string",
            //                   "value": "字段3"
            //                 },
            //                 "path": {
            //                   "type": "string",
            //                   "value": "field"
            //                 }
            //               }
            //             }
            //           ]
            //         },
            //         "options": {
            //           "span": {
            //             "type": "number",
            //             "value": 12
            //           }
            //         }
            //       },
            //       {
            //         "key": "n-gi_lbuefkukX6ig",
            //         "type": "n-gi",
            //         "tagName": "n-gi",
            //         "category": "container",
            //         "icon": "icon-n-y-grid",
            //         "label": "栅格列",
            //         "internal": true,
            //         "slots": {
            //           "default": [
            //             {
            //               "key": "n-form-item_1x_lbuefkukX44",
            //               "type": "n-form-item",
            //               "tagName": "n-form-item",
            //               "category": "container",
            //               "icon": "icon-n-y-form",
            //               "label": "表单字段",
            //               "internal": true,
            //               "slots": {
            //                 "default": [
            //                   {
            //                     "key": "n-date-picker_lbuefkukX5xs",
            //                     "type": "n-date-picker",
            //                     "category": "field",
            //                     "icon": "icon-n-y-input",
            //                     "isCustomDesigner": false,
            //                     "tagName": "n-date-picker",
            //                     "label": "日期",
            //                     "options": {
            //                       "disabled": {
            //                         "type": "boolean",
            //                         "value": false
            //                       },
            //                       "style": {
            //                         "type": "object",
            //                         "value": "{width:'100%'}"
            //                       },
            //                       "clearable": {
            //                         "type": "boolean",
            //                         "value": false
            //                       },
            //                       "type": {
            //                         "type": "string",
            //                         "value": "date"
            //                       },
            //                       "format": {
            //                         "type": "string",
            //                         "value": "yyyy-MM-dd"
            //                       }
            //                     }
            //                   }
            //                 ]
            //               },
            //               "options": {
            //                 "label": {
            //                   "type": "string",
            //                   "value": "字段4"
            //                 },
            //                 "path": {
            //                   "type": "string",
            //                   "value": "field"
            //                 }
            //               }
            //             }
            //           ]
            //         },
            //         "options": {
            //           "span": {
            //             "type": "number",
            //             "value": 12
            //           }
            //         }
            //       }
            //     ]
            //   },
            //   "options": {
            //     "cols": {
            //       "type": "number",
            //       "value": 24
            //     },
            //     "layoutShiftDisabled": {
            //       "type": "boolean",
            //       "value": false
            //     },
            //     "xGap": {
            //       "type": "number",
            //       "value": 0
            //     },
            //     "yGap": {
            //       "type": "number",
            //       "value": 0
            //     }
            //   }
            // },
            // {
            //   "key": "n-grid_lbuefsb3X5ho",
            //   "type": "n-grid",
            //   "tagName": "n-grid",
            //   "category": "field",
            //   "icon": "icon-n-y-grid",
            //   "label": "栅格",
            //   "internal": true,
            //   "slots": {
            //     "default": [
            //       {
            //         "key": "n-gi_lbuefsb3X29k",
            //         "type": "n-gi",
            //         "tagName": "n-gi",
            //         "category": "container",
            //         "icon": "icon-n-y-grid",
            //         "label": "栅格列",
            //         "internal": true,
            //         "slots": {
            //           "default": [
            //             {
            //               "key": "n-form-item_1x_lbuefsb3Xsg",
            //               "type": "n-form-item",
            //               "tagName": "n-form-item",
            //               "category": "container",
            //               "icon": "icon-n-y-form",
            //               "label": "表单字段",
            //               "internal": true,
            //               "slots": {
            //                 "default": [
            //                   {
            //                     "key": "nw-field-grid_lbuefsb3X4qd",
            //                     "type": "nw-field-grid",
            //                     "category": "data",
            //                     "icon": "icon-n-y-table",
            //                     "label": "表格",
            //                     "tagName": "nw-field-grid",
            //                     "isCustomDesigner": true,
            //                     "slots": {
            //                       "default_name": [
            //                         {
            //                           "key": "nw-field-render_lbuefsb3Xkb",
            //                           "type": "script",
            //                           "tagName": "nw-field-render",
            //                           "isCustomDesigner": true,
            //                           "category": "field",
            //                           "icon": "icon-n-y-input",
            //                           "label": "自定义",
            //                           "options": {
            //                             "render": {
            //                               "type": "function",
            //                               "value": "(dm, sp, h) => {\n                        return sp.row.name\n                    }"
            //                             }
            //                           }
            //                         }
            //                       ],
            //                       "edit_name": [
            //                         {
            //                           "key": "n-input_lbuefsb3X5du",
            //                           "type": "n-input",
            //                           "tagName": "n-input",
            //                           "isCustomDesigner": true,
            //                           "category": "field",
            //                           "icon": "icon-n-y-input",
            //                           "label": "输入框",
            //                           "options": {
            //                             "disabled": {
            //                               "type": "boolean",
            //                               "value": false
            //                             },
            //                             "clearable": {
            //                               "type": "boolean",
            //                               "value": false
            //                             },
            //                             "type": {
            //                               "type": "string",
            //                               "value": "text"
            //                             }
            //                           }
            //                         }
            //                       ],
            //                       "default_code": [
            //                         {
            //                           "key": "nw-field-render_lbuefsb3X57f",
            //                           "type": "script",
            //                           "tagName": "nw-field-render",
            //                           "isCustomDesigner": true,
            //                           "category": "field",
            //                           "icon": "icon-n-y-input",
            //                           "label": "自定义",
            //                           "options": {
            //                             "render": {
            //                               "type": "function",
            //                               "value": "(dm, sp, h) => {\n                        return sp.row.code\n                    }"
            //                             }
            //                           }
            //                         }
            //                       ],
            //                       "edit_code": [
            //                         {
            //                           "key": "n-input_lbuefsb3X5i3",
            //                           "type": "n-input",
            //                           "tagName": "n-input",
            //                           "isCustomDesigner": true,
            //                           "category": "field",
            //                           "icon": "icon-n-y-input",
            //                           "label": "输入框",
            //                           "options": {
            //                             "disabled": {
            //                               "type": "boolean",
            //                               "value": false
            //                             },
            //                             "clearable": {
            //                               "type": "boolean",
            //                               "value": false
            //                             },
            //                             "type": {
            //                               "type": "string",
            //                               "value": "text"
            //                             }
            //                           }
            //                         }
            //                       ]
            //                     },
            //                     "options": {
            //                       "style": {
            //                         "type": "object",
            //                         "value": "{\n              width: '100%'\n            }"
            //                       },
            //                       "columns": {
            //                         "type": "array",
            //                         "value": "[\n                {\n                    field: 'name',\n                    title: '名称',\n                    slots: {\n                        default: 'default_name',\n                        edit: 'edit_name'\n                    },\n                },\n                {\n                    field: 'code',\n                    title: '编码',\n                    slots: {\n                        default: 'default_code',\n                        edit: 'edit_code'\n                    }\n                }\n          ]"
            //                       },
            //                       "size": {
            //                         "type": "string",
            //                         "value": "mini"
            //                       },
            //                       "showHeader": {
            //                         "type": "boolean",
            //                         "value": true
            //                       },
            //                       "align": {
            //                         "type": "string",
            //                         "value": "left"
            //                       },
            //                       "headerAlign": {
            //                         "type": "string",
            //                         "value": "left"
            //                       }
            //                     }
            //                   }
            //                 ]
            //               },
            //               "options": {
            //                 "label": {
            //                   "type": "string",
            //                   "value": "字段"
            //                 },
            //                 "path": {
            //                   "type": "string",
            //                   "value": "field"
            //                 }
            //               }
            //             }
            //           ]
            //         },
            //         "options": {
            //           "span": {
            //             "type": "number",
            //             "value": 24
            //           }
            //         }
            //       }
            //     ]
            //   },
            //   "options": {
            //     "cols": {
            //       "type": "number",
            //       "value": 24
            //     },
            //     "layoutShiftDisabled": {
            //       "type": "boolean",
            //       "value": false
            //     },
            //     "xGap": {
            //       "type": "number",
            //       "value": 0
            //     },
            //     "yGap": {
            //       "type": "number",
            //       "value": 0
            //     }
            //   }
            // },
            {
              "key": "n-grid_lbueftj2X36m",
              "type": "n-grid",
              "tagName": "n-grid",
              "category": "field",
              "icon": "icon-n-y-grid",
              "label": "栅格",
              "internal": true,
              "slots": {
                "default": [
                  {
                    "key": "n-gi_lbueftj2X7g2",
                    "type": "n-gi",
                    "tagName": "n-gi",
                    "category": "container",
                    "icon": "icon-n-y-grid",
                    "label": "栅格列",
                    "internal": true,
                    "slots": {
                      "default": [
                        {
                          "key": "n-form-item_1x_lbueftj2X21",
                          "type": "n-form-item",
                          "tagName": "n-form-item",
                          "category": "container",
                          "icon": "icon-n-y-form",
                          "label": "表单字段",
                          "internal": true,
                          "slots": {
                            "default": [
                              {
                                "key": "nw-field-grid_lbueftj2X19u",
                                "type": "nw-field-grid",
                                "category": "data",
                                "icon": "icon-n-y-table",
                                "label": "表格",
                                "tagName": "nw-field-grid",
                                "isCustomDesigner": true,
                                
                                "vModel": {
                                  "value": {
                                    "type": "DataForm",
                                    "field": "testGrid"
                                  }
                                },
                                "slots": {
                                  "default_name": [
                                    {
                                      "key": "nw-field-render_lbueftj2X5ua",
                                      "type": "script",
                                      "tagName": "nw-field-render",
                                      "isCustomDesigner": true,
                                      "category": "field",
                                      "icon": "icon-n-y-input",
                                      "label": "自定义",
                                      "options": {
                                        "render": {
                                          "type": "function",
                                          "value": "(dm, sp, h) => {\n                        return sp.row.name\n                    }"
                                        }
                                      }
                                    }
                                  ],
                                  "edit_name": [
                                    {
                                      "key": "n-input_lbueftj2X605",
                                      "type": "n-input",
                                      "tagName": "n-input",
                                      "isCustomDesigner": true,
                                      "category": "field",
                                      "icon": "icon-n-y-input",
                                      "label": "输入框",
                                      "vModel": {
                                        "value": {
                                          "type": "SlotProps",
                                          "field": "row.test1"
                                        }
                                      },
                                      "options": {
                                        "disabled": {
                                          "type": "boolean",
                                          "value": false
                                        },
                                        "clearable": {
                                          "type": "boolean",
                                          "value": false
                                        },
                                        "type": {
                                          "type": "string",
                                          "value": "text"
                                        }
                                      }
                                    }
                                  ],
                                  "default_code": [
                                    {
                                      "key": "nw-field-render_lbueftj2X1bu",
                                      "type": "script",
                                      "tagName": "nw-field-render",
                                      "isCustomDesigner": true,
                                      "category": "field",
                                      "icon": "icon-n-y-input",
                                      "label": "自定义",
                                      "options": {
                                        "render": {
                                          "type": "function",
                                          "value": "(dm, sp, h) => {\n                        return sp.row.code\n                    }"
                                        }
                                      }
                                    }
                                  ],
                                  "edit_code": [
                                    {
                                      "key": "n-input_lbueftj2X6m7",
                                      "type": "n-input",
                                      "tagName": "n-input",
                                      "isCustomDesigner": true,
                                      "category": "field",
                                      "icon": "icon-n-y-input",
                                      "label": "输入框",
                                      "options": {
                                        "disabled": {
                                          "type": "boolean",
                                          "value": false
                                        },
                                        "clearable": {
                                          "type": "boolean",
                                          "value": false
                                        },
                                        "type": {
                                          "type": "string",
                                          "value": "text"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "options": {
                                  "style": {
                                    "type": "object",
                                    "value": "{\n              width: '100%'\n            }"
                                  },
                                  "columns": {
                                    "type": "array",
                                    "value": "[\n                {\n                    field: 'name',\n                    title: '名称',\n                    slots: {\n                        default: 'default_name',\n                        edit: 'edit_name'\n                    },\n                },\n                {\n                    field: 'code',\n                    title: '编码',\n                    slots: {\n                        default: 'default_code',\n                        edit: 'edit_code'\n                    }\n                }\n          ]"
                                  },
                                  "size": {
                                    "type": "string",
                                    "value": "mini"
                                  },
                                  "showHeader": {
                                    "type": "boolean",
                                    "value": true
                                  },
                                  "align": {
                                    "type": "string",
                                    "value": "left"
                                  },
                                  "headerAlign": {
                                    "type": "string",
                                    "value": "left"
                                  }
                                }
                              }
                            ]
                          },
                          "options": {
                            "label": {
                              "type": "string",
                              "value": "字段"
                            },
                            "path": {
                              "type": "string",
                              "value": "field"
                            }
                          }
                        }
                      ]
                    },
                    "options": {
                      "span": {
                        "type": "number",
                        "value": 24
                      }
                    }
                  }
                ]
              },
              "options": {
                "cols": {
                  "type": "number",
                  "value": 24
                },
                "layoutShiftDisabled": {
                  "type": "boolean",
                  "value": false
                },
                "xGap": {
                  "type": "number",
                  "value": 0
                },
                "yGap": {
                  "type": "number",
                  "value": 0
                }
              }
            }
          ]
        },
        "options": {
          "style": {
            "type": "object",
            "value": "{\"height\": \"100%\",\"padding\": \"20px\", \"box-sizing\": \"border-box\"}"
          }
        }
      }
    ]
  },
  "options": {
    "style": {
      "type": "object",
      "value": "{\"height\": \"100%\"}"
    },
    "size": {
      "type": "string",
      "value": "small"
    },
    "disabled": {
      "type": "boolean",
      "value": false
    },
    "inline": {
      "type": "boolean",
      "value": false
    },
    "labelWidth": {
      "type": "string",
      "value": "100px"
    },
    "labelAlgin": {
      "type": "string",
      "value": "left"
    },
    "labelPlacement": {
      "type": "string",
      "value": "left"
    }
  }
}