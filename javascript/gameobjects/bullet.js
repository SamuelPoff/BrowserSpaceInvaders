import {GameObject} from "./gameobject.js"
import {Collider} from "../modules/Collision/Collider.js"
import {Vector2} from "../modules/helpers/Vector2.js"

class Bullet extends GameObject{

    sprite;
    collider;

    velocity = new Vector2(0,0);

    constructor(bullet_sprite, collision_system){

        super();

        this.sprite = bullet_sprite;
        this.collider = new Collider( collision_system.createCircle(0,0, 5));
        this.collider.RegisterCollisionCallback(this.OnColliderCollides);

    }

    Update(deltaTime){

        this.velocity.Y = 8000 * (deltaTime / 1000);
        this.Position.X += this.velocity.X;
        this.Position.Y += this.velocity.Y;

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

        this.collider.SetPosition();
        this.collider.Update();

    }

    OnColliderCollides(other){
        console.log("Bullet detected collision");
    }

}

export {Bullet}