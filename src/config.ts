import { AUTO } from 'phaser';
import { TowerScene } from './scenes/tower';

export default {
    type: AUTO,
    width: 768,
    height: 768,
    physics: {
        default: 'arcade'
    },
    scene: [ TowerScene ],
    backgroundColor: '#FFFFFF'
};