<template>
  <div class="settings-page">
    <header class="page-header">
      <h1 class="title">系統設定</h1>
      <p class="subtitle">請完成各伺服器與系統參數設定後再儲存。</p>
    </header>

    <!-- Server A -->
    <section class="card">
      <h2 class="card-title">Server A</h2>
      <div class="form-grid">
        <div class="field">
          <label for="a-ip">IP 位址</label>
          <input
            id="a-ip"
            v-model.trim="settings.serverA_ip"
            :class="{ invalid: errors.serverA_ip }"
            placeholder="例如：1.1.1.1"
            inputmode="numeric"
            aria-describedby="a-ip-help"
          />
          <small id="a-ip-help" class="help">支援 IPv4，必填。</small>
          <p v-if="errors.serverA_ip" class="error">{{ errors.serverA_ip }}</p>
        </div>

        <div class="field">
          <label for="a-sec">監聽秒數</label>
          <input
            id="a-sec"
            v-model.number="settings.serverA_monitor_second"
            :class="{ invalid: errors.serverA_monitor_second }"
            type="number"
            min="5"
            max="3600"
            step="1"
            placeholder="例如：30"
            aria-describedby="a-sec-help"
          />
          <small id="a-sec-help" class="help">5–3600 秒，必填。</small>
          <p v-if="errors.serverA_monitor_second" class="error">{{ errors.serverA_monitor_second }}</p>
        </div>
      </div>
    </section>

    <!-- Server B -->
    <section class="card">
      <h2 class="card-title">Server B</h2>
      <div class="form-grid">
        <div class="field">
          <label for="b-domain">網域位址</label>
          <input
            id="b-domain"
            v-model.trim="settings.serverB_domain"
            :class="{ invalid: errors.serverB_domain }"
            placeholder="例如：test.com.tw"
            aria-describedby="b-domain-help"
          />
          <small id="b-domain-help" class="help">有效網域，必填。</small>
          <p v-if="errors.serverB_domain" class="error">{{ errors.serverB_domain }}</p>
        </div>

        <div class="field">
          <label for="b-test-ip">測試 IP</label>
          <input
            id="b-test-ip"
            v-model.trim="settings.serverB_test_ip"
            :class="{ invalid: errors.serverB_test_ip }"
            placeholder="例如：2.2.2.2"
            inputmode="numeric"
          />
          <p v-if="errors.serverB_test_ip" class="error">{{ errors.serverB_test_ip }}</p>
        </div>
      </div>
    </section>

    <!-- Server C -->
    <section class="card">
      <h2 class="card-title">Server C</h2>
      <div class="form-grid">
        <div class="field">
          <label for="c1">服務 C1 啟用</label>
          <div class="inline">
            <cus-btn id="c1" v-model="settings.serverC_c1_status" />
            <span class="badge" :class="settings.serverC_c1_status ? 'on' : 'off'">
              {{ settings.serverC_c1_status ? '啟用' : '停用' }}
            </span>
          </div>
        </div>

        <div class="field">
          <label for="c2">服務 C2 啟用</label>
          <div class="inline">
            <cus-btn id="c2" v-model="settings.serverC_c2_status" />
            <span class="badge" :class="settings.serverC_c2_status ? 'on' : 'off'">
              {{ settings.serverC_c2_status ? '啟用' : '停用' }}
            </span>
          </div>
        </div>

        <div class="field field-colspan">
          <label for="api-key">API Key</label>
          <div class="with-action">
            <input
              id="api-key"
              :type="showApi ? 'text' : 'password'"
              v-model.trim="settings.serverC_api_key"
              :class="{ invalid: errors.serverC_api_key }"
              placeholder="例如：test_key"
            />
            <button class="btn ghost" type="button" @click="showApi = !showApi">
              {{ showApi ? '隱藏' : '顯示' }}
            </button>
          </div>
          <p v-if="errors.serverC_api_key" class="error">{{ errors.serverC_api_key }}</p>
        </div>
      </div>
    </section>

    <!-- System -->
    <section class="card">
      <h2 class="card-title">系統設定</h2>
      <div class="form-grid">
        <div class="field">
          <label for="sys-dt">日期時間</label>
          <input
            id="sys-dt"
            type="datetime-local"
            v-model="datetimeLocal"
            :class="{ invalid: errors.system_datetime }"
            aria-describedby="sys-dt-help"
          />
          <small id="sys-dt-help" class="help">採本地輸入；儲存時格式為「YYYY-MM-DD HH:mm」。</small>
          <p v-if="errors.system_datetime" class="error">{{ errors.system_datetime }}</p>
        </div>

        <div class="field">
          <label for="tz">時區</label>
          <select id="tz" v-model="settings.system_timezone">
            <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Preview & actions -->
    <section class="card">
      <div class="card-title-row">
        <h2 class="card-title">目前設定 JSON</h2>
        <div class="card-actions">
          <span class="dirty" v-if="isDirty">未儲存變更</span>
          <button class="btn ghost" type="button" @click="copyJson">複製 JSON</button>
        </div>
      </div>
      <pre class="preview">{{ prettySettings }}</pre>
    </section>

    <div class="action-bar">
      <button class="btn" type="button" @click="restoreDefaults">回復預設</button>
      <div class="spacer"></div>
      <button class="btn ghost" type="button" :disabled="!isDirty" @click="resetToLastSaved">還原變更</button>
      <button class="btn primary" type="button" :disabled="isInvalid" @click="saveSettings">儲存</button>
    </div>
  </div>
</template>

<script>
import CusBtn from '../components/CusBtn.vue'

const ipv4 =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/
const domain =
  /^(?=.{1,253}$)(?!-)(?:[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,63}$/

const DEFAULTS = Object.freeze({
  serverA_ip: '1.1.1.1',
  serverA_monitor_second: 30,
  serverB_domain: 'test.com.tw',
  serverB_test_ip: '2.2.2.2',
  serverC_c1_status: true,
  serverC_c2_status: false,
  serverC_api_key: 'test_key',
  system_datetime: '2025-08-07 16:33',
  system_timezone: 'Asia/Taipei'
})

const STORAGE_KEY = 'app_settings_v1'

export default {
  name: 'SettingsPage',
  components: { CusBtn },
  data () {
    return {
      settings: { ...DEFAULTS },
      lastSaved: null,
      showApi: false,
      timezones: [
        'Asia/Taipei',
        'UTC',
        'Asia/Tokyo',
        'Europe/London',
        'America/New_York',
        'Asia/Shanghai',
        'Europe/Berlin'
      ]
    }
  },
  computed: {
    // Bind datetime-local without changing stored format
    datetimeLocal: {
      get () {
        return (this.settings.system_datetime || '').replace(' ', 'T')
      },
      set (val) {
        this.settings.system_datetime = (val || '').replace('T', ' ')
      }
    },
    errors () {
      const e = {}

      if (!this.settings.serverA_ip || !ipv4.test(this.settings.serverA_ip)) {
        e.serverA_ip = '請輸入有效 IPv4。'
      }

      const sec = Number(this.settings.serverA_monitor_second)
      if (!Number.isFinite(sec) || sec < 5 || sec > 3600) {
        e.serverA_monitor_second = '秒數需介於 5–3600。'
      }

      if (!this.settings.serverB_domain || !domain.test(this.settings.serverB_domain)) {
        e.serverB_domain = '請輸入有效網域（例如 example.com）。'
      }

      if (!this.settings.serverB_test_ip || !ipv4.test(this.settings.serverB_test_ip)) {
        e.serverB_test_ip = '請輸入有效 IPv4。'
      }

      if (!this.settings.serverC_api_key) {
        e.serverC_api_key = 'API Key 不可為空。'
      }

      if (!this.settings.system_datetime || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(this.settings.system_datetime)) {
        e.system_datetime = '請選擇日期時間。'
      }

      return e
    },
    isInvalid () {
      return Object.keys(this.errors).length > 0
    },
    isDirty () {
      const current = JSON.stringify(this.settings)
      const saved = JSON.stringify(this.lastSaved || this.settings)
      return current !== saved
    },
    prettySettings () {
      return JSON.stringify(this.settings, null, 2)
    }
  },
  created () {
    // Load from localStorage if available; else use defaults
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        this.settings = { ...DEFAULTS, ...parsed }
      } catch (_) {
        // ignore corrupted storage
      }
    }
    // mark snapshot
    this.lastSaved = JSON.parse(JSON.stringify(this.settings))

    // navigation guard for unsaved changes
    window.addEventListener('beforeunload', this.beforeUnload)
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.beforeUnload)
  },
  methods: {
    beforeUnload (e) {
      if (this.isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    },
    saveSettings () {
      if (this.isInvalid) return
      // persist
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
      this.lastSaved = JSON.parse(JSON.stringify(this.settings))
      alert('設定已儲存。')
      // 模擬提交
      // console.log('Settings saved:', this.settings)
    },
    resetToLastSaved () {
      if (!this.lastSaved) return
      this.settings = JSON.parse(JSON.stringify(this.lastSaved))
    },
    restoreDefaults () {
      if (confirm('確定要回復預設值？未儲存變更將遺失。')) {
        this.settings = { ...DEFAULTS }
      }
    },
    async copyJson () {
      try {
        await navigator.clipboard.writeText(this.prettySettings)
        alert('已複製 JSON。')
      } catch (_) {
        // Fallback
        const ta = document.createElement('textarea')
        ta.value = this.prettySettings
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        alert('已複製 JSON。')
      }
    }
  }
}
</script>

<style scoped>
/* Layout */
.settings-page {
  max-width: 1000px;
  margin: 24px auto 96px;
  padding: 0 16px;
  color: #0f172a;
}

.page-header { margin-bottom: 16px; }
.title { margin: 0 0 4px; font-size: 28px; font-weight: 800; }
.subtitle { margin: 0; color: #475569; }

/* Card */
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}
.card-title { margin: 0 0 12px; font-size: 18px; font-weight: 700; }
.card-title-row {
  display: flex; align-items: center; justify-content: space-between;
}
.card-actions { display: flex; gap: 8px; align-items: center; }
.dirty { color: #b45309; font-size: 14px; }

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 720px) {
  .form-grid { grid-template-columns: 1fr; }
}

.field { display: flex; flex-direction: column; gap: 6px; }
.field-colspan { grid-column: 1 / -1; }

label { font-weight: 600; }
input, select {
  height: 40px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 120ms ease;
  background: #fff;
}
input:focus, select:focus { border-color: #4f46e5; }

input.invalid { border-color: #ef4444; }
.error { color: #b91c1c; font-size: 12px; margin: 0; }
.help { color: #64748b; }

/* Inline switch + status */
.inline { display: inline-flex; align-items: center; gap: 10px; }
.badge {
  padding: 2px 8px; border-radius: 9999px; font-size: 12px; border: 1px solid #e2e8f0;
}
.badge.on { background: #dcfce7; color: #065f46; border-color: #bbf7d0; }
.badge.off { background: #fee2e2; color: #7f1d1d; border-color: #fecaca; }

/* API key input with action */
.with-action { display: flex; gap: 8px; }
.with-action input { flex: 1; }

/* Preview */
.preview {
  margin: 0; white-space: pre-wrap; word-break: break-word;
  background: #0b1022; color: #e2e8f0; padding: 12px; border-radius: 10px;
  font-size: 13px; line-height: 1.4; max-height: 260px; overflow: auto;
}

/* Buttons */
.btn {
  height: 40px; padding: 0 14px; border-radius: 10px; border: 1px solid transparent;
  background: #f1f5f9; color: #0f172a; font-weight: 600; cursor: pointer;
}
.btn:hover { background: #e2e8f0; }
.btn.primary {
  background: #4f46e5; color: #fff; border-color: #4338ca;
}
.btn.primary:disabled { background: #c7d2fe; cursor: not-allowed; }
.btn.ghost { background: #fff; border-color: #cbd5e1; }

/* Bottom action bar */
.action-bar {
  position: fixed; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.98);
  border-top: 1px solid #e2e8f0;
  padding: 12px 16px;
  display: flex; gap: 8px; align-items: center;
}
.action-bar .spacer { flex: 1; }
</style>
