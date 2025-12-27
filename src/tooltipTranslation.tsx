(function registerMessageListener() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "SHOW_TRANSLATION") {
      console.log("Message received in content script:", message);

      console.log("Sending response to service worker");
      sendResponse({ text: "Translation response" });

      // Return true to keep the message channel open for async operations
      return true;
    }
  });
  console.log("Content script loaded - message listener registered");
})();

export function TooltipTranslation() {
  return <div>TooltipTranslation</div>;
}
