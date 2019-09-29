import { Game } from 'phaser';
import { GaemScene } from './../scenes/gaemScene';
import { Tile } from './tile';
import { Gaem } from './../index';

export class Grid {
	public ar_tiles: Tile[][] = [];

	constructor(scene: GaemScene, levelDef: any){

		for(var i = 0; i < levelDef.tiles.length; i++){
			this.ar_tiles[i] = [];
			for(var j = 0; j < levelDef.tiles[i].length; j++){
				this.ar_tiles[i][j] = new Tile(scene, levelDef.tiles[i][j].image, levelDef.spritesheet, (i*64) + 32, (j*64) + 32);
			}
		}
	}
}