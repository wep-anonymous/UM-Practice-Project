<template>
  <div class="settings-page">
    <h1>設定頁面</h1>
    <div class="section">
      <h2>Server A</h2>
      <label>IP: <input v-model="settings.serverA_ip"></label>
      <label>監聽秒數: <input v-model.number="settings.serverA_monitor_second" type="number"></label>
    </div>
    <div class="section">
      <h2>Server B</h2>
      <label>網域: <input v-model="settings.serverB_domain"></label>
      <label>測試IP: <input v-model="settings.serverB_test_ip"></label>
    </div>
    <div class="section">
      <h2>Server C</h2>
      <label>C1狀態: <cus-btn v-model="settings.serverC_c1_status" /></label>
      <label>C2狀態: <cus-btn v-model="settings.serverC_c2_status" /></label>
      <label>API Key: <input v-model="settings.serverC_api_key"></label>
    </div>
    <button @click="saveSettings">儲存</button>
    <pre>{{ JSON.stringify(settings, null, 2) }}</pre>
  </div>
</template>

<script>
import CusBtn from '../components/CusBtn.vue';

export default {
  name: 'SettingsPage',
  components: { CusBtn },
  data() {
    return {
      settings: {
        serverA_ip: '1.1.1.1',
        serverA_monitor_second: 30,
        serverB_domain: 'test.com.tw',
        serverB_test_ip: '2.2.2.2',
        serverC_c1_status: true,
        serverC_c2_status: false,
        serverC_api_key: 'test_key',
        system_datetime: '2025-08-07T16:33',
        system_timezone: 'Asia/Taipei'
      }
    };
  },
  methods: {
    saveSettings() {
      console.log('Settings saved:', this.settings);
      alert('設定已儲存！');
    }
  }
}
</script>