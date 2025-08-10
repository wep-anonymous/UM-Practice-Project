<template>
  <div class="triple" role="tablist" aria-label="三段選擇">
    <button
      class="opt is-agree"
      :class="{ active: value === 'agree' }"
      role="tab" :aria-selected="value==='agree'"
      @click="pick('agree')" @keydown.enter.prevent="pick('agree')" @keydown.space.prevent="pick('agree')">
      <span class="dot"></span>
    </button>

    <button
      class="opt is-default"
      :class="{ active: value === 'default' }"
      role="tab" :aria-selected="value==='default'"
      @click="pick('default')" @keydown.enter.prevent="pick('default')" @keydown.space.prevent="pick('default')">
      <span class="dot"></span>
    </button>

    <button
      class="opt is-reject"
      :class="{ active: value === 'reject' }"
      role="tab" :aria-selected="value==='reject'"
      @click="pick('reject')" @keydown.enter.prevent="pick('reject')" @keydown.space.prevent="pick('reject')">
      <span class="dot"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ThreeState',
  model: { prop: 'value', event: 'input' },
  props: {
    value: { type: String, default: 'default' } // 'agree' | 'default' | 'reject'
  },
  methods: {
    pick (v) { if (v !== this.value) this.$emit('input', v) }
  }
}
</script>

<style scoped>
.triple {
  display: flex;
  align-items: stretch; /* stretch buttons to full height */
  border-radius: 14px;
  background: #ffffff;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden; /* ensure active background has rounded edges */
}
.opt{
  --w:88px; --h:44px; --r:14px;
  position:relative; width:var(--w); height:var(--h);
  background:transparent; border:none; border-radius:var(--r); cursor:pointer;
  transition:background .2s ease, box-shadow .2s ease;
  outline:none;
}
/* .opt:focus{ box-shadow:0 0 0 3px rgba(99,102,241,.25); } */

.dot {
  --size: 14px;
  position: absolute;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
  width: var(--size);
  height: var(--size);
  border-radius: 9999px;
  background: currentColor;
  transition: background 0.2s ease; /* removed left/transform transition */
}

/* 顏色 */
.is-agree{ color:#16a34a; }   /* 綠 */
.is-default{ color:#2563eb; } /* 藍 */
.is-reject{ color:#dc2626; }  /* 紅 */

/* 選取時彩色膠囊、白點置中（符合截圖） */
.opt.active{ color:#fff; }
.is-agree.active{ background:#16a34a; }
.is-default.active{ background:#2563eb; }
.is-reject.active{ background:#dc2626; }
.opt.active .dot{ background:#fff; left:50%; transform:translate(-50%,-50%); }
</style>
