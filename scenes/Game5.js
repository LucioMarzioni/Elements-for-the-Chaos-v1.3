export default class Game5 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Game5")
    }
  
    init() {
      // init variables
      // take data passed from other scenes
      this.gameOver = false;
      this.timer = 10;
      this.score = 0;
      this.activateshield = false;
      this.activatedown = false;
      this.gems = {
        gemu: { points: 3 },
        gemd: { points: 3 },
        gemt: { points: 3 },
      };
    }
  
    preload() {
      // load assets
      this.load.image("backg", "./public/background.png");
      this.load.image("floor", "./public/Floorl.png");
      this.load.image("plataform", "./public/plataform.png");
      this.load.image("gemu", "./public/gem.png");
      this.load.image("gemd", "./public/gem.png");
      this.load.image("gemt", "./public/gem.png");
      this.load.spritesheet("player", "./public/FinalplayerRework.png", { frameWidth: 172, frameHeight: 375});
      this.load.image("upe", "./public/upE.png");
      this.load.image("upv", "./public/upV.png");
      this.load.image("uptd", "./public/powerupa.png")
      this.load.spritesheet("impactback", "./public/impactback.png", { frameWidth: 1000, frameHeight: 600});
      this.load.audio("arcadeweekend2", ["./music/Arcadeweekend2.mp3"]);
      this.load.audio("coin", ["./music/Pickup_Coin12.wav"]);
      this.load.audio("powerups", ["./music/Powerup12.wav"]);
      this.load.audio("final", ["./music/final.mp3"]);
      this.load.spritesheet("electricd", "./public/electricsf.png", { frameWidth: 300, frameHeight: 300});
      this.load.spritesheet("electricd2", "./public/electricsf.png", { frameWidth: 300, frameHeight: 300});
      this.load.spritesheet("iced", "./public/icesf.png", { frameWidth: 258, frameHeight: 255});
      this.load.spritesheet("iced2", "./public/icesf.png", { frameWidth: 258, frameHeight: 255});
      this.load.spritesheet("fired", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
      this.load.spritesheet("toxicd", "./public/toxicsf.png", { frameWidth: 253, frameHeight: 253});
      this.load.spritesheet("toxicd2", "./public/toxicsf.png", { frameWidth: 253, frameHeight: 253});
      this.load.spritesheet("fired2", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
      this.load.spritesheet("fired3", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
      this.load.spritesheet("fired4", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
      this.load.image("warning", "./public/warning.png")
      this.load.image("shield", "./public/Escudo.png")
      this.load.image("vel", "./public/velocidad.png")
      this.load.image("todown", "./public/abajo.png")
      this.load.image("impact", "./public/impact.png")
      this.load.audio("firesound", ["./music/firesound.mp3"]);
      this.load.audio("icesound", ["./music/icesound.mp3"]);
      this.load.audio("toxicsound", ["./music/acidsound.mp3"]);
      this.load.audio("electricsound", ["./music/electricsound.mp3"]);
      this.load.image("fireresto", "./public/firerestor.png")
      this.load.image("firerestoo", "./public/firerestor.png")
      this.load.image("firerestooo", "./public/firerestor.png")
      this.load.image("firerestoooo", "./public/firerestor.png")
      this.load.image("iceresto", "./public/icerestor.png")
      this.load.image("icerestoo", "./public/icerestor.png")
      this.load.image("acidresto", "./public/acidrestor.png")
      this.load.image("acidrestoo", "./public/acidrestor.png")
      this.load.image("electricresto", "./public/electricrestor.png")
      this.load.image("electricrestoo", "./public/electricrestor.png")
    }
  
    create() {
      this.speed = 350;
      
  
      this.sound.pauseOnBlur = false;
  
      const music = this.sound.add("arcadeweekend2");
      music.loop = true;
  
      music.play();
  
      //fondo
      this.backg = this.add.image(500, 300, "backg");
      //piso
      this.floor = this.physics.add.staticGroup();
      this.floor.create(500, 575, "floor").setScale(0.5).refreshBody();
  
      
      //plataforma izquierda
      this.plataform = this.physics.add.staticGroup();
      this.plataform.create(150, 375, "plataform").setScale(0.3).refreshBody();
      //plataforma derecha
      this.plataform.create(850, 375, "plataform").setScale(0.3).refreshBody();
      //plataforma arriba
      this.plataform.create(500, 165, "plataform").setScale(0.3).refreshBody();
  
      //gema izquierda 1
      this.gemu = this.physics.add.image(
        Phaser.Math.Between(100, 100),
        Phaser.Math.Between(320, 320),
        "gemu"
      ).setScale(0.3)
      this.gemu.body.setSize(20, 20);
      this.gemu.body.setAllowGravity(false);
  
      //gema derecha 2
      this.gemd = this.physics.add.image(
        Phaser.Math.Between(900, 900),
        Phaser.Math.Between(510, 510),
        "gemd"
      ).setScale(0.3)
      this.gemd.body.setSize(20, 20);
      this.gemd.body.setAllowGravity(false);
  
      this.gemt = this.physics.add.image(
        Phaser.Math.Between(500, 500),
        Phaser.Math.Between(100, 100),
        "gemt"
      ).setScale(0.3)
      this.gemt.body.setSize(20, 20);
      this.gemt.body.setAllowGravity(false);
  
      //Personaje
      this.player = this.physics.add.sprite(500, 450, "player");
      this.player.setScale(0.1);
      this.player.setCollideWorldBounds(true);
      
  
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 7, end: 0 }),
        frameRate: 12,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 8 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
        frameRate: 12,
        repeat: -1
    });
  
    this.anims.create({
      key: 'jumpl',
      frames: [ { key: 'player', frame: 5 } ],
      frameRate: 20,
    });
  
    this.anims.create({
      key: 'jumpr',
      frames: [ { key: 'player', frame: 11 } ],
      frameRate: 10,
    });
  
    this.anims.create({
      key: 'firea',
      frames: this.anims.generateFrameNumbers('fired', { start: 0, end: 13 }),
      frameRate: 10,
      repeat: -1
  });
     
   this.anims.create({
      key: 'fireaa',
      frames: this.anims.generateFrameNumbers('fired2', { start: 0, end: 13 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
        key: 'fireaaa',
        frames: this.anims.generateFrameNumbers('fired3', { start: 0, end: 13 }),
        frameRate: 10,
        repeat: -1
      });

    this.anims.create({
        key: 'fireaaaa',
        frames: this.anims.generateFrameNumbers('fired4', { start: 0, end: 13 }),
        frameRate: 10,
        repeat: -1
      });  

    this.anims.create({
      key: 'toxica',
      frames: this.anims.generateFrameNumbers('toxicd', { start: 0, end: 8 }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
        key: 'toxicaa',
        frames: this.anims.generateFrameNumbers('toxicd2', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: -1
      });
    
    this.anims.create({
      key: 'electrica',
      frames: this.anims.generateFrameNumbers('electricd', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
        key: 'electricaa',
        frames: this.anims.generateFrameNumbers('electricd2', { start: 0, end: 5 }),
        frameRate: 20,
        repeat: -1
      });  
  
    this.anims.create({
      key: 'icea',
      frames: this.anims.generateFrameNumbers('iced', { start: 0, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
        key: 'iceaa',
        frames: this.anims.generateFrameNumbers('iced2', { start: 0, end: 15 }),
        frameRate: 10,
        repeat: -1
      });

    this.player.anims.play('turn');
  
      this.icetime = setTimeout(() => {
      this.warning = this.add.image(30, 525, "warning").setScale(0.08);
      this.time.delayedCall(3000, () => {
      this.iced = this.physics.add.sprite(10, 525, "iced").setScale(0.08);
      this.iced.anims.play('icea');
      this.iced.setCollideWorldBounds(true);
      this.physics.add.collider(this.iced, this.floor);
      this.physics.add.collider(this.iced, this.plataform);
      this.warning.destroy();
      this.physics.add.overlap(
        this.player,
        this.iced,
        this.enemyTouch,
        null,
        this
      );
      this.warning.destroy();
    });
      }, 45000)

      this.icetime2 = setTimeout(() => {
        this.time.delayedCall(3000, () => {
        this.iced2 = this.physics.add.sprite(10, 525, "iced2").setScale(0.08);
        this.iced2.anims.play('icea');
        this.iced2.setCollideWorldBounds(true);
        this.physics.add.collider(this.iced2, this.floor);
        this.physics.add.collider(this.iced2, this.plataform);
        this.warning.destroy();
        this.physics.add.overlap(
          this.player,
          this.iced2,
          this.enemyTouch2,
          null,
          this
        );
        this.warning.destroy();
      });
        }, 47000)

      
      this.firetime = setTimeout(() => {
        this.warning = this.add.image(30, 330, "warning").setScale(0.08);
        this.time.delayedCall(3000, () => {
        this.fired = this.physics.add.sprite(10, 330, "fired").setScale(0.08);
        this.fired.anims.play('firea');
        this.fired.setCollideWorldBounds(true);
        this.physics.add.collider(this.fired, this.floor);
        this.physics.add.collider(this.fired, this.plataform);
        this.physics.add.overlap(
          this.player,
          this.fired,
          this.enemyTouchFire,
          null,
          this
        );
        this.time.delayedCall(6000, () => {
        this.warning.destroy();
        })
       })
      }, 15000)
      
      
      this.fireetime = setTimeout(() => {
          this.warning = this.add.image(970, 330, "warning").setScale(0.08);
          this.time.delayedCall(3000, () => {
          this.fired2 = this.physics.add.sprite(990, 330, "fired2").setScale(0.08);
          this.fired2.anims.play('fireaa');
          this.fired2.setCollideWorldBounds(true);
          this.physics.add.collider(this.fired2, this.floor);
          this.physics.add.collider(this.fired2, this.plataform);
          this.physics.add.overlap(
            this.player,
            this.fired2,
            this.enemyTouchFire2,
            null,
            this
          );
        });
          }, 30000) 

      this.fireeetime = setTimeout(() => {
            this.time.delayedCall(3000, () => {
            this.fired3 = this.physics.add.sprite(10, 330, "fired3").setScale(0.08);
            this.fired3.anims.play('fireaaa');
            this.fired3.setCollideWorldBounds(true);
            this.physics.add.collider(this.fired3, this.floor);
            this.physics.add.collider(this.fired3, this.plataform);
            this.warning.destroy();
            this.physics.add.overlap(
              this.player,
              this.fired3,
              this.enemyTouchFire3,
              null,
              this
            ); 
          });
            }, 18000)  

      this.fireeeetime = setTimeout(() => {
            this.time.delayedCall(3000, () => {
            this.fired4 = this.physics.add.sprite(990, 330, "fired4").setScale(0.08);
            this.fired4.anims.play('fireaaaa');
            this.fired4.setCollideWorldBounds(true);
            this.physics.add.collider(this.fired4, this.floor);
            this.physics.add.collider(this.fired4, this.plataform);
            this.warning.destroy();
            this.physics.add.overlap(
                  this.player,
                  this.fired4,
                  this.enemyTouchFire4,
                  null,
                  this
                );  
              });
                }, 33000)      
          
      this.toxictime = setTimeout(() => {
        this.warning = this.add.image(50, 50, "warning").setScale(0.08);
        this.time.delayedCall(3000, () => {
        this.toxicd = this.physics.add.sprite(50, 50, "toxicd").setScale(0.08);
        this.toxicd.anims.play('toxica');
        this.toxicd.setCollideWorldBounds(true);
        this.physics.add.collider(this.toxicd, this.floor);
        this.toxicd.setBounce(1);
        this.toxicd.setVelocity(300, 400);
        this.warning.destroy();
        this.physics.add.overlap(
          this.player,
          this.toxicd,
          this.enemyTouchToxic,
          null,
          this
         );
        });
      }, 85000)
    
      this.toxictime2 = setTimeout(() => {
        this.time.delayedCall(3000, () => {
        this.toxicd2 = this.physics.add.sprite(50, 50, "toxicd2").setScale(0.08);
        this.toxicd2.anims.play('toxicaa');
        this.toxicd2.setCollideWorldBounds(true);
        this.physics.add.collider(this.toxicd2, this.floor);
        this.toxicd2.setBounce(1);
        this.toxicd2.setVelocity(300, 400);
        this.warning.destroy();
        this.physics.add.overlap(
          this.player,
          this.toxicd2,
          this.enemyTouchToxic2,
          null,
          this
         );
        });
      }, 88000)
      
      this.electrictime = setTimeout(() => {
        this.warning = this.add.image(370, 100, "warning").setScale(0.08);
        this.time.delayedCall(3000, () => {
        this.electricd = this.physics.add.sprite(365, 100, "electricd").setScale(0.08);
        this.electricd.anims.play('electrica');
        this.electricd.setCollideWorldBounds(true);
        this.physics.add.collider(this.electricd, this.floor);
        this.physics.add.collider(this.electricd, this.plataform);
        this.warning.destroy();
        this.physics.add.overlap(
        this.player,
        this.electricd,
        this.enemyTouchElectric,
        null,
        this
         );
        });
      }, 100000)
      
      this.electrictime2 = setTimeout(() => {
        this.time.delayedCall(3000, () => {
        this.electricd2 = this.physics.add.sprite(365, 100, "electricd2").setScale(0.08);
        this.electricd2.anims.play('electricaa');
        this.electricd2.setCollideWorldBounds(true);
        this.physics.add.collider(this.electricd2, this.floor);
        this.physics.add.collider(this.electricd2, this.plataform);
        this.warning.destroy();
        this.physics.add.overlap(
        this.player,
        this.electricd2,
        this.enemyTouchElectric2,
        null,
        this
         );
        });
      }, 105000)
  
      //Colisión de personaje con pisos
      this.physics.add.collider(this.player, this.floor);
      this.physics.add.collider(this.player, this.plataform);
  
      //Accion al tocar las gemas
      this.physics.add.overlap(
        this.player,
        this.gemu,
        this.collisionHandler1,
        null,
        this
      );
      this.physics.add.overlap(
        this.player,
        this.gemd,
        this.collisionHandler2,
        null,
        this
      );
      this.physics.add.overlap(
        this.player,
        this.gemt,
        this.collisionHandler3,
        null,
        this
      );
  
      this.cursor = this.input.keyboard.createCursorKeys();
      //this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  
      this.recolectables = this.physics.add.group();
      this.physics.add.collider(
        this.player,
        this.recolectables,
        this.pj,
        null,
        this
      );
  
      this.recolectables2 = this.physics.add.group();
      this.physics.add.collider(
        this.player,
        this.recolectables2,
        this.pj2,
        null,
        this
      );
  
      this.time.addEvent({
        delay: 1000,
        callback: this.handlerTimer,
        callbackScope: this,
        loop: true,
      });
  
      //contador
      this.timerText = this.add.text(825, 10, `Time:${this.timer}`, {
        fontSize: "32px",
        fill: "#fff",
      });
  
      //score
      this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
        fontSize: "32px",
        fill: "#fff",
      });
  
      this.time.addEvent({
        delay: 15000,
        callback: this.onSecond,
        callbackScope: this,
        loop: true,
      });
  
      this.time.addEvent({
        delay: 26300,
        callback: this.onSecond2,
        callbackScope: this,
        loop: true,
      });
  
      setTimeout(() => {
      this.tweens.add({
        targets: this.iced,
        x: 990,
        ease: "ease-out", //linear  //ease line
        duration: 2000,
        repeat: -1,
        yoyo: true,
      });
      }, 48200)

      setTimeout(() => {
        this.tweens.add({
          targets: this.iced2,
          x: 990,
          ease: "ease-out", //linear  //ease line
          duration: 2000,
          repeat: -1,
          yoyo: true,
        });
        }, 50200)
  
      setTimeout(() => {
        this.tweens.add({
          targets: this.fired,
          x: 295,
          ease: "ease-out", //linear  //ease line
          duration: 3000,
          repeat: -1,
          yoyo: true,
        });
        }, 18200)
  
      setTimeout(() => {
        this.tweens.add({
            targets: this.fired2,
            x: 705,
            ease: "ease-out", //linear  //ease line
            duration: 3000,
            repeat: -1,
            yoyo: true,
          });
          }, 33200)
      
      setTimeout(() => {
        this.tweens.add({
            targets: this.fired3,
            x: 295,
            ease: "ease-out", //linear  //ease line
            duration: 3000,
            repeat: -1,
            yoyo: true,
            });
      }, 21200)    

      setTimeout(() => {
        this.tweens.add({
            targets: this.fired4,
            x: 705,
            ease: "ease-out", //linear  //ease line
            duration: 3000,
            repeat: -1,
            yoyo: true,
            });
      }, 36200)    
  
      
      setTimeout(() => { 
          this.tweens.add({
            targets: this.electricd,
            x: 635,
            duration: 500,
            repeat: -1,
            hold: 5000,
            repeatDelay: 5000,
            ease: 'expo.in',
            yoyo: true,
        }
      );
        }, 103200)

      setTimeout(() => { 
        this.tweens.add({
          targets: this.electricd2,
          x: 635,
          duration: 500,
          repeat: -1,
          hold: 5000,
          repeatDelay: 5000,
          ease: 'expo.in',
          yoyo: true,
        }
      );
      }, 108200)

    }
  
    
  
  update() {
    // update game objects
    //if (this.r.isDown) {
    //  this.scene.restart();
    //}
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player.anims.play('left', true);
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn', true);
    }
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-900);  
    }
    if (!this.player.body.touching.down && this.cursor.left.isDown) {
      this.player.anims.play("jumpl", true)
    } else if (!this.player.body.touching.down && this.cursor.right.isDown) {
      this.player.anims.play("jumpr", true)
    }
    if (!this.player.body.touching.down && this.cursor.down.isDown && this.activatedown) {
      this.player.setVelocityY(1000);
    }
    
  
    this.scoreText.setText("score:" + this.score);
  }
  
    collisionHandler1() {
      this.gemu.x = Phaser.Math.Between(-100, -100);
      this.gemu.y = Phaser.Math.Between(-100, -100);
      setTimeout(() => {
        this.gemu.x = Phaser.Math.Between(25, 900);
        this.gemu.y = Phaser.Math.Between(200, 320);
      }, 3000);
      this.gemu.setVelocity(0, 0);
      this.score += 3;
      this.timer += 3;
      this.sound.pauseOnBlur = false;
  
      const music = this.sound.add("coin");
      music.volume = 0.9
      music.play();
    }
  
    collisionHandler2() {
      this.gemd.x = Phaser.Math.Between(-100, -100);
      this.gemd.y = Phaser.Math.Between(-100, -100);
      setTimeout(() => {
        this.gemd.x = Phaser.Math.Between(25, 900);
        this.gemd.y = Phaser.Math.Between(420, 500);
      }, 3000);
      this.gemd.setVelocity(0, 0);
      this.score += 3;
      this.timer += 3;
      this.sound.pauseOnBlur = false;
  
      const music = this.sound.add("coin");
      music.volume = 0.9
      music.play();
    }
  
    collisionHandler3() {
      this.gemt.x = Phaser.Math.Between(-100, -100);
      this.gemt.y = Phaser.Math.Between(-100, -100);
      setTimeout(() => {
        this.gemt.x = Phaser.Math.Between(25, 900);
        this.gemt.y = Phaser.Math.Between(50, 120);
      }, 3000);
      this.gemt.setVelocity(0, 0);
      this.score += 3;
      this.timer += 3;
      this.sound.pauseOnBlur = false;
  
      const music = this.sound.add("coin");
      music.volume = 0.9
      music.play();
  
    }
  
    enemyTouch() {
      this.iced.destroy();
      const music = this.sound.add("icesound");
  
      music.play();
      this.icedtime = setTimeout(() => {
        this.iced = this.physics.add.sprite(10, 525, "iced").setScale(0.08);
        this.iced.anims.play('icea');
        this.iced.setCollideWorldBounds(true);
        this.physics.add.collider(this.iced, this.floor);
        this.physics.add.collider(this.iced, this.plataform);
        this.physics.add.overlap(
        this.player,
        this.iced,
        this.enemyTouch,
        null,
        this
        )
        this.tweens.add({
          targets: this.iced,
          x: 990,
          ease: "ease-out", //linear  //ease line
          duration: 2000,
          repeat: -1,
          yoyo: true,
        });
      }, 5000)
        if (!this.activateshield) {
        this.iceresto = this.add.image(940, 70, "iceresto").setScale(0.5);
        this.timer -= 10;
        this.time.delayedCall(1500, () => {
          this.iceresto.destroy();
        });
      }
    }

    enemyTouch2() {
        this.iced2.destroy();
        const music = this.sound.add("icesound");
    
        music.play();
        this.icedtimee = setTimeout(() => {
          this.iced2 = this.physics.add.sprite(10, 525, "iced2").setScale(0.08);
          this.iced2.anims.play('iceaa');
          this.iced2.setCollideWorldBounds(true);
          this.physics.add.collider(this.iced2, this.floor);
          this.physics.add.collider(this.iced2, this.plataform);
          this.physics.add.overlap(
          this.player,
          this.iced2,
          this.enemyTouch2,
          null,
          this
          )
          this.tweens.add({
            targets: this.iced2,
            x: 990,
            ease: "ease-out", //linear  //ease line
            duration: 2000,
            repeat: -1,
            yoyo: true,
          });
        }, 5000)
          if (!this.activateshield) {
          this.icerestoo = this.add.image(940, 70, "icerestoo").setScale(0.5);
          this.timer -= 10;
          this.time.delayedCall(1500, () => {
            this.icerestoo.destroy();
          });
        }
      }
  
    enemyTouchFire() {
      this.fired.destroy();
      const music = this.sound.add("firesound");
  
      music.play();
      this.firedtime = setTimeout(() => {
        this.fired = this.physics.add.sprite(10, 330, "fired").setScale(0.08);
        this.fired.anims.play('firea');
        this.fired.setCollideWorldBounds(true);
        this.physics.add.collider(this.fired, this.floor);
        this.physics.add.collider(this.fired, this.plataform);
        this.physics.add.overlap(
        this.player,
        this.fired,
        this.enemyTouchFire,
        null,
        this
        )
        this.tweens.add({
          targets: this.fired,
          x: 295,
          ease: "ease-out", //linear  //ease line
          duration: 3000,
          repeat: -1,
          yoyo: true,
        });
      }, 5000)
      
        if (!this.activateshield) {
        this.fireresto = this.add.image(940, 70, "fireresto").setScale(0.5);  
        this.timer -= 10;
        this.time.delayedCall(1500, () => {
          this.fireresto.destroy();
        });
      }
    }
      
    enemyTouchFire2() {
      this.fired2.destroy();
      const music = this.sound.add("firesound");
  
      music.play();
      this.fireedtime = setTimeout(() => {
        this.fired2 = this.physics.add.sprite(990, 330, "fired2").setScale(0.08);
        this.fired2.anims.play('fireaa');
        this.fired2.setCollideWorldBounds(true);
        this.physics.add.collider(this.fired2, this.floor);
        this.physics.add.collider(this.fired2, this.plataform);
        
        this.physics.add.overlap(
        this.player,
        this.fired2,
        this.enemyTouchFire2,
        null,
        this
        )
        this.tweens.add({
          targets: this.fired2,
          x: 705,
          ease: "ease-out", //linear  //ease line
          duration: 3000,
          repeat: -1,
          yoyo: true,
        });
      }, 5000)
        if (!this.activateshield) {
        this.firerestoo = this.add.image(940, 70, "firerestoo").setScale(0.5);  
        this.timer -= 10;
        this.time.delayedCall(1500, () => {
          this.firerestoo.destroy();
        });
      }
    }
  
    enemyTouchFire3() {
        this.fired3.destroy();
        const music = this.sound.add("firesound");
    
        music.play();
        this.fireeedtime = setTimeout(() => {
          this.fired3 = this.physics.add.sprite(10, 330, "fired3").setScale(0.08);
          this.fired3.anims.play('fireaaa');
          this.fired3.setCollideWorldBounds(true);
          this.physics.add.collider(this.fired3, this.floor);
          this.physics.add.collider(this.fired3, this.plataform);
          this.physics.add.overlap(
          this.player,
          this.fired3,
          this.enemyTouchFire3,
          null,
          this
          )
          this.tweens.add({
            targets: this.fired3,
            x: 295,
            ease: "ease-out", //linear  //ease line
            duration: 3000,
            repeat: -1,
            yoyo: true,
          });
        }, 5000)
        
          if (!this.activateshield) {
          this.firerestooo = this.add.image(940, 70, "firerestooo").setScale(0.5);  
          this.timer -= 10;
          this.time.delayedCall(1500, () => {
            this.firerestooo.destroy();
          });
        }
      }
    
      enemyTouchFire4() {
        this.fired4.destroy();
        const music = this.sound.add("firesound");
    
        music.play();
        this.fireeeedtime = setTimeout(() => {
          this.fired4 = this.physics.add.sprite(990, 330, "fired4").setScale(0.08);
          this.fired4.anims.play('fireaaaa');
          this.fired4.setCollideWorldBounds(true);
          this.physics.add.collider(this.fired4, this.floor);
          this.physics.add.collider(this.fired4, this.plataform);
          this.physics.add.overlap(
          this.player,
          this.fired4,
          this.enemyTouchFire4,
          null,
          this
          )
          this.tweens.add({
            targets: this.fired4,
            x: 295,
            ease: "ease-out", //linear  //ease line
            duration: 3000,
            repeat: -1,
            yoyo: true,
          });
        }, 5000)
        
          if (!this.activateshield) {
          this.firerestoooo = this.add.image(940, 70, "firerestoooo").setScale(0.5);  
          this.timer -= 10;
          this.time.delayedCall(1500, () => {
            this.firerestoooo.destroy();
          });
        }
      }

    enemyTouchToxic() {
      this.toxicd.destroy();
      const music = this.sound.add("toxicsound");
  
      music.play();
      this.toxicdtime = setTimeout(() => {
        this.toxicd = this.physics.add.sprite(50, 50, "toxicd").setScale(0.08);
        this.toxicd.anims.play('toxica');
        this.toxicd.setCollideWorldBounds(true);
        this.physics.add.collider(this.toxicd, this.floor);
        this.toxicd.setBounce(1);
        this.toxicd.setVelocity(300, 400);
        this.physics.add.overlap(
            this.player,
            this.toxicd,
            this.enemyTouchToxic,
            null,
            this
           );
        }, 3000)
        if (!this.activateshield) {
        this.acidresto = this.add.image(940, 70, "acidresto").setScale(0.5);
        this.timer -= 10;
        this.time.delayedCall(1500, () => {
          this.acidresto.destroy();
        });
      }
    }
  
    enemyTouchToxic2() {
        this.toxicd2.destroy();
        const music = this.sound.add("toxicsound");
    
        music.play();
        this.toxicdtime2 = setTimeout(() => {
          this.toxicd2 = this.physics.add.sprite(50, 50, "toxicd2").setScale(0.08);
          this.toxicd2.anims.play('toxicaa');
          this.toxicd2.setCollideWorldBounds(true);
          this.physics.add.collider(this.toxicd2, this.floor);
          this.toxicd2.setBounce(1);
          this.toxicd2.setVelocity(300, 400);
          this.physics.add.overlap(
              this.player,
              this.toxicd2,
              this.enemyTouchToxic2,
              null,
              this
             );
          }, 3000)
          if (!this.activateshield) {
          this.acidrestoo = this.add.image(940, 70, "acidrestoo").setScale(0.5);
          this.timer -= 10;
          this.time.delayedCall(1500, () => {
            this.acidrestoo.destroy();
          });
        }
      }

    enemyTouchElectric() {
      this.electricd.destroy(); 
      const music = this.sound.add("electricsound");
  
      music.play();
      this.electricdtime = setTimeout(() => {
        this.electricd = this.physics.add.sprite(365, 100, "electricd").setScale(0.08);
        this.electricd.anims.play('electrica');
        this.electricd.setCollideWorldBounds(true);
        this.physics.add.collider(this.electricd, this.floor);
        this.physics.add.collider(this.electricd, this.plataform);
        this.physics.add.overlap(
        this.player,
        this.electricd,
        this.enemyTouchElectric,
        null,
        this
         );
         this.tweens.add({
          targets: this.electricd,
          x: 635,
          duration: 500,
          repeat: -1,
          hold: 5000,
          repeatDelay: 5000,
          ease: 'expo.in',
          yoyo: true,
         }
         );
      }, 3000)
      if (!this.activateshield) {
      this.electricresto = this.add.image(940, 70, "electricresto").setScale(0.5);
      this.timer -= 10;
      this.time.delayedCall(1500, () => {
        this.electricresto.destroy();
      });
      }
    }
  
    enemyTouchElectric2() {
        this.electricd2.destroy(); 
        const music = this.sound.add("electricsound");
    
        music.play();
        this.electricdtime2 = setTimeout(() => {
          this.electricd2 = this.physics.add.sprite(365, 100, "electricd2").setScale(0.08);
          this.electricd2.anims.play('electricaa');
          this.electricd2.setCollideWorldBounds(true);
          this.physics.add.collider(this.electricd2, this.floor);
          this.physics.add.collider(this.electricd2, this.plataform);
          this.physics.add.overlap(
          this.player,
          this.electricd2,
          this.enemyTouchElectric2,
          null,
          this
           );
           this.tweens.add({
            targets: this.electricd2,
            x: 635,
            duration: 500,
            repeat: -1,
            hold: 5000,
            repeatDelay: 5000,
            ease: 'expo.in',
            yoyo: true,
           }
           );
        }, 3000)
        if (!this.activateshield) {
        this.electricrestoo = this.add.image(940, 70, "electricrestoo").setScale(0.5);
        this.timer -= 10;
        this.time.delayedCall(1500, () => {
          this.electricrestoo.destroy();
        });
        }
      }
  
    onSecond() {
      const tipos = ["upe", "upv"];
      const tipo = Phaser.Math.RND.pick(tipos);
      let recolectable = this.recolectables.create(
        Phaser.Math.Between(10, 790),
        0,
        tipo
      )
      recolectable.setVelocity(0, 0);
      recolectable.setBounce(0.5);
      recolectable.setScale(0.2);
      recolectable.setGravity(0, -1000);
    }
  
    onSecond2() {
      const tipos2 = ["uptd"];
      const tipo2 = Phaser.Math.RND.pick(tipos2);
      let recolectable2 = this.recolectables2.create(
        Phaser.Math.Between(10, 790),
        0,
        tipo2
      );
      recolectable2.setVelocity(0, 0);
      recolectable2.setBounce(0.5);
      recolectable2.setScale(0.2);
      recolectable2.setGravity(0, -1000);
    }
  
    handlerTimer() {
      this.timer -= 1;
      this.timerText.setText(`Time:${this.timer}`);
      if (this.timer <= 0) {
        this.sound.get("arcadeweekend2").stop();
        this.sound.get("arcadeweekend2").destroy();
        this.sound.pauseOnBlur = false;
       
        const music = this.sound.add("final");
  
        music.play(); 
        clearTimeout(this.firetime)
        clearTimeout(this.icetime) 
        clearTimeout(this.icetimee) 
        clearTimeout(this.fireetime)
        clearTimeout(this.fireeetime)
        clearTimeout(this.fireeeetime)
        clearTimeout(this.toxictime)
        clearTimeout(this.toxictime2)
        clearTimeout(this.electrictime)
        clearTimeout(this.electrictime2)
        clearTimeout(this.firedtime)
        clearTimeout(this.icedtime)
        clearTimeout(this.icedtimee)
        clearTimeout(this.fireedtime)
        clearTimeout(this.fireeedtime)
        clearTimeout(this.fireeeedtime)
        clearTimeout(this.toxicdtime)
        clearTimeout(this.electricdtime)
        clearTimeout(this.toxicdtime2)
        clearTimeout(this.electricdtime2)
       this.scene.start("Gameover5", { score: this.score });  
      }
    }
  
    pj2(_player, recolectables2) {
      if (recolectables2.texture.key === "uptd") {
        console.log("uptd recolectado");
        this.todown = this.add.image(740, 25, "todown").setScale(0.5);
        this.activatedown = true;
        this.time.delayedCall(10000, () => {
          this.activatedown = false;
          this.todown.destroy();
          console.log("prueba");
         });  
      }
  
      recolectables2.destroy();
      this.sound.pauseOnBlur = false;
  
      const music = this.sound.add("powerups");
  
      music.play();
    }
  
    pj(_player, recolectables) {
  
      if (recolectables.texture.key === "upe") {
        console.log("upe recolectado");
        this.shield = this.add.image(790, 25, "shield").setScale(0.5);
        this.activateshield = true;
        this.time.delayedCall(5000, () => {
          this.activateshield = false;
          this.shield.destroy();
          console.log("prueba");
         });  
      }   
  
      if (recolectables.texture.key === "upv") {
        console.log("upv recolectado");
        this.vel = this.add.image(790, 25, "vel").setScale(0.5);
        this.speed = 500;
        this.time.delayedCall(10000, () => {
          this.speed = 300;
          this.vel.destroy();
          console.log("prueba");
        });
      }
      recolectables.destroy();
      this.sound.pauseOnBlur = false;
  
      const music = this.sound.add("powerups");
  
      music.play();
    
    } 
  }
  