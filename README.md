# UM Practice Project

Vue2 專案實作 - 面試測驗作業

## 專案概述

這是一個使用 Vue 2 建立的前端面試練習專案，展示了多種自訂組件和資料視覺化功能。專案包含了開關組件、圖表視覺化、系統設定管理和資料瀏覽等功能模組。

### 專案目的
- 展示 Vue.js 組件開發能力
- 實現資料視覺化（使用 ECharts）
- 展現前端介面設計與互動功能
- 示範表單驗證與資料管理

### 專案特色
- ✅ 純前端應用，無需後端伺服器
- ✅ 響應式設計，支援各種螢幕尺寸
- ✅ 本地資料儲存（localStorage）
- ✅ 無障礙設計（ARIA 支援）
- ✅ 中文介面

## 快速開始

以下是最快速執行專案的步驟：

```bash
# 1. 進入專案目錄
cd [專案資料夾]

# 2. 安裝依賴
npm install

# 3. 建置專案
npm run build

# 4. 開啟 dist/index.html 在瀏覽器中查看
```

## 技術堆疊

- **Vue.js 2.x** - 前端框架
- **Vue Router** - 路由管理
- **ECharts** - 資料視覺化圖表庫
- **Webpack** - 模組打包工具
- **JavaScript (ES6+)** - 程式語言
- **HTML5 & CSS3** - 標記語言和樣式


- `npm run build`：建置生產版本，輸出至 dist 資料夾
- `npm run dev`：啟動開發伺服器（如有配置）

## 專案結構

```
project-root/
├── src/
│   ├── components/          # 可重複使用的組件
│   │   ├── CusBtn.vue      # 自訂開關按鈕組件
│   │   ├── ThreeState.vue  # 三態選擇器組件
│   │   ├── PieChart.vue    # 圓餅圖組件
│   │   └── StackedBar.vue  # 堆疊長條圖組件
│   ├── views/               # 頁面組件
│   │   ├── HomePage.vue    # 首頁
│   │   ├── ComponentsPage.vue  # 組件展示頁
│   │   ├── ChartsPage.vue  # 圖表展示頁
│   │   ├── SettingsPage.vue    # 系統設定頁
│   │   └── DataPage.vue    # 資料瀏覽頁
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── App.vue             # 根組件
│   └── main.js             # 應用程式進入點
├── dist/                    # 建置後的檔案目錄
│   ├── index.html          # 主 HTML 檔案
│   └── bundle.js           # 打包後的 JavaScript
├── package.json            # 專案配置和依賴
└── webpack.config.js       # Webpack 配置檔案
```

## 功能介紹

### 1. 首頁 (HomePage)
- 專案的起始頁面
- 顯示專案標題 "UM interview practice"

### 2. 組件頁 (ComponentsPage)
展示自訂的 UI 組件：

#### CusBtn 開關組件
- **功能**：可切換開啟/關閉狀態的開關按鈕
- **特色**：
  - 平滑的動畫過渡效果
  - 清楚的視覺狀態回饋
  - 支援鍵盤操作（Space、Enter 鍵）
  - ARIA 無障礙支援

#### ThreeState 三態選擇器
- **功能**：提供三種狀態選擇（同意/預設/拒絕）
- **特色**：
  - 視覺化的狀態指示（綠色/藍色/紅色）
  - 流暢的切換動畫
  - 支援鍵盤導航

### 3. 圖表頁 (ChartsPage)
使用 ECharts 實現的資料視覺化：

#### PieChart 圓餅圖
- **功能**：顯示瀏覽器市場佔有率
- **特色**：
  - 動態資料更新
  - 可切換標籤顯示/隱藏
  - 懸停提示資訊
  - 響應式設計

#### StackedBar 堆疊長條圖
- **功能**：顯示區域分佈資料
- **特色**：
  - 互動式圖例
  - 懸停高亮效果
  - 自動同步圖表與圖例狀態

### 4. 設定頁 (SettingsPage)
系統配置管理介面：
- **Server A 設定**：IP 位址和監聽秒數配置
- **Server B 設定**：網域和測試 IP 設定
- **Server C 設定**：服務啟用狀態和 API Key 管理
- **系統設定**：日期時間和時區選擇
- **功能特色**：
  - 即時驗證輸入資料
  - 本地儲存設定（使用 localStorage）
  - JSON 格式預覽和複製
  - 未儲存變更提醒
  - 回復預設值功能

### 5. 資料頁 (DataPage)
資料管理和瀏覽功能：
- **檢視模式**：表格視圖和時間軸視圖切換
- **過濾功能**：
  - 文字搜尋
  - 群組篩選
  - 時間排序（升冪/降冪）
- **資料操作**：
  - 複製 JSON 格式資料
  - 匯出 CSV 檔案
- **統計資訊**：顯示總筆數、群組數和時間範圍
