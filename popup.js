async function initialize() {
  const active = await getActive();
  refreshButton(active);
  refreshBadge(active)
}

async function toggle() {
  const active = await getActive();
  refreshButton(!active);
  setActive(!active);
  refreshBadge(!active)
}

function refreshButton(active) {
  const $switch = $("#switch");
  if (active) {
    $switch.text("稼働中").addClass("active");
  } else {
    $switch.text("スタート").removeClass("active");
  }
}

function sendTestMessage() {
  chrome.runtime.sendMessage("(スパチャなげる君 テスト送信)", function (response) {
    console.log("res:", response)
  });
}

$(function () {
  initialize();
  $("#switch").on("click", toggle);
  $("#test").on("click", sendTestMessage);
});