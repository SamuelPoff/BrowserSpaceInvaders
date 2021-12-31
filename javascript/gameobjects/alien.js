import {GameObject} from "./gameobject.js"
import {Collider} from "../modules/Collision/Collider.js"

import * as SceneData from "../sceneData.js"

class Alien extends GameObject{

    sprite;
    collider;

    constructor(){

        super();

        this.sprite = new PIXI.Sprite(SceneData.GetTextureAtlas().Textures["LargeAlien0"]);
        SceneData.GetPixiApplication().stage.addChild(this.sprite);

        this.collider = new Collider( SceneData.GetCollisionSystem().createCircle(100,0, 10) );
        this.collider.RegisterCollisionCallback(this.OnColliderCollides, this);

        this.OnDestroy = this.OnDestroyed;

        this.destroyed = false;

    }


    Update(deltaTime){

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

        this.collider.SetPosition(this.Position.X, this.Position.Y);
        this.collider.Update();

    }

    OnColliderCollides(other){
        this.Destroy();
    }

    Destroyyy(){
        SceneData.DestroyGameObject(this);
    }

    OnDestroyed(){

        SceneData.GetPixiApplication().stage.removeChild(this.sprite);
        this.sprite = null;

        this.collider.Destroy();
        this.collider = null;

    }

}

export {Alien}