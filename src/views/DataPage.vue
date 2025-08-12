<template>
  <!-- Page layout: header, toolbar, metrics, and two views (table / timeline). -->
  <div class="data-page">
    <header class="page-header">
      <h1 class="title">資料瀏覽</h1>
      <p class="subtitle">支援搜尋、群組過濾、時間排序與表格 / 時間軸切換。</p>
    </header>

    <!-- Toolbar: controls for view switch, text search, group filter, and time order. -->
    <section class="card">
      <div class="toolbar">
        <!-- View switch: buttons act like tabs; aria makes state clear to screen readers. -->
        <div class="view-toggle" role="tablist" aria-label="視圖切換">
          <button
            role="tab"
            :aria-selected="viewMode === 'table'"
            class="seg"
            :class="{ active: viewMode === 'table' }"
            @click="viewMode = 'table'">表格</button>
          <button
            role="tab"
            :aria-selected="viewMode === 'timeline'"
            class="seg"
            :class="{ active: viewMode === 'timeline' }"
            @click="viewMode = 'timeline'">時間軸</button>
        </div>

        <!-- Search: two-way binding (trimmed). Filters by message text. -->
        <label class="search">
          <span class="sr-only">搜尋訊息</span>
          <input
            v-model.trim="q"
            type="search"
            placeholder="搜尋訊息內容…（例如：休息）"
            aria-label="搜尋訊息"
          />
        </label>

        <!-- Group filter: chip buttons; selected state stored in a Set for fast checks. -->
        <div class="group-filter" aria-label="群組過濾">
          <button
            v-for="g in groups"
            :key="g"
            type="button"
            class="chip"
            :class="{ selected: selectedGroups.has(g) }"
            :style="{ '--chip': groupColor(g) }"
            @click="toggleGroup(g)"
            :aria-pressed="selectedGroups.has(g)">
            <span class="dot" :style="{ background: groupColor(g) }"></span>
            群組 {{ g }}
          </button>
          <!-- Reset all filters to defaults. -->
          <button class="chip ghost" type="button" @click="resetFilters">重設</button>
        </div>

        <!-- Time sort: ascending or descending. -->
        <label class="sorter">
          <span>時間排序</span>
          <select v-model="timeOrder" aria-label="時間排序">
            <option value="asc">由早到晚（升冪）</option>
            <option value="desc">由晚到早（降冪）</option>
          </select>
        </label>
      </div>

      <!-- Metrics: quick summary based on current filters. -->
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">總筆數</div>
          <div class="metric-value">{{ filtered.length }}</div>
        </div>
        <div class="metric">
          <div class="metric-label">群組數</div>
          <div class="metric-value">{{ groups.length }}</div>
        </div>
        <div class="metric">
          <div class="metric-label">時間範圍</div>
          <div class="metric-value">{{ timeRange }}</div>
        </div>
      </div>
    </section>

    <!-- Table view: uses the same filtered data. -->
    <section class="card" v-if="viewMode === 'table'">
      <!-- Empty state: clear feedback when no results. -->
      <div v-if="filtered.length === 0" class="empty">
        沒有符合條件的資料。
      </div>
      <div v-else class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>時間</th>
              <th>群組</th>
              <th>訊息</th>
            </tr>
          </thead>
          <tbody>
            <!-- Stable key from custom id (not index) for reliable updates. -->
            <tr v-for="row in filtered" :key="row.id">
              <td class="mono">{{ row.time }}</td>
              <td>
                <!-- Color comes from groupColor; passed through a CSS variable. -->
                <span class="tag" :style="{ '--tag': groupColor(row.group_id) }">
                  <span class="dot" :style="{ background: groupColor(row.group_id) }"></span>
                  群組 {{ row.group_id }}
                </span>
              </td>
              <td>{{ row.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Timeline view: groups items by time for easier reading across groups. -->
    <section class="card" v-else>
      <div v-if="groupedByTime.length === 0" class="empty">
        沒有符合條件的資料。
      </div>

      <div v-else class="timeline">
        <div v-for="slot in groupedByTime" :key="slot.time" class="tl-slot">
          <div class="tl-time">{{ slot.time }}</div>
          <div class="tl-pipe"></div>
          <div class="tl-items">
            <!-- Inside the same time slot, sort by group id for a stable order. -->
            <div
              v-for="item in slot.items"
              :key="item.id"
              class="tl-item"
              :style="{ borderColor: groupColor(item.group_id) }"
              :title="`群組 ${item.group_id}`"
            >
              <div class="tl-header">
                <span class="dot" :style="{ background: groupColor(item.group_id) }"></span>
                <span class="tl-group">群組 {{ item.group_id }}</span>
              </div>
              <div class="tl-msg">{{ item.message }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Actions: work with the filtered result (what the user currently sees). -->
    <section class="card actions">
      <button class="btn" type="button" @click="copyJSON">複製目前結果 JSON</button>
      <button class="btn ghost" type="button" @click="exportCSV">匯出 CSV</button>
      <span class="hint">* 僅匯出目前的篩選 / 排序結果。</span>
    </section>
  </div>
</template>

<script>
/**
 * Convert "HH:mm" to minutes since midnight for correct time comparisons.
 * Returns -1 if input is invalid.
 */
function timeToMinutes (t) {
  const [h, m] = (t || '').split(':').map(n => parseInt(n, 10))
  return (isFinite(h) && isFinite(m)) ? h * 60 + m : -1
}

export default {
  name: 'DataPage',
  data () {
    // Demo data (can be replaced by API later).
    const raw = [
      {"time":"09:10","group_id":1,"message":"你好"},
      {"time":"09:10","group_id":2,"message":"出門"},
      {"time":"09:15","group_id":2,"message":"打球"},
      {"time":"09:20","group_id":2,"message":"買中餐"},
      {"time":"09:15","group_id":1,"message":"下午茶"},
      {"time":"09:25","group_id":2,"message":"休息"},
      {"time":"09:20","group_id":1,"message":"休息"}
    ]
    // Normalize: add a stable id and precompute timeValue for faster sorting.
    const normalized = raw.map((r, i) => ({
      ...r,
      id: `${r.time}-${r.group_id}-${i}`,
      timeValue: timeToMinutes(r.time)
    }))
    return {
      rows: normalized,                       // main data source
      q: '',                                  // search text
      timeOrder: 'asc',                       // 'asc' or 'desc'
      viewMode: 'table',                      // 'table' or 'timeline'
      selectedGroups: new Set(normalized.map(r => r.group_id)) // default: all groups selected
    }
  },
  computed: {
    // Unique, sorted group ids derived from rows.
    groups () {
      const ids = Array.from(new Set(this.rows.map(r => r.group_id)))
      ids.sort((a, b) => a - b)
      return ids
    },
    // Main pipeline: text filter → group filter → time sort.
    filtered () {
      const q = this.q.toLowerCase()
      const byText = (row) => q === '' || (row.message || '').toLowerCase().includes(q)
      const byGroup = (row) => this.selectedGroups.has(row.group_id)
      const arr = this.rows.filter(r => byText(r) && byGroup(r))
      arr.sort((a, b) => {
        const comp = a.timeValue - b.timeValue
        return this.timeOrder === 'asc' ? comp : -comp
      })
      return arr
    },
    // Build timeline slots: group items by the same time string, then sort slots by time.
    groupedByTime () {
      const map = new Map()
      for (const r of this.filtered) {
        if (!map.has(r.time)) map.set(r.time, [])
        map.get(r.time).push(r)
      }
      const arr = Array.from(map.entries()).map(([time, items]) => ({
        time,
        items
      }))
      arr.sort((a, b) => {
        const comp = timeToMinutes(a.time) - timeToMinutes(b.time)
        return this.timeOrder === 'asc' ? comp : -comp
      })
      // Keep items inside the same slot in a stable order.
      for (const s of arr) {
        s.items.sort((a, b) => a.group_id - b.group_id)
      }
      return arr
    },
    // Show earliest and latest time based on the filtered list.
    timeRange () {
      if (this.filtered.length === 0) return '—'
      const times = this.filtered.map(r => r.timeValue)
      const min = Math.min(...times)
      const max = Math.max(...times)
      const fmt = (v) => {
        const h = String(Math.floor(v / 60)).padStart(2, '0')
        const m = String(v % 60).padStart(2, '0')
        return `${h}:${m}`
      }
      return `${fmt(min)} — ${fmt(max)}`
    }
  },
  methods: {
    // Map each group id to a fixed color. No external library needed.
    groupColor (g) {
      const palette = ['#4f63ee', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f43f5e']
      return palette[(g - 1) % palette.length]
    },
    // Toggle a group: clone the Set so Vue sees the change; keep at least one group selected.
    toggleGroup (g) {
      const s = new Set(this.selectedGroups)
      if (s.has(g)) s.delete(g)
      else s.add(g)
      if (s.size === 0) return
      this.selectedGroups = s
    },
    // Reset all filters to their initial state.
    resetFilters () {
      this.q = ''
      this.timeOrder = 'asc'
      this.selectedGroups = new Set(this.groups)
    },
    // Copy current filtered data as pretty-printed JSON. Uses Clipboard API; falls back if needed.
    async copyJSON () {
      const data = JSON.stringify(this.filtered, null, 2)
      try {
        await navigator.clipboard.writeText(data)
        alert('已複製目前結果 JSON。')
      } catch (e) {
        // Fallback for older browsers.
        const ta = document.createElement('textarea')
        ta.value = data
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        alert('已複製目前結果 JSON。')
      }
    },
    // Export filtered data to CSV on the client (no server call).
    exportCSV () {
      const header = ['time', 'group_id', 'message']
      const lines = [header.join(',')]
      for (const r of this.filtered) {
        // Basic escaping for quotes.
        const msg = (r.message || '').replace(/"/g, '""')
        lines.push([r.time, r.group_id, `"${msg}"`].join(','))
      }
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'data_view.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
/* Page layout: centered container, card sections, readable typography. */
.data-page { max-width: 1000px; margin: 24px auto 96px; padding: 0 16px; color: #0f172a; }
.title { margin: 0 0 4px; font-size: 28px; font-weight: 800; }
.subtitle { margin: 0; color: #475569; }
.card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; margin: 16px 0;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

/* Toolbar layout: grid on wide screens, single column on small screens. */
.toolbar { display: grid; grid-template-columns: auto 1fr auto; grid-row-gap: 12px; grid-column-gap: 12px; align-items: center; }
@media (max-width: 720px) { .toolbar { grid-template-columns: 1fr; } }

/* Segmented view switch. */
.view-toggle { display: inline-flex; background: #f1f5f9; border-radius: 9999px; padding: 4px; }
.seg {
  border: 0; background: transparent; padding: 6px 12px; border-radius: 9999px; cursor: pointer; font-weight: 700; color: #334155;
}
.seg.active { background: #fff; color: #111827; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }

/* Search input styling. */
.search input {
  width: 100%; height: 40px; border: 1px solid #cbd5e1; border-radius: 10px; padding: 0 12px; font-size: 14px;
}
.search input:focus { outline: none; border-color: #4f46e5; }

/* Group chips. */
.group-filter { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 12px; border-radius: 9999px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600;
}
.chip .dot { width: 8px; height: 8px; border-radius: 9999px; display: inline-block; }
.chip.selected { border-color: var(--chip); box-shadow: inset 0 0 0 999px rgba(0,0,0,0.02); }
.chip.ghost { color: #334155; background: #f8fafc; }

/* Sorter select. */
.sorter { display: inline-flex; align-items: center; gap: 8px; }
.sorter select {
  height: 36px; border-radius: 10px; border: 1px solid #cbd5e1; padding: 0 8px;
}

/* Metrics grid. */
.metrics { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; margin-top: 12px; }
@media (max-width: 720px) { .metrics { grid-template-columns: 1fr; } }
.metric { padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; }
.metric-label { font-size: 12px; color: #64748b; }
.metric-value { font-weight: 800; font-size: 18px; }

/* Table: sticky header for long lists. */
.table-wrap { overflow: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
.table { width: 100%; border-collapse: separate; border-spacing: 0; }
.table thead th {
  position: sticky; top: 0; background: #f1f5f9; text-align: left; padding: 10px 12px; font-weight: 700; font-size: 13px;
  border-bottom: 1px solid #e2e8f0;
}
.table tbody td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
.table tbody tr:hover { background: #f8fafc; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }

/* Group tag style. */
.tag {
  display: inline-flex; align-items: center; gap: 8px; padding: 2px 10px; border-radius: 9999px;
  background: #fff; border: 1px solid var(--tag, #cbd5e1); color: #0f172a;
}

/* Timeline layout. */
.timeline { position: relative; display: flex; flex-direction: column; gap: 20px; }
.tl-slot { display: grid; grid-template-columns: 80px 12px 1fr; gap: 12px; align-items: flex-start; }
.tl-time { font-weight: 800; color: #111827; text-align: right; padding-top: 6px; }
.tl-pipe { width: 12px; position: relative; }
.tl-pipe::before {
  content: ""; position: absolute; left: 5px; top: 0; bottom: 0; width: 2px; background: #e5e7eb; border-radius: 2px;
}
.tl-items { display: grid; gap: 10px; }
.tl-item {
  border-left: 4px solid; background: #fff; border-radius: 12px; padding: 8px 12px; border: 1px solid #e5e7eb; border-left-width: 4px;
}
.tl-header { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: #374151; margin-bottom: 4px; }
.tl-group { font-size: 13px; }
.tl-msg { color: #111827; }

/* Action buttons. */
.actions { display: flex; align-items: center; gap: 8px; }
.btn {
  height: 40px; padding: 0 14px; border-radius: 10px; border: 1px solid transparent; background: #f1f5f9; color: #0f172a; font-weight: 600; cursor: pointer;
}
.btn:hover { background: #e2e8f0; }
.btn.ghost { background: #fff; border-color: #cbd5e1; }
.hint { color: #64748b; font-size: 12px; margin-left: 4px; }

/* Screen-reader-only text: visible to assistive tech, hidden visually. */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
</style>
