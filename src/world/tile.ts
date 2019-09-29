import { Game, GameObjects } from 'phaser';

export class Tile extends GameObjects.Sprite {
	private xPos: number;
	private yPos: number;


	constructor(scene: Phaser.Scene, image: string, sheet: string, xPos: number, yPos: number, ){
		super(scene, xPos, yPos, sheet, image);
		this.scene.add.existing(this);
		this.xPos = xPos;
		this.yPos = yPos;
	}

};