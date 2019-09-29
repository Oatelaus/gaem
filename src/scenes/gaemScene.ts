import { Level } from './../world/level';
import { gaem, Gaem } from './../index';
import { Grid } from './../world/grid';
import { Events, GameObjects, Scenes } from 'phaser';
import environment from './../env/environment';


export class GaemScene extends Phaser.Scene {
	public grid: Grid;
    public gaem: Gaem;
	private level: Level;

    constructor(){
        super({
            key: "GameScene"
		});
		this.gaem = gaem;
	};

	init(){


	}

	preload(){
		const directories = environment.directories;

		this.load.image('tile', `${directories.images}/tile.png`);
		this.load.atlas('spritesheet', `${directories.images}/terrain2.png`, `${directories.definitions.atlas}/terrain2.json`); //each tile is 42.5 x 42.5
	}

	create(){
		this.level = new Level(this);
	}
	'./assets/atlasDef/
	update(){
		
	}
}