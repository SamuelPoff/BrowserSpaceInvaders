import * as Input from "./modules/input/input.js"
import {Action} from "./modules/input/action.js"
import {TextureAtlas} from "./modules/textures/TextureAtlas.js"

let app = new PIXI.Application({width: 640, height: 360});
document.body.appendChild(app.view);

let sprite = PIXI.Sprite.from('anim_leafRunDown01.png');
app.stage.addChild(sprite);

let action = new Action("Test", ["KeyW", "KeyS"]);
Input.RegisterAction(action);

let loader = new PIXI.Loader();

let testAtlas
let elapsed = 0.0;

let smallAlienSprite;
let mediumAlienSprite;
let largeAlienSprite;

//Central point to kick the program off from
function Main(){

    Initialize();

    app.ticker.add(Update);

}


function Initialize(){

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let atlasBaseTexture = PIXI.BaseTexture.from("../assets/SpaceInvadersTextureAtlas.png");
    loader.add("atlas", "../assets/SpaceInvadersTextureAtlas.json");

    let value = loader.load((loader, resources) => {

        testAtlas = new TextureAtlas(atlasBaseTexture, resources.atlas.data);

        smallAlienSprite = new PIXI.Sprite(testAtlas.Textures["SmallAlien0"]);
        smallAlienSprite.x = 100;
        smallAlienSprite.scale = new PIXI.ObservablePoint (testCB, this, 10, 10);
        mediumAlienSprite = new PIXI.Sprite(testAtlas.Textures["MediumAlien0"]);
        mediumAlienSprite.x = 150;
        largeAlienSprite = new PIXI.Sprite(testAtlas.Textures["LargeAlien0"]);
        largeAlienSprite.x = 200;
        app.stage.addChild(smallAlienSprite);
        app.stage.addChild(mediumAlienSprite);
        app.stage.addChild(largeAlienSprite);

    });

}

function testCB(){

}

function Update(delta){

    elapsed += delta;

}


window.addEventListener("keydown", OnKeydown);
function OnKeydown(event){

    let inputs = Input.GetRawInputs();
    if(inputs.hasOwnProperty(event.code)){
        inputs[event.code] = true;
    }

}

window.addEventListener("keyup", OnKeyup);
function OnKeyup(event){

    let inputs = Input.GetRawInputs();
    if(inputs.hasOwnProperty(event.code)){
        inputs[event.code] = false;
    }

}

Main();