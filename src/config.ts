import { AUTO } from 'phaser';

export default {
    type: AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    }
};