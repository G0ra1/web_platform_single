import { WidgetNS } from '../model/widget.d'
export default {
    key: 'n-form_1',
    type: 'n-form',
    category: 'container',
    icon: 'icon-n-y-form',
    label: '表单',
    slots: {
        default: [
            {
                key: 'n-tabs_1',
                type: 'n-tabs',
                category: 'container',
                icon: 'icon-n-y-tabs',
                label: '页签',
                slots: {
                    default: [
                        {
                            key: 'n-tab-pane_1',
                            type: 'n-tab-pane',
                            category: 'container',
                            icon: 'icon-n-y-tabs',
                            label: '页签面板',
                            internal: true,
                            slots: {
                                default: [
                                    {
                                        key: 'n-scrollbar_1',
                                        type: 'n-scrollbar',
                                        category: 'container',
                                        icon: 'icon-n-y-scrollbar',
                                        label: '滚动',
                                        internal: true,
                                        slots: {
                                            default: [
                                                {
                                                    key: 'n-grid_1',
                                                    type: 'n-grid',
                                                    category: 'container',
                                                    icon: 'icon-n-y-grid',
                                                    label: '栅格',
                                                    internal: true,
                                                    slots: {
                                                        default: [
                                                            {
                                                                key: 'n-gi_1',
                                                                type: 'n-gi',
                                                                category: 'container',
                                                                icon: 'icon-n-y-grid',
                                                                label: '栅格列',
                                                                internal: true,
                                                                internalOptions: {
                                                                    realTagName: 'n-input',
                                                                    realLabel: '输入框'
                                                                },
                                                                slots: {
                                                                    default: [
                                                                        {
                                                                            key: 'n-form-item_1x',
                                                                            type: 'n-form-item',
                                                                            category: 'container',
                                                                            icon: 'icon-n-y-form',
                                                                            label: '表单字段',
                                                                            internal: true,
                                                                            slots: {
                                                                                default: [
                                                                                    {
                                                                                        key: 'n-input_1x',
                                                                                        type: 'n-input',
                                                                                        category: 'field',
                                                                                        icon: 'icon-n-y-input',
                                                                                        label: '输入框',
                                                                                        options: {
                                                                                            disabled: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            clearable: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            type: {
                                                                                            type: 'string',
                                                                                            value: 'text'
                                                                                            },
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            options: {
                                                                                label: {
                                                                                    type: 'string',
                                                                                    value: '姓名'
                                                                                },
                                                                                path: {
                                                                                    type: 'string',
                                                                                    value: 'name'
                                                                                },
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                options: {
                                                                    span: {
                                                                        type: 'number',
                                                                        value: 12
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                key: 'n-gi_2',
                                                                type: 'n-gi',
                                                                category: 'container',
                                                                icon: 'icon-n-y-grid',
                                                                label: '栅格列',
                                                                internal: true,
                                                                internalOptions: {
                                                                    realTagName: 'n-input',
                                                                    realLabel: '输入框'
                                                                },
                                                                slots: {
                                                                    default: [
                                                                        {
                                                                            key: 'n-form-item_1y',
                                                                            type: 'n-form-item',
                                                                            category: 'container',
                                                                            icon: 'icon-n-y-form',
                                                                            label: '表单字段',
                                                                            internal: true,
                                                                            slots: {
                                                                                default: [
                                                                                    {
                                                                                        key: 'n-input_1y',
                                                                                        type: 'n-input',
                                                                                        category: 'field',
                                                                                        icon: 'icon-n-y-input',
                                                                                        label: '输入框',
                                                                                        options: {
                                                                                            disabled: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            clearable: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            type: {
                                                                                            type: 'string',
                                                                                            value: 'text'
                                                                                            },
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            options: {
                                                                                label: {
                                                                                    type: 'string',
                                                                                    value: '年龄'
                                                                                },
                                                                                path: {
                                                                                    type: 'string',
                                                                                    value: 'age'
                                                                                },
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                options: {
                                                                    span: {
                                                                        type: 'number',
                                                                        value: 12
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    options: {
                                                        cols: {
                                                            type: 'number',
                                                            value: 24
                                                        },
                                                        layoutShiftDisabled: {
                                                            type: 'boolean',
                                                            value: false
                                                        },
                                                        xGap: {
                                                            type: 'number',
                                                            value: 10
                                                        },
                                                        yGap: {
                                                            type: 'number',
                                                            value: 0
                                                        }
                                                    }
                                                },
                                                {
                                                    key: 'n-grid_2',
                                                    type: 'n-grid',
                                                    category: 'container',
                                                    icon: 'icon-n-y-grid',
                                                    label: '栅格',
                                                    internal: true,
                                                    slots: {
                                                        default: [
                                                            {
                                                                key: 'n-gi_3',
                                                                type: 'n-gi',
                                                                category: 'container',
                                                                icon: 'icon-n-y-grid',
                                                                label: '栅格列',
                                                                internal: true,
                                                                internalOptions: {
                                                                    realTagName: 'n-input',
                                                                    realLabel: '输入框'
                                                                },
                                                                slots: {
                                                                    default: [
                                                                        {
                                                                            key: 'n-form-item_1z',
                                                                            type: 'n-form-item',
                                                                            category: 'container',
                                                                            icon: 'icon-n-y-form',
                                                                            label: '表单字段',
                                                                            internal: true,
                                                                            slots: {
                                                                                default: [
                                                                                    {
                                                                                        key: 'n-input_1z',
                                                                                        type: 'n-input',
                                                                                        category: 'field',
                                                                                        icon: 'icon-n-y-input',
                                                                                        label: '输入框',
                                                                                        options: {
                                                                                            disabled: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            clearable: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            type: {
                                                                                            type: 'string',
                                                                                            value: 'text'
                                                                                            },
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            options: {
                                                                                label: {
                                                                                    type: 'string',
                                                                                    value: '字段名1'
                                                                                },
                                                                                path: {
                                                                                    type: 'string',
                                                                                    value: 'field1'
                                                                                },
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                options: {
                                                                    span: {
                                                                        type: 'number',
                                                                        value: 12
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                key: 'n-gi_4',
                                                                type: 'n-gi',
                                                                category: 'container',
                                                                icon: 'icon-n-y-grid',
                                                                label: '栅格列',
                                                                internal: true,
                                                                internalOptions: {
                                                                    realTagName: 'n-input',
                                                                    realLabel: '输入框'
                                                                },
                                                                slots: {
                                                                    default: [
                                                                        {
                                                                            key: 'n-form-item_1n',
                                                                            type: 'n-form-item',
                                                                            category: 'container',
                                                                            icon: 'icon-n-y-form',
                                                                            label: '表单字段',
                                                                            internal: true,
                                                                            slots: {
                                                                                default: [
                                                                                    {
                                                                                        key: 'n-input_1n',
                                                                                        type: 'n-input',
                                                                                        category: 'field',
                                                                                        icon: 'icon-n-y-input',
                                                                                        label: '输入框',
                                                                                        options: {
                                                                                            disabled: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            clearable: {
                                                                                            type: 'boolean',
                                                                                            value: false
                                                                                            },
                                                                                            type: {
                                                                                            type: 'string',
                                                                                            value: 'text'
                                                                                            },
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            options: {
                                                                                label: {
                                                                                    type: 'string',
                                                                                    value: '字段名1'
                                                                                },
                                                                                path: {
                                                                                    type: 'string',
                                                                                    value: 'field1'
                                                                                },
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                options: {
                                                                    span: {
                                                                        type: 'number',
                                                                        value: 12
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    options: {
                                                        cols: {
                                                            type: 'number',
                                                            value: 24
                                                        },
                                                        layoutShiftDisabled: {
                                                            type: 'boolean',
                                                            value: false
                                                        },
                                                        xGap: {
                                                            type: 'number',
                                                            value: 10
                                                        },
                                                        yGap: {
                                                            type: 'number',
                                                            value: 0
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        options: {
                                        }
                                    }
                                ]
                            },
                            options: {
                                name: {
                                    type: 'string',
                                    value: 'test'
                                },
                                tab: {
                                    type: 'string',
                                    value: '测试'
                                }
                            }
                        }
                    ]
                },
                options: {

                }
            }
        ]
    },
    options: {
        size: {
            type: 'string',
            value: 'small'
        },
        disabled: {
            type: 'boolean',
            value: false
        },
        inline: {
            type: 'boolean',
            value: false
        },
        labelWidth: {
            type: 'string',
            value: '100px'
        },
        labelAlgin: {
            type: 'string',
            value: 'left'
        },
        labelPlacement: {
            type: 'string',
            value: 'left'
        }
    }
} as WidgetNS.Config