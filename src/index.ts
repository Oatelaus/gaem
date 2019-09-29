import config from './config';
import { Game, Loader } from 'phaser';
import { Grid } from './world/grid';
import { GaemScene } from './scenes/gaem';

export class Gaem extends Game {
    constructor() {
        super(config);
    }
};

export let gaem: Gaem;
let scene: GaemScene;

window.onload = () => {
    gaem = new Gaem();
}