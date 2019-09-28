import { Level } from './../world/level';
import { gaem, Gaem } from './../index';
import { Grid } from './../world/grid';

export class GaemScene extends Phaser.Scene {
    public grid: Grid;
    public gaem: Gaem;
	public gridX: number;
	public gridY: number;

    constructor(){
        super({
            key: "GameScene"
		});
        this.grid = new Grid();
		this.gaem = gaem;
		console.log(this);
	};

	init(){
		this.gridX = 30;
		this.gridY = 30;

	}

	preload(){
		this.load.image('tile', './assets/img/tile.png');
		console.log("load");
	}

	create(){
        var image: string = 'tile';
        this.grid.init(this, image, this.gridX, this.gridY);
	}

	update(){

	}
}