import { Enemy } from "./enemy";
import { PathNode } from "../world/pathNode";
import { Level } from "../world/level";

export class LandEnemy extends Enemy{

	constructor(scene: Phaser.Scene, startNode: PathNode, image: string, sheet: string, level: Level){
		super(scene, startNode, image, sheet, level);
		this.moveType = 'land';
		this.targetNode = this.level.getNextNode(this.lastNode);
	}

	_preUpdate(time: number, deltaTime: number){
		this.checkDistanceToNextNode();
		this.moveTowardsNode(deltaTime);
		this.rotateTowardsNode();
	}
}