// 组件
export default {
  key: "PCarousel",
  tagName: "p-carousel",
  label: "轮播图",
  code: `<template>
  <n-carousel show-arrow autoplay :interval="30000">
    
    <div style="height: 100%;position: relative;cursor: pointer;" v-if="reImgSrc">
    <img
      @click="biregister()"
      class="carousel-img"
      :src="reImgSrc" 
    />
  </div>
  <div style="background: rgba(0, 0, 0, 0.2);height: 100%;position: relative;" v-if="isRegisterBi">
    <iframe :src="BIList" style="width: 100%;
    height: 100%;
    border: none;"></iframe>
  </div>
    <img
      v-for="item in result"
      :key="item.id" 
      @click="handle(item)"
      class="carousel-img"
      :src="item.imgSrc" 
    />
    
    
  </n-carousel>
  </template>
  <script>
  export default {
  props: {
    number: {
      type: Number,
      default: 4
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
    const router = $VueRouter.useRouter()
    const result = $Vue.ref([])
    const isRegisterBi = $Vue.ref(false)
    const BIList = $Vue.ref({})
    const reImgSrc = $Vue.ref("")
    const resCode = $Vue.ref("")
    $Request(props.request).then(res => {
      result.value = props.response.dataMethod(res)
      console.log(result.value,'result.valueresult.valueresult.value')
    })
    const biregister = ()=>{
      if(resCode.value == '11012'){
        window.open('https://account.glodon.com/login')
      }
    }
    let getBackUrl = {
      url: '/portal/portalUrl/getBackUrl',
      method: 'get',
      params: {}
    }
    $Db.get("userInfo").then((res) => {
      getBackUrl.params.userId = res.id
      getBackUrl.params.phone = res.phoneNum
      $Request(getBackUrl).then(res => {
        resCode.value = res
        if(res == '11012'){
          isRegisterBi.value = false
          reImgSrc.value = '/assets/image/weizhuce.png'
          console.log(reImgSrc.value)
        }else{
          if(res == '11013'){
            isRegisterBi.value = false
            reImgSrc.value = '/assets/image/quanxian.png'
          }else{
            isRegisterBi.value = true
            BIList.value = res
          }
        }
      })
    })
    
    return {
      result,
      BIList,
      reImgSrc,
      isRegisterBi,
      title: props.title,
      biregister,
      resCode,
      handle (item) {
        window.open(item.url,'newwindow')
        // router.push(\`/detail?src=\${escape(item.url)}\`)
      }
    }
  }
  }
  </script>
  <style lang="less">
    .bi-register{
      width: 320px;
      height: 200px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(232, 243, 255, 1) 100%);
      text-align: center;
      .title{
        position: absolute;
        width: 120px;
        height: 32px;
        line-height: 32px;
        margin: 0;
        background: rgba(7, 64, 123, 1);
        color: #fff;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        left: 100px;
        top: -16px;
      }
      .label{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: rgba(255, 141, 26, 1);
        margin-top: 32px;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 20px;
        font-weight: 600;
      }
      .l3-title{
        margin: 0;
        font-size: 14px;
        margin-top: 5px;
        font-weight: 600;
        color: #000;
      }
      .tip-con{
        display: inline-block;
        width: 216px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.64);
        margin: 0;
        margin-top: 9px;
      }
      .register-btn{
        display: inline-block;
        width: 288px;
        margin: 0;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        background: rgba(1, 69, 142, 1);
        font-size: 14px;
        color: #fff;
        margin-top: 27px;
        cursor: pointer;
      }
      .register-btn:hover{
        opacity: 0.8;
        box-shadow: 5px 5px 15px 1px #8c96b9;
      }
    }
  </style>` //
};

export const instance = (d = { partName: "标题" }) => {
  let req;
  if (d.isDs) {
    // 使用数据源
    // req.url = d.portalPartDsDto.dsUrl
    // req.method = d.portalPartDsDto.dsReq ? 'post' : 'get'
    // req[req.method === 'get' ? 'params' : 'data'] = JSON.parse(d.portalPartDsDto.dsParamsVal)
    // 使用数据源
    req = `{
      url: '${d.portalPartDsDto.dsUrl}',
      method: '${d.portalPartDsDto.dsReq ? "post" : "get"}',
      ${d.portalPartDsDto.dsReq ? "data" : "params"}: ${d.portalPartDsDto.dsParamsVal
      }
    }`;
  } else {
    // 默认数据源

    req = `{
      url: '/portal/portalContentPictures/listForShow',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 10
        }
      }
    }`;
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
  return `<p-carousel
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.title,
      id: i,
      date: d.updateTime,
      url:d.contentUrl,
      imgSrc: d.fileUrl
    }))
  }"
/>`;
};
