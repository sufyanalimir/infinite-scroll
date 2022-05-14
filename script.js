const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totaleImages = 0;
let photosArray = [];

// Unsplash API

const count = 30;
const apiKey = "BC4SPWRReev9WmNSApJop4sxUhR8hm9xbXe9VYQFqqU";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totaleImages) {
    ready = true;
    loader.hidden = true;
  }
}

function set_attributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totaleImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Creating <a> link to unsplash
    const aTag = document.createElement("a");
    set_attributes(aTag, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create image element
    const img = document.createElement("img");
    set_attributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // check if image is loaded
    img.addEventListener("load", imageLoaded);

    // append elements
    aTag.appendChild(img);
    imageContainer.appendChild(aTag);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
