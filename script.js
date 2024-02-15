for (let i = 0; i < 16; i++) {
  const container = document.getElementById("container");
  const rows = container.appendChild(document.createElement("div"));
  rows.classList.add("row-container");

  for (let j = 0; j < 16; j++) {
    rows.append(document.createElement("div"));
  }
}
