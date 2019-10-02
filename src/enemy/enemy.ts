import { GameObjects } from "phaser";
import { gaem } from './../index';
import { Level } from "../world/level";
import { PathNode } from "../world/pathNode";
 
export class Enemy extends GameObjects.Sprite {
	public moveType: string;
	public lastNode: number = 0;
	public level: Level;
	public targetNode: PathNode;
	public targetAngle: number;
	public speed: number = 0.25;
	public rotationSpeed: number = 0.05;
	public radius: number = 20;

	constructor(scene: Phaser.Scene, startNode: PathNode, image: string, sheet: string, level: Level){
		super(scene, startNode.x, startNode.y, sheet, image);
		this.level = level;
		this.scene.add.existing(this);
		this.setActive(true);
	}

	/**
	 * Moves self towards given point
	 * @param deltaTime Time since last update, provided in GameObject preUpdate
	 * @param targetPoint The Vector2 position to move towards
	 */ 
	moveTowardsPoint(deltaTime: number, targetPoint: Phaser.Math.Vector2){
		let disX = targetPoint.x - this.x;
		let disY = targetPoint.y - this.y;
		let dir = new Phaser.Math.Vector2(disX, disY);
		let normal = dir.normalize();
		let newX = normal.x * deltaTime * this.speed;
		let newY = normal.y * deltaTime * this.speed;
		this.setX(this.x + newX);
		this.setY(this.y + newY);
	}

	/**
	 * Moves sels towards given node, or current target node by default
	 * @param deltaTime Time since last update, provided in GameObject preUpdate
	 * @param targetNode The PathNode to move towards, defaults to this.targetNode
	 */ 
	moveTowardsNode(deltaTime: number, targetNode: PathNode = this.targetNode){
		let disX = targetNode.x - this.x;
		let disY = targetNode.y - this.y;
		let dir = new Phaser.Math.Vector2(disX, disY);
		let normal = dir.normalize();
		let newX = normal.x * deltaTime * this.speed;
		let newY = normal.y * deltaTime * this.speed;
		this.setX(this.x + newX);
		this.setY(this.y + newY);
	}

	/**
	 * Gets distance to target node and compares with radius.
	 * Gets next node where distance < radius.
	 */
	checkDistanceToNextNode(){
		if(this.getDistanceToNode() <= this.radius){
			//Reached current node, check if end, else get next node
			if(this.targetNode.type == 'end'){
				this.destroyMe({ escaped: true });
			}else{
				this.lastNode++;
				this.targetNode = this.level.getNextNode(this.lastNode, this.moveType);
			}
		}
	}

	/**
	 * Returns distance between this and given PathNode,
	 * or current targetNode by default
	 * @param targetNode The PathNode to calculate distance from, defaults to this.targetNode
	 */
	getDistanceToNode(targetNode: PathNode = this.targetNode): number{
		let disX = targetNode.x - this.x;
		let disY = targetNode.y - this.y;
		return Math.sqrt((disX * disX) + (disY * disY));
	}

	/**
	 * Executes Lerp at this.rotationSpeed towards given point
	 * @param targetPoint The Vector2 position to rotate towards
	 */
	rotateTowardsPoint(targetPoint: Phaser.Math.Vector2){
		let difAngle = Phaser.Math.Angle.Between(this.x, this.y, targetPoint.x, targetPoint.y);
		let normalDif = Phaser.Math.Angle.RotateTo(this.rotation, difAngle, this.rotationSpeed);
		this.setRotation(normalDif);
	}

	/**
	 * Executes Lerp at this.rotationSpeed towards given PathNode,
	 * or current targetNode by default
	 * @param targetNode The PathNode to rotate towards, defaults to this.targetNode
	 */
	rotateTowardsNode(targetNode: PathNode = this.targetNode){
		let difAngle = Phaser.Math.Angle.Between(this.x, this.y, targetNode.x, targetNode.y);
		let normalDif = Phaser.Math.Angle.RotateTo(this.rotation, difAngle, this.rotationSpeed);
		this.setRotation(normalDif);
	}

	/**
	 * emits 'entity-destroy' event, passing deathDetail
	 * then destroys current entity
	 * @param deathDetail The detail of how this enemy died, yet to be defined! :D
	 */
	destroyMe(deathDetail: object){
		this.emit('entity-destroy', deathDetail);
		this.destroy();
	}
}