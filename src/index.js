import leftArrowImg from "./chevron-left.svg";
import rightArrowImg from "./chevron-right.svg";

function createSlidesSkeleton() {
  const containerFrame = document.createElement("div");
  const topSection = document.createElement("div");
  const currentImageIndex = document.createElement("div");
  const changeImageArrowsHolder = document.createElement("div");

  containerFrame.className = "containerFrame";
  topSection.className = "carouselTop";
  currentImageIndex.className = "carouselImageIndexHolder"; // holds the circles that show what image number is displaying in the index.

  topSection.style.display = "flex";
  topSection.style.flex = 4;
  topSection.style.alignItems = "center";
  topSection.appendChild(changeImageArrowsHolder);

  changeImageArrowsHolder.style.width = "100%";
  changeImageArrowsHolder.style.height = "15%";
  changeImageArrowsHolder.style.display = "flex";
  const leftArrow = new Image();
  const rightArrow = new Image();
  leftArrow.src = leftArrowImg;
  rightArrow.src = rightArrowImg;
  leftArrow.style.height = "4rem";
  leftArrow.style.marginRight = "auto";
  rightArrow.style.height = "4rem";
  changeImageArrowsHolder.append(leftArrow, rightArrow);

  containerFrame.style.display = "flex";
  containerFrame.style.flex = 1;
  containerFrame.style.flexDirection = "column";
  containerFrame.style.backgroundSize = "cover";

  currentImageIndex.style.flex = 1;
  currentImageIndex.style.display = "flex"; // to center all circles
  currentImageIndex.style.justifyContent = "center";
  currentImageIndex.style.alignItems = "center";
  currentImageIndex.style.gap = "1rem";

  containerFrame.append(topSection, currentImageIndex);
  return containerFrame;
}

function currentImageCircle(numOfImages, index, carouselSkeleton) {
  const currentIndexContainer = carouselSkeleton.firstChild.nextSibling;
  while (currentIndexContainer.firstChild !== null) {
    currentIndexContainer.firstChild.remove();
  }
  for (let x = 0; x < numOfImages + 1; x += 1) {
    const circle = document.createElement("div");
    circle.dataset.index = x.toString();
    circle.style.border = "1px solid white";
    circle.style.borderRadius = "50%";
    circle.style.height = "1rem";
    circle.style.width = "1rem";
    currentIndexContainer.appendChild(circle);

    if (circle.dataset.index === index.toString()) {
      circle.style.backgroundColor = "white";
    }
  }
}

let currentlySelectedIndex = 0; // will store number of currently selected image's index

function changeImage(carouselSkeleton, images) {
  let buttonClicked = false;
  let timer;
  const carouselFrame = carouselSkeleton;
  const numOfImages = images.length - 1;
  const leftButton = carouselFrame.firstChild.firstChild.firstChild;
  const rightButton =
    carouselFrame.firstChild.firstChild.firstChild.nextSibling;

  leftButton.onclick = () => {
    clearTimeout(timer);
    if (currentlySelectedIndex === 0) {
      currentlySelectedIndex = numOfImages;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      currentImageCircle(numOfImages, currentlySelectedIndex, carouselFrame);
      changeImage(carouselFrame, images);
    } else {
      currentlySelectedIndex -= 1;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      currentImageCircle(numOfImages, currentlySelectedIndex, carouselFrame);
      changeImage(carouselFrame, images);
    }
    buttonClicked = true;
  };

  rightButton.onclick = () => {
    clearTimeout(timer);
    if (currentlySelectedIndex === numOfImages) {
      currentlySelectedIndex = 0;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      currentImageCircle(numOfImages, currentlySelectedIndex, carouselFrame);
      changeImage(carouselFrame, images);
    } else {
      currentlySelectedIndex += 1;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      currentImageCircle(numOfImages, currentlySelectedIndex, carouselFrame);
      changeImage(carouselFrame, images);
    }
    buttonClicked = true;
  };

  timer = setTimeout(() => {
    if (buttonClicked === false) {
      if (currentlySelectedIndex === numOfImages) {
        currentlySelectedIndex = 0;
        carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
        currentImageCircle(numOfImages, currentlySelectedIndex, carouselFrame);
        changeImage(carouselFrame, images);
      } else {
        currentlySelectedIndex += 1;
        carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
        currentImageCircle(numOfImages, currentlySelectedIndex, carouselFrame);
        changeImage(carouselFrame, images);
      }
    }

    // changeImage(carouselFrame, images);
  }, 5000);
}

function carouselFunctionality(carouselSkeleton, images, elementToAppendTo) {
  const carouselFrame = carouselSkeleton;

  // set initial image
  carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
  elementToAppendTo.appendChild(carouselFrame);
  currentImageCircle(images.length - 1, currentlySelectedIndex, carouselFrame);
  changeImage(carouselFrame, images);
}

export default function createCarousel(images, elementToAppendTo) {
  // images is an array of images.
  const carouselSkeleton = createSlidesSkeleton();

  carouselFunctionality(carouselSkeleton, images, elementToAppendTo);
}
