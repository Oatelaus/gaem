import { Level } from '../world/level';
import { gaem, Gaem } from '../index';
import { Grid } from '../world/grid';
import environment from '../env/environment';


export class GaemScene extends Phaser.Scene {
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
		this.load.atlas('spritesheet', `${images}/terrain2.png`, `${definitions.atlas}/terrain2.json`); //each tile is 42.5 x 42.5
	}

	create(){
		this.level = new Level(this);
	}

	update(){
		
	}
}