// 処理中のメッセージIDを管理
const processingSet = new Set();
// Chatwork連携済みのメッセージIDを管理
const postedSet= new Set();

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
    const amount = $target.find("#purchase-amount").text();
    const text = $target.find("#message").text();
    if (processingSet.has(id) || postedSet.has(id)) {
      return;
    }
    processingSet.add(id);
    send(
      $target,
      id,
      name,
      amount,
      text
    );
  });
  // Super Stickers
  $iframe.find("yt-live-chat-paid-sticker-renderer").each(function (index, element) {
    const $target = $(element);
    const id = $target.prop("id");
    const name = $target.find("#author-name").text();
    const amount = $target.find("#purchase-amount-chip").text();
    const text = "";
    if (processingSet.has(id) || postedSet.has(id)) {
      return;
    }
    processingSet.add(id);
    send(
      $target,
      id,
      name,
      amount,
      text
    );
  });
}

function send($target, id, name, amount, text) {
  const message = `[info][title]${name}[/title]${amount}\n\n${text}[/info]`;
  chrome.runtime.sendMessage(message, (response) => {
    processingSet.delete(id);
    if (response.message_id) {
      postedSet.add(id);
    }
    console.log(response)
  });
}

$(function () {
  setInterval("main()", 1500);
});
