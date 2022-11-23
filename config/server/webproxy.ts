export default {
    "/web-wf": {
        target: `http://localhost:3001/web-wf`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/web-wf/, '/')
    },
    "/web-smm": {
      target: `http://localhost:3002/web-smm`,
      changeOrigin: true,
      rewrite: path => path.replace(/^\/web-smm/, '/')
    },
    "/web-old": {
      target: `http://localhost:7999/web-old`,
      changeOrigin: true,
      rewrite: path => path.replace(/^\/web-old/, '/')
    },
}