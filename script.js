"use strict";

const container = document.querySelector(".container");
const gridSize = document.querySelector(".grid-size");
const submitBtn = document.querySelector(".submit");
const clearBtn = document.querySelector(".clear");

const getGridSize = function () {
  const size = prompt(
    "Please enter grid size. Enter a number between 1 and 100.",
    ""
  );

  if (!size) getGridSize();

  return size;
};

const createGrid = function () {
  const size = +gridSize.value;

  if (!size) return;

  clearGrid();
  const width = 100 / size;
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < size; j++) {
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
  container.innerHTML = "";
};

const changeColor = function (e) {
  const square = e.target;
  square.classList.add("selected");
};

// Event listeners
const squares = [...document.querySelectorAll(".square")];
squares.forEach((square) => square.addEventListener("mouseenter", changeColor));
submitBtn.addEventListener("click", createGrid);
clearBtn.addEventListener("click", clearGrid);
