<template>
  <div class="charts-page">
    <h1>ECharts 圖表展示</h1>
    
    <div class="chart-section">
      <h2>圓餅圖</h2>
      <pie-chart :data="pieData" />
    </div>
    
    <div class="chart-section">
      <h2>堆疊圖</h2>
      <stacked-bar :data="stackedData" />
    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.vue';
import StackedBar from '../components/StackedBar.vue';

export default {
  name: 'ChartsPage',
  components: { PieChart, StackedBar }
}
</script>