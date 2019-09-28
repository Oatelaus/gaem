import { Level } from './../world/level';
import { gaem, Gaem } from './../index';
import { Grid } from './../world/grid';
import { Tilemaps } from 'phaser';

export class GaemScene extends Phaser.Scene {
	public grid: Grid;
	
    public gaem: Gaem;
	private level: Level;

    constructor(){
        super({
            key: "GameScene"
		});
		this.gaem = gaem;
		console.log(this);
	};

	init(){


	}

	preload(){
		this.load.image('tile', './assets/img/tile.png');
		this.load.atlas('spritesheet', './assets/img/terrain2.png', './assets/atlasDef/terrain2.json'); //each tile is 42.5 x 42.5
		 



		console.log("load");
	}

	create(){
		this.level = new Level(this);
	}

	update(){

	}
}