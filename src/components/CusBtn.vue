<template>
  <button
    class="switch"
    :class="{ 'is-on': value }"
    role="switch"
    :aria-checked="value ? 'true' : 'false'"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
  >
    <span class="switch__label">{{ value ? '開啟' : '關閉' }}</span>
    <span class="switch__thumb"></span>
  </button>
</template>
<script>
export default {
  name: 'CusBtn',
  model: { prop: 'value', event: 'input' },
  props: { value: { type: Boolean, default: false } },
  methods: { toggle () { this.$emit('input', !this.value) } }
}
</script>

<style scoped>
.switch{
  --w:104px; --h:44px; --pad:4px; --thumb:36px; --travel:calc(var(--w) - var(--thumb) - var(--pad)*2);
  width:var(--w); height:var(--h);
  border:0; border-radius:9999px; cursor:pointer;
  background:#e5e7eb; color:#6b7280; font-weight:600; user-select:none;
  position:relative; display:flex; align-items:center;
  box-shadow:inset 0 1px 2px rgba(0,0,0,.06);
  transition:background .25s ease, color .25s ease, box-shadow .25s ease;
}
.switch:focus{ outline:none; box-shadow:0 0 0 3px rgba(99,102,241,.25), inset 0 1px 2px rgba(0,0,0,.06); }

.switch__label{
  flex:1; font-size:14px; line-height:1;
  text-align:right; padding-right:14px;
}
.switch.is-on .switch__label{ text-align:left; padding:0 0 0 14px; color:#fff; }

.switch.is-on{ background:#4f46e5; color:#fff; }

.switch__thumb{
  position:absolute; top:50%; left:var(--pad);
  width:var(--thumb); height:var(--thumb); border-radius:9999px; background:#fff;
  box-shadow:0 6px 14px rgba(0,0,0,.18);
  transform:translateY(-50%); transition:transform .25s ease;
}
.switch.is-on .switch__thumb{ transform:translate(calc(var(--travel)), -50%); }
</style>
