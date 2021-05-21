const keyInput = document.getElementById("key");
const formatInput = document.getElementById("format");
const saveButton = document.getElementById("save__settings");

chrome.storage.sync.get("settings", ({ settings }) => {
  keyInput.value = settings.key;
  formatInput.value = settings.format;
});

saveButton.addEventListener("click", () => {
  updateSettings();
});

const updateSettings = () => {
  chrome.storage.sync.set({
    settings: { key: keyInput.value, format: formatInput.value },
  });
};
