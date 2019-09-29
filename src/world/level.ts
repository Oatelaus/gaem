import { Grid } from './grid';
import { GameObjects } from 'phaser';
import { GaemScene } from './../scenes/gaemScene';
import { levelData } from '../../assets/defs/level/test';
import { Enemy } from './../enemy/enemy';
import { PathNode } from './pathNode';
import { Wave } from '../types/levelDef';

export class Level extends Phaser.GameObjects.Container{
	public grid: Grid;
	public ar_enemies: Enemy[] = [];
	public ar_nodes: PathNode[] = [];
	public ar_waves: Wave[] = [];
	
	// -- TO DO -- Store level state in a cleaner fashion..

	playerMoney: number = 0;

	currentWave: number = -1;
	currentEnemy: number = -1;
	currentEnemyCount: number = 0;
	waveTimeLeft: number = 10 * 60;
	wavesFinished: boolean = false;
	enemyDelay: number;
	counter: number = 0;
	scene: GaemScene;

	constructor(scene: GaemScene){
		super(scene, 0, 0);
		this.scene = scene;
		this.scene.add.existing(this);
		this.create();
	}

	create(){
		let image = 'grass1';
		let sheet = 'spritesheet';
		
		this.grid = new Grid(this.scene, levelData);
		for(var i = 0; i < levelData.nodes.length; i++){
			let node = new PathNode(levelData.nodes[i].type, levelData.nodes[i].x, levelData.nodes[i].y);
			this.ar_nodes.push(node);
		}
		this.setActive(true);
		this.enemyDelay = this.waveTimeLeft + levelData.waves[0].waveEnemies[0].spawnDelay;
	}

	preUpdate(time: number, deltaTime: number){

		//check for new wave;
		this.waveTimeLeft--;
		if((this.waveTimeLeft <= 0) && !this.wavesFinished) this.newWave();
		
		this.enemyDelay--;
		if(this.enemyDelay <= 0) this.createEnemy();
	}

	newWave(){
		//handle old wave ending
		if(this.currentWave > -1)
			this.playerMoney += levelData.waves[this.currentWave].reward;
		this.currentEnemy = 0;

		//start new wave
		this.currentWave++;
		if(this.currentWave < levelData.waves.length){
			this.waveTimeLeft = levelData.waves[this.currentWave].duration;
			this.createEnemy();
		}else{
			this.wavesFinished = true;
		}

	}

	createEnemy(){
		console.log("enemy")
		if(this.currentEnemyCount >= levelData.waves[this.currentWave].waveEnemies[this.currentEnemy].spawnAmount){
			this.currentEnemy++;
			this.currentEnemyCount = 0;
			console.log("new enemy");
		}

		let enemyDef = levelData.waves[this.currentWave].waveEnemies[this.currentEnemy];

		let enemy = new Enemy(this.scene, this.ar_nodes[enemyDef.spawnPos], 'plane', levelData.spritesheet, this);
		this.currentEnemyCount++;
		this.ar_enemies.push(enemy);
		this.enemyDelay = enemyDef.spawnDelay;
	}

	getNextNode(currentNodeIndex: number): PathNode{
		let index = -1;
		for(var i = 0; i < this.ar_nodes.length; i++){
			if(i > currentNodeIndex){
				index = i;
				break;
			}
		}
		return (index == -1) ? this.ar_nodes[this.ar_nodes.length] : this.ar_nodes[index];
	}

	unitDied(enemy: Enemy, deathDetail: object){

	}
}