import { GameObjects } from 'phaser';
import { Tile as ITile } from '../types/world';

export class Tile extends GameObjects.Sprite implements ITile {
	private xPos: number;
	private yPos: number;


	constructor(scene: Phaser.Scene, image: string, sheet: string, xPos: number, yPos: number, ){
		super(scene, xPos, yPos, sheet, image);
		this.scene.add.existing(this);
		this.xPos = xPos;
		this.yPos = yPos;
	}
}