async function initialize() {
  const api_key = await getApiKey();
  const room_id = await getRoomId();
  $("#api_key").val(api_key);
  $("#room_id").val(room_id);
}

function saveOptions() {
  const api_key = $("#api_key").val();
  const room_id = $("#room_id").val();
  setApiKey(api_key);
  setRoomId(room_id);
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