import { Game } from 'phaser';
import { GaemScene } from './../index';
import Tile from './tile';
import { Gaem } from './../index';

export class Grid {
	public ar_tiles: Tile[][] = [];

	constructor(){

	}
	init(scene: GaemScene, image: string, x: integer, y: integer){
		for(var i = 0; i < x; i++){
			for(var j = 0; j < y; j++){
				this.ar_tiles[i][j] = new Tile(image);
			}
		}

	}
}