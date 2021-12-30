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

    CollisionCallback;

    constructor(_shape){
        this.shape = _shape;
    }

    Update(){

        let potentials = this.shape.potentials();
        for(const other of potentials){
            if(this.shape.collides(other)){
                this.CollisionCallback(other);
            }
        }

    }

    RegisterCollisionCallback(callback){
        this.CollisionCallback = callback;
    }

    SetPosition(x, y){
        this.shape.x = x;
        this.shape.y = y;
    }

}

export {Collider}