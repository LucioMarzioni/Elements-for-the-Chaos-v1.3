export default class Lvlmenu extends Phaser.Scene {
    constructor() {
      super("Lvlmenu");
    }

    init(){
    }

    preload(){
        this.load.image("backg2", "./public/backgroundbrillo.png");
        this.load.image("backg", "./public/background.png");
        this.load.image("lv1", "./public/border1.png");
        this.load.image("lv2", "./public/border2.png");
        this.load.image("lv3", "./public/border3.png");
        this.load.image("lv4", "./public/border4.png");
        this.load.image("lv5", "./public/border5.png");
        this.load.image("lv6", "./public/border6.png");
        this.load.image("lv7", "./public/border7.png");
        this.load.image("lv8", "./public/border8.png");
        this.load.image("lv9", "./public/border9.png");
        this.load.image("lv10", "./public/border10.png");
        this.load.image("lv11", "./public/border11.png");
        this.load.image("lv12", "./public/border12.png");
        this.load.image("lv13", "./public/border13.png");
        this.load.image("lv14", "./public/border14.png");
        this.load.image("lv15", "./public/border15.png");
        this.load.image("lv16", "./public/border16.png");
        this.load.image("lv17", "./public/border17.png");
        this.load.image("goback", "./public/homeb.png");
        this.load.audio("flytrap2", [ "./music/flytrap2.mp3"])
        this.load.audio('tick', [ './music/sound2.mp3'])
        this.load.audio('tock', [ './music/sound1.mp3'])
    }
    create(){
        this.backg = this.add.image(500, 300, "backg2");
        this.lv1 = this.add.image(120, 120, "lv1");
        this.lv2 = this.add.image(270, 120, "lv2");
        this.lv3 = this.add.image(420, 120, "lv3");
        this.lv4 = this.add.image(570, 120, "lv4");
        this.lv5 = this.add.image(720, 120, "lv5");
        this.lv6 = this.add.image(870, 120, "lv6");
        this.lv7 = this.add.image(120, 310, "lv7");
        this.lv8 = this.add.image(270, 310, "lv8");
        this.lv9 = this.add.image(420, 310, "lv9");
        this.lv10 = this.add.image(570, 310, "lv10");
        this.lv11 = this.add.image(720, 310, "lv11");
        this.lv12 = this.add.image(870, 310, "lv12");
        this.lv13 = this.add.image(120, 500, "lv13");
        this.lv14 = this.add.image(270, 500, "lv14");
        this.lv15 = this.add.image(420, 500, "lv15");
        this.lv16 = this.add.image(570, 500, "lv16");
        this.lv17 = this.add.image(720, 500, "lv17");
        this.goback = this.add.image(870, 500, "goback")

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

          this.lv1.setInteractive();
          this.lv1.on("pointerdown", () =>{
            this.sound.get("flytrap2").stop();
            this.sound.get("flytrap2").destroy();
            const music = this.sound.add("tock");
            music.volume = 2.5
            music.play();
            this.scene.start("Game")
          })

          this.lv2.setInteractive();
          this.lv2.on("pointerdown", () =>{
            this.sound.get("flytrap2").stop();
            this.sound.get("flytrap2").destroy();
            const music = this.sound.add("tock");
            music.volume = 2.5
            music.play();
            this.scene.start("Game2")
          })

          this.lv3.setInteractive();
          this.lv3.on("pointerdown", () =>{
            this.sound.get("flytrap2").stop();
            this.sound.get("flytrap2").destroy();
            const music = this.sound.add("tock");
            music.volume = 2.5
            music.play();
            this.scene.start("Game3")
          })

          this.lv4.setInteractive();
          this.lv4.on("pointerdown", () =>{
            this.sound.get("flytrap2").stop();
            this.sound.get("flytrap2").destroy();
            const music = this.sound.add("tock");
            music.volume = 2.5
            music.play();
            this.scene.start("Game4")
          })


          this.lv5.setInteractive();
          this.lv5.on("pointerdown", () =>{
            this.sound.get("flytrap2").stop();
            this.sound.get("flytrap2").destroy();
            const music = this.sound.add("tock");
            music.volume = 2.5
            music.play();
            this.scene.start("Game5")
          })

          this.lv6.setInteractive();
          this.lv6.on("pointerdown", () =>{
            this.sound.get("flytrap2").stop();
            this.sound.get("flytrap2").destroy();
            const music = this.sound.add("tock");
            music.volume = 2.5
            music.play();
            this.scene.start("Game6")
          })



          }       

    update(){
    }
      
}