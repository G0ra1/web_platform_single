
// 组件
export default {
  key: 'PMenu',
  tagName: 'p-menu',
  label: '菜单',
  code: `<template>
    <div style="background: url('./mask.png');height:460px;">
      <div class="my-menu">
        <div :class="{'my-menu-item':true,'active':isActive(item.code)} " v-for="item in result" :key="item.code" @click="()=>{menuClickHandle(item)}" >
          <span class="laebl">{{item.name}}<span v-if="item.__Count" class="laebl-count">{{item.__Count}}</span><span class="icon-c"><nw-icon name="icon-xiangzuojiantou" style="transform: rotate(180deg);" :size="16" /></span></span>
        </div>
        <div class="my-menu-item-l2" v-if="menuL2.length>0">
          <p class="l2-list" v-for="l2 in menuL2">
            <span v-if="!l2.children||l2.children.length==0">
              <span class="l2-title" >{{l2.label}}</span>
            </span>
            <span v-else style="display:flex">
              <span class="l2-title" >{{l2.label}}<nw-icon name="icon-xiangzuojiantou" style="transform: rotate(180deg);margin-left:15px;" :size="16" /></span>
              <span class="l3-list">
                <span class="l3-title" v-for="l3 in l2.children">
                  <a>{{l3.label}}</a>
                </span>
              </span>
              
            </span>
          </p>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
  props: {
    title: {
      type: String,
      default: '新闻'
    },
    request: {
      type: Object,
      default: () => ({
        url: '/portal/portalPart/list',
        method: 'post',
        data: {
          page: {
            size: 8
          }
        }
      })
    },
    response: {
      type: Object,
      default: () => ({
        dataMethod: res => res.records
      })
    }
  },
  setup (props) {
    const token = $Cookies.get("token");
    const tokenType = $Cookies.get("tokenType");
    const loadCount = (url, id) => {
      if(!url) return
      fetch(
        url,
        {
          method: 'get',
          headers: new Headers({
            Authorization: \`\${tokenType} \${token}\`
          }),
        }
      ).then(function (response) {
        return response.json()
      }).then(res => {

        result.value[id]['__Count'] = res.data.taskCount>100?'99+':res.data.taskCount
      })
    }
    const router = $VueRouter.useRouter()
    const result = $Vue.ref([
      
    ])
    let trpLogin = {
      url: '/portal/portalUrl/trpLogin',
      method: 'get',
      params: {}
    }
    let expenseLogin = {
      url: '/portal/portalUrl/singOnReimburse',
      method: 'get',
      params: {}
    }
    let ncLogin = {
      url: '/portal/portalUrl/singOnNC',
      method: 'get',
      params: {}
    }
    const biUrl = $Vue.ref("")
    const expenseUrl = $Vue.ref("")
    const ncUrl = $Vue.ref("")
    $Db.get("userInfo").then((res) => {
      trpLogin.params.userId = expenseLogin.params.userId = ncLogin.params.userId = res.id
      trpLogin.params.phone = expenseLogin.params.phone = ncLogin.params.phone = res.phoneNum
      $Request(trpLogin).then(res => {
        biUrl.value = res
        console.log(res,'trpLogintrpLogintrpLogin')
      })
      $Request(expenseLogin).then(res => {
        expenseUrl.value = res
        console.log(res,'expenseLogin')
      })
      $Request(ncLogin).then(res => {
        ncUrl.value = res
        console.log(res,'ncLogin')
      })
    })
    const menuL2 = $Vue.ref([])
    const activeKey = $Vue.ref("")
    const isActive = (key)=>{
      return activeKey.value == key
    }
    const menuClickHandle = (item)=>{
      // menuL2.value = item.children
      activeKey.value = item.code
      console.log(item)
      
      if(item.url=="bi"){
        if(biUrl.value) window.open(\`\${biUrl.value}\`)
      }else if(item.url=="expense"){
        if(expenseUrl.value) window.open(\`\${expenseUrl.value}\`)
      }else if(item.url=="nc"){
        if(ncUrl.value) window.open(\`\${ncUrl.value}\`)
      }else{
        const url = item.isHaveToken == 1?\`\${item.url}&token=\${tokenType} \${token}\` : item.url
        window.open(\`\${url}\`)
      }
    }
    $Request(props.request).then(res => {
      result.value = props.response.dataMethod(res)
      result.value.forEach(d => {
        loadCount(d.countUrl, d.id)
      })
    })
    const timer = $Vue.ref(0);
    timer.value = setInterval(() => {
      if(window.sessionStorage.getItem('isTasksCount')==1){
        $Request(props.request).then(res => {
            result.value = props.response.dataMethod(res)
            result.value.forEach(d => {
              loadCount(d.countUrl, d.id)
            })
        })
        window.sessionStorage.setItem('isTasksCount', 0);
      }
    }, 1000);
    return {
      timer,
      result,
      title: props.title,
      menuClickHandle,
      menuL2,
      isActive,
      activeKey,
      expenseUrl,
      biUrl,
      ncUrl,
      handle () {
        router.push(\`/detail?src=\${escape(result.value.url)}\`)
      }
    }
  }
  }
  </script>
  <style lang="less">
  *{
    transition: all 0.3s;
  }
    .my-menu{
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      padding:16px 0px;
      box-sizing: border-box;
      &-item{
        flex: 1;
        max-height:45px;
        padding-left: 16px;
        position: relative;
        overflow: hidden;
        .laebl{
          display: flex;
          padding-left: 16px;
          flex-direction: column;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          position: absolute;
          height: 100%;
          .laebl-count{
            position: absolute;
            width: 20px;
            height: 20px;
            right: 80px;
            line-height: 16px;
            background: rgba(255, 70, 70, 1);
            border-radius: 50%;
            color: #fff;
            line-height: 20px;
            font-size: 12px;
            text-align: center;
          }
          .icon-c{
            position: absolute;
            width: 16px;
            height: 16px;
            right:64px;
            line-height: 16px;
          }
        }
        .laebl:hover{
          background:#fff
        }
      }
      &-item.active .laebl{
        background:#fff
      }
      &-item-l2{
        position: absolute;
        background:#fff;
        width: 995px;
        height: 460px;
        top: 0;
        left: 234px;
        z-index: 999;
        padding-left: 40px;
        .l2-list{
          padding: 32px 0;
          margin: 0;
          border-bottom: 1px dashed #010101;
          font-size: 18px;
          .l2-title{
            width: 110px;
            cursor: pointer;
          }
          .l3-list{
            flex:1;
            .l3-title{
              font-size: 16px;
              margin-left: 40px;
              display: inline-block;
              cursor: pointer;
            }
          }
          
        }
      }
    }
  </style>` // 
}
// {
//   partName,
//   url = '/portal/portalContentNews/list',
//   method = 'post',
//   data = `{
//     page: {
//       size: 8
//     }
//   }`,
// }
export const instance = (d = { partName: '标题' }) => {

  let req
  if (d.isDs) {
    // 使用数据源
    // req.url = d.portalPartDsDto.dsUrl
    // req.method = d.portalPartDsDto.dsReq ? 'post' : 'get'
    // req[req.method === 'get' ? 'params' : 'data'] = JSON.parse(d.portalPartDsDto.dsParamsVal)
    // 使用数据源
    req = `{
      url: '${d.portalPartDsDto.dsUrl}',
      method: '${d.portalPartDsDto.dsReq ? 'post' : 'get'}',
      ${d.portalPartDsDto.dsReq ? 'data' : 'params'}: ${d.portalPartDsDto.dsParamsVal}
    }`
  } else {
    // 默认数据源

    req = `{
      url: '/portal/portalContentSysjoints/listForShow',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 10
        }
      }
    }`
    // req.url = '/portal/portalContentPictures/list'
    // req.method = 'post'
    // req.data = {
    //   partCode: d.partCode,
    //   page: {
    //     size: 10
    //   }
    // }
  }
  // :request="${JSON.stringify(req).replace(/\"/g, '\'')}"
  return `<p-menu
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.sysName,
      id: i,
      code:d.sysCode,
      date: d.updateTime,
      url: d.sysUrl,
      imgSrc: d.sysImgUrl,
      icon: d.icon,
      countUrl: d.taskCountUrl,
      isHaveToken:d.isHaveToken
    }))
  }"
/>`
  // return `<PList
  // title="${d.partName}"
  // :request="{
  //   url: '/portal/portalContentNews/list',
  //   method: 'post',
  //   data: {
  //     partCode: '${d.partCode}',
  //     page: {
  //       size: 10
  //     }
  //   }
  // }"
  // :response="{
  //   dataMethod: res => res.records.map((d, i) => ({
  //     name: d.title,
  //     id: i,
  //     date: d.updateTime,
  //     url: d.contentUrl,
  //   }))
  // }"
  // />`
}