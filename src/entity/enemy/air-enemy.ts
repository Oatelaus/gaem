import { Enemy } from './enemy';
import { PathNode } from '../../world/pathNode';
import { Level } from '../../world/level';

export class AirEnemy extends Enemy {

	constructor(scene: Phaser.Scene, startNode: PathNode, image: string, sheet: string, level: Level){
		super(scene, startNode, image, sheet, level);
		this.moveType = 'air';
		this.targetNode = this.level.getNextNode(this.lastNode, this.moveType);
	}

	async _preUpdate(time: number, deltaTime: number){
		this.checkDistanceToNextNode();
		this.moveTowardsNode(deltaTime);
		this.rotateTowardsNode();
	}
}