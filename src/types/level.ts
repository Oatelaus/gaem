import { Tile } from './world';

export interface Node {
	type: string;
	x: number;
	y: number;
}

export interface Wave {
	postDelay: number;
	reward: number;

	waveEnemies: WaveEnemy[];
}

export interface WaveEnemy {
	enemyId: string;
	spawnAmount: number;
	spawnDelay: number;
	spawnPos: number;
}

export interface LevelData {
	nodes?: Node[]; 
	waves?: Wave[]; 
	tiles?: any[][];
	spritesheet?: string;
	defaultImage?: string;
	x?: number;
	y?: number;
	tile?: Tile
}

