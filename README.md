# Image-Carousel

Install with npm:

```bash
npm install easy-image-carousel
```

# How to use

- Create a div with the flex property in **HTML**:

```html
<div style="display:flex"></div>
<!--Style inline, through a CSS file or Javascript -->
<!-- The carousel will match the height and width set on this element -->
```

- Inside your Javascript file:

```javascript
// Supports ES6 Module Syntax
import createCarousel from "easy-image-carousel";
import exampleImage from "./path/to/image"; // imported image
import anotherExampleImage from "./path/to/image"; // imported image

// these are the images imported above.
const myImage = new Image();
const myOtherImage = new Image();
myImage.src = exampleImage;
myOtherImage.src = anotherExampleImage;

//Store images in array
const allCarouselImages = [myImage, myOtherImage];

// select div element with the flex property created in the above HTML.
const imageCarouselContainer = document.querySelector("div");

// Run function with the Images array and the div created above in the HTML.
createCarousel(allCarouselImages, imageCarouselContainer);
```
![example](https://github.com/Liamsuu/image-carousel/assets/58088106/950cfb2a-cafd-4661-a1ee-78da2302f956)

