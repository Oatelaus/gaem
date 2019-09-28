import { Grid } from './grid';
import { Tile } from './tile';

export class Level {
	public grid: Grid;

	constructor(){
		this.grid = new Grid();
	}

}