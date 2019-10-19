import { Tile } from './tile';
import { LevelData } from '../types/level';

export class Grid {
	public gridData: Tile[][] = [];

	constructor(
		public scene: Phaser.Scene, data: LevelData
	) {
		// If the data provided is a level definition
		if (data.tiles) {
			this.generateFromData(data);
		} else if (data.x && data.y) {
			const blankArrayData = Array(data.x).fill(Array(data.y)
				.fill({ image: data.defaultImage }));
			
			this.generateFromData({ ...data, tiles: blankArrayData });
		}
	}

	generateFromData(level: LevelData) {
		const tileWidth = level.tile.size.width || 64;
		const tileHeight = level.tile.size.height || 64;
		const tilePaddingX = level.tile.padding.width || 0;
		const tilePaddingY = level.tile.padding.height || 0;

		for(var i = 0; i < level.tiles.length; i++){
			this.gridData[i] = [];
			for(var j = 0; j < level.tiles[i].length; j++){
				const x = (i *  tileWidth) + (tileWidth / 2) + (tilePaddingX * i);
				const y = (j *  tileHeight) + (tileHeight / 2) + (tilePaddingY * j);

				this.gridData[i][j] = new Tile(this.scene, level.tiles[i][j].image, level.spritesheet, x, y);
			}
		}
	}
}