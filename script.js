//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

const imageSources = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5"
];

let images = [];
let selectedImages = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function initializeImages() {
  // Select random image to duplicate
  const duplicateClass = imageSources[Math.floor(Math.random() * imageSources.length)];
  const allClasses = [...imageSources, duplicateClass];
  shuffleArray(allClasses);

  imageContainer.innerHTML = "";
  selectedImages = [];

  allClasses.forEach((className, index) => {
    const img = document.createElement("img");
    img.className = className;
    img.dataset.class = className;
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) return;

  img.classList.add("selected");
  selectedImages.push(img);
  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  } else if (selectedImages.length > 2) {
    // Do not allow more than 2 selections
    selectedImages.forEach((img) => img.classList.remove("selected"));
    selectedImages = [];
    verifyBtn.style.display = "none";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  result.textContent = "";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedImages;
  const class1 = img1.dataset.class;
  const class2 = img2.dataset.class;

  verifyBtn.style.display = "none";

  if (class1 === class2) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

initializeImages();
