/**
 * TETR - a browser based Tetris clone
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*global
    ADSAFE, report, jslint, console
*/

/**
 * Main Tetr function.
 * Sets up the environment and creates the canvas.
 * @param {boolean} debug - Flag to run in debug mode.
 */
function tetr(debug = false) {
    console.log("TETR v0.0.1");

    // Setting up the environment
    var tetris = document.getElementsByClassName("tetr")[0];

    // Settings
    var width = 300;
    var height = 600;

    // Setting up the canvas
    var tcanvas = document.createElement("canvas");
    tcanvas.setAttribute("id", "tcanvas");
    tcanvas.setAttribute("width", width);
    tcanvas.setAttribute("height", height);
    tetris.appendChild(tcanvas);

    // setting up debug area
    var debugArea = document.createElement("p");
    tetris.appendChild(debugArea);
    function logdebug(msg) {
        let txt = "";
        msg.forEach(function(line) {
            txt += line  + "<br/>";
        });
        debugArea.innerHTML = txt;
    }

    var ctx = tcanvas.getContext("2d");

    // Timer
    var tick = window.performance;
    // Framerate
    var fr = 120; // fps
    // Interval for each frame
    var frInterval = 1000 / fr;
    
    // Calls the setup function to set the canvas stage.
    setup(ctx);

    //  Main animation loop
    var drawInterval = window.setInterval(function(){
        let startTime = tick.now();
        let msg = [];

        // clear the canvas
        ctx.clearRect(0,0,width,height);

        // Calls the draw function which is implemented elsewhere
        draw(ctx);

        // Debug information
        if(debug === true) {

            let renderTime = startTime - tick.now();
            
            msg.push("Frame Rate: " + fr);
            msg.push("Render Time: " + renderTime);

            logdebug(msg);
        }
    }, frInterval);
    /*********************************************************************************************************/

    /**
     * Setup
     */
    function setup(ctx) {
    }

    /**
     * Draw
     */

    var position = 110;
    var velocity = 10;
    function draw(ctx) {
        position += velocity;
        ctx.fillText("Hello", 10, position);

        if (position > height-100 || position < 100) {
            velocity *=  -1
        }
    }

}