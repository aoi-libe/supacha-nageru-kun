async function sendMessageToChatwork(message, sender, sendResponse) {
  const apiKey = await getApiKey();
  const roomId = await getRoomId();
  const url = "https://api.chatwork.com/v2/rooms/" + roomId + "/messages";
  const params = new URLSearchParams();
  params.append("body", message);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "X-ChatWorkToken": apiKey
    },
    body: params
  };

  fetch(url, options)
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