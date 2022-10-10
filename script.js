"use strict";

const container = document.querySelector(".container");
const gridBtn = document.querySelector(".grid-btn");
const clearBtn = document.querySelector(".clear");
let gridSize = 10;

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

  console.log(gridSize);
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
      row.appendChild(square);
    }
    container.appendChild(row);
  }
};

const clearGrid = function () {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => square.classList.remove("selected"));
};

const changeColor = function (e) {
  const square = e.target;
  square.classList.add("selected");
};

// Event listeners
gridBtn.addEventListener("click", createGrid);
clearBtn.addEventListener("click", clearGrid);
window.addEventListener("DOMContentLoaded", createGrid);
