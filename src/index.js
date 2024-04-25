import "./index.css";

function createSlidesSkeleton() {
  /*
    There will be a main slidesFrame that will hold the image, and three blocks inside it of the same height.
    The top and bottom blocks will have a colour, and the middle will be transparent so the user can see the image behind it inside the frame.
    */
  const slidesFrame = document.createElement("div"); // this will hold whatever the image is.
  const topBlock = document.createElement("div");
  const imageViewBlock = document.createElement("div");
  const bottomBlock = document.createElement("div");
  slidesFrame.style.display = "flex";
  topBlock.className = "carousel-sections";
  imageViewBlock.className = "carousel-sections";
  bottomBlock.className = "carousel-sections";
  document.querySelectorAll(".carousel-sections").forEach((section) => {
    const carouselSections = section;
    carouselSections.style.flex = 1;
  });
}
