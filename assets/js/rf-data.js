/*
 * rf-data.js — 全站 RF 參考數據的「單一資料源」(Single Source of Truth)
 * ------------------------------------------------------------------
 * 頻段、功率、CTCSS、S 表、SWR、緊急頻率等容易在多頁漂移的數據集中在此。
 * 任何 <table class="tbl" data-rf="KEY"> 只要保留表頭列，本檔會自動填入資料列。
 * 法規數字一律以 NCC 最新公告為準（見 SOURCE）。
 */
(function (w) {
  'use strict';

  var SOURCE = 'NCC《業餘無線電管理辦法》附表「業餘無線電分配頻段、發射功率及發射方式一覽表」，以最新公告為準。';

  var RF_DATA = {
    source: SOURCE,

    // 呼叫／緊急救難頻率（107 年起 UHF 由 431 改為 433）
    emergency: { vhf: '145.000', uhf: '433.000', changedNote: '107 年起 UHF 由 431 改為 433' },

    // 三等業餘人員可用頻段
    bands3deg: [
      { band: '6m',        range: '50 ~ 50.15 MHz' },
      { band: 'VHF（2m）',  range: '144 ~ 146 MHz' },
      { band: 'UHF（70cm）', range: '430 ~ 432 MHz' }
    ],

    // 分配頻段與各等級發射功率上限（三等一律 25W 以下）
    powerTable: [
      { range: '50 – 50.15', c1: '1500W 以下', c2: '600W 以下', c3: '25W 以下' },
      { range: '144 – 146',  c1: '200W 以下',  c2: '200W 以下', c3: '25W 以下' },
      { range: '430 – 432',  c1: '200W 以下',  c2: '200W 以下', c3: '25W 以下' }
    ],

    // 隊用頻道：主頻 UHF(430–432)＋備用 VHF(144–146)，12.5kHz 柵格、避開 145.000
    channels: [
      { code: 'F1', primary: '430.250', backup: '145.225' },
      { code: 'F2', primary: '430.500', backup: '145.350' },
      { code: 'F3', primary: '431.500', backup: '145.450' },
      { code: 'F4', primary: '431.750', backup: '145.575' }
    ],

    // CTCSS 38 個 EIA 標準次音頻（Hz）
    ctcss: [
      67.0, 71.9, 74.4, 77.0, 79.7, 82.5, 85.4, 88.5,
      91.5, 94.8, 97.4, 100.0, 103.5, 107.2, 110.9, 114.8,
      118.8, 123.0, 127.3, 131.8, 136.5, 141.3, 146.2, 151.4,
      156.7, 162.2, 167.9, 173.8, 179.9, 186.2, 192.8, 203.5,
      210.7, 218.1, 225.7, 233.6, 241.8, 250.3
    ],

    // S 表（簡化示意值；IARU 標準 VHF/UHF S9=−93dBm、HF S9=−73dBm）
    smeter: [
      { s: 'S1', dbm: '−121 dBm', note: '幾乎聽不到' },
      { s: 'S3', dbm: '−115 dBm', note: '很弱' },
      { s: 'S5', dbm: '−109 dBm', note: '勉強可聽' },
      { s: 'S7', dbm: '−103 dBm', note: '中等清晰' },
      { s: 'S9', dbm: '−97 dBm',  note: '很強' }
    ],

    // SWR 判讀
    swr: [
      { swr: '1.0',     read: '完美匹配（理論值）' },
      { swr: '1.0–1.5', read: '優良（通訊設備標準）' },
      { swr: '1.5–2.0', read: '可接受（輕微損失）' },
      { swr: '2.0–3.0', read: '需調整（10–25% 功率損失）' },
      { swr: '> 3.0',   read: '嚴重問題（天線可能損壞）' },
      { swr: '無限大',   read: '開路（斷線）或短路' }
    ]
  };

  // 每個 data-rf 鍵對應一個「資料列 HTML 產生器」
  var ROW = {
    bands3deg: function (r) { return '<tr><td><b>' + r.band + '</b></td><td><span class="readout">' + r.range + '</span></td></tr>'; },
    powerTable: function (r) { return '<tr><td>' + r.range + '</td><td>' + r.c1 + '</td><td>' + r.c2 + '</td><td>' + r.c3 + '</td></tr>'; },
    channels: function (r) { return '<tr><td><b>' + r.code + '</b></td><td>' + r.primary + '</td><td>' + r.backup + '</td></tr>'; },
    smeter: function (r) { return '<tr><td><b>' + r.s + '</b></td><td><span class="readout">' + r.dbm + '</span></td><td>' + r.note + '</td></tr>'; },
    swr: function (r) { return '<tr><td><span class="readout">' + r.swr + '</span></td><td>' + r.read + '</td></tr>'; }
  };

  function fillTables() {
    var tables = document.querySelectorAll('table[data-rf]');
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      var key = t.getAttribute('data-rf');
      var rows = RF_DATA[key];
      var builder = ROW[key];
      if (!rows || !builder) continue;
      var html = '';
      for (var j = 0; j < rows.length; j++) html += builder(rows[j]);
      // 保留表頭（第一列），其餘以資料源填入
      var header = t.querySelector('tr');
      t.innerHTML = (header ? header.outerHTML : '') + html;
    }
  }

  w.RF_DATA = RF_DATA;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillTables);
  } else {
    fillTables();
  }
})(window);
