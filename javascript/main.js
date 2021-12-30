import * as Input from "./modules/input/input.js"
import {Action} from "./modules/input/action.js"
import {TextureAtlas} from "./modules/textures/TextureAtlas.js"
import {Ship} from "./gameobjects/ship.js"
import Collisions from "../node_modules/collisions/src/Collisions.mjs"
import * as SceneData from "./sceneData.js"

let app = new PIXI.Application({width: 800, height: 600});
document.body.appendChild(app.view);

let loader = new PIXI.Loader();

SceneData.SetPixiApplication(app);

const CollisionSystem = new Collisions();
const CollisionResult = CollisionSystem.createResult();

SceneData.SetCollisionSystem(CollisionSystem);

let test1 = CollisionSystem.createCircle(0, 0, 40);

let testAtlas
let elapsed = 0.0;

let smallAlienSprite;
let mediumAlienSprite;
let largeAlienSprite;

let ship;

let GameObjects = [];
SceneData.SetGameObjectPool(GameObjects);

//Central point to kick the program off from
function Main(){

    Initialize();

    app.ticker.add(Update);

}

function testCB(){

}

function Initialize(){

    app.stage.position.set(0, 0);
    app.stage.scale.set(2);

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let atlasBaseTexture = PIXI.BaseTexture.from("../assets/SpaceInvadersTextureAtlas.png");
    loader.add("atlas", "../assets/SpaceInvadersTextureAtlas.json");

    let rightAction = new Action("right", ["KeyD", "ArrowRight"]);
    Input.RegisterAction(rightAction);

    let leftAction = new Action("left", ["KeyA", "ArrowLeft"]);
    Input.RegisterAction(leftAction);

    let shootAction = new Action("shoot", ["Space"]);
    Input.RegisterAction(shootAction);

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

        ship = new Ship(largeAlienSprite, CollisionSystem, testAtlas.Textures["SmallAlien0"]);
        GameObjects.push(ship);

    });

}


function Update(deltaTime){

    elapsed += deltaTime;

    UpdateGameObjects(deltaTime);

    CollisionSystem.update();

}

function UpdateGameObjects(deltaTime){

    GameObjects.forEach((object) => {

        if(object != null){
            object.Update(deltaTime);
        }

    });

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