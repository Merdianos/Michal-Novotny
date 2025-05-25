document.querySelectorAll(".project-card").forEach((card) => {
  const images = JSON.parse(card.dataset.images);
  let currentIndex = 0;

  const mainImage = card.querySelector(".project-img");
  const overlay = card.querySelector(".overlay");
  const leftArrow = card.querySelector(".arrow-left");
  const rightArrow = card.querySelector(".arrow-right");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");
  const allCards = document.querySelectorAll(".project-card");
  const downloadButton = card.querySelector(".site-button");
  const projectText = card.querySelector(".project-p");
  const contactButton = document.querySelector(".contact-button");
  const currentImageElement = card.querySelector(".current-image");
  const totalImagesElement = card.querySelector(".total-images");
  const slash = card.querySelector(".slash");
  function showImage(index) {
    mainImage.src = images[index];
    currentIndex = index;
    currentImageElement.textContent = currentIndex + 1;
    totalImagesElement.textContent = images.length;
  }

  let touchStartX = 0;
  let touchEndX = 0;

  mainImage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  mainImage.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    if (!mainImage.classList.contains("scaled")) return;

    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      showImage(currentIndex);
    }
  }
  function toggleScaling(card) {
    const isScaled = mainImage.classList.contains("scaled");
    if (isScaled) {
      allCards.forEach((c) => {
        c.style.visibility = "visible";
        c.style.pointerEvents = "";
      });
    } else {
      allCards.forEach((c) => {
        if (c !== card) {
          c.style.visibility = "hidden";
          c.style.pointerEvents = "none";
        }
      });
    }

    const bodyElement = document.body;
    if (mainImage.classList.contains("scaled")) {
      downloadButton.style.display = "";
      projectText.style.display = "";
      contactButton.style.display = "";
      mainImage.classList.remove("scaled");
      leftArrow.classList.add("hidden-none");
      rightArrow.classList.add("hidden-none");
      currentImageElement.classList.add("hidden-none");
      totalImagesElement.classList.add("hidden-none");
      slash.classList.add("hidden-none");
      footer.classList.remove("hidden-none");
      header.classList.remove("hidden-none");
      bodyElement.classList.remove("scaled-body");
      overlay.style.background = "";
    } else {
      downloadButton.style.display = "none";
      projectText.style.display = "none";
      contactButton.style.display = "none";
      mainImage.classList.add("scaled");
      leftArrow.classList.remove("hidden-none");
      rightArrow.classList.remove("hidden-none");
      currentImageElement.classList.remove("hidden-none");
      totalImagesElement.classList.remove("hidden-none");
      slash.classList.remove("hidden-none");
      footer.classList.add("hidden-none");
      header.classList.add("hidden-none");
      bodyElement.classList.add("scaled-body");
      overlay.style.background = "hsl(240, 17%, 5%)";
    }
  }

  mainImage.addEventListener("click", function () {
    toggleScaling(card);
  });

  document.addEventListener("click", function (event) {
    if (
      mainImage.classList.contains("scaled") &&
      !card.contains(event.target)
    ) {
      toggleScaling();
    }
  });

  leftArrow.addEventListener("click", function (event) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    event.stopPropagation();
  });

  rightArrow.addEventListener("click", function (event) {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    event.stopPropagation();
  });

  document.addEventListener("keydown", function (event) {
    if (!mainImage.classList.contains("scaled")) return;
    if (event.code === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    } else if (event.code === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    } else if (event.code === "Escape") {
      toggleScaling();
    } else if (event.code === "Space") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
  });

  showImage(currentIndex);
});
