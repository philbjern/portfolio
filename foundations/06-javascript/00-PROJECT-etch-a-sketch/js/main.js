const clearButton = document.querySelector("#clear-sketch-btn");

const gridContainer = document.querySelector("#grid-container");
let gridItemWidth = getComputedStyle(gridContainer).width;
console.log(parseFloat(gridItemWidth));

const GAP_SIZE = 2;

let etchASketch = {
  gridSize: 16,
  changeGridSize: function (newGridSize) {
    this.gridSize = newGridSize;
  },
  createGridItems: function () {
    const gridContainer = document.querySelector("#grid-container");
    // console.log(getComputedStyle(gridContainer).width)
    const gridItemWidth =
      parseFloat(getComputedStyle(gridContainer).width) / this.gridSize - GAP_SIZE;

    let gridItemsArr = [];
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      let gridItem = document.createElement("div");
      gridItem.style.width = gridItemWidth + "px";
      gridItem.style.height = gridItemWidth + "px";
      gridItem.classList.toggle("grid-item");
      gridItemsArr.push(gridItem);
    }
    return gridItemsArr;
  },
  renderGrid: function () {
    const gridContainer = document.querySelector("#grid-container");

    let gridItems = this.createGridItems();
    gridItems.forEach((item) => {
      gridContainer.appendChild(item);
    });

    this.addMouseOverEventListeners(gridItems);
   
  },
  addMouseOverEventListeners(itemsArr) {
    itemsArr.forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        item.classList.add("active");
      });
    });
  }
};

clearButton.addEventListener("click", function (e) {});

document.addEventListener("DOMContentLoaded", function (e) {
  etchASketch.renderGrid();
});
