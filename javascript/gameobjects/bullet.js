import {GameObject} from "./gameobject.js"
import {Collider} from "../modules/Collision/Collider.js"
import {Vector2} from "../modules/helpers/Vector2.js"

import {Alien} from "../gameobjects/alien.js"

import * as SceneData from "../sceneData.js"

class Bullet extends GameObject{

    sprite;
    collider;

    velocity = new Vector2(0,0);
    
    speed = 10000
    lifespan = 1.0;
    timer = 0.0;

    constructor(){

        super();

        this.sprite = new PIXI.Sprite(SceneData.GetTextureAtlas().Textures["PlayerBullet0"]);
        SceneData.GetPixiApplication().stage.addChild(this.sprite);
        this.sprite.scale.x = 3;
        this.sprite.scale.y = 3;

        

        let collisionVerticies = [[-1.5, 9], [-1.5, -9], [1.5, 9], [1.5, -9]];
        this.collider = new Collider( SceneData.GetCollisionSystem().createPolygon(this, this.Position.X, this.Position.Y, collisionVerticies) );

        this.collider.RegisterCollisionCallback(this.OnColliderCollides, this);
        this.OnDestroy = this.OnSelfDestroyed;

    }

    Update(deltaTime){

        this.timer += (deltaTime/100.0);
        if(this.timer >= this.lifespan){
            this.Destroy();
            return;
        }

        this.velocity.Y = -this.speed * (deltaTime / 1000);
        this.Position.X += this.velocity.X;
        this.Position.Y += this.velocity.Y;

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

        this.collider.SetPosition(this.Position.X, this.Position.Y);
        this.collider.Update();
        

    }

    OnColliderCollides(other){
    }

    OnSelfDestroyed(){

        SceneData.GetPixiApplication().stage.removeChild(this.sprite);
        this.sprite = null;

        this.collider.Destroy();
        this.collider = null;

    }

}

export {Bullet}