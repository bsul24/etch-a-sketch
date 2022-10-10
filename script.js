"use strict";

const container = document.querySelector(".container");
let squares = document.querySelectorAll(".square");
const gridBtn = document.querySelector(".grid-btn");
const standardBtn = document.querySelector(".standard-btn");
const wackyBtn = document.querySelector(".wacky-btn");
const eraseBtn = document.querySelector(".erase-btn");
const clearBtn = document.querySelector(".clear");
const gridInput = document.querySelector(".grid-input");
let gridSize = 10;
let drawType = "standard";
let mouseClicked = false;

const createGrid = function (e) {
  const gridSize = gridInput.value;
  if (!(gridSize > 0 && gridSize < 101)) {
    alert("Please input a number between 1 and 100");
    return;
  }
  gridInput.blur();
  container.innerHTML = "";
  const width = 100 / gridSize;
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = `${width}%`;
      square.addEventListener("mouseenter", changeColor);
      square.addEventListener("mousedown", changeColor);
      row.appendChild(square);
    }
    container.appendChild(row);
  }
  squares = document.querySelectorAll(".square");
  drawType = "standard";
};

const startDrawing = function (e) {
  e.preventDefault();
  mouseClicked = true;
};

const stopDrawing = function (e) {
  e.preventDefault();
  mouseClicked = false;
};

const changeDrawingType = function (e) {
  if (e.target === standardBtn) drawType = "standard";

  if (e.target === wackyBtn) drawType = "wacky";

  if (e.target === eraseBtn) drawType = "erase";
};

const changeColor = function (e) {
  if (!mouseClicked && e.type !== "mousedown") return;
  const square = e.target;

  if (drawType === "standard") square.style.backgroundColor = "#212529";

  if (drawType === "wacky")
    square.style.backgroundColor = `rgb(${generateRandomRGB()})`;

  if (drawType === "erase") square.style.backgroundColor = "#fff";
};

const generateRandomRGB = function () {
  const rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb.push(Math.floor(Math.random() * 256));
  }
  return rgb.join(", ");
};

// Event listeners
container.addEventListener("mousedown", startDrawing);
container.addEventListener("mouseup", stopDrawing);
gridInput.addEventListener("change", createGrid);
standardBtn.addEventListener("click", changeDrawingType);
wackyBtn.addEventListener("click", changeDrawingType);
eraseBtn.addEventListener("click", changeDrawingType);
// Have found that fastest way to clear grid so far is just to make a new one
clearBtn.addEventListener("click", createGrid);
window.addEventListener("DOMContentLoaded", createGrid);
