
  window.DM_INIT = () => window.parent.postMessage({
    cmd: 'INIT_COMPLETE',
    url: window.location.href
  }, '*')
  window.addEventListener('message', function (e) {
      switch (e.data.cmd) {
        case 'SET_VALUE':
          window.DM_SET_VALUE && window.DM_SET_VALUE(e.data.value)
        break;
        case 'SET_RULES':
          window.DM_SET_RULES && window.DM_SET_RULES(e.data.value)
        break;
        case 'GET_VALUE':
          window.parent.postMessage({
            cmd: 'GET_VALUE',
            value: window.DM_GET_VALUE ? window.DM_GET_VALUE() : {}
          }, '*')
        break;
        case 'GET_VALIDATE':  
          if (window.DM_VALIDATE) {
            window.DM_VALIDATE().then(r => {
              window.parent.postMessage({
                cmd: 'GET_VALIDATE',
                value: r
              }, '*')
            })
          } else {
            window.parent.postMessage({
              cmd: 'GET_VALIDATE',
              value: []
            }, '*')
          }
          // window.parent.postMessage({
          //   cmd: 'GET_VALIDATE',
          //   value: window.DM_VALIDATE ? window.DM_VALIDATE() : true
          // }, '*')
        break;
      }
    }
  )