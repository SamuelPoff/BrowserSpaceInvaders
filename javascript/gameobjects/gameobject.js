import {Vector2} from "../modules/helpers/Vector2.js"

class GameObject{

    Position = new Vector2(0,0);

    constructor(){

    }

    Update(deltaTime){
        //Override
        //Dont know how to make abstract methods in javascript, so here
    }

}

export {GameObject}