
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
          console.log('=====SET_RULES=====e==', )
        break;
        case 'GET_VALUE':
          console.log('========', window.DM_GET_VALUE())
          window.parent.postMessage({
            cmd: 'GET_VALUE',
            value: window.DM_GET_VALUE ? window.DM_GET_VALUE() : {}
          }, '*')
        break;
      }
    }
  )