<template>
  <div class="stacked-wrap">
    <!-- bar -->
    <div ref="chart" class="bar"></div>

    <!-- custom legend -->
    <ul class="legend">
      <li
        v-for="(seg, idx) in segments"
        :key="seg.name"
        class="legend__item"
        :class="{ 'is-hover': hoverIndex === idx }"
        @mouseenter="onEnter(idx)"
        @mouseleave="onLeave"
        @focus="onEnter(idx)"
        @blur="onLeave"
      >
        <span class="legend__left">
          <span class="dot" :style="{ backgroundColor: seg.color }"></span>
          <span class="label">{{ seg.name }}</span>
        </span>
        <span class="percent">{{ seg.value }}%</span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'StackedBar',
  data () {
    return {
      chart: null,
      hoverIndex: -1,
      // values & colors match the UI: 15 / 25 / 35 / 25
      segments: [
        { name: '北部', color: '#16a34a', value: 15, borderRadius: [10, 0, 0, 10] },
        { name: '中部', color: '#2563eb', value: 25 },
        { name: '南部', color: '#f59e0b', value: 35 },
        { name: '西部', color: '#ef4444', value: 25, borderRadius: [0, 10, 10, 0] }
      ]
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.render()

    // sync legend highlight when hovering the bar
    this.chart.on('mouseover', (p) => {
      if (p.componentType === 'series') this.hoverIndex = p.seriesIndex
    })
    this.chart.on('mouseout', () => { this.hoverIndex = -1 })

    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
    if (this.chart) this.chart.dispose()
  },
  methods: {
    render () {
      const option = {
        animation: true,
        grid: { left: 24, right: 24, top: 10, bottom: 0, height: 36 },
        xAxis: { type: 'value', max: 100, show: false },
        yAxis: { type: 'category', data: [''], show: false },
        tooltip: {
          trigger: 'item',
          appendToBody: true,
          backgroundColor: '#111827',
          borderColor: 'transparent',
          textStyle: { color: '#fff', fontSize: 14, fontWeight: 600 },
          extraCssText: 'padding:8px 12px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,.2);',
          formatter: (params) => {
            // includes colored dot, series name, and percentage value
            return `${params.marker} ${params.seriesName}：${params.value}%`
          }
        },
        series: this.segments.map((seg, idx) => ({
          name: seg.name,
          type: 'bar',
          stack: 'total',
          barWidth: 16,
          data: [seg.value],
          itemStyle: { color: seg.color, borderRadius: seg.borderRadius || 0 },
          emphasis: { itemStyle: { opacity: 1 } },
          blur: { itemStyle: { opacity: 0.35 } },
          z: 10 - idx
        }))
      }
      this.chart.setOption(option)
    },
    onEnter (idx) {
      this.hoverIndex = idx
      // highlight the corresponding segment in the bar
      this.chart.dispatchAction({ type: 'highlight', seriesIndex: idx, dataIndex: 0 })
      this.segments.forEach((_, i) => {
        if (i !== idx) this.chart.dispatchAction({ type: 'downplay', seriesIndex: i, dataIndex: 0 })
      })
    },
    onLeave () {
      this.hoverIndex = -1
      // reset highlights
      this.segments.forEach((_, i) => {
        this.chart.dispatchAction({ type: 'downplay', seriesIndex: i, dataIndex: 0 })
      })
    },
    onResize () { if (this.chart) this.chart.resize() }
  }
}
</script>

<style scoped>
.stacked-wrap{ padding: 6px 8px 0; }
.bar{ width: 100%; height: 72px; }

/* legend styles */
.legend{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 14px 8px 6px;
  padding: 0;
  list-style: none;
}
.legend__item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 14px;
  transition: all .15s ease;
}
.legend__item.is-hover,
.legend__item:hover{
  background: #e2e8f0;
  box-shadow: 0 6px 16px rgba(15,23,42,.08);
}
.legend__left{ display: flex; align-items: center; gap: 8px; color:#1f2937; font-weight: 700; }
.dot{ width: 12px; height: 12px; border-radius: 9999px; display: inline-block; }
.percent{ font-weight: 800; color:#334155; }
</style>
