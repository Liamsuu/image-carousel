import "./index.css";
import sandImage from "./pexels-marcelo-gonzalez-1141370437-20923044.jpg";
import happyLadyImage from "./pexels-olly-789822.jpg";
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

  containerFrame.append(topSection, currentImageIndex);
  return containerFrame;
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
      changeImage(carouselFrame, images);
    } else {
      currentlySelectedIndex -= 1;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      changeImage(carouselFrame, images);
    }
    buttonClicked = true;
  };

  rightButton.onclick = () => {
    clearTimeout(timer);
    if (currentlySelectedIndex === numOfImages) {
      currentlySelectedIndex = 0;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      changeImage(carouselFrame, images);
    } else {
      currentlySelectedIndex += 1;
      carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
      changeImage(carouselFrame, images);
    }
    buttonClicked = true;
  };

  timer = setTimeout(() => {
    if (buttonClicked === false) {
      if (currentlySelectedIndex === numOfImages) {
        currentlySelectedIndex = 0;
        carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
        changeImage(carouselFrame, images); // might need to remove
      } else {
        currentlySelectedIndex += 1;
        carouselFrame.style.backgroundImage = `url(${images[currentlySelectedIndex].src})`;
        changeImage(carouselFrame, images); // might need to remove
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
  changeImage(carouselFrame, images);
}

export default function createCarousel(images, elementToAppendTo) {
  // images is an array of images.
  const carouselSkeleton = createSlidesSkeleton();

  carouselFunctionality(carouselSkeleton, images, elementToAppendTo);
}

const lady = new Image();
lady.src = happyLadyImage;
const sandPic = new Image();
sandPic.src = sandImage;

const images = [lady, sandPic];

const element = document.querySelector("div");
element.style.marginLeft = "auto";
element.style.marginRight = "auto";

element.style.height = "50vh";
element.style.width = "70vh";
element.style.display = "flex";

// whatever the element that holds the image carousel is, make it a display flex so the carousel can take up its whole size.
createCarousel(images, element);
