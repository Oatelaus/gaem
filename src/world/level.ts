import { Grid } from './grid';
import { GameObjects } from 'phaser';
import { GaemScene } from './../scenes/gaemScene';
import { levelData } from './../../assets/levelDef/test';

export class Level extends Phaser.GameObjects.Container{
	public grid: Grid;
	scene: GaemScene;

	constructor(scene: GaemScene){
		super(scene, 0, 0);
		this.scene = scene;
		this.create();
	}

	preload(){

	}
	create(){
		
		let image = 'grass1';
		let sheet = 'spritesheet';
		
		this.grid = new Grid(this.scene, levelData);
	}




}