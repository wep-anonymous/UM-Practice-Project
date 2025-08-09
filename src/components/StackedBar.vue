<template>
  <div ref="chart" style="width: 100%; height: 150px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'StackedBar',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const option = {
        grid: { height: 30 },
        xAxis: { type: 'value', show: false },
        yAxis: { type: 'category', show: false },
        series: [
          {
            name: '北部',
            type: 'bar',
            stack: 'total',
            itemStyle: { color: '#4CAF50', borderRadius: [10, 0, 0, 10] },
            data: [25]
          },
          {
            name: '中部',
            type: 'bar',
            stack: 'total',
            itemStyle: { color: '#2196F3' },
            data: [25]
          },
          {
            name: '南部',
            type: 'bar',
            stack: 'total',
            itemStyle: { color: '#FF9800' },
            data: [25]
          },
          {
            name: '西部',
            type: 'bar',
            stack: 'total',
            itemStyle: { color: '#f44336', borderRadius: [0, 10, 10, 0] },
            data: [25]
          }
        ]
      };
      chart.setOption(option);
    }
  }
}
</script>