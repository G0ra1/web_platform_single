export default {
	"fullName": "test456",
	"shortName": "test1",
	"viewMode": "drawer",
	"icon": "icon-openway-xinyemian",
	"width": "800px",
	"height": "600px",
	"remarks": "test456",
	"type": "form",
	"formUrl": "/html/mso/orchestrate-classify-form.html",
	"formId": "",
	"formNameCh": "xxx",
	"buttons": "[{\"align\":\"right\",\"disabled\":false,\"text\":\"保存\",\"type\":\"info\",\"id\":\"btn1\",\"script\":\"saveScript\"}]",
	"script": "[{\"key\":\"init\",\"isAsync\":true,\"code\":\"\\n// ----\\nreturn {}\\n        \"},{\"key\":\"saveScript\",\"isAsync\":true,\"code\":\"\\nUtils.SetSpin(true)\\nconst r = await Request({\\n    url: '/mso/msodefType',\\n    method: 'post',\\n    data: await Utils.GetFormValue()\\n})\\n.then(r => {\\n    window.$message.success('编排分类添加成功')\\n    return true\\n})\\n.catch(error => {\\n    window.$message.error('编排分类添加失败')\\n    console.log('===========', error)\\n    return false\\n})\\nUtils.SetSpin(false)\\nUtils.DispatchEvent('complete')\\nreturn r\\n        \"}]"
}