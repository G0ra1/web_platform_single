import { ref } from 'vue';
import { Cookies } from "@platform/main";
import { UploadFileInfo } from 'naive-ui'
import type { MessageApiInjection } from './MessageProvider';

class FileInfo implements UploadFileInfo {
  id!: string;
  fileId!: string;
  name!: string;
  batchId?: string | null;
  percentage?: number | null;
  status!: 'pending' | 'uploading' | 'finished' | 'removed' | 'error';
  url?: string | null;
  file?: File | null;
  thumbnailUrl?: string | null;
  type?: string | null;
  fullPath?: string | null;
}

type Props = {
  attachment: string,
  attachmentids: string,
}

let message: any;

//文件上传Headr
const fileUploadHeadr: any = {
  Authorization: Cookies.get("tokenType") + ' ' + Cookies.get("token")
}

//文件列表
let defaultFileList = ref<Array<FileInfo>>([]);

const afterEnter = (props: Props, useMessage: any) => {
  message = useMessage;
  const _attachmentArray: Array<string> = props.attachment?.split(",") || [];
  const _attachmentIdsArray: Array<string> = props.attachmentids?.split(",") || [];
  defaultFileList.value.splice(0)
  for (let i = 0; i < _attachmentIdsArray?.length; i++) {
    if (_attachmentIdsArray[i]) {
      let fileInfo: FileInfo = {
        id: _attachmentIdsArray[i],
        fileId: _attachmentIdsArray[i],
        name: _attachmentArray[i],
        status: 'finished'
      };
      defaultFileList.value?.push(fileInfo);
    }
  }
}

//文件上传
const fileUploadFinish = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }): UploadFileInfo => {
  let { code, data } = (event?.target as XMLHttpRequest).response;
  if (code === 200) {
    defaultFileList.value?.push({ fileId: data.id, ...file });
    message.success("上传成功", { closable: true, duration: 5000 })
  } else {
    message.error("上传失败", { closable: true, duration: 5000 })
  }
  return file;
}

//文件上传失败
const fileUploadError = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) => {
  message.error("上传失败", { closable: true, duration: 5000 })
}

//文件移除
const fileUploadRemove = async ({ file, fileList }: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }): Promise<Boolean> => {
  defaultFileList.value.splice(defaultFileList.value.findIndex((item: FileInfo) => item.fileId === file.id), 1);
  message.success("删除成功", { closable: true, duration: 5000 })
  return true;
}


const fileDownload = async (file: UploadFileInfo) => {
  let fileId = defaultFileList.value?.filter((item: FileInfo) => item.fileId === file.id).map((item: FileInfo) => item.fileId);
  let fileName = file.name;
  fetch(
    `${window.apiBaseURL}/main/fileinfo/stream?id=${fileId}`, {
    method: "get",
    headers: {
      Authorization: Cookies.get("tokenType") + ' ' + Cookies.get("token")
    },
  }
  ).then(response => response.arrayBuffer()).then(res => {
    var a = document.createElement("a");
    a.style.display = "none";
    var url = URL.createObjectURL(
      new Blob([res], {
        //type: "application/zip;charset=UTF-8"
      })
    );
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url); // 释放掉blob对象
    document.body.removeChild(a); // 下载完成移除元素
  }).catch(e => {
  })
}


export {
  afterEnter, fileUploadHeadr, defaultFileList, fileDownload, fileUploadFinish, fileUploadError, fileUploadRemove
}