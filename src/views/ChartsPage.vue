<template>
  <div class="charts-page">
  <h1 class="custom-heading">圓餅圖</h1>
  <hr class="blue-line">
  <div class="section">
    <div class="card">
      <pie-chart />
    </div>
    </div>
    <div class="charts-page">
   <h1 class="custom-heading">分佈圖</h1>
   <hr class="blue-line">
   <div class="section">
    <div class="card">
      <h2 class="sub-title">分佈區域</h2>
      <stacked-bar />
    </div>
    </div>
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
.custom-heading {
  font-size: 28px;     /* your new size */
  color: #2563eb;      /* blue */
  margin: 0;           /* optional: reset margins */
}

.blue-line {
  border: none;
  height: 2px;
  background-color: #2563eb;
  margin: 8px 0;
}
.charts-page{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}
.section{ max-width:1064px; margin-top:30px ; padding:32px 16px; background:#fff; border-radius: 15px;box-shadow:
    0 0 0 1px rgba(15,23,42,.08),
    0 8px 24px rgba(15,23,42,.25); }

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
  text-align: center;
}
</style>
