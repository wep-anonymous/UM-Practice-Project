<template>
  <div ref="chart" class="bar"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'StackedBar',
  mounted () {
    const chart = echarts.init(this.$refs.chart)
    const option = {
      grid: { left: 0, right: 0, top: 10, bottom: 0, height: 36 },
      xAxis: { type: 'value', show: false },
      yAxis: { type: 'category', show: false },
      series: [
        { name: '北部', type: 'bar', stack: 't', itemStyle: { color: '#16a34a', borderRadius: [10, 0, 0, 10] }, data: [25] },
        { name: '中部', type: 'bar', stack: 't', itemStyle: { color: '#2563eb' }, data: [25] },
        { name: '南部', type: 'bar', stack: 't', itemStyle: { color: '#f59e0b' }, data: [25] },
        { name: '西部', type: 'bar', stack: 't', itemStyle: { color: '#ef4444', borderRadius: [0, 10, 10, 0] }, data: [25] }
      ]
    }
    chart.setOption(option)
    window.addEventListener('resize', () => chart.resize())
  }
}
</script>

<style scoped>
.bar{ width:100%; height:150px; }
</style>
