<template>
  <div id="app">
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/components">自定義組件</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>