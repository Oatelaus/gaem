import config from './config';
import { Game } from 'phaser';

class Gaem extends Game {
    constructor() {
        super(config);
    }
}
 
window.onload = () => {
    const gaem = new Gaem();
    console.log('he');
}

