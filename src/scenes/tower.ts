import { Level } from '../world/level';
import { gaem, Gaem } from '../index';
import { Grid } from '../world/grid';
import environment from '../env/environment';
import { Tile } from '../types/world';


export class TowerScene extends Phaser.Scene {
	public grid: Grid;
	public gaem: Gaem;
	private level: Level;

	constructor(){
		super({
			key: 'GameScene'
		});
		this.gaem = gaem;
	}

	init(){


	}

	preload(){
		const { images, definitions } = environment.directories;

		this.load.image('tile', `${images}/tile.png`);
		this.load.atlas('tower', `${images}/tower.png`, `${definitions.atlas}/tower.json`); //each tile is 42.5 x 42.5
	}

	create(){
		const tileInfo: Tile = {
			padding: {
				width: 10,
				height: 10
			},
			size: {
				width: 32,
				height: 32
			}
		};

		this.grid = new Grid(this, { x: 10, y: 10, defaultImage: 'towerA', spritesheet: 'tower', tile: tileInfo });
	}

	update(){
		
	}
}