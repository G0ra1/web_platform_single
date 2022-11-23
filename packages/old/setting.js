const env = process.env.NODE_ENV;
const hostname = window.location.hostname
const host = window.location.host
const Setting = {
    webBaseURL: env === 'development' ? '/' : `/`, // 页面请求路径
    apiBaseURL: env === 'development' ? '/api/v4.3' : `http://${host}/api/v4.3`,
    cookiesPrefix: 'admin', // cookies名前缀
    cookiesExpires: 1, // cookies过期时间
    ueServerUrl: `http://${host}/`,
    socketUrl: env === 'development' ? 'ws://192.168.1.196:8010/ws' : `ws://${hostname}:8010/ws`,
    socketLogUrl: env === 'development' ? 'ws://192.168.1.196:8010/ws/log' : `ws://${hostname}:8010/ws/log`,
    defaultPwd: '$2a$10$VrsUF3JSyUt6ffn7fG8VjuYtpSJmTIfUnp/kIoSXtFMR6JGpjsFcG',
    fileServerUrl: env === 'development' ? 'http://192.168.1.196:8000/kkfile/onlinePreview' : `http://${host}/kkfile/onlinePreview`,
};
export default Setting;
