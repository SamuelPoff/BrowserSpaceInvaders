let PixiApplication;
let CollisionSystem;

let GameObjectPool;
let DeletedObjectQueue = [];

let TextureAtlas;

function SetPixiApplication(app){
    PixiApplication = app;
}

function GetPixiApplication(){
    return PixiApplication;
}

function SetCollisionSystem(collision_system){
    CollisionSystem = collision_system;
}

function GetCollisionSystem(){
    return CollisionSystem;
}

function SetGameObjectPool(pool){
    GameObjectPool = pool;
}

function AddGameObject(object){
    GameObjectPool.set(object.GetId(), object);
}

function DestroyGameObject(object){
    DeletedObjectQueue.push(object);
}

function DeleteGameObjectQueue(){

    for(const obj of DeletedObjectQueue){

        if(obj.OnDestroy != null){
            obj.OnDestroy();
        }
        GameObjectPool.delete(obj.GetId());

    }

    DeletedObjectQueue.length = 0;

}

function SetTextureAtlas(atlas){
    TextureAtlas = atlas;
}

function GetTextureAtlas(){
    return TextureAtlas;
}

export function GetViewWidth(){
    return PixiApplication.renderer.width / PixiApplication.stage.scale.x;
}

export function GetViewHeight(){
    return PixiApplication.renderer.height / PixiApplication.stage.scale.y;
}

export {SetPixiApplication, GetPixiApplication, SetCollisionSystem, GetCollisionSystem, SetGameObjectPool, AddGameObject, DestroyGameObject, SetTextureAtlas, GetTextureAtlas, DeleteGameObjectQueue}