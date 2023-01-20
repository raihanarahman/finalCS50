## Conway's Game of Life
This project is a website that displays information about Conway's Game of Life, related links, and plays a script that allows the user to play the actual "game." Conway's Game of Life is a cellular automaton. One of the easiest ways to think about what this game entails is to think of each square in the grid as a population. For example, each square in the grid is a rabbit. The rabbit has two states: dead, or alive. Dead is indicated by a red square, and alive is indicated by a green square. Based on the rabbit's neighbors (the squares that are adjacent to it), we can determine whether the rabbit will live or die in the next generation. If the rabbit has two or three neighbors and is alive, it will live in the next generation. If it is dead and has three live neighbors, it will come back to life. If the rabbit has less than two neighbors, it dies by underpopulation; if the rabbit has more than two neighbors, it dies by overpopulation. The goal of this automaton is to see what happens over a series of generations with a certain selection of live/dead rabbits. These selections are called patterns, and there are many different types of patterns with different results. 

## Implementation
* static
    * I implemented the game in p5js, where I am able to manipulate graphics as well as obtain user input. My script in p5js (called sketch.js) runs the setup() function once and runs the draw() function on a continuous loop, which calls on functions I wrote later in the script. It is embedded in the body of index.html
    * index.html is styled with styles.css in the static folder. 
    * Bootstrap is implemented in styles.css to create the webpage. This was used because I wanted to implement features, such as a navbar and padding. 
    * An icon image, called icon.png, is used to create the browser tab icon in the static folder. This image was included because I wanted to create a browser tab icon to make the webpage seem more cohesive. I created this image myself. **Please note, the browser icon does not display on Safari, but does display on Google Chrome. 
    * jsconfig.json is used to configure the extensions to be used in the sketch.js file in the static folder. 
    * libraries is a folder with p5.min.js and p5.sound.min.js, which are necessary to import the libraries sketch.js needs to be implemented properly. These two scripts are also embedded in the head of index.html
* templates
    * index.html, stylized with styles.css, holds information about the game, its rule, and the game itself. 
* app.py and Flask are used to make a simple backend to load our webpage. I chose Flask because I wanted to have the option of possibly embedding forms or adding functionality to the webpage, and Flask provides such an option. 
* DESIGN.md provides information about the design of the project
* README.md provides information on the structure and usage of the project.
* In gitignore, vscode.code-workspace is used to route the user to the directory of the project by creating a path to the workspace. 

# Usage
To use this webpage, first you need to have downloaded all of the files present in finalProject.zip. You also need to have the capabilities to run p5js, HTML, CSS, and Python3 (with the Flask module). To use p5js, install the following extension: 

    Name: p5.vscode
    Id: samplavigne.p5-vscode
    Description: Create and manage p5.js projects.
    Version: 1.2.12
    Publisher: Sam Lavigne
    VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode

Because of the sizing of graphics on the webpage, you must have a minimum screen resolution of 1440px x 900px for all of the graphics and features to display properly. 

Then, you only need to execute "flask run" in the finalProject directory to create the webpage. 

# Video
Video: https://youtu.be/cuERK924idI

