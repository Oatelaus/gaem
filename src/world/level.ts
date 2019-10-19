import { Grid } from './grid';
// import { GameObjects } from 'phaser';
import { GaemScene } from '../scenes/gaem';
import { levelData } from '../../assets/defs/level/test';
import { Enemy } from './../entity/enemy/enemy';
import { PathNode } from './pathNode';
import { Wave } from '../types/level';
import { NormalLandEnemy } from '../entity/enemy/normal-land-enemy';

export class Level extends Phaser.GameObjects.Container {
	public grid: Grid;
	public enemies: Enemy[] = [];
	public airNodes: PathNode[] = [];
	public nodes: PathNode[] = [];
	public waves: Wave[] = [];
	
	// -- TO DO -- Store level state in a cleaner fashion..

	playerMoney: number = 0;

	currentWave: number = -1;
	currentEnemy: number = -1;
	currentEnemyCount: number = 0;
	waveTimeLeft: number = 2 * 60;
	wavesFinished: boolean = false;
	enemyFinished: boolean = false;
	enemyDelay: number;
	counter: number = 0;
	scene: GaemScene;
	playing: boolean = true;
	postDelay: number;
	
	constructor(scene: GaemScene){
		super(scene, 0, 0);
		this.scene = scene;
		this.scene.add.existing(this);
		this.create();
	}

	create(){		
		this.grid = new Grid(this.scene, levelData);
		for(var i = 0; i < levelData.nodes.length; i++){
			let node = new PathNode(levelData.nodes[i].type, levelData.nodes[i].x, levelData.nodes[i].y);
			this.nodes.push(node);
		}
		this.setActive(true);
		this.enemyDelay = this.waveTimeLeft + levelData.waves[0].waveEnemies[0].spawnDelay;
	}

	preUpdate(time: number, deltaTime: number){
		if(this.playing){
			//check for new wave;
			if(this.enemyFinished && !this.wavesFinished){
				this.postDelay--;
				if(this.postDelay <= 0) this.newWave();
			}

			if((this.currentWave > -1) && !this.wavesFinished){
				this.enemyDelay--;
				if((this.enemyDelay <= 0) && !this.enemyFinished) this.createEnemy();
			}
		}
	}

	newWave(){
		console.log('n wave');

		//handle old wave ending
		if(this.currentWave > -1)
			this.playerMoney += levelData.waves[this.currentWave].reward;
		this.currentEnemy = 0;

		console.log('new wave');

		//start new wave
		this.currentWave++;
		if(this.currentWave < levelData.waves.length){
			this.postDelay = levelData.waves[this.currentWave].postDelay;
			this.createEnemy();
		}else{
			this.wavesFinished = true;
		}
	}

	createEnemy(){
		if(this.currentEnemyCount >= levelData.waves[this.currentWave].waveEnemies[this.currentEnemy].spawnAmount){
			this.currentEnemy++;
			this.currentEnemyCount = 0;
		}

		console.log('creating enemy');

		if(this.currentEnemy < levelData.waves[this.currentWave].waveEnemies.length){
			let enemyDef = levelData.waves[this.currentWave].waveEnemies[this.currentEnemy];

			// -- TO DO -- pick class according to enemy definition
			let enemy = new NormalLandEnemy(this.scene, this.nodes[enemyDef.spawnPos], 'plane', levelData.spritesheet, this);
			

			// let enemy = new Enemy(this.scene, this.ar_nodes[enemyDef.spawnPos], 'plane', levelData.spritesheet, this);
			this.currentEnemyCount++;
			this.enemies.push(enemy);
			enemy.on('entity-destroy', this.testEvent);
			this.enemyDelay = enemyDef.spawnDelay;
		}else{
			this.enemyFinished = true;
			if(this.wavesFinished) this.postDelay = this.waves[this.currentWave].postDelay;
		}	
	}


	getNextNode(currentNodeIndex: number, type: string): PathNode{
		let nodes = (type === 'air') ? this.airNodes : this.nodes;
		return nodes.find((n, i) => i > currentNodeIndex);
	}

	testEvent(event: any){
		console.log(event);
	}

	unitDied(enemy: Enemy, deathDetail: object){

	}
}