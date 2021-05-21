const MP3_URL = "https://www.yt-download.org/api/widget/mp3/";
const MP4_URL = "https://www.yt-download.org/api/widget/videos/";
const MKV_WEBM_URL = "https://www.yt-download.org/api/widget/merged/";

let modalBody = `
<div class="download_modal_paramaters">
    <h1 class="download_modal_title">
    Fast <span class="red">YTD</span></h1>
      <div>
        <label for="url">URL:</label>
        <input type="url" name="url" id="url" disabled />
      </div>
      <div>
        <label for="format">Download Format:</label>
        <select name="modal__format" id="modal__format">
          <option value="mp3">mp3</option>
          <option value="mp4">mp4</option>
          <option value="webm">webm</option>
          <option value="mkv">mkv</option>
        </select>
      </div>
      <div class="modal__controls">
        <button id="convert">Convert Video</button>
        <button class="modal__cancel" id="cancel">Cancel</button>
      </div>
    </div>`;

const errorMessageHtml = "<p>There is no Video in this page</p>";
const loadingHtml = `
<div class="download_modal_paramaters">
    <p class='modal_loading_message'>Converting the Video... </p>
    <div class="loading__animation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
`;

window.onkeypress = (e) => {
  chrome.storage.sync.get("settings", ({ settings }) => {
    if (e.key === settings.key) {
      openModal();
    }
  });
};

const openModal = async () => {
  const downloadModal = document.createElement("div");
  const pageUrl = window.location.href;

  downloadModal.getAttribute;
  downloadModal.className = "download__modal";
  downloadModal.innerHTML = modalBody;
  document.body.append(downloadModal);

  if (pageUrl.search(/watch\?v=/g) === -1) {
    updateModalBody(downloadModal, errorMessageHtml);
    return;
  }
  // set Default Format
  const formatInput = downloadModal.querySelector("#modal__format");
  chrome.storage.sync.get(
    "settings",
    ({ settings }) => (formatInput.value = settings.format)
  );

  // Set Video Url
  const urlInput = downloadModal.querySelector("#url");
  urlInput.value = pageUrl;

  //
  const cancelBtn = downloadModal.querySelector("#cancel");
  setCloseModalEventListener(cancelBtn, downloadModal);

  //
  const convertBtn = downloadModal.querySelector("#convert");
  convertBtn.addEventListener("click", async () => {
    const format = downloadModal.querySelector("#modal__format").value;
    updateModalBody(downloadModal, loadingHtml);
    const data = await fetchDownloadData(format);
    let html = `
<div>
    <h2>${data.video.title}</h2>
    <img src="${data.video.imgUrl}" />
    <div>
        ${data.video.links.map((l) => {
          return `<a href="${l.link}"
            >${l.quality}/${l.size}</a
        >`;
        })}
    </div>
</div>
    `;
    updateModalBody(downloadModal, html);
  });
};

const setCloseModalEventListener = (cancelBtn, downloadModal) => {
  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(downloadModal);
  });
};

const textToHtml = (text) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");
  return doc.body;
};

const fetchDownloadData = async (format) => {
  const videoId = window.location.href.replace(
    "https://www.youtube.com/watch?v=",
    ""
  );
  let url;
  if (format === "mp3") {
    url = MP3_URL + videoId;
  }
  if (format === "mp4") {
    url = MP4_URL + videoId;
  }
  if (format === "mkv" || format === "webm") {
    url = MKV_WEBM_URL + videoId;
  }

  const result = await fetch(url)
    .then((res) => res.text())
    .then((text) => {
      let data = [];
      const html = textToHtml(text);
      const title = html.getElementsByClassName(
        "text-lg text-teal-600 font-bold m-2 text-center"
      )[0].innerText;
      const imgUrl = html
        .getElementsByClassName("rounded-full")[0]
        .getAttribute("src");

      let videoData = {
        video: {
          title,
          imgUrl,
          links: [],
        },
      };

      let btns = html.querySelectorAll(".text-white");
      if (format === "mkv" || format === "webm") {
        btns = [...btns].filter((btn) => btn.children[0].innerText === format);
      }
      btns.forEach((a) => {
        const link = a.getAttribute("href");
        const quality = a.children[1].innerText.trim();
        const size = a.children[3].innerText.trim();
        data.push({ link, quality, size });
      });

      videoData.video.links = data;
      return videoData;
    });
  console.log(result);
  return result;
};

const updateModalBody = (container, html) => {
  container.innerHTML = html;
};
