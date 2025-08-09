<template>
  <div class="data-page">
    <h1>資料瀏覽</h1>
    <table>
      <thead>
        <tr>
          <th>時間</th>
          <th>群組</th>
          <th>訊息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="i">
          <td>{{ item.time }}</td>
          <td>群組 {{ item.group_id }}</td>
          <td>{{ item.message }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataPage',
  data() {
    return {
      data: [
        { time: "09:10", group_id: 1, message: "你好" },
        { time: "09:10", group_id: 2, message: "出門" },
        { time: "09:15", group_id: 2, message: "打球" },
        { time: "09:20", group_id: 2, message: "買中餐" },
        { time: "09:15", group_id: 1, message: "下午茶" },
        { time: "09:25", group_id: 2, message: "休息" },
        { time: "09:20", group_id: 1, message: "休息" }
      ]
    };
  }
}
</script>