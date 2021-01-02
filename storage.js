async function getActive() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get({ "active": false }, function (items) {
      resolve(items.active);
    })
  });
}

function setActive(active) {
  chrome.storage.local.set({ active });
}

async function getApiKey() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get({ "api_key": null }, function (items) {
      resolve(items.api_key);
    })
  });
}

function setApiKey(api_key) {
  chrome.storage.local.set({ api_key });
}

async function getRoomId() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get({ "room_id": null }, function (items) {
      resolve(items.room_id);
    })
  });
}

function setRoomId(room_id) {
  chrome.storage.local.set({ room_id });
}

