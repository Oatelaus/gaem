export interface Tile extends Point {
	position?: Point;
	size?: Size;	
	padding?: Size;
}


export interface Point {
	x?: number;
	y?: number;
}

export interface Size {
	width?: number;
	height?: number;
}