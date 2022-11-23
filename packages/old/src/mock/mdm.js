export default [
  {
    system: 'mdm',
    code: 'org',
    name: '组织机构部门管理',
    icon: '',
    children: [{
      system: 'mdm',
      code: 'organization-manage',
      name: '组织机构管理',
      icon: 'icon-jigou'
    },
    {
      system: 'mdm',
      code: 'emp-manage',
      name: '用户管理',
      icon: 'icon-yonghuguanli'
    },
    {
      system: 'mdm',
      code: 'duty-manage',
      name: '职务管理',
      icon: 'icon-zhiwuguanli'
    },
    {
      system: 'mdm',
      code: 'post-manage',
      name: '岗位管理',
      icon: 'icon-zuzhigangweiguanli'
    },
    ]
  }, {
    system: 'mdm',
    code: 'resource',
    name: '客商管理',
    icon: '',
    children: [{
      system: 'mdm',
      code: 'supplier-manage',
      name: '供应商管理',
      icon: 'icon-ziyuan1'
    },
    {
      system: 'mdm',
      code: 'customer-manage',
      name: '客户管理',
      icon: 'icon-kehuguanli'
    },
    ]
  },
  {
    system: 'mdm',
    code: 'resource',
    name: '项目管理',
    icon: '',
    children: [{
      system: 'mdm',
      code: 'project-manage',
      name: '项目管理',
      icon: 'icon-xinxiangmuguanli'
    },
    ]
  },
  {
    system: 'mdm',
    code: 'resource',
    name: '合同管理',
    icon: '',
    children: [{
      system: 'mdm',
      code: 'purchaseContract-manage',
      name: '采购合同管理',
      icon: 'icon-caigouhetongguanli'
    },
    {
      system: 'mdm',
      code: 'salesContract-manage',
      name: '销售合同管理',
      icon: 'icon-xiaoshouhetongguanli'
    },
    ]
  },
  {
    system: 'mdm',
    code: 'resource',
    name: '物资管理',
    icon: '',
    children: [{
      system: 'mdm',
      code: 'suppliesClassify-manage',
      name: '物资分类管理',
      icon: 'icon-wuzifenleiguanli1x'
    },
    {
      system: 'mdm',
      code: 'supplies-manage',
      name: '物资管理',
      icon: 'icon-wuziguanli'
    },
    ]
  }
]