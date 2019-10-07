import { AUTO } from 'phaser';
import { GaemScene } from './scenes/gaem';
import { TowerScene } from './scenes/tower';

export default {
    type: AUTO,
    width: 768,
    height: 768,
    physics: {
        default: 'arcade'
    },
    scene: [ GaemScene ],
    backgroundColor: '#FFFFFF'
};