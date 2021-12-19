//Example
// --let jumpAction = new Action("jump", ["Space", "KeyW"]);
// --Input.RegisterAction(action);


//Class holds input information intended to relate to a specific action in-game
class Action {

    name;
    inputs; //array of eventCodes to check for

    constructor(actionName, inputArray){
        this.name = actionName;
        this.inputs = inputArray;
    }

}

export {Action};