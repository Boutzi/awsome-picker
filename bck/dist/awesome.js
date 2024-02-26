


// function awesomeColorPicker(id) {
//   const mainColorPickerContainer = document.querySelector('#' + id);
//   const hexCodeContainer = document.createElement('div');
//   hexCodeContainer.classList = 'hex-code-container';
//   const hexCodeSquare = document.createElement('div');
//   hexCodeSquare.classList = 'hex-code-square';
//   hexCodeSquare.onclick = openColorPickerModal();
//   const hexCodeInput = document.createElement('input');
//   hexCodeInput.classList = 'hex-code';
//   hexCodeInput.value = '#000000';
//   mainColorPickerContainer.appendChild(hexCodeContainer);
//   hexCodeContainer.appendChild(hexCodeSquare);
//   hexCodeContainer.appendChild(hexCodeInput);
// }

function closeColorPickerModal() {
  const container = document.querySelector(".colorjoe-container");
  container.style.display = "none";
}

function openColorPickerModal() {
  const container = document.querySelector(".colorjoe-container");
  container.style.display = "block";
  const buttonRect = event.target.getBoundingClientRect();
  const buttonTop = buttonRect.top + buttonRect.height;
  const buttonLeft = buttonRect.left;

  container.style.top = 12 + buttonTop + "px";
  container.style.left = -95 + buttonLeft + "px";
}


document.addEventListener('DOMContentLoaded', function() {
  const inputSelector = ['.hex-code', '#hex', '#r','#g','#b'];
  for (let i = 0; i < inputSelector.length; i++) {
    const input = document.querySelector(inputSelector[i]);
    input.addEventListener('focus', function(event) {
        input.select();
    });
  }
});


const container = document.querySelector(".colorjoe-container");
let isDragging = false;
let offsetX, offsetY;
const excludedElements = [".bg", ".bg2", ".shape", "button", "input", "select"];

container.addEventListener("mousedown", (e) => {
  const isExcluded = excludedElements.some((selector) => {
    return e.target.closest(selector) !== null;
  });

  if (!isExcluded) {
    isDragging = true;
    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

function copyValue() {
  let selectedMode = document.querySelector("#mode").value;
  let inputValue;

  switch (selectedMode) {
    case "hex":
      inputValue = document.getElementById("hex").value.substring(1);
      break;
    case "rgb":
      inputValueR = document.getElementById("r").value;
      inputValueG = document.getElementById("g").value;
      inputValueB = document.getElementById("b").value;
      inputValue = `rgb(${inputValueR}, ${inputValueG}, ${inputValueB})`;
      break;
    case "css":
      inputValue = document.getElementById("css").value;
      break;
    default:
      inputValue = "hex";
      break;
  }

  let inputElement = document.createElement("input");
  inputElement.value = inputValue;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand("copy");
  document.body.removeChild(inputElement);
}

document.addEventListener("DOMContentLoaded", function () {
  const hexCodeInput = document.querySelector('.hex-code');
  const hexInputStart = document.querySelector("#hex");
  hexInputStart.value = hexCodeInput.value;
  

  const hexCodeSquare = document.querySelector('.hex-code-square');
  const firstColor = hexCodeInput.value;
  const cj = colorjoe.rgb(document.querySelector(".colorjoe")).on("change", (color) => {
    hexCodeInput.value = color.hex().toUpperCase();
    hexCodeSquare.style.backgroundColor = color.hex().toUpperCase();
    const shape2 = document.querySelector(".shape2");
    shape2.style.backgroundColor = color.hex();
    shape2.style.boxShadow = 'inset 0 0 2px #777';
  });
  cj.set(firstColor);

  cj.on("change", (color) => {
    const hexInput = document.querySelector("#hex");
    const modeSelect = document.querySelector("#mode");
    const selectedMode = modeSelect.value;

    const inputColorPicker = document.querySelector(".hex-code");
    inputColorPicker.value = color.hex().toUpperCase();
    const inputSquare = document.querySelector(".hex-code-square");
    inputSquare.style.backgroundColor = color.hex().toUpperCase();

    hexInput.value = color.hex().toUpperCase();

    const shape2 = document.querySelector(".shape2");
    shape2.style.backgroundColor = color.hex();
    shape2.style.boxShadow = 'inset 0 0 2px #777';

    switch (selectedMode) {
      case "rgb":
        const cssColor = color.css();
        const rgbValues = cssColor.match(/\d+/g);
        document.querySelector("#r").value = parseInt(rgbValues[0]);
        document.querySelector("#g").value = parseInt(rgbValues[1]);
        document.querySelector("#b").value = parseInt(rgbValues[2]);
        break;
      case "css":
        document.querySelector("#css").value = color.cssa();
        break;
      default:
        break;
    }

    modeSelect.addEventListener("change", function () {
      const selectedOption = modeSelect.value;
      const selectedDiv = document.querySelector(`.${selectedOption}`);

      inputContainers.forEach(function (container) {
        if (container.classList.contains(selectedOption)) {
          container.style.display = "block";
        } else {
          container.style.display = "none";
        }
      });

      switch (selectedOption) {
        case "hex":
          hexInput.value = color.hex().toUpperCase();
          break;
        case "rgb":
          const cssColor = color.css();
          const rgbValues = cssColor.match(/\d+/g);
          document.querySelector("#r").value = parseInt(rgbValues[0]);
          document.querySelector("#g").value = parseInt(rgbValues[1]);
          document.querySelector("#b").value = parseInt(rgbValues[2]);
          break;
        case "css":
          document.querySelector("#css").value = color.cssa();
          break;
        default:
          break;
      }
    });
  });

  const hexInput = document.querySelector("#hex");

  hexInput.addEventListener("blur", () => {
    let hexValue = hexInput.value.trim();

    if (!hexValue.startsWith("#")) {
      hexValue = "#" + hexValue;
    }

    if (/^#[0-9A-Fa-f]{3}$/.test(hexValue)) {
      hexValue =
        "#" +
        hexValue[1] +
        hexValue[1] +
        hexValue[2] +
        hexValue[2] +
        hexValue[3] +
        hexValue[3];
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
      cj.set(hexValue);
    }
  });

  const hexInputReverse = document.querySelector(".hex-code");

  hexInputReverse.addEventListener("blur", () => {
    let hexValue = hexInputReverse.value.trim();
  
    if (!hexValue.startsWith("#")) {
      hexValue = "#" + hexValue;
    }
  
    if (/^#[0-9A-Fa-f]{3}$/.test(hexValue)) {
      hexValue =
        "#" +
        hexValue[1] +
        hexValue[1] +
        hexValue[2] +
        hexValue[2] +
        hexValue[3] +
        hexValue[3];
    }
  
    if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
      cj.set(hexValue);
    }
  });
  
  

  const inputR = document.getElementById("r");
  const inputG = document.getElementById("g");
  const inputB = document.getElementById("b");

  function limiterValeurSuperieure(input) {
    if (parseInt(input.value) > 255) {
      input.value = "255";
    }
  }
  inputR.addEventListener("input", function () {
    limiterValeurSuperieure(this);
  });

  inputG.addEventListener("input", function () {
    limiterValeurSuperieure(this);
  });

  inputB.addEventListener("input", function () {
    limiterValeurSuperieure(this);
  });

  const modeSelect = document.querySelector("#mode");
  const inputContainers = document.querySelectorAll(
    ".colorjoe-selected-color-text > div"
  );

  inputContainers.forEach(function (container) {
    if (!container.classList.contains("hex")) {
      container.style.display = "none";
    }
  });

  modeSelect.addEventListener("change", function () {
    const selectedOption = modeSelect.value;
    const selectedDiv = document.querySelector(`.${selectedOption}`);

    inputContainers.forEach(function (container) {
      if (container.classList.contains(selectedOption)) {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
    });
  });
  
});
closeColorPickerModal()