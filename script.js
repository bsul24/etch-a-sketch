"use strict";

const container = document.querySelector(".container");
const gridBtn = document.querySelector(".grid-btn");
const standardBtn = document.querySelector(".standard-btn");
const wackyBtn = document.querySelector(".wacky-btn");
const clearBtn = document.querySelector(".clear");
let gridSize = 10;
let drawType = "standard";
let mouseClicked = false;

const getGridSize = function () {
  const size = +prompt(
    "Please enter grid size. Enter a number between 1 and 100.",
    ""
  );

  if (size > 0 && size < 101) {
    gridSize = size;
    return;
  }

  getGridSize();
};

const createGrid = function (e) {
  if (e.target === gridBtn) getGridSize();

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
};

const clearGrid = function () {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => (square.style.backgroundColor = "#fff"));
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

  console.log(drawType);
};

const changeColor = function (e) {
  if (!mouseClicked && e.type !== "mousedown") return;
  const square = e.target;

  if (drawType === "standard") square.style.backgroundColor = "#212529";

  if (drawType === "wacky")
    square.style.backgroundColor = `rgb(${generateRandomRGB()})`;
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
gridBtn.addEventListener("click", createGrid);
standardBtn.addEventListener("click", changeDrawingType);
wackyBtn.addEventListener("click", changeDrawingType);
clearBtn.addEventListener("click", clearGrid);
window.addEventListener("DOMContentLoaded", createGrid);
