
  window.DM_INIT = () => {
    window.DM_PAGE_KEY = window.location.hash.substring(1)
    window.parent.postMessage({
      cmd: 'INIT_COMPLETE',
      key: window.DM_PAGE_KEY
    }, '*')
  }
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
            value: window.DM_GET_VALUE ? window.DM_GET_VALUE() : {},
            key: window.DM_PAGE_KEY
          }, '*')
        break;
        case 'GET_VALIDATE':
          if (window.DM_VALIDATE) {
            window.DM_VALIDATE().then(r => {
              window.parent.postMessage({
                cmd: 'GET_VALIDATE',
                value: r,
                key: window.DM_PAGE_KEY
              }, '*')
            })
          } else {
            window.parent.postMessage({
              cmd: 'GET_VALIDATE',
              value: [],
              key: window.DM_PAGE_KEY
            }, '*')
          }
          // window.parent.postMessage({
          //   cmd: 'GET_VALIDATE',
          //   value: window.DM_VALIDATE ? window.DM_VALIDATE() : true
          // }, '*')
        break;
        case 'GET_SCHEMA':
          window.parent.postMessage({
            cmd: 'GET_SCHEMA',
            value: {},
            key: window.DM_PAGE_KEY
          }, '*')
        break;
      }
    }
  )