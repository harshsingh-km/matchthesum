const cellCount = 15;
let cells = [];

function initializeCells() {
  const container = document.getElementById("cellContainer");
  container.innerHTML = '';
  for (let i = 0; i < cellCount; i++) {
    cells.push('');
    const div = document.createElement("div");
    div.className = "cell";
    container.appendChild(div);
  }
  updateDisplay();
}

function updateDisplay() {
  const cellElements = document.querySelectorAll(".cell");
  cells.forEach((val, i) => {
    cellElements[i].textContent = val || '';
  });
}

function addDigit() {
  if (cells.includes('')) {
    const newDigit = Math.floor(Math.random() * 9) + 1;
    cells = [...cells.filter(c => c !== ''), newDigit.toString()];
    while (cells.length > cellCount) cells.shift();
    while (cells.length < cellCount) cells.unshift('');
    updateDisplay();
  } else {
    clearInterval(autoAdd);
    document.getElementById("message").textContent = "Game Over! No empty cells left.";
  }
}

function checkSum() {
  const input = document.getElementById("userInput").value;
  if (!/^\d{2,3}$/.test(input)) {
    alert("Enter exactly 2 or 3 digits.");
    return;
  }

  const indices = [];
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const digit = input[i];
    const index = cells.indexOf(digit);
    if (index === -1 || indices.includes(index)) {
      alert("Invalid digits - ensure digits are in the list and not repeated.");
      return;
    }
    sum += parseInt(digit);
    indices.push(index);
  }

  if (sum === 10) {
    indices.sort((a, b) => b - a);
    for (const index of indices) {
      cells.splice(index, 1);
      cells.unshift('');
    }
    updateDisplay();
    document.getElementById("message").textContent = "Good Job! Sum is 10.";
  } else {
    document.getElementById("message").textContent = "Try Again! Sum is not 10.";
  }

  document.getElementById("userInput").value = '';
}

initializeCells();
const autoAdd = setInterval(addDigit, 2000);
