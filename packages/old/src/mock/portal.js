export default [
  // {
  //   system: 'portal',
  //   code: 'portal',
  //   name: '门户管理',
  //   icon: 'icon-menhu-color'
  // },
  {
    system: 'portal',
    code: 'portal-manage',
    name: '门户维护',
    icon: 'icon-menhu-color'
  },
  {
    system: 'portal',
    code: 'theme-manage',
    name: '主题管理',
    icon: 'icon-zhuti1'
  },
  // {
  //   system: 'portal',
  //   code: 'dataSource-manage',
  //   name: '数据源管理',
  //   icon: 'icon-menhu-color'
  // },
  {
    system: 'portal',
    code: 'part',
    name: '栏目管理',
    icon: 'icon-lanmu'
  },
  // {
  //   system: 'portal',
  //   code: 'theme-manage',
  //   name: '主题管理',
  //   icon: 'icon-zhuti'
  // },
  {
    system: 'portal',
    code: 'template',
    name: '模板管理',
    icon: 'icon-moban'
  },
  // {
  //   system: 'portal',
  //   code: 'source-manage',
  //   name: '日志管理',
  //   icon: 'icon-rizhi'
  // },
  {
    system: 'portal',
    code: 'statistical-manage',
    name: '统计信息',
    icon: 'icon-tongji'
  },
  {
    system: 'portal',
    code: 'dataSource-manage',
    name: '数据源管理',
    icon: 'icon-shujuyuan'
  },
  {
    system: 'portal',
    code: 'content',
    name: '内容管理',
    icon: 'icon-neirong2',
    children: [
      {
        system: 'portal',
        code: 'systemx',
        name: '系统集成',
        icon: 'icon-xitongjicheng'
      },
      {
        system: 'portal',
        code: 'news-manage',
        name: '新闻管理',
        icon: 'icon-liebiao'
      },
      {
        system: 'portal',
        code: 'banner-manage',
        name: '首页banner',
        icon: 'icon-lunbotu'
      },
      {
        system: 'portal',
        code: 'picture-manage',
        name: '图片新闻',
        icon: 'icon-tupianxinwen'
      },
      {
        system: 'portal',
        code: 'video-manage',
        name: '视频新闻',
        icon: 'icon-shipinxinwen1'
      },
      {
        system: 'portal',
        code: 'file-manage',
        name: '文件下载',
        icon: 'icon-xiazai'
      },
      {
        system: 'portal',
        code: 'slider-manage',
        name: '图片轮播',
        icon: 'icon-tupianlunbo'
      },
      
    ]
  }
]