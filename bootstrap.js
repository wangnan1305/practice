// bootstrap 的版本號
var ver = "3";

// 本 bootstrap script 的主要內容
(function() {
  var span = document.createElement('span');
  span.innerHTML = "我嵌入了一段 bootstrap script，目前版本是第 " + ver + " 版。";
  var script = document.getElementsByTagName('script')[0];
  script.parentNode.insertBefore(span, script);
})();

// 功能新增非同步的 script 载入方法
function insertScript(url) {
  var s1 = document.createElement("script");
  s1.src = url;
  var s0 = document.getElementsByTagName("script")[0];
  s0.parentNode.insertBefore(s1, s0);
}

// 發送通知
// ---
// 若 bootstrap.js 有更新版本，則會透過插入的這段 script，將 cache 中的舊版覆蓋掉 (於 beacon.php 實作)
function sendBeacon() {
  // 必須傳回 bootstrap script 的版本號
  insertScript("http://labs.patw.idv.tw/selfupdating/beacon.php?v=" + ver + "&t=" + Number(new Date()));
}

// 這段是為了只在嵌入 bootstrap script 的頁面中執行 sendBeacon，而不在 update.php 中也執行
if ( "undefined" != typeof(cmdQ) && cmdQ.length && cmdQ[0] === 'sendBeacon' ) {
  cmdQ = [];  // clear out the commands
  sendBeacon();
}
