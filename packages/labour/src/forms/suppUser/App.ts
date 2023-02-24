/**
 * @Description 用户
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 10:15:00
 */

import { ref } from 'vue';
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui';
import { AbstractForm, Cookies } from "@platform/main";
import { FormSchema } from "./conf";
import LabourSuppUser from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { getDict } from "./api";
import { NsOption } from "../../lib/option/NsOption"

let dialogLocal: any;
let messageLocal: any;
function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}

const token = Cookies.get("token")
const tokenType = Cookies.get("tokenType")
let apiBaseURL = window.localStorage.getItem('apiBaseURL');
const fileUrl = `${apiBaseURL}/main/fileinfo?fileSource=suppUser`
const headers = {
    Authorization: `${tokenType} ${token}`
};

type finishType = {
    file: UploadFileInfo;
    event?: ProgressEvent;
};


class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
        this.initOptions();
    }

    async initOptions() {
        console.log("initOptions");
        const educations = await getDict('outer_education');
        educations.forEach((education) => {
            this.educationOptions.value.push(new NsOption.OptionSelect(education.dictname, education.dictid));
        });
        const disciplines = await getDict('outer_discipline');
        disciplines.forEach((discipline) => {
            this.outerDisciplineOptions.value.push(new NsOption.OptionSelect(discipline.dictname, discipline.dictid));
        });
    }
    contractList = ref(new Array<UploadFileInfo>());
    insureList = ref(new Array<UploadFileInfo>());
    examList = ref(new Array<UploadFileInfo>());
    idCardList = ref(new Array<UploadFileInfo>());
    initFiles() {
        console.log("this.dataModel.value.contractFileId", this.dataModel.value.contractFileId);
        if (this.dataModel.value.contractFileId) {
            this.contractList.value.push(
                {
                    id: this.dataModel.value.contractFileId,
                    name: this.dataModel.value.contractFileName,
                    status: 'finished'
                }
            );
        }
        if (this.dataModel.value.insureFileId) {
            this.insureList.value.push(
                {
                    id: this.dataModel.value.insureFileId,
                    name: this.dataModel.value.insureFileName,
                    status: 'finished'
                }
            );
        }
        if (this.dataModel.value.examFileId) {
            this.examList.value.push(
                {
                    id: this.dataModel.value.examFileId,
                    name: this.dataModel.value.examFileName,
                    status: 'finished'
                }
            );
        }
        if (this.dataModel.value.idCardFileId) {
            this.idCardList.value.push(
                {
                    id: this.dataModel.value.idCardFileId,
                    name: this.dataModel.value.idCardFileName,
                    status: 'finished'
                }
            );
        }

        console.log("innner:", this.idCardList.value);
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourSuppUser>(new LabourSuppUser());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    checkPhoneNmber = (d: string) => {
        let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(d)) {
            messageLocal.error("非有效的手机号");
            return false;
        }
    }


    checkidCard = (d:string)=>{
        //将身份证号的出生日期提取出来
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(d) === false)
        {
	        messageLocal.error("非有效的身份证");
	    return false;
        }
        let birthday = this.getBirth(d)
        this.dataModel.value.birthday = birthday
       let sex =  this.getSex(d)
       this.dataModel.value.sex = sex
    }


    
    /**
     * 身份证提取出生日期
     * @param idCard
    */
     getBirth(idCard: any) {
        let birthday = "";
        if(idCard != null && idCard != ""){
            if(idCard.length == 15){
                birthday = "19"+idCard.slice(6,12);
            } else if(idCard.length == 18){
                birthday = idCard.slice(6,14);
            }   
            birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        }   
        return birthday;
    }


    /**
    * @param idCard
    */
     getSex(idCard: any) {
        let sexStr ;
        if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
            sexStr = 1;
        }
        else {
            sexStr = 2;
        }
        return sexStr;
    }

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: any) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        console.log("setValue", d);
        if(!d.sex){
            d.sex=1;
        }
        Object.assign(this.dataModel.value, d);
        this.initFiles();
    };

    //提交时会调取这个
    getValue = async () => {
        this.dataModel.value.username = this.dataModel.value.phoneNum;
        return cloneDeep(this.dataModel.value);
    };

    educationOptions = ref(new Array<NsOption.OptionSelect>());
    outerDisciplineOptions = ref(new Array<NsOption.OptionSelect>());

    contractFileRef = ref<UploadFileInfo[]>([
        {
            id: this.dataModel.value.contractFileId,
            name: this.dataModel.value.contractFileId,
            status: 'finished'
        },
    ])

    handleDownload = (file: UploadFileInfo, source: string) => {
        let fileId;
        if (source === 'contract') {
            fileId = this.dataModel.value.contractFileId;
        } else if (source === "insure") {
            fileId = this.dataModel.value.insureFileId;
        } else if (source === "exam") {
            fileId = this.dataModel.value.examFileId;
        } else if (source === "idCard") {
            fileId = this.dataModel.value.idCardFileId;
        }
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

    handleFinish = ({
        file,
        event
    }: {
        file: UploadFileInfo
        event?: ProgressEvent
    }, source: string) => {
        let { code, data, msg } = JSON.parse((event?.target as XMLHttpRequest).response);
        if (code == 200) {
            messageLocal.success("上传成功");
            if (source === "contract") {
                this.dataModel.value.contractFileId = data.id;
                this.dataModel.value.contractFileName = data.fileName;
            } else if (source === "insure") {
                this.dataModel.value.insureFileId = data.id;
                this.dataModel.value.insureFileName = data.fileName;
            } else if (source === "exam") {
                this.dataModel.value.examFileId = data.id;
                this.dataModel.value.examFileName = data.fileName;
            } else if (source === "idCard") {
                this.dataModel.value.idCardFileId = data.id;
                this.dataModel.value.idCardFileName = data.fileName;
            }
        } else {
            messageLocal.error(msg);
        }
        return file;
    }
}

export {
    FormModal, initDialog, fileUrl, headers
}
export type {
    finishType
}
