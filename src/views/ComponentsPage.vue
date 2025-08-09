<template>
  <div class="components-page">
    <h1>自定義組件</h1>
    <div class="demo">
      <h2>Toggle Switch</h2>
      <cus-btn v-model="toggle1" />
      <p>Value: {{ toggle1 }}</p>
    </div>
    <div class="demo">
      <h2>Three State</h2>
      <three-state v-model="state1" />
      <p>Value: {{ state1 }}</p>
    </div>
  </div>
</template>

<script>
import CusBtn from '../components/CusBtn.vue';
import ThreeState from '../components/ThreeState.vue';

export default {
  name: 'ComponentsPage',
  components: { CusBtn, ThreeState },
  data() {
    return {
      toggle1: false,
      state1: 'default'
    };
  }
}
</script>