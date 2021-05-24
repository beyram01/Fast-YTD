const keyInput = document.getElementById("key");
const formatInput = document.getElementById("format");
const saveButton = document.getElementById("save__settings");

chrome.storage.sync.get("settings", ({ settings }) => {
  keyInput.value = settings.key;
  formatInput.value = settings.format;
});

saveButton.setAttribute("disabled", "true");

keyInput.addEventListener("keypress", () => {
  saveButton.removeAttribute("disabled");
});

formatInput.addEventListener("change", () => {
  saveButton.removeAttribute("disabled");
});

saveButton.addEventListener("click", () => {
  if (keyInput.value.length > 1) {
    keyInput.className = "error";
  } else {
    keyInput.className = "";
    updateSettings();
    saveButton.innerHTML = "Saved &#x1F44C;";
    setTimeout(() => {
      saveButton.innerText = "Save";
    }, 2000);
  }
});

const updateSettings = () => {
  chrome.storage.sync.set({
    settings: { key: keyInput.value, format: formatInput.value },
  });
};
