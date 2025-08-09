<template>
  <div id="app">
    <nav>
      <router-link to="/">首頁</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>