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
    var wHeight = window.innerHeight - 50;
    var wWidth = window.innerWidth - 50;
    // Block dimesions
    var block = Math.min(wHeight, wWidth)/30;

    var height = 30*block;
    
    var width = 20*block;

    var debugPadding = 0*block;
    if(debug === true) {
        debugPadding = 10*block;
    }


    // Setting up the canvas
    var tcanvas = document.createElement("canvas");
    tcanvas.setAttribute("id", "tcanvas");
    tcanvas.setAttribute("width", width);
    tcanvas.setAttribute("height", height);

    // setting up debug area
    if(debug === true){
        tcanvas.setAttribute("width", width + debugPadding);
    }

    var ctx = tcanvas.getContext("2d");

    tetris.appendChild(tcanvas);


    var debugArea = document.createElement("p");
    tetris.appendChild(debugArea);
    function logdebug(msg) {
        ctx.font = (block)*0.5 + "px monospace";
        ctx.fillText("Debug info", width + 10, block*0.7);
        for(let i = msg.length - 1; i >= 0; i--) {
            ctx.fillText(msg[i], width + 10, (i+2)*block*0.7);
        }
    }


    // Timer
    var tick = window.performance;
    // Framerate
    var fr = 120; // fps
    // Interval for each frame
    var frInterval = 1000 / fr;
    
    /********************************************************************************************************
     * GAME
     */
    
    // Game Setup
    var gameRectWidth = 12; // blocks
    var gameRectHeight = 28; // blocks
    var gameX = 6;
    var gameY = 1;
    var gameLevel = 1;
    var blockTime = 1000/gameLevel; 
    var moveAmount = 1;///blockTime;
    var lastMoveTime = tick.now();

    var touchTolerance = 50;

    var gameScore = 0;
    var linePerLevel = 15;

    var gameOn = true;

    var gamePanel = [];
    var panelBlocks = [];
    for(let i = 0; i < gameRectHeight; i++) {
        let r = [];
        for(let j = 0; j < gameRectWidth; j++) {
            r.push(0);
        }
        gamePanel.push(r);
        panelBlocks.push(r);
    }

    // First tetromino
    var currentTetromino = new tetromino(5, 0, block, tetromino.random());
    var needNextTetromino = false;
    var nextTetromino = new tetromino(2, 5, block, tetromino.random());

    /**
     * Key Press Catching
     */
    window.focus();

    window.addEventListener("keydown", function(e) {
        let k = e.key;
        if(k =="ArrowUp" || k == "w") {
            // console.log("UP");
            currentTetromino.rotate(gamePanel);
        } else if(k =="ArrowDown" || k == "s") {
            // console.log("DOWN");
            currentTetromino.move("down", moveAmount, gamePanel);
        } else if(k =="ArrowRight" || k == "d") {
            // console.log("RIGHT");
            currentTetromino.move("right", moveAmount, gamePanel);
        } else if(k =="ArrowLeft" || k == "a") {
            // console.log("LEFT");
            currentTetromino.move("left", moveAmount, gamePanel);
        }
    }, false);

    /**
     * Touch Events
     */

    var ts = [0,0];
    tcanvas.addEventListener("touchstart", function(e) {
        // console.log(e.touches);
        e.preventDefault();
        ts = [e.touches[0].screenX, e.touches[0].screenY];
    }, false);

    tcanvas.addEventListener("touchend", function(e) {
        e.preventDefault();
        // console.log(e.changedTouches);
        let te = [e.changedTouches[0].screenX, e.changedTouches[0].screenY];
        // console.log(ts);
        // console.log(te);
        let dV = te[1] - ts[1];
        let dH = te[0] - ts[0];
        let adV = Math.abs(dV);
        let adH = Math.abs(dH);
        // console.log("dV " + dV + " dH " + dH);
        if (dV > touchTolerance && adV > adH) {
            // console.log("TOUCH DOWN");
            currentTetromino.move("down", moveAmount, gamePanel);
        } else if (dV < touchTolerance && adV > adH) {
            // console.log("TOUCH UP");
            currentTetromino.rotate(gamePanel);
        } else if (dH > touchTolerance && adV < adH) {
            // console.log("TOUCH RIGHT"); 
            currentTetromino.move("right", moveAmount, gamePanel);
        } else if (dH < touchTolerance && adV < adH) {
            // console.log("TOUCH LEFT");
            currentTetromino.move("left", moveAmount, gamePanel);
        }

        ts = [0,0];
    }, false);

    /** Main animation loop *****************************************************************************/
    var drawInterval = window.setInterval(function(){
        if(gameOn) {
            let startTime = tick.now();
            // Debug messages
            var msg = [];
            

            /**********************************/

            let h = currentTetromino.shape.length;
            let w = currentTetromino.shape[0].length;
            for(let i = 0; i < h; i++) {
                let s = "";
                for(let j = 0; j < w; j++) {
                    s += currentTetromino.shape[i][j];
                }

                msg.push(s);
            }

            for(let i  = 0; i < gameRectHeight; i++) {
                let s = (i + 1) + " ";
                if (i < 9) {
                    s = " " + s;
                }
                for(let j = 0; j < gameRectWidth; j++) {
                    // if(gamePanel[i][j] === 0) {
                    let t = "";
                    if(panelBlocks[i][j] != 0) {
                        t = "P";
                    } else {
                        t = "0";
                    }

                    if(gamePanel[i][j] != 0) {
                        t = "G";
                    } else {
                        t = "0";
                    }

                    if(gamePanel[i][j] != 0 && panelBlocks[i][j] != 0) {
                        t = "1";
                    }

                    s += t;
                }
                msg.push(s);
            }
            /**********************************/

            // clear the canvas
            ctx.clearRect(0,0,width,height);

            // draw game area
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(gameX * block - 1 , gameY*block - 1, gameRectWidth*block + 1, gameRectHeight*block + 1);

            // handle next tetromino
            if(needNextTetromino === true) {

                let h = currentTetromino.shape.length;
                let w = currentTetromino.shape[0].length;
                let tX = currentTetromino.x;
                let tY = currentTetromino.y;

                for(let i = h-1; i >=0; i--) {
                    for(let j = 0; j < w; j++) {
                        if (currentTetromino.shape[i][j] == 1) {
                            let r = tY + i;
                            let c = tX + j;

                            gamePanel[r][c] = 1;
                            panelBlocks[r][c] = new box(
                                    (currentTetromino.x + gameX + j)*block,
                                    (currentTetromino.y + gameY +  i)*block,
                                    currentTetromino.boxwidth,
                                    currentTetromino.color
                                );
                        }
                    }
                }

                currentTetromino = nextTetromino.clone(5, 0);
                nextTetromino = new tetromino(2, 5, block, tetromino.random());
                needNextTetromino = false;
            }

            // draw next tetromino
            nextTetromino.draw(ctx);
            // draw current tetromino
            currentTetromino.draw(ctx, gameX, gameY);
            // draw score
            ctx.font = block+ "px monospace";
            ctx.fillText("SCORE", 2*block, 10*block);
            ctx.fillText(gameScore, 2*block, 11*block);
            ctx.fillText("LEVEL", 2*block, 13*block);
            ctx.fillText(gameLevel, 2*block, 14*block);


            // Moves down the current tetromino
            if((tick.now() - lastMoveTime) >= blockTime){
                if(!currentTetromino.move("down", moveAmount, gamePanel)) {
                    needNextTetromino = true;
                }
                lastMoveTime = tick.now();
            }

            // check if game has ended
            for(let i  = 0; i < gameRectWidth; i++) {
                if(gamePanel[0][i] != 0) {
                    gameOn = false;
                }
            }

            // check if lines are filled
            let filledLines = 0;
            for(let i  = gameRectHeight - 1; i>= 0; i--) {
                let t = 0;
                for(let j =  0; j < gameRectWidth; j++) {
                    if(gamePanel[i][j] != 0) {
                        //console.log("1")
                        t++;
                    }
                }
                if(t == gameRectWidth) {
                    filledLines++;
                    gameScore++;

                    for(let k = i-1; k >=0; k--) {
                        for(let j = 0; j < gameRectWidth; j++) {
                            panelBlocks[k][j].y += block;
                        }
                    }

                    gamePanel.splice(i, 1);
                    panelBlocks.splice(i, 1);
                }
            }
            if(filledLines > 0) {
                
                // console.log("Lines");
                var eGamePanel = [];
                var ePanelBlocks = [];
                for(let i = 0; i < filledLines; i++) {
                    let r = [];
                    for(let j = 0; j < gameRectWidth; j++) {
                        r.push(0);
                    }
                    eGamePanel.push(r);
                    ePanelBlocks.push(r);
                }

                gamePanel = eGamePanel.concat(gamePanel);
                panelBlocks = ePanelBlocks.concat(panelBlocks);

                // update level
                gameLevel = Math.floor(gameScore/linePerLevel)+1;
                blockTime = 1000/gameLevel;
            }

            // draw panel blocks
            for(let i = 0; i < gameRectHeight; i++) {
                for(let j = 0; j < gameRectWidth; j++) {
                    if(gamePanel[i][j] != 0) {
                        // console.log(panelBlocks[i][j]);
                        panelBlocks[i][j].draw(ctx);
                    }
                }
            }

            msg.push(gameScore + "");


            // Debug information
            if(debug === true) {

                ctx.clearRect(width,0,debugPadding,height);
                let renderTime = tick.now() - startTime;
                
                msg.push("Frame Rate: " + fr);
                msg.push("Render Time: " + renderTime);

                logdebug(msg);
            }
        }
    }, frInterval);
}

/**
 * Box class for building tetris blocks.
 */
class box {
    constructor(x = 0, y = 0, width = 10, color = "green") {
        this.width = width;
        this.height = width;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    }

    move(dir, amount){
        switch (dir) {
            case "right":
                break;
            case "left":
                break;
            default: // down
                this.y += amount;
        }
    }
}

/**
 * Tetromino Class
 */
class tetromino {
    constructor(x = 0, y = 0, boxwidth = 10, type = 'O') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.boxwidth = boxwidth;
        switch (type) {
            case 'I':
                // I
                this.shape = [[1,1,1,1]];
                this.row = 1;
                this.col = 4;
                this.color = "darkslateblue";
                break;
            case 'L':
                // L
                this.shape = [[1,1,1],[1,0,0]];
                this.row = 2;
                this.col = 3;
                this.color = "darkorange";
                break;
            case 'J':
                // J
                this.shape = [[1,1,1],[0,0,1]];
                this.row = 2;
                this.col = 3;
                this.color = "darkred";
                break;
            case 'S':
                // S
                this.shape = [[0,1,1],[1,1,0]];
                this.row = 2;
                this.col = 3;
                this.color = "darkgreen";
                break;
            case 'Z':
                // Z
                this.shape = [[1,1,0],[0,1,1]];
                this.row = 2;
                this.col = 3;
                this.color = "teal";
                break;
            case 'T':
                // T
                this.shape = [[1,1,1],[0,1,0]];
                this.row = 2;
                this.col = 3;
                this.color = "darkgrey";
                break;
            default:
                // O
                this.shape = [[1,1],[1,1]];
                this.row = 2;
                this.col = 2;
                this.color = "orange";
        }
    }

    clone(x, y, shape) {
        let t =  new tetromino(x, y, this.boxwidth, this.type);
        // t.shape = shape;
        // t.row = shape.length;
        // t.col = shape[0].length;

        return t;
    }

    static random() {
        let a = ['I', 'J', 'L', 'T', 'O', 'S', 'Z'];
        return a[Math.floor((Math.random() * a.length))];
    }

    rotate(panel) {
        // make a matrix rotation (ccw)
        let newRow = this.col;
        let newCol = this.row;
        let newShape = Array(newRow);
        for(let i = 0; i < newRow; i++) {
            let r = Array(newCol);
            for(let j = 0; j < newCol; j++) {
                r[j] = this.shape[j][this.col - 1 - i]
            }
            newShape[i] = r;

        }

        if(this.isValid(panel, newShape, this.x, this.y)) {
            this.shape = newShape;
            this.row = newRow;
            this.col = newCol;
        }
    }

    draw(ctx, paddingX = 0, paddingY = 0) {
        var boxes = [];
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.col; j++) {
                if (this.shape[i][j] === 1) {
                    boxes.push(new box((this.x + paddingX + j)*this.boxwidth, (this.y + paddingY +  i)*this.boxwidth, this.boxwidth, this.color));
                }
            }
        }

        for(let b  = 0; b < boxes.length; b++) {
            boxes[b].draw(ctx);
        }
    }

    move(dir, amount, panel){
        let nextX, nextY;
        switch (dir) {
            case "right":
                nextX = this.x + amount;
                if(this.isValid(panel, this.shape, nextX, this.y)) {
                    this.x = nextX;
                }
                break;
            case "left":
                nextX = this.x - amount;
                if(this.isValid(panel, this.shape, nextX, this.y)) {
                    this.x = nextX;
                }
                break;
            default: // down
                nextY = this.y + amount;
                if(this.isValid(panel, this.shape, this.x, nextY)) {
                    this.y = nextY;
                } else {
                    return false; // can't go down so get next tetromino
                }
        }

        return true;
    }

    isValid(panel, shape, x, y, gX, gY) {
        let h = shape.length;
        let w = shape[0].length;

        let ph = panel.length;
        let pw = panel[0].length;

        for(let i = 0; i < h ; i++) {
            for(let j = 0; j < w; j++) {
                if(shape[i][j] == 1) {

                    let r = y + i;
                    let c = x + j;

                    // Out of the panel?
                    if(r == ph || c < 0 || c == pw) {
                        return false;
                    }
                    // console.log(panel[r][c]);
                    // Intersecting with previous blocks?
                    if(panel[r][c] != 0) {
                        // console.log("intersecting r " + r  + " c " + c + " ph " +  ph + " pw " + pw);
                        return false;
                    }

                }
            }
        }

        return true;
    }

    toString() {
        let str = "";
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.col; j++) {
                str += this.shape[i][j];
            }

            str += "\n";
        }

        return str;
    }
}
