async function sendMessageToChatwork(message, sender, sendResponse) {
  const api_key = await getApiKey();
  const room_id = await getRoomId();
  const url = "https://api.chatwork.com/v2/rooms/" + room_id + "/messages";
  const param = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "X-ChatWorkToken": api_key
    },
    body: `body=${message}`
  };

  fetch(url, param)
    .then((res) => {
      if (!res.ok) {
        sendResponse(`http status: ${res.status}`);
        return res.json().then(json => { throw json; });
      }
      return res.json();
    })
    .then((json) => sendResponse(json))
    .catch((err) => {
      console.log(err);
      alert(err.errors.join("\n"));
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  sendMessageToChatwork(message, sender, sendResponse);
  return true;
});