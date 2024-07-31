export default class Gameover4 extends Phaser.Scene {
    constructor() {
      super("Gameover4");
    }
    init(data){
      this.score = data.score
    }

    preload(){
    this.load.image("gaver", "./public/gameover.png");
    this.load.image("homeb", "./public/homeb.png");
    this.load.image("repeat", "./public/retryb.png")
    this.load.audio('tick', [ './music/sound2.mp3'])
    this.load.audio('tock', [ './music/sound1.mp3'])
    }
    
    create(){ 
    this.gaver = this.add.image(500, 300, "gaver"); 
    this.homeb = this.add.image(565, 450, "homeb"); 
    this.repeat = this.add.image(435, 450, "repeat")
    this.scoreText = this.add.text(
      420,
      290,
      `Score: ${this.score}`, {
        fontSize: "32px",
      fill: "#fff",
      }
    );

    this.input.on('gameobjectover', (pointer, gameObject) =>
      {

          gameObject.setScale(1.1)
          const music = this.sound.add("tick");
          music.volume = 0.6
          music.play();

      });

      this.input.on('gameobjectout', (pointer, gameObject) =>
      {

          gameObject.setScale(1);

      });

    this.homeb.setInteractive();
    this.homeb.on("pointerdown", () =>{
      const music = this.sound.add("tock");
      music.volume = 2.5
      music.play();
      this.playing = 0
      this.scene.start("main")
    })

    this.repeat.setInteractive();
    this.repeat.on("pointerdown", () =>{  
      const music = this.sound.add("tock");
      music.volume = 2.5
      music.play();  
      this.scene.start("Game3");  
    })

    }
    update(){
      this.scoreText.setText( "score:"+this.score );
    }

}    