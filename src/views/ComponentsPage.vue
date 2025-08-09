<template>
  <div class="components-page">
    <h1>自定義組件</h1>
    
    <div class="component-card">
      <h2>Status 開關組件</h2>
      <div class="component-demo">
        <cus-btn v-model="toggleValue1" />
      </div>
      <div class="status-text">
        目前設定狀態：<span :class="toggleValue1 ? 'on' : 'off'">{{ toggleValue1 ? '開啟' : '關閉' }}</span>
      </div>
    </div>
    
    <div class="component-card">
      <h2>TripleChoice 選擇組件</h2>
      <div class="component-demo">
        <three-state v-model="threeStateValue1" />
      </div>
      <div class="status-text">
        目前選擇狀態：<span>{{ getStateLabel(threeStateValue1) }}</span>
      </div>
    </div>
    
    <div class="component-card">
      <h2>多個組件綁定測試</h2>
      <div class="multi-demo">
        <div class="demo-row">
          <label>開關 1:</label>
          <cus-btn v-model="toggleValue1" />
          <span class="value">{{ toggleValue1 }}</span>
        </div>
        <div class="demo-row">
          <label>開關 2:</label>
          <cus-btn v-model="toggleValue2" />
          <span class="value">{{ toggleValue2 }}</span>
        </div>
        <div class="demo-row">
          <label>選擇器 1:</label>
          <three-state v-model="threeStateValue1" />
          <span class="value">{{ threeStateValue1 }}</span>
        </div>
        <div class="demo-row">
          <label>選擇器 2:</label>
          <three-state v-model="threeStateValue2" />
          <span class="value">{{ threeStateValue2 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CusBtn from '../components/CusBtn.vue';
import ThreeState from '../components/ThreeState.vue';

export default {
  name: 'ComponentsPage',
  components: {
    CusBtn,
    ThreeState
  },
  data() {
    return {
      toggleValue1: false,
      toggleValue2: true,
      threeStateValue1: 'default',
      threeStateValue2: 'agree'
    };
  },
  methods: {
    getStateLabel(state) {
      const labels = {
        agree: '同意',
        default: '預設',
        reject: '拒絕'
      };
      return labels[state] || '未知';
    }
  }
}
</script>

<style scoped>
.components-page {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 2rem;
  text-align: center;
}

.component-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.component-card h2 {
  color: #666;
  font-size: 16px;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.component-demo {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #fafafa;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.status-text {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.status-text span {
  font-weight: bold;
}

.status-text span.on {
  color: #4CAF50;
}

.status-text span.off {
  color: #999;
}

.multi-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 4px;
}

.demo-row label {
  width: 100px;
  color: #666;
  font-size: 14px;
}

.demo-row .value {
  margin-left: auto;
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}
</style>