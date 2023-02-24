export default {
   "/api/v4.3": {
   //使用环境变量INCLOUD_APIURL，方便直接调用自己后台，如果自己电脑上没有配置环境变量INCLOUD_APIURL，则使用默认incloud值
      target: process.env.INCLOUD_APIURL === "" || process.env.INCLOUD_APIURL === undefined ?
        `http://192.168.0.94/api/v4.3` : process.env.INCLOUD_APIURL,  
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api\/v4.3/, '/')
   },
  }
  
  // `http://192.168.0.70:32222` `http://incloud.com/api/v4.3` `http://jianxiu.com/api/v4.3 http://192.168.0.94/api/v4.3`