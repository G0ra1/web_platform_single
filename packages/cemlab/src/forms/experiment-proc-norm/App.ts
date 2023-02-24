/**
 * @Description 实验流程规范
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 09:49:36
 */

import { ref } from 'vue';
import { FormInst, FormRules, UploadFileInfo, useMessage } from 'naive-ui';
import { AbstractForm, Cookies } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabExperimentProcNorm from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
let apiBaseURL = window.localStorage.getItem('apiBaseURL');
const token = Cookies.get("token")
const tokenType = Cookies.get("tokenType")
let dialogLocal: any;
let messageLocal: any;
function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}
class FormModal extends AbstractForm {
    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<CemlabExperimentProcNorm>(new CemlabExperimentProcNorm());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    //执行初始化自定义脚本
    initScript = async (params: any) => {
    }

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };
    /**
    * 通过图片后缀判断是否为图片
    * @param imageName 图片全称
    * @returns {boolean} 如果是图片则返回true,反之返回false
    */
    verifySuffix(imageName: string) {
        const suffix = `(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)`
        const regular = new RegExp(`.*\.${suffix}`)
        return regular.test(imageName)
    }
    fileList = ref(new Array<UploadFileInfo>());
    //初始化文件信息
    initFiles() {
        if (this.dataModel.value.filesId) {
            this.fileList.value.push(
                {
                    id: this.dataModel.value.filesId,
                    name: this.dataModel.value.filesName,
                    status: 'finished'
                }
            );
        }
    }
    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, { filesName: '---' }, d);
        //调用文件信息初始化方法
        this.initFiles();
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    //下载
    handleDownload = (file: UploadFileInfo) => {
        let fileId;
        fileId = this.dataModel.value.filesId;
        if (apiBaseURL !== "") {
            fetch(
                `${apiBaseURL}/main/fileinfo/stream?id=${fileId}`,
                {
                    method: "get",
                    headers: new Headers({
                        Authorization: `${tokenType} ${token}`
                    }),
                }
            )
                .then(response => response.arrayBuffer())
                .then(res => {
                    var a = document.createElement("a");
                    a.style.display = "none";
                    var url = URL.createObjectURL(
                        new Blob([res], {
                            type:
                                "application/zip;charset=UTF-8"
                        })
                    );
                    a.href = url;
                    a.download = file.name;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url); // 释放掉blob对象
                    document.body.removeChild(a); // 下载完成移除元素
                    setTimeout(() => {
                        messageLocal.success("下载成功");
                    }, 1000);
                }).catch(e => {
                })
        }
    }
    //上传完成方法
    handleFinish = ({ file, event }: {

        file: UploadFileInfo; event?: ProgressEvent
    }) => {
        let { code, data, msg } = JSON.parse((event?.target as XMLHttpRequest).response);
        if (code == 200) {
            //messageLocal.success("上传成功");
            this.dataModel.value.filesId = data.id;
            this.dataModel.value.filesName = data.fileName;
            //上传完成判断文件类型如果不是图片 把是否轮播设为0
            if (this.verifySuffix(data.fileName) == false) {
                this.dataModel.value.isFlashview = 0;
            }
            return file;
        } else {
            //messageLocal.error(msg);
        }
        return file;
    }
}
export {
    FormModal,
}