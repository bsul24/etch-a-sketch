"use strict";

const container = document.querySelector(".container");
let squares = document.querySelectorAll(".square");
const standardBtn = document.querySelector(".standard-btn");
const wackyBtn = document.querySelector(".wacky-btn");
const eraseBtn = document.querySelector(".erase-btn");
const selectBtns = document.querySelectorAll(".select-btn");
const clearBtn = document.querySelector(".clear");
const gridInput = document.querySelector(".grid-input");
let gridSize = 10;
let drawType = "standard";
let pointerClicked = false;

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
      square.addEventListener("pointerenter", changeColor);
      square.addEventListener("pointerdown", changeColor);
      row.appendChild(square);
    }
    container.appendChild(row);
  }
  squares = document.querySelectorAll(".square");
  drawType = "standard";
  selectBtns.forEach((btn) => btn.classList.remove("selected"));
  standardBtn.classList.add("selected");
};

const startDrawing = function (e) {
  e.preventDefault();
  pointerClicked = true;
};

const stopDrawing = function (e) {
  e.preventDefault();
  pointerClicked = false;
};

const changeDrawingType = function (e) {
  selectBtns.forEach((btn) => btn.classList.remove("selected"));

  if (e.target === standardBtn) {
    drawType = "standard";
    standardBtn.classList.add("selected");
  }

  if (e.target === wackyBtn) {
    drawType = "wacky";
    wackyBtn.classList.add("selected");
  }

  if (e.target === eraseBtn) {
    drawType = "erase";
    eraseBtn.classList.add("selected");
  }
};

const changeColor = function (e) {
  if (!pointerClicked && e.type !== "pointerdown") return;
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
container.addEventListener("pointerdown", startDrawing);
container.addEventListener("pointerup", stopDrawing);
gridInput.addEventListener("change", createGrid);
standardBtn.addEventListener("click", changeDrawingType);
wackyBtn.addEventListener("click", changeDrawingType);
eraseBtn.addEventListener("click", changeDrawingType);
// Have found that fastest way to clear grid so far is just to make a new one
clearBtn.addEventListener("click", createGrid);
window.addEventListener("DOMContentLoaded", createGrid);
