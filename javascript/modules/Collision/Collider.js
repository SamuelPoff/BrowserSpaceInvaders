import * as SceneData from "../../sceneData.js"

/*
NOTES
----------------
More of a utility class to encapsulate the Collisions npm module

Gameobject that contains a collider is RESPONSIBLE for UPDATING its data
(This mostly just involves calling the update methods to detect collisions,
    and updating its position if desirable)

*/

class Collider{

    shape; //A Collisions shape

    CollisionCallback; //Only supports a single function callback since I dont think ill need more, but could be changed to accept any number

    constructor(_shape){
        this.shape = _shape;
    }

    Update(){

        let potentials = this.shape.potentials();
        for(const other of potentials){
            if(this.shape.collides(other)){
                this.CollisionCallback.function.call(this.CollisionCallback.context, other);
            }
        }

    }

    RegisterCollisionCallback(callback, context){
        this.CollisionCallback = {"context" : context,
                                  "function" : callback};
    }

    SetPosition(x, y){
        this.shape.x = x;
        this.shape.y = y;
    }

    Destroy(){
        SceneData.GetCollisionSystem().remove(this.shape);
        this.shape = null;
    }

}

export {Collider}