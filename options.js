async function initialize() {
  const apiKey = await getApiKey();
  const roomId = await getRoomId();
  $("#api_key").val(apiKey);
  $("#room_id").val(roomId);
}

function saveOptions() {
  const apiKey = $("#api_key").val();
  const roomId = $("#room_id").val();
  setApiKey(apiKey);
  setRoomId(roomId);
  // 保存できたら、画面にメッセージを表示(1秒だけ)
  $("#status").text("Options saved.");
  setTimeout(function () {
    $("#status").text('');
  }, 1000);
}

$(function () {
  initialize();
  $('#save').on("click", saveOptions);
});