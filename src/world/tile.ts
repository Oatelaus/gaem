import { Game } from 'phaser';

export class Tile {
	private bg: Phaser.GameObjects.Image;
	private xPos: number;
	private yPos: number;


	constructor(scene: Phaser.Scene, image: string, xPos: number, yPos: number){
		this.xPos = xPos;
		this.yPos = yPos;
		//this.bg = new Phaser.GameObjects.Image(scene, 12, 12, image);
		this.bg = scene.add.image(xPos, yPos, image);
		// this.bg.setPosition(xPos, yPos);
		console.log("init tile?");
	}

};