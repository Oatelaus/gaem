import { Scene, Textures } from "phaser";
import uuid from 'uuid/v5';

import Component from "./component/component";

export default class Tower extends Phaser.GameObjects.Sprite {

    public uuid: string = uuid();

    constructor(scene: Scene, x: number, y: number, texture: string, frame? : string | number, private components: Component[] = []) {
        super(scene, x, y, texture, frame);
        this.drawTexture();
    }

    drawTexture() {
        const towerSize = this.towerSize;

        const texture = this.scene.add.renderTexture(0, 0, towerSize.width, towerSize.height);
        
        texture.draw(this.components);

        this.scene.textures.setTexture(texture, this.uuid);
    }

    addComponent(component: Component) {
        this.components.push(component);
        this.drawTexture();
    }

    removeComponent(component: Component) {
        this.components = this.components.filter(c => c !== component);
        this.drawTexture();
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