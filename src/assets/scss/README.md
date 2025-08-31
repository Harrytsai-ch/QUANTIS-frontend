# SCSS 架構說明

本專案採用模組化的 SCSS 架構，按照功能和用途分類管理樣式，提供更好的維護性和擴展性。

## 📁 目錄結構

```
src/assets/scss/
├── all.scss                 # 主要入口文件
├── README.md               # 本說明文件
├── utils/                  # 工具函數和變數
│   ├── _variables.scss     # SCSS 變數定義
│   ├── _functions.scss     # SCSS 函數
│   ├── _mixins.scss        # SCSS 混入 (mixins)
│   └── _base.scss          # 基礎樣式和重置
├── layouts/                # 佈局相關樣式
│   ├── _header.scss        # Header 佈局
│   ├── _main.scss          # 主要佈局
│   └── _grid.scss          # Grid 系統
├── components/             # 組件樣式
│   ├── _upload.scss        # 檔案上傳組件
│   ├── _cards.scss         # 卡片組件
│   ├── _buttons.scss       # 按鈕組件
│   ├── _forms.scss         # 表單組件
│   └── _progress.scss      # 進度條組件
└── pages/                  # 頁面特定樣式
    ├── _dashboard.scss     # 儀表板頁面
    ├── _upload.scss        # 上傳頁面
    └── _reports.scss       # 報表頁面
```

## 🎨 架構特色

### **模組化設計**
- 按功能分類，每個模組職責單一
- 便於維護和擴展
- 避免樣式衝突

### **SCSS 進階功能**
- **變數管理**：統一的顏色、字體、間距變數
- **混入 (Mixins)**：可重用的樣式模式
- **函數**：動態計算和工具函數
- **嵌套**：清晰的層級結構

### **響應式優先**
- 使用 Bootstrap 5 的斷點系統
- 自定義響應式混入
- 移動優先的設計方法

## 🛠️ 使用方法

### 導入樣式
```javascript
// 在 src/index.js 中
import './assets/scss/all.scss';
```

### 使用變數
```scss
// 在任何 SCSS 文件中
.my-component {
  background-color: $primary-color;
  padding: spacer(3);
  border-radius: $border-radius;
}
```

### 使用混入
```scss
.my-card {
  @include card-style;
  @include button-hover-effect;
}

.my-responsive-text {
  @include media-breakpoint-down(md) {
    font-size: 0.875rem;
  }
}
```

### 使用函數
```scss
.my-element {
  width: rem(320px);      // 轉換為 rem 單位
  color: alpha($blue, 0.8); // 設定透明度
  margin: spacer(2);      // 使用間距函數
}
```

## 📋 變數系統

### 顏色變數
```scss
$primary-color: #007bff;
$success-color: #28a745;
$danger-color: #dc3545;
$warning-color: #ffc107;
$info-color: #17a2b8;
$light-color: #f8f9fa;
$dark-color: #343a40;
```

### 間距變數
```scss
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,  // 0.25rem
  2: $spacer * 0.5,   // 0.5rem
  3: $spacer,         // 1rem
  4: $spacer * 1.5,   // 1.5rem
  5: $spacer * 3,     // 3rem
);
```

### 響應式斷點
```scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

## 🎯 最佳實踐

### 1. 命名規範
- 使用語義化命名：`.upload-zone`, `.report-item`
- 使用 BEM 方法論：`.component__element--modifier`
- 狀態類別：`.is-active`, `.has-error`

### 2. 組織原則
- **Utils 優先**：變數和混入定義在最前面
- **從通用到特定**：layouts → components → pages
- **避免深層嵌套**：最多 3 層嵌套

### 3. 性能考慮
- 避免過度使用 `@extend`
- 優先使用 `@include` 而非 `@extend`
- 合理使用變數，避免重複計算

### 4. 維護建議
- 定期清理未使用的樣式
- 保持一致的縮排和格式
- 添加必要的註釋說明

## 🔧 擴展指南

### 新增組件樣式
1. 在 `components/` 下建立 `_new-component.scss`
2. 在 `all.scss` 中導入：`@import 'components/new-component';`

### 新增頁面樣式
1. 在 `pages/` 下建立 `_new-page.scss`
2. 在 `all.scss` 中導入：`@import 'pages/new-page';`

### 新增變數
1. 在 `utils/_variables.scss` 中定義
2. 使用一致的命名規範
3. 添加註釋說明用途

## 🚨 注意事項

1. **載入順序很重要**：Bootstrap → utils → layouts → components → pages
2. **避免直接修改第三方樣式**：使用 override 的方式
3. **保持響應式**：優先使用 Bootstrap 的工具類別
4. **測試各種螢幕尺寸**：確保樣式在不同裝置上正常顯示

享受使用 SCSS 的強大功能！ 🎉