/*
NOTES
-----------------
Probaby a better way of doing this but I dont want to make a scene model or anything for something this simple
so this will do since there is essentially one "scene" and this can act as the collision space for it and 
always be the "current" collisionSpace since there is no scene switching

TestCollisions should only be called once per frame and only in the main game loop ideally
*/

let colliders = [];

function AddBB(bounding_box){

    colliders.push(bounding_box);

}

function TestCollisions(){

    if(colliders.length >= 2){
        for(let i = 0; i < colliders.length; i++){

            let collider = colliders[i];
            for(let k=i+1; k < colliders.length; k++){

                let other = colliders[k];
                if(collider.IsColliding(other)){
                    if(collider.CollisionCallback != null){
                        collider.CollisionCallback(other);
                    }
                    if(other.CollisionCallback != null){
                        other.CollisionCallback(collider);
                    }
                }

            }

        }
    }

}

export {TestCollisions, AddBB}