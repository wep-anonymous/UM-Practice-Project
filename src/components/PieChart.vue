<template>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'PieChart',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const option = {
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 3
          },
          data: [
            { value: 1048, name: 'Chrome' },
            { value: 735, name: 'Firefox' },
            { value: 580, name: 'Safari' },
            { value: 484, name: 'Edge' },
            { value: 300, name: 'Others' }
          ]
        }]
      };
      chart.setOption(option);
    }
  }
}
</script>