const checkNumber = (n) => {
  const DEFAULT = 16;
  if (n < 16 || n > 100) {
    // Ideally, what I want here is to show an message to the user and not just console.log
    console.log("Size needs to be between number 16 and 100");
    return DEFAULT;
  }
  return n;
};

const RandNumber = (min, max) => {
  const M = Math;
  min = M.ceil(min);
  max = M.floor(max);
  return M.floor(M.random() * (max - min)) + min;
};

let arrBlues = [];
const GenerateRandBlue = () => {
  for (let i = 0; i < 30; i++) {
    arrBlues.push(
      `rgb(${RandNumber(0, 81)}, ${RandNumber(100, 151)}, ${RandNumber(
        90,
        256,
      )})`,
    );
  }
};

const computeCellSize = (size) => {
  const inputWidth = document.getElementById("input-container").clientWidth;
  const inputHeight = document.getElementById("input-container").clientHeight;

  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;

  const gridWidth =
    documentWidth !== inputWidth
      ? ((documentWidth - (documentWidth - inputWidth)) * 100) / documentWidth
      : 0;

  const gridHeight =
    documentHeight !== inputHeight
      ? ((documentHeight - (documentHeight - inputHeight)) * 100) /
        documentHeight
      : 0;

  const cellWidth = (100 - gridWidth) / size;
  const cellHeight = (100 - gridHeight) / size;
  return [cellWidth, cellHeight];
};

const setStyle = (size) => {
  const div = document.querySelectorAll(
    "#grid-container > .row-container > div ",
  );

  GenerateRandBlue();
  const clearButton = document.getElementById("clearGrid");
  const cellWidth = computeCellSize(size)[0];
  const cellHeight = computeCellSize(size)[1];
  div.forEach((el) => {
    el.style["box-sizing"] = "border-box";
    el.style.border = "1px solid black";
    el.style.width = `${cellWidth}vw`;
    el.style.height = `${cellHeight}vh`;
    el.addEventListener("mouseenter", () => {
      el.style["background-color"] = arrBlues[RandNumber(0, 31)];
    });
    clearButton.addEventListener("click", () => {
      el.style["background-color"] = "white";
    });
  });
};

const createGrid = (size) => {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const row = container.appendChild(document.createElement("div"));
    row.classList.add("row-container");

    for (let j = 0; j < size; j++) {
      row.append(document.createElement("div"));
    }
  }
  setStyle(size);
};

document.getElementById("input").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
});

createGrid(16);
const button = document.getElementById("saveButton");
button.addEventListener("click", () => {
  const input = document.getElementById("inputField").value;
  let size = checkNumber(input);
  createGrid(size);
});
