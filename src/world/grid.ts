import { Game } from 'phaser';
import { GaemScene } from './../scenes/gaemScene';
import { Tile } from './tile';
import { Gaem } from './../index';

export class Grid {
	public ar_tiles: Tile[][] = [];

	constructor(){
		
	}

	init(scene: GaemScene, image: string, x: number, y: number){
		for(var i = 0; i < x; i++){
			this.ar_tiles[i] = [];
			for(var j = 0; j < y; j++){
				this.ar_tiles[i][j] = new Tile(scene, image, (i*30), (j*30));
			}
		}
	}
}