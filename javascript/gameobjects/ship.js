import { Vector2 } from "../modules/helpers/Vector2.js";
import { GameObject } from "./gameobject.js"
import { Collider } from "../modules/Collision/Collider.js"
import { Bullet } from "./bullet.js"
import Collisions from "../../node_modules/collisions/src/Collisions.mjs"
import * as Input from "../modules/input/input.js"
import * as SceneData from "../sceneData.js"

class Ship extends GameObject{

    sprite;
    velocity = new Vector2(0, 0);
    collider;

    bullet_tex;

    constructor(ship_sprite, collision_system, bullet_texture){
        super();

        this.sprite = ship_sprite;
        this.collider = new Collider( collision_system.createCircle(0, 0, 10) );
        this.collider.RegisterCollisionCallback(this.OnColliderCollides);

        this.bullet_tex = bullet_texture;
        
    }

    Update(deltaTime){

        //Movement logic
        let HORIZONTAL = Input.IsActionPressed("right") - Input.IsActionPressed("left");
        this.velocity.X = HORIZONTAL * 5;

        //Shooting Logic
        
        if( Input.IsActionPressed("shoot") ){

            //Note: Eventually im going to load all resources into some content management system so it can be pulled
            //from there, and since it will be able to be pulled from that global location, the bullet can make its own 
            //sprite
            let bullet_sprite = new PIXI.Sprite(this.bullet_tex);
            SceneData.GetPixiApplication().stage.addChild(bullet_sprite);
            let new_bullet = new Bullet(bullet_sprite, SceneData.GetCollisionSystem());
            new_bullet.Position.X = this.Position.X;
            new_bullet.Position.Y = this.Position.Y;

            //Add bullet to game object pool
            SceneData.AddGameObject(new_bullet);
            console.log("Bullet Added");
        }
        

        this.Position.X += this.velocity.X;

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

        this.collider.SetPosition(this.Position.X, this.Position.Y);
        this.collider.Update();
        
    }

    OnColliderCollides(other){
        console.log("Ship has detected a collision");
    }

}

export {Ship}