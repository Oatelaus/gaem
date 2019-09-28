import { Grid } from './grid';
import { GameObjects } from 'phaser';
import { GaemScene } from './../scenes/gaemScene';

export class Level extends Phaser.GameObjects.Container{
	public grid: Grid;
	scene: GaemScene;

	constructor(scene: GaemScene, gridX: number, gridY: number){
		super(scene, 0, 0);
		this.scene = scene;
		this.create();
	}

	preload(){

	}
	create(){
		
		let image = 'grass1';
		let sheet = 'spritesheet';
		this.grid = new Grid(this.scene, image, sheet, 30, 30);
	}

}