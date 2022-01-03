import {GameObject} from "../gameobject.js"

import * as SceneData from "../../sceneData.js"

class ExplosionEffect extends GameObject{

    sprite;

    timer = 0.0;
    lifetime = 0.1;

    constructor(){
        super();

        this.sprite = new PIXI.Sprite(SceneData.GetTextureAtlas().Textures["ExplosionEffect0"]);
        this.sprite.scale.x = 3;
        this.sprite.scale.y = 3;
        SceneData.GetPixiApplication().stage.addChild(this.sprite);

        this.OnDestroy = this.OnDestroyed;

    }

    Update(deltaTime){

        this.timer += (deltaTime / 100.0);
        if(this.timer >= this.lifetime){
            this.Destroy();
        }

        this.sprite.x = this.Position.X;
        this.sprite.y = this.Position.Y;

    }

    OnDestroyed(){

        SceneData.GetPixiApplication().stage.removeChild(this.sprite);
        this.sprite = null;

    }

}

export {ExplosionEffect}