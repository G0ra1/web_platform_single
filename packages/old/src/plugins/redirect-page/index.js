import Setting from "/setting";

export default function (urlPath, isNewPage = false, isDefault = true) {
  let url = ''
  if (isDefault) {
    url = `${Setting.webBaseURL}web-old/html/${urlPath}`
  } else {
    url = urlPath
  }
  if (isNewPage) {
    return window.open(
      url,
      '_blank',
      'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
    )
  } else {
    window.location.href = url
  }
  
}