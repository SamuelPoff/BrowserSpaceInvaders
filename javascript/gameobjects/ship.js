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

    bullet_timer = 0.0;
    bullet_cd = 0.25;
    bullet_fireable = true;

    constructor(){
        super();

        this.sprite = new PIXI.Sprite(SceneData.GetTextureAtlas().Textures["Player0"]);
        SceneData.GetPixiApplication().stage.addChild(this.sprite);
        this.sprite.scale.x = 3;
        this.sprite.scale.y = 3;

        this.collider = new Collider( SceneData.GetCollisionSystem().createCircle(0, 0, 10) );
        this.collider.RegisterCollisionCallback(this.OnColliderCollides, this);
        
    }

    Update(deltaTime){

        //Movement logic
        let HORIZONTAL = Input.IsActionPressed("right") - Input.IsActionPressed("left");
        this.velocity.X = HORIZONTAL * 5;

        //Shooting Logic
        
        if(this.bullet_fireable == false){
            this.bullet_timer -= (deltaTime / 100.0);
            if(this.bullet_timer <= 0.0){
                this.bullet_fireable = true;
            }
        }

        if( Input.IsActionPressed("shoot") && this.bullet_fireable ){

            //Note: Eventually im going to load all resources into some content management system so it can be pulled
            //from there, and since it will be able to be pulled from that global location, the bullet can make its own 
            //sprite
            let new_bullet = new Bullet();
            new_bullet.Position.X = this.Position.X;
            new_bullet.Position.Y = this.Position.Y;

            //Add bullet to game object pool
            SceneData.AddGameObject(new_bullet);

            //Reset bullet cooldown variables
            this.bullet_timer = this.bullet_cd;
            this.bullet_fireable = false;

        }
        

        this.Position.X += this.velocity.X;

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

        this.collider.SetPosition(this.Position.X, this.Position.Y);
        this.collider.Update();
        
    }

    OnColliderCollides(other){
    }

}

export {Ship}