<template>
  <div class="videoBorder">
    <div class="courseBorder">
      <div class="specialcourseDetail">
        <div class="video">
          <div v-show="!!(fileType == 1 || fileType == 2)">
            <video
              ref="videoPlayer"
              class="video-js vjs-big-play-centered"
              id="myVideo"
              @pause="onPlayerPause($event)"
              @play="onPlayerPlay($event)"
              :style="`border: 0;width: 100%;height: 750px;`"
            ></video>
          </div>

          <iframe
            ref="iframeRef"
            :src="fileUrl"
            style="border: 0; width: 100%; height: 744px; background: #fff"
            v-if="fileType == 3"
          />
          <div class="grade">
            <h2 style="display: inline-block">{{ formData.lessonName }}</h2>
            <h2 style="display: inline-block; margin-right: 40px; float: right">
              <span style="margin-right: 30px; color: #1890ff"
                >当前讲师: <span>{{ formData.specialLecturer }}</span></span
              >
              <n-rate
                size="medium"
                :count="1"
                :value="formData.isCollect"
                @update:value="isCollection"
              />
              <span style="margin-left: 5px">{{
                formData.isCollect == 0 ? "未收藏" : "已收藏"
              }}</span>
            </h2>
          </div>
        </div>
        <div class="videoMenu">
          <h3 class="title" style="text-align: left">
            <span style="text-align: left"
              >目录 ({{ formData.couList ? formData.couList.length : 0 }})</span
            >
            <!-- <span style="text-align:right;font-size:10px">一键申请</span> -->
          </h3>
          <n-scrollbar style="height: 770px">
            <div
              v-for="(item, index) in formData.couList"
              :key="item.id"
              :class="videoKey == item.id ? 'videoMenuCss' : 'videoMenuDetail'"
              @Click="
                (e) => {
                  videoMenuClick(item);
                }
              "
              :style="`${index !== 0 && 'margin-top:20px'};display:flex;padding:0 4px`"
            >
              <div style="flex: 1">
                <div style="height: 33px; line-height: 33px; font-size: 16px">
                  <span class="videoName" :title="item.couName"
                    >第{{ num[index] }}节 {{ item.couName }}</span
                  >
                </div>
                <div style="height: 33px; line-height: 33px; font-size: 12px">
                  <span style="color: #888"
                    >{{
                      [
                        { label: "音频 |", value: 1 },
                        { label: "视频 |", value: 2 },
                        { label: "文档", value: 3 },
                      ].filter((d) => d.value == item.couType)[0].label
                    }} </span
                  ><span class="textOverflow" style="color: #fff; padding-left: 3px">
                    {{ item.studyTimeSize }}</span
                  >
                </div>
                <div
                  style="height: 33px; line-height: 33px; font-size: 12px; width: 100%"
                >
                  <span style="display: inline-block" class="textOverflow">
                    <span style="color: #888">完成率 {{ item.finishSize }} /</span
                    ><span style="color: #fff; padding-left: 5px"
                      >需达到 {{ item.studyBestLessTime }}</span
                    >
                  </span>
                </div>
              </div>
              <div
                style="height: 100%; width: 25px; background: #1890ff; border-radius: 5px"
              >
                <span style="color: #fff; line-height: 50px">
                  {{ item.couIsCompulsory == 1 ? "必" : "选" }} <br />
                  修
                </span>
              </div>
            </div>
          </n-scrollbar>
        </div>
      </div>
    </div>
    <div class="courseMessage">
      <div class="first">
        <span
          style="
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            padding: 2px 0;
          "
          ><span style="font-weight: bolder; color: #1060c9">|</span> 课程信息</span
        >
        <n-card style="height: 170px; width: 100%; background: #fff">
          <p class="header">
            <span style="font-weight: bolder; font-size: 18px; color: #3f8fff">{{
              formData.lessonName
            }}</span>
            <span style="margin-left: 20px">
              <n-popconfirm
                negative-text="否"
                positive-text="是"
                @positive-click="handlePositiveClick"
                v-if="formData.isScore == 0"
              >
                <template #trigger>
                  <div>
                    <n-rate
                      size="medium"
                      allow-half
                      v-model:value="formData.score"
                      style="margin-left: 5px; position: relative; top: 4px"
                      :count="5"
                    />
                    <span style="padding-left: 8px; font-weight: bolder"
                      >{{ formData.score }} 分
                    </span>
                  </div>
                </template>
                确认提交?
              </n-popconfirm>
              <div v-else>
                <n-rate
                  readonly
                  size="medium"
                  allow-half
                  v-model:value="formData.score"
                  style="margin-left: 5px; position: relative; top: 4px"
                  :count="5"
                />
                <span style="padding-left: 8px; font-weight: bolder"
                  >{{ formData.score }} 分
                </span>
              </div>
            </span>
          </p>
          <p class="second1">
            <span style="color: #888; font-size: 15px"
              >发布时间：<span style="color: #333">
                {{ formData.auditSuccessTime }}</span
              ></span
            >
            <span style="color: #888; font-size: 15px; margin-left: 70px"
              >课程时长：
              <span style="color: #333">{{ formData.lessonStudyTime }} </span></span
            >
          </p>

          <span class="desc" :title="formData.description">
            <span style="color: #888; font-size: 15px">课程简介:</span
            ><span style="margin-left: 10px">{{ formData.description }}</span>
          </span>
        </n-card>
        <span
          v-if="formData.examPaper"
          style="
            font-weight: bold;
            font-size: 18px;
            margin-top: 15px;
            display: inline-block;
            padding: 2px 0;
          "
          ><span style="font-weight: bolder; color: #1060c9">|</span> 练习试卷</span
        >
        <n-card v-if="formData.examPaper" style="width: 100%; background: #fff">
          <div style="display: inline-block">
            <p class="header">
              <span style="font-weight: bolder; font-size: 18px; color: #3f8fff">{{
                formData.examPaper.paperName
              }}</span>
            </p>
            <p class="foot">
              <span style="color: #888; font-size: 15px"
                >考试时间：<span style="color: #333"> 不限</span></span
              >
              <span style="color: #888; font-size: 15px; margin-left: 50px"
                >可考试次数： <span style="color: #333">不限 </span></span
              >
              <span style="color: #888; font-size: 15px; margin-left: 50px"
                >答题时长：
                <span style="color: #333"
                  >{{ formData.examPaper.specialExamTime }}
                </span></span
              >
            </p>
          </div>
          <div style="float: right; display: inline-block; line-height: 50px">
            <n-button
              ghost
              type="info"
              round
              @click="
                () => {
                  showExamination();
                }
              "
              >开始练习</n-button
            >
            <!-- v-if="formData.examedNum>0" -->
          </div>
        </n-card>
      </div>
      <div class="second">
        <n-card>
          <n-list>
            <template #header>
              <span style="font-size: 18px; font-weight: bolder">资料下载</span>
            </template>
            <n-list-item
              v-for="(item, index) in formData.marterialsList"
              :key="index"
              style="cursor: pointer"
            >
              <div style="display: flex">
                <p style="flex: 1">{{ ++index }}, {{ item.marterialsName }}</p>
                <p
                  style="width: 30px; text-align: center"
                  @click="clientTemplate(item)"
                  v-if="item.isDownload == 1"
                >
                  <nw-icon
                    name="icon-daochu"
                    :size="30"
                    style="cursor: pointer; color: #2080f0"
                  />
                </p>
              </div>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </div>

    <!-- <div class="comment">
        <span class="pinglun">评论  ({{commentSize}})</span>
        <div class="searchBox">
            
            <div class="ipt">
              <n-input placeholder="欢迎留言评论"  v-model:value="commentContent" type="textarea"/>
            </div>
            <div class="btn">
              <n-button  type="info" round @click="commentSubmit">提交</n-button>
            </div>
        </div>
        <div class="commentParent">
          <div v-for="item in comments" :key="item">
            <div class="commentItem" >
                <div class="pic">
                    <img src="../img/18.png" alt="">
                </div>
                <div class="content">
                    <p>
                        <span style="font-weight:bolder">{{item.userNameCh}}</span>
                    </p>
                    <div>
                      {{item.comment}}<br>
                       <span style="color:#9499A0;font-size:10px">{{item.createTime}}</span>
                       <span style="margin-left:10px;font-size:10px; cursor: pointer" @click="()=>{
                           isShowReplyId(item)
                    }">回复</span>
                   
                    </div>
                <div>
            </div>
            
            <CommentItem 
              :commentChild="item.kids?item.kids:[]" 
              :showMore="false" 
              @update:callback="(item) => {
                  isShowReplyId(item)
              }"
            ></CommentItem>
            <div class="reply" v-if="showReplyId == (item.parentFullId ? item.parentFullId  : item.id)"  >
                <n-input :placeholder="`回复@${replyNmae}`"  v-model:value="replayCommentContent" type="textarea"/>
                <n-button type="info" @click="replyCommentSubmit">提交</n-button>
            </div>
        </div>
    </div>
    </div> 
 </div>
 </div>-->
  </div>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import {
  h,
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { NwIcon } from '@platform/main'

import Video from "video.js";
import { useRoute, useRouter } from "vue-router";
import { Base64 } from "js-base64";
import CommentItem from "./commentItem.vue";
import {
  studyLessonScore,
  saveSpecialRecord,
  specialcourseDetail,
  saveCollection,
  getCommentsByLessonId,
  submitComments,
} from "../api";
import {
  NForm,
  NFormItem,
  NGrid,
  NGi,
  NButton,
  NInput,
  NRadioGroup,
  NRadioButton,
  NSpace,
  NPagination,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NCard,
  NSpin,
  NEmpty,
  NCarousel,
  NDivider,
  NList,
  NRate,
  useMessage,
  NInputGroup,
  NPopconfirm,
  NScrollbar,
} from "naive-ui";

import "video.js/dist/video-js.css";
import videojs from "video.js";
export default defineComponent({
  components: {
    NSpace,
    CommentItem,
    NRadioGroup,
    NRadioButton,
    NPagination,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NForm,
    NFormItem,
    NButton,
    NGrid,
    NGi,
    NCard,
    
    NwIcon,
    NSpin,
    NEmpty,
    NCarousel,
    NDivider,
    NList,
    NRate,
    NInput,
    NInputGroup,
    NPopconfirm,
    NScrollbar,
  },
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const formData = ref({});
    const videoKey = ref("");
    const fileUrl = ref("");
    const fileType = ref(2);
    const commentContent = ref("");
    const commentSize = ref(0);
    const message = useMessage();
    const comments = ref([]);
    const showReplyId = ref("");
    const replyNmae = ref("");
    const replayCommentContent = ref("");
    const parentId = ref("");

    const couId = ref("");
    const couName = ref("");
    const timer = ref(null);
    const lastVideoTime = ref(0);
    const videoPlayer = ref();
    const videoOptions = ref({
      playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
      autoplay: false,
      controls: true,
      loop: true,
      preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: "zh-CN",
      aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

      sources: [],
    });
    const player = ref(null);
    const isFinish = ref("");
    const getCommentsByLesson = () => {
      getCommentsByLessonId(formData.value.id).then((r) => {
        comments.value = r.commentList;
        commentSize.value = r.commentSize;
      });
    };
    const commentSubmit = () => {
      submitComments({
        lessonId: formData.value.id,
        lessonName: formData.value.lessonName,
        comment: commentContent.value,
        parentId: 0,
      }).then((r) => {
        commentContent.value = "";
        getCommentsByLesson();
        message.success("评论成功");
      });
    };
    const replyCommentSubmit = () => {
      submitComments({
        lessonId: formData.value.id,
        lessonName: formData.value.lessonName,
        comment: replayCommentContent.value,
        parentId: parentId.value,
      }).then((r) => {
        commentContent.value = "";
        getCommentsByLesson();
        message.success("评论成功");
      });
    };
    const handlePositiveClick = () => {
      studyLessonScore({
        lessonId: formData.value.id,
        lessonName: formData.value.lessonName,
        score: formData.value.score,
      }).then((r) => {
        formData.value.score = r;
        formData.value.isScore = 1;
        message.success("评价成功");
      });
    };
    // 练习
    const showExamination = () => {
      router.push({
        path: "/practiceTests",
        query: {
          paperId: formData.value.examPaper.id,
          specialExamTime: formData.value.specialExamTime,
        },
      });
    };
    // 任务是否完成
    const FinishBtn = (v) => {
      let control = document.querySelectorAll(".vjs-progress-control");

      if (v !== "100.00%") {
        // 判断条件：true 未完成 不能拖动
        control.forEach((item) => {
          item.classList.add("pointer");
        });
      } else {
        control.forEach((item) => {
          item.classList.remove("pointer");
        });
      }
    };
    window.onbeforeunload = function (e) {
      clearTimeout(timer.value);
      player.value.dispose();
    };
    // 暂停
    const onPlayerPause = () => {
      clearTimeout(timer.value);
    };
    //播放
    const onPlayerPlay = () => {
      playTimer();
    };
    // 下载
    const clientTemplate = (item) => {
      var filename = `${item.marterialsName}.xls`;

      const token = Cookies.get("token");
      const tokenType = Cookies.get("tokenType");
      fetch(`${window.apiBaseURL}/main/aliyunFile/${item.fileId}`, {
        method: "get",
        headers: new Headers({
          Authorization: `${tokenType} ${token}`,
        }),
        responseType: "blob",
      })
        .then((response) => response.arrayBuffer())
        .then((res) => {
          var a = document.createElement("a");
          a.style.display = "none";
          var url = URL.createObjectURL(
            new Blob([res], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            })
          );
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // 释放掉blob对象
          document.body.removeChild(a); // 下载完成移除元素
          setTimeout(() => {
            message.success("下载成功");
          }, 1000);
        });
    };
    const playTimer = () => {
      timer.value = setInterval(() => {
        var videoTime = fileType.value !== 3 ? player.value.currentTime() : null;
        saveSpecialRecord({
          lessonId: formData.value.id,
          lessonName: formData.value.lessonName,
          specialId: formData.value.specialId,
          specialName: formData.value.specialName,
          couId: couId.value,
          couName: couName.value,
          lastVideoTime: videoTime ? parseInt(videoTime) : 0,
        }).then((r) => {
          formData.value.couList.map((d) => {
            if (d.id == couId.value) {
              d.finishSize = r.finishSize;
              d.lastVideoTime = r.lastVideoTime ? r.lastVideoTime : 0;
              FinishBtn(r.finishSize);
            }
          });
        });
      }, 5000);
    };
    onMounted(() => {
      specialcourseDetail({
        specialId: route.query.specialId,
        lessonId: route.query.lessonId,
      }).then((r) => {
        nextTick().then(() => {
          if (route.query.couId) {
            const obj = r.couList.filter((d) => d.id == route.query.couId)[0];
            if (obj.couType == 3) {
              var url = obj.fileUrl; //要预览文件的访问地址
              fileUrl.value = `${Setting.fileServerUrl}?url=${encodeURIComponent(
                Base64.encode(url)
              )}`;
              fileType.value = obj.couType;
              videoKey.value = obj.id;
              couId.value = obj.id;
              couName.value = obj.couName;
              formData.value = { ...route.query, ...r };
              playTimer();
            } else {
              fileUrl.value = obj.fileUrl; //要预览文件的访问地址
              fileType.value = obj.couType;
              formData.value = { ...route.query, ...r };

              videoKey.value = obj.id;
              couId.value = obj.id;
              couName.value = obj.couName;
              lastVideoTime.value = obj.lastVideoTime ? obj.lastVideoTime : 0;
            }
          } else {
            if (r.couList[0] && r.couList[0].couType == 3) {
              var url = r.couList[0].fileUrl; //要预览文件的访问地址
              fileUrl.value = `${Setting.fileServerUrl}?url=${encodeURIComponent(
                Base64.encode(url)
              )}`;
              fileType.value = r.couList[0].couType;
              videoKey.value = r.couList[0].id;
              couId.value = r.couList[0].id;
              couName.value = r.couList[0].couName;
              formData.value = { ...route.query, ...r };
              playTimer();
            } else if (r.couList[0] && r.couList[0].couType !== 3) {
              fileUrl.value = r.couList[0].fileUrl; //要预览文件的访问地址
              fileType.value = r.couList[0].couType;
              formData.value = { ...route.query, ...r };

              videoKey.value = r.couList[0].id;
              couId.value = r.couList[0].id;
              couName.value = r.couList[0].couName;
              lastVideoTime.value = r.couList[0].lastVideoTime
                ? r.couList[0].lastVideoTime
                : 0;
            }
          }
          // 评论注释
          // getCommentsByLesson()
        });
        //
      });
    });
    watch(
      () => fileUrl.value,
      () => {
        if (fileType.value !== 3) {
          player.value = videojs(videoPlayer.value, videoOptions.value, () => {
            console.log("开始----onPlayerReady");
          });
          player.value.src({ src: fileUrl.value, type: "video/mp4" });
          player.value.currentTime(lastVideoTime.value);
          //  player.value.play()
        }
      },
      { deep: true }
    );
    onBeforeUnmount(() => {
      clearInterval(timer.value);
      timer.value = null;
      if (player.value) {
        player.value.dispose();
      }
    });
    return {
      videoMenuClick(item) {
        if (couId.value !== item.id) {
          var videoTime = fileType.value !== 3 ? player.value.currentTime() : null;

          fileUrl.value =
            item.couType == 3
              ? `${Setting.fileServerUrl}?url=${encodeURIComponent(
                  Base64.encode(item.fileUrl)
                )}`
              : item.fileUrl;
          fileType.value = item.couType;
          couId.value = item.id;
          couName.value = item.couName;
          videoKey.value = item.id;
          lastVideoTime.value = item.lastVideoTime ? item.lastVideoTime : 0;
          player.value = null;
          clearTimeout(timer.value);
          if (item.couType == 3) {
            playTimer();
          }
        }
      },
      isShowReplyId(item) {
        showReplyId.value = item.parentFullId ? item.parentFullId : item.id;
        replyNmae.value = item.userNameCh;
        parentId.value = item.id;
      },
      isCollection() {
        saveCollection({
          collectionType: 0,
          collectionId: formData.value.id,
        }).then((r) => {
          formData.value.isCollect = formData.value.isCollect == 0 ? 1 : 0;
          message.success("操作成功");
        });
      },
      videoOptions,
      lastVideoTime,
      handlePositiveClick,
      player,
      videoPlayer,
      couId, //课件id
      couName, //课件name
      timer,
      replyNmae,
      parentId,
      replayCommentContent,
      replyCommentSubmit,
      commentSubmit,
      commentContent,
      commentSize,
      comments,
      router,
      fileUrl,
      fileType,
      route,
      formData,
      videoKey,
      showReplyId,
      getCommentsByLesson,
      clientTemplate,
      showExamination,
      isFinish,
      onPlayerPause,
      onPlayerPlay,
      playTimer,
      FinishBtn,
      num: ref([
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
        "十三",
        "十四",
        "十五",
        "十六",
        "十七",
        "十八",
        "十九",
        "二十",
      ]),
    };
  },
  created() {
    setTimeout(() => {
      this.FinishBtn();
    }, 1000);
  },
});
</script>
<style lang="less" scoped>
/deep/ .pointer {
  pointer-events: none !important;
}
.videoBorder {
  min-height: calc(~"100vh - 80px");
  background: #efefef;
  .courseBorder {
    min-height: 500px;
    height: 887px;
    background: #2c3543;
    border-bottom: 1px solid #dedede;
  }
  .specialcourseDetail {
    width: 80%;
    margin: auto;
    padding: 30px 10px;
    min-height: 440px;
    height: 827px;
    display: flex;
    .video {
      width: 80%;
      height: 100%;
      .grade {
        height: 77px;
        width: 100%;
        line-height: 42px;
        background: #23282f;
        box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
        padding: 0 10px;
        color: white;
      }
    }
    .videoMenu {
      flex: 1;
      height: 100%;
      color: white;
      background: black;
      text-align: center;
      .textOverflow {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: normal;
        word-break: normal;
        overflow: hidden;
      }
      // width: 90%;
      // margin: auto;
      .title {
        height: 23px;
        padding: 0 10px;
        line-height: 30px;
        span {
          display: inline-block;
          width: 50%;
        }
      }
      .videoMenuDetail {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        height: 100px;
        font-size: 16px;
        width: 100%;
        .videoName {
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: normal;
          text-indent: 0;
          display: inline-block;
          width: 100%;
          height: 30px;
          overflow: hidden;
        }
        .tagboard {
          width: 40px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
          border-radius: 307px;
          background: #fff;
          color: black;
        }
      }
      .videoMenuDetail:hover {
        background: rgba(255, 255, 255, 0.1);
        height: 100px;
        font-size: 16px;
        width: 100%;
        color: #1890ff;
        .videoName {
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: normal;
          text-indent: 0;
          display: inline-block;
          width: 100%;
          height: 30px;
          overflow: hidden;
        }
        .tagboard {
          width: 40px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
          text-align: center;
          border-radius: 307px;
          background: #fff;
          color: black;
        }
      }
      .videoMenuCss {
        background: rgba(255, 255, 255, 0.1);
        height: 100px;
        font-size: 16px;
        width: 100%;
        border: 1px solid #1890ff;
        color: #1890ff;
        .videoName {
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: normal;
          text-indent: 0;
          display: inline-block;
          width: 100%;
          height: 30px;
          overflow: hidden;
        }
        .tagboard {
          width: 40px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
          text-align: center;
          border-radius: 307px;
          background: #fff;
          color: black;
        }
      }
    }
  }
  .courseMessage {
    width: 80%;
    margin: auto;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    .first {
      flex: 1;
      margin-right: 20px;

      .header {
        height: 30px;
        line-height: 30px;
        width: 100%;
        span {
          display: inline-block;
          font-weight: 500;
        }
      }
      .foot {
        height: 30px;
        line-height: 30px;
        div {
          display: inline-block;
        }
      }
      .desc {
        width: 100%;
        overflow: hidden;
        color: #333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .second {
      width: 300px;
      background: #fff;
    }
  }

  // /deep/ .video-js .vjs-big-play-button {
  //     top: 363px;
  //     left: 45%;
  // }
  /deep/.video-js .vjs-big-play-button {
    font-size: 2.5em;

    line-height: 2.3em;

    height: 2.5em;

    width: 2.5em;

    -webkit-border-radius: 2.5em;

    -moz-border-radius: 2.5em;

    border-radius: 2.5em;

    background-color: #73859f;

    background-color: rgba(115, 133, 159, 0.5);

    border-width: 0.15em;

    margin-top: -1.25em;

    margin-left: -1.75em;
  }
  .comment {
    width: 80%;
    margin: auto;
    background: #fff;
    .pinglun {
      display: block;
      padding-left: 20px;
      padding-top: 10px;
      font-size: 19px;
      font-weight: bolder;
    }
    .searchBox {
      padding: 10px 20px 20px 20px;
      display: flex;
      .ipt {
        flex: 1;
      }
      .btn {
        /deep/ .n-button {
          height: 100%;
          width: 100%;
        }
        margin-left: 20px;
        width: 80px;
      }
    }
    .commentParent {
      padding: 10px 10px;
      > div {
        border-bottom: 1px solid #e7e7e7;
      }
      .reply {
        padding: 5px 0;
        /deep/ .n-button {
          float: right;
          margin: 10px;
        }
      }

      .commentItem {
        display: flex;
        margin-top: 5px;
        .pic {
          margin-right: 10px;
          img {
            width: 35px;
            height: 35px;
            border-radius: 15px;
          }
        }
        .content {
          flex: 1;
          p {
            font-size: 13px;
            color: #555;
            display: flex;
            justify-content: space-between;
          }
          div {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
