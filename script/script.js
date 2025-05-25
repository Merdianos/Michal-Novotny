const langButton = document.querySelectorAll("#langButton");
const pageContainer = document.querySelector(".page-container");
const overlay = document.querySelector(".start-overlay");
const bar = document.querySelector(".burger-icon");
const cancel = document.querySelector(".close-icon");
const mHeader = document.querySelector(".header-mobile");
let isFirstTime = true;
if (langButton != null) {
  langButton.forEach((lang) => {
    lang.addEventListener("click", (e) => {
      switchLanguage();
    });
  });
} else {
}
function switchLanguage() {
  location.reload();
  currentLang = currentLang === "cz" ? "en" : "cz";
  localStorage.setItem("lang", currentLang);
  updateText();
}

let currentLang = localStorage.getItem("lang");
window.addEventListener("load", (e) => {
  updateText();
});

function updateText() {
  let currentLang = localStorage.getItem("lang");
  if (currentLang === "cz") {
    const elements = document.querySelectorAll("[data-cz][data-en]");
    elements.forEach((el) => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.placeholder = el.dataset[currentLang];
      } else {
        el.textContent = el.dataset[currentLang];
      }
    });
    localStorage.setItem("lang", currentLang);
  } else if (currentLang === "en") {
    const elements = document.querySelectorAll("[data-cz][data-en]");
    elements.forEach((el) => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.placeholder = el.dataset[currentLang];
      } else {
        el.textContent = el.dataset[currentLang];
      }
    });
    localStorage.setItem("lang", currentLang);
  } else {
    currentLang === "en";
  }
}

function addLoadingClass() {
  overlay.classList.add("loading");
}

function removeLoadingClass() {
  overlay.classList.remove("loading");
}

function toggleTransitionDuration() {
  if (isFirstTime) {
    overlay.style.transitionDuration = "0.4s";
    isFirstTime = false;
  } else {
    overlay.style.transitionDuration = "0.4s";
  }
}

setTimeout(function () {
  addLoadingClass();
  toggleTransitionDuration();
}, 10);

setTimeout(function () {
  removeLoadingClass();
  overlay.classList.add("loaded");
  toggleTransitionDuration();
  pageContainer.classList.remove("hidden-none");
}, 1000);

bar.addEventListener("click", (e) => {
  bar.classList.add("hidden-none");
  cancel.classList.remove("hidden-none");
  mHeader.classList.remove("hidden");
  mHeader.classList.add("visible");
});
cancel.addEventListener("click", (e) => {
  cancel.classList.add("hidden-none");
  bar.classList.remove("hidden-none");
  mHeader.classList.remove("visible");
  mHeader.classList.add("hidden");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    cancel.classList.add("hidden-none");
    bar.classList.remove("hidden-none");
    mHeader.classList.remove("visible");
    mHeader.classList.add("hidden");
  }
});
