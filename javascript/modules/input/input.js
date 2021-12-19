import {Action} from "./action.js"

//All registered actions
let Actions = {

};

//The state of different inputs being tracked by actions
let Inputs = {

};

//Registers an action and automatically registers its inputs to be tracked as well
function RegisterAction(action){
    if(!Actions.hasOwnProperty(action.name)){
        Actions[action.name] = action;
        _registerActionInputs(action);
    }else{
        console.log("WARNING:: Attempted to add action: " + action.name + " but an action with that name already exists");
    }
}

function _registerActionInputs(action){

    action.inputs.forEach((eventCode) => {
        if(!Inputs.hasOwnProperty(eventCode)){
            Inputs[eventCode] = false;
        }
    });

}


function IsActionPressed(actionName){
    let action = Actions[actionName];
    let pressed = false;

    action.inputs.forEach((eventCode) => {
        if(Inputs[eventCode] == true){
            pressed = true;
        }
    });

    return pressed;

}

function IsActionReleased(actionName){

    let action = Actions[actionName];
    let released = true;

    action.inputs.forEach((eventCode) => {
        if(Inputs[eventCode] == true){
            released = false;
        }
    });

    return released;

}

function GetRawInputs(){
    return Inputs;
}

function GetActions(){
    return Actions;
}

export {RegisterAction, IsActionPressed, IsActionReleased, GetRawInputs, GetActions}
