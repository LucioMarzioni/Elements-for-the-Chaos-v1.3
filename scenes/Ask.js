export default class Ask extends Phaser.Scene {
    constructor() {
      super("Ask");
    }
    init(){
    }

    preload(){
    this.load.image("backgask", "./public/askimar.png");
    this.load.image("goback", "./public/homeb.png");
    this.load.audio("flytrap2", [ "./music/flytrap2.mp3"])
    this.load.audio('tick', [ './music/sound2.mp3'])
    this.load.audio('tock', [ './music/sound1.mp3'])
    }
    
    create(){
    this.backg = this.add.image(500, 300, "backgask");   
    this.goback = this.add.image(927, 532, "goback")

    this.sound.pauseOnBlur = false;

    const music = this.sound.add("flytrap2");
    music.loop = true
    
    music.play()

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

    this.goback.setInteractive();
    this.goback.on("pointerdown", () =>{
      this.sound.get("flytrap2").stop();
      this.sound.get("flytrap2").destroy();
      const music = this.sound.add("tock");
      music.volume = 2.5
      music.play();
      this.scene.start("main")
    })
    }

    update(){
        
    

    }
}