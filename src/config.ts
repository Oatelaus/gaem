import { AUTO } from 'phaser';
import { GaemScene } from './scenes/gaemScene';

export default {
    type: AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    },
    scene: [ GaemScene ],
    backgroundColor: '#FFFFFF'  
};