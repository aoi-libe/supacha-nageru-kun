// 処理中のメッセージIDを管理
const processing_set = new Set();
// Chatwork連携済みのメッセージIDを管理
const posted_set = new Set();

async function main() {
  const active = await getActive();
  if (!active) {
    return;
  }

  const $iframe = $("iframe#chatframe").contents();
  // Super Chat
  $iframe.find("yt-live-chat-paid-message-renderer").each(function (index, element) {
    const $target = $(element);
    const id = $target.prop("id");
    const name = $target.find("#author-name").text();
    const purchase_amount = $target.find("#purchase-amount").text();
    const text = $target.find("#message").text();
    if (processing_set.has(id) || posted_set.has(id)) {
      return;
    }
    processing_set.add(id);
    send(
      $target,
      id,
      encodeURI(name),
      encodeURI(purchase_amount),
      encodeURI(text)
    );
  });
  // Super Stickers
  $iframe.find("yt-live-chat-paid-sticker-renderer").each(function (index, element) {
    const $target = $(element);
    const id = $target.prop("id");
    const name = $target.find("#author-name").text();
    const purchase_amount = $target.find("#purchase-amount-chip").text();
    const text = "";
    if (processing_set.has(id) || posted_set.has(id)) {
      return;
    }
    processing_set.add(id);
    send(
      $target,
      id,
      encodeURI(name),
      encodeURI(purchase_amount),
      encodeURI(text)
    );
  });
}

function send($target, id, name, purchase_amount, text) {
  const message = `[info][title]${name}[/title]${purchase_amount}\n\n${text}[/info]`;
  chrome.runtime.sendMessage(message, (response) => {
    processing_set.delete(id);
    if (response.message_id) {
      posted_set.add(id);
    }
    console.log(response)
  });
}

$(function () {
  setInterval("main()", 1500);
});
