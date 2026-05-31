# 無線電學習站

個人無線電學習資源整合站，包含課程教材、互動工具與模擬器。

## 目錄結構

```
radio-site/
├── index.html              ← 首頁（從這裡進入所有內容）
├── courses/                ← 課程教材
│   ├── basic-radio.html    基礎無線電使用（實機操作 + 考照準備）
│   ├── sdr-advanced.html   SDR 深化課程（RF 理論）
│   └── rf-glossary.html    RF 術語白話手冊
├── tools/                  ← 互動工具（二等業餘無線電）
│   ├── spectrum-viewer.html    業餘頻段互動頻譜
│   ├── modulation-viewer.html  調變方式視覺化
│   ├── circuit-calculator.html 電路計算工具
│   └── callsign-decoder.html   呼號解碼器
├── simulators/             ← 模擬器
│   └── civil-defense.html  民防無線電參數模擬器
└── assets/                 ← 共用資源（設計系統）
    ├── css/style.css        統一設計 token 與元件樣式（暖色學習風）
    ├── js/nav.js            依路徑深度自動注入導覽列與頁尾
    ├── js/rf-data.js        RF 參考數據單一資料源（頻段/功率/CTCSS/S表/SWR）
    └── logo-mark.svg        網站圖示
```

## 新增內容方式

全站共用一份 `assets/css/style.css`（設計 token）與 `assets/js/nav.js`（導覽列）。
新頁面只需三件事即可融入整站樣式與導覽：

1. `<link rel="stylesheet" href="../assets/css/style.css">`
2. 在 `<body>` 頂端加 `<script>window.SITE_SECTION='courses|tools|simulators'</script>`
3. 頁尾載入 `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` 與 `<script src="../assets/js/nav.js"></script>`

接著：
- 新增課程 → 放入 `courses/`，並在 `index.html` 加一張 `.ccard` 卡片
- 新增工具 → 放入 `tools/`，同上
- 新增模擬器 → 放入 `simulators/`，同上

## 部署到 GitHub Pages（免費）

1. 到 [github.com](https://github.com) 登入，點右上角 **+** → **New repository**
2. Repository name 填 `radio-site`（或任何名稱），設為 **Public**，按 **Create**
3. 點 **uploading an existing file**，把這個資料夾內的所有檔案拖曳上去，按 **Commit changes**
4. 進入 **Settings** → **Pages** → Source 選 **Deploy from a branch** → Branch 選 `main` → 按 **Save**
5. 等約 1 分鐘，網址會是：`https://你的帳號.github.io/radio-site/`

## 綁定自訂域名（選用）

1. 在 `radio-site/` 根目錄新增一個檔案叫 `CNAME`，內容只寫你的域名，例如：
   ```
   radio.yourdomain.tw
   ```
2. 到域名註冊商（如網易資訊）的 DNS 設定，新增一筆 CNAME 記錄：
   - Name: `radio`（或 `@` 代表根域名）
   - Value: `你的帳號.github.io`
3. GitHub Pages Settings → Custom domain 填入你的域名

## 技術說明

- 純靜態 HTML/CSS/JS，無後端，無資料庫，無建置步驟
- 統一暖色設計系統：所有頁面共用 `assets/css/style.css` 的 token 與元件
- 外部依賴：Google Fonts（字型）、Lucide CDN（線條圖示）；移除後即可完全離線
