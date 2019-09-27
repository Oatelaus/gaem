import config from './config';
import { Game, Loader } from 'phaser';
import { Grid } from './world/grid';

export class Gaem extends Game {
    constructor() {
        super(config);
    }
}
let gaem: Gaem;
window.onload = () => {
    gaem = new Gaem();
    const scene = new GaemScene();
}

export class GaemScene extends Phaser.Scene {
    public grid: Grid;
    public gaem: Gaem;

    constructor(){
        super({
            key: "GameScene"
        });
        this.grid = new Grid();
        this.gaem = gaem;
    };

    init(gridX: integer, gridY: integer){
        var image: string = 'test';
        this.grid.init(this, image, gridX, gridY);

    }
}
