/*
 * @Author: zouliming 
 * @Date: 2022-10-18 09:26:50 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-27 17:58:31
 * @Description列表
 */

import { ref, h, Component } from 'vue'
import { RequestPaging, VxeHelper } from '@platform/main'
import ModelContent from './components/ModelContent.vue'
import { NButton, NTag, NIcon, NDropdown } from 'naive-ui'
import { delEntity, publishApi, deleteApi, publicConfig, deleteConfig } from "./api/index"
import { Cookies } from '@platform/main'
import { NsOption } from "./data/model/NsOption";
import { DownloadOutline, CodeDownloadOutline } from '@vicons/ionicons5';

//两个枚举
const statusType = ["warning", "success", "default", "primary"];
const statusArray = ["未发布", "在线", "离线", "修改未重新发布"];
const configType = ["warning", "success", "primary"];
const configArray = ["未配置", "已配置", "修改未重新配置"];
const modelContentRef = ref<typeof ModelContent>()
const appInfo = ref({ appCode: '', resourceId: '' })

let dialogLocal: any;
let messageLocal: any;
function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}

/**
 * 公共操作
 * @param id 
 */
const handleEvent = (key: string, sign: string, row: any) => {
    const id = row.id;
    let title = sign, content = '确定' + sign + '？';
    if (sign === "接口发布" || sign === "代码下载") {
        let check = (row.tablePrefix + row.moduleName).replaceAll("_", "-");
        if (appInfo.value.appCode !== check) {
            title = "是否确认";
            content = "当前实体表与关联的APP不对应，可能影响接口效果，是否继续？";
        }
    }
    if (sign === "配置发布" && row.configStatus) {
        title = "是否确认";
        content = "当前配置已经配置过，重新发布会删除原来配置并重新配置！";
    }

    dialogLocal.error({
        title: title,
        content: content,
        positiveText: '确认',
        negativeText: '取消',
        maskClosable: false,
        onPositiveClick: async () => {
            switch (sign) {
                case "删除": {
                    await pushMsg(await delEntity(id), sign, id);
                    break;
                }
                case "接口发布": {
                    if (row.interfaceReleaseStatus) {

                    }
                    await pushMsg(await publishApi(id), sign, id);
                    break;
                }
                case "接口删除": {
                    await pushMsg(await deleteApi(id), sign, id);
                    break;
                }
                case "代码下载": {
                    downloadEvent(key, id);
                    break;
                }
                case "配置发布": {
                    if (!row.interfaceReleaseStatus) {
                        messageLocal.error("接口未发布或无离线接口，不能进行配置！");
                        break;
                    }
                    await pushMsg(await publicConfig(id), sign, id);
                    break;
                }
                case "配置删除": {
                    await pushMsg(await deleteConfig(id), sign, id);
                    break;
                }
            }
            //重新加载下列表
            refresh();
        },
    })
}

const pushMsg = async (result: boolean, sign: string, id: string) => {
    if (result) {
        messageLocal.success(sign + "成功,节点id为:" + id);
    } else {
        messageLocal.error(sign + "失败,节点id为:" + id);
    }
}

/* const publishConfirm = () => {
    dialogLocal.error({
        title: title,
        content: content,
        positiveText: '确认',
        negativeText: '取消',
        maskClosable: false,
        onPositiveClick: async () => {
        }
    });
} */

/**
 * 代码下载
 * @param id 
 */
const downloadEvent = (key: string, id: string) => {
    const token = Cookies.get("token")
    const tokenType = Cookies.get("tokenType")
    console.log("token:", token);
    console.log("tokenType:", tokenType);
    let apiBaseURL = window.localStorage.getItem('apiBaseURL');
    console.log("apiBaseURL:", apiBaseURL);
    if (apiBaseURL !== "") {
        fetch(
            `${apiBaseURL}/main/modelingEntity/downloadCode?id=${id}&codeType=${key}`,
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
                a.download = "generator.zip";
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

/**
 * 图标处理
 * @param icon 
 * @returns 
 */
const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}


/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'tableName', title: '表名称', showHeaderOverflow: true, width: '280px', align: 'center' },
            { field: 'tableNameCh', title: '表中文名', showHeaderOverflow: true, width: '200px', align: 'center' },
            { field: 'moduleName', title: '模块名', showHeaderOverflow: true, width: '80px', align: 'center' },
            { field: 'subModuleName', title: '二级模块名', showHeaderOverflow: true, width: '100px', align: 'center' },
            {
                title: '接口状态', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: statusType[row.interfaceReleaseStatus] } as {},
                        { default: () => statusArray[row.interfaceReleaseStatus] }
                    )]
                }
            },
            {
                title: '配置状态', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: configType[row.configStatus] } as {},
                        { default: () => configArray[row.configStatus] }
                    )]
                }
            },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NButton,
                            { size: "tiny", style: "margin-right: 5px;", onClick: () => { modelContentRef.value?.show(appInfo.value.resourceId, row.id) } },
                            { default: () => "编辑" }
                        );
                        let del = h(
                            NButton,
                            { size: "tiny", style: "margin-right: 5px;", type: "error", onClick: () => handleEvent('', '删除', row) },
                            { default: () => "删除" }
                        );
                        let download = h(
                            NDropdown,
                            {
                                trigger: "hover",
                                style: "font-size: 25px",
                                options: [
                                    new NsOption.OptionDropDown("普通代码", "df", renderIcon(DownloadOutline)),
                                    new NsOption.OptionDropDown("工作流代码", "wf", renderIcon(CodeDownloadOutline))
                                ] as any,
                                onSelect: (key: string | number) => {
                                    handleEvent(key as string, '代码下载', row);
                                },
                            },
                            {
                                default: () => h(
                                    NButton,
                                    { size: "tiny", style: "margin-right: 5px;", type: "warning" },
                                    {
                                        default: () => "代码下载"
                                    }
                                )
                            }
                        );
                        let api_publish = h(
                            NButton,
                            { size: "tiny", style: "margin-right: 5px;", type: "info", onClick: () => handleEvent('', '接口发布', row) },
                            { default: () => "接口发布" }
                        );
                        let api_del = h(
                            NButton,
                            { size: "tiny", style: "margin-right: 5px;", type: "primary", onClick: () => handleEvent('', '接口删除', row) },
                            { default: () => "接口删除" }
                        );
                        let config_publish = h(
                            NButton,
                            { size: "tiny", style: "margin-right: 5px;", type: "info", onClick: () => handleEvent('', '配置发布', row) },
                            { default: () => "配置发布" }
                        );
                        let config_del = h(
                            NButton,
                            { size: "tiny", style: "margin-right: 5px;", type: "primary", onClick: () => handleEvent('', '配置删除', row) },
                            { default: () => "配置删除" }
                        );
                        return row.interfaceReleaseStatus !== 2 ? [edit, del, download, api_publish, api_del, config_publish, config_del] : [edit, del, download, config_publish, config_del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/main/modelingEntity/page',
        'post'
    )
)

const refresh = () => {
    reset({
        appCode: appInfo.value.appCode
    })
}

/**
 * 左树的重置
 * @param d 
 */
function handleTree(d: any) {
    if (d.appType === 2) {
        console.log("d:", d);
        appInfo.value = d
    } else if (d.appType === 0) {
        // root
        appInfo.value = { appCode: '', resourceId: '' }
    }
    refresh()
}

export {
    bind, gridRef, filterData, query, refresh, appInfo, modelContentRef, handleTree, initDialog
}