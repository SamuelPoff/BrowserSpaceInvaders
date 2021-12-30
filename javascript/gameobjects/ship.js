import { Vector2 } from "../modules/helpers/Vector2.js";
import { GameObject } from "./gameobject.js"
import * as Input from "../modules/input/input.js"

class Ship extends GameObject{

    sprite;
    velocity = new Vector2(0, 0);

    constructor(ship_sprite){
        super();

        this.sprite = ship_sprite;
    }

    Update(deltaTime){

        let HORIZONTAL = Input.IsActionPressed("right") - Input.IsActionPressed("left");
        this.velocity.X = HORIZONTAL * 5;

        this.Position.X += this.velocity.X;

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

    }

}

export {Ship}