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

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("Info:", info);
  console.log("Tab:", tab);

  //Sending the marked text to the content script
  if (info.menuItemId === "translate-word" && tab?.id) {
    console.log("Sending message", info.selectionText);
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "SHOW_TRANSLATION",
      text: info.selectionText,
    });
    console.log("Response:", response);
  }
});
