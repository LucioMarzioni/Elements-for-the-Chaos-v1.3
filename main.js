import Menu from "./scenes/Menu.js";
import Game from "./scenes/Game.js";
import Game2 from "./scenes/Game2.js";
import Game3 from "./scenes/Game3.js";
import Game4 from "./scenes/Game4.js";
import Game5 from "./scenes/Game5.js";
import Game6 from "./scenes/Game6.js";
import Gameover from "./scenes/Gameover.js";
import Gameover2 from "./scenes/Gameover2.js";
import Gameover3 from "./scenes/Gameover3.js";
import Gameover4 from "./scenes/Gameover4.js";
import Gameover5 from "./scenes/Gameover5.js";
import Gameover6 from "./scenes/Gameover6.js";
import Ask from "./scenes/Ask.js";
import Credits from "./scenes/Credits.js";
import Lvlmenu from "./scenes/Lvlmenu.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1000,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1100 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Menu, Lvlmenu,  Gameover, Ask, Credits, Game2, Game, Game3, Game4, Game5, Game6, Gameover2, Gameover3, Gameover4, Gameover5, Gameover6],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
