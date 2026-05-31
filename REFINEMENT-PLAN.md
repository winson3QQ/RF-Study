# 內容整合精進計劃（RF 專業審查）

本文件記錄 RF 專業審查後的修正與整合精進排程。法規數字一律以 **NCC 最新公告**為準。

## 查證基準（NCC 來源）

| 項目 | 結論 | 來源 |
|---|---|---|
| 三等可用頻段 | VHF **144–146 MHz**、UHF **430–432 MHz**、6m 50–50.15 MHz | NCC《業餘無線電管理辦法》附表 |
| 三等發射功率上限 | 各頻段 **25W 以下** | 同上 |
| 一/二等功率（2m·70cm） | 200W 以下 | 同上 |
| UHF 緊急/呼叫頻率 | **433 MHz**（107 年起由 431 改為 433），VHF 為 145 MHz | NCC 公告 |

來源連結：
- NCC《業餘無線電管理辦法》附表 — https://www.6laws.net/6law/law2/業餘無線電管理辦法附表.pdf
- 業餘無線電管理辦法 — https://www.ncc.gov.tw/chinese/law_detail.aspx?site_content_sn=192&law_sn=938
- 全國法規資料庫 — https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=K0060145
- 業餘無線射頻電機技術規範條文 — https://ncclaw.ncc.gov.tw/FLAW/FLAWDOC01.aspx?id=FL094236&flno=4

> 註：6m 一/二等功率值（1500/600W）沿用站內原值，屬不同版本附表，已加「以 NCC 最新公告為準」附註，待正式附表逐欄核對後再定。

---

## Phase 1 — 紅/橙問題修正 ✅（本次完成）

1. **頻段一致性（紅）**：UHF 三等統一為 430–432 MHz（修正操作篇 432–440、考照篇 432–433 的矛盾）；VHF 修正手冊 144–148→144–146；頻道數計算同步重算（80/160）。
2. **F1–F4 頻道重新設計**：全部落在三等合法範圍、對齊 12.5 kHz 柵格、避開 145.000 緊急頻率；主頻 UHF＋備用 VHF（跨頻段備援）。
3. **FM 調制指數 β 推導（紅）**：更正「β≈3 為窄帶 FM」「β 越大越穩定」的錯誤；改述 CTCSS 為低偏移疊加音、可靠性來自窄帶濾波＋連續音判別。
4. **「五九」定義（紅）**：更正為 RST 制「可讀度 R5 ＋ 信號強度 S9」，非「S5、S9 取最高」。
5. **S 表 dBm（橙）**：標註為簡化示意值，附 IARU 標準（VHF S9=−93dBm、HF S9=−73dBm）。
6. **情境6 標籤（橙）**：RSSI→距離加「僅供量級參考」；捕捉效應 6dB 註明為保守教學門檻（實機 1–3dB）。
7. **來源標註**：功率表、頻段、緊急頻率加上 NCC 出處與「以最新公告為準」。

## Phase 2 — 單一資料源（Single Source of Truth）✅（完成）

- 已建 `assets/js/rf-data.js`，集中存放頻段、功率、CTCSS 38 碼、S 表、SWR、緊急頻率、F1–F4 頻道。
- 任何 `<table class="tbl" data-rf="KEY">` 只需保留表頭，資料列由模組自動填入。
- 已套用：basic-radio（channels／bands3deg／powerTable）、rf-glossary（smeter／swr）。
- 站本即硬依賴 JS（nav.js／分頁／搜尋），故此法與既有架構一致。

## Phase 3 — 交叉連結（手冊 ↔ 課程 ↔ 工具）✅（完成）

- 兩課程加入 **hash 深連結**：`sdr-advanced.html#p1`、`basic-radio.html#exam` 可直接開啟對應分頁。
- 手冊「情境N」標籤自動轉為連結 → SDR 課程對應情境（單一 script，免逐卡改）。
- 手冊相關術語卡加「延伸互動工具」連結：SWR→swr-visualizer、超外差→superhet-receiver、CTCSS→民防模擬器、干擾→interference-diagnosis、電離層→ionosphere-viewer。
- SDR 課程反向連回手冊：情境1→`#ctcss`、情境5→`#wavelength`。

## Phase 4 — 用詞與標註制度化 ✅（課程部分完成）

- 統一用詞：調制→**調變**（41:9）、次音→**亞音**、課程內鑑相器→**鑑別器**（FM 解調正確用詞）。
- 三級標註制度化：於 SDR 課程導讀新增「事實／推論／量級參考」標註約定說明。
- FRS 段落在地化：改為「免照低功率對講機」，不再把美規 0.5W／14 頻道當台灣事實，並指向 NCC 規格。
- 註：`tools/superhet-receiver.html` 仍有「鑑相器」用詞，將於 Phase 5 工具審查時一併校正。

## Phase 5 — 互動工具深度查核 ✅（完成）

逐一檢查工具計算邏輯，結果：

**正確、無需修改**
- `swr-visualizer`：SWR=Z_L/Z_0、Γ=|（Z_L−Z_0）/（Z_L+Z_0）|、反射功率=Γ² ✓
- `superhet-receiver`：IF=|RF−LO|、鏡像=RF+2·IF、dBi=dBd+2.15 ✓
- `circuit-calculator`：V=IR、P=VI=I²R=V²/R、PEP=Vpk²/2R、PEP=Vpp²/(8·50) ✓
- `rf-safety`：遠場 d=√(P·G/4πS) ✓（MPE 限值為簡化值）
- `ionosphere-viewer`：E 一跳≈1920km、F2 一跳≈4000km、MUF/LUF 概念 ✓
- `civil-defense` 模擬器：145.500 主頻、+600kHz 中繼、CTCSS 67/88.5/110.9/131.8 與課程一致 ✓
- `power-circuit`：半波 PIV=2Vpk、橋式 PIV=Vpk ✓

**已修正**
- `power-circuit`：全波「中心抽頭」PIV 原標「等於峰值」→ 更正為 **2 倍峰值**（橋式才是 1 倍）。
- `rf-glossary` PIV 卡：原把「全波/橋式」並列為 1 倍 → 區分中心抽頭(2倍)與橋式(1倍)。
- `superhet-receiver`：鑑相器 → 鑑別器（用詞統一，FM 解調正確用詞）。

**重要：回頭修正 Phase 1 的過度限縮**
- `spectrum-viewer` 內含對 NCC 附表的完整轉寫，顯示 70cm **下段 430–432 與上段 432–440 對三等皆開放（25W）**。
- 據此將三等 UHF 由 Phase 1 暫定的 430–432 **更正為 430–440**，並同步 `rf-data.js`／basic-radio／glossary，使全站與 spectrum-viewer 一致。
