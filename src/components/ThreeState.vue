<template>
  <div class="three-state-container">
    <span class="label">權限申請</span>
    <div class="three-state">
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
        { value: 'agree', label: '同意' },
        { value: 'default', label: '預設' },
        { value: 'reject', label: '拒絕' }
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

.label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.three-state {
  display: inline-block;
}

.dots-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 20px;
}

.dot-wrapper {
  padding: 4px 12px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot-wrapper:hover {
  background-color: rgba(255,255,255,0.5);
}

.dot-wrapper.active {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.dot.agree {
  background-color: #4CAF50;
}

.dot.default {
  background-color: #2196F3;
}

.dot.reject {
  background-color: #f44336;
}

.dot-wrapper:not(.active) .dot {
  opacity: 0.5;
}
</style>