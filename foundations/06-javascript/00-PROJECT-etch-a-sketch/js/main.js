const GAP_SIZE = 2;

function toggleModal() {
  const modal = document.querySelector(".modal");
  const displayValue = getComputedStyle(modal).display;

  if (displayValue === "flex") {
    modal.style.display = "none";
  } else if (displayValue === "none") {
    modal.style.display = "flex";
  }
}

const clearButton = document.querySelector("#clear-sketch-btn");
clearButton.addEventListener("click", function (e) {
  toggleModal();
});

const modalCancelBtn = document.querySelector(".modal-cancel");
modalCancelBtn.addEventListener("click", (e) => {
  toggleModal();
});


function showAlertMessage() {
  const alertMessage = document.querySelector('.alert-message');
  alertMessage.textContent = 'Grid size cannot be greater than 100';
  alertMessage.style.display = 'block';
}

function hideAlertMessage() {
  const alertMessage = document.querySelector('.alert-message');
  alertMessage.style.display = 'none';
}

const newGridValueInput = document.querySelector("#new-grid-size-input");

newGridValueInput.addEventListener('blur', function(e) {
  if (e.target.value > 100) {
    showAlertMessage();
    e.target.value = 100;
  } else {
    hideAlertMessage();
  }
})

const modalSetBtn = document.querySelector(".btn-modal");
modalSetBtn.addEventListener("click", (e) => {
  const newGridValue = newGridValueInput.value;
  etchASketch.changeGridSize(newGridValue);
  toggleModal();
  hideAlertMessage();
});

const randomColorCheckbox = document.querySelector("#random-color");
randomColorCheckbox.addEventListener("click", (e) => {
  etchASketch.dimStep = 1;
  if (e.target.checked) {
    etchASketch.randomColor = true;
  } else {
    etchASketch.randomColor = false;
  }
});

const fadeToBlackCheckbox = document.querySelector("#fade-to-black");
fadeToBlackCheckbox.addEventListener("click", (e) => {
  etchASketch.dimStep = 1;
  if (e.target.checked) {
    etchASketch.fadeToBlack = true;
    etchASketch.currentColor = null;
  } else {
    etchASketch.fadeToBlack = false;
  }
});


const eraseCheckbox = document.querySelector('#erase');
eraseCheckbox.addEventListener('click', (e) => {
  etchASketch.dimStep = 1;
  if (e.target.checked) {
    etchASketch.erase = true;
  } else {
    etchASketch.erase = false;
  }
});

let etchASketch = {
  gridSize: 16,
  randomColor: false,
  fadeToBlack: false,
  dimStep: 1,
  currentColor: null,
  defaultColor: 'rgb(252, 181, 191)',
  activeColor : 'rgb(202, 178, 39)',
  erase: false,
  changeGridSize: function (newGridSize) {
    this.gridSize = newGridSize;

    this.dimStep = 1;
    this.currentColor = null;

    this.fadeToBlack = false;
    fadeToBlackCheckbox.checked = false;

    this.randomColor = false;
    randomColorCheckbox.checked = false;

    this.renderGrid();
  },
  createGridItems: function () {
    const gridContainer = document.querySelector("#grid-container");
    const gridItemWidth =
      parseFloat(getComputedStyle(gridContainer).width) / this.gridSize -
      GAP_SIZE + GAP_SIZE / this.gridSize;

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

    gridContainer.textContent = "";

    let gridItems = this.createGridItems();
    gridItems.forEach((item) => {
      gridContainer.appendChild(item);
    });

    this.addMouseOverEventListeners(gridItems);
  },
  addMouseOverEventListeners(itemsArr) {
    itemsArr.forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        if (this.erase) {
          item.style.backgroundColor = this.defaultColor;
        } else {
          if (this.fadeToBlack && this.randomColor) {
            if (this.dimStep > 0) {
              this.dimStep -= 0.05;
            }
            item.style.backgroundColor = this.getRandomColorString(
              this.dimStep
            ).toString();
            console.log(this.dimStep);
          } else if (this.randomColor) {
            item.style.backgroundColor = this.getRandomColorString().toString();
          } else if (this.fadeToBlack) {
            if (this.dimStep > 0) {
              this.dimStep -= 0.05;
            }
            item.style.backgroundColor = this.getDimmedColorString(item, this.dimStep);
          } else {
            item.style.backgroundColor = this.activeColor;
          }
        }
      });
    });
  },
  getRandomColorString(threshold = 1) {
    const color = {
      red: Math.floor(Math.random() * 255 * threshold) + 1,
      green: Math.floor(Math.random() * 255 * threshold) + 1,
      blue: Math.floor(Math.random() * 255 * threshold) + 1,
      alpha: threshold ? 1 : Math.random(),
      toString: function () {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
      },
    };

    return color;
  },
  getDimmedColorString(item, threshold) {
    const colorString = getComputedStyle(item).backgroundColor;
    console.log(colorString);
    const colorArr = colorString.split(",");

    let red = parseFloat(colorArr[0].substr(4));
    let green = parseFloat(colorArr[1]);
    let blue = parseFloat(colorArr[2]);
    let alpha = parseFloat(colorArr[3]);

    if (red > 0.1) {
      red *= threshold;
    }
    if (green > 0.1) {
      green *= threshold;
    }
    if (blue > 0.1) {
      blue *= threshold;
    }
    if (alpha < 1) {
      alpha *= 1.1;
    }

    const newColorString = `rgb(${red}, ${green}, ${blue})`;

    return newColorString;
  }
};

document.addEventListener("DOMContentLoaded", function (e) {
  etchASketch.changeGridSize(16);
  newGridValueInput.value = 16;
});
