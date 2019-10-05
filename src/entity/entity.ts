import { GameObjects } from 'phaser';

export class Entity extends GameObjects.Sprite implements EntityStats {
	health: number;
	maxHealth: number;
	armor: number;
	attackDamage: number;
	attackSpeed: number;
	buffs: Buff[];

	damageHistory: { 
		original: DamageEntry,
		actual: DamageEntry,
		buffs: Buff[]
	}[] = [];

	damage(damage: DamageEntry) {
		const originalDamage = {...damage};

		// Add and remove values from the damage based on the current buffs
		damage.amount = damage.amount + this.buffs
			.filter(buff => buff.type === damage.type)
			.map(buff => buff.amount)
			.reduce((accumulator, current) => accumulator + current);
		
		// Remove the damage value to the entity health, if healing, reverse the damage.
		this.health -= damage.amount * (damage.type === DamageType.HEALING ? -1 : 1);
		
		// Write the damage into history.
		this.damageHistory.push({
			original: originalDamage,
			actual: damage,
			buffs: { ...this.buffs }
		});
	}
}


export interface EntityStats {
	health: number;
	maxHealth: number;
	armor: number;
	attackDamage: number;
	attackSpeed: number;
	buffs: Buff[];
}


export interface DamageEntry {
	type: DamageType,
	amount: number
}

export interface Buff extends DamageEntry { }

export enum DamageType {
	NORMAL,
	PIERCING,
	ACID,
	FIRE,
	HEALING
}
