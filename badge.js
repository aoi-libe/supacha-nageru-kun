function refreshBadge(active) {
  if (active) {
    chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 100]});
    chrome.browserAction.setBadgeText({text: "稼働中"});
  } else {
    chrome.browserAction.setBadgeText({text: ""});
  }
}