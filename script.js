"use strict";

const container = document.querySelector(".container");
const gridBtn = document.querySelector(".grid-btn");
const clearBtn = document.querySelector(".clear");
let gridSize = 10;
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
  squares.forEach((square) => square.classList.remove("selected"));
};

const startDrawing = function (e) {
  e.preventDefault();
  console.log("clicked");
  mouseClicked = true;
};

const stopDrawing = function (e) {
  e.preventDefault();
  console.log("unclicked");
  mouseClicked = false;
};

const changeColor = function (e) {
  if (!mouseClicked && e.type !== "mousedown") return;
  const square = e.target;
  square.classList.add("selected");
};

// Event listeners
container.addEventListener("mousedown", startDrawing);
container.addEventListener("mouseup", stopDrawing);
gridBtn.addEventListener("click", createGrid);
clearBtn.addEventListener("click", clearGrid);
window.addEventListener("DOMContentLoaded", createGrid);
