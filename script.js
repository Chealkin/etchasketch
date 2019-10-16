let blackBrush = document.querySelector ('#black');
let rgbBrush = document.querySelector ('#rgb');
let eraseBrush = document.querySelector ('#erase');
let resetButton = document.querySelector ('#reset');
let shaderBrush = document.querySelector ('#shader');
var currentBrush = 'rgb';

// Below changes brush colors & resets the grid upon clicking each button
blackBrush.addEventListener('click', () => { currentBrush = 'black'; });
rgbBrush.addEventListener('click', () => { currentBrush = 'rgb'; });
eraseBrush.addEventListener('click', () => { currentBrush = 'erase'; });
shaderBrush.addEventListener('click', () => { currentBrush = 'shade'; });
resetButton.addEventListener('click', () => {
  let x = prompt('How many sections would you like in each row?')
  resetGrid(x);
})

function createGrid(number) { // Creates a grid
  let gridSize = number;
  
  for (let i = 0; i < gridSize ** 2; i++) {
    const container = document.querySelector('#mainContainer');
    const row = document.createElement('div');
    container.appendChild(row);
    row.id = 'grids';
    row.style.backgroundColor = 'white';
    row.style.opacity = '1';
    row.style.width = getSize(gridSize);
    row.style.height = getSize(gridSize);
    row.verticalAlign = 'top';
    row.style.display = 'inline-block';
    row.addEventListener ('mouseover', function(e) { // Function to listen for mouseover & change grid cell colors
      return row.style.backgroundColor = getColor(e.target);
    });
  }

}

function getSize(x) { // Gets the size of each grid cell
  let size = (720 / parseInt(x));
  return size + 'px';
}

function resetGrid(x) { // Deletes grid cells/calls for new grid to be created
  let container = document.getElementById('mainContainer');
  while (container.firstChild) {
    container.removeChild (container.firstChild);
  }
  createGrid(x);
}

function getColor(cell) { // Changes grid cell colors
  if (currentBrush === 'black') {
      return 'black';
    } else if (currentBrush === 'rgb') {
      return randomBrush();
    } else if (currentBrush === 'erase') {
      return 'white';
    } else if (currentBrush === 'shade') {
      getShade(cell);
    }
}

function getShade(row) {
  if (row.style.backgroundColor === 'black') { 
    return; // returns nothing if grid cell is already black
  } else if (row.style.opacity === 0) {
    row.style.backgroundColor === 'black'; // If grid cell is opaque it is black
    } else {
      row.style.opacity -= 0.1; // makes anything not black 10% darker
      }
}

function randomBrush() { // Gets random color
  var r = Math.floor((Math.random() * 255));
  var g = Math.floor((Math.random() * 255));
  var b = Math.floor((Math.random() * 255));
  return 'rgb('+ r + ', '+ g + ', ' + b + ')';
}

createGrid(16);