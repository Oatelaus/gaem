import { Scene, Textures } from "phaser";
import uuid from 'uuid/v4';

import Component from "./component/component";

export default class Tower extends Phaser.GameObjects.Container {

    public uuid: string = uuid();

    private renderTexture: Phaser.GameObjects.RenderTexture;


    constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number, private components: Component[] = []) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.components.forEach(c => this.scene.add.existing(c));
    }

    addComponent(component: Component) {
        this.components.push(component);
        this.add(component)
    }

    removeComponent(component: Component) {
        this.components = this.components.filter(c => c !== component);
        this.remove(component);
    }

    /**
     * Returns the extreme tower rectangle constraints.
     */
    get towerSize() {
        return {
            width: this.components.map((c) => c.getTopRight().x)
                .reduce((highest, current) => current > highest ? current : highest),
            height: this.components.map(c => c.getBottomRight().y)
                .reduce((highest, current) => current > highest ? current : highest),
        }
    }
}