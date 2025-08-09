<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">首頁</router-link>
      <router-link to="/components">組件</router-link>
      <router-link to="/charts">圖表</router-link>
      <router-link to="/settings">設定</router-link>
      <router-link to="/data">資料</router-link>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  /* Purple gradient */
  padding: 0;
  display: flex;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar a {
  color: white;
  text-decoration: none;
  padding: 1rem 1.5rem;
  transition: background-color 0.3s;
  position: relative;
}

.navbar a:hover {
  background-color: rgba(255,255,255,0.1);
}

.navbar a.router-link-active {
  background-color: rgba(255,255,255,0.2);
}

.navbar a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: white;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 52px);
}
</style>