const KEY = "!";
const FORMAT = "webm";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings: { key: KEY, format: FORMAT } });
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    console.log("Activated", tab);
    chrome.storage.sync.set({ tab });
  });
});

chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    console.log("Updated", tab);
    chrome.storage.sync.set({ tab });
  });
});
