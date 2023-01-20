// Set values of variables that will be necessary later on. 

// scal is used to scale the size of the squares in the grid. scale is a protected keyword is p5js, so I used scal instead. 
const scal = 40;
// startSim is a boolean used to trigger the start of the simulation. 
let startSim = false;
// startDraw is used to trigger startingGrid to draw the initial grid for squares that the user clicks on before the simulation starts.
let startDraw = false;
// popGrid is used to hold the information about the life/death status of the current populations. This is better explained in the DESIGN.md file. 
let popGrid = [];
// popCopy is used to temporarily hold the life/death status of the popluations during the for loops used to determine the 
// life/deaths of the populations based on our rules in calculate(). This is better explained in the DESIGN.md file. 
let popCopy = [];
// gens holds the number of generations that the user chooses for their simulation with the slider.
let gens;
// currGen holds the current generation that the simulation is going through right now. 
let currGen = 0;
// Holds the interval ID in begin(). The interval ID is used to create the loop through all of the generations, with an interval of 
// 1 second between each simulation/display of the current live/dead populations. This is more well explained in DESIGN.md section A. 
let interID;
// The number of rows/columns in the grid.
const rowCol = 10; 

function setup() {

  // Create the canvas that is the same size as the window of the user. 
  createCanvas(windowWidth, windowHeight);

  // Create a button that will be used to start the simulation/game. 
  startButton = createButton('Start');

  // Create a button that will be activated after the simulation ends to restart the simualation/game. Disable it because the game 
  // hasn't started yet.  
  restart = createButton('Restart');
  restart.attribute('disabled', '');

  // Create a slider so users can choose how many generations they want to propagate.
  slider = createSlider(1, 30, 5, 1);

}

function draw() {

  // The buttons and slider are placed on the webpage near the grid. 
  startButton.position(width/2.5 + rowCol*scal, height/2 + 90);
  restart.position(width/2.5 + rowCol*scal, height/2 + 130);
  slider.position(width/2.5 + rowCol*scal, height/2 + 65);

  // In order to update the text that appears on the screen, we need to use a mechanism which will draw a white rectangle over the old text, and then print the 
  // new text. This used for two instances: the place where the current generation is written, and the label next to the slider indicating what number of 
  // generations is selected. This is better explained in DESIGN.md section B. 
  fill(255);
  stroke(255);
  rect(width/2.5 + rowCol*scal - 20, 0, 220, 35);
  rect(width/2.5 + rowCol*scal + 120, 40, 30, 30);

  // Change the stroke/fill values so our following drawings don't appear white, but instead black. We also set the textSize
  fill(0);
  stroke(0);
  textSize(20);  

  // Displays the current generation that the simulation is on. 
  text("Current Generation: " + currGen, width/2.5 + rowCol*scal - 20, 30);

  // Displays the current value selected on the slider. 
  text(slider.value(), width/2.5 + rowCol*scal + 120, 55);

  // translate is used to center the grid in the middle of the webpage. 
  translate(width/3, 0);

  // Create the first grid with startingGrid(). This is in a separate function from the regular drawGrid function because I want startingGrid to only run 
  // once, otherwise our draw() function will continue to reset our starting grid instead of showing the next generation in the simulation.  
  startingGrid();

  // Sets the value of gens, or how many generations were chosen by the user. 
  gens = slider.value();

  // Sets function of the various buttons. If the startButton is pressed by the user, begin() is triggered. 
  startButton.mousePressed(begin);

  // If restart is selected, then beginAgain() is triggered. 
  restart.mousePressed(beginAgain);

}

function startingGrid(){ 

  // This function initializes popGrid with all populations dead if it has not been done yet. 
  if (startDraw === false){
    for (let i = 0; i < rowCol; i++){
      popGrid[i] = [];
      for (let j = 0; j < rowCol; j++){
        popGrid[i][j] = false;
      }
    }

    // Then, it changes startDraw to true since we have initialized popGrid. 
    startDraw = true;

    // This draws the initial grid for the user to interact with. 
    drawGrid();
  }
}

function begin(){

  // If the game has not started yet, as indicated by startSim
  if (startSim === false){

    // Then disable the start button so a user cannot click it again while the simulation runs (isn't really necessary because nothing will happen if its clicked again, but more
    // to indicate to the user that it cannot be used. It is better explained in DESIGN.mb section C)
    startButton.attribute('disabled', '');

    // Execute sim() every 750 miliseconds/0.75 seconds so users can see the changes of the populations. We use interID to control the number of times sim 
    // will run. This is explained better in DESIGN.md Section A. 
    interID = setInterval(sim, 750);

    }

    // Set startSim to true, so that the user cannot start the simulation again. 
    startSim = true;

}

function beginAgain(){

  // If the restart button is clicked, the page is reloaded so the user can try a new pattern on the grid. 
  location.reload();

}

function mouseClicked(){   

  // Use these formulas to determine, based on the place the user clicked, what square in the grid was clicked on (based on the indices of the grid). 
  let x = floor((mouseX - width/3) / scal); 
  let y = floor(mouseY/ scal);

  // Check to see if the simulation has NOT started yet, and if the user has actually clicked within the grid. 
  if (startSim === false & mouseX <= width/3 + scal*rowCol & mouseX >= width/3 - scal*rowCol & mouseY <= height/3 + scal*rowCol & mouseY >= height/3 - scal*rowCol){
    
    // If the selected square is already live, 
    if (popGrid[x][y] === true){ 

      // Then, that means the user wants that population to be dead, so we should fill it as red and update our grid appropiately. 
      // Each time the color of a square has to change, a new square is drawn on top. This is better explained in DESIGN.md section D.  
      popGrid[x][y] = false;
      fill(255, 0, 0);
      square(x*scal, y*scal, scal);

    }

    // Alternatively, if the selected square is dead then the user wants this square to become alive.  
    else if (popGrid[x][y] === false){ 

      // So, we should change update the grid appropriately and change the color of the square. This is better designed in DESIGN.md section D. 
      popGrid[x][y] = true;
      fill(0, 255, 0); 
      square(x*scal, y*scal, scal);

    }
  }
}



function drawGrid(){

  // Loop thorugh the rows and columns of the grid. 
  for (let i = 0; i < rowCol; i++){
    for (let j = 0; j < rowCol; j++){

      // If it is dead, color it red. 
      if (popGrid[i][j] === false){
        fill(255,0, 0);      
        square(i*scal, j*scal, scal);
      }
      
      // If it is alive, color it green. 
      else{
        fill(0, 255, 0); 
        square(i*scal, j*scal, scal);
      }
    }
  }
}

function calculate(){

  // Loop through the rows of popGrid. 
  for (let i = 0; i < rowCol; i++){

    // Begin to initialize the rows of popCopy 
    popCopy[i] = [];

    // Loop thorugh the columns of popGrid
    for (let j = 0; j < rowCol; j++){

      // Keep a counter of how many of the current population's neighors are alive. 
      let currentLives = 0;

      // This is similar to the logic used in Week 4's Filter for the Blur filter. This implementation choice is explained in DESIGN.md section E, and it checks
      // first to see if a neighbor of the current square exists, and then if that neighbor is live, it will add to the currentLives count. 
      if (i - 1 >=0){
        if (popGrid[i - 1][j] === true){
          currentLives++;
        }
        if (j - 1 >= 0){
          if (popGrid[i - 1][j - 1] === true){
            currentLives++;
          }
        }
        if (j + 1 <= rowCol-1){
          if (popGrid[i - 1][j + 1] === true){
            currentLives++;
          }
        }
      }
      if (i + 1  <= rowCol-1){
        if (popGrid[i + 1][j] === true){
          currentLives++;
        }
        if (j - 1 >= 0){
          if (popGrid[i + 1][j - 1] === true){
            currentLives++;
          }
        }
        if (j + 1 <= rowCol-1){
          if (popGrid[i + 1][j + 1] === true){
            currentLives++;
          }
        }
      }
      if (j - 1 >= 0){
        if (popGrid[i][j - 1] === true){
          currentLives++;
        }
      }
      if (j + 1 >= 0){
        if (popGrid[i][j + 1] === true){
          currentLives++;
        }
      }

      // Based on the number of live neighbors, if rule 3 (see index.html for rules) is true, then the current population will be alive in the next generation, so set popCopy
      // to be live at that index. 
      if ((currentLives === 3 || currentLives === 2) & popGrid[i][j] === true){
        popCopy[i][j] = true;
      }

      // If rule 4 (see index.html for rules) is true, then the current population will be alive in the next generation, so set popCopy to be alive at that index. 
      else if (currentLives === 3 & popGrid[i][j] === false){
        popCopy[i][j] = true;
      }

      // If rules 3 and 4 are not true, then rule 1 or rule 2 must be true. This means, the population will be dead in the next generation. So, it must die in the next 
      // generation. 
      else{
        popCopy[i][j] = false
      }
    }
  }

  // After determining what populations are alive or dead, copy this into our array, popGrid, which holds the current generation's life/death statuses.
  for (let i = 0; i < rowCol; i++){
    for (let j = 0; j < rowCol; j++){
      popGrid[i][j] = popCopy[i][j];
    }
  }
}

function sim(){
  // This calls on funtions written earlier, calculate() and drawGrid(), and updates currGen, which tells us what current generation we are on. This keeps track
  // of whether or not we have reached the generation that the user requested on the slider. 
  calculate();
  drawGrid();
  currGen++;

  // If have gotten to the generation that the user wanted
  if (currGen === gens){

    // Then we should clear the interval and stop the timed loop we are using
    clearInterval(interID);
    interID = null;
    
    // Then, since the simulation has ended, the user can now restart the game so we can enable the restart button. 
    restart.removeAttribute('disabled');
  }
}