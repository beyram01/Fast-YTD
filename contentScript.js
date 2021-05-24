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
          <div id="qrcode"></div>
          </div>`;

const errorMessageHtml = ` <div class='error__container'>
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0C31.046 0 40 8.956 40 20C40 31.044 31.046 40 20 40C8.954 40 0 31.044 0 20C0 8.956 8.954 0 20 0ZM20 3.334C10.81 3.334 3.334 10.81 3.334 20C3.334 29.19 10.81 36.666 20 36.666C29.19 36.666 36.666 29.19 36.666 20C36.666 10.81 29.19 3.334 20 3.334ZM19.998 25.004C20.5279 25.004 21.0361 25.2145 21.4108 25.5892C21.7855 25.9639 21.996 26.4721 21.996 27.002C21.996 27.5319 21.7855 28.0401 21.4108 28.4148C21.0361 28.7895 20.5279 29 19.998 29C19.4681 29 18.9599 28.7895 18.5852 28.4148C18.2105 28.0401 18 27.5319 18 27.002C18 26.4721 18.2105 25.9639 18.5852 25.5892C18.9599 25.2145 19.4681 25.004 19.998 25.004ZM19.988 10C20.3508 9.99953 20.7015 10.1306 20.9751 10.3689C21.2487 10.6072 21.4267 10.9366 21.476 11.296L21.49 11.498L21.498 20.502C21.4984 20.8822 21.3544 21.2484 21.0951 21.5265C20.8358 21.8046 20.4806 21.9738 20.1012 22C19.7219 22.0262 19.3468 21.9073 19.0518 21.6675C18.7568 21.4276 18.5638 21.0847 18.512 20.708L18.498 20.504L18.49 11.502C18.4897 11.3048 18.5283 11.1096 18.6036 10.9274C18.6789 10.7451 18.7893 10.5795 18.9286 10.44C19.0679 10.3005 19.2334 10.1899 19.4155 10.1144C19.5976 10.0389 19.7928 10 19.99 10H19.988Z"/>
    </svg>
    <p>There is no Video in this page</p>
    <button id="exit">Close</button>
 </div>`;
const errorHtml = ` <div class='error__container'>
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0C31.046 0 40 8.956 40 20C40 31.044 31.046 40 20 40C8.954 40 0 31.044 0 20C0 8.956 8.954 0 20 0ZM20 3.334C10.81 3.334 3.334 10.81 3.334 20C3.334 29.19 10.81 36.666 20 36.666C29.19 36.666 36.666 29.19 36.666 20C36.666 10.81 29.19 3.334 20 3.334ZM19.998 25.004C20.5279 25.004 21.0361 25.2145 21.4108 25.5892C21.7855 25.9639 21.996 26.4721 21.996 27.002C21.996 27.5319 21.7855 28.0401 21.4108 28.4148C21.0361 28.7895 20.5279 29 19.998 29C19.4681 29 18.9599 28.7895 18.5852 28.4148C18.2105 28.0401 18 27.5319 18 27.002C18 26.4721 18.2105 25.9639 18.5852 25.5892C18.9599 25.2145 19.4681 25.004 19.998 25.004ZM19.988 10C20.3508 9.99953 20.7015 10.1306 20.9751 10.3689C21.2487 10.6072 21.4267 10.9366 21.476 11.296L21.49 11.498L21.498 20.502C21.4984 20.8822 21.3544 21.2484 21.0951 21.5265C20.8358 21.8046 20.4806 21.9738 20.1012 22C19.7219 22.0262 19.3468 21.9073 19.0518 21.6675C18.7568 21.4276 18.5638 21.0847 18.512 20.708L18.498 20.504L18.49 11.502C18.4897 11.3048 18.5283 11.1096 18.6036 10.9274C18.6789 10.7451 18.7893 10.5795 18.9286 10.44C19.0679 10.3005 19.2334 10.1899 19.4155 10.1144C19.5976 10.0389 19.7928 10 19.99 10H19.988Z"/>
    </svg>
    <p>An error has been occured</p>
    <button id="exit">Close</button>
 </div>`;
const loadingHtml = `
          <div class="loading__container">
            <p class='modal_loading_message'>Converting the Video... </p>
            <div class="loading__animation">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
`;

const injectFonts = () => {
  const firstLink = document.createElement("link");
  const secondLink = document.createElement("link");
  firstLink.setAttribute("rel", "preconnect");
  firstLink.setAttribute("href", "https://fonts.gstatic.com");
  secondLink.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap"
  );
  secondLink.setAttribute("rel", "stylesheet");
  document.head.append(firstLink);
  document.head.append(secondLink);
};

injectFonts();

window.onkeypress = (e) => {
  chrome.storage.sync.get("settings", ({ settings }) => {
    if (e.key === settings.key) {
      const modelOpened = document.querySelector(".download__modal");
      if (!modelOpened) openModal();
    }
  });
};

const openModal = async () => {
  const downloadModal = document.createElement("div");
  try {
    const pageUrl = window.location.href;

    // downloadModal.getAttribute;
    downloadModal.className = "download__modal";
    downloadModal.innerHTML = modalBody;
    document.body.append(downloadModal);

    if (pageUrl.search(/watch\?v=/g) === -1) {
      updateModalBody(downloadModal, errorMessageHtml);

      const exitBtn = downloadModal.querySelector("#exit");
      setCloseModalEventListener(exitBtn, downloadModal);

      return;
    }
    // set Default Format
    const formatInput = downloadModal.querySelector("#modal__format");
    if (formatInput) {
      chrome.storage.sync.get(
        "settings",
        ({ settings }) => (formatInput.value = settings.format)
      );
    }

    // Set Video Url
    const urlInput = downloadModal.querySelector("#url");
    if (urlInput) {
      urlInput.value = pageUrl;
    }

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
<div class="downloader__container">
  <h1 class="download_modal_title">
  Fast <span class="red">YTD</span>
  </h1>
  <div class="video__info">
      <img src="${data.video.imgUrl}" />
      <div>
          <h2>${data.video.title}</h2>
          <div class="ytd__download__links"></div>
      </div>
  </div>
  <button class="downloader__container__exit" id="exit">Close</button>
</div>
    `;
      updateModalBody(downloadModal, html);

      const linksContainer = downloadModal.querySelector(
        ".ytd__download__links"
      );
      data.video.links.forEach((l) => {
        linksContainer.innerHTML += `<a href="${l.link}">${l.quality}/${l.size}</a>`;
      });

      const clBtn = downloadModal.querySelector("#exit");
      setCloseModalEventListener(clBtn, downloadModal);
    });
  } catch (error) {
    updateModalBody(downloadModal, errorHtml);
    console.log(error);

    const cBtn = downloadModal.querySelector("#exit");
    setCloseModalEventListener(cBtn, downloadModal);
  }
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
  return result;
};

const updateModalBody = (container, html) => {
  container.innerHTML = html;
};
