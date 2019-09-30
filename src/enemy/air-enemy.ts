import { Enemy } from "./enemy";
import { PathNode } from "./../world/pathnode";
import { Level } from "./../world/level";

export class AirEnemy extends Enemy {

	constructor(scene: Phaser.Scene, startNode: PathNode, image: string, sheet: string, level: Level){
		super(scene, startNode, image, sheet, level);
		this.moveType = 'air';
		this.targetNode = this.level.getNextNode(this.lastNode);
	}

	_preUpdate(time: number, deltaTime: number){
		this.checkDistanceToNextAirNode();
		this.moveTowardsNode(deltaTime);
		this.rotateTowardsNode();
	}

}