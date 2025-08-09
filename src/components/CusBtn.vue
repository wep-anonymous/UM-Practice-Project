<template>
  <div class="toggle-container">
    <span class="label">狀態</span>
    <div class="toggle-switch" @click="toggle">
      <div class="switch" :class="{ active: localValue }">
        <div class="slider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CusBtn',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
    localValue(newVal) {
      this.$emit('input', newVal);
    }
  },
  methods: {
    toggle() {
      this.localValue = !this.localValue;
    }
  }
}
</script>

<style scoped>
.toggle-container {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.switch {
  width: 44px;
  height: 24px;
  background-color: #E0E0E0;
  border-radius: 12px;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
}
.switch.active {
  background-color: #4A90E2;
}
.slider {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}
.switch.active .slider {
  transform: translateX(20px);
}
</style>