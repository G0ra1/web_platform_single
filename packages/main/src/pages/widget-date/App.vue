<template>
    <div class="clock" style="font-size: 25px;">
        <div>{{date}}</div>
        <div>{{time}}</div>
    </div>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, inject } from 'vue'
import {
    timeFormat as d3TimeFormat
} from 'd3'
const timeFormat = d3TimeFormat('%Y-%m-%d %H:%M:%S')
import { format } from "date-fns";
export default defineComponent({
    components: {
    },
    setup() {
        const date = ref('')
        const time = ref('')
        const clock = () => {

            const [
                dateStr,
                timeStr
            ] = timeFormat(new Date()).split(' ')
            date.value = dateStr
            time.value = timeStr
            setTimeout(() => {
                clock()
            }, 1000);
        }
        clock()
        return {
            date,
            time
        }
    }
})

</script>

<style scoped>

.clock {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 25px;
}
</style>
