<template>
  <div class="pie-wrap">
    <h1 class="title">瀏覽器市場佔有率</h1>

    <div class="toolbar">
      <button class="btn primary" @click="randomize">更新數據</button>
      <button class="btn ghost" @click="toggleLabels">
        {{ showLabels ? '隱藏標籤' : '顯示標籤' }}
      </button>
    </div>

    <h2 class="sub-title">瀏覽器市場佔有率</h2>
    <!-- ECharts mount point via ref (no DOM query needed) -->
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

/* Lock category order and color mapping */
const NAMES  = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Others']
const COLORS = ['#4f63ee', '#9bd126', '#3f4358', '#f68f3d', '#07aee0']

export default {
  name: 'PieChart',
  props: {
    data: {
      type: Array,
      default: () => [
        { value: 1048, name: 'Chrome' },
        { value: 735,  name: 'Firefox' },
        { value: 660,  name: 'Safari' },
        { value: 520,  name: 'Edge' },
        { value: 340,  name: 'Others' }
      ]
    }
  },
  data () {
    return { chart: null, showLabels: true, seriesData: [] }
  },
  mounted () {
    /* Normalize first → init chart → bind resize */
    this.seriesData = this.normalizeIncoming(this.data)
    this.initChart()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    /* Cleanup to prevent leaks */
    window.removeEventListener('resize', this.handleResize)
    if (this.chart) this.chart.dispose()
  },
  methods: {
    /* Stable ordering + fixed colors; missing categories default to 0 */
    normalizeIncoming (arr) {
      const map = new Map(arr.map(d => [d.name, d.value]))
      return NAMES.map((n, i) => ({ name: n, value: map.get(n) || 0, itemStyle: { color: COLORS[i] } }))
    },
    handleResize () { if (this.chart) this.chart.resize() },
    /* Create instance from ref, then apply full option */
    initChart () {
      this.chart = echarts.init(this.$refs.chart)
      this.applyOption()
    },
    applyOption () {
      /* notMerge=true: overwrite to keep state predictable */
      this.chart.setOption({
        color: COLORS,
        tooltip: {
          trigger: 'item',
          /* Custom content: localized number + percentage; hide default marker for cleaner look */
          formatter: (p) => {
            const name = p.name
            const val = typeof p.value === 'number' ? p.value.toLocaleString() : p.value
            const pct = (Number(p.percent) || 0).toFixed(2)
            return `瀏覽器 <br/>${name}: ${val} (${pct}%)`;
          }
        },
        legend: {
          show: true,
          left: 24,
          top: 'middle',
          orient: 'vertical',
          icon: 'roundRect',
          itemWidth: 20,
          itemHeight: 12,
          itemGap: 12,
          textStyle: { color: '#0f172a', fontSize: 14 },
          selectedMode: true
        },
        series: [{
          name: '瀏覽器',
          type: 'pie',
          radius: ['52%', '78%'],   /* Donut sizing for readability */
          center: ['62%', '56%'],   /* Shift right to leave room for left legend */
          minAngle: 6,              /* Avoid unclickable tiny slices */
          padAngle: 3,              /* Visual separation between slices */
          avoidLabelOverlap: true,
          label: {
            show: this.showLabels,
            formatter: '{b}',
            color: '#111827',
            fontSize: 14
          },
          labelLine: {
            show: this.showLabels,
            length: 24,
            length2: 22,
            lineStyle: { width: 2, color: '#99a2b3' }
          },
          itemStyle: {
            borderWidth: 0,
            borderRadius: 12,       /* Rounded slice edges */
            shadowBlur: 18,
            shadowOffsetY: 8,
            shadowColor: 'rgba(0,0,0,.12)'
          },
          data: this.seriesData,
          animationDuration: 600,
          animationEasing: 'cubicOut',
          animationDurationUpdate: 500,
          animationEasingUpdate: 'cubicInOut'
        }]
      }, true)
    },
    /* Partial update: toggle only label visibility */
    toggleLabels () {
      this.showLabels = !this.showLabels
      this.chart.setOption({ series: [{ label: { show: this.showLabels }, labelLine: { show: this.showLabels } }] })
    },
    /* Weighted random → normalize to base → update data only */
    randomize () {
      const weights = NAMES.map(() => Math.random() + 0.2)
      const sum = weights.reduce((a, b) => a + b, 0)
      const base = 3500
      const values = weights.map(w => Math.round((w / sum) * base))
      this.seriesData = NAMES.map((n, i) => ({ name: n, value: values[i], itemStyle: { color: COLORS[i] } }))
      this.chart.setOption({ series: [{ data: this.seriesData }] })
    }
  }
}
</script>

<style scoped>
.pie-wrap{ padding:4px 4px 8px; }
.title{
  margin:0 0 16px; text-align:center; font-size:28px; color:#0f172a; font-weight:800; letter-spacing:.5px;
}
.toolbar{ display:flex; gap:12px; justify-content:center; margin-bottom:16px; }
.btn{ min-width:120px; height:42px; padding:0 16px; font-size:16px; font-weight:700; border-radius:12px; border:1px solid transparent; cursor:pointer; transition:transform .08s ease, box-shadow .18s ease, background .18s ease; }
.btn:active{ transform:translateY(1px); }
.btn.primary{ background:#5360f0; color:#fff; box-shadow:0 10px 20px rgba(83,96,240,.25); }
.btn.primary:hover{ box-shadow:0 12px 26px rgba(83,96,240,.32); }
.btn.ghost{ background:#5f6771; color:#fff; box-shadow:0 10px 20px rgba(0,0,0,.12); }
.btn.ghost:hover{ box-shadow:0 12px 26px rgba(0,0,0,.18); }

.sub-title{ margin:8px 0 10px; text-align:center; font-size:20px; color:#0f172a; font-weight:800; }

/* Ensure enough vertical space for legend + labels */
.chart{ width:100%; height:620px; }

@media (max-width: 900px){
  .chart{ height:560px; }
}
</style>
