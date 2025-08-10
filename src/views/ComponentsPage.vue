<template>
  <div class="components-page">
  <h1 class="custom-heading">自定義組件</h1>
  <hr class="blue-line">
  <div class="section">
  <h1><strong>Status</strong> 開關組件</h1>
    <section class="card">
      <h1><strong>狀態</strong></h1>
      <div class="demo">
        <cus-btn v-model="toggleValue1"/>
      </div>
    </section>
      <section class="demo stack">
      <h3>目前設定狀態：</h3>
      <p class="hint">狀態：<span >{{ toggleValue1 ? '開啟' : '關閉' }}</span></p> 
      </section>
      </div>
<!-- :class="toggleValue1 ? 'on' : 'off'" -->
<div class="section">
<h1><strong>TripleChoice</strong> 選擇組件</h1>
    <section class="card">
        <h1><strong>權限申請</strong></h1>
      <div class="demo">
        <three-state v-model="threeStateValue1"/>
      </div>
    </section>
    <section class="demo stack">
    <h3>目前選擇狀態：</h3>
    <p class="hint">權限申請：<span>{{ getStateLabel(threeStateValue1) }}</span></p>
    </section>
    </div>
<!-- #f6f8fb -->
    <!-- <section class="card">
      <h1>多個組件綁定測試</h1>
      <div class="grid">
        <div class="row">
          <label>開關 1：</label>
          <cus-btn v-model="toggleValue1"/>
          <span class="kv">{{ toggleValue1 }}</span>
        </div>
        <div class="row">
          <label>開關 2：</label>
          <cus-btn v-model="toggleValue2"/>
          <span class="kv">{{ toggleValue2 }}</span>
        </div>
        <div class="row">
          <label>選擇器 1：</label>
          <three-state v-model="threeStateValue1"/>
          <span class="kv">{{ threeStateValue1 }}</span>
        </div>
        <div class="row">
          <label>選擇器 2：</label>
          <three-state v-model="threeStateValue2"/>
          <span class="kv">{{ threeStateValue2 }}</span>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import CusBtn from '../components/CusBtn.vue'
import ThreeState from '../components/ThreeState.vue'

export default {
  name: 'ComponentsPage',
  components: { CusBtn, ThreeState },
  data () {
    return {
      toggleValue1: false,
      toggleValue2: true,
      threeStateValue1: 'default',
      threeStateValue2: 'agree'
    }
  },
  methods: {
    getStateLabel (s) {
      return ({ agree: '同意', default: '預設', reject: '拒絕' }[s] || '未知')
    }
  }
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

.section{ max-width:1064px; margin-top:30px ; padding:32px 16px; background:#fff; border-radius: 15px;box-shadow:
    0 0 0 1px rgba(15,23,42,.08),
    0 8px 24px rgba(15,23,42,.25); }

/* 卡片外觀 */
.card{
  background:#fff; border-radius:14px; padding:24px;
  box-shadow:0 8px 24px rgba(15,23,42,.06);
  border:1px solid rgba(15,23,42,.25);
  margin: 24px 0;
}
h1{ font-size:22px; color:#0f172a; margin:0 0 16px; }
h1 strong{ font-weight:800; margin-right:8px; }

h3{ font-size:18px; color:#0f172a; margin:0 0 12px; margin-bottom:20px;}


/* 示範容器（淡灰、圓角、內陰影） */
.demo{
  display:flex; align-items:center; min-height:92px;
  padding:20px; border-radius:14px;
  background:#f6f8fb; box-shadow:inset 0 1px 0 rgba(0,0,0,.03);
  margin-bottom:12px;
}

.demo.stack { 
  flex-direction: column; 
  align-items: flex-start; 
  gap: 15px;            /* spacing between h3 and p */
}

/* 提示文字 */
.hint{ margin:0; color:#64748b; font-size:14px; }
.hint .on{ color:#16a34a; font-weight:700; }
.hint .off{ color:#94a3b8; font-weight:700; }

/* 多組元件列表 */
.grid{ display:flex; flex-direction:column; gap:16px; }
.row{
  display:flex; align-items:center; gap:12px;
  padding:12px 16px; border-radius:12px; background:#f6f8fb;
}
.row label{ width:96px; color:#475569; font-size:14px; }
.kv{
  margin-left:auto; font-family:ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size:12px; padding:2px 8px; border-radius:6px;
  color:#1d4ed8; background:#e8f1fe;
}
</style>
