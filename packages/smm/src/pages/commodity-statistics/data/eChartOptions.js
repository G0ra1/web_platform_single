import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
const option = ref({
    // title: {
    //     text: '大宗商品价格统计',
    //     left: '1%'
    // },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
    },
    xAxis: {
        data: ['2022-10-10', '2022-10-11', '2022-10-12', '2022-10-13',]
    },

    yAxis: {},
    toolbox: {
        right: 10,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: [
        {
            startValue: '2014-06-01'
        },
        {
            type: 'inside'
        }
    ],
    visualMap: {
        top: 50,
        right: 10,
        pieces: [
            {
                gt: 0,
                lte: 50,
                color: '#93CE07'
            },
            {
                gt: 50,
                lte: 100,
                color: '#FBDB0F'
            },
            {
                gt: 100,
                lte: 150,
                color: '#FC7D02'
            },
            {
                gt: 150,
                lte: 200,
                color: '#FD0100'
            },
            {
                gt: 200,
                lte: 300,
                color: '#AA069F'
            },
            {
                gt: 300,
                color: '#AC3B2A'
            }
        ],
        outOfRange: {
            color: '#999'
        }
    },
    series: {
        name: '大宗商品 铜',
        type: 'line',
        data: [],
        markLine: {
            silent: true,
            lineStyle: {
                color: '#333'
            },
            data: [
                {
                    yAxis: 5000
                },
                {
                    yAxis: 8000
                },
                {
                    yAxis: 3000
                }
            ]
        }
    }
})
export default option