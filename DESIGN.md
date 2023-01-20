There are three key files in this project. The most lengthy and important file is sketch.js, and index.html and app.py are files that are used mostly for formatting the webpage/backend. 

# sketch.js
sketch.js holds the logic and graphics of our game. First, we have defined necessary variables for the entire file. Following this is a setup() function, which runs once and initializes certain aspects (like createCanvas, or make a HTML canvas of a certain size that we can now put graphics onto) which must be defined in setup. After this, the draw() function, by design of p5js, runs on a continuous loop, executing all of the functions called in draw().

In the sketch, the grid is centered on the webpage and on the side are controls for the game. Dead cells are red and live cells are green. 

   ## Functions used once
   Certain functions are defined but only used once. For example, startingGrid(). This is a personal choice, because I didn't want to increase the size of the draw() function by including the logic for startingGrid(), when it could just as easily be put into a different function to decrease the size and complication of draw(). 

   ## let vs const
   Some variables are declared with "let" if they are going to be altered later in the program. Other variables with constant values are declared with const so that they are not altered later on. 

   ## popGrid and popCopy
   popGrid is a 2-D array where its indicies are used to determine a square's x-y coordinates in the grid and on the screen. In the array, boolean values are stored to indicate whether a population, or square, is alive or dead in the current generation. popCopy is used in calculate() to hold information about lives/deaths of the populations in the following generation as it is being calculated based on the information in popGrid (which is why it is not directly altered, but instead the values of popCopy are copied into popGrid after calculations are finished).

   ## Section A: interval
   When displaying each new generation, I want there to be a delay, so that each generation appears on the screen for .75 seconds and the user has the ability to view the changes in life/death of the populations. For this reason, I use setInterval(), which assigns an ID to this interval that is running a certain function for .75 seconds, in begin(). It then continues to run this function until the interval is cleared and the ID is set to null, so it can no longer be run on this continuous, timed loop in sim(). 

    setInterval also takes only 1 function that can be put on a loop. As a result, I combined calculate(), drawGrid(), and an if-statement into one function, sim(), so it can be run on this timed loop. 

   ## Section B: updating text 
   The way draw() works, if a variable is to be displayed on the screen, it does not replace the text of the variable on the screen with another text; it will instead draw ontop of that text. So, to counter this, in draw() I drew a rectangle over the old text to hide or "erase" the old text before writing a new text on that area. In this way, for example, the slider updated with the current user input because a rectangle was drawn over the old user input so it could no longer be seen. This is also done with the "Current Generation: " text. An alternative to this would be to use clear() to clear the entire canvas when a value that was on display needed to be updated, but this would clear all the images and information gathered, so we would lose information like what squares were clicked by the user. 

   ## Section C: disabling buttons
   Disabling buttons is useful to indicate to the user that some feature is currently not accessible. If a button is given the attribute "disabled," it can no longer be used. It can also be re-enabled to indicate that the button and feature can be used again. I wanted to make sure users could only press start on the simulation once, and that it can only be restarted after the current simulation is finished. For this reason, the start/restart buttons are disabled/enabled at certain times. 

   ## Section D: changing the color of squares
   Similar to B, there isn't a way to change the color of a certain square. Instead, we have to draw new squares ontop of the current square in order to change its color. As a result, in drawGrid() and mouseClicked(), first we change the life/death status of the square in popGrid, and then we draw the new square to indicate this change. 

   ## Section E: looping through adjacent squares
   A more elegant solution to determine the status of adjacent squares uses 4 for-loops, as suggested in pseudocode below: 
    loop through the rows of popGrid
        loop through the columns of popGrid
            loop from 0 or current row - 1, whichever is greater, to the end of the row or the current row + 1, whichever is smaller
                loop from 0 or current column - 1, whichever is greater, to the end of the row or the current column + 1, whichever is smaller
                    find the life/death status 
                    ...
    However, using 4 four loops made my program extremely slow, and resulted in the program not functioning well. As a result, I instead chose to hard code the 8 different general cases of the position of the neighbor to the current square on the grid, and then use the life/death status to update our counter. This resulted in a smoother run of my code. 

# index.html 
index.html uses a navbar from Bootstrap to hold interesting and key infromation in the links above the game. Above the game are also the rules, so the user knows how to use the game. styles.css is used to change some fonts for consistency and provide padding. 

# app.py
app.py uses Flask to render index.html, and allows in the future for any changes to the program to be easily applied, such as implementing a form. 

# Future steps 
I would like to, in the future, implement features to my my program more accessible. For example, my graphics are in red and green, which makes my website inaccessible to those who are red/green color blind.

I would also like to add features to my site, like having a stop button to stop the simulation at a certain point, or a back button to flip through the previous generations of the simulation. 

One thing I did not achieve was being able to have the simulation run on a constant loop when the user does not provide an input for the slider. Instead, I was able to make a default value for the slider. 
