import * as Input from "./modules/input/input.js"
import {Action} from "./modules/input/action.js"
import {TextureAtlas} from "./modules/textures/TextureAtlas.js"
import {Ship} from "./gameobjects/ship.js"
import { Alien } from "./gameobjects/alien.js"
import Collisions from "../node_modules/collisions/src/Collisions.mjs"
import * as SceneData from "./sceneData.js"
import { Vector2 } from "./modules/helpers/Vector2.js"

//Setup Pixi
let app = new PIXI.Application({width: 800, height: 600});
document.body.appendChild(app.view);
let loader = new PIXI.Loader();
app.stage.position.set(0, 0);
app.stage.scale.set(1);
SceneData.SetPixiApplication(app);

let ViewWidth = SceneData.GetViewWidth();
let ViewHeight = SceneData.GetViewHeight();

//Setup Collisions
const CollisionSystem = new Collisions();
const CollisionResult = CollisionSystem.createResult();
SceneData.SetCollisionSystem(CollisionSystem);
let test1 = CollisionSystem.createCircle(0, 0, 40);

//Setup the game object container
let GameObjects = new Map();
SceneData.SetGameObjectPool(GameObjects);

let testAtlas
let elapsed = 0.0;

let smallAlienSprite;
let mediumAlienSprite;
let largeAlienSprite;

let ship;

let AlienGroupPosition = new Vector2(0, 0);

//Central point to kick the program off from
function Main(){

    Initialize();

    app.ticker.add(Update);

}

function testCB(){

}

function Initialize(){

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
        SceneData.SetTextureAtlas(testAtlas);

        ship = new Ship();
        ship.Position = new Vector2(ViewWidth / 2, ViewHeight - 16);
        SceneData.AddGameObject(ship);
        AddAliens();

    });

}


function Update(deltaTime){

    elapsed += deltaTime;

    
    UpdateGameObjects(deltaTime);

    CollisionSystem.update();

    SceneData.DeleteGameObjectQueue();

}

function UpdateGameObjects(deltaTime){

    for(const gameobject of GameObjects.values()){
        gameobject.Update(deltaTime);
    }

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

function AddAliens(){

    let spacing = 48;

    SpawnAlienRow(10, spacing, 16, true);
    SpawnAlienRow(12, spacing, 48, false);
    SpawnAlienRow(10, spacing, 80, true);
    SpawnAlienRow(12, spacing, 112, false);
    SpawnAlienRow(10, spacing, 144, true);

}

function SpawnAlienRow(alien_count, x_spacing, y_position, marching_right){
    
    let totalAlienWidth = x_spacing * alien_count;
    let sideMargin = (ViewWidth - totalAlienWidth) / 2;

    for(let i = 0; i < alien_count; i++){

        let x = sideMargin + (i * x_spacing);

        let alien = new Alien();
        alien.Position = new Vector2(x, y_position);

        if(!marching_right){
            alien.moving_right = false;
            alien.march_direction = 1;
        }

        SceneData.AddGameObject(alien);

    }

}

//Yes this is how I tested if the collisions worked instead of drawing them, its sad
function SpawnTargetDummy(position){
    let alien = new Alien();
    alien.Position = position;
    alien.march_direction = 3;
    SceneData.AddGameObject(alien);
}

Main();