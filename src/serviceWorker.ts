// Service Worker (Background Script) for Chrome Extension
// This runs in the background and can handle events, API calls, and message passing

console.log("Service Worker loaded");

// 1. Skapa menyn när extensionen installeras
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-word",
    title: "Translate marked text", // %s byts ut mot markerad text automatiskt
    contexts: ["selection"], // Visa bara menyn när text är markerad
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Info:", info);
  console.log("Tab:", tab);

  //Sending the marked text to the content script
  if (info.menuItemId === "translate-word" && tab?.id) {
    console.log("Sending message", info.selectionText);
    chrome.tabs.sendMessage(tab.id, {
      action: "SHOW_TRANSLATION",
      text: info.selectionText ?? "",
      length: info.selectionText?.length ?? 0,
      
    });
  }
});

// For the future when we need to listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message:", message);
//   console.log("Sender:", sender);
//   console.log("SendResponse:", sendResponse);
// });
