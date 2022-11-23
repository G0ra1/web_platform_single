<template>
    <div class="commentItems">
       <div class="commentItem"   v-for="(item,index) in (props.commentChild)" :key="item">
            <div class="pic">
                <img src="../img/18.png" alt="">
                 <p>
                    <span style="font-weight:bolder">{{item.userNameCh}}</span>
                </p>
            </div>
            <div class="content">
               
                    <div v-if="item.level == 2">
                        {{item.comment}}
                    </div>
                    <div v-else>
                        回复 <span style="color:#478ef0">{{item.parentName}}</span> : {{item.comment}}
                    </div>
                    <span style="color:#9499A0;font-size:10px">{{item.createTime}}</span>
                    <span style="margin-left:10px;font-size:10px; cursor: pointer;" @click="()=>{
                        //showMore = true
                        callback(item)
                        
                    }">回复</span> <br>
                    <span style="font-size:10px;color:#9499A0; cursor: pointer;" v-if="item.kids && item.level == 2 && item.kids.length>0"  @click="()=>{
                        showMore = !showMore 
                    }">{{!showMore ? '更多' : '折叠'}}</span>
                     <!-- <span style="font-size:10px;color:#9499A0; cursor: pointer;" v-if="!item.kids" @click="()=>{
                        showMore = false 
                    }">折叠</span> -->
                   
            </div> 
            
            <commentchild-item v-if="showMore" :showMore="showMore" :commentChild="item.kids?item.kids:[]"></commentchild-item>           
                        

        </div>
    </div>
</template>
<script >
import { h,defineComponent, ref, reactive, getCurrentInstance,onMounted,watch, nextTick  } from "vue";
import {
  NCollapse,
  NCollapseItem

} from  'naive-ui'
export default defineComponent({
     props:["commentChild","showMore"],
     components:{
        NCollapse,
        NCollapseItem
     },
     name:'commentchildItem',
     setup(props,context) {
         const showMore = ref(false)
         showMore.value =  props.showMore
         return {
             props,
             showMore,
             callback(item){
                context.emit('update:callback',item);
             },
         }
     }
})
</script>
<style lang="less" scoped>
  .commentItems {
    .commentItem{
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            .pic{
                display: flex;
                margin-right: 10px;
                img{
                    margin: 0 5px 10px 0;
                        width: 35px;
                        height: 35px;
                        border-radius: 15px;
                    }
                 p{
                    font-size: 13px;
                    color: #555;
                    display: flex;
                    justify-content: space-between;
                }
            
            }
            .content{
                flex: 1;
               
                div{
                    font-size: 13px;
                }
            }
        }
  }
</style>