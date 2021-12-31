import {Vector2} from "../modules/helpers/Vector2.js"
import * as SceneData from "../sceneData.js"

class GameObject{

    ID;

    Position = new Vector2(0,0);
    OnDestroy;

    constructor(){

        //Generate Id before incrementing data so it all stays lined up
        this.ID = GenerateId();

        gameObjects += 1;
        totalGameObjects += 1;
    }

    Update(deltaTime){
        //Override
        //Dont know how to make abstract methods in javascript, so here
    }

    //Queues gameobject up for deletion at the end of the frame
    Destroy(){

        gameObjects -= 1;
        SceneData.DestroyGameObject(this);

    }

    GetId() {
        return this.ID;
    }

    
}


//Gameobject management
let gameObjects = 0; //Current number of game objects
let totalGameObjects = 0; //Total number of game objects created

//Generates a unique ID for a new gameobject
//(In this case very simply: just an ever increaing tally of gameobjects)
//
//(Could change this later to actually reuse IDs by constructing an integer with a value (what we would usually think of as the id)
// and a generation (how many times we have looped past a certain number of objects),  but I dont think thatll be needed for something this small)
function GenerateId() {

    return totalGameObjects;

}

export {GameObject}