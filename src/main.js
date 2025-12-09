// TODO: Melhorar movimentação do player
// Melhorar plataformas (casos de uma coladinha na outra)
// inimigos do player
// animação inicial
// achar sprites de baixa resolução
// animaçoes dos sprites
// sons
// ataque do player
//

import Phaser from 'phaser';

//Audios - inicio alteração André
import soundgame from "url:../assets/soundgame1.mp3";
import soundcoin from "url:../assets/coin.mp3";
import soundshot from "url:../assets/shot.mp3";
import soundexplosion from "url:../assets/bomb explosion.mp3";
import soundwow from "url:../assets/wow.mp3";
import soundplane from "url:../assets/soundplane.mp3";
import soundplayer from "url:../assets/soundplayer.mp3";
import aligator from "url:../assets/aligator.png";
import deadaligator from "url:../assets/deadaligator.png";
import soundenemy from "url:../assets/soundenemy.mp3";
import missil from "url:../assets/missil.png";
//fim

import charPng from "url:../assets/player.png";
import planePng from "url:../assets/plane.png";
import skyPng from "url:../assets/sky2.png";
import cloudPng from "url:../assets/cloud.png";
import grassPng from "url:../assets/grass.png";
import treePng from "url:../assets/tree.png";
import bulletPng from "url:../assets/bullet.png";
import bombPng from "url:../assets/bomb.png";
import explosionPng from "url:../assets/explosion.png";
import coin from "url:../assets/coin.png";
import logoAviao from "url:../assets/logoAviao.png";
import logoCapivara from "url:../assets/logoCapivara.png";
import barraVida from "url:../assets/barraVida.png";
import tileLeft from "url:../assets/tileSpriteEsquerdo.png";
import tileRight from "url:../assets/tileSpriteDireita.png";
import tileCenter from "url:../assets/tileSpriteCentro.png";


const width = 800;
const height = 600;

const platYs = [150, 200, 250, 300, 350, 400, 450, 500, 550];

const timeMultiplier = 10;
const coinMultiplier = 5;

const DepthHUD = 3;

class StartScene extends Phaser.Scene {
    constructor(){
        super({key: 'StartScene'});
    }

    preload(){
        this.load.image('sky', skyPng);
        this.load.image('cloud', cloudPng);
        this.load.image('grass', grassPng);
        this.load.image('tree', treePng);
        this.load.image('player', charPng);
        this.load.image('plane', planePng); 
    }

    create(){
        //this.cameras.main.setBackgroundColor('#000');

        this.skyBg = this.add.image(0, 0, 'sky').setOrigin(0, 0).setDisplaySize(width, height);
        this.cloud1 = this.add.image(0, 0, 'cloud').setOrigin(0).setDisplaySize(800, 600);
        this.cloud2 = this.add.image(800, 0, 'cloud').setOrigin(0).setDisplaySize(800, 600);
        this.grass1 = this.add.image(0, 0, 'grass').setOrigin(0).setDisplaySize(800, 600);
        this.grass2 = this.add.image(800, 0, 'grass').setOrigin(0).setDisplaySize(800, 600);
        this.tree1 = this.add.image(0, 0, 'tree').setOrigin(0).setDisplaySize(800, 600);
        this.tree2 = this.add.image(800, 0, 'tree').setOrigin(0).setDisplaySize(800, 600);

        this.plane_player = this.physics.add.sprite(200, 300, 'plane').setScale(0.4, 0.4).setDepth(1).setDamping(true);
        this.plane_player.body.setImmovable(true);
        this.plane_player.body.setAllowGravity(false);
        this.plane_player.body.setSize(320, 40, true).setOffset(-10, 70);

        this.player = this.physics.add.sprite(200, 260, 'player').setScale(0.07, 0.07);
        this.player.body.setGravityY(1400);

        this.physics.add.collider(this.plane_player, this.player);

        const wipeColor = 0x000000;
        this.transitionDuration = 1000

        this.screenWipe = this.add.rectangle(-1000, -1000, 2000, 2000, wipeColor)
                                    .setDepth(100)
                                    .setScrollFactor(0)
                                    .setAngle(45);

        
      this.title = this.add.text(550, 200, 'CAPYBARA\nAIRWAYS', {
            fontFamily: 'Arial',         // troca pra fonte pixel se tiver
            fontSize: '80px',            // bem maior
            fontStyle: 'bold',
            align: 'center',
            color: '#ffd23c',            // amarelo igual
            stroke: '#000000',           // borda preta
            strokeThickness: 12,         // contorno grosso
            shadow: {
                offsetX: 5,
                offsetY: 5,
                color: '#000000',
                blur: 0,
                fill: false
            }
        }).setOrigin(0.5);
        
        this.pressEnter = this.add.text(550, 350, "Press ENTER to Start", {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.enterTween = this.tweens.add({
            targets: this.pressEnter,
            alpha: 0,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
        
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    
    update(time, delta){
        const dt = delta / 1000;
        
        const scrollSpeedCloud = 10;
        const scrollSpeedGrass = 20;
        const scrollSpeedTree = 90;
    
        this.cloud1.x -= scrollSpeedCloud * dt;
        this.cloud2.x -= scrollSpeedCloud * dt;
        this.grass1.x -= scrollSpeedGrass * dt;
        this.grass2.x -= scrollSpeedGrass * dt;
        this.tree1.x -= scrollSpeedTree * dt;
        this.tree2.x -= scrollSpeedTree * dt;
    
        if (this.cloud1.x <= -800) this.cloud1.x = this.cloud2.x + 800;
        if (this.cloud2.x <= -800) this.cloud2.x = this.cloud1.x + 800;
        if (this.grass1.x <= -800) this.grass1.x = this.grass2.x + 800;
        if (this.grass2.x <= -800) this.grass2.x = this.grass1.x + 800;
        if (this.tree1.x <= -800) this.tree1.x = this.tree2.x + 800;
        if (this.tree2.x <= -800) this.tree2.x = this.tree1.x + 800;

        let velY =  Math.sin(time * 0.001) * 25;
        this.plane_player.setVelocityY(velY);


        if (Phaser.Input.Keyboard.JustDown(this.enter)) {

            this.tweens.remove(this.enterTween);

            this.tweens.add({
                targets: [this.title, this.pressEnter],
                alpha: 0,
                duration: 800,
                yoyo: false,
                repeat: 0
            })

            this.tweens.add({
                targets: this.plane_player.body.velocity,
                x: 400,
                duration: 3000,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.screenWipe,
                        alpha: 1,
                        x: 800,
                        y: 600,
                        duration: 1000,
                        ease: 'Quad.easeIn',
                        onComplete: () => {
                            this.scene.start('GameScene', {isIntro: true});
                        }
                    })  
                }
            })

            this.time.delayedCall(5000, () => {
                console.log("5 segundos");
            })

            //this.scene.start('GameScene');
        }
    }
}

class GameScene extends Phaser.Scene {

    init(data) {
        this.isIntro = data.isIntro || false;
    }

    animatePlayerEntrance() {
        // Personagens se movem de uma posição lateral (ex: 100) para o centro (400)
        
        // Faz o avião vir do lado de fora (ex: -100) para a posição inicial (400)
        this.plane_player.x = -100;
        this.player.x = -100;
        this.player.y = this.plane_player.y + 10;

        this.player.body.setAllowGravity(false);
        this.player.body.setVelocity(0, 0);

        this.tweens.add({
            targets: [this.plane_player, this.player],
            x: 400, // Posição X final
            duration: 1000,
            ease: 'Quad.easeOut',
            onComplete: () => {
                // Transição finalizada. Jogo pronto para os controles.
                console.log("Personagens prontos na posição inicial.");
                this.isCutscene = false;
                this.player.body.setAllowGravity(true);
                this.player.body.setVelocityY(10);
                this.isIntro = false;
            }
        });
    }

    animateScore(textObj, targetScore, duration = 1000) {
        const startValue = parseInt(textObj.text) || 0;
        let scoreObject = { value: startValue };

        this.tweens.add({
            targets: scoreObject,
            value: targetScore,
            duration: duration,
            ease: 'Power2.out',
            onUpdate: () => {
                textObj.setText(Math.floor(scoreObject.value).toString());
            },
            onComplete: () => {
                textObj.setText(targetScore.toString());
            }
        });
    }

    HighScore(time, score, coins) {
        let timeScore = time * timeMultiplier;
        let coinsScore = coins * coinMultiplier;

        this.add.text(300, 250, 'SCORE: ', {
            setDepth: '10',
            fontSize: '30px',
            color: '#fff700ff',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            shadow: { offsetX: 3, offsetY: 2, color: '#000', blur: 2, stroke: false, fill: true }
        }).setOrigin(0.5).setDepth(DepthHUD);

        this.add.text(300, 350, 'TIME BONUS: ', {
            fontSize: '30px',
            color: '#fff700ff',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            shadow: { offsetX: 3, offsetY: 2, color: '#000', blur: 2, stroke: false, fill: true }
        }).setOrigin(0.5).setDepth(DepthHUD);

        this.add.text(300, 450, 'COINS BONUS: ', {
            fontSize: '30px',
            color: '#fff700ff',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            shadow: { offsetX: 3, offsetY: 2, color: '#000', blur: 2, stroke: false, fill: true }
        }).setOrigin(0.5).setDepth(DepthHUD);

        let scoreText = this.add.text(550, 250, '0', {
            fontSize: '35px',
            color: '#ffffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            shadow: { offsetX: 2, offsetY: 1, color: '#000', blur: 0, stroke: false, fill: true }
        }).setOrigin(0.5).setDepth(DepthHUD);

        let timeBonusText = this.add.text(550, 350, '0', {
            fontSize: '35px',
            color: '#ffffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            shadow: { offsetX: 2, offsetY: 1, color: '#000', blur: 0, stroke: false, fill: true }
        }).setOrigin(0.5).setDepth(DepthHUD);

        let coinsBonusText = this.add.text(550, 450, '0', {
            fontSize: '35px',
            color: '#ffffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            shadow: { offsetX: 2, offsetY: 1, color: '#000', blur: 0, stroke: false, fill: true }
        }).setOrigin(0.5).setDepth(DepthHUD);

        this.animateScore(scoreText, score);
        this.animateScore(timeBonusText, timeScore);
        this.animateScore(coinsBonusText, coinsScore);
    }

    // --- Métodos de Spawn ---

    spawnBomb() {
        const y = Phaser.Math.Between(50, 600); // altura aleatória
        const bomb = this.bombs.get(width + 50, y); // aparece fora da tela (lado direito)

        if (bomb) {
            bomb.setActive(true);
            bomb.setVisible(true);
            bomb.body.setAllowGravity(false);
            bomb.setVelocityX(this.bombsSpeedX); // vem pra esquerda
            bomb.body.setMaxVelocityX(this.BOMBS_MAX_SPEED);
            bomb.setScale(0.08);
            bomb.setSize(450, 600);
            bomb.startY = y; // guarda a posição original
            bomb.oscSpeed = 0.1;
            bomb.amplitude = Phaser.Math.Between(50, 300);
            bomb.startTime = this.time.now; // referência inicial
            bomb.direction = Phaser.Math.Between(0, 1) === 0 ? 1 : -1;
        }
    }

    //andre missil
    spawnMissile() {
        const yRandom = Phaser.Math.Between(50, 500); // posição Y aleatória

        const missile = this.missiles.create(800, yRandom, "missil"); // aparece à direita
        missile.setScale(0.1);
        missile.setSize(600, 600);
        missile.setVelocityX(-100);  // velocidade inicial pra esquerda

        missile.isChasing = true;    // começa perseguindo
        missile.startTime = this.time.now; // guarda o tempo do spawn
        missile.chaseDuration = 2000; // persegue por 2s
    }
    //fim

    spawnPlatforms() {
        let platsToSpawn;
        const percentage = Phaser.Math.Between(1, 100);

        if (percentage >= 60) platsToSpawn = 2;
        else platsToSpawn = 1;

        for (let i = 0; i < platsToSpawn; i++) {
            this._spawnPlatform(platsToSpawn);
        }
    }

    _spawnPlatform(platsToSpawn) {
        const tam = Phaser.Math.Between(3, 8);
        const block_width = 78;
        const block_height = 70;
        const full_width = tam * block_width;

        let y;
        let randomY = Phaser.Math.RND.pick(platYs);

        if (platsToSpawn == 2) {
            if (this.lastY == null) {
                y = randomY;
                this.lastY = randomY;
            } else {
                for (let i = 0; i < 20; i++) {
                    randomY = Phaser.Math.RND.pick(platYs);
                    if (Math.abs(randomY - this.lastY) > 150) {
                        y = randomY;
                        this.lastY = y;
                        break;
                    }
                }
            }
        } else {
            y = randomY;
        }

        let posX = 800;

        // container único
        const cont = this.add.container(posX, y);

        for (let i = 0; i < tam; i++) {
            let key;
            if (i == 0) key = 'leftTile';
            else if (i == tam - 1) key = 'rightTile';
            else key = 'centerTile';

            const tile = this.add.tileSprite(i * (block_width * 0.5), 0, block_width, block_height, key)
                .setOrigin(0, 0).setScale(0.5);

            cont.add(tile);
        }

        // cria physics body do container
        this.physics.add.existing(cont);
        cont.body.setImmovable(true)
            .setAllowGravity(false)
            .setSize(full_width / 2, block_height / 2);

        this.platforms.add(cont);

        // --- Spawn de Moeda ---
        const coinX = posX + full_width / 4;
        const coinY = y - 40;
        const coin = this.coins.create(coinX, coinY, 'coin');
        coin.setScale(0.09)
            .setBounce(0)
            .setSize(300, 300);

        // spawn aligator andre
        if (tam > 5) {
            const platformLeft = posX;
            const enemyX = platformLeft + full_width / 2;
            const enemyY = y - (block_height * 0.5) - 10;

            const enemy = this.enemies.create(enemyX, enemyY, 'aligator');
            enemy.setFlipX(true);
            enemy.setScale(0.15);
            enemy.body.setSize(380, 450);
            enemy.body.setAllowGravity(false);
            enemy.setDepth(1);

            // guarda dados de patrulha
            enemy.patrol = {
                leftOffset: 10,
                rightOffset: (full_width / 2) - 10,
                dir: 1,
                speed: 60
            };

            enemy.platform = cont;
        }
    }

    updateSpawnerDelay(newDelay) {
        this.platsDelay = newDelay;
        this.platformSpawner.remove();
        this.platformSpawner = this.time.addEvent({
            delay: this.platsDelay,
            callback: this.spawnPlatforms,
            callbackScope: this,
            loop: true
        });
    }

    // --- Métodos de Lógica/Impacto ---

    handleBombHit(bomb, source) {
        if (!bomb.active) return;

        bomb.setScale(0.35);
        bomb.setTexture('explosion');
        bomb.setVelocity(0);
        bomb.body.enable = false;

        if (source === 'plane') {
            console.log('💥 O avião foi atingido!');
        } else if (source === 'bullet') {
            console.log('💥 Bomba destruída por tiro!');
        } else if (source === 'player') {
            console.log('💥 Bomba destruída por tiro!');
        }

        this.time.delayedCall(500, () => {
            bomb.setActive(false);
            bomb.setVisible(false);
            this.bombs.remove(bomb, true, true);
        });
    }

    // --- Métodos Principais do Phaser ---

    preload() {
        
        this.load.audio('musicajogo1', soundgame);
        this.load.audio('soundbomb', soundexplosion);
        this.load.audio('soundcoin', soundcoin);
        this.load.audio('soundshot', soundshot);
        this.load.audio('soundwow', soundwow);
        this.load.audio('soundplayer', soundplayer);
        this.load.audio('soundplane', soundplane);
        this.load.audio('soundenemy', soundenemy);
        this.load.image('aligator', aligator);
        this.load.image('deadaligator', deadaligator);
        this.load.image('missil', missil);
        this.load.image('player', charPng);
        this.load.image('plane', planePng);
        this.load.image('sky', skyPng);
        this.load.image('cloud', cloudPng);
        this.load.image('grass', grassPng);
        this.load.image('tree', treePng);
        this.load.image('bullet', bulletPng);
        this.load.image('bomb', bombPng);
        this.load.image('explosion', explosionPng);
        this.load.image('coin', coin);
        this.load.image('leftTile', tileLeft);
        this.load.image('rightTile', tileRight);
        this.load.image('centerTile', tileCenter);
        this.load.image('logoAviao', logoAviao);
        this.load.image('logoCapivara', logoCapivara);
        this.load.image('barraVida', barraVida);
    }

    constructor(){
        super ({ key: 'GameScene'});
    }

    create() {
        this.isCutscene = this.isIntro;

        // Inicio audio andre
        this.musica = this.sound.add('musicajogo1', { loop: true, volume: 0.1 });
        this.musica.once('play', () => {
            console.log('Áudio começou IMEDIATO!');
        });
        this.musica.play();
        this.soundexplosion = this.sound.add('soundbomb', { volume: 0.2 });
        this.soundcoin = this.sound.add('soundcoin', { volume: 0.1 });
        this.soundshot = this.sound.add('soundshot', { volume: 0.1 });
        this.soundwow = this.sound.add('soundwow', { volume: 0.5 });
        this.soundenemy = this.sound.add('soundenemy', { volume: 0.2 });
        this.soundplane = this.sound.add('soundplane', { volume: 0.2 });
        this.soundplayer = this.sound.add('soundplayer', { volume: 0.2 });

        // --- Inicialização de Variáveis da Cena ---
        this.score = 0;
        this.coinsQtd = 0;
        this.initialTime = this.time.now;
        this.lastY = null;
        this.playerOnPlatform = null;
        this.playerOnPlane = true;
        this.playerDead = false;
        this.planeDead = false;
        this.gameOver = false;

        let startX = 300;
        if (this.isIntro) startX = -150;

        // --- Variáveis de Movimentação ---
        this.onAir = false;
        this.jumping = false;
        this.velPlayer = 600;
        this.jumpForce = 500;
        this.velPlane = 700;
        this.MAX_PLAT_SPEED = 400;
        this.platformVel = 100;
        this.platsDelay = 5000;
        this.BASE_DELAY = 5000;
        this.spawnTimer = 0;
        this.bombsSpeedX = -150;
        this.BOMBS_MAX_SPEED = 300;

        // --- Cenário Parallax ---
        this.skyBg = this.add.image(0, 0, 'sky').setOrigin(0, 0).setDisplaySize(width, height);
        this.cloud1 = this.add.image(0, 0, 'cloud').setOrigin(0).setDisplaySize(800, 600);
        this.cloud2 = this.add.image(800, 0, 'cloud').setOrigin(0).setDisplaySize(800, 600);
        this.grass1 = this.add.image(0, 0, 'grass').setOrigin(0).setDisplaySize(800, 600);
        this.grass2 = this.add.image(800, 0, 'grass').setOrigin(0).setDisplaySize(800, 600);
        this.tree1 = this.add.image(0, 0, 'tree').setOrigin(0).setDisplaySize(800, 600);
        this.tree2 = this.add.image(800, 0, 'tree').setOrigin(0).setDisplaySize(800, 600);

        // --- HUD ---
        this.scoreText = this.add.text(705, 22, 'SCORE: 0', {
            fontSize: '13px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setScrollFactor(0).setShadow(0, 2, '#000000', 5).setDepth(DepthHUD);

        this.timerText = this.add.text(636, 22, 'TIME: 0', {
            fontSize: '13px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setScrollFactor(0).setShadow(0, 2, '#000000', 5).setDepth(DepthHUD);

        this.HUDcoin = this.add.image(730, 60, 'coin').setScale(0.055, 0.055).setDepth(DepthHUD);
        this.coinQtd = this.add.text(760, 51, '0', {
            fontSize: '13px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setScrollFactor(0).setShadow(2, 2, '#000000', 3).setDepth(DepthHUD);

        this.TestCoinX = this.add.text(745, 50, 'x', {
            fontSize: '13px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setScrollFactor(0).setShadow(2, 2, '#000000', 3).setDepth(DepthHUD);

        // --- Grupos de Física ---
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 3
        });

        this.coins = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.bombs = this.physics.add.group({
            defaultKey: 'bomb',
            maxSize: 3
        });

        this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.logoAviao = this.add.image(40, 25, 'logoAviao')
            .setScale(0.06).setDepth(DepthHUD).setScrollFactor(0);

        this.logoCapivara = this.add.image(40, 60, 'logoCapivara')
            .setScale(0.06).setDepth(DepthHUD).setScrollFactor(0);

        this.enemies = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.time.addEvent({
            delay: 2500,
            callback: this.spawnBomb,
            callbackScope: this,
            loop: true
        });

        //andre
        // GRUPO DE MISSEIS
        this.missiles = this.physics.add.group();

        // TIMER PARA SPAWN DE MISSEIS (a cada 3-6 segundos)
        this.time.addEvent({
            delay: Phaser.Math.Between(10000, 20000), // tempo aleatório
            callback: this.spawnMissile,
            callbackScope: this,
            loop: true
        });
        //fim
        // --- Controles (Inputs) ---
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // --- Configuração dos Sprites ---
        this.plane_player = this.physics.add.sprite(startX, 300, 'plane').setScale(0.4, 0.4).setDepth(1).setDamping(true);
        this.plane_player.body.setImmovable(false);
        this.plane_player.body.setAllowGravity(false);
        this.plane_player.body.pushable = false;
        this.plane_player.body.setVelocityX(0);
        this.plane_player.body.setMass(1);
        this.plane_player.body.setMaxVelocity(300);
        this.plane_player.body.setSize(320, 40, true).setOffset(-10, 70);
        this.plane_player.invencivel = false;

        this.player = this.physics.add.sprite(startX, 250, 'player').setScale(0.07, 0.07);
        this.player.body.setGravityY(1400);
        this.player.body.setMaxVelocityX(300);
        this.player.setDepth(0);
        this.player.body.setSize(600, 800).setOffset(200, 200);
        this.player.invencivel = false;

        // --- Lógica de Vida (Avião) ---
        this.plane_player.maxHealth = 100;
        this.plane_player.health = this.plane_player.maxHealth;
        this.plane_player.takeDamage = (amount) => {
            if (this.plane_player.invencivel) return;
            this.soundplane.play();
            this.plane_player.health -= amount;
            if (this.plane_player.health < 0) this.plane_player.health = 0;

            this.activeInvencibilityPlane(1000);
            console.log(`Avião: ${this.plane_player.health} HP`);
            this._updateHealthBars();

            if (this.plane_player.health === 0) {
                this.planeDead = true;
                this.playerOnPlatform = false;
                console.log("💥 Avião destruído!");
                this.plane_player.clearTint();
                this.plane_player.setTexture('explosion');
                this.plane_player.setScale(0.4);
                this.plane_player.body.enable = false;
                this.plane_player.setVelocity(0, 0);

                this.time.delayedCall(600, () => {
                    this.plane_player.setVisible(false);
                    this.plane_player.setActive(false);
                    this.plane_player.destroy();
                });
            }
        };

        // --- Lógica de Vida (Jogador) ---
        this.player.maxHealth = 100;
        this.player.health = this.player.maxHealth;
        this.player.takeDamage = (amount) => {
            if (this.player.invencivel) return;

            this.soundplayer.play();
            this.player.health -= amount;
            if (this.player.health < 0) this.player.health = 0;

            this.activeInvencibilityPlayer(1000);
            console.log(`Jogador: ${this.player.health} HP`);
            this._updateHealthBars();

            if (this.player.health === 0) {
                this.playerDead = true;
                console.log("💀 Jogador morreu!");
                this.player.clearTint();
                this.player.setTexture('explosion');
                this.player.setScale(0.4);
                this.player.body.enable = false;
                this.player.setVelocity(0, 0);

                this.time.delayedCall(600, () => {
                    this.player.setVisible(false);
                    this.player.setActive(false);
                    this.player.destroy();
                });
            }
        };

        // --- HUD de Vida (Gráficos) ---
        this.healthBarGraphics = this.add.graphics();
        this._updateHealthBars();

        // --- Configuração de Colisões e Overlaps ---
        this.physics.add.collider(this.plane_player, this.player, () => {
            if (this.plane_player.body.touching.up) this.playerOnPlane = true;
        });

        this.physics.add.collider(this.player, this.platforms, (player, platform) => {
            if (player.body.touching.down && platform.body.touching.up) {
                this.playerOnPlatform = platform;
            }
        });

        this.physics.add.collider(this.plane_player, this.platforms, () => {
            this.plane_player.takeDamage(10);
        });

        this.physics.add.overlap(this.bullets, this.bombs, (bullet, bomb) => {
            this.handleBombHit(bomb, 'bullet');
            this.soundexplosion.play();
            bullet.setActive(false).setVisible(false);
            this.bullets.killAndHide(bullet);
            this.score += 5;
            this.scoreText.setText('SCORE: ' + this.score);
            bullet.destroy();
        });

        this.physics.add.overlap(this.player, this.coins, (_, coin) => {
            this.soundcoin.play();
            coin.destroy();
            this.coinsQtd++;
            this.coinQtd.setText(this.coinsQtd);
        });

        this.physics.add.overlap(this.plane_player, this.coins, (_, coin) => {
            this.soundcoin.play();
            coin.destroy();
            this.coinsQtd++;
            this.coinQtd.setText(this.coinsQtd);
        });

        this.physics.add.overlap(this.plane_player, this.bombs, (_, bomb) => {
            this.soundexplosion.play();
            this.handleBombHit(bomb, 'plane');
            this.plane_player.takeDamage(25);
        });

        this.physics.add.overlap(this.player, this.bombs, (_, bomb) => {
            this.soundexplosion.play();
            this.handleBombHit(bomb, 'player');
            this.player.takeDamage(25);
        });

        this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
            if (enemy.body.touching.up && this.player.body.touching.down) {
                this.soundenemy.play();
                enemy.setScale(0.12);
                enemy.body.enable = false;
                enemy.setTexture('deadaligator');
                this.score += 10;
                this.scoreText.setText('SCORE: ' + this.score);
                this.time.delayedCall(500, () => {
                    enemy.setActive(false).setVisible(false);
                    this.enemies.killAndHide(enemy);
                    enemy.destroy();
                });
            } else {
                player.takeDamage(20);
            }
        });

        this.physics.add.collider(this.plane_player, this.enemies, (plane_player, enemy) => {
            plane_player.takeDamage(20);
        });

        this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => {
            this.soundenemy.play();
            enemy.setScale(0.12);
            enemy.setTexture('deadaligator');
            this.time.delayedCall(200, () => {
                enemy.setActive(false).setVisible(false);
                this.enemies.killAndHide(enemy);
                enemy.destroy();
            });
            bullet.setActive(false).setVisible(false);
            this.bullets.killAndHide(bullet);
            bullet.destroy();
            this.score += 10;
            this.scoreText.setText('SCORE: ' + this.score);
        });
        // andre colisão com missil
        this.physics.add.collider(this.player, this.missiles, (player, missile) => {
            if (player.body.touching.up && missile.body.touching.down) {
                // encostou por cima → ativa gravidade
                missile.setGravityY(300);
                this.time.delayedCall(1500, () => missile.destroy());
            } else {
                // dano normal
                player.takeDamage(10);
                missile.setTexture('explosion'); // coloca sprite de explosão
                missile.setScale(0.3);
                missile.body.enable = false; // desativa corpo físico

                this.time.delayedCall(300, () => {
                    missile.destroy(); // destrói depois da animação
                });
            }
        });

        // PLANE bate no MÍSSEL → leva MAIS dano
        this.physics.add.collider(this.plane_player, this.missiles, (plane, missile) => {
            plane.takeDamage(40);
            missile.setTexture('explosion'); // coloca sprite de explosão
            missile.setScale(0.3);
            missile.body.enable = false; // desativa corpo físico

            this.time.delayedCall(300, () => {
                missile.destroy(); // destrói depois da animação
            });
        });
        this.physics.add.overlap(this.bullets, this.missiles, (bullet, missile) => {
            this.soundexplosion.play();
            missile.setTexture('explosion'); // coloca sprite de explosão
            missile.setScale(0.3);
            missile.body.enable = false; // desativa corpo físico

            this.time.delayedCall(300, () => {
                missile.destroy(); // destrói depois da animação
            });
            bullet.setActive(false).setVisible(false);
            this.bullets.killAndHide(bullet);
            bullet.destroy();
        });
        //fim

        // --- Listeners de Input (Pulo) ---
        this.upKey.on("down", () => {
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(-this.jumpForce);
                this.onAir = true;
                this.jumping = true;
            }
        });

        this.upKey.on("up", () => {
            if (this.onAir && this.jumping && this.player.body.velocity.y < 0) {
                this.player.body.setVelocityY(0);
                this.jumping = false;
            }
        });
    }

    // --- Método de Atualização do HUD --
    _updateHealthBars() {
        this.healthBarGraphics.clear();

        const totalBlocks = 20;
        const blockWidth = 8;
        const blockHeight = 10;

        const handleLowHpBlink = (pct, targetKey) => {
            const tweenFlag = targetKey + "LowHpTweenActive";
            if (pct < 0.25) {
                if (!this[tweenFlag]) {
                    this[tweenFlag] = true;
                    this.tweens.add({
                        targets: this.healthBarGraphics,
                        alpha: 0.3,
                        yoyo: true,
                        repeat: -1,
                        duration: 200
                    });
                }
            } else {
                if (this[tweenFlag]) {
                    this[tweenFlag] = false;
                    this.tweens.killTweensOf(this.healthBarGraphics);
                    this.healthBarGraphics.alpha = 1;
                }
            }
        };

        const drawPixelBar = (x, y, current, max) => {
            const pct = current / max;
            const filledBlocks = Math.floor(totalBlocks * pct);

            for (let i = 0; i < totalBlocks; i++) {
                let color = 0xff0000;
                if (pct > 0.7) color = 0x00ff00;
                else if (pct > 0.3) color = 0xffff00;
                else if (pct > 0.15) color = 0xff8000;

                if (i < filledBlocks) {
                    this.healthBarGraphics.fillStyle(0x000000, 0.6);
                    this.healthBarGraphics.fillRect(x + i * (blockWidth + 1) + 2, y + 2, blockWidth, blockHeight);
                    this.healthBarGraphics.fillStyle(color);
                    this.healthBarGraphics.setDepth(DepthHUD);
                    this.healthBarGraphics.fillRect(x + i * (blockWidth + 1), y, blockWidth, blockHeight);
                } else {
                    this.healthBarGraphics.fillStyle(0x000000, 0.6);
                    this.healthBarGraphics.fillRect(x + i * (blockWidth + 1) + 2, y + 2, blockWidth, blockHeight);
                    this.healthBarGraphics.fillStyle(0x444444);
                    this.healthBarGraphics.setDepth(DepthHUD);
                    this.healthBarGraphics.fillRect(x + i * (blockWidth + 1), y, blockWidth, blockHeight);
                }
            }
        };

        drawPixelBar(56, 21, this.plane_player.health, this.plane_player.maxHealth);
        drawPixelBar(56, 55, this.player.health, this.player.maxHealth);

        // -----------------------------------------------------
        // INÍCIO DA LÓGICA DE TRANSIÇÃO INVERSA E ANIMAÇÃO
        // -----------------------------------------------------
        
        // 1. Cria o Retângulo de Revelação (Começa COBRINDO a tela)
        if (this.isIntro) {

            const screenDiagonal = Math.sqrt(width * width + height * height);
            const wipeSize = screenDiagonal * 2;
            
            // Cria o wipe já na posição COBERTA (que é onde o tween da StartScene terminou)
            this.wipe = this.add.rectangle(0, 0, 2000, 2000, 0x000000)
                .setDepth(DepthHUD + 1).setOrigin(0).setScrollFactor(0); // Origin 0,0
    
            // 2. Animação de Revelação (Move o wipe para fora, revelando a GameScene)
            this.tweens.add({
                targets: this.wipe,
                alpha: 0,
                duration: 1500, // Mesma duração da transição
                ease: 'Quad.easeOut',
                onComplete: () => {
                    // Remove o objeto wipe
                    this.wipe.destroy(); 
                    
                    // 3. Inicia a Animação de Entrada dos Personagens
                    this.animatePlayerEntrance();
                }
            });
        }
    }

    // --- Método de Update (Loop Principal) ---
    update(time, delta) {

        if (this.isCutscene) {
            this.player.y = this.plane_player.y - 50; // Ajuste visual simples durante a intro
            return;
        }

        const dt = delta / 1000; // Delta time em segundos

        // --- Atualização do Timer --- 
        let currentTime = parseInt((time - this.initialTime) / 1000);
        if (!this.gameOver) {
            this.timerText.setText("TIME: " + currentTime);
        }

        // --- Atualização de Posições (Bombas, Tiros) ---
        if (Math.abs(this.bombsSpeedX < this.BOMBS_MAX_SPEED)) this.bombsSpeedX -= 0.01;

        this.bombs.children.iterate(bomb => {
            if (!bomb.active) return;
            bomb.y = bomb.startY + Math.sin((this.time.now - bomb.startTime) * 0.005 * bomb.oscSpeed) * bomb.amplitude * bomb.direction;
            bomb.setVelocityX(this.bombsSpeedX);
        });

        this.bullets.children.each(bullet => {
            if (bullet.active && bullet.x > width + 50) {
                bullet.setActive(false).setVisible(false);
                this.bullets.killAndHide(bullet);
            }
        });

        this.bombs.children.each(bomb => {
            if (bomb.active && bomb.x < -50) {
                bomb.setActive(false).setVisible(false);
                this.bombs.killAndHide(bomb);
            }
        });

        // --- Movimento do Cenário (Parallax) ---
        const scrollSpeedCloud = 10;
        const scrollSpeedGrass = 20;
        const scrollSpeedTree = 90;

        this.cloud1.x -= scrollSpeedCloud * dt;
        this.cloud2.x -= scrollSpeedCloud * dt;
        this.grass1.x -= scrollSpeedGrass * dt;
        this.grass2.x -= scrollSpeedGrass * dt;
        this.tree1.x -= scrollSpeedTree * dt;
        this.tree2.x -= scrollSpeedTree * dt;

        if (this.cloud1.x <= -800) this.cloud1.x = this.cloud2.x + 800;
        if (this.cloud2.x <= -800) this.cloud2.x = this.cloud1.x + 800;
        if (this.grass1.x <= -800) this.grass1.x = this.grass2.x + 800;
        if (this.grass2.x <= -800) this.grass2.x = this.grass1.x + 800;
        if (this.tree1.x <= -800) this.tree1.x = this.tree2.x + 800;
        if (this.tree2.x <= -800) this.tree2.x = this.tree1.x + 800;

        //andre missil
        this.missiles.getChildren().forEach(missile => {

            // 1) Perseguição
            if (missile.isChasing) {
                this.physics.moveToObject(missile, this.plane_player, 200); // velocidade ajustada

                // terminou o tempo de caçar?
                if (this.time.now - missile.startTime > missile.chaseDuration) {
                    missile.isChasing = false;
                    const vx = missile.body.velocity.x;
                    const vy = missile.body.velocity.y;

                    missile.setVelocity(vx, vy); // mantém rota original
                }
            }
            if (missile.active) {
                missile.rotation = Math.atan2(missile.body.velocity.y, missile.body.velocity.x) + Math.PI;
            }

            // 2) Se sair da tela → destruir (memória limpa + nada de lag!)
            if (missile.x < -100) { // margem maior pra não sumir na cara
                missile.destroy();
            }
        });

        //fim

        // --- Movimento de Plataformas e Moedas ---
        this.spawnTimer += delta;
        this.platsDelay = this.BASE_DELAY / (this.platformVel / 100);

        if (this.spawnTimer >= this.platsDelay) {
            this.spawnPlatforms();
            this.spawnTimer = 0;
        }

        if (this.platformVel < this.MAX_PLAT_SPEED) this.platformVel += 0.01;

        this.platforms.children.iterate((p) => {
            if (!p) return;
            const body = p.body; // Casting implícito
            if (body) {
                body.setVelocityX(-this.platformVel);
            }

            if (p.x < -800) {
                p.body.enable = false;
                p.destroy();
            }

            this.enemies.children.each((en) => {
                if (en.platform === p) {
                    en.x -= this.platformVel * dt;
                }
            });
        });

        // --- Movimento de patrulha dos inimigos ---
        this.enemies.children.each(en => {
            if (!en.active) return;
            if (!en.platform) return;

            const platX = en.platform.x;
            const leftLimit = platX + en.patrol.leftOffset;
            const rightLimit = platX + en.patrol.rightOffset;

            en.x += en.patrol.dir * en.patrol.speed * dt;

            if (en.patrol.dir > 0) {
                en.setFlipX(false);
            } else {
                en.setFlipX(true);
            }

            if (en.x <= leftLimit) {
                en.x = leftLimit;
                en.patrol.dir = 1;
                en.setFlipX(false);
            } else if (en.x >= rightLimit) {
                en.x = rightLimit;
                en.patrol.dir = -1;
                en.setFlipX(true);
            }

            if (!en.platform.scene || !en.platform.active) {
                en.platform = null;
            }
        });

        this.coins.children.each((coin) => {
            coin.body.x -= this.platformVel * dt;
            if (coin.active && coin.x < -50) {
                coin.destroy();
            }
        });

        if (this.plane_player && this.plane_player.active) {
            let normalizedSpeed = Phaser.Math.Clamp(Math.abs(this.plane_player.body.velocity.y) / 300, 0, 1);
            this.plane_player.rotation = (Math.atan2(this.plane_player.body.velocity.y, Math.abs(this.plane_player.body.velocity.x)) / 6) * normalizedSpeed;

            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                const bullet = this.bullets.get(this.plane_player.x + 80, this.plane_player.y);
                this.soundshot.play();
                this.cameras.main.shake(150, 0.002);

                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, 0);
                    bullet.body.setAllowGravity(true);
                    bullet.setGravity(200);
                    bullet.setVelocityX(600);
                    bullet.setScale(0.2);
                    bullet.setSize(630, 80);

                    const recoil = -120;
                    this.plane_player.body.setVelocityX(this.plane_player.body.velocity.x + recoil);
                }
            }

            // Movimento do Avião
            if (this.aKey.isDown) {
                this.plane_player.body.velocity.x -= this.velPlane * dt;
            } else if (this.dKey.isDown) {
                this.plane_player.body.velocity.x += this.velPlane * dt;
            } else {
                this.plane_player.body.setDragX(0.05);
            }

            if (this.sKey.isDown) {
                this.plane_player.body.velocity.y += this.velPlane * dt;
            } else if (this.wKey.isDown) {
                this.plane_player.body.velocity.y -= this.velPlane * dt;
            } else {
                this.plane_player.body.setDragY(0.05);
            }

            // Limites do Avião
            if (this.plane_player.y > height + 100) {
                console.log("💀 Plane caiu!");
                this.plane_player.takeDamage(100);
            }
            if (this.plane_player.y <= -100) {
                console.log("🚫 Plane saiu por cima!");
                this.plane_player.takeDamage(100);
            }
            if (this.plane_player.x > width + 100) {
                console.log("🚫 Plane saiu pela direita!");
                this.plane_player.takeDamage(100);
            }
            if (this.plane_player.x <= -100) {
                console.log("🚫 Plane saiu pela esquerda!");
                this.plane_player.takeDamage(100);
            }
        }

        // --- Input e Movimento (Player) ---
        if (this.player && this.player.active) {

            // Verificação de limites de tela
            if (this.player.y > height + 100) {
                console.log("💀 Player caiu!");
                this.player.takeDamage(100);
            }
            if (this.player.y <= -100) {
                console.log("🚫 Player saiu por cima!");
                this.player.takeDamage(100);
            }
            if (this.player.x > width + 100) {
                console.log("🚫 Player saiu pela direita!");
                this.player.takeDamage(100);
            }
            if (this.player.x <= -100) {
                console.log("🚫 Player saiu pela esquerda!");
                this.player.takeDamage(100);
            }

            // 1. Calcula a intenção de movimento
            let playerSpeed = 0;
            if (this.leftKey.isDown) {
                playerSpeed = this.onAir ? -this.velPlayer * 0.6 : -this.velPlayer;
            } else if (this.rightKey.isDown) {
                playerSpeed = this.onAir ? this.velPlayer * 0.6 : this.velPlayer;
            }

            // 2. Lógica de Plataforma
            if (this.playerOnPlatform) {
                if (!(this.player.body.touching.down && this.playerOnPlatform.body.touching.up)) {
                    this.playerOnPlatform = null;
                    this.player.body.setVelocityX(playerSpeed);
                } else {
                    this.player.body.setVelocityX(playerSpeed - this.platformVel);
                }
            }
            else if (this.plane_player && this.plane_player.active && this.playerOnPlane) {
                const boundsA = this.player.getBounds();
                const boundsB = this.plane_player.getBounds();
                //boundsA.y += 5;

                if (!Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)) {
                    this.playerOnPlane = false;
                    this.player.body.setVelocityX(playerSpeed);
                } else {
                    this.onAir = false;
                    this.player.body.setVelocityX(this.plane_player.body.velocity.x * 0.95 + playerSpeed);
                    //this.player.body.setVelocityY(this.plane_player.body.velocity.y);
                }
            }
            else {
                this.player.body.setVelocityX(playerSpeed);

                if (playerSpeed === 0 && !this.onAir) {
                    this.player.body.setVelocityX(0);
                }
            }

            if (!this.playerOnPlane) {
                if (this.onAir) {
                    this.player.body.setDragX(0.8);
                }

                if (this.player.body.touching.down) {
                    this.onAir = false;
                } else {
                    this.onAir = true;
                }
            } else {
                this.onAir = false;
            }
        }

        console.log(this.playerOnPlane)

        // --- Lógica de Game Over ---
        if (this.planeDead && this.playerDead && !this.gameOver) {
            this.soundwow.play();
            console.log("GAME OVER");
            this.gameOver = true;
            this.add.text(400, 100, 'GAME OVER', {
                fontSize: '64px',
                color: '#ff0000',
                fontStyle: 'bold',
                fontFamily: 'Arial',
                setDepth: '10'
            }).setOrigin(0.5).setDepth(DepthHUD);

            this.HighScore(currentTime, this.score, this.coinsQtd);

            this.time.delayedCall(5000, () => {
                this.scene.restart({isIntro: false});
                this.musica.stop();
                this.gameOver = false;
                this.planeDead = false;
                this.playerDead = false;
            });
        }
    }

    // Invencibilidade do plane_player
    activeInvencibilityPlane(duration = 1000) {
        this.plane_player.invencivel = true;

        if (this._planeInvTween) {
            this._planeInvTween.stop();
            this._planeInvTween = null;
        }
        if (this._planeInvTimer) {
            this._planeInvTimer.remove(false);
            this._planeInvTimer = null;
        }

        this.plane_player.setAlpha(1);
        const blinkSpeed = 120;
        const repeats = Math.max(0, Math.floor(duration / blinkSpeed));

        this._planeInvTween = this.tweens.add({
            targets: this.plane_player,
            alpha: 0.3,
            yoyo: true,
            repeat: repeats,
            duration: blinkSpeed / 2,
            onComplete: () => {
                this.plane_player.setAlpha(1);
                this._planeInvTween = null;
            }
        });

        this._planeInvTimer = this.time.delayedCall(duration, () => {
            this.plane_player.invencivel = false;
            this.plane_player.setAlpha(1);
            if (this._planeInvTween) {
                this._planeInvTween.stop();
                this._planeInvTween = null;
            }
            this._planeInvTimer = null;
        });
    }

    // Invencibilidade do Player
    activeInvencibilityPlayer(duration = 1000) {
        this.player.invencivel = true;

        if (this._playerInvTween) {
            this._playerInvTween.stop();
            this._playerInvTween = null;
        }
        if (this._playerInvTimer) {
            this._playerInvTimer.remove(false);
            this._playerInvTimer = null;
        }

        this.player.setAlpha(1);
        const blinkSpeed = 120;
        const repeats = Math.max(0, Math.floor(duration / blinkSpeed));

        this._playerInvTween = this.tweens.add({
            targets: this.player,
            alpha: 0.3,
            yoyo: true,
            repeat: repeats,
            duration: blinkSpeed / 2,
            onComplete: () => {
                this.player.setAlpha(1);
                this._playerInvTween = null;
            }
        });

        this._playerInvTimer = this.time.delayedCall(duration, () => {
            this.player.invencivel = false;
            this.player.setAlpha(1);
            if (this._playerInvTween) {
                this._playerInvTween.stop();
                this._playerInvTween = null;
            }
            this._playerInvTimer = null;
        });
    }

} // Fim da classe GameScene

// --- Configuração e Inicialização do Jogo ---

const config = {
    type: Phaser.AUTO,
    scene: [StartScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        width: width,
        height: height
    },
    render: {
        pixelArt: true,
        antialias: false,
    }
};

new Phaser.Game(config);