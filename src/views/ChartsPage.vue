<template>
  <div class="charts-page">
    <div class="card">
      <pie-chart />
    </div>

    <div class="card">
      <h2 class="sub-title">堆疊圖</h2>
      <stacked-bar />
    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.vue'
import StackedBar from '../components/StackedBar.vue'

export default {
  name: 'ChartsPage',
  components: { PieChart, StackedBar }
}
</script>

<style scoped>
.charts-page{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}
.card{
  background:#fff;
  border-radius:16px;
  box-shadow:0 10px 28px rgba(15,23,42,.08);
  border:1px solid rgba(15,23,42,.06);
  padding:24px;
  margin-bottom:28px;
}
.sub-title{
  margin: 0 0 12px;
  font-size: 20px;
  color:#0f172a;
  font-weight: 700;
}
</style>
