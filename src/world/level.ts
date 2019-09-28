import { Grid } from './grid';
import { GameObjects } from 'phaser';
import { GaemScene } from './../scenes/gaemScene';
import { levelData } from './../../assets/levelDef/test';
import { Enemy } from './../enemy/enemy';
import { PathNode } from './pathNode';

export class Level extends Phaser.GameObjects.Container{
	public grid: Grid;
	public ar_enemies: Enemy[] = [];
	public ar_nodes: PathNode[] = [];
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
		let enemy = new Enemy(this.scene, this.ar_nodes[0], 'plane', levelData.spritesheet, this);
		this.ar_enemies.push(enemy);
		this.setActive(true);

	}

	preUpdate(time: number, deltaTime: number){
		this.counter++;
		console.log("count");
		if(this.counter > 120){
			this.createEnemy();
			this.counter = 0;
		}
	}

	createEnemy(){
		let enemy = new Enemy(this.scene, this.ar_nodes[0], 'plane', levelData.spritesheet, this);
		this.ar_enemies.push(enemy);
		console.log("new");
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