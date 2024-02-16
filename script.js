const checkNumber = (n) => {
  const DEFAULT = 16;
  if (n < 16 || n > 100) {
    // Ideally, what I want here is to show an message to the user and not just console.log
    console.log("Size needs to be between number 16 and 100");
    return DEFAULT;
  }
  return n;
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

  const clearButton = document.getElementById("clearGrid");
  const cellWidth = computeCellSize(size)[0];
  const cellHeight = computeCellSize(size)[1];
  div.forEach((el) => {
    el.style["box-sizing"] = "border-box";
    el.style.border = "1px solid black";
    el.style.width = `${cellWidth}vw`;
    el.style.height = `${cellHeight}vh`;
    el.addEventListener("mouseenter", () => {
      el.style["background-color"] = "red";
    });
    clearButton.addEventListener("click", () => {
      el.style["background-color"] = "white";
    });
  });
};

const clearButton = () => {
  document.getElementById("clearButton").addEventListener("click", () => {
    const div = document.querySelectorAll(
      "#grid-container > .row-container > div ",
    );

    div.forEach((el) => {
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

createGrid(16);
const button = document.getElementById("saveButton");
button.addEventListener("click", () => {
  const input = document.getElementById("inputField").value;
  let size = checkNumber(input);
  createGrid(size);
});
