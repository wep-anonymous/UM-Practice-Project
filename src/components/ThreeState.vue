<template>
  <div class="three-state-container">
    <span class="label">權限申請</span>
    <div class="dots-container">
      <div 
        v-for="state in states" 
        :key="state.value"
        class="dot-wrapper"
        :class="{ active: localValue === state.value }"
        @click="selectState(state.value)"
      >
        <div class="dot" :class="state.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeState',
  props: {
    value: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      localValue: this.value,
      states: [
        { value: 'agree' },
        { value: 'default' },
        { value: 'reject' }
      ]
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
    selectState(state) {
      this.localValue = state;
    }
  }
}
</script>

<style scoped>
.three-state-container {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.dots-container {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 20px;
}
.dot-wrapper {
  padding: 4px 12px;
  border-radius: 15px;
  cursor: pointer;
}
.dot-wrapper.active {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.agree { background: #4CAF50; }
.dot.default { background: #2196F3; }
.dot.reject { background: #f44336; }
</style>