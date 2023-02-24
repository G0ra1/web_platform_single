
<template>
 
     <n-upload
        style="width:100%"
        :action="uploadUrl"
        :directory-dnd="true"
        v-model:file-list="fileList"
        @finish="handleFinish"
        @remove="removeChange"
        @before-upload="beforeUpload"
        :headers="{
            Authorization: `${tokenType} ${token}`,
        }"
        :data ="{
            fileSource:'study',
            poolName:'aliyunStudy',
        }"
    >
        <n-upload-dragger v-if="!fileList.length">
            <div style="margin-bottom: 12px">
                <nw-icon name="icon-daoru2" :size="45"/>
            </div>
            <n-text style="font-size: 16px">
                点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
                {{props.textNP}}
            </n-p>
        </n-upload-dragger>
    </n-upload>
               
</template>
<script>
import { reactive, computed,ref,defineComponent,watch } from "vue";
import {
  NUpload,
  NUploadDragger,
  NText,
  NP,
  useMessage
} from 'naive-ui'
import { NwIcon, NwDic, Cookies } from '@platform/main';

export default defineComponent({
  components: {
    NUpload,
    NUploadDragger,
    NText,
    NP,
    NwIcon
  },
    props: {
        // 列
        value: {
            type: Array,
            default: () => [],
        },
        textNP:{
           type: String,
           default:()=>' 当前格式仅支持文档'
        }
    },
  setup(props, context) {
    const fileDuration = ref()
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const message = useMessage();
    const fileListRef = ref([]);
    const  getVideoDuration = (src) => {
       
        return new Promise((res, rej) => {
             const v = document.createElement('video');
            if (typeof src === 'string') {
                v.src = src;
            }
            else {
                v.src = URL.createObjectURL(src);
            }
            v.autoplay = 'autoplay';
            v.autoplay = false
            v.play();
            v.addEventListener('loadedmetadata', () => {
                +v.duration && res(v.duration);
                !+v.duration && res(null);
            });
            v.addEventListener('durationchange', () => {
                +v.duration && res(v.duration);
                !+v.duration && res(null);
            });
            v.addEventListener('error', () => {
                res(null);
            });
            setTimeout(()=>{
                v.dispose()
            }, 3000)
           
        });

    }
    fileListRef.value = props.value
   
    return {
      fileDuration,
      token,
      tokenType,
      props,
      fileList:fileListRef,
      uploadUrl:`${window.apiBaseURL}/main/aliyunFile`,
       handleFinish() {
            let { code, data, msg } = JSON.parse(event.target.response);
            if (code == 200) {
                message.success("上传成功");
                context.emit('update:callback',data);
            } else {
                message.error(msg);
            }
        },
        getVideoDuration,
        async beforeUpload() {
            let resultFile = event.target.files[0]
            // await getVideoDuration(new Blob([resultFile])).then(res=>{
            //     fileDuration.value = parseInt(res*1000)
            // })
        },
        removeChange(){
             context.emit('rupdate:callback',);
        }
    }
  },
});
</script>
<style scoped lang="less">
    /deep/ .n-upload-trigger{
        width:100%
    }
</style>
