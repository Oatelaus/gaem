import { GameObjects } from "phaser";
import { gaem } from './../index';
import { Level } from "../world/level";
import { PathNode } from "../world/pathNode";

export class Enemy extends GameObjects.Sprite {
	lastNode: number = 0;
	level: Level;
	targetNode: PathNode;
	targetAngle: number;
	speed: number = 0.25;
	rotationSpeed: number = 0.05;
	radius: number = 20;
	constructor(scene: Phaser.Scene, xPos: number, yPos: number, image: string, sheet: string, level: Level){
		super(scene, xPos, yPos, sheet, image);
		this.level = level;
		this.scene.add.existing(this);
		this.setActive(true);
		this.targetNode = this.level.getNextNode(this.lastNode);
		this.getNewAngle();
	}

	preUpdate(time: number, deltaTime: number){
		let myTime = deltaTime / 1000;
		//Get angle between self and target node
		let disX = this.targetNode.x - this.x;
		let disY = this.targetNode.y - this.y;
		let dir = new Phaser.Math.Vector2(disX, disY);

		let difAngle = Phaser.Math.Angle.Between(this.x, this.y, this.targetNode.x, this.targetNode.y);

		let normalDif = Phaser.Math.Angle.RotateTo(this.rotation, difAngle, this.rotationSpeed);

		this.setRotation(normalDif);
		let normal = dir.normalize();
		let newX = normal.x * deltaTime * this.speed;
		let newY = normal.y * deltaTime * this.speed;
		this.setX(this.x + newX);
		this.setY(this.y + newY);
		let dis = Math.sqrt((disX * disX) + (disY * disY));
		if(dis <= this.radius){
			//Reached current node, check if end, else get next node
			if(this.targetNode.type == 'end'){

				// -- TO DO -- Replace loop with destory / notify level
				this.targetNode = this.level.ar_nodes[0];
				this.lastNode = -1;
			}else{
				this.lastNode++;
				this.targetNode = this.level.getNextNode(this.lastNode);
				this.getNewAngle();
				console.log(this.targetNode);
			}
		}

	}

	getNewAngle(){
		let disX = this.targetNode.x - this.x;
		let disY = this.targetNode.y - this.y;
		let dir = new Phaser.Math.Vector2(disX, disY);
		this.targetAngle = (dir.angle() * (180 / Math.PI));
		console.log(this.targetAngle);
	}

	destroyMe(escaped: boolean, deathDetail = {}){
		this.level.unitDied(this, deathDetail);
		this.destroy();
	}

	update(){

	}





}