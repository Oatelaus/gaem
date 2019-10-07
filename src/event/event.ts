import { Events } from 'phaser';

export default class Event {
	
	public priority: number = 0; 

	constructor(public name: string, public data: any, public status: EventStatus = EventStatus.Incomplete) {

	}

	async respond(status: EventStatus, data: any[]) {
		this.status = status;
		this.data = data;
	}

	async emit(eventEmitter: Events.EventEmitter) {
		const listeners = eventEmitter.listeners(this.name);

		const highestResponse: Event = listeners.map(listener =>  {
			return listener(this);
		}).filter(response => !!response)
			.sort((a, b) => a.priority > b.priority ? 1 : -1)
			.pop();

		if (this.status === EventStatus.Incomplete) {
			this.status = EventStatus.Complete;
		}

		return highestResponse || this;
	}
} 

export enum EventStatus {
	Incomplete,
	Complete,
	Cancelled
}