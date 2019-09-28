import { AUTO } from 'phaser';
import { GaemScene } from './scenes/gaemScene';

export default {
    type: AUTO,
    width: 768,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    },
    scene: [ GaemScene ],
    backgroundColor: '#FFFFFF'
};