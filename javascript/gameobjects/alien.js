import {GameObject} from "./gameobject.js"
import {Collider} from "../modules/Collision/Collider.js"
import {Bullet} from "../gameobjects/bullet.js"
import { ExplosionEffect } from "./effects/explosion.js"

import * as SceneData from "../sceneData.js"

let MarchDirection = {
    "Right" : 0,
    "Left" : 1,
    "Down" : 2,
    "None" : 3
};

class Alien extends GameObject{

    texture0;
    texture1;
    animation_frame = 0;

    sprite;
    collider;

    march_timer = 1.0;
    march_cd = 0.5;

    previous_direction;
    moving_right = true;
    march_direction = MarchDirection.Right;

    constructor(){

        super();

        this.texture0 = SceneData.GetTextureAtlas().Textures["LargeAlien0"];
        this.texture1 = SceneData.GetTextureAtlas().Textures["LargeAlien1"];

        this.sprite = new PIXI.Sprite(this.texture0);
        this.sprite.scale.x = 3;
        this.sprite.scale.y = 3;
        SceneData.GetPixiApplication().stage.addChild(this.sprite);

        let collisionVerticies = [ [-6, 4], [6, -4], [-6, -4], [6, 4] ];
        this.collider = new Collider( SceneData.GetCollisionSystem().createPolygon(this, this.Position.X, this.Position.Y, collisionVerticies, 0, 3, 3) );
        this.collider.RegisterCollisionCallback(this.OnColliderCollides, this);

        this.OnDestroy = this.OnDestroyed;

        this.destroyed = false;

    }


    Update(deltaTime){

        //Movement logic
        //(Note: Very convoluted! :D)
        this.march_timer -= (deltaTime / 100.0);
        if(this.march_timer <= 0.0){
            this.march_timer = this.march_cd;

            if(this.march_direction == MarchDirection.Right && this.Position.X + 16 >= SceneData.GetViewWidth()-16){
                this.march_direction = MarchDirection.Down;
            }
            if(this.march_direction == MarchDirection.Left && this.Position.X - 16 <= 0+16){
                this.march_direction = MarchDirection.Down;
            }
            if(this.previous_direction == MarchDirection.Down){
                if(this.moving_right){
                    this.moving_right = false;
                    this.march_direction = MarchDirection.Left;
                }else{
                    this.moving_right = true;
                    this.march_direction = MarchDirection.Right
                }


            }

            switch(this.march_direction){
                case MarchDirection.Right:
                    this.Position.X += 16;
                    break;
                case MarchDirection.Left:
                    this.Position.X -= 16;
                    break;
                case MarchDirection.Down:
                    this.Position.Y += 32;
                    break;
            }

            this.previous_direction = this.march_direction;
            this.UpdateAnimation();
        }

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

        this.collider.SetPosition(this.Position.X, this.Position.Y);
        this.collider.Update();

    }

    UpdateAnimation(){

        if(this.animation_frame == 0){
            this.animation_frame = 1;
            this.sprite.texture = this.texture1;
        }else{
            this.animation_frame = 0;
            this.sprite.texture = this.texture0;
        }

        

    }

    OnColliderCollides(other){

        if(other.owner instanceof Bullet){
            other.owner.Destroy();
            this.Destroy();
        }

    }

    OnDestroyed(){

        SceneData.GetPixiApplication().stage.removeChild(this.sprite);
        this.sprite = null;
        
        this.collider.Destroy();
        this.collider = null;

        //Create explosion effect at this position
        let explosionEffect = new ExplosionEffect();
        explosionEffect.Position = this.Position;
        explosionEffect.sprite.x = this.Position.X;
        explosionEffect.sprite.y = this.Position.Y;
        SceneData.AddGameObject(explosionEffect);

    }

}

export {Alien}