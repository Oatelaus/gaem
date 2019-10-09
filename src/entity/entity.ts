import { GameObjects } from 'phaser';
import Event, { EventStatus } from '../event/event';

export class Entity extends GameObjects.Sprite implements EntityStats {
	health: number;
	maxHealth: number;
	armor: number;
	attackDamage: number;
	attackSpeed: number;
	damageModifiers: DamageModifier[];

	damageHistory: { 
		original: DamageEntry,
		actual: DamageEntry,
		damageModifiers: DamageModifier[]
	}[] = [];

	async damage(damage: DamageEntry) {
		// Clone the object
		const originalDamage = { ...damage };

		// Add and remove values from the damage based on the current buffs
		damage.amount = damage.amount * this.damageModifiers
			.filter(buff => buff.type === damage.type)
			.map(buff => buff.amount)
			.reduce((accumulator, current) => accumulator + current);

		const entityDamageEvent = new Event('EntityDamageEvent', damage);

		const eventResult = await entityDamageEvent.emit(this.scene.events);

		if (eventResult.status === EventStatus.Cancelled) return;

		damage = eventResult.data;

		// Remove the damage value to the entity health, if healing, reverse the damage.
		this.health -= damage.amount * (damage.type === DamageType.HEALING ? -1 : 1);
		
		// Write the damage into history.
		this.damageHistory.push({
			original: originalDamage,
			actual: damage,
			damageModifiers: { ...this.damageModifiers }
		});
	}

	async die(deathDetails: any) {
		const entityDeathEvent = new Event('EntityDeathEvent', deathDetails);

		entityDeathEvent.emit(this.scene.events).then((event) => {
			if (event.status === EventStatus.Cancelled) {
				return;
			}

			this.destroy();
		});
	}
}

export interface EntityStats {
	health: number;
	maxHealth: number;
	attackSpeed: number;
	damageModifiers: DamageModifier[];
}

export interface DamageModifier {
	type: DamageType,
	amount: number,
	source: string;
}

export interface DamageEntry {
	type: DamageType,
	amount: number
}

export enum DamageType {
	MISC,
	NORMAL,
	PIERCING,
	ACID,
	FIRE,
	HEALING
}