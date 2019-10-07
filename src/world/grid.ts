import { GaemScene } from '../scenes/gaem';
import { Tile } from './tile';
import { LevelData } from '../types/level';

export class Grid {
	public gridData: Tile[][] = [];

	constructor(
		public scene: GaemScene, data: LevelData
	) {
		// If the data provided is a level definition
		if (data.tiles) {
			this.generateFromData(data);
		} else if (data.x && data.y) {
			const arrayX = new Array(data.x);
			const arrayY = new Array(data.y);

			const blankArrayData = arrayY.map((vY, y) => {
				return arrayX.map((vX, x) => {
					return {
						image: data.defaultImage
					};
				});
			});

			this.generateFromData({ tiles: blankArrayData });
		}
	}

	generateFromData(level: LevelData) {
		for(var i = 0; i < level.tiles.length; i++){
			this.gridData[i] = [];
			for(var j = 0; j < level.tiles[i].length; j++){
				this.gridData[i][j] = new Tile(this.scene, level.tiles[i][j].image, level.spritesheet, (i*64) + 32, (j*64) + 32);
			}
		}
	}
}